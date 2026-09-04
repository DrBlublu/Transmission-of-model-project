"""A zoo of candidate strategies for the two-step task, for confusability analysis.

The question this supports is not "which model fits best" but "could we tell these
models apart at all, given this task?" Each strategy below is simulated in the real
first-generation environments, and the resulting behaviour is compared across
strategies. Strategies that behave near-identically cannot be distinguished by any
fitting procedure, however good.

Task structure
--------------
Eight gnomes, each a unique colour (colour = identity). Colour determines the forest.
Size is **nested** in colour (4 tall, 4 small) and balanced across forests, so it is an
irrelevant feature. Gnomes appear in four fixed pairs, one gnome from each forest, with
left/right position randomised.

Because colour is identity, model-free-on-colour is the same as model-free-on-identity:
this design cannot separate abstraction from memorisation.

Strategy families
-----------------
- **Model-based**: `MB-colour` uses the true structure; `MB-size` and `MB-pos` apply
  model-based planning to features that do not predict the forest, so they perform at
  chance.
- **Model-free**: `MF-colour` caches one value per gnome; `MF-size` caches per size
  (wrong feature); `MF-multi` is additive over gnome and size.
- **Hybrids**: `Arbitration` mixes model-based and model-free policies with a weight
  computed online from their recent performance; `Fixed-MB-w` uses a fixed weight.
  Both carry a model-fidelity parameter `mk` (0 = inverted belief, 0.5 = uninformative,
  1 = correct).
- **Heuristics**: win-stay-lose-shift on the forest (`MB-WSLS`, which needs the
  transition structure), on the gnome (`col-WSLS`), or on screen side (`side-WSLS`);
  plus perseveration, a fixed bias, and random choice.

Ported from `scripts/feature_confusion.py`. The original selected priors through
environment variables; here they are explicit arguments.
"""

from __future__ import annotations

import numpy as np
from scipy.special import expit as sigmoid

N_GNOMES = 8

# Colour (= gnome identity) determines the forest.
COLOUR_TO_FOREST = {0: 0, 1: 0, 2: 0, 3: 0, 4: 1, 5: 1, 6: 1, 7: 1}
# Size is nested within colour and balanced across forests: 1 = tall, 0 = small.
GNOME_SIZE = {0: 1, 1: 0, 2: 1, 3: 0, 4: 0, 5: 1, 6: 1, 7: 0}
# The size-based (wrong) model's belief about which forest a size leads to.
SIZE_TO_FOREST = {0: 0, 1: 1}
# Four fixed pairs, each one forest-0 gnome against one forest-1 gnome, sizes mixed.
PAIRS = [(0, 4), (2, 7), (1, 5), (3, 6)]

# Rewards are mean-centred for the simple strategies, so values start at zero.
REWARD_MEAN = 4.5
VALUE_INIT = 0.0
WIN_REFERENCE = 0.0

# The hybrids use raw reward with values initialised to the reward mean instead.
HYBRID_VALUE_INIT = 4.5
# Reference reinforcement-learning parameters for the hybrids, from the paper's model.
HYBRID_REFERENCE = {
    "alpha": 0.2, "alpha_performance": 0.4, "beta": 2.1,
    "trace": 0.4, "n0": 6.6, "n1": 0.0,
}

STRATEGIES = [
    "MB-colour", "MB-size", "MB-pos", "MF-colour", "MF-size", "MF-multi",
    "Arbitration", "Fixed-MB-w", "MB-WSLS", "col-WSLS", "side-WSLS",
    "Persev", "Bias", "Random",
]

# Strategies taking (alpha, beta) as their first two parameters.
_VALUE_LEARNERS = {"MB-colour", "MB-size", "MB-pos", "MF-size", "MF-colour", "MF-multi"}
# Strategies that additionally take a forgetting rate.
_FORGETTING = {"MF-colour", "MF-multi"}

_PROBABILITY_FLOOR = 1e-6


