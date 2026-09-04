#!/usr/bin/env python
"""Figure S14: every fitted arbitration-model parameter across generations.

Eight panels (A-H), one per parameter, each split into a Language and an Observation
facet. Within a facet, each generation is shown as a raincloud: jittered participant
points, a half violin of the distribution, a box plot, and a black line through the
generation means.

Nothing is computed here beyond the box-plot quantiles and generation means that the
plot elements are made of; the parameter values come from the analysis step.

Input : data/processed/arbitration_parameters_long.csv
Output: figures/S14_arbitration_parameters.{pdf,png}
"""

from __future__ import annotations

import logging
import string
import sys

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

from ctm import paths

logger = logging.getLogger("figS14")

FIGURE_STEM = "S14_arbitration_parameters"
INPUT_NAME = "arbitration_parameters_long.csv"

CONDITION_COLOUR = {"Language": "#F26C6C", "Observation": "#1F5F6B"}
CONDITIONS = tuple(CONDITION_COLOUR)

# Published panel order A-H.
PANEL_ORDER = [
    "Reward learning rate",
    "MF performance learning rate",
    "MB performance learning rate",
    "Beta",
    "Eligibility trace",
    "Bias towards MB",
    "Performance difference sensitivity",
    "Estimated task knowledge",
]

N_PANEL_ROWS, N_PANEL_COLUMNS = 4, 2
JITTER_WIDTH = 0.16
VIOLIN_NUDGE = 0.22
RANDOM_SEED = 20240516


def draw_facet(ax, facet: pd.DataFrame, colour: str, rng: np.random.Generator) -> None:
    """One condition's raincloud series for a single parameter."""
    generations = sorted(facet["generation"].unique())
    by_generation = [facet.loc[facet["generation"] == g, "value"].to_numpy() for g in generations]

    for position, values in zip(generations, by_generation):
        offsets = position + rng.uniform(-JITTER_WIDTH, JITTER_WIDTH, size=values.size)
        ax.scatter(offsets, values, s=1.6, color=colour, alpha=0.35, linewidths=0, zorder=1)

    violins = ax.violinplot(
        by_generation, positions=[g + VIOLIN_NUDGE for g in generations],
        widths=0.7, showextrema=False, showmedians=False,
    )
    for body in violins["bodies"]:
        vertices = body.get_paths()[0].vertices
        # Keep the right half only, giving the "flat violin" of a raincloud plot.
        vertices[:, 0] = np.clip(vertices[:, 0], np.mean(vertices[:, 0]), np.inf)
        body.set_facecolor(colour)
        body.set_alpha(0.55)
        body.set_zorder(2)

    boxes = ax.boxplot(
        by_generation, positions=generations, widths=0.3, showfliers=False,
        patch_artist=True, manage_ticks=False,
    )
    for patch in boxes["boxes"]:
        patch.set_facecolor(colour)
        patch.set_alpha(0.75)
        patch.set_edgecolor(colour)
        patch.set_zorder(3)
    for element in ("whiskers", "caps", "medians"):
        for artist in boxes[element]:
            artist.set_color(colour)
            artist.set_zorder(3)

    means = [values.mean() for values in by_generation]
    ax.plot(generations, means, color="black", linewidth=1.2, zorder=4)
    ax.scatter(generations, means, color="black", s=9, zorder=5)

    ax.set_xticks(generations)
    ax.set_xticklabels([str(g) for g in generations], fontsize=6)
    ax.tick_params(axis="y", labelsize=6)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)


def main() -> int:
    logging.basicConfig(
        level=logging.INFO, format="%(levelname)-7s %(message)s", stream=sys.stdout
    )
    paths.ensure_output_dirs()

    parameters = pd.read_csv(paths.DATA_PROCESSED / INPUT_NAME)
    missing = set(PANEL_ORDER) - set(parameters["label"].unique())
    if missing:
        raise KeyError(f"Missing parameters in {INPUT_NAME}: {sorted(missing)}")

    rng = np.random.default_rng(RANDOM_SEED)
    fig = plt.figure(figsize=(13.0, 15.0))
    # Two axes per panel (one per condition), so four axes per grid row.
    grid = fig.add_gridspec(
        N_PANEL_ROWS, N_PANEL_COLUMNS * len(CONDITIONS),
        hspace=0.42, wspace=0.30,
    )

    for index, label in enumerate(PANEL_ORDER):
        panel = parameters[parameters["label"] == label]
        row, panel_column = divmod(index, N_PANEL_COLUMNS)
        base_column = panel_column * len(CONDITIONS)

        axes = []
        for offset, condition in enumerate(CONDITIONS):
            shared = axes[0] if axes else None
            ax = fig.add_subplot(grid[row, base_column + offset], sharey=shared)
            draw_facet(
                ax, panel[panel["condition"] == condition],
                CONDITION_COLOUR[condition], rng,
            )
            ax.set_title(condition, fontsize=9)
            ax.set_xlabel("Generation", fontsize=8)
            if offset == 0:
                ax.set_ylabel(label, fontsize=8)
            else:
                ax.tick_params(axis="y", labelleft=False)
            axes.append(ax)

        axes[0].text(
            -0.30, 1.12, string.ascii_uppercase[index], transform=axes[0].transAxes,
            fontsize=15, fontweight="bold", va="top", ha="left",
        )

    for suffix, dpi in (("pdf", None), ("png", 160)):
        out_path = paths.FIGURES / f"{FIGURE_STEM}.{suffix}"
        fig.savefig(out_path, dpi=dpi, bbox_inches="tight")
        logger.info("Wrote %s", out_path)
    plt.close(fig)

    for label in PANEL_ORDER:
        panel = parameters[parameters["label"] == label]
        language = panel[panel["condition"] == "Language"].groupby("generation")["value"].mean()
        logger.info("%-34s Language %.3f -> %.3f", label, language.iloc[0], language.iloc[-1])
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
