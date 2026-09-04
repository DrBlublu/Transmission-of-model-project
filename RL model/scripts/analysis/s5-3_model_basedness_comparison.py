#!/usr/bin/env python
"""Pair each participant's model-basedness estimate from the two model families.

The arbitration model derives W online from the running performance of the model-based
and model-free controllers; the fixed model fits it directly as a free parameter. Both
are estimates of the same construct from the same choices, so their agreement is a
convergent-validity check rather than a replication.

Input : data/processed/fixed_model_fitted_params.csv
        data/processed/arbitration_w_summary.csv
Output: data/processed/model_basedness_comparison.csv
        data/processed/model_basedness_comparison_stats.csv
"""

from __future__ import annotations

import logging
import sys

import pandas as pd
from scipy import stats

from ctm import paths

logger = logging.getLogger("w_comparison")

FIXED_NAME = "fixed_model_fitted_params.csv"
ARBITRATION_NAME = "arbitration_w_summary.csv"
OUTPUT_NAME = "model_basedness_comparison.csv"
STATS_NAME = "model_basedness_comparison_stats.csv"


def main() -> int:
    logging.basicConfig(
        level=logging.INFO, format="%(levelname)-7s %(message)s", stream=sys.stdout
    )
    paths.ensure_output_dirs()

    fixed = pd.read_csv(paths.DATA_PROCESSED / FIXED_NAME)
    arbitration = pd.read_csv(paths.DATA_PROCESSED / ARBITRATION_NAME)

    comparison = fixed[
        ["ID", "condition", "generation", "w_fixed", "r_hat_max"]
    ].merge(
        arbitration[["ID", "condition", "generation", "w"]].rename(
            columns={"w": "w_arbitration"}
        ),
        on=["ID", "condition", "generation"],
        how="inner",
    )

    dropped = len(fixed) - len(comparison)
    if dropped:
        # The fixed-model fits cover slightly fewer participants than the arbitration
        # fits; an inner join keeps only those estimated by both, as the figure requires.
        logger.info(
            "%d of %d fixed-model participants have no arbitration estimate and are dropped",
            dropped, len(fixed),
        )

    out_path = paths.DATA_PROCESSED / OUTPUT_NAME
    comparison.to_csv(out_path, index=False)
    logger.info("Wrote %s (%d participants)", out_path, len(comparison))

    # Computed here rather than in the figure script so that every number shown on
    # the figure is present in a processed file.
    rows = []
    for condition, group in comparison.groupby("condition"):
        result = stats.linregress(group["w_arbitration"], group["w_fixed"])
        rows.append({
            "condition": condition,
            "n": len(group),
            "r": result.rvalue,
            "r_squared": result.rvalue ** 2,
            "p_value": result.pvalue,
            "slope": result.slope,
            "intercept": result.intercept,
        })
        logger.info(
            "%-11s n=%4d  r=%.3f  R2=%.3f  p=%.3g",
            condition, len(group), result.rvalue, result.rvalue**2, result.pvalue,
        )

    stats_path = paths.DATA_PROCESSED / STATS_NAME
    pd.DataFrame(rows).to_csv(stats_path, index=False)
    logger.info("Wrote %s", stats_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
