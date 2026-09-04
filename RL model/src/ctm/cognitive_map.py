"""Behavioural representational similarity analysis of participants' mental models.

After the task, participants rated (a) how related each pair of gnomes is, and (b) which
forest each gnome leads to. Together these give a 10x10 similarity matrix per
participant over eight gnomes and two forests — an estimate of their *mental model* of
the task structure, measured independently of their choices.

Two questions are asked of these matrices:

1. **Correct-structure representation.** How strongly does a participant's matrix
   resemble the true structure? Regressing their matrix on the correct model matrix
   gives one beta per participant.
2. **Convergence.** How similar are participants within a generation to *each other*?
   Rising similarity across generations means the population's mental models converge.

Matrix layout
-------------
Indices 0-7 are the eight gnomes, ordered `pair * 2 + number`, and indices 8-9 are the
two forests:

    0=1a  1=1b  2=2a  3=2b  4=3a  5=3b  6=4a  7=4b  8=Fa  9=Fb

Only the lower triangle is used, so each participant contributes a 45-element vector.
Entries not rated by a given participant stay missing and are handled pairwise.
"""

from __future__ import annotations

import numpy as np
import pandas as pd

N_GNOMES = 8
N_FORESTS = 2
MATRIX_SIZE = N_GNOMES + N_FORESTS

LABELS = ["1a", "1b", "2a", "2b", "3a", "3b", "4a", "4b", "Fa", "Fb"]

# Lower triangle excluding the diagonal: the 45 unique cells.
TRIL = np.tril_indices(MATRIX_SIZE, k=-1)

# Ratings are recorded on a 0-100 scale and used as proportions.
RATING_SCALE = 100.0

# The two forests are treated as half-related to each other, neither identical nor
# unrelated, in both the model matrix and every participant's matrix.
FOREST_PAIR_SIMILARITY = 0.5


def correct_model_rdm() -> np.ndarray:
    """The similarity matrix implied by the true task structure.

    Two things are true of the real task and nothing else is: the two gnomes within a
    pair co-occur on screen, and each gnome leads deterministically to one forest. The
    model matrix is the union of those two relations.

    Returns:
        `(10, 10)` matrix with ones on the diagonal.
    """
    co_occurrence = np.eye(MATRIX_SIZE)
    transition = np.eye(MATRIX_SIZE)
    for pair in range(N_GNOMES // 2):
        first, second = 2 * pair, 2 * pair + 1
        co_occurrence[first, second] = co_occurrence[second, first] = 1
        transition[first, N_GNOMES] = transition[N_GNOMES, first] = 1
        transition[second, N_GNOMES + 1] = transition[N_GNOMES + 1, second] = 1
    co_occurrence[N_GNOMES, N_GNOMES + 1] = FOREST_PAIR_SIMILARITY
    co_occurrence[N_GNOMES + 1, N_GNOMES] = FOREST_PAIR_SIMILARITY
    return np.maximum(co_occurrence, transition)


def participant_rdm(pair_ratings: pd.DataFrame, transition_ratings: pd.DataFrame) -> np.ndarray:
    """Assemble one participant's 10x10 similarity matrix from their ratings.

    Args:
        pair_ratings: That participant's gnome-pair ratings.
        transition_ratings: That participant's gnome-to-forest ratings.

    Returns:
        `(10, 10)` matrix; unrated cells are NaN.
    """
    matrix = np.full((MATRIX_SIZE, MATRIX_SIZE), np.nan)

    for _, rating in pair_ratings.iterrows():
        first = int(rating["stim1_pair"] * 2 + rating["stim1_num"])
        second = int(rating["stim2_pair"] * 2 + rating["stim2_num"])
        matrix[first, second] = matrix[second, first] = rating["score"] / RATING_SCALE

    for _, rating in transition_ratings.iterrows():
        gnome = int(rating["gnome_pair"] * 2 + rating["gnomme_num"])
        forest = int(rating["state2"] + N_GNOMES)
        matrix[gnome, forest] = matrix[forest, gnome] = rating["score"] / RATING_SCALE

    matrix[N_GNOMES, N_GNOMES + 1] = FOREST_PAIR_SIMILARITY
    matrix[N_GNOMES + 1, N_GNOMES] = FOREST_PAIR_SIMILARITY
    return matrix


def participant_vectors(
    pair_ratings: pd.DataFrame, transition_ratings: pd.DataFrame
) -> pd.DataFrame:
    """Build every participant's lower-triangle rating vector.

    Args:
        pair_ratings: Gnome-pair ratings for one condition, with `ID` and `generation`.
        transition_ratings: Gnome-to-forest ratings for the same condition, with `ID`.

    Returns:
        One row per participant: `ID`, `generation`, and `vector` (length 45).
    """
    transitions_by_participant = dict(list(transition_ratings.groupby("ID")))

    records = []
    for participant_id, participant_pairs in pair_ratings.groupby("ID", sort=True):
        participant_transitions = transitions_by_participant.get(participant_id)
        if participant_transitions is None:
            continue
        matrix = participant_rdm(participant_pairs, participant_transitions)
        records.append(
            {
                "ID": participant_id,
                # Generation comes from the pair table, which has exactly one per
                # participant; the transition tables are not reliable for this.
                "generation": int(participant_pairs["generation"].iloc[0]),
                "vector": matrix[TRIL],
            }
        )
    return pd.DataFrame(records)


def correct_structure_beta(vector: np.ndarray, model_vector: np.ndarray) -> float | None:
    """Regression slope of a participant's ratings on the correct model.

    A single-predictor least-squares fit with an intercept, over the cells the
    participant actually rated.

    Returns:
        The slope, or None if too few cells were rated to fit.
    """
    rated = ~np.isnan(vector)
    if rated.sum() < 3:
        return None
    design = np.column_stack([np.ones(rated.sum()), model_vector[rated]])
    coefficients, *_ = np.linalg.lstsq(design, vector[rated], rcond=None)
    return float(coefficients[1])


def leave_one_out_similarity(vectors: np.ndarray) -> np.ndarray:
    """Each participant's mean correlation to the others in their group.

    Correlations are computed pairwise-complete (participants rate different subsets of
    cells) and averaged in Fisher-z space, the inter-subject-correlation convention.

    Args:
        vectors: `(n_participants, 45)`.

    Returns:
        One similarity value per participant; NaN where it is undefined.
    """
    correlations = pd.DataFrame(vectors.T).corr().to_numpy()
    np.fill_diagonal(correlations, np.nan)
    clipped = np.clip(correlations, -0.9999, 0.9999)

    similarity = np.full(len(vectors), np.nan)
    # A participant whose ratings overlap too little with everyone else's has no
    # defined correlation to any of them; they are left as NaN rather than zero.
    comparable = ~np.isnan(clipped).all(axis=1)
    similarity[comparable] = np.tanh(np.nanmean(np.arctanh(clipped[comparable]), axis=1))
    return similarity
