#!/usr/bin/env python
"""Pair model-estimated task knowledge with the measured (empirical) score.

The arbitration model's `understanding` parameter is the subjective probability that a
gnome leads to its true forest: 0.5 means no knowledge of the transition structure, 1.0
means perfect knowledge. It is rescaled to a **task-knowledge** scale running from -1 to
1, where 0 is chance:

    knowledge = understanding * 2 - 1

which is the `estimated_understanding / 50 - 1` transform in the published analysis,
`estimated_understanding` being `understanding * 100`.

The measured score comes from a post-task questionnaire and is already on that scale.

Input : data/processed/arbitration_fitted_params.csv
        data/raw/task_knowledge_scores.csv
Output: data/processed/task_knowledge.csv
        data/processed/task_knowledge_stats.csv
"""

from __future__ import annotations

import logging
import sys

import numpy as np
import pandas as pd
from scipy import stats

from ctm import paths

logger = logging.getLogger("task_knowledge")

FITTED_NAME = "arbitration_fitted_params.csv"
SCORES_NAME = "task_knowledge_scores.csv"
OUTPUT_NAME = "task_knowledge.csv"
STATS_NAME = "task_knowledge_stats.csv"

# The measured-score table labels conditions ADV / OBS.
CONDITION_FROM_CODE = {"ADV": "Language", "OBS": "Observation"}

# understanding is a probability centred on 0.5; knowledge is centred on 0.
CHANCE_UNDERSTANDING = 0.5


def to_knowledge_scale(understanding: pd.Series) -> pd.Series:
    """Map understanding in [0, 1] onto a knowledge scale in [-1, 1], chance at 0."""
    return (understanding - CHANCE_UNDERSTANDING) * 2.0


def main() -> int:
    logging.basicConfig(
        level=logging.INFO, format="%(levelname)-7s %(message)s", stream=sys.stdout
    )
    paths.ensure_output_dirs()

    fitted = pd.read_csv(paths.DATA_PROCESSED / FITTED_NAME)
    scores = pd.read_csv(paths.DATA_RAW / SCORES_NAME)

    unknown_codes = set(scores["cond"].unique()) - set(CONDITION_FROM_CODE)
    if unknown_codes:
        raise ValueError(f"Unrecognised condition codes in {SCORES_NAME}: {sorted(unknown_codes)}")
    scores["condition"] = scores["cond"].map(CONDITION_FROM_CODE)

    knowledge = fitted[["ID", "condition", "generation", "understanding"]].merge(
        scores[["ID", "condition", "understanding_score"]],
        on=["ID", "condition"],
        how="left",
    )
    knowledge["knowledge_model"] = to_knowledge_scale(knowledge["understanding"])
    knowledge = knowledge.rename(columns={"understanding_score": "knowledge_data"})

    unmatched = int(knowledge["knowledge_data"].isna().sum())
    if unmatched:
        # A left join is used deliberately so panel A keeps every fitted participant;
        # panel B can only use those with a measured score.
        logger.warning(
            "%d of %d participants have no measured score and are excluded from panel B",
            unmatched,
            len(knowledge),
        )

    out_path = paths.DATA_PROCESSED / OUTPUT_NAME
    knowledge.to_csv(out_path, index=False)
    logger.info("Wrote %s (%d participants)", out_path, len(knowledge))

    # The regression statistics reported on the figure are computed here, not in the
    # plotting code, so that every number shown is present in a processed file.
    rows = []
    for condition, group in knowledge.groupby("condition"):
        paired = group.dropna(subset=["knowledge_data", "knowledge_model"])
        fit = stats.linregress(paired["knowledge_data"], paired["knowledge_model"])
        rows.append({
            "condition": condition,
            "n": len(paired),
            "r": fit.rvalue,
            "r_squared": fit.rvalue ** 2,
            "p_value": fit.pvalue,
            "slope": fit.slope,
            "intercept": fit.intercept,
            "mean_model": paired["knowledge_model"].mean(),
            "mean_data": paired["knowledge_data"].mean(),
        })
        logger.info(
            "%-11s n=%4d  r=%.3f  R2=%.3f  p=%.3g",
            condition, len(paired), fit.rvalue, fit.rvalue ** 2, fit.pvalue,
        )

    stats_path = paths.DATA_PROCESSED / STATS_NAME
    pd.DataFrame(rows).to_csv(stats_path, index=False)
    logger.info("Wrote %s", stats_path)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
