"""Smoke tests: the repository is wired up correctly and ships no identifiers.

These run without `data/raw/` being built — data-dependent assertions skip cleanly
so that a fresh clone can still verify its own structure.
"""

from __future__ import annotations

import re

import numpy as np

import pandas as pd
import pytest

from ctm import paths

PROLIFIC_ID_PATTERN = re.compile(r"\b[0-9a-fA-F]{24}\b")


def test_repository_layout_exists() -> None:
    """The directories every script assumes are present."""
    for directory in (paths.DATA_RAW, paths.DOCS, paths.ROOT / "scripts"):
        assert directory.is_dir(), f"missing directory: {directory}"


def test_config_loads_and_declares_files() -> None:
    """`config.yaml` parses and lists at least one raw file to ship."""
    config = paths.load_config()
    files = config["deidentify"]["files"]
    assert files, "config declares no raw files"
    for spec in files:
        assert "description" in spec, f"file spec has no description: {spec}"
        # A spec is a single file, a glob concatenated into one file, or a glob
        # split into one output per input.
        assert ("source" in spec) ^ ("source_glob" in spec), (
            f"spec must declare exactly one of source/source_glob: {spec}"
        )
        assert ("dest" in spec) ^ ("dest_dir" in spec), (
            f"spec must declare exactly one of dest/dest_dir: {spec}"
        )
        if "dest_dir" in spec:
            assert "source_glob" in spec, f"dest_dir requires source_glob: {spec}"


def test_id_map_is_stored_outside_the_repository() -> None:
    """The identifier mapping must never sit inside the published tree."""
    config = paths.load_config()
    id_map_path = paths.resolve(config["deidentify"]["id_map_path"])
    assert paths.ROOT not in id_map_path.parents, (
        f"id_map_path {id_map_path} is inside the repository and would be published"
    )


def _shipped_csv_paths() -> list:
    return sorted(
        path
        for pattern in ("**/*.csv", "**/*.csv.gz")
        for path in paths.DATA_RAW.glob(pattern)
    )


def test_no_identifiers_in_shipped_data() -> None:
    """Negative control on de-identification: no Prolific-format token survives."""
    csv_paths = _shipped_csv_paths()
    if not csv_paths:
        pytest.skip("data/raw/ not built yet; run scripts/00_deidentify.py")

    for csv_path in csv_paths:
        frame = pd.read_csv(csv_path, low_memory=False)
        for column in frame.columns:
            if frame[column].dtype != object:
                continue
            values = frame[column].dropna().astype(str).unique()
            hits = [v for v in values if PROLIFIC_ID_PATTERN.search(v)]
            assert not hits, f"{csv_path.name}:{column} still contains identifiers, e.g. {hits[:2]}"


def test_every_shipped_file_is_documented() -> None:
    """Each file in data/raw/ has a section in the data dictionary.

    Per-generation trial files are documented collectively as `gen-NN.csv`, so their
    names are normalised before lookup.
    """
    csv_paths = _shipped_csv_paths()
    if not csv_paths:
        pytest.skip("data/raw/ not built yet; run scripts/00_deidentify.py")

    dictionary = (paths.DOCS / "data_dictionary.md").read_text(encoding="utf-8")
    for csv_path in csv_paths:
        relative = csv_path.relative_to(paths.DATA_RAW).as_posix()
        entry = re.sub(r"gen-\d+\.csv$", "gen-NN.csv", relative)
        assert entry in dictionary, f"{entry} is undocumented in data_dictionary.md"


