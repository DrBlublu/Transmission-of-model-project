#!/usr/bin/env python
"""Assemble per-participant parameters of the FIXED model-basedness model.

The counterpart to `s5-2_arbitration_fitted_params.py`. Where the arbitration model
computes its model-basedness weight online from the running performance of the two
controllers, this model treats model-basedness as a **free parameter**, fitted
separately for high- and low-stake trials.

This is the 5-parameter variant reported in the SI:

    W_HS_sub, W_LS_sub   model-basedness on high- and low-stake trials
    alpha_sub            reward learning rate
    beta_sub             softmax inverse temperature
    lambda_sub           eligibility trace

Fitted by hierarchical Bayesian sampling (Stan); the shipped files are posterior
summaries, so the per-participant estimate is a posterior mean rather than a point
optimum. The summary model-basedness is `w_fixed = mean(W_HS_sub, W_LS_sub)`, as in
the published figure.

**Convergence caveat.** Many generations in these fits have r-hat well above the
conventional 1.01 threshold. The diagnostics are carried through to the output so that
downstream consumers can see, rather than have to rediscover, which cells are affected.

Input : data/raw/hierarchical_5param_{language,observation}.csv
Output: data/processed/fixed_model_fitted_params.csv
"""

from __future__ import annotations

import logging
import sys

import pandas as pd

from ctm import paths

logger = logging.getLogger("fixed_model_params")

OUTPUT_NAME = "fixed_model_fitted_params.csv"

SOURCES = {
    "Language": "hierarchical_5param_language.csv",
    "Observation": "hierarchical_5param_observation.csv",
}

# Stan parameter name -> column name used downstream.
PARAMETER_NAMES = {
    "W_HS_sub": "w_high_stake",
    "W_LS_sub": "w_low_stake",
    "alpha_sub": "alpha",
    "beta_sub": "beta",
    "lambda_sub": "eligibility_trace",
}

# Conventional convergence threshold for the split r-hat statistic.
RHAT_THRESHOLD = 1.01


def load_condition(condition: str, filename: str) -> pd.DataFrame:
    """Reshape one condition's posterior summaries to one row per participant."""
    summaries = pd.read_csv(paths.DATA_RAW / filename)

    unknown = set(summaries["param"].unique()) - set(PARAMETER_NAMES)
    if unknown:
        raise ValueError(f"{filename} has unexpected parameters: {sorted(unknown)}")

    wide = (
        summaries.pivot_table(
            index=["sub", "generation"], columns="param", values="mean"
        )
        .rename(columns=PARAMETER_NAMES)
        .reset_index()
        .rename(columns={"sub": "ID"})
    )

    # Worst diagnostic across this participant's parameters, kept so that the
    # convergence problem travels with the estimates.
    diagnostics = (
        summaries.groupby(["sub", "generation"])
        .agg(r_hat_max=("r_hat", "max"), ess_bulk_min=("ess_bulk", "min"))
        .reset_index()
        .rename(columns={"sub": "ID"})
    )

    merged = wide.merge(diagnostics, on=["ID", "generation"])
    merged["condition"] = condition
    merged["w_fixed"] = merged[["w_high_stake", "w_low_stake"]].mean(axis=1)

    logger.info(
        "%-11s %d participants across %d generations",
        condition, merged["ID"].nunique(), merged["generation"].nunique(),
    )
    return merged


def main() -> int:
    logging.basicConfig(
        level=logging.INFO, format="%(levelname)-7s %(message)s", stream=sys.stdout
    )
    paths.ensure_output_dirs()

    fitted = pd.concat(
        [load_condition(cond, name) for cond, name in SOURCES.items()], ignore_index=True
    )

    columns = ["ID", "condition", "generation", "w_fixed", *PARAMETER_NAMES.values(),
               "r_hat_max", "ess_bulk_min"]
    fitted = fitted[columns].sort_values(["condition", "generation", "ID"])

    if fitted[list(PARAMETER_NAMES.values())].isna().any().any():
        raise ValueError("NaN parameter values after reshaping")

    out_path = paths.DATA_PROCESSED / OUTPUT_NAME
    fitted.to_csv(out_path, index=False)
    logger.info("Wrote %s (%d participants)", out_path, len(fitted))

    for condition, group in fitted.groupby("condition"):
        means = group.groupby("generation")["w_fixed"].mean()
        logger.info("%-11s mean w_fixed by generation: %s", condition,
                    means.round(3).to_list())

    # Report the convergence problem explicitly rather than leaving it to be found.
    unconverged = fitted[fitted["r_hat_max"] > RHAT_THRESHOLD]
    logger.warning(
        "CONVERGENCE: %d of %d participants (%.0f%%) have r-hat > %.2f; worst = %.2f",
        len(unconverged), len(fitted), 100 * len(unconverged) / len(fitted),
        RHAT_THRESHOLD, fitted["r_hat_max"].max(),
    )
    affected = (
        fitted.assign(bad=fitted["r_hat_max"] > RHAT_THRESHOLD)
        .groupby(["condition", "generation"])["bad"].mean()
        .unstack(0).round(2)
    )
    logger.warning("Proportion above threshold by generation:\n%s", affected.to_string())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
