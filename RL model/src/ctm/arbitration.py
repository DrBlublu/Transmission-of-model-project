"""The arbitration model of model-based / model-free control.

The model mixes a model-based and a model-free policy with a weight *W* that is
**computed online** from the recent performance of the two policies:

    W = 1 / (1 + exp(-n0 * (perf_MB - perf_MF) + n1))

*W* is therefore not a free parameter. It is a simulated quantity: fit the eight
parameters below to a participant's choices, then run the model forward to obtain
that participant's trajectory of *W*.

This is the **single-understanding** variant: one `understanding` parameter is
shared across all four gnome pairs, giving the subjective transition matrix

    [[u, 1-u], [1-u, u]]

tiled over the four first-stage states. (A four-understanding variant exists in the
source notebook but is *not* the model used for the published figures.)

Parameters
----------
alpha                 reward learning rate
alpha_performance_MB  learning rate of the model-based performance tracker
alpha_performance_MF  learning rate of the model-free performance tracker
beta                  softmax inverse temperature
trace                 eligibility trace, propagating second-stage reward to stage one
n0                    sensitivity of W to the MB - MF performance difference
n1                    intercept of the logistic weighting function
understanding         subjective probability that a gnome leads to its true forest
"""

from __future__ import annotations

import math
from dataclasses import dataclass

import numpy as np

# Model-free and model-based values, and both performance trackers, are initialised
# to the mean of the reward range used in the experiment.
INITIAL_VALUE = 4.5

# The task has four first-stage states (gnome pairs) and two second-stage states (forests).
N_FIRST_STAGE_STATES = 4
N_OPTIONS = 2

PARAMETER_NAMES = (
    "alpha",
    "alpha_performance_MF",
    "alpha_performance_MB",
    "beta",
    "trace",
    "n0",
    "n1",
    "understanding",
)


@dataclass(frozen=True)
class ArbitrationParams:
    """Fitted parameters of the single-understanding arbitration model."""

    alpha: float
    alpha_performance_MF: float
    alpha_performance_MB: float
    beta: float
    trace: float
    n0: float
    n1: float
    understanding: float

    @classmethod
    def from_row(cls, row) -> ArbitrationParams:
        """Build from a pandas Series carrying the columns in `PARAMETER_NAMES`."""
        return cls(**{name: float(row[name]) for name in PARAMETER_NAMES})


def _sigmoid(x: float) -> float:
    """Logistic function, evaluated without overflow for extreme arguments.

    The reference implementation used ``1 / (1 + np.exp(...))``, which returns 0.0 or
    1.0 via an intermediate ``inf`` when the argument is extreme. This branch reaches
    the same limits directly. That matters because the performance trackers driving
    the arbitration weight can diverge when the chosen option's probability is tiny,
    making the argument large.
    """
    if x >= 0.0:
        return 1.0 / (1.0 + math.exp(-x))
    exponential = math.exp(x)
    return exponential / (1.0 + exponential)


def _softmax_first(value_0: float, value_1: float, beta: float) -> float:
    """Probability of option 0 under a two-option softmax.

    Algebraically identical to ``exp(b*q) / sum(exp(b*q))`` but written in logistic
    form, which cannot overflow for large ``beta``.
    """
    return _sigmoid(beta * (value_0 - value_1))


def simulate_participant(
    state1: np.ndarray,
    reward_options: np.ndarray,
    stakes: np.ndarray,
    params: ArbitrationParams,
    rng: np.random.Generator,
) -> dict[str, float]:
    """Simulate one participant's session and summarise it.

    The agent chooses freely, so the rewards it collects depend on its own choices;
    only the *available* rewards on each trial are taken from the participant's data.

    Args:
        state1: First-stage state (gnome pair index, 0-3) per trial, shape (n_trials,).
        reward_options: Available rewards `[rew_1, rew_2]` per trial, shape (n_trials, 2).
        stakes: Stake multiplier per trial, shape (n_trials,).
        params: Fitted parameters for this participant.
        rng: Random generator; choices are stochastic, so this must be seeded by the caller.

    Returns:
        Trial-averaged summary for this session: `w`, `simulated_score`,
        `simulated_score_stake`, and `simulated_transition_understanding_end`.
    """
    n_trials = state1.shape[0]
    understanding = params.understanding

    # Model-free values: one per (gnome pair, option) at stage one, one per forest at stage two.
    q_mf1 = np.full((N_FIRST_STAGE_STATES, N_OPTIONS), INITIAL_VALUE)
    q_mf2 = np.full(N_OPTIONS, INITIAL_VALUE)

    # Performance trackers driving the arbitration weight, one per first-stage state.
    perf_mb = np.full(N_FIRST_STAGE_STATES, INITIAL_VALUE)
    perf_mf = np.full(N_FIRST_STAGE_STATES, INITIAL_VALUE)

    w_sum = 0.0
    score_sum = 0.0
    score_stake_sum = 0.0

    draws = rng.uniform(0.0, 1.0, size=n_trials)

    for trial in range(n_trials):
        s1 = int(state1[trial])

        # Model-based values: subjective transition matrix applied to forest values.
        q_mb_0 = understanding * q_mf2[0] + (1.0 - understanding) * q_mf2[1]
        q_mb_1 = (1.0 - understanding) * q_mf2[0] + understanding * q_mf2[1]

        p_mb_0 = _softmax_first(q_mb_0, q_mb_1, params.beta)
        p_mf_0 = _softmax_first(q_mf1[s1, 0], q_mf1[s1, 1], params.beta)

        weight = _sigmoid(params.n0 * (perf_mb[s1] - perf_mf[s1]) - params.n1)
        p_0 = weight * p_mb_0 + (1.0 - weight) * p_mf_0

        choice = int(draws[trial] > p_0)
        # Transitions are deterministic: the chosen gnome leads to the matching forest.
        s2 = choice

        p_chosen = p_0 if choice == 0 else 1.0 - p_0
        p_mb_chosen = p_mb_0 if choice == 0 else 1.0 - p_mb_0
        p_mf_chosen = p_mf_0 if choice == 0 else 1.0 - p_mf_0

        # Stage-one update toward the value of the forest reached (no reward yet).
        pe_1 = q_mf2[s2] - q_mf1[s1, choice]
        q_mf1[s1, choice] += params.alpha * pe_1

        reward = float(reward_options[trial, s2])

        # Stage-two reward prediction error, then the eligibility-trace update at stage one.
        pe_2 = reward - q_mf2[s2]
        q_mf2[s2] += params.alpha * pe_2
        q_mf1[s1, choice] += params.alpha * pe_2 * params.trace

        # Responsibility-weighted performance prediction errors.
        perf_mb[s1] += params.alpha_performance_MB * (p_mb_chosen / p_chosen) * (
            reward - perf_mb[s1]
        )
        perf_mf[s1] += params.alpha_performance_MF * (p_mf_chosen / p_chosen) * (
            reward - perf_mf[s1]
        )

        w_sum += weight
        score_sum += reward
        score_stake_sum += reward * float(stakes[trial])

    return {
        "w": w_sum / n_trials,
        "simulated_score": score_sum / n_trials,
        "simulated_score_stake": score_stake_sum / n_trials,
        # Constant within a participant in the single-understanding model.
        "simulated_transition_understanding_end": understanding * 100.0,
    }
