#!/usr/bin/env python
"""Figure 2C: simulated model-basedness (W) across generations, by condition.

Plots the mean W per generation with a +/- 2 SEM band, reproducing the panel in the
manuscript. All quantities come from `data/processed/arbitration_w_summary.csv`;
nothing is computed here beyond the group means and their standard errors.

Input : data/processed/arbitration_w_summary.csv
Output: figures/02c_model_basedness.{pdf,png}
"""

from __future__ import annotations

import logging
import sys

import matplotlib.pyplot as plt
import pandas as pd

from ctm import paths

logger = logging.getLogger("fig02c")

FIGURE_STEM = "02c_model_basedness"
INPUT_NAME = "arbitration_w_summary.csv"

# Manuscript styling: colour, marker and draw order per condition.
CONDITION_STYLE = {
    "Language": {"color": "#F26C6C", "marker": "o"},
    "Observation": {"color": "#1F5F6B", "marker": "D"},
}

# The published panel shades mean +/- 2 SEM rather than a t-based interval.
SEM_MULTIPLIER = 2.0


def summarise(w_summary: pd.DataFrame) -> pd.DataFrame:
    """Mean, SEM and band edges of W per condition and generation."""
    grouped = w_summary.groupby(["condition", "generation"])["w"]
    summary = grouped.agg(mean_w="mean", sd_w="std", n="size").reset_index()
    summary["sem_w"] = summary["sd_w"] / summary["n"] ** 0.5
    summary["band_low"] = summary["mean_w"] - SEM_MULTIPLIER * summary["sem_w"]
    summary["band_high"] = summary["mean_w"] + SEM_MULTIPLIER * summary["sem_w"]
    return summary


def main() -> int:
    logging.basicConfig(
        level=logging.INFO, format="%(levelname)-7s %(message)s", stream=sys.stdout
    )
    paths.ensure_output_dirs()

    w_summary = pd.read_csv(paths.DATA_PROCESSED / INPUT_NAME)
    summary = summarise(w_summary)

    fig, ax = plt.subplots(figsize=(4.6, 3.6))

    for condition, style in CONDITION_STYLE.items():
        series = summary[summary["condition"] == condition].sort_values("generation")
        if series.empty:
            logger.warning("No rows for condition %s", condition)
            continue
        ax.fill_between(
            series["generation"], series["band_low"], series["band_high"],
            color=style["color"], alpha=0.15, linewidth=0,
        )
        ax.plot(
            series["generation"], series["mean_w"],
            color=style["color"], marker=style["marker"],
            markersize=6, linewidth=2, label=condition,
        )

    ax.set_xlabel("Generation")
    ax.set_ylabel("Model reliance ($W$)")
    ax.set_xticks(sorted(summary["generation"].unique()))
    ax.legend(frameon=False, loc="upper left")
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    fig.tight_layout()

    for suffix, dpi in (("pdf", None), ("png", 300)):
        out_path = paths.FIGURES / f"{FIGURE_STEM}.{suffix}"
        fig.savefig(out_path, dpi=dpi, bbox_inches="tight")
        logger.info("Wrote %s", out_path)
    plt.close(fig)

    for condition in CONDITION_STYLE:
        series = summary[summary["condition"] == condition].sort_values("generation")
        logger.info("%s mean W: %s", condition, series["mean_w"].round(3).to_list())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
