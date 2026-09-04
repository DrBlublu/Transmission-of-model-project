#!/usr/bin/env python
"""Build the shippable `data/raw/` tree from the private source data.

Raw experimental files identify participants by **Prolific ID**, a persistent
identifier that is stable across studies and must never be published. This script
replaces every Prolific ID with a sequential surrogate (`S0001`, ...), drops
quasi-identifying columns (session filenames, participation timestamps), and writes
the result into `data/raw/`.

The ID mapping is written outside the repository and must never be committed.
Because a single global token map is used, the same participant receives the same
surrogate in every file, so chain structure (`ID` -> `parent_ID`) is preserved.

Each config entry under `deidentify.files` is one of three kinds:
  * `source`      - a single CSV copied to `dest`
  * `source_glob` + `dest`     - many CSVs concatenated into one `dest`
  * `source_glob` + `dest_dir` - many CSVs kept separate, one output per input,
                                 named `gen-NN.csv` from the file's generation column

Usage:
    python scripts/00_deidentify.py --config config.yaml            # build
    python scripts/00_deidentify.py --config config.yaml --dry-run  # report only
    python scripts/00_deidentify.py --config config.yaml --check    # verify output
"""

from __future__ import annotations

import argparse
import hashlib
import logging
import re
import sys
from pathlib import Path

import pandas as pd

from ctm import paths

logger = logging.getLogger("deidentify")

# Prolific IDs are 24-character hexadecimal strings (MongoDB ObjectIDs).
# Matched as whole tokens so that IDs embedded in free text are also caught.
PROLIFIC_ID_PATTERN = re.compile(r"\b[0-9a-fA-F]{24}\b")

CHECKSUM_FILENAME = "checksums.sha256"


def scan_identifiers(frame: pd.DataFrame) -> set[str]:
    """Collect every Prolific-ID-like token appearing anywhere in a dataframe."""
    found: set[str] = set()
    for column in frame.columns:
        if frame[column].dtype != object:
            continue
        for value in frame[column].dropna().astype(str).unique():
            found.update(PROLIFIC_ID_PATTERN.findall(value))
    return found


def build_id_map(
    identifiers: set[str], prefix: str, digits: int, existing_path: Path
) -> dict[str, str]:
    """Assign a deterministic surrogate ID to each identifier, append-only.

    Surrogates are assigned in sorted order of the original identifier, which is
    arbitrary with respect to any participant attribute.

    Crucially, an existing mapping is **never renumbered**. Adding a data file that
    introduces new participants must not change the surrogate of anyone already
    mapped: every previously generated file in `data/processed/` refers to
    participants by surrogate, and silently reassigning them would invalidate all of
    that work without any error being raised. New identifiers are therefore appended
    after the highest number already in use.

    Args:
        identifiers: Every identifier token found in the current source files.
        prefix: Surrogate prefix, e.g. ``"S"``.
        digits: Zero-padded width of the numeric part.
        existing_path: Location of a previously written map, if any.

    Returns:
        Mapping from original identifier to surrogate.
    """
    id_map: dict[str, str] = {}
    next_index = 1

    if existing_path.is_file():
        previous = pd.read_csv(existing_path, dtype=str)
        id_map = dict(zip(previous["original_id"], previous["surrogate_id"]))
        numbers = [
            int(surrogate[len(prefix):])
            for surrogate in id_map.values()
            if surrogate.startswith(prefix) and surrogate[len(prefix):].isdigit()
        ]
        next_index = max(numbers, default=0) + 1
        logger.info(
            "Reusing %d existing surrogate assignments from %s", len(id_map), existing_path
        )

    new_identifiers = sorted(identifiers - set(id_map))
    for original in new_identifiers:
        id_map[original] = f"{prefix}{next_index:0{digits}d}"
        next_index += 1
    if new_identifiers:
        logger.info("Assigned %d new surrogate(s)", len(new_identifiers))

    return id_map


def apply_id_map(frame: pd.DataFrame, id_map: dict[str, str]) -> pd.DataFrame:
    """Return a copy of `frame` with every identifier token replaced.

    Replacement is per *value*, not per column, so a column that merely happens to
    contain an identifier is handled without disturbing its other values.
    """
    out = frame.copy()

    def substitute(value: object) -> object:
        if not isinstance(value, str):
            return value
        return PROLIFIC_ID_PATTERN.sub(lambda m: id_map.get(m.group(0), m.group(0)), value)

    for column in out.columns:
        if out[column].dtype == object:
            out[column] = out[column].map(substitute)
    return out


