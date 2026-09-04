"""Loaders for the shipped raw data.

Reading is centralised here so that every script sees the same tables with the same
validation applied, and so the on-disk layout can change without touching analyses.
"""

from __future__ import annotations

import logging

import pandas as pd

from ctm import paths

logger = logging.getLogger(__name__)

CONDITIONS = ("Language", "Observation")

# Directory under data/raw/trials/ holding each condition's per-generation files.
_TRIAL_DIRS = {"Language": "language", "Observation": "observation"}

TRIALS_PER_PARTICIPANT = 256

REQUIRED_TRIAL_COLUMNS = (
    "ID",
    "n_trial",
    "state1",
    "rew_1",
    "rew_2",
    "stake",
    "generation",
)


def load_trials(condition: str) -> pd.DataFrame:
    """Load one condition's trial-level data, concatenating its per-generation files.

    Args:
        condition: Either ``"Language"`` or ``"Observation"``.

    Returns:
        Trial-level table with a `condition` column added, sorted by
        (generation, ID, n_trial).

    Raises:
        ValueError: If the condition is unknown or no generation files are present.
        KeyError: If a required column is missing.
    """
    if condition not in _TRIAL_DIRS:
        raise ValueError(f"Unknown condition {condition!r}; expected one of {CONDITIONS}")

    trial_dir = paths.DATA_RAW / "trials" / _TRIAL_DIRS[condition]
    generation_files = sorted(trial_dir.glob("gen-*.csv"))
    if not generation_files:
        raise ValueError(f"No generation files found in {trial_dir}")

    frames = [pd.read_csv(path, low_memory=False) for path in generation_files]
    trials = pd.concat(frames, ignore_index=True)

    missing = set(REQUIRED_TRIAL_COLUMNS) - set(trials.columns)
    if missing:
        raise KeyError(f"{condition} trials missing columns: {sorted(missing)}")

    trials["condition"] = condition
    trials = trials.sort_values(["generation", "ID", "n_trial"]).reset_index(drop=True)
    logger.info(
        "%s: %d files, %d trials, %d participants",
        condition,
        len(generation_files),
        len(trials),
        trials["ID"].nunique(),
    )
    return trials


def participant_generations() -> pd.DataFrame:
    """Map every participant to their condition and generation, from the trial files.

    The trial files are the authoritative record of which generation a participant
    belongs to; other tables are reconciled against this.

    Returns:
        Columns `ID`, `condition`, `generation`, one row per participant.
    """
    records = []
    for condition in CONDITIONS:
        trials = load_trials(condition)
        per_participant = (
            trials.groupby("ID")["generation"].nunique().rename("n_generations")
        )
        ambiguous = per_participant[per_participant > 1]
        if not ambiguous.empty:
            raise ValueError(
                f"{condition}: {len(ambiguous)} participants span multiple generations"
            )
        records.append(
            trials.groupby("ID", as_index=False)
            .agg(generation=("generation", "first"))
            .assign(condition=condition)
        )
    return pd.concat(records, ignore_index=True)[["ID", "condition", "generation"]]
