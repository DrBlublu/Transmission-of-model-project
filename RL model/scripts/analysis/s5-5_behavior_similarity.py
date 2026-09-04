#!/usr/bin/env python
"""How similarly do the candidate strategies behave in the real task environments?

Each strategy is simulated by many agents in each of the real first-generation
environments, and two behavioural profiles are extracted per strategy per environment:

  choice probability  the trial-by-trial probability of choosing the forest-0 option
  corrected reward    the trial-by-trial reward earned, minus the mean reward available
                      on that trial (removing the shared-environment confound)

Strategies are then compared by correlating these profiles. Pairs that behave nearly
identically cannot be told apart by any fitting procedure, so this bounds what model
comparison on this task can establish.

Both measures come from the *same* simulation run: the choices are seeded per
(strategy, environment, agent), so computing both in one pass is identical to computing
them separately, at half the cost.

Input : data/raw/trials/language/gen-01.csv
Output: data/processed/behavior_similarity_choice.csv
        data/processed/behavior_similarity_reward.csv
"""

from __future__ import annotations

import argparse
import logging
import sys
from concurrent.futures import ProcessPoolExecutor

import numpy as np
import pandas as pd

from ctm import paths
from ctm.candidate_models import PAIRS, REWARD_MEAN, STRATEGIES, sample_params, simulate

logger = logging.getLogger("behavior_similarity")

CHOICE_OUTPUT = "behavior_similarity_choice.csv"
REWARD_OUTPUT = "behavior_similarity_reward.csv"

N_ENVIRONMENTS = 100
N_AGENTS = 100
N_TRIALS = 256
# Profiles are taken over the final window, after learning has largely settled.
WINDOW = 80

# Fixed offset separating the environment-construction stream from the agent streams.
ENVIRONMENT_SEED = 900_000
# Stride constants keeping every (strategy, environment, agent) seed distinct.
STRATEGY_STRIDE = 1_000_000
ENVIRONMENT_STRIDE = 1_000

# Correlations are averaged in Fisher-z space, then transformed back.
_CORRELATION_CLIP = 0.9999


def load_environments(n_trials: int) -> list[tuple[np.ndarray, np.ndarray]]:
    """Rebuild the reward and presentation sequences each generation-1 participant faced.

    The rewards actually available on each trial come from the data. Which gnome appeared
    on which side is re-randomised from a fixed seed, since the agents are not replaying
    any particular participant's choices.

    Returns:
        One `(rewards, presented)` pair per participant.
    """
    trials = pd.read_csv(paths.DATA_RAW / "trials" / "language" / "gen-01.csv",
                         low_memory=False)
    pair_index = {
        state: index
        for index, state in enumerate(sorted(trials["state1"].dropna().unique()))
    }

    environments = []
    for order, (_, participant) in enumerate(trials.groupby("ID", sort=True)):
        session = participant.sort_values("n_trial").head(n_trials)
        rng = np.random.default_rng(ENVIRONMENT_SEED + order)

        rewards = np.full((n_trials, 2), REWARD_MEAN)
        presented = np.zeros((n_trials, 2), dtype=int)
        for trial, (_, row) in enumerate(session.iterrows()):
            forest0_gnome, forest1_gnome = PAIRS[pair_index.get(row["state1"], 0)]
            if not (np.isnan(row["choice"]) or np.isnan(row["state2"])):
                choice, second_state = int(row["choice"]), int(row["state2"])
                rewards[trial, second_state] = (
                    row["rew_1"] if choice == 0 else row["rew_2"]
                )
                rewards[trial, 1 - second_state] = (
                    row["rew_2"] if choice == 0 else row["rew_1"]
                )
            presented[trial] = (
                (forest0_gnome, forest1_gnome) if rng.random() < 0.5
                else (forest1_gnome, forest0_gnome)
            )
        environments.append((rewards, presented))
    return environments