def _simulate_hybrid(strategy, params, rewards, presented, rng, n_trials):
    """Simulate one hybrid agent (`Arbitration` or `Fixed-MB-w`).

    `mk` is model fidelity: the model-based value of the reached forest is
    `mk * q[true forest] + (1 - mk) * q[other forest]`, so 1 is a correct model, 0 an
    inverted one, and 0.5 uninformative. `Fixed-MB-w` holds the mixing weight constant;
    `Arbitration` recomputes it each trial from the two controllers' recent performance.
    """
    reference = HYBRID_REFERENCE
    if strategy == "Fixed-MB-w":
        weight_fixed = float(np.clip(params[0], 0.0, 1.0))
        fidelity = float(np.clip(params[1], 0.0, 1.0)) if len(params) > 1 else 1.0
        alpha, beta, trace = (
            (params[2], params[3], params[4]) if len(params) >= 5
            else (reference["alpha"], reference["beta"], reference["trace"])
        )
        perf_rate_mb = perf_rate_mf = reference["alpha_performance"]
        gain, offset = reference["n0"], reference["n1"]
        dynamic = False
    else:
        fidelity = float(np.clip(params[0], 0.0, 1.0))
        dynamic = True
        if len(params) >= 8:
            alpha, beta, trace, perf_rate_mb, perf_rate_mf, gain, offset = params[1:8]
        else:
            alpha, beta, trace = (
                reference["alpha"], reference["beta"], reference["trace"]
            )
            perf_rate_mb = perf_rate_mf = reference["alpha_performance"]
            gain, offset = reference["n0"], reference["n1"]
        weight_fixed = None

    q_forest = np.full(2, HYBRID_VALUE_INIT)
    q_gnome = np.full(N_GNOMES, HYBRID_VALUE_INIT)
    perf_mb = perf_mf = HYBRID_VALUE_INIT
    chosen_gnomes = np.empty(n_trials, dtype=int)

    for trial in range(n_trials):
        left, right = presented[trial]
        forest_left, forest_right = COLOUR_TO_FOREST[left], COLOUR_TO_FOREST[right]

        q_mb_left = fidelity * q_forest[forest_left] + (1 - fidelity) * q_forest[1 - forest_left]
        q_mb_right = fidelity * q_forest[forest_right] + (1 - fidelity) * q_forest[1 - forest_right]
        p_mb_left = sigmoid(beta * (q_mb_left - q_mb_right))
        p_mf_left = sigmoid(beta * (q_gnome[left] - q_gnome[right]))

        weight = sigmoid(gain * (perf_mb - perf_mf) - offset) if dynamic else weight_fixed
        p_left = weight * p_mb_left + (1 - weight) * p_mf_left
        p_left = min(max(p_left, 1e-9), 1 - 1e-9)

        chose_left = rng.random() < p_left
        chosen = left if chose_left else right
        chosen_gnomes[trial] = chosen

        forest = forest_left if chose_left else forest_right
        reward = rewards[trial, forest]

        q_forest[forest] += alpha * (reward - q_forest[forest])
        q_gnome[chosen] += alpha * (q_forest[forest] - q_gnome[chosen])
        q_gnome[chosen] += alpha * trace * (reward - q_forest[forest])

        if dynamic:
            p_chosen = p_left if chose_left else 1 - p_left
            p_mb_chosen = p_mb_left if chose_left else 1 - p_mb_left
            p_mf_chosen = p_mf_left if chose_left else 1 - p_mf_left
            perf_mb += perf_rate_mb * (p_mb_chosen / p_chosen) * (reward - perf_mb)
            perf_mf += perf_rate_mf * (p_mf_chosen / p_chosen) * (reward - perf_mf)

    return chosen_gnomes


