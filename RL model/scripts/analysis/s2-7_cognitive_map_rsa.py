#!/usr/bin/env python
"""Representational similarity analysis of participants' post-task mental models.

Produces two per-participant measures from the same 10x10 rating matrices:

  beta  how strongly the participant's ratings match the correct task structure
  isc   how similar the participant is to the other participants of their own
        generation and condition (leave-one-out, Fisher-z averaged)

Both are measured from post-task ratings, independently of choice behaviour, so they
are evidence about what participants *represent* rather than what they *do*.

Input : data/raw/cognitive_map/{pair,transition}_{language,observation}.csv
Output: data/processed/cognitive_map_rsa.csv
        data/processed/cognitive_map_rsa_stats.csv
"""

from __future__ import annotations

import logging
import sys

import numpy as np
import pandas as pd
from scipy.stats import mannwhitneyu
from statsmodels.stats.multitest import multipletests

from ctm import paths
from ctm.cognitive_map import (
    TRIL,
    correct_model_rdm,
    correct_structure_beta,
    leave_one_out_similarity,
    participant_vectors,
)

logger = logging.getLogger("cognitive_map_rsa")

OUTPUT_NAME = "cognitive_map_rsa.csv"
STATS_NAME = "cognitive_map_rsa_stats.csv"

# Between-condition tests are corrected across the ten generations, separately for
# each measure, matching the published analysis.
CORRECTION_METHOD = "fdr_bh"
RAW_DIR = "cognitive_map"

CONDITIONS = {
    "Language": ("pair_language.csv", "transition_language.csv"),
    "Observation": ("pair_observation.csv", "transition_observation.csv"),
}


def load_condition(pair_file: str, transition_file: str) -> tuple[pd.DataFrame, pd.DataFrame]:
    """Load one condition's rating tables, normalising the generation column name."""
    pair = pd.read_csv(paths.DATA_RAW / RAW_DIR / pair_file)
    transition = pd.read_csv(paths.DATA_RAW / RAW_DIR / transition_file)
    # The observation exports name the column `gen` rather than `generation`.
    pair = pair.rename(columns={"gen": "generation"})
    if "generation" not in pair.columns:
        raise KeyError(f"{pair_file} has no generation column")
    return pair, transition


def main() -> int:
    logging.basicConfig(
        level=logging.INFO, format="%(levelname)-7s %(message)s", stream=sys.stdout
    )
    paths.ensure_output_dirs()

    model_vector = correct_model_rdm()[TRIL]
    records = []

    for condition, (pair_file, transition_file) in CONDITIONS.items():
        pair, transition = load_condition(pair_file, transition_file)
        vectors = participant_vectors(pair, transition)
        logger.info(
            "%-11s %d participants across %d generations",
            condition, len(vectors), vectors["generation"].nunique(),
        )

        vectors["beta"] = [
            correct_structure_beta(vector, model_vector) for vector in vectors["vector"]
        ]

        # Convergence is defined within a generation, so the leave-one-out average is
        # taken over that generation's participants only.
        vectors["isc"] = np.nan
        for generation, group in vectors.groupby("generation"):
            stacked = np.vstack(group["vector"].to_numpy())
            vectors.loc[group.index, "isc"] = leave_one_out_similarity(stacked)

        vectors["condition"] = condition
        records.append(vectors.drop(columns=["vector"]))

    rsa = pd.concat(records, ignore_index=True)
    rsa = rsa[["ID", "condition", "generation", "beta", "isc"]].sort_values(
        ["condition", "generation", "ID"]
    )

    dropped = int(rsa["beta"].isna().sum())
    if dropped:
        logger.warning("%d participants rated too few cells to fit a beta", dropped)

    out_path = paths.DATA_PROCESSED / OUTPUT_NAME
    rsa.to_csv(out_path, index=False)
    logger.info("Wrote %s (%d participants)", out_path, len(rsa))

    for measure in ("beta", "isc"):
        for condition in CONDITIONS:
            series = (
                rsa[rsa["condition"] == condition]
                .groupby("generation")[measure].mean().round(3).to_list()
            )
            logger.info("%-4s %-11s by generation: %s", measure, condition, series)

    # Per-generation between-condition tests, computed here rather than in the figure
    # script so the p-values behind the significance marks are auditable without
    # running any plotting code.
    stats_rows = []
    for measure in ("beta", "isc"):
        values = rsa.dropna(subset=[measure])
        generations = sorted(values["generation"].unique())
        raw_p, records = [], []
        for generation in generations:
            in_generation = values[values["generation"] == generation]
            language = in_generation.loc[in_generation["condition"] == "Language", measure]
            observation = in_generation.loc[
                in_generation["condition"] == "Observation", measure
            ]
            test = mannwhitneyu(language, observation, alternative="two-sided")
            raw_p.append(test.pvalue)
            records.append({
                "measure": measure,
                "generation": int(generation),
                "n_language": len(language),
                "n_observation": len(observation),
                "mean_language": language.mean(),
                "mean_observation": observation.mean(),
                "u_statistic": test.statistic,
                "p_raw": test.pvalue,
            })
        _, corrected, _, _ = multipletests(raw_p, method=CORRECTION_METHOD)
        for record, p_corrected in zip(records, corrected):
            record["p_corrected"] = p_corrected
        stats_rows.extend(records)

    stats_path = paths.DATA_PROCESSED / STATS_NAME
    pd.DataFrame(stats_rows).to_csv(stats_path, index=False)
    logger.info("Wrote %s (%d tests)", stats_path, len(stats_rows))
    for measure in ("beta", "isc"):
        significant = [
            row["generation"] for row in stats_rows
            if row["measure"] == measure and row["p_corrected"] < 0.05
        ]
        logger.info("%-4s significant generations (FDR): %s", measure, significant)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
