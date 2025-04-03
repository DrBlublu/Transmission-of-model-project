library(tidyverse)
library(fs)

load_and_concat_files <- function(filepath) {
  # Load all .csv files in a folder and merge them together into a single tibble.
  # This function iterates through all .csv files in the specified folder path,
  # reads each file, and concatenates them into a single tibble. It also adds
  # metadata such as the filename and removes unwanted columns.
  #
  # Args:
  #   filepath: (chr) Path to the folder containing .csv files.
  #
  # Returns:
  #   A tibble (df_raw) containing the concatenated data from all .csv files.
  
  list_files <- dir_ls(filepath, recurse = TRUE, glob = "*.csv")
  
  df_raw <- tibble()
  
  for (i in 1:length(list_files)) {
    file <- list_files[i]
    filename <- path_file(file)
    # print(filename)
    df_temp <- read.csv(file = file, header = TRUE)
    df_temp <- df_temp %>%
      mutate(filename = filename) %>%
      mutate(participant = as.character(participant)) %>%
      select(-SESSION_ID) #not useful and caused an error
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

extract_binary_score <- function(df_raw) {
  # Extract binary scores based on participants' choices.
  # This function computes the proportion of "correct" choices where participants
  # selected the best possible option (highest reward).
  #
  # Args:
  #   df_raw: (tibble) The raw participant data.
  #
  # Returns:
  #   A tibble (df_binary) containing the participant ID and binary scores.
  
  df_binary <- df_raw %>%
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
    mutate(best = pmax(rew_1, rew_2)) %>%
    mutate(binary_score = ifelse(rew_choice == best, 1, 0)) %>%
    summarise(
      filename = unique(filename),
      binary_score = mean(binary_score)
    ) %>%
    select(
      ID,
      binary_score
    )
  df_binary
}

extract_pl1_score <- function(df_raw) {
  # Extract and compute scores from Post Learning Task 1 (Pair Task).
  # This function processes raw data to calculate an understanding score 
  # for each participant based on task responses and confidence ratings.
  #
  # Args:
  #   df_raw: (tibble) The raw dataset containing participants' responses.
  #
  # Returns:
  #   A tibble (df_pl1) with participant IDs and their computed understanding scores.
  
  # Identify column names related to stimuli and pair information
  var_names <- colnames(df_raw)
  var_names <- grep("stim[0-9]+_(name|pair)", var_names, value = TRUE)
  
  # Extract stimulus and pair mapping information
  df_gnomes_info <- df_raw %>%
    select(
      PROLIFIC_PID,
      var_names
    ) %>%
    filter(complete.cases(.)) %>% # Keep only rows with complete cases
    gather(key, value, -PROLIFIC_PID) %>% # Reshape wide data to long format
    separate(key, into = c("stim_num", "variable"), sep = "_") %>%
    pivot_wider(names_from = variable, values_from = value) %>%
    select(PROLIFIC_PID, name, pair)

  # Process participant responses and calculate scores
  df_pl1 <- df_raw %>%
    select(
      PROLIFIC_PID,
      pl1_task_confidence_lickert.response,
      pl1_task_lickert.response,
      pl1_task_stimLeft,
      pl1_task_stimRight
    ) %>%
    rename(
      ID = PROLIFIC_PID,
      pl1_confidence_rating = pl1_task_confidence_lickert.response,
      pl1_rating = pl1_task_lickert.response,
      gnome_1 = pl1_task_stimLeft,
      gnome_2 = pl1_task_stimRight
    ) %>%
    filter(gnome_1 != "") %>% # Exclude invalid or empty responses
    # Replace missing confidence/rating values with 50 (bug fix for PsychoPy)
    mutate(across(c(pl1_confidence_rating, pl1_rating), ~ replace_na(., 50))) %>%
    left_join(df_gnomes_info, by = c("ID" = "PROLIFIC_PID", "gnome_1" = "name")) %>%
    left_join(df_gnomes_info,
              by = c("ID" = "PROLIFIC_PID", "gnome_2" = "name"),
              suffix = c("_gnome_1", "_gnome_2")
    ) %>%
    # Check if the gnomes are correctly paired
    mutate(correct_rating = ifelse(pair_gnome_1 == pair_gnome_2, 100, 0)) %>%
    select(ID, pl1_confidence_rating, pl1_rating, correct_rating) %>%
    # Invert ratings when correct = 0
    mutate(pl1_rating = ifelse(correct_rating == 0, abs(pl1_rating - 100), pl1_rating)) %>%
    # Invert every rating to be 100 (because we flipped the answer before)
    mutate(correct_rating = ifelse(correct_rating == 0, correct_rating + 100, correct_rating)) %>%
    # Normalize scores between -1 and 1
    mutate(understanding_score = (pl1_rating - 50) / 50) %>%
    group_by(ID) %>%
    summarise(understanding_score = mean(understanding_score))
  
  df_pl1
}

extract_pl2_score <- function(df_raw) {
  # Extract and compute scores from Post Learning Task 2 (Transition Task).
  # This function calculates understanding scores for participants based 
  # on their task responses and the transition structure.
  #
  # Args:
  #   df_raw: (tibble) The raw dataset containing participants' responses.
  #
  # Returns:
  #   A tibble (df_pl2) with participant IDs and their computed understanding scores.
  
  # Identify columns related to stimuli and transitions
  var_names <- colnames(df_raw)
  var_names <- grep("stim[0-9]+_(name|step2_name)", var_names, value = TRUE)
  
  # Extract transition mapping information
  df_pl2_info <- df_raw %>%
    select(
      PROLIFIC_PID,
      var_names
    ) %>%
    filter_all(all_vars(. != "")) %>% # Exclude empty rows
    gather(key, value, -PROLIFIC_PID) %>% # Reshape wide data to long format
    # This gives a warning bc variable is names "stim1_step2_name"
    separate(key, into = c("stim_num", "variable"), sep = "_") %>%
    pivot_wider(names_from = variable, values_from = value) %>%
    select(PROLIFIC_PID, name, step2) %>%
    rename(ID = PROLIFIC_PID, stim = name, forest = step2)
  
  # Process participant responses and calculate scores
  df_pl2 <- df_raw %>%
    select(PROLIFIC_PID, pl2_task_lickert.response, pl2_task_gnome, pl2_task_forest) %>%
    filter(pl2_task_gnome != "") %>% # Exclude invalid or empty responses
    # Replace missing confidence/rating values with 50 (bug fix for PsychoPy)
    mutate(pl2_task_lickert.response = as.numeric(replace_na(pl2_task_lickert.response, 50))) %>%
    rename(
      "pl2_rating" = pl2_task_lickert.response,
      "ID" = PROLIFIC_PID
    ) %>%
    # Join with transition mapping
    left_join(df_pl2_info, by = c("ID" = "ID", "pl2_task_gnome" = "stim")) %>%
    # Check if transitions are correct
    mutate(correct_rating = ifelse(pl2_task_forest == forest, 100, 0)) %>%
    select(ID, pl2_rating, correct_rating) %>%
    # Invert ratings when correct = 0
    mutate(pl2_rating = ifelse(correct_rating == 0, abs(pl2_rating - 100), pl2_rating)) %>%
    mutate(correct_rating = ifelse(correct_rating == 0, correct_rating + 100, correct_rating)) %>%
    mutate(understanding_score = (pl2_rating - 50) / 50) %>% # Normalize scores
    group_by(ID) %>%
    summarise(understanding_score = mean(understanding_score))
  
  df_pl2
}


extract_msg <- function(df_raw) {
  # Extract participants' written advice from the dataset.
  # This function identifies and extracts non-empty text inputs from the specified column.
  #
  # Args:
  #   df_raw: (tibble) The raw dataset containing participants' responses.
  #
  # Returns:
  #   A tibble (df_msg) with participant IDs and their advice texts.
  
  df_msg <- df_raw %>%
    dplyr::select(vb_textbox.text, PROLIFIC_PID) %>%
    filter(str_detect(vb_textbox.text, "[a-zA-Z]")) %>%
    rename(
      "ID" = "PROLIFIC_PID",
      "ADVICE" = vb_textbox.text
    )
  
  df_msg
}


count_missed_trial <- function(df_raw) {
  # Count the number of trials missed by each participant.
  # This function computes the number of missed trials for participants
  # based on the total number of expected trials (256) and the sum of completed trials.
  #
  # Args:
  #   df_raw: (tibble) The raw dataset containing trial information for participants.
  #
  # Returns:
  #   A tibble (df_missed_trial) with participant IDs and their number of missed trials.
  
  df_missed_trial <- df_raw %>%
    group_by(PROLIFIC_PID) %>%
    summarise(n_miss = 256 - sum(t_reward_flag, na.rm = TRUE)) %>%
    select(
      PROLIFIC_PID,
      n_miss
    ) %>%
    rename("ID" = "PROLIFIC_PID")
  
  df_missed_trial
}


extract_parent_ID <- function(df_raw, generation) {
  # Extract the parent ID for participants, or create fake IDs for generation 1.
  # This function assigns a parent ID to each participant. For the first generation,
  # fake parent IDs are generated because no real parent data exists.
  #
  # Args:
  #   df_raw: (tibble) The raw dataset containing participant data.
  #   generation: (num) The current generation index (e.g., 1 for the first generation).
  #
  # Returns:
  #   A tibble (df) containing participant IDs and their corresponding parent IDs.
  
  if (generation == 1) {
    # Generate fake parent IDs for the first generation
    df <- data.frame(
      gen = rep("None", length(unique(df_raw$PROLIFIC_PID))),
      "ID" = unique(df_raw$PROLIFIC_PID),
      "parent_ID" = paste("fake", 1:length(unique(df_raw$PROLIFIC_PID)))
    )
  } else {
    # Extract parent IDs from the raw data for subsequent generations
    df <- df_raw %>%
      select(parent_PID, PROLIFIC_PID) %>%
      filter(parent_PID != "") %>%
      rename(
        "ID" = "PROLIFIC_PID",
        "parent_ID" = "parent_PID"
      )
  }
  
  df
}


extract_parent <- function(df, df_raw, generation) {
  # Extract or generate parent information based on generation data.
  # For the first generation, fake parent information is created. For subsequent generations,
  # the function retrieves relevant parent details from the input data frame.
  #
  # Args:
  #   df: (tibble) The existing processed data containing past generations.
  #   df_raw: (tibble) The raw dataset for the current generation.
  #   generation: (num) The current generation index.
  #
  # Returns:
  #   A tibble (df_parent) containing parent-related information.
  
  
  if (generation == 1) {
    # Create fake parent information for the first generation
    df_parent <- data.frame(
      "parent_ID" = paste("fake", 1:length(unique(df_raw$PROLIFIC_PID))),
      "parent_understanding_score" = rep(0, length(unique(df_raw$PROLIFIC_PID))),
      "parent_pl1_understanding" = rep(0, length(unique(df_raw$PROLIFIC_PID))),
      "parent_pl2_understanding" = rep(0, length(unique(df_raw$PROLIFIC_PID))),
      "parent_score_corrected" = rep(0, length(unique(df_raw$PROLIFIC_PID))),
      "parent_rank" = rep(0, length(unique(df_raw$PROLIFIC_PID))),
      "parent_filename" = rep("None", length(unique(df_raw$PROLIFIC_PID))),
      "parent_ADVICE" = rep("None", length(unique(df_raw$PROLIFIC_PID))),
      "parent_gen" = rep(0, length(unique(df_raw$PROLIFIC_PID)))
    )
  }
  else {
    # Extract parent information from the existing dataset for other generations
    df_parent <- df %>%
      filter(gen == generation - 1) %>%
      select(-starts_with("parent_")) %>%
      rename_all(~ paste0("parent_", .))
  }
  
  df_parent
}


process_generation <- function(df, df_raw, generation_index) {
  # Process data for a specific generation by combining parent and child information.
  # This function links parent information to participants in the current generation,
  # allowing for hierarchical data processing across multiple generations.
  #
  # Args:
  #   df: (tibble) The existing processed data containing information for all generations.
  #   df_raw: (tibble) The raw dataset for the current generation.
  #   generation_index: (num) The current generation index.
  #
  # Returns:
  #   A tibble (df_result) with updated data, including parent and child relationships.
  
  # Extract parent information
  df_parent <- extract_parent(df, df_raw, generation_index)
  
  # Process child data for the current generation
  df_child <- df %>%
    filter(gen == generation_index) %>%
    select_if(~ !any(is.na(.))) %>%
    left_join(df_parent, by = "parent_ID")
  
  df_result <- bind_rows(
    df %>% filter(gen < generation_index),
    df_child
  )
  
  df_result
}



summarise_pl_score <- function(df_pl1, df_pl2) {
  # Combine and summarize understanding scores from PL1 and PL2 tasks.
  # This function merges understanding scores from two tasks and computes
  # a combined average score for each participant.
  #
  # Args:
  #   df_pl1: (tibble) Understanding scores from PL1 (Pair Task).
  #   df_pl2: (tibble) Understanding scores from PL2 (Transition Task).
  #
  # Returns:
  #   A tibble (df_pl_smry) with combined and individual scores for each participant.
  
  
  df_pl_smry <- bind_rows(df_pl1, df_pl2) %>%
    group_by(ID) %>%
    summarise(understanding_score = mean(understanding_score)) %>%
    mutate(pl1_understanding = df_pl1$understanding_score) %>%
    mutate(pl2_understanding = df_pl2$understanding_score)
  
  df_pl_smry
}