def simulate(strategy, params, rewards, presented, rng, n_trials):
    """Simulate one agent of `strategy` and return the gnome chosen on each trial.

    Args:
        strategy: One of `STRATEGIES`.
        params: Parameter vector from `sample_params`.
        rewards: `(n_trials, 2)` reward available in each forest per trial.
        presented: `(n_trials, 2)` gnome shown on the left and right.
        rng: Seeded generator; choices are stochastic.
        n_trials: Number of trials to run.

    Returns:
        Array of chosen gnome identities, length `n_trials`.
    """
    if strategy in ("Arbitration", "Fixed-MB-w"):
        return _simulate_hybrid(strategy, params, rewards, presented, rng, n_trials)

    q_forest = np.full(2, VALUE_INIT)
    q_gnome = np.full(N_GNOMES, VALUE_INIT)
    q_size = np.full(2, VALUE_INIT)
    weight_gnome = np.zeros(N_GNOMES)
    weight_size = np.zeros(2)

    alpha, beta = (params[0], params[1]) if strategy in _VALUE_LEARNERS else (0.0, 0.0)
    forgetting = params[2] if strategy in _FORGETTING else 0.0

    last_forest, last_reward, last_gnome, last_side = -1, 0.0, -1, -1
    chosen_gnomes = np.empty(n_trials, dtype=int)

    for trial in range(n_trials):
        left, right = presented[trial]
        size_left, size_right = GNOME_SIZE[left], GNOME_SIZE[right]
        forest_left, forest_right = COLOUR_TO_FOREST[left], COLOUR_TO_FOREST[right]

        if strategy == "MB-colour":
            p_left = sigmoid(beta * (q_forest[forest_left] - q_forest[forest_right]))
        elif strategy == "MB-size":
            p_left = sigmoid(
                beta * (q_forest[SIZE_TO_FOREST[size_left]] - q_forest[SIZE_TO_FOREST[size_right]])
            )
        elif strategy == "MB-pos":
            p_left = sigmoid(beta * (q_forest[0] - q_forest[1]))
        elif strategy == "MF-colour":
            p_left = sigmoid(beta * (q_gnome[left] - q_gnome[right]))
        elif strategy == "MF-size":
            p_left = sigmoid(beta * (q_size[size_left] - q_size[size_right]))
        elif strategy == "MF-multi":
            p_left = sigmoid(
                beta * ((weight_gnome[left] + weight_size[size_left])
                        - (weight_gnome[right] + weight_size[size_right]))
            )
        elif strategy == "MB-WSLS":
            if last_forest < 0:
                p_left = 0.5
            else:
                stay = sigmoid(params[0] * (last_reward - WIN_REFERENCE))
                p_left = stay if forest_left == last_forest else 1 - stay
        elif strategy == "col-WSLS":
            if last_gnome < 0:
                p_left = 0.5
            else:
                stay = sigmoid(params[0] * (last_reward - WIN_REFERENCE))
                p_left = (
                    stay if left == last_gnome
                    else (1 - stay if right == last_gnome else 0.5)
                )
        elif strategy == "side-WSLS":
            if last_side < 0:
                p_left = 0.5
            else:
                stay = sigmoid(params[0] * (last_reward - WIN_REFERENCE))
                p_left = stay if last_side == 0 else 1 - stay
        elif strategy == "Persev":
            if last_forest < 0:
                p_left = 0.5
            else:
                stay = sigmoid(params[0])
                p_left = stay if forest_left == last_forest else 1 - stay
        elif strategy == "Bias":
            prefer_forest_0 = sigmoid(params[0])
            p_left = prefer_forest_0 if forest_left == 0 else 1 - prefer_forest_0
        else:
            p_left = 0.5

        p_left = min(max(p_left, _PROBABILITY_FLOOR), 1 - _PROBABILITY_FLOOR)
        chose_left = rng.random() < p_left
        chosen = left if chose_left else right
        chosen_gnomes[trial] = chosen

        size = GNOME_SIZE[chosen]
        forest = COLOUR_TO_FOREST[chosen]
        reward = rewards[trial, forest] - REWARD_MEAN

        if strategy in ("MB-colour", "MB-size", "MB-pos"):
            q_forest[forest] += alpha * (reward - q_forest[forest])
        elif strategy == "MF-colour":
            q_gnome[chosen] += alpha * (reward - q_gnome[chosen])
            if forgetting > 0:
                for other in range(N_GNOMES):
                    if other != left and other != right:
                        q_gnome[other] *= 1 - forgetting
        elif strategy == "MF-size":
            q_size[size] += alpha * (reward - q_size[size])
        elif strategy == "MF-multi":
            error = reward - (weight_gnome[chosen] + weight_size[size])
            weight_gnome[chosen] += alpha * error
            weight_size[size] += alpha * error
            if forgetting > 0:
                for other in range(N_GNOMES):
                    if other != left and other != right:
                        weight_gnome[other] *= 1 - forgetting

        last_forest, last_reward = forest, reward
        last_gnome = chosen
        last_side = 0 if chose_left else 1

    return chosen_gnomes


