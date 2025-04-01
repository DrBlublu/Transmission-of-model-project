library(tidyverse)
library(fs)

transfer_file <- function(dump_filepath, filepath, study_id) {
  # Transfer raw data files from the "dump" folder to the specified study folder.
  # This function loads files from the dump folder, checks if they match the given
  # study_id, and moves matching files to the target folder.
  #
  # Args:
  #   dump_filepath: (chr) Path to the folder containing raw data files.
  #   filepath: (chr) Path to the destination folder for files of the specified study_id.
  #   study_id: (chr) Unique identifier for the study (e.g., a Prolific study ID).
  #
  # Returns:
  #   None
  
  list_filename <- list.files(dump_filepath)
  for (i in 1:length(list_filename)) {
    filename <- list_filename[i]
    df <- read.csv(file = file.path(dump_filepath, filename), header = TRUE)
    if (unique(df$STUDY_ID) == study_id) {
      print(unique(df$STUDY_ID))
      write.csv(
        df,
        file.path(filepath, filename),
        row.names = FALSE,
        fileEncoding = "UTF-8",
        na = ""
      )
    }
  }
}


integrity_check <- function(df_raw) {
  # Assess the integrity of questionnaire and task data in the dataset.
  # Checks include missing responses in specific fields and outliers in task scores.
  #
  # Args:
  #   df_raw: (tibble) Raw dataset.
  #
  # Returns:
  #   (vector) A logical vector with two flags:
  #            - score_flag: TRUE if task data integrity is unsatisfactory.
  #            - pl_flag: TRUE if questionnaire integrity is unsatisfactory.
  
  pl_flag <- FALSE
  score_flag <- FALSE

  # Check questionnaire response
  pl1 <- df_raw %>%
    select(
      pl1_task_confidence_lickert.response,
      pl1_task_lickert.response,
      pl1_task_stimLeft
    ) %>%
    filter(pl1_task_stimLeft != "") %>%
    mutate(
      no_answer = ifelse(
        is.na(pl1_task_confidence_lickert.response) &
          is.na(pl1_task_lickert.response),
        1,
        0
      )
    )
  
  pl2 <- df_raw %>%
    select(
      pl2_task_confidence_lickert.response,
      pl2_task_lickert.response,
      pl2_task_gnome
    ) %>%
    filter(pl2_task_gnome != "") %>%
    mutate(no_answer = ifelse(is.na(pl2_task_confidence_lickert.response) &
                                is.na(pl2_task_lickert.response),
                              1, 0
    ))
  
  if ((sum(pl1$no_answer) + sum(pl2$no_answer)) > ((nrow(pl1) + nrow(pl2))*.2)) {
    pl_flag <- TRUE
  }

  # Check task answers
  df <- df_raw %>%
    filter(!is.na(trials.thisTrialN)) %>%
    mutate(t_reward_flag = ifelse(t_reward_flag == 1,
                                  ifelse((t_step1_keyresp.rt < .200),
                                         0, 1
                                  ),
                                  0
    ))
  
  if ((sum(df$t_reward_flag) / nrow(df)) < .8) {
    score_flag <- TRUE
  }
  
  c(score_flag, pl_flag)
}


extract_msg <- function(df_raw) {
  # Extract written advice messages from raw data.
  #
  # Args:
  #   df_raw: (tibble) Raw dataset.
  #
  # Returns:
  #   (tibble) A dataset containing participant IDs and advice messages.
  
  df_msg <- df_raw %>%
    dplyr::select(vb_textbox.text, PROLIFIC_PID) %>%
    filter(str_detect(vb_textbox.text, "[a-zA-Z]")) %>%
    rename(
      "ID" = "PROLIFIC_PID",
      "ADVICE" = vb_textbox.text
    )
  
  df_msg
}