def profiles_for_environment(task: tuple) -> tuple[int, np.ndarray, np.ndarray]:
    """Simulate every strategy in one environment and return both profiles.

    Returns:
        `(environment_index, choice_profiles, reward_profiles)`, each profile array of
        shape `(n_strategies, WINDOW)`.
    """
    environment_index, rewards, presented, prior, n_trials, window = task
    from ctm.candidate_models import COLOUR_TO_FOREST  # local import for worker processes

    start = n_trials - window
    baseline = rewards[start:].mean(axis=1)

    choice_profiles = np.empty((len(STRATEGIES), window))
    reward_profiles = np.empty((len(STRATEGIES), window))

    for strategy_index, strategy in enumerate(STRATEGIES):
        chose_forest0 = np.empty((N_AGENTS, window))
        earned = np.empty((N_AGENTS, window))
        for agent in range(N_AGENTS):
            seed = (
                strategy_index * STRATEGY_STRIDE
                + environment_index * ENVIRONMENT_STRIDE
                + agent
            )
            rng = np.random.default_rng(seed)
            chosen = simulate(
                strategy, sample_params(strategy, rng, prior),
                rewards, presented, rng, n_trials,
            )
            forest = np.array([COLOUR_TO_FOREST[g] for g in chosen])
            chose_forest0[agent] = (forest == 0).astype(float)[start:]
            earned[agent] = rewards[np.arange(n_trials), forest][start:]

        choice_profiles[strategy_index] = chose_forest0.mean(axis=0)
        reward_profiles[strategy_index] = earned.mean(axis=0) - baseline

    return environment_index, choice_profiles, reward_profiles


def fisher_z_similarity(profiles: np.ndarray) -> np.ndarray:
    """Average the per-environment profile correlations between every pair of strategies.

    Args:
        profiles: `(n_environments, n_strategies, window)`.

    Returns:
        Symmetric `(n_strategies, n_strategies)` similarity matrix with ones on the
        diagonal.
    """
    n_environments, n_strategies, _ = profiles.shape
    similarity = np.eye(n_strategies)

    for i in range(n_strategies):
        for j in range(i):
            transformed = []
            for environment in range(n_environments):
                a, b = profiles[environment, i], profiles[environment, j]
                # A flat profile has no variance and no defined correlation.
                if a.std() > 1e-9 and b.std() > 1e-9:
                    r = np.clip(np.corrcoef(a, b)[0, 1], -_CORRELATION_CLIP, _CORRELATION_CLIP)
                    transformed.append(np.arctanh(r))
            similarity[i, j] = similarity[j, i] = (
                np.tanh(np.mean(transformed)) if transformed else 0.0
            )
    return similarity


def to_frame(similarity: np.ndarray) -> pd.DataFrame:
    """Label a similarity matrix with strategy names."""
    return pd.DataFrame(similarity, index=STRATEGIES, columns=STRATEGIES)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument(
        "--prior", default="narrow", choices=("narrow", "wide"),
        help="Parameter prior; 'narrow' reproduces the published figure",
    )
    parser.add_argument("--n-jobs", type=int, default=4, help="Worker processes")
    args = parser.parse_args(argv)

    logging.basicConfig(
        level=logging.INFO, format="%(levelname)-7s %(message)s", stream=sys.stdout
    )
    paths.ensure_output_dirs()

    environments = load_environments(N_TRIALS)[:N_ENVIRONMENTS]
    logger.info(
        "%d environments x %d strategies x %d agents x %d trials (prior: %s)",
        len(environments), len(STRATEGIES), N_AGENTS, N_TRIALS, args.prior,
    )

    tasks = [
        (index, rewards, presented, args.prior, N_TRIALS, WINDOW)
        for index, (rewards, presented) in enumerate(environments)
    ]

    choice_profiles = np.empty((len(environments), len(STRATEGIES), WINDOW))
    reward_profiles = np.empty((len(environments), len(STRATEGIES), WINDOW))

    if args.n_jobs == 1:
        results = (profiles_for_environment(task) for task in tasks)
    else:
        pool = ProcessPoolExecutor(max_workers=args.n_jobs)
        results = pool.map(profiles_for_environment, tasks, chunksize=2)

    for done, (index, choice, reward) in enumerate(results, start=1):
        choice_profiles[index] = choice
        reward_profiles[index] = reward
        if done % 20 == 0:
            logger.info("  %d/%d environments simulated", done, len(environments))
    if args.n_jobs != 1:
        pool.shutdown()

    for profiles, name, label in (
        (choice_profiles, CHOICE_OUTPUT, "choice probability"),
        (reward_profiles, REWARD_OUTPUT, "corrected reward"),
    ):
        similarity = fisher_z_similarity(profiles)
        out_path = paths.DATA_PROCESSED / name
        to_frame(similarity).to_csv(out_path)
        upper = similarity[np.triu_indices(len(STRATEGIES), 1)]
        logger.info(
            "Wrote %s — %s similarity: mean %.3f, max %.3f",
            out_path, label, upper.mean(), upper.max(),
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
