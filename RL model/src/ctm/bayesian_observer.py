"""Bayesian ideal observer of the gnome-to-forest mapping.

An observer in the observation condition watches a demonstrator play and must infer,
for each of the eight gnomes, which forest it leads to. The ideal observer holds one
Beta distribution per gnome and updates it conjugately on every demonstrated
(gnome, forest) pair.

The point of the analysis is that a demonstrator does not sample the eight gnomes
evenly: a good demonstrator repeatedly chooses the gnome leading to the currently
better forest, so the observer sees some gnomes often and others rarely or never.
Comparing the observer's learning curve under **empirical** demonstrators against a
hypothetical **uniform** demonstrator quantifies how much that skew costs.

Encoding
--------
Gnomes are identified canonically by `(state1, choice)` — the pair index 0-3 and the
side 0-1 — written `"pair_side"`. Under this encoding the side *is* the true forest,
because in every successful trial `state2 == choice`. `verify_canonical_encoding`
checks that assumption rather than assuming it.

Scales
------
`posterior_on_true_forest` returns P(true forest) in [0, 1], where 0.5 is chance.
Figures report **task knowledge** = 2 * P - 1, in [-1, 1] with 0 at chance.
"""

from __future__ import annotations

import numpy as np
import pandas as pd

N_PAIRS = 4
N_SIDES = 2
N_GNOMES = N_PAIRS * N_SIDES

# Canonical gnome labels, and the forest each one truly leads to.
GNOMES = [f"{pair}_{side}" for pair in range(N_PAIRS) for side in range(N_SIDES)]
TRUE_FOREST = {f"{pair}_{side}": side for pair in range(N_PAIRS) for side in range(N_SIDES)}

# Demonstrators show the last 80 successful trials of their session.
N_DEMO_TRIALS = 80

# Generation-10 participants are never demonstrators, so they are excluded.
LAST_GENERATION = 10


def label_gnomes(trials: pd.DataFrame) -> pd.DataFrame:
    """Add the canonical `gnome` label, `"{state1}_{choice}"`, to a trial table."""
    out = trials.copy()
    out["gnome"] = (
        out["state1"].astype("Int64").astype(str)
        + "_"
        + out["choice"].astype("Int64").astype(str)
    )
    return out


def verify_canonical_encoding(trials: pd.DataFrame) -> None:
    """Check that `state2 == choice` on successful trials.

    The closed-form posterior below depends on every observation of a gnome agreeing
    with that gnome's true forest, which holds only under this encoding.

    Raises:
        ValueError: If any successful trial violates it.
    """
    successful = trials[(trials["success"] == 1) & trials["choice"].notna()]
    mismatched = int((successful["state2"] != successful["choice"]).sum())
    if mismatched:
        raise ValueError(
            f"{mismatched} successful trials have state2 != choice; the canonical "
            "gnome encoding does not hold and the observer would be mis-specified"
        )


def demonstrator_sessions(trials: pd.DataFrame) -> list[tuple[str, int, pd.DataFrame]]:
    """Select each demonstrator's last `N_DEMO_TRIALS` successful trials.

    Args:
        trials: Observation-condition trials, with a `gnome` column.

    Returns:
        `(participant_id, generation, session)` for every participant who acted as a
        demonstrator and has enough successful trials.
    """
    sessions = []
    for participant_id, participant in trials.groupby("ID", sort=True):
        generation = int(participant["generation"].iloc[0])
        if generation == LAST_GENERATION:
            continue
        valid = participant[
            (participant["success"] == 1) & participant["choice"].notna()
        ].sort_values("n_trial")
        if len(valid) < N_DEMO_TRIALS:
            continue
        sessions.append(
            (participant_id, generation, valid.tail(N_DEMO_TRIALS).reset_index(drop=True))
        )
    return sessions


def cumulative_counts(session: pd.DataFrame) -> np.ndarray:
    """How many times each gnome had been demonstrated by each trial.

    Args:
        session: One demonstrator's `N_DEMO_TRIALS` trials, in order, with `gnome`.

    Returns:
        Array of shape `(N_DEMO_TRIALS, N_GNOMES)`.
    """
    index_of = {gnome: i for i, gnome in enumerate(GNOMES)}
    counts = np.zeros(N_GNOMES, dtype=int)
    cumulative = np.zeros((N_DEMO_TRIALS, N_GNOMES), dtype=int)
    for trial, gnome in enumerate(session["gnome"].to_numpy()):
        counts[index_of[gnome]] += 1
        cumulative[trial] = counts
    return cumulative


def kappa_to_beta_prior(kappa: float, mean: float = 0.5) -> tuple[float, float]:
    """Re-parameterise a Beta prior from (mean, concentration) to (alpha, beta).

    A small kappa is a weak, easily-overridden prior; a large kappa is a strong one
    that needs many observations to shift.
    """
    return mean * kappa, (1.0 - mean) * kappa


def posterior_on_true_forest(
    counts: np.ndarray, alpha0: float, beta0: float
) -> np.ndarray:
    """Posterior probability assigned to each gnome's true forest.

    Because every observation of a gnome agrees with its true forest (see
    `verify_canonical_encoding`), the posterior depends only on how many times that
    gnome was seen, not on what was seen.

    Args:
        counts: Cumulative observation counts, any shape ending in `N_GNOMES`.
        alpha0: Beta prior alpha.
        beta0: Beta prior beta.

    Returns:
        Posteriors with the same shape as `counts`.
    """
    counts = np.asarray(counts)
    if alpha0 == beta0:
        return (alpha0 + counts) / (alpha0 + beta0 + counts)

    posterior = np.zeros(counts.shape, dtype=float)
    for i, gnome in enumerate(GNOMES):
        seen = counts[..., i]
        matching_prior = alpha0 if TRUE_FOREST[gnome] == 1 else beta0
        posterior[..., i] = (matching_prior + seen) / (alpha0 + beta0 + seen)
    return posterior


def to_knowledge(posterior: np.ndarray) -> np.ndarray:
    """Map P(true forest) in [0, 1] onto task knowledge in [-1, 1], chance at 0."""
    return 2.0 * np.asarray(posterior) - 1.0


def uniform_demonstrator_counts(n_trials: int = N_DEMO_TRIALS) -> np.ndarray:
    """Cumulative counts for a demonstrator who cycles through all gnomes evenly.

    The best case the observer could face: every gnome shown equally often, in
    round-robin order.

    Returns:
        Array of shape `(n_trials, N_GNOMES)`.
    """
    shown = np.arange(n_trials) % N_GNOMES
    one_hot = np.zeros((n_trials, N_GNOMES), dtype=int)
    one_hot[np.arange(n_trials), shown] = 1
    return np.cumsum(one_hot, axis=0)
