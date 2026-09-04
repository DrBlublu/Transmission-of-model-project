#!/usr/bin/env python
"""Figure S12: stay probability by previous reward and first-stage state similarity.

A 4x5 grid of population-level curves from the fitted mixed-effects logistic model:
two blocks of rows per condition (generations 1-5 and 6-10), one column per generation
within a block. Each panel shows P(stay) against the previous trial's reward, separately
for trials where the first-stage state repeated ("same") or changed ("different").

The divergence between the two curves is the signature of interest: a model-free learner
tracks reward only when the state repeats, so the curves separate; convergence of the two
indicates generalisation across states.

Nothing is fitted here — the curves and their intervals come from the R analysis script.

Input : data/processed/stay_probability_predictions.csv
Output: figures/S12_stay_probability.{pdf,png}
"""

from __future__ import annotations

import logging
import sys

import matplotlib.pyplot as plt
import pandas as pd
from matplotlib.lines import Line2D

from ctm import paths

logger = logging.getLogger("figS12")

FIGURE_STEM = "S12_stay_probability"
INPUT_NAME = "stay_probability_predictions.csv"

SIMILARITY_COLOUR = {"different": "#1f77b4", "same": "#e64b35"}

# Row blocks: condition x generation half. Columns are generations within a block.
ROW_BLOCKS = [
    ("Language", range(1, 6)),
    ("Language", range(6, 11)),
    ("Observation", range(1, 6)),
    ("Observation", range(6, 11)),
]
N_COLUMNS = 5

Y_LIMITS = (0.3, 1.0)


def draw_panel(ax, panel: pd.DataFrame, generation: int) -> None:
    """One generation's curves, with 95% confidence ribbons."""
    for similarity, colour in SIMILARITY_COLOUR.items():
        series = panel[panel["state_similarity"] == similarity].sort_values(
            "previous_outcome"
        )
        if series.empty:
            continue
        ax.fill_between(
            series["previous_outcome"], series["conf_low"], series["conf_high"],
            color=colour, alpha=0.15, linewidth=0,
        )
        ax.plot(
            series["previous_outcome"], series["predicted"],
            color=colour, linewidth=1.8,
        )
    ax.set_ylim(*Y_LIMITS)
    ax.text(0.04, 0.94, f"Gen {generation}", transform=ax.transAxes,
            va="top", ha="left", fontsize=9)


def main() -> int:
    logging.basicConfig(
        level=logging.INFO, format="%(levelname)-7s %(message)s", stream=sys.stdout
    )
    paths.ensure_output_dirs()

    predictions = pd.read_csv(paths.DATA_PROCESSED / INPUT_NAME)

    fig, axes = plt.subplots(
        len(ROW_BLOCKS), N_COLUMNS, figsize=(11.0, 9.0),
        sharex=True, sharey=True,
    )

    for row, (condition, generations) in enumerate(ROW_BLOCKS):
        for column, generation in enumerate(generations):
            ax = axes[row, column]
            panel = predictions[
                (predictions["condition"] == condition)
                & (predictions["generation"] == generation)
            ]
            if panel.empty:
                logger.warning("No predictions for %s generation %d", condition, generation)
            draw_panel(ax, panel, generation)
            if column == 0 and row % 2 == 0:
                # Label each condition once, spanning its two row blocks.
                ax.annotate(
                    condition, xy=(-0.42, 0.0), xycoords="axes fraction",
                    rotation=90, va="center", ha="center", fontsize=12,
                )

    fig.supxlabel("Previous Reward", fontsize=12)
    fig.supylabel("P(Stay)", fontsize=12)

    handles = [
        Line2D([], [], color=colour, linewidth=2, label=similarity)
        for similarity, colour in SIMILARITY_COLOUR.items()
    ]
    fig.legend(
        handles=handles, title="State Similarity", loc="upper center",
        ncol=2, frameon=False, bbox_to_anchor=(0.5, 1.0),
    )
    fig.tight_layout(rect=(0.02, 0.02, 1.0, 0.96))

    for suffix, dpi in (("pdf", None), ("png", 200)):
        out_path = paths.FIGURES / f"{FIGURE_STEM}.{suffix}"
        fig.savefig(out_path, dpi=dpi, bbox_inches="tight")
        logger.info("Wrote %s", out_path)
    plt.close(fig)

    # Report the same/different gap at maximum reward, the effect the figure is about.
    at_max = predictions[
        predictions["previous_outcome"] == predictions["previous_outcome"].max()
    ]
    summary = at_max.pivot_table(
        index=["condition", "generation"], columns="state_similarity", values="predicted"
    )
    summary["gap"] = summary["same"] - summary["different"]
    for condition in summary.index.get_level_values("condition").unique():
        gaps = summary.loc[condition, "gap"]
        logger.info("%-11s same-different gap at max reward: %s",
                    condition, gaps.round(3).to_list())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