validity_check <- function(filepath, archive_filepath, treatment) {
  # Validate raw data files by checking the integrity of questionnaire and task data.
  # Unsatisfactory files are moved to an archive folder.
  #
  # Args:
  #   filepath: (chr) Path to the folder containing raw data files.
  #   archive_filepath: (chr) Path to the folder for archiving invalid files.
  #   treatment: (chr) Type of treatment applied to the data ("ADV" or "OBS").
  #
  # Returns:
  #   None

  n_task <- 0
  n_questionnaire <- 0
  list_filename <- list.files(filepath)
  for (i in 1:length(list_filename)) {
    valid <- TRUE
    filename <- list_filename[i]
    cat("---------------------\n")
    cat("Filename:", filename, "\n")
    
    source_path <- file.path(filepath, filename)
    df_raw <- read.csv(file = source_path, header = TRUE)
    cat("PID:", df_raw$PROLIFIC_PID[1], "\n")
    
    # Extract advice if applicable
    if (treatment == "ADV"){
      msg <- extract_msg(df_raw)
      cat("Advice:", msg$ADVICE, "\n")
      continue <- readline("Continue (y/n): ")
      if (continue == "n") {
        valid <- FALSE
      }
    }
    
    # Integrity checks
    flags <- integrity_check(df_raw)
    if (any(flags == TRUE)) {
      valid <- FALSE
    }
    
    cat("Score:", ifelse(flags[1], "Unsatisfactory", "OK"), "\n")
    if (flags[1]){
      n_task <- n_task + 1
    }
    cat("PL:", ifelse(flags[2], "Unsatisfactory", "OK"), "\n")
    if (flags[2]){
      n_questionnaire <- n_questionnaire + 1
    }
    if (valid == TRUE) {
      cat("Datafile status: OK")
    }
    if (valid == FALSE) {
      file.rename(source_path, file.path(archive_filepath, filename))
      cat("Datafile status: archived")
    }
    cat("\n")
  }
  cat("Unsatisfactory task files:", n_task, "\n")
  cat("Unsatisfactory questionnaire files:", n_questionnaire, "\n")
}


random_file_selection <- function(filepath, non_select_filepath, n) {
  # Randomly select a specified number of files from a folder and move
  # non-selected files to another folder.
  #
  # Args:
  #   filepath: (chr) Path to the folder containing data files.
  #   non_select_filepath: (chr) Path to the folder for storing non-selected files.
  #   n: (int) Number of files to retain in the original folder.
  #
  # Returns:
  #   None
  
  list_filename <- list.files(filepath)
  if (length(list_filename) > n) {
    list_filename <- sample(list_filename, length(list_filename) - n, replace = FALSE)
    for (i in list_filename) {
      file.rename(file.path(filepath, i), file.path(non_select_filepath, i))
    }
  }
}


load_and_concat_files <- function(filepath) {
  # Load and merge all .csv files in a folder into a single dataset.
  #
  # Args:
  #   filepath: (chr) Path to the folder containing .csv files.
  #
  # Returns:
  #   (tibble) A combined dataset containing data from all .csv files.
  
  
  list_files <- dir_ls(filepath, recurse = TRUE, glob = "*.csv")
  
  df_raw <- tibble()
  
  for (i in 1:length(list_files)) {
    file <- list_files[i]
    filename <- path_file(file)
    df_temp <- read.csv(file = file, header = TRUE)
    df_temp <- df_temp %>%
      mutate(filename = filename) %>%
      mutate(participant = as.character(participant)) %>%
      select(-SESSION_ID) #Not useful and caused an error
    df_raw <- bind_rows(df_raw, df_temp)
  }
  
  df_raw
}