def test_figure_s7_representational_similarity() -> None:
    """Regression test: the two S7 trajectories and the correct-model matrix."""
    from ctm.cognitive_map import MATRIX_SIZE, correct_model_rdm

    model = correct_model_rdm()
    assert model.shape == (MATRIX_SIZE, MATRIX_SIZE)
    assert (np.diag(model) == 1).all(), "model matrix should have ones on the diagonal"
    # Gnome 0 leads to forest 0 (index 8) and co-occurs with gnome 1, nothing else.
    assert model[0, 8] == 1 and model[0, 9] == 0 and model[0, 1] == 1
    assert model[8, 9] == 0.5, "the two forests are half-related to each other"

    rsa_path = paths.DATA_PROCESSED / "cognitive_map_rsa.csv"
    if not rsa_path.is_file():
        pytest.skip("run scripts/analysis/s2-7_cognitive_map_rsa.py first")
    rsa = pd.read_csv(rsa_path)

    published = {
        ("beta", "Language"): [0.227, 0.237, 0.239, 0.213, 0.275,
                               0.279, 0.279, 0.306, 0.408, 0.389],
        ("beta", "Observation"): [0.220, 0.209, 0.175, 0.226, 0.174,
                                  0.206, 0.202, 0.212, 0.234, 0.179],
        ("isc", "Language"): [0.185, 0.215, 0.208, 0.181, 0.252,
                              0.236, 0.206, 0.219, 0.332, 0.359],
        ("isc", "Observation"): [0.195, 0.170, 0.141, 0.159, 0.131,
                                 0.175, 0.163, 0.183, 0.181, 0.127],
    }
    for (measure, condition), expected in published.items():
        means = (
            rsa[rsa["condition"] == condition]
            .groupby("generation")[measure].mean().sort_index().to_numpy()
        )
        assert len(means) == 10, f"{measure}/{condition}: expected 10 generations"
        for generation, (got, want) in enumerate(zip(means, expected), start=1):
            assert abs(got - want) < 0.002, (
                f"{measure}/{condition} generation {generation}: "
                f"{got:.3f}, published {want:.3f}"
            )

    # The headline contrast: language rises by the final generations, observation does not.
    for measure in ("beta", "isc"):
        language = rsa[rsa["condition"] == "Language"].groupby("generation")[measure].mean()
        observation = (
            rsa[rsa["condition"] == "Observation"].groupby("generation")[measure].mean()
        )
        assert language.loc[10] > language.loc[1] * 1.5, f"{measure}: language should rise"
        assert observation.loc[10] < language.loc[10], f"{measure}: observation should lag"


def test_figure_s17_confusability() -> None:
    """Regression test: the confusability structure the figure is about.

    Tolerances are loose because environment-to-seed assignment depends on participant
    sort order, which de-identification changes; see docs/figure_manifest.md. The
    structure being asserted is far larger than that noise.
    """
    value_tracking = ["MB-colour", "MF-colour", "Arbitration", "Fixed-MB-w"]
    published = {
        "behavior_similarity_choice.csv": {
            ("MB-colour", "MF-colour"): 0.66,
            ("MB-colour", "Fixed-MB-w"): 0.91,
            ("Arbitration", "Fixed-MB-w"): 0.88,
            ("MB-colour", "MB-size"): -0.01,
        },
        "behavior_similarity_reward.csv": {
            ("MB-colour", "MF-colour"): 0.68,
            ("MB-colour", "Fixed-MB-w"): 0.93,
            ("Arbitration", "Fixed-MB-w"): 0.90,
            ("MB-colour", "MB-size"): -0.00,
        },
    }

    for filename, cells in published.items():
        path = paths.DATA_PROCESSED / filename
        if not path.is_file():
            pytest.skip("run scripts/analysis/s5-5_behavior_similarity.py first")
        similarity = pd.read_csv(path, index_col=0)

        assert (abs(similarity.to_numpy() - similarity.to_numpy().T) < 1e-12).all(), (
            f"{filename}: similarity matrix is not symmetric"
        )

        for (row, column), expected in cells.items():
            got = similarity.loc[row, column]
            assert abs(got - expected) < 0.05, (
                f"{filename}: {row} vs {column} = {got:.3f}, published {expected:.2f}"
            )

        # The value-tracking strategies must stay mutually confusable...
        block = similarity.loc[value_tracking, value_tracking].to_numpy()
        off_diagonal = block[np.triu_indices(len(value_tracking), 1)]
        assert off_diagonal.min() > 0.6, "value-tracking cluster should be highly similar"

        # ...while a strategy keyed to the uninformative size feature must not be.
        assert similarity.loc["MB-size", value_tracking].abs().max() < 0.15, (
            "MB (size) should be near-orthogonal to the value-tracking cluster"
        )


