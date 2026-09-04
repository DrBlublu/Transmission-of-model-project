#!/usr/bin/env python
"""Aggregate the arbitration-model fit restarts into one parameter set per participant.

Each participant was fitted with 100 random restarts of the maximum-likelihood
search. The published analysis takes the **mean across restarts** for every
parameter -- not the single best-likelihood restart, and not the median. This was
verified against the archived parameter files, which the mean reproduces to 5e-10
while the median and the max-likelihood restart do not.

Input : data/raw/arbitration_restarts_{language,observation}.csv.gz
Output: data/processed/arbitration_fitted_params.csv
"""

from __future__ import annotations

import logging
import sys

import pandas as pd

from ctm import paths
from ctm.arbitration import PARAMETER_NAMES
from ctm.io import participant_generations

logger = logging.getLogger("fitted_params")

OUTPUT_NAME = "arbitration_fitted_params.csv"

SOURCES = {
    "Language": "arbitration_restarts_language.csv.gz",
    "Observation": "arbitration_restarts_observation.csv.gz",
}

# Restart-level columns aggregated to one value per participant.
AGGREGATED_COLUMNS = list(PARAMETER_NAMES) + ["loglikelihood"]

EXPECTED_RESTARTS = 100


def summarise_condition(
    condition: str, filename: str, generations: pd.DataFrame
) -> pd.DataFrame:
    """Load one condition's restarts and take the median of each parameter.

    Args:
        condition: Condition label to attach to the result.
        filename: File within `data/raw/` holding that condition's restarts.
        generations: Authoritative ID -> generation map from the raw trial files.

    Returns:
        One row per (ID, generation) with median parameters.
    """
    restarts = pd.read_csv(paths.DATA_RAW / filename)
    missing = set(AGGREGATED_COLUMNS) - set(restarts.columns)
    if missing:
        raise KeyError(f"{filename} is missing expected columns: {sorted(missing)}")

    # Some exports leave `generation` blank for the final generation. Recover it from
    # the trial files rather than assuming a value, and fail if the two disagree.
    lookup = generations.query("condition == @condition").set_index("ID")["generation"]
    recovered = restarts["ID"].map(lookup)
    unknown = restarts.loc[recovered.isna(), "ID"].nunique()
    if unknown:
        raise ValueError(f"{condition}: {unknown} fitted participants absent from trial data")

    disagree = restarts["generation"].notna() & (restarts["generation"] != recovered)
    if disagree.any():
        raise ValueError(
            f"{condition}: {disagree.sum()} restart rows disagree with the trial-file generation"
        )
    n_filled = int(restarts["generation"].isna().sum())
    if n_filled:
        logger.info(
            "%s: recovered generation for %d restart rows (%d participants) from trial data",
            condition,
            n_filled,
            restarts.loc[restarts["generation"].isna(), "ID"].nunique(),
        )
    restarts["generation"] = recovered.astype(int)

    per_participant = restarts.groupby(["ID", "generation"]).size()
    if not (per_participant == EXPECTED_RESTARTS).all():
        counts = per_participant.value_counts().to_dict()
        logger.warning(
            "%s: not every participant has %d restarts (counts: %s)",
            condition,
            EXPECTED_RESTARTS,
            counts,
        )

    summary = (
        restarts.groupby(["ID", "generation"])[AGGREGATED_COLUMNS].mean().reset_index()
    )
    summary["condition"] = condition
    logger.info(
        "%s: %d restart rows -> %d participants", condition, len(restarts), len(summary)
    )
    return summary


def main() -> int:
    logging.basicConfig(
        level=logging.INFO, format="%(levelname)-7s %(message)s", stream=sys.stdout
    )
    paths.ensure_output_dirs()

    generations = participant_generations()
    summaries = [
        summarise_condition(cond, name, generations) for cond, name in SOURCES.items()
    ]
    fitted = pd.concat(summaries, ignore_index=True)

    expected = len(generations)
    if len(fitted) != expected:
        raise ValueError(
            f"Expected one parameter set per participant ({expected}), got {len(fitted)}"
        )

    # Every parameter must be finite; a NaN here would silently poison the simulation.
    if fitted[list(PARAMETER_NAMES)].isna().any().any():
        bad = fitted[fitted[list(PARAMETER_NAMES)].isna().any(axis=1)]
        raise ValueError(f"{len(bad)} participants have NaN parameters after aggregation")

    out_path = paths.DATA_PROCESSED / OUTPUT_NAME
    fitted.to_csv(out_path, index=False)
    logger.info("Wrote %s (%d participants)", out_path, len(fitted))
    logger.info(
        "understanding: median %.3f, range %.3f-%.3f",
        fitted["understanding"].median(),
        fitted["understanding"].min(),
        fitted["understanding"].max(),
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