extract_and_correct_score <- function(df_raw, method = "kool") {
  # Extract participant scores and apply a correction method.
  #
  # Args:
  #   df_raw: (tibble) Raw dataset.
  #   method: (chr) Correction method ("kool" or "NA").
  #
  # Returns:
  #   (tibble) A dataset containing corrected scores and rankings for each participant.
  
  df_score <- df_raw
  
  if (method == "NA") {
    df_score <- df_score %>%
      group_by(PROLIFIC_PID) %>%
      filter(trials.ran == 1) %>%
      filter(t_reward_flag == 1)
  }
  
  df_score <- df_score %>%
    group_by(PROLIFIC_PID) %>%
    filter(trials.ran == 1) %>%
    select(
      PROLIFIC_PID,
      globa_score,
      t_mult,
      t_points,
      t_step1_stimLeft_reward,
      t_step1_stimRight_reward,
      filename
    ) %>%
    rename(
      "ID" = "PROLIFIC_PID",
      "score" = "globa_score",
      "rew_choice" = "t_points",
      "rew_1" = "t_step1_stimLeft_reward",
      "rew_2" = "t_step1_stimRight_reward"
    ) %>%
    mutate(n_trial = 1:n()) %>%
    mutate(rew_1 = rew_1 * t_mult) %>%
    mutate(rew_2 = rew_2 * t_mult) %>%
    mutate(avg_rew = rowMeans(cbind(rew_1, rew_2))) %>%
    summarise(
      reward_rate = mean(rew_choice),
      avg_rew = mean(avg_rew),
      score_corrected = reward_rate - avg_rew,
      filename = unique(filename)
    ) %>%
    mutate(rank = rank(desc(score_corrected), ties.method = "first")) %>%
    dplyr::select(ID, score_corrected, rank, filename)
  
  df_score
}


process_selection <- function(folder, output_filepath) {
  # Process and select files for the next generation based on corrected scores.
  # This function loads, corrects, and ranks participant data, then creates
  # a "selection.csv" file with ranking, filenames, scores and filenames.
  #
  # Args:
  #   folder: (chr) Name of the folder containing files to process.
  #   output_filepath: (chr) Path to the folder where the "selection.csv" file will be saved.
  #
  # Returns:
  #   (tibble) A dataset containing normalized scores, ranks, and filenames for each participant.
  
  
  filepath <- file.path("raw", "run", folder)
  df_raw <- load_and_concat_files(filepath)
  df_score <- extract_and_correct_score(df_raw, method = "NA")

  df_next_gen <- df_score %>%
    mutate(score_norm = scale(score_corrected)) %>%
    mutate(score_norm = (score_norm - min(score_norm)) / (max(score_norm) - min(score_norm))) %>%
    mutate(cond_filename = paste0("chain", 0:(nrow(df_score) - 1), ".csv")) %>%
    mutate(obs_filename = paste0("obs", 0:(nrow(df_score) - 1), ".csv")) %>%
    select(-score_corrected)

  write.csv(df_next_gen, file.path(output_filepath, "selection.csv"), row.names = FALSE)

  df_next_gen
}


process_cond_data <- function(df_next_gen, filepath, next_gen_filepath, treatment) {
  # Generate condition files for the next generation based on participant data.
  # This function extracts specific variables, computes new attributes, and saves
  # them to new condition files in the specified folder.
  #
  # Args:
  #   df_next_gen: (tibble) Processed dataset containing participant information and rankings.
  #   filepath: (chr) Path to the folder containing raw participant data files.
  #   next_gen_filepath: (chr) Path to the folder where condition files will be saved.
  #   treatment: (chr) Specifies the treatment type ("ADV" or "OBS").
  #
  # Returns:
  #   None
  
  for (i in 1:length(df_next_gen$filename)) {
    filename <- df_next_gen$filename[i]
    df_raw <- read.csv(file = file.path(filepath, filename), header = TRUE)
    cat("filename:", filename, "\nID:", df_raw$PROLIFIC_PID[1], "\n-----------------------------\n")
    
    var_names <- colnames(df_raw)
    var_names <- grep("stim[0-9]+_", var_names, value = TRUE)
    df <- df_raw %>%
      slice_head(n = 1) %>%
      select(
        PROLIFIC_PID,
        var_names
      )
    
    # Extract "bright_forest" attributes
    temp <- df_raw %>%
      gather(key = "variable", value = "value") %>%
      filter(value == "bright_forest") %>%
      select(variable) %>%
      slice(1) %>%
      pull()
    
    bright_forest_basket_name <- paste(substr(temp, 1, 11), "_basket_name", sep = "")
    bright_forest_basket_name <- df_raw[[bright_forest_basket_name]][1]
    
    bright_forest_basket_file <- paste(substr(temp, 1, 11), "_basket_file", sep = "")
    bright_forest_basket_file <- df_raw[[bright_forest_basket_file]][1]
    
    # Extract "dark_forest" attributes
    temp <- df_raw %>%
      gather(key = "variable", value = "value") %>%
      filter(value == "dark_forest") %>%
      select(variable) %>%
      slice(1) %>%
      pull()
    
    dark_forest_basket_name <- paste(substr(temp, 1, 11), "_basket_name", sep = "")
    dark_forest_basket_name <- df_raw[[dark_forest_basket_name]][1]
    
    dark_forest_basket_file <- paste(substr(temp, 1, 11), "_basket_file", sep = "")
    dark_forest_basket_file <- df_raw[[dark_forest_basket_file]][1]
    
    var_names <- colnames(df_raw)
    var_names <- grep("stim[0-9]+_step2", var_names, value = TRUE)
    var_names <- grep("stim[0-9]+_step2_name", var_names, value = TRUE, invert = TRUE)
    df <- df %>%
      mutate(
        bright_forest_basket_name = bright_forest_basket_name,
        bright_forest_basket_file = bright_forest_basket_file,
        dark_forest_basket_name = dark_forest_basket_name,
        dark_forest_basket_file = dark_forest_basket_file
      ) %>%
      select(-var_names)
    
    # Add advice messages if applicable
    if (treatment == "ADV"){
      df_msg <- df_raw %>%
        select(vb_textbox.text) %>%
        rename(msg = vb_textbox.text) %>%
        filter(msg != "")
      df <- df %>%
        mutate(msg = df_msg$msg)
    }
    
    write.csv(
      df,
      file.path(next_gen_filepath, df_next_gen$cond_filename[i]),
      row.names = FALSE,
      fileEncoding = "UTF-8"
    )
  }
}