def test_figure_s16_ideal_observer() -> None:
    """Regression test: the ideal observer's final knowledge, empirical vs uniform.

    Also re-asserts the canonical encoding the closed-form posterior depends on, since
    a change there would alter every curve without any error being raised.
    """
    import numpy as np

    from ctm.bayesian_observer import (
        kappa_to_beta_prior,
        posterior_on_true_forest,
        to_knowledge,
        uniform_demonstrator_counts,
    )

    counts_path = paths.DATA_PROCESSED / "bayesian_observer_cumcounts.npy"
    if not counts_path.is_file():
        pytest.skip("run scripts/analysis/s5-4_bayesian_observer.py first")

    empirical = np.load(counts_path)
    assert empirical.shape == (900, 80, 8), f"unexpected shape {empirical.shape}"
    # Every demonstrator shows exactly 80 trials, so the final counts must sum to 80.
    assert (empirical[:, -1, :].sum(axis=1) == 80).all()

    uniform = uniform_demonstrator_counts()
    expected = {
        0.2: (0.941, 0.980),
        1.0: (0.859, 0.909),
        2.0: (0.780, 0.833),
        4.0: (0.664, 0.714),
        10.0: (0.466, 0.500),
    }
    for kappa, (want_empirical, want_uniform) in expected.items():
        alpha0, beta0 = kappa_to_beta_prior(kappa)
        got_empirical = to_knowledge(
            posterior_on_true_forest(empirical, alpha0, beta0)
        ).mean(axis=(0, 2))[-1]
        got_uniform = to_knowledge(
            posterior_on_true_forest(uniform, alpha0, beta0)
        ).mean(axis=1)[-1]
        assert abs(got_empirical - want_empirical) < 0.002, f"kappa={kappa} empirical"
        assert abs(got_uniform - want_uniform) < 0.002, f"kappa={kappa} uniform"
        # Uneven sampling must always cost the observer something.
        assert got_uniform > got_empirical, f"kappa={kappa}: uniform should dominate"


def test_figure_s12_same_different_gap() -> None:
    """Regression test: the same-vs-different gap in stay probability at maximum reward.

    The scientific content of S12 is that this gap *closes* across generations in the
    language condition (generalisation across states) but not in the observation
    condition. Pinning the gap catches changes to the stay/state-similarity coding or
    to the model specification.
    """
    predictions_path = paths.DATA_PROCESSED / "stay_probability_predictions.csv"
    if not predictions_path.is_file():
        pytest.skip("run scripts/analysis/s5-1_stay_probability.R first")

    predictions = pd.read_csv(predictions_path)
    at_max = predictions[
        predictions["previous_outcome"] == predictions["previous_outcome"].max()
    ]
    gaps = at_max.pivot_table(
        index=["condition", "generation"], columns="state_similarity", values="predicted"
    )
    gaps["gap"] = gaps["same"] - gaps["different"]

    expected = {
        "Language": [0.182, 0.221, 0.215, 0.200, 0.214, 0.218, 0.171, 0.118, 0.067, 0.068],
        "Observation": [0.208, 0.205, 0.212, 0.230, 0.155, 0.214, 0.191, 0.152, 0.179, 0.166],
    }
    for condition, want in expected.items():
        got = gaps.loc[condition, "gap"].sort_index().to_numpy()
        assert len(got) == len(want), f"{condition}: expected 10 generations"
        for generation, (g, w) in enumerate(zip(got, want), start=1):
            # Tolerance allows for optimiser/BLAS differences across platforms.
            assert abs(g - w) < 0.01, (
                f"{condition} generation {generation}: gap {g:.3f}, expected {w:.3f}"
            )

    # The headline contrast: the language gap closes, the observation gap does not.
    language = gaps.loc["Language", "gap"].sort_index()
    observation = gaps.loc["Observation", "gap"].sort_index()
    assert language.iloc[-1] < language.iloc[0] / 2, "language gap should close markedly"
    assert observation.iloc[-1] > language.iloc[-1], "observation gap should stay wider"


def test_surrogate_ids_agree_across_processed_files() -> None:
    """Every processed file must refer to the same participant by the same surrogate.

    The surrogate map is append-only precisely so that adding a raw file cannot
    renumber existing participants. If it ever does, files generated before and after
    the change silently stop joining, which shows up here as a participant appearing
    in two different generations.
    """
    fitted_path = paths.DATA_PROCESSED / "arbitration_fitted_params.csv"
    fixed_path = paths.DATA_PROCESSED / "fixed_model_fitted_params.csv"
    if not (fitted_path.is_file() and fixed_path.is_file()):
        pytest.skip("processed parameter files not built yet")

    fitted = pd.read_csv(fitted_path)[["ID", "condition", "generation"]]
    fixed = pd.read_csv(fixed_path)[["ID", "condition", "generation"]]

    merged = fitted.merge(fixed, on=["ID", "condition"], suffixes=("_arb", "_fixed"))
    assert not merged.empty, "no participants shared between the two fitted-parameter files"

    disagreements = merged[merged["generation_arb"] != merged["generation_fixed"]]
    assert disagreements.empty, (
        f"{len(disagreements)} participants have different generations in the two files, "
        "which means the surrogate map was renumbered between runs"
    )

    # The fixed-model fits cover slightly fewer participants, but nearly all of them
    # should be present in both; a small overlap indicates a mapping mismatch.
    overlap = len(merged) / len(fixed)
    assert overlap > 0.95, f"only {overlap:.0%} of fixed-model participants matched"


def test_figure_s13_matches_published_values() -> None:
    """Regression test: Figure S13's per-generation means and panel-B R^2.

    S13 is deterministic, so these are exact up to floating point; the tolerances
    below are loose only to survive rounding in the stored reference values.
    """
    knowledge_path = paths.DATA_PROCESSED / "task_knowledge.csv"
    if not knowledge_path.is_file():
        pytest.skip("run scripts/analysis/s2-2_task_knowledge.py first")

    knowledge = pd.read_csv(knowledge_path)

    published_panel_a = {
        "Language": [0.065, 0.101, 0.117, 0.139, 0.210, 0.200, 0.208, 0.272, 0.426, 0.405],
        "Observation": [0.035, 0.050, 0.045, 0.131, -0.025, 0.062, 0.053, 0.037, 0.092, 0.019],
    }
    for condition, expected in published_panel_a.items():
        means = (
            knowledge[knowledge["condition"] == condition]
            .groupby("generation")["knowledge_model"]
            .mean()
            .sort_index()
            .to_numpy()
        )
        for generation, (got, want) in enumerate(zip(means, expected), start=1):
            assert abs(got - want) < 0.001, (
                f"{condition} generation {generation}: got {got:.3f}, published {want:.3f}"
            )

    # Panel B: R^2 as annotated in the manuscript (0.10 and 0.05).
    published_r2 = {"Language": 0.100, "Observation": 0.051}
    paired = knowledge.dropna(subset=["knowledge_data", "knowledge_model"])
    for condition, want in published_r2.items():
        group = paired[paired["condition"] == condition]
        r = group["knowledge_data"].corr(group["knowledge_model"])
        assert abs(r**2 - want) < 0.002, f"{condition}: R2 {r**2:.3f}, published {want:.3f}"


def test_figure_2c_matches_published_values() -> None:
    """Regression test: Figure 2C's per-generation means, to the published precision.

    Guards the three provenance choices recorded in docs/figure_manifest.md — the
    normalize_reward fit variant, the mean across restarts, and the mean across
    simulations. Getting any of them wrong moves these numbers well beyond tolerance.
    """
    summary_path = paths.DATA_PROCESSED / "arbitration_w_summary.csv"
    if not summary_path.is_file():
        pytest.skip("run scripts/analysis/s5-2_simulate_model_basedness.py first")

    published = {
        "Language": [0.510, 0.525, 0.510, 0.507, 0.524, 0.526, 0.526, 0.595, 0.658, 0.686],
        "Observation": [0.490, 0.490, 0.486, 0.512, 0.494, 0.507, 0.489, 0.513, 0.526, 0.494],
    }
    summary = pd.read_csv(summary_path)
    if summary["n_sim"].max() < 100:
        pytest.skip("published values require --n-sim 100")

    for condition, expected in published.items():
        means = (
            summary[summary["condition"] == condition]
            .groupby("generation")["w"]
            .mean()
            .sort_index()
            .to_numpy()
        )
        assert len(means) == len(expected), f"{condition}: expected 10 generations"
        # Tolerance is Monte-Carlo error at 100 simulations; the original run was unseeded.
        for generation, (got, want) in enumerate(zip(means, expected), start=1):
            assert abs(got - want) < 0.005, (
                f"{condition} generation {generation}: got {got:.3f}, published {want:.3f}"
            )
