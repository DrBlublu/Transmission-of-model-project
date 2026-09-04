#!/usr/bin/env python
"""Figure S7, panels B and D: representational similarity across generations.

Panel B  Correct-structure representation — the regression weight of each participant's
         post-task rating matrix on the true task structure.
Panel D  Convergence — each participant's mean similarity to the other participants of
         their own generation, so a rising line means mental models converge.

Both are split half-violins: Language on the left of each generation, Observation on the
right, with the mean marked at the split and a trajectory line through the means.
Significance marks come from the per-generation Mann-Whitney tests computed in the
analysis step; no test is run here.

Panels A and C of the published figure are hand-made schematic illustrations, not
derived from data, so they are out of scope here (see docs/figure_manifest.md).

Input : data/processed/cognitive_map_rsa.csv
        data/processed/cognitive_map_rsa_stats.csv
Output: figures/S7_rsa.{pdf,png}
"""

from __future__ import annotations

import logging
import sys

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from scipy.stats import gaussian_kde

from ctm import paths

logger = logging.getLogger("figS7")

FIGURE_STEM = "S7_rsa"
INPUT_NAME = "cognitive_map_rsa.csv"
STATS_NAME = "cognitive_map_rsa_stats.csv"

CONDITION_COLOUR = {"Language": "#F26C6C", "Observation": "#1F5F6B"}
GENERATIONS = np.arange(1, 11)

# Maximum half-width of a violin, in generation units.
VIOLIN_HALF_WIDTH = 0.33

PANELS = [
    ("beta", "RSA regression $\\beta$\n(correct structure)",
     "Correct-structure representation across generations"),
    ("isc", "Inter-subject mental model similarity",
     "Convergence of mental models across generations"),
]

SIGNIFICANCE_LEVELS = [(0.001, "***"), (0.01, "**"), (0.05, "*")]


def significance_marker(p_value: float) -> str:
    """Conventional asterisk notation; empty string when not significant."""
    for threshold, marker in SIGNIFICANCE_LEVELS:
        if p_value < threshold:
            return marker
    return ""


def draw_panel(
    ax, rsa: pd.DataFrame, tests: pd.DataFrame, measure: str, ylabel: str, title: str
) -> None:
    """One split-violin panel with per-generation between-condition tests."""
    values = rsa.dropna(subset=[measure])
    low, high = np.nanpercentile(values[measure], [0.5, 99.5])
    grid = np.linspace(low, high, 200)

    # One density scale shared across all violins, so widths are comparable.
    densities = {}
    peak = 0.0
    for condition in CONDITION_COLOUR:
        for generation in GENERATIONS:
            sample = values.loc[
                (values["condition"] == condition) & (values["generation"] == generation),
                measure,
            ].to_numpy()
            density = gaussian_kde(sample)(grid) if len(sample) > 1 else np.zeros_like(grid)
            densities[(condition, generation)] = density
            peak = max(peak, density.max())
    scale = VIOLIN_HALF_WIDTH / peak if peak > 0 else VIOLIN_HALF_WIDTH

    for condition, colour in CONDITION_COLOUR.items():
        side = -1 if condition == "Language" else 1
        means = []
        for generation in GENERATIONS:
            density = densities[(condition, generation)] * scale
            ax.fill_betweenx(
                grid, generation, generation + side * density,
                color=colour, alpha=0.45, linewidth=0,
            )
            sample = values.loc[
                (values["condition"] == condition) & (values["generation"] == generation),
                measure,
            ]
            means.append(sample.mean())
        ax.plot(GENERATIONS, means, color=colour, linewidth=1.6, label=condition, zorder=3)
        ax.scatter(GENERATIONS, means, color=colour, s=16, zorder=4,
                   edgecolor="black", linewidth=0.5)

    # Corrected p-values are read from the analysis output, not recomputed.
    corrected_p = (
        tests[tests["measure"] == measure]
        .set_index("generation")["p_corrected"]
        .reindex(GENERATIONS)
        .to_numpy()
    )

    top = np.nanpercentile(values[measure], 99.5)
    for generation, p_value in zip(GENERATIONS, corrected_p):
        marker = significance_marker(p_value)
        if marker:
            ax.text(generation, top, marker, ha="center", va="bottom", fontsize=9)

    ax.set_xlabel("Generation")
    ax.set_ylabel(ylabel)
    ax.set_title(title, fontsize=10)
    ax.set_xticks(GENERATIONS)
    ax.legend(frameon=False, loc="upper left", fontsize=8)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)


def main() -> int:
    logging.basicConfig(
        level=logging.INFO, format="%(levelname)-7s %(message)s", stream=sys.stdout
    )
    paths.ensure_output_dirs()

    rsa = pd.read_csv(paths.DATA_PROCESSED / INPUT_NAME)
    tests = pd.read_csv(paths.DATA_PROCESSED / STATS_NAME)

    fig, axes = plt.subplots(2, 1, figsize=(8.5, 8.0))
    for ax, (measure, ylabel, title) in zip(axes, PANELS):
        draw_panel(ax, rsa, tests, measure, ylabel, title)
        for_measure = tests[tests["measure"] == measure]
        significant = [
            f"gen {int(row.generation)}{significance_marker(row.p_corrected)}"
            for row in for_measure.itertuples()
            if significance_marker(row.p_corrected)
        ]
        logger.info("%-4s significant generations: %s", measure, significant or "none")

    # Panel letters follow the published figure, where A and C are illustrations.
    for ax, label in zip(axes, ["B", "D"]):
        ax.text(-0.10, 1.06, label, transform=ax.transAxes, fontsize=14,
                fontweight="bold", va="top", ha="left")
    fig.tight_layout()

    for suffix, dpi in (("pdf", None), ("png", 300)):
        out_path = paths.FIGURES / f"{FIGURE_STEM}.{suffix}"
        fig.savefig(out_path, dpi=dpi, bbox_inches="tight")
        logger.info("Wrote %s", out_path)
    plt.close(fig)

    for measure, _, _ in PANELS:
        for condition in CONDITION_COLOUR:
            series = (
                rsa[rsa["condition"] == condition]
                .groupby("generation")[measure].mean().round(3).to_list()
            )
            logger.info("%-4s %-11s: %s", measure, condition, series)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
