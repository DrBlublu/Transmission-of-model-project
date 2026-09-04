#!/usr/bin/env python
"""Run the Bayesian ideal observer over every observation-condition demonstrator.

For each demonstrator, records how many times each gnome had been shown by each of
their last 80 successful trials. Those cumulative counts are sufficient for the
observer's posterior under any symmetric Beta prior, so the expensive scan over trial
data happens once and the prior sensitivity analysis in the figure is then free.

Input : data/raw/trials/observation/gen-*.csv
Output: data/processed/bayesian_observer_cumcounts.npy          (n_demos, 80, 8)
        data/processed/bayesian_observer_per_demonstrator.csv
        data/processed/bayesian_observer_gnome_frequency.csv
"""

from __future__ import annotations

import logging
import sys

import numpy as np
import pandas as pd

from ctm import paths
from ctm.bayesian_observer import (
    GNOMES,
    N_DEMO_TRIALS,
    cumulative_counts,
    demonstrator_sessions,
    label_gnomes,
    posterior_on_true_forest,
    verify_canonical_encoding,
)
from ctm.io import load_trials

logger = logging.getLogger("bayesian_observer")

COUNTS_NAME = "bayesian_observer_cumcounts.npy"
DEMONSTRATOR_NAME = "bayesian_observer_per_demonstrator.csv"
FREQUENCY_NAME = "bayesian_observer_gnome_frequency.csv"

# Default reference prior for the summary statistics: Beta(1, 1), i.e. uniform.
REFERENCE_ALPHA = 1.0
REFERENCE_BETA = 1.0

# Threshold for calling a gnome's mapping "learned", used only for reporting.
CONFIDENT_POSTERIOR = 0.95


def main() -> int:
    logging.basicConfig(
        level=logging.INFO, format="%(levelname)-7s %(message)s", stream=sys.stdout
    )
    paths.ensure_output_dirs()

    trials = label_gnomes(load_trials("Observation"))
    verify_canonical_encoding(trials)
    logger.info("Canonical encoding verified: state2 == choice on all successful trials")

    sessions = demonstrator_sessions(trials)
    if not sessions:
        raise ValueError("No demonstrators found")

    counts_per_demonstrator = np.stack([cumulative_counts(s) for _, _, s in sessions])
    logger.info(
        "%d demonstrators x %d trials x %d gnomes",
        *counts_per_demonstrator.shape,
    )

    np.save(paths.DATA_PROCESSED / COUNTS_NAME, counts_per_demonstrator)
    logger.info("Wrote %s", paths.DATA_PROCESSED / COUNTS_NAME)

    final_counts = counts_per_demonstrator[:, -1, :]
    final_posterior = posterior_on_true_forest(
        final_counts, REFERENCE_ALPHA, REFERENCE_BETA
    )

    per_demonstrator = pd.DataFrame(
        {
            "ID": [participant_id for participant_id, _, _ in sessions],
            "generation": [generation for _, generation, _ in sessions],
            "mean_posterior": final_posterior.mean(axis=1),
            "n_confident": (final_posterior > CONFIDENT_POSTERIOR).sum(axis=1),
            "n_never_seen": (final_counts == 0).sum(axis=1),
        }
    )
    for i, gnome in enumerate(GNOMES):
        per_demonstrator[f"n_{gnome}"] = final_counts[:, i]
        per_demonstrator[f"post_{gnome}"] = final_posterior[:, i]

    per_demonstrator.to_csv(paths.DATA_PROCESSED / DEMONSTRATOR_NAME, index=False)
    logger.info(
        "Wrote %s (%d demonstrators)",
        paths.DATA_PROCESSED / DEMONSTRATOR_NAME, len(per_demonstrator),
    )

    # Pooled share of demonstration trials per gnome, against the uniform 12.5%.
    pooled = final_counts.sum(axis=0)
    frequency = pd.DataFrame(
        {
            "gnome": GNOMES,
            "gnome_number": range(1, len(GNOMES) + 1),
            "n_trials": pooled,
            "percent": 100.0 * pooled / pooled.sum(),
        }
    )
    frequency.to_csv(paths.DATA_PROCESSED / FREQUENCY_NAME, index=False)
    logger.info("Wrote %s", paths.DATA_PROCESSED / FREQUENCY_NAME)

    expected = 100.0 / len(GNOMES)
    logger.info(
        "Gnome share of demonstration trials: %s (uniform would be %.1f%%)",
        frequency["percent"].round(2).to_list(), expected,
    )
    logger.info(
        "Total demonstration trials pooled: %d (%d demonstrators x %d trials)",
        pooled.sum(), len(sessions), N_DEMO_TRIALS,
    )
    logger.info(
        "Mean final posterior on the true forest: %.3f; mean gnomes never shown: %.2f",
        per_demonstrator["mean_posterior"].mean(),
        per_demonstrator["n_never_seen"].mean(),
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
