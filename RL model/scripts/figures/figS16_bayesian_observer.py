#!/usr/bin/env python
"""Figure S16: what a Bayesian ideal observer could learn from watching a demonstrator.

Panel A  Share of pooled demonstration trials accounted for by each gnome, against the
         12.5% a uniform demonstrator would produce.
Panel B  The observer's task-knowledge trajectory under the **empirical** demonstrators,
         for five symmetric Beta priors (concentration kappa), with the 95% range across
         demonstrators shaded.
Panel C  The same under a **uniform** demonstrator who cycles through all eight gnomes.

Task knowledge is 2 * P(true forest) - 1, so 0 is chance and 1 is certainty.

The prior sensitivity analysis is computed here from the cumulative counts, which is
closed-form and cheap; the counts themselves come from the analysis step.

Input : data/processed/bayesian_observer_cumcounts.npy
        data/processed/bayesian_observer_gnome_frequency.csv
Output: figures/S16_bayesian_observer.{pdf,png}
"""

from __future__ import annotations

import logging
import sys

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from matplotlib import cm
from matplotlib.lines import Line2D

from ctm import paths
from ctm.bayesian_observer import (
    N_DEMO_TRIALS,
    N_GNOMES,
    kappa_to_beta_prior,
    posterior_on_true_forest,
    to_knowledge,
    uniform_demonstrator_counts,
)

logger = logging.getLogger("figS16")

FIGURE_STEM = "S16_bayesian_observer"
COUNTS_NAME = "bayesian_observer_cumcounts.npy"
FREQUENCY_NAME = "bayesian_observer_gnome_frequency.csv"

# Prior concentrations: small = weak prior, large = strong prior needing more evidence.
KAPPAS = (0.2, 1.0, 2.0, 4.0, 10.0)

BAR_COLOUR = "#6C8A8A"
REFERENCE_GREY = "#7A7A7A"

# Percentile range shaded across demonstrators in panel B.
BAND_PERCENTILES = (2.5, 97.5)


def kappa_colours() -> dict[float, tuple]:
    """Ordered, colourblind-safe colours so that kappa reads off the colour ramp."""
    ramp = cm.viridis(np.linspace(0.08, 0.90, len(KAPPAS)))
    return dict(zip(KAPPAS, ramp))


def draw_frequency(ax, frequency: pd.DataFrame) -> None:
    """Panel A: per-gnome share of demonstration trials."""
    uniform_percent = 100.0 / N_GNOMES
    positions = np.arange(len(frequency))
    ax.bar(positions, frequency["percent"], color=BAR_COLOUR, edgecolor="black",
           linewidth=0.6, width=0.74)
    ax.axhline(uniform_percent, color=REFERENCE_GREY, ls="--", lw=1.3,
               label=f"Uniform ({uniform_percent:.1f}%)")
    ax.set_xticks(positions)
    ax.set_xticklabels(frequency["gnome_number"].astype(str), fontsize=9)
    ax.set_xlabel("Gnome")
    ax.set_ylabel("% of demonstration trials")
    ax.set_ylim(0, max(15.0, frequency["percent"].max() * 1.15))
    ax.legend(frameon=False, loc="upper right", fontsize=8)


def draw_trajectories(ax, counts: np.ndarray, colours: dict, dashed: bool) -> None:
    """Panels B and C: task knowledge against demonstration trial, one line per kappa.

    Args:
        counts: `(n_demos, 80, 8)` for the empirical case, or `(80, 8)` for uniform.
        colours: kappa -> colour.
        dashed: Draw dashed lines and omit the across-demonstrator band.
    """
    trials = np.arange(1, N_DEMO_TRIALS + 1)
    for kappa in KAPPAS:
        alpha0, beta0 = kappa_to_beta_prior(kappa)
        knowledge = to_knowledge(posterior_on_true_forest(counts, alpha0, beta0))

        if not dashed:
            # Average over gnomes within a demonstrator, then take the range across them.
            per_demonstrator = knowledge.mean(axis=2)
            ax.fill_between(
                trials,
                np.percentile(per_demonstrator, BAND_PERCENTILES[0], axis=0),
                np.percentile(per_demonstrator, BAND_PERCENTILES[1], axis=0),
                color=colours[kappa], alpha=0.10, linewidth=0,
            )
            mean_curve = knowledge.mean(axis=(0, 2))
        else:
            mean_curve = knowledge.mean(axis=1)

        ax.plot(trials, mean_curve, color=colours[kappa], lw=2.0,
                ls="--" if dashed else "-")

    for level in (0.0, 1.0):
        ax.axhline(level, color=REFERENCE_GREY, ls="--", lw=1.3)
    ax.set_xlabel("Demonstration trial")
    ax.set_ylabel("Task knowledge")
    ax.set_xlim(0, N_DEMO_TRIALS)
    ax.set_ylim(-0.05, 1.05)


def main() -> int:
    logging.basicConfig(
        level=logging.INFO, format="%(levelname)-7s %(message)s", stream=sys.stdout
    )
    paths.ensure_output_dirs()

    empirical_counts = np.load(paths.DATA_PROCESSED / COUNTS_NAME)
    frequency = pd.read_csv(paths.DATA_PROCESSED / FREQUENCY_NAME)
    uniform_counts = uniform_demonstrator_counts()
    colours = kappa_colours()

    fig, axes = plt.subplots(
        1, 3, figsize=(12.5, 4.4), gridspec_kw={"width_ratios": [0.8, 1.2, 1.2]}
    )
    draw_frequency(axes[0], frequency)
    draw_trajectories(axes[1], empirical_counts, colours, dashed=False)
    draw_trajectories(axes[2], uniform_counts, colours, dashed=True)

    handles = [
        Line2D([], [], color=colours[k], lw=2.2, label=f"$\\kappa$ = {k:g}")
        for k in KAPPAS
    ] + [
        Line2D([], [], color="0.25", lw=2.2, ls="-", label="Empirical"),
        Line2D([], [], color="0.25", lw=2.2, ls="--", label="Uniform"),
    ]
    axes[2].legend(handles=handles, loc="center right", bbox_to_anchor=(1.0, 0.18),
                   ncol=2, frameon=False, fontsize=8, handlelength=1.8,
                   columnspacing=1.0, borderaxespad=0.3)

    for ax, label in zip(axes, "ABC"):
        ax.text(-0.16, 1.04, label, transform=ax.transAxes, fontsize=14,
                fontweight="bold")
        ax.spines["top"].set_visible(False)
        ax.spines["right"].set_visible(False)
    fig.tight_layout()

    for suffix, dpi in (("pdf", None), ("png", 300)):
        out_path = paths.FIGURES / f"{FIGURE_STEM}.{suffix}"
        fig.savefig(out_path, dpi=dpi, bbox_inches="tight")
        logger.info("Wrote %s", out_path)
    plt.close(fig)

    # Final knowledge after all 80 trials: the cost of uneven sampling, per prior.
    for kappa in KAPPAS:
        alpha0, beta0 = kappa_to_beta_prior(kappa)
        empirical = to_knowledge(
            posterior_on_true_forest(empirical_counts, alpha0, beta0)
        ).mean(axis=(0, 2))[-1]
        uniform = to_knowledge(
            posterior_on_true_forest(uniform_counts, alpha0, beta0)
        ).mean(axis=1)[-1]
        logger.info(
            "kappa=%-4g final knowledge: empirical %.3f vs uniform %.3f (shortfall %.3f)",
            kappa, empirical, uniform, uniform - empirical,
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
