#!/usr/bin/env python
"""Figure S13: model-estimated task knowledge, over generations and against the measure.

Panel A  Estimated task knowledge across generations, by condition (mean +/- 2 SEM).
Panel B  Model-estimated against measured task knowledge, one facet per condition,
         with a least-squares fit and its R^2.

Both panels read `data/processed/task_knowledge.csv`; the only quantities computed here
are group means and standard errors; the regression statistics come from the
analysis step.

Input : data/processed/task_knowledge.csv
        data/processed/task_knowledge_stats.csv
Output: figures/S13_task_knowledge.{pdf,png}
"""

from __future__ import annotations

import logging
import sys

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from ctm import paths

logger = logging.getLogger("figS13")

FIGURE_STEM = "S13_task_knowledge"
INPUT_NAME = "task_knowledge.csv"
STATS_NAME = "task_knowledge_stats.csv"

CONDITION_STYLE = {
    "Language": {"color": "#F26C6C", "marker": "o"},
    "Observation": {"color": "#1F5F6B", "marker": "D"},
}

SEM_MULTIPLIER = 2.0

# Below this, report as "p < 0.001" rather than printing an uninformative small number.
P_DISPLAY_FLOOR = 0.001


def draw_generations(ax, knowledge: pd.DataFrame) -> None:
    """Panel A: mean estimated task knowledge per generation, with a +/- 2 SEM band."""
    grouped = knowledge.groupby(["condition", "generation"])["knowledge_model"]
    summary = grouped.agg(mean="mean", sd="std", n="size").reset_index()
    summary["sem"] = summary["sd"] / summary["n"] ** 0.5

    ax.axhline(0.0, color="black", linestyle="--", linewidth=1.0, zorder=0)
    for condition, style in CONDITION_STYLE.items():
        series = summary[summary["condition"] == condition].sort_values("generation")
        ax.fill_between(
            series["generation"],
            series["mean"] - SEM_MULTIPLIER * series["sem"],
            series["mean"] + SEM_MULTIPLIER * series["sem"],
            color=style["color"], alpha=0.15, linewidth=0,
        )
        ax.plot(
            series["generation"], series["mean"],
            color=style["color"], marker=style["marker"],
            markersize=6, linewidth=2, label=condition,
        )

    ax.set_xlabel("Generation")
    ax.set_ylabel("Estimated task knowledge")
    ax.set_xticks(sorted(summary["generation"].unique()))
    ax.legend(frameon=False, loc="upper left", ncol=2, fontsize=8)


def draw_correlation(
    ax, paired: pd.DataFrame, fit: pd.Series, condition: str, show_ylabel: bool
) -> None:
    """Panel B facet: measured against model-estimated knowledge, with a fitted line."""
    style = CONDITION_STYLE[condition]
    x = paired["knowledge_data"].to_numpy()
    y = paired["knowledge_model"].to_numpy()

    ax.scatter(x, y, color=style["color"], marker=style["marker"], s=9, alpha=0.45,
               linewidths=0)

    # Slope, intercept, R^2 and p come from the analysis step; nothing is fitted here.
    line_x = np.linspace(x.min(), x.max(), 100)
    ax.plot(line_x, fit["intercept"] + fit["slope"] * line_x,
            color=style["color"], linewidth=2)

    p_text = "p < 0.001" if fit["p_value"] < P_DISPLAY_FLOOR else f"p = {fit['p_value']:.3f}"
    ax.text(0.04, 0.95, f"$R^2$ = {fit['r_squared']:.2f}\n{p_text}",
            transform=ax.transAxes, va="top", ha="left", fontsize=9)

    ax.set_title(condition, fontsize=10)
    ax.set_xlabel("Task knowledge (Data)")
    if show_ylabel:
        ax.set_ylabel("Task knowledge (Arbitration model)")
    else:
        ax.set_yticklabels([])


def main() -> int:
    logging.basicConfig(
        level=logging.INFO, format="%(levelname)-7s %(message)s", stream=sys.stdout
    )
    paths.ensure_output_dirs()

    knowledge = pd.read_csv(paths.DATA_PROCESSED / INPUT_NAME)
    paired = knowledge.dropna(subset=["knowledge_data", "knowledge_model"])
    fits = pd.read_csv(paths.DATA_PROCESSED / STATS_NAME).set_index("condition")

    fig = plt.figure(figsize=(10.0, 3.8))
    grid = fig.add_gridspec(1, 3, width_ratios=[1.25, 1.0, 1.0], wspace=0.28)

    ax_generations = fig.add_subplot(grid[0, 0])
    draw_generations(ax_generations, knowledge)

    axes_correlation = []
    for offset, condition in enumerate(CONDITION_STYLE):
        shared = axes_correlation[0] if axes_correlation else None
        ax = fig.add_subplot(grid[0, 1 + offset], sharey=shared)
        fit = fits.loc[condition]
        draw_correlation(
            ax, paired[paired["condition"] == condition], fit, condition,
            show_ylabel=offset == 0,
        )
        logger.info(
            "%-11s n=%4d  R2=%.3f  p=%.3g",
            condition, int(fit["n"]), fit["r_squared"], fit["p_value"],
        )
        axes_correlation.append(ax)

    for ax, label in zip([ax_generations, axes_correlation[0]], ["A", "B"]):
        ax.text(-0.18, 1.08, label, transform=ax.transAxes, fontsize=14,
                fontweight="bold", va="top", ha="left")

    for ax in [ax_generations, *axes_correlation]:
        ax.spines["top"].set_visible(False)
        ax.spines["right"].set_visible(False)

    for suffix, dpi in (("pdf", None), ("png", 300)):
        out_path = paths.FIGURES / f"{FIGURE_STEM}.{suffix}"
        fig.savefig(out_path, dpi=dpi, bbox_inches="tight")
        logger.info("Wrote %s", out_path)
    plt.close(fig)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
