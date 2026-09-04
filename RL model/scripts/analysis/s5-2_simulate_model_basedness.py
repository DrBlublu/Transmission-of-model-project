#!/usr/bin/env python
"""Simulate model-basedness (W) from each participant's fitted arbitration model.

W is not a fitted parameter. It is produced by running the fitted model forward:
the arbitration weight is recomputed on every trial from the running performance of
the model-based and model-free controllers. This script therefore simulates each
participant's session `--n-sim` times, averages W over trials within a simulation,
and takes the **mean across simulations** as that participant's W.

Choices are stochastic, so every (participant, simulation) pair gets its own
deterministic seed derived from `analysis.random_seed`. Results are therefore
reproducible and independent of how the work is distributed across processes.

Input : data/processed/arbitration_fitted_params.csv
        data/raw/trials/{language,observation}/gen-*.csv
Output: data/processed/arbitration_w_summary.csv
"""

from __future__ import annotations

import argparse
import logging
import sys
from concurrent.futures import ProcessPoolExecutor

import numpy as np
import pandas as pd

from ctm import paths
from ctm.arbitration import ArbitrationParams, simulate_participant
from ctm.io import CONDITIONS, load_trials

logger = logging.getLogger("simulate_w")

INPUT_NAME = "arbitration_fitted_params.csv"
OUTPUT_NAME = "arbitration_w_summary.csv"
DEFAULT_N_SIM = 100

SUMMARY_FIELDS = (
    "w",
    "simulated_score",
    "simulated_score_stake",
    "simulated_transition_understanding_end",
)


def simulate_one_participant(task: tuple) -> dict:
    """Run all simulations for one participant and take the mean across them.

    Args:
        task: `(participant_index, ID, condition, generation, params_dict,
                state1, reward_options, stakes, n_sim, base_seed)`.

    Returns:
        One summary row for this participant.
    """
    (index, participant_id, condition, generation, params_dict,
     state1, reward_options, stakes, n_sim, base_seed) = task

    params = ArbitrationParams(**params_dict)
    per_simulation = [
        simulate_participant(
            state1=state1,
            reward_options=reward_options,
            stakes=stakes,
            params=params,
            # Seeded per (participant, simulation): order-independent and reproducible.
            rng=np.random.default_rng([base_seed, index, sim]),
        )
        for sim in range(n_sim)
    ]

    summary = {
        "ID": participant_id,
        "condition": condition,
        "generation": generation,
        "n_sim": n_sim,
    }
    for field in SUMMARY_FIELDS:
        summary[field] = float(np.mean([run[field] for run in per_simulation]))
    return summary


def build_tasks(n_sim: int, base_seed: int) -> list[tuple]:
    """Pair every participant's fitted parameters with their trial sequence."""
    fitted = pd.read_csv(paths.DATA_PROCESSED / INPUT_NAME)
    param_fields = list(ArbitrationParams.__dataclass_fields__)

    tasks: list[tuple] = []
    index = 0
    for condition in CONDITIONS:
        trials = load_trials(condition)
        params_by_id = fitted.query("condition == @condition").set_index("ID")

        missing = set(trials["ID"].unique()) - set(params_by_id.index)
        if missing:
            raise ValueError(f"{condition}: {len(missing)} participants have no fitted parameters")

        for participant_id, session in trials.groupby("ID", sort=True):
            session = session.sort_values("n_trial")
            row = params_by_id.loc[participant_id]
            tasks.append(
                (
                    index,
                    participant_id,
                    condition,
                    int(row["generation"]),
                    {field: float(row[field]) for field in param_fields},
                    session["state1"].to_numpy(dtype=int),
                    session[["rew_1", "rew_2"]].to_numpy(dtype=float),
                    session["stake"].to_numpy(dtype=float),
                    n_sim,
                    base_seed,
                )
            )
            index += 1
    return tasks


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument(
        "--n-sim", type=int, default=DEFAULT_N_SIM,
        help=f"Simulations per participant (default {DEFAULT_N_SIM}, as published)",
    )
    parser.add_argument(
        "--n-jobs", type=int, default=1,
        help="Worker processes. Results are identical regardless of this value.",
    )
    args = parser.parse_args(argv)

    logging.basicConfig(
        level=logging.INFO, format="%(levelname)-7s %(message)s", stream=sys.stdout
    )
    paths.ensure_output_dirs()
    config = paths.load_config()
    base_seed = int(config["analysis"]["random_seed"])

    tasks = build_tasks(args.n_sim, base_seed)
    logger.info(
        "Simulating %d participants x %d simulations (seed %d, %d job(s))",
        len(tasks), args.n_sim, base_seed, args.n_jobs,
    )

    if args.n_jobs == 1:
        rows = [simulate_one_participant(task) for task in tasks]
    else:
        with ProcessPoolExecutor(max_workers=args.n_jobs) as pool:
            rows = list(pool.map(simulate_one_participant, tasks, chunksize=8))

    summary = pd.DataFrame(rows).sort_values(["condition", "generation", "ID"])

    out_path = paths.DATA_PROCESSED / OUTPUT_NAME
    summary.to_csv(out_path, index=False)
    logger.info("Wrote %s (%d participants)", out_path, len(summary))

    for condition in CONDITIONS:
        means = summary.query("condition == @condition").groupby("generation")["w"].mean()
        logger.info("%s mean W by generation: %s", condition, means.round(3).to_list())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
