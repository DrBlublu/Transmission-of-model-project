"""Canonical paths and configuration loading.

Every script imports its paths from here rather than constructing them, so the
repository can be relocated or renamed without editing any analysis code.
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

import yaml

# src/ctm/paths.py -> src/ctm -> src -> repository root
ROOT: Path = Path(__file__).resolve().parents[2]

DATA_RAW: Path = ROOT / "data" / "raw"
DATA_PROCESSED: Path = ROOT / "data" / "processed"
FIGURES: Path = ROOT / "figures"
LOGS: Path = ROOT / "logs"
DOCS: Path = ROOT / "docs"
CONFIG_FILE: Path = ROOT / "config.yaml"


def load_config(path: Path | str | None = None) -> dict[str, Any]:
    """Load `config.yaml` as a dictionary.

    Args:
        path: Config file to read. Defaults to `config.yaml` at the repository root.

    Returns:
        Parsed configuration.

    Raises:
        FileNotFoundError: If the config file does not exist.
    """
    config_path = Path(path) if path is not None else CONFIG_FILE
    if not config_path.is_file():
        raise FileNotFoundError(f"Config file not found: {config_path}")
    with config_path.open("r", encoding="utf-8") as handle:
        return yaml.safe_load(handle)


def resolve(path: Path | str) -> Path:
    """Resolve a possibly-relative config path against the repository root."""
    candidate = Path(path).expanduser()
    return candidate if candidate.is_absolute() else (ROOT / candidate).resolve()


def ensure_output_dirs() -> None:
    """Create the generated-output directories if they do not yet exist."""
    for directory in (DATA_PROCESSED, FIGURES, LOGS):
        directory.mkdir(parents=True, exist_ok=True)
