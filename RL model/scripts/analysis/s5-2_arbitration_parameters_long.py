#!/usr/bin/env python
"""Reshape the fitted arbitration parameters into a tidy, display-labelled table.

One row per participant per parameter, carrying the label used in the figures. The
only transform applied is the presentational rescale of `understanding` (a probability
in [0, 1]) onto the 0-100 "estimated task knowledge" scale used in the published panel.

Input : data/processed/arbitration_fitted_params.csv
Output: data/processed/arbitration_parameters_long.csv
        data/processed/arbitration_parameters_by_generation.csv  (per-cell means)
"""

from __future__ import annotations

import logging
import sys

import pandas as pd

from ctm import paths

logger = logging.getLogger("parameters_long")

INPUT_NAME = "arbitration_fitted_params.csv"
OUTPUT_LONG = "arbitration_parameters_long.csv"
OUTPUT_MEANS = "arbitration_parameters_by_generation.csv"

# Source column -> display label, in published panel order (A-H).
PARAMETER_LABELS = {
    "alpha": "Reward learning rate",
    "alpha_performance_MF": "MF performance learning rate",
    "alpha_performance_MB": "MB performance learning rate",
    "beta": "Beta",
    "trace": "Eligibility trace",
    "bias_towards_mb": "Bias towards MB",
    "n0": "Performance difference sensitivity",
    "estimated_understanding": "Estimated task knowledge",
}

# `understanding` is a probability; the published panel plots it as a percentage.
UNDERSTANDING_SCALE = 100.0


def main() -> int:
    logging.basicConfig(
        level=logging.INFO, format="%(levelname)-7s %(message)s", stream=sys.stdout
    )
    paths.ensure_output_dirs()

    fitted = pd.read_csv(paths.DATA_PROCESSED / INPUT_NAME)
    fitted["estimated_understanding"] = fitted["understanding"] * UNDERSTANDING_SCALE
    # The arbitration weight is W = sigmoid(n0 * (perf_MB - perf_MF) - n1), so it is
    # *minus* n1 that shifts control towards model-based. The published panel plots
    # that sign-flipped quantity, labelled "Bias towards MB".
    fitted["bias_towards_mb"] = -fitted["n1"]

    missing = [column for column in PARAMETER_LABELS if column not in fitted.columns]
    if missing:
        raise KeyError(f"Fitted parameters missing columns: {missing}")

    long = fitted.melt(
        id_vars=["ID", "condition", "generation"],
        value_vars=list(PARAMETER_LABELS),
        var_name="parameter",
        value_name="value",
    )
    long["label"] = long["parameter"].map(PARAMETER_LABELS)
    # Preserve published panel order for downstream consumers.
    long["label"] = pd.Categorical(
        long["label"], categories=list(PARAMETER_LABELS.values()), ordered=True
    )
    long = long.sort_values(["label", "condition", "generation", "ID"])

    if long["value"].isna().any():
        raise ValueError("NaN parameter values after reshaping")

    long_path = paths.DATA_PROCESSED / OUTPUT_LONG
    long.to_csv(long_path, index=False)
    logger.info(
        "Wrote %s (%d rows: %d participants x %d parameters)",
        long_path, len(long), fitted["ID"].nunique(), len(PARAMETER_LABELS),
    )

    means = (
        long.groupby(["label", "condition", "generation"], observed=True)["value"]
        .agg(mean="mean", sd="std", n="size")
        .reset_index()
    )
    means_path = paths.DATA_PROCESSED / OUTPUT_MEANS
    means.to_csv(means_path, index=False)
    logger.info("Wrote %s (%d cells)", means_path, len(means))

    for label in PARAMETER_LABELS.values():
        cell = means[means["label"] == label]
        language = cell[cell["condition"] == "Language"].sort_values("generation")["mean"]
        logger.info(
            "%-34s Language gen 1 -> 10: %.3f -> %.3f",
            label, language.iloc[0], language.iloc[-1],
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
