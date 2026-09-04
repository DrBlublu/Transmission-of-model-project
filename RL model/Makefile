# Reproduction pipeline.
#
#   make data      build de-identified data/raw/ from the private source tree
#   make check     verify no participant identifiers survived into data/raw/
#   make figures   rebuild every figure listed in docs/figure_manifest.md
#   make test      run the smoke tests
#   make clean     delete generated outputs (raw data is never touched)
#
# Figure targets are added to FIGURES below as each figure is ported.

PYTHON  := python
RSCRIPT := Rscript

RAW       := data/raw
PROCESSED := data/processed
FIGDIR    := figures

# Every ported figure appends its final artefact here.
FIGURES := $(FIGDIR)/02c_model_basedness.pdf \
           $(FIGDIR)/S13_task_knowledge.pdf \
           $(FIGDIR)/S12_stay_probability.pdf \
           $(FIGDIR)/S14_arbitration_parameters.pdf \
           $(FIGDIR)/S15_model_basedness_comparison.pdf \
           $(FIGDIR)/S16_bayesian_observer.pdf \
           $(FIGDIR)/S17_behavior_similarity.pdf \
           $(FIGDIR)/S7_rsa.pdf

# Number of simulations per participant. 100 reproduces the published figure;
# lower values are for quick checks and will not match exactly.
N_SIM  ?= 100
N_JOBS ?= 8

.PHONY: all data check figures test clean help

all: figures

help:
	@grep -E '^#   make' $(MAKEFILE_LIST) | sed 's/^#   //'

data:
	$(PYTHON) scripts/00_deidentify.py --config config.yaml

check:
	$(PYTHON) scripts/00_deidentify.py --config config.yaml --check

figures: $(FIGURES)
	@if [ -z "$(FIGURES)" ]; then \
		echo "No figures registered yet. Add targets to FIGURES in the Makefile"; \
		echo "and a row to docs/figure_manifest.md as each figure is ported."; \
	fi

test:
	$(PYTHON) -m pytest -q

