source("script/raw_data_processing_functions.R")

setwd("data")

run_name <- "2024-11-27_tenth_gen_obs"
study_id <- "67ee8012009700dde3bcc495"
treatment <- "OBS"

df_filename <- read.csv("stim_name_filename.csv")

filepath <- file.path("raw", "run", run_name)
integrity_filepath <- file.path("raw", "archived", "run", run_name, "integrity")
non_select_filepath <- file.path("raw", "archived", "run", run_name, "not_selected")
dump_filepath <- file.path("raw", "dump")
next_gen_filepath <- file.path("../output", "next gen file", run_name)

transfer_file(dump_filepath, filepath, study_id)
validity_check(filepath, integrity_filepath, treatment)
random_file_selection(filepath, non_select_filepath, 100)
df_next_gen <- process_selection(run_name, next_gen_filepath)
process_cond_data(df_next_gen, filepath, next_gen_filepath, treatment)
if (treatment == "OBS"){
  process_obs_data(df_next_gen, filepath, next_gen_filepath, df_filename, n_trial = 80)  
}
