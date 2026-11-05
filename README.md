# Language enables the cumulative cultural evolution of mental models

Code and data for **Language enables the cumulative cultural evolution of mental models** (A. Bluet et. al., 2026)
Archived version: https://doi.org/10.5281/zenodo.23973977

This repository contains the data, analysis R code, plotting R code, Reinforcement Learning python code, BERTopic python code and NLP R code required to reproduced all the analysis of the paper.

## Long Description

Participants took part in an online, multi-generational transmission chain study using a decision-making task in which they had to learn, through repeated choices, which options yielded the most reward. Each participant was able to learn from their demonstrator (i.e., the participant who completed the study immediately before them) in one of two conditions: either by receiving the demonstrator’s written advice (language condition), or by observing a replay (observation condition) of the demonstrator’s last 80 completed trials (out of 256). Following the task, participants completed questionnaires assessing their knowledge of the task’s hidden structure.We tested whether the learning condition shaped participants’ behaviour in the task. Specifically, we expected participants who received written advice to build on their predecessor’s knowledge and perform better than those who observed a replay, such that performance would improve across generations only in the language condition.

## Reproducing the analysis

### Requirements
- R version 4.5.X (the version used for the analysis; see `renv.lock`)

### Setup
1. Download or clone this repository.
2. Open the project folder in R.
3. Install "renv" if you don't already have it:
   ```r
   instal.packages("revn")
   ```
4. Restore the package environment:
   ```r
   renv::restore()
   ```
   This installs the exact package versions used for the analysis. This might take a couple of minutes.

### Running the analysis
The preprocessed data is already accessible. If you want to re-run the preprocessing on the raw data, run in order:
1. `raw_data_processing_run.R`: clean and prepare the raw_data
2. `preprocessing_run.R`: preprocess the data and output "data_participant.csv"

To run the analysis; simply run the `analysis.rmd` file in order. Note that in the Data section, other datafile created from the Reinforcement Learning model, the BERTopic analysis and the NLP are needed. All these datafiles are present in the `data` folder.

To create the raw version of the plot, simply run the `plotting.rmd` file in order.

### Data
All preprocessed data is in the `data\` folder. All raw data is located in the `data\raw\` folder.

## Reproducing the experiment

All necesssary file & code is in the `experiment\` folder. For more details, please contact me.

## Results
All results from the paper (tables, figures) can be found in the `results\` folder.

## License

The code in this repository is licensed under the [MIT License](LICENSE).
Copyright (c) 2026 Alexandre Bluet.