clean:
	rm -rf $(PROCESSED)/* $(FIGDIR)/*.pdf $(FIGDIR)/*.png logs/*.log
	@echo "Removed generated outputs. $(RAW) untouched."

# ---------------------------------------------------------------------------
# Figure 2C - simulated model-basedness (W) across generations
# ---------------------------------------------------------------------------

# Stage 1: 100 fit restarts per participant -> one parameter set (mean across restarts).
$(PROCESSED)/arbitration_fitted_params.csv: \
		$(RAW)/arbitration_restarts_language.csv.gz \
		$(RAW)/arbitration_restarts_observation.csv.gz \
		scripts/analysis/s5-2_arbitration_fitted_params.py \
		src/ctm/io.py
	$(PYTHON) scripts/analysis/s5-2_arbitration_fitted_params.py

# Stage 2: run the fitted model forward through each participant's real environment.
# Slowest step in the pipeline (~15 min wall on a laptop at N_SIM=100).
$(PROCESSED)/arbitration_w_summary.csv: \
		$(PROCESSED)/arbitration_fitted_params.csv \
		scripts/analysis/s5-2_simulate_model_basedness.py \
		src/ctm/arbitration.py
	$(PYTHON) scripts/analysis/s5-2_simulate_model_basedness.py --n-sim $(N_SIM) --n-jobs $(N_JOBS)

# Stage 3: plot.
$(FIGDIR)/02c_model_basedness.pdf: \
		$(PROCESSED)/arbitration_w_summary.csv \
		scripts/figures/fig02c_model_basedness.py
	$(PYTHON) scripts/figures/fig02c_model_basedness.py

# ---------------------------------------------------------------------------
# Figure S13 - estimated vs measured task knowledge
# Reuses the Figure 2C fitted parameters, so no simulation is needed (seconds).
# ---------------------------------------------------------------------------

$(PROCESSED)/task_knowledge.csv $(PROCESSED)/task_knowledge_stats.csv: \
		$(PROCESSED)/arbitration_fitted_params.csv \
		$(RAW)/task_knowledge_scores.csv \
		scripts/analysis/s2-2_task_knowledge.py
	$(PYTHON) scripts/analysis/s2-2_task_knowledge.py

$(FIGDIR)/S13_task_knowledge.pdf: \
		$(PROCESSED)/task_knowledge.csv \
		$(PROCESSED)/task_knowledge_stats.csv \
		scripts/figures/figS13_task_knowledge.py
	$(PYTHON) scripts/figures/figS13_task_knowledge.py
# ---------------------------------------------------------------------------

# ---------------------------------------------------------------------------
# Figure S12 - stay probability by previous reward and state similarity
# The mixed-effects logistic fit is in R (lme4::glmer); no Python equivalent
# supports the random-slope structure. Slow: ~20-40 min on ~508k trials.
# ---------------------------------------------------------------------------

$(PROCESSED)/stay_probability_predictions.csv: \
		$(RAW)/trials/language/gen-01.csv \
		$(RAW)/trials/observation/gen-01.csv \
		scripts/analysis/s5-1_stay_probability.R
	$(RSCRIPT) scripts/analysis/s5-1_stay_probability.R

$(FIGDIR)/S12_stay_probability.pdf: \
		$(PROCESSED)/stay_probability_predictions.csv \
		scripts/figures/figS12_stay_probability.py
	$(PYTHON) scripts/figures/figS12_stay_probability.py

# ---------------------------------------------------------------------------
# Figure S14 - all arbitration-model parameters across generations
# Reuses the Figure 2C fitted parameters; no simulation, no model fitting.
# ---------------------------------------------------------------------------

$(PROCESSED)/arbitration_parameters_long.csv: \
		$(PROCESSED)/arbitration_fitted_params.csv \
		scripts/analysis/s5-2_arbitration_parameters_long.py
	$(PYTHON) scripts/analysis/s5-2_arbitration_parameters_long.py

$(FIGDIR)/S14_arbitration_parameters.pdf: \
		$(PROCESSED)/arbitration_parameters_long.csv \
		scripts/figures/figS14_arbitration_parameters.py
	$(PYTHON) scripts/figures/figS14_arbitration_parameters.py

# ---------------------------------------------------------------------------
# Figure S15 - fixed-model model-basedness, and its agreement with arbitration
# Uses the 5-parameter hierarchical fits (the variant the SI reports).
# ---------------------------------------------------------------------------

$(PROCESSED)/fixed_model_fitted_params.csv: \
		$(RAW)/hierarchical_5param_language.csv \
		$(RAW)/hierarchical_5param_observation.csv \
		scripts/analysis/s5-3_fixed_model_fitted_params.py
	$(PYTHON) scripts/analysis/s5-3_fixed_model_fitted_params.py

$(PROCESSED)/model_basedness_comparison.csv $(PROCESSED)/model_basedness_comparison_stats.csv: \
		$(PROCESSED)/fixed_model_fitted_params.csv \
		$(PROCESSED)/arbitration_w_summary.csv \
		scripts/analysis/s5-3_model_basedness_comparison.py
	$(PYTHON) scripts/analysis/s5-3_model_basedness_comparison.py

$(FIGDIR)/S15_model_basedness_comparison.pdf: \
		$(PROCESSED)/model_basedness_comparison.csv \
		$(PROCESSED)/model_basedness_comparison_stats.csv \
		scripts/figures/figS15_model_basedness_comparison.py
	$(PYTHON) scripts/figures/figS15_model_basedness_comparison.py

# ---------------------------------------------------------------------------
# Figure S16 - Bayesian ideal observer of the gnome-to-forest mapping
# Uses only the observation trial files; no model fitting, no simulation.
# ---------------------------------------------------------------------------

$(PROCESSED)/bayesian_observer_cumcounts.npy: \
		$(RAW)/trials/observation/gen-01.csv \
		scripts/analysis/s5-4_bayesian_observer.py \
		src/ctm/bayesian_observer.py
	$(PYTHON) scripts/analysis/s5-4_bayesian_observer.py

$(FIGDIR)/S16_bayesian_observer.pdf: \
		$(PROCESSED)/bayesian_observer_cumcounts.npy \
		scripts/figures/figS16_bayesian_observer.py
	$(PYTHON) scripts/figures/figS16_bayesian_observer.py

# ---------------------------------------------------------------------------
# Figure S17 - behavioural confusability of the candidate strategies
# Simulation over the real first-generation environments. See docs/candidate_models.md.
# ---------------------------------------------------------------------------

$(PROCESSED)/behavior_similarity_choice.csv $(PROCESSED)/behavior_similarity_reward.csv: \
		$(RAW)/trials/language/gen-01.csv \
		scripts/analysis/s5-5_behavior_similarity.py \
		src/ctm/candidate_models.py
	$(PYTHON) scripts/analysis/s5-5_behavior_similarity.py --n-jobs $(N_JOBS)

$(FIGDIR)/S17_behavior_similarity.pdf: \
		$(PROCESSED)/behavior_similarity_choice.csv \
		scripts/figures/figS17_behavior_similarity.py
	$(PYTHON) scripts/figures/figS17_behavior_similarity.py

# ---------------------------------------------------------------------------
# Figure S7 (panels B and D) - representational similarity of mental models
# Panels A and C are hand-made illustrations and are not reproduced.
# ---------------------------------------------------------------------------

$(PROCESSED)/cognitive_map_rsa.csv $(PROCESSED)/cognitive_map_rsa_stats.csv: \
		$(RAW)/cognitive_map/pair_language.csv \
		$(RAW)/cognitive_map/transition_observation.csv \
		scripts/analysis/s2-7_cognitive_map_rsa.py \
		src/ctm/cognitive_map.py
	$(PYTHON) scripts/analysis/s2-7_cognitive_map_rsa.py

$(FIGDIR)/S7_rsa.pdf: \
		$(PROCESSED)/cognitive_map_rsa.csv \
		$(PROCESSED)/cognitive_map_rsa_stats.csv \
		scripts/figures/figS7_rsa.py
	$(PYTHON) scripts/figures/figS7_rsa.py