process_obs_data <- function(df_next_gen, filepath, next_gen_filepath, df_filename, n_trial){
  # Generate observational files for the next generation based on participant data.
  # This function extracts trial-level data, joins with filename mapping, and saves
  # the final observational data to specified files.
  #
  # Args:
  #   df_next_gen: (tibble) Processed dataset containing participant information and rankings.
  #   filepath: (chr) Path to the folder containing raw participant data files.
  #   next_gen_filepath: (chr) Path to the folder where observational files will be saved.
  #   df_filename: (tibble) Mapping of stimulus names to filenames.
  #   n_trial: (int) Number of trials to retain for observational files.
  #
  # Returns:
  #   None
  
  for (i in 1:length(df_next_gen$filename)) {
    filename <- df_next_gen$filename[i]
    df_raw <- read.csv(file = file.path(filepath, filename), header = TRUE)
    cat("filename:", filename, "\nID:", df_raw$PROLIFIC_PID[1], "\n-----------------------------\n")
    
    df <- df_raw %>%
      select(
        PROLIFIC_PID,
        t_step1_keyresp.rt,
        t_step2_keyresp.rt,
        t_step1_keyresp.keys,
        t_step1_stimLeft_name,
        t_step1_stimRight_name,
        t_step2_stim,
        t_step2_basket,
        globa_score,
        t_points,
        t_mult,
        t_reward_flag
      ) %>%
      filter(complete.cases(.)) %>%
      left_join(df_filename, by = c("t_step1_stimLeft_name" = "stim_name")) %>%
      rename(
        stimLeft_filename = stim_filename,
        stimLeft_deact_filename = stim_deact_filename
      ) %>%
      left_join(df_filename, by = c("t_step1_stimRight_name" = "stim_name")) %>%
      rename(
        stimRight_filename = stim_filename,
        stimRight_deact_filename = stim_deact_filename
      ) %>%
      left_join(df_filename, by = c("t_step2_stim" = "stim_name")) %>%
      rename(
        forest_filename = stim_filename
      ) %>%
      select(-stim_deact_filename) %>%
      left_join(df_filename, by = c("t_step2_basket" = "stim_name")) %>%
      rename(
        basket_filename = stim_filename
      ) %>%
      select(-stim_deact_filename) %>%
      slice_tail(n = n_trial)
    
    write.csv(
      df,
      file.path(next_gen_filepath, df_next_gen$obs_filename[i]),
      row.names = FALSE,
      fileEncoding = "UTF-8"
    )
  }
}