def _generation_label(frame: pd.DataFrame, path: Path, position: int) -> str:
    """Derive a `gen-NN` label for a per-generation trial file.

    The file's own `generation` column is authoritative. Its sorted position is used
    as a cross-check, and as a fallback when the column is entirely missing (which
    happens for the final generation in some exports).
    """
    fallback = position + 1
    if "generation" not in frame.columns or frame["generation"].dropna().empty:
        logger.warning(
            "%s has no usable generation column; using sorted position %d",
            path.name,
            fallback,
        )
        return f"gen-{fallback:02d}"

    values = frame["generation"].dropna().unique()
    if len(values) > 1:
        raise ValueError(f"{path.name} mixes generations {sorted(values)}; expected one")
    generation = int(values[0])
    if generation != fallback:
        logger.warning(
            "%s declares generation %d but is at sorted position %d",
            path.name,
            generation,
            fallback,
        )
    return f"gen-{generation:02d}"


def expand_spec(source_root: Path, spec: dict) -> dict[str, pd.DataFrame]:
    """Resolve one config entry into `{destination relative path: dataframe}`.

    Raises:
        FileNotFoundError: If the file or glob matches nothing.
        KeyError: If the spec declares none of the recognised source keys.
    """
    if "source" in spec:
        source_path = source_root / spec["source"]
        if not source_path.is_file():
            raise FileNotFoundError(f"Source file missing: {source_path}")
        return {spec["dest"]: pd.read_csv(source_path, low_memory=False)}

    if "source_glob" not in spec:
        raise KeyError(f"Spec declares neither 'source' nor 'source_glob': {spec}")

    pattern = spec["source_glob"]
    matches = sorted(source_root.glob(pattern))
    if not matches:
        raise FileNotFoundError(f"Source glob matched nothing: {source_root / pattern}")

    if "dest_dir" in spec:
        logger.info("  splitting %d files into %s/", len(matches), spec["dest_dir"])
        expanded: dict[str, pd.DataFrame] = {}
        for position, path in enumerate(matches):
            frame = pd.read_csv(path, low_memory=False)
            label = _generation_label(frame, path, position)
            expanded[f"{spec['dest_dir']}/{label}.csv"] = frame
        return expanded

    logger.info("  concatenating %d files matching %s", len(matches), pattern)
    combined = pd.concat(
        (pd.read_csv(path, low_memory=False) for path in matches), ignore_index=True
    )
    return {spec["dest"]: combined}


def sha256_of(path: Path) -> str:
    """Return the hex SHA-256 digest of a file, read in chunks."""
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1 << 20), b""):
            digest.update(block)
    return digest.hexdigest()


def shipped_csv_paths() -> list[Path]:
    """Every CSV under `data/raw/`, including compressed ones, recursively."""
    return sorted(
        path
        for pattern in ("**/*.csv", "**/*.csv.gz")
        for path in paths.DATA_RAW.glob(pattern)
    )


def run_build(config: dict, dry_run: bool) -> int:
    """Scan the source tree, build the ID map, and write de-identified files."""
    settings = config["deidentify"]
    source_root = paths.resolve(settings["source_root"])
    id_map_path = paths.resolve(settings["id_map_path"])
    drop_columns = set(settings.get("drop_columns", []))

    if paths.ROOT in id_map_path.parents:
        logger.error(
            "id_map_path (%s) is inside the repository. It must be stored outside "
            "so it is never published.",
            id_map_path,
        )
        return 2

    # Pass 1: collect every identifier across all source files, so surrogates are
    # consistent between files (ID in one file == parent_ID in another).
    frames: dict[str, pd.DataFrame] = {}
    identifiers: set[str] = set()
    for spec in settings["files"]:
        logger.info("Reading %s", spec.get("source", spec.get("source_glob")))
        try:
            expanded = expand_spec(source_root, spec)
        except (FileNotFoundError, KeyError, ValueError) as error:
            logger.error("%s", error)
            return 2
        for dest, frame in expanded.items():
            frames[dest] = frame
            identifiers |= scan_identifiers(frame)
        total_rows = sum(len(f) for f in expanded.values())
        logger.info("  %d file(s), %d rows total", len(expanded), total_rows)

    id_map = build_id_map(
        identifiers, settings["surrogate_prefix"], settings["surrogate_digits"], id_map_path
    )
    logger.info("Map covers %d distinct participants", len(id_map))

    if dry_run:
        logger.info("Dry run: no files written. Would write %d file(s):", len(frames))
        for dest in sorted(frames):
            present = sorted(drop_columns & set(frames[dest].columns))
            logger.info("  %-40s drop: %s", dest, present or "none")
        return 0

    # Pass 2: rewrite and write out.
    paths.DATA_RAW.mkdir(parents=True, exist_ok=True)
    id_map_path.parent.mkdir(parents=True, exist_ok=True)
    pd.DataFrame(
        sorted(id_map.items()), columns=["original_id", "surrogate_id"]
    ).to_csv(id_map_path, index=False)
    logger.info("Wrote ID map (PRIVATE, do not commit): %s", id_map_path)

    def _by_dest(key):
        return {
            spec["dest"]: spec[key]
            for spec in settings["files"]
            if key in spec and "dest" in spec
        }

    keep_by_dest = _by_dest("keep_columns")
    dedupe_by_dest = _by_dest("deduplicate_on")

    for dest in sorted(frames):
        frame = apply_id_map(frames[dest], id_map)
        # An explicit keep-list ships only the columns a figure needs, rather than
        # publishing every column a source table happens to carry.
        keep = keep_by_dest.get(dest)
        if keep:
            missing = [column for column in keep if column not in frame.columns]
            if missing:
                logger.error("%s: keep_columns not present: %s", dest, missing)
                return 2
            frame = frame[keep]
        # Some source exports repeat every row many times over; deduplicating on the
        # key that identifies a unique measurement removes that redundancy without
        # losing information. The reduction is logged so it is never silent.
        dedupe_on = dedupe_by_dest.get(dest)
        if dedupe_on:
            missing = [column for column in dedupe_on if column not in frame.columns]
            if missing:
                logger.error("%s: deduplicate_on columns not present: %s", dest, missing)
                return 2
            distinct_values = frame.groupby(dedupe_on, dropna=False).nunique()
            varying = [c for c in distinct_values.columns if (distinct_values[c] > 1).any()]
            if varying:
                logger.error(
                    "%s: rows sharing %s disagree on %s; deduplicating would lose data",
                    dest, dedupe_on, varying,
                )
                return 2
            before = len(frame)
            frame = frame.drop_duplicates(subset=dedupe_on)
            logger.info(
                "  %s: deduplicated %d -> %d rows on %s", dest, before, len(frame), dedupe_on
            )

        dropped = sorted(drop_columns & set(frame.columns))
        frame = frame.drop(columns=dropped)
        dest_path = paths.DATA_RAW / dest
        dest_path.parent.mkdir(parents=True, exist_ok=True)
        # pandas infers gzip compression from a .gz suffix.
        frame.to_csv(dest_path, index=False)
        logger.info("Wrote %-45s %7d rows  drop: %s", dest, len(frame), dropped or "none")

    checksum_path = paths.DATA_RAW / CHECKSUM_FILENAME
    checksum_path.write_text(
        "\n".join(
            f"{sha256_of(path)}  {path.relative_to(paths.DATA_RAW)}"
            for path in shipped_csv_paths()
        )
        + "\n",
        encoding="utf-8",
    )
    logger.info("Wrote %s", checksum_path)
    logger.info("Now run with --check before sharing this repository.")
    return 0


def run_check(config: dict) -> int:
    """Verify that no identifier survived into `data/raw/`.

    A negative control on the de-identification: every shipped file is re-scanned with
    the same pattern used to find identifiers in the first place. The whole directory
    is walked rather than the config list, so a stale file left behind is also caught.
    """
    del config  # The check deliberately inspects what is on disk, not what was declared.
    csv_paths = shipped_csv_paths()
    if not csv_paths:
        logger.error("No files found in %s. Run the build step first.", paths.DATA_RAW)
        return 1

    failures = 0
    for path in csv_paths:
        frame = pd.read_csv(path, low_memory=False)
        leaked = scan_identifiers(frame)
        relative = path.relative_to(paths.DATA_RAW)
        if leaked:
            failures += 1
            logger.error(
                "%s: %d identifier-like tokens survived (e.g. %s)",
                relative,
                len(leaked),
                sorted(leaked)[:3],
            )
        else:
            logger.info("%s: clean", relative)

    if failures:
        logger.error("De-identification check FAILED for %d file(s).", failures)
        return 1
    logger.info("De-identification check passed for %d file(s).", len(csv_paths))
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--config", default=None, help="Path to config.yaml")
    parser.add_argument(
        "--dry-run", action="store_true", help="Report what would happen; write nothing"
    )
    parser.add_argument(
        "--check", action="store_true", help="Verify that data/raw/ contains no identifiers"
    )
    args = parser.parse_args(argv)

    logging.basicConfig(
        level=logging.INFO, format="%(asctime)s  %(levelname)-7s %(message)s", stream=sys.stdout
    )
    config = paths.load_config(args.config)

    if args.check:
        return run_check(config)
    return run_build(config, dry_run=args.dry_run)


if __name__ == "__main__":
    raise SystemExit(main())
