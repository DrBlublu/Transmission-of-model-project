#!/usr/bin/env python
"""Figure S17: behavioural confusability of the candidate strategies.

Two lower-triangle heatmaps of pairwise behavioural similarity, computed on the same
simulations but from different profiles:

Panel A  choice probability — the trial-by-trial probability of choosing the forest-0
         option, i.e. what the agent *does*.
Panel B  corrected reward — reward earned minus the mean reward available on that trial,
         i.e. what the agent *gets*, with the shared environment divided out.

High similarity means two strategies produce near-identical behaviour and therefore
cannot be separated by fitting, however good the fitting procedure. Only the nine
strategies that are informative for that question are shown; the full 14-strategy
matrices are in the processed files.

See `docs/candidate_models.md` for what each strategy and parameter means.

Input : data/processed/behavior_similarity_{choice,reward}.csv
Output: figures/S17_behavior_similarity.{pdf,png}
"""

from __future__ import annotations

import logging
import sys

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

from ctm import paths

logger = logging.getLogger("figS17")

FIGURE_STEM = "S17_behavior_similarity"

# The strategies shown, in the published order.
DISPLAYED = [
    "MB-colour", "MF-colour", "Arbitration", "Fixed-MB-w",
    "MB-WSLS", "col-WSLS", "MF-multi", "MF-size", "MB-size",
]
DISPLAY_NAME = {
    "MB-colour": "MB (color)",
    "MF-colour": "MF (color)",
    "Arbitration": "Hybrid MB-MF: arbitration",
    "Fixed-MB-w": "Hybrid MB-MF: fixed w",
    "MB-WSLS": "WSLS (forest)",
    "col-WSLS": "WSLS (color)",
    "MF-multi": "MF (color+size)",
    "MF-size": "MF (size)",
    "MB-size": "MB (size)",
}
# Tick labels are coloured by strategy family so the blocks are readable at a glance.
FAMILY_COLOUR = {
    "MB-colour": "#1b9e77", "MB-size": "#66c2a4",
    "MF-colour": "#2c7fb4", "MF-size": "#41b6c4", "MF-multi": "#7fcdbb",
    "Arbitration": "#c0392b", "Fixed-MB-w": "#e67e22",
    "MB-WSLS": "#762a83", "col-WSLS": "#af8dc3",
}

PANELS = [
    ("behavior_similarity_choice.csv", "Choice probability similarity"),
    ("behavior_similarity_reward.csv", "Corrected reward similarity"),
]

# Value above which the annotation is drawn in white for contrast.
_DARK_CELL = 0.6


def draw_panel(fig, ax, similarity: pd.DataFrame, title: str, show_labels: bool) -> None:
    """One lower-triangle heatmap with annotated cells."""
    values = similarity.loc[DISPLAYED, DISPLAYED].to_numpy()
    size = len(DISPLAYED)
    lower = np.arange(size)[:, None] > np.arange(size)[None, :]

    colormap = plt.get_cmap("RdBu_r").copy()
    colormap.set_bad("white")
    image = ax.imshow(np.where(lower, values, np.nan), cmap=colormap, vmin=-1, vmax=1)

    labels = [DISPLAY_NAME[s] for s in DISPLAYED]
    ax.set_xticks(range(size))
    ax.set_yticks(range(size))
    ax.set_xticklabels(labels, rotation=45, ha="right", rotation_mode="anchor", fontsize=8)
    ax.set_yticklabels(labels if show_labels else [""] * size, fontsize=8)

    for i in range(size):
        for j in range(i):
            ax.text(
                j, i, f"{values[i, j]:.2f}", ha="center", va="center", fontsize=5.5,
                color="white" if abs(values[i, j]) > _DARK_CELL else "0.25",
            )

    for tick, strategy in zip(ax.get_xticklabels(), DISPLAYED):
        tick.set_color(FAMILY_COLOUR[strategy])
    if show_labels:
        for tick, strategy in zip(ax.get_yticklabels(), DISPLAYED):
            tick.set_color(FAMILY_COLOUR[strategy])

    ax.tick_params(length=0)
    for spine in ax.spines.values():
        spine.set_visible(False)
    ax.set_title(title, fontsize=11, pad=10)

    colourbar = fig.colorbar(image, ax=ax, fraction=0.045, pad=0.02)
    colourbar.ax.tick_params(labelsize=7)


def main() -> int:
    logging.basicConfig(
        level=logging.INFO, format="%(levelname)-7s %(message)s", stream=sys.stdout
    )
    paths.ensure_output_dirs()

    fig, axes = plt.subplots(1, 2, figsize=(13.5, 6.2))
    for index, (filename, title) in enumerate(PANELS):
        similarity = pd.read_csv(paths.DATA_PROCESSED / filename, index_col=0)
        draw_panel(fig, axes[index], similarity, title, show_labels=index == 0)

    for ax, label in zip(axes, ["A", "B"]):
        ax.text(-0.02, 1.06, label, transform=ax.transAxes, fontsize=17,
                fontweight="bold", va="bottom", ha="right")

    for suffix, dpi in (("pdf", None), ("png", 300)):
        out_path = paths.FIGURES / f"{FIGURE_STEM}.{suffix}"
        fig.savefig(out_path, dpi=dpi, bbox_inches="tight")
        logger.info("Wrote %s", out_path)
    plt.close(fig)

    # The headline numbers: how confusable the value-tracking strategies are, and how
    # cleanly the wrong-feature strategies separate.
    for filename, title in PANELS:
        similarity = pd.read_csv(paths.DATA_PROCESSED / filename, index_col=0)
        cluster = ["MB-colour", "MF-colour", "Arbitration", "Fixed-MB-w"]
        block = similarity.loc[cluster, cluster].to_numpy()
        off_diagonal = block[np.triu_indices(len(cluster), 1)]
        wrong_feature = similarity.loc["MB-size", cluster].abs().max()
        logger.info(
            "%s: value-tracking cluster %.2f-%.2f; MB (size) vs cluster max |r| = %.2f",
            title, off_diagonal.min(), off_diagonal.max(), wrong_feature,
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