def sample_params(strategy, rng, prior="narrow"):
    """Draw one agent's parameters.

    Args:
        strategy: One of `STRATEGIES`.
        rng: Seeded generator.
        prior: ``"narrow"`` samples each parameter from a plausible central band, which
            is the setting used for the published confusability figure. ``"wide"``
            samples the full plausible range (the Wilson & Collins recovery
            convention), a more conservative check.

    Returns:
        Parameter vector, possibly empty (for `Random`).
    """
    if prior not in ("narrow", "wide"):
        raise ValueError(f"prior must be 'narrow' or 'wide', got {prior!r}")
    narrow = prior == "narrow"

    if strategy in ("MB-colour", "MB-size", "MB-pos", "MF-size"):
        return ([rng.uniform(0.2, 0.6), rng.uniform(0.5, 2.0)] if narrow
                else [rng.uniform(0, 1), rng.uniform(0.05, 10)])
    if strategy in ("MF-colour", "MF-multi"):
        return ([rng.uniform(0.2, 0.6), rng.uniform(0.5, 2.0), rng.uniform(0.0, 0.35)] if narrow
                else [rng.uniform(0, 1), rng.uniform(0.05, 10), rng.uniform(0, 0.8)])
    if strategy == "Arbitration":
        # mk, then the reinforcement-learning vector: alpha, beta, trace,
        # performance rates for each controller, and the weighting gain and offset.
        return ([rng.uniform(0.52, 0.62), rng.uniform(0.2, 0.6), rng.uniform(0.5, 2.0),
                 rng.uniform(0.2, 0.6), rng.uniform(0.2, 0.6), rng.uniform(0.2, 0.6),
                 rng.uniform(3, 10), rng.uniform(-2, 2)] if narrow
                else [rng.uniform(0, 1), rng.uniform(0, 1), rng.uniform(0.05, 10),
                      rng.uniform(0, 1), rng.uniform(0, 1), rng.uniform(0, 1),
                      rng.uniform(0, 10), rng.uniform(-5, 5)])
    if strategy == "Fixed-MB-w":
        # w, then mk (fixed to 1 under the narrow prior), then alpha, beta, trace.
        return ([rng.uniform(0.35, 0.70), 1.0, rng.uniform(0.2, 0.6),
                 rng.uniform(0.5, 2.0), rng.uniform(0.2, 0.6)] if narrow
                else [rng.uniform(0, 1), rng.uniform(0, 1), rng.uniform(0, 1),
                      rng.uniform(0.05, 10), rng.uniform(0, 1)])
    if strategy in ("MB-WSLS", "col-WSLS", "side-WSLS"):
        return [rng.uniform(0.5, 2.0)] if narrow else [rng.uniform(0.05, 5)]
    if strategy in ("Persev", "Bias"):
        return [rng.uniform(0.4, 1.5)] if narrow else [rng.uniform(-5, 5)]
    return []
