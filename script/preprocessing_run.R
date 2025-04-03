source("script/preprocessing_functions.R")

process_data_by_treatment <- function(treatment, filename) {
  # Choose the appropriate directory dataframe based on treatment
  if (treatment == "ADV") {
    directory_df <- data.frame(
      directory_name = c(
        "2024-05-16_first_gen_stake",
        "2024-05-22_second_gen_stake",
        "2024-05-23_third_gen_stake",
        "2024-05-24_fourth_gen_stake",
        "2024-06-17_fifth_gen_stake",
        "2024-06-18_sixth_gen_stake",
        "2024-06-19_seventh_gen_stake",
        "2024-06-24_height_gen_stake",
        "2024-07-09_ninth_gen_stake",
        "2024-07-11_tenth_gen_stake"
      ),
      generation = c(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    )
  } else if (treatment == "OBS") {
    directory_df <- data.frame(
      directory_name = c(
        "2024-10-01_first_gen_obs",
        "2024-10-18_second_gen_obs",
        "2024-10-19_third_gen_obs",
        "2024-10-21_fourth_gen_obs",
        "2024-11-05_fifth_gen_obs",
        "2024-11-07_sixth_gen_obs",
        "2024-11-11_seventh_gen_obs",
        "2024-11-20_height_gen_obs",
        "2024-11-26_ninth_gen_obs",
        "2024-11-27_tenth_gen_obs"
      ),
      generation = c(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    )
  } else {
    stop("Invalid treatment specified. Please use 'ADV' or 'OBS'.")
  }
  
  df <- tibble()
  
  # Iterate over each row in the directory_df
  for (i in 1:nrow(directory_df)) {
    curr_gen <- directory_df$generation[i]
    filepath <- file.path("data", "raw", "run", directory_df$directory_name[i])
    df_raw <- load_and_concat_files(filepath)
    df_score <- extract_and_correct_score(df_raw, method = "NA")
    df_binary <- extract_binary_score(df_raw)
    df_score <- inner_join(df_score, df_binary, by = "ID")
    df_pl1 <- extract_pl1_score(df_raw)
    df_pl2 <- extract_pl2_score(df_raw)
    df_miss <- count_missed_trial(df_raw)
    df_pl_smry <- summarise_pl_score(df_pl1, df_pl2)
    df_parent_id <- extract_parent_ID(df_raw, curr_gen)
    # Handle the "message" step conditionally based on the treatment
    if (treatment == "ADV") {
      df_msg <- extract_msg(df_raw)
      df_smry <- inner_join(df_pl_smry, df_score, by = "ID") %>%
        inner_join(df_msg, by = "ID") %>%
        inner_join(df_parent_id, by = "ID") %>%
        inner_join(df_miss, by = "ID") %>%
        mutate(gen = curr_gen)
    } else if (treatment == "OBS") {
      df_smry <- inner_join(df_pl_smry, df_score, by = "ID") %>%
        inner_join(df_parent_id, by = "ID") %>%
        inner_join(df_miss, by = "ID") %>%
        mutate(gen = curr_gen)
    } else {
      stop("Invalid treatment specified. Please use 'ADV' or 'OBS'.")
    }
    
    # Append results to the final dataframe
    df <- bind_rows(df, df_smry)
    df <- process_generation(df, df_raw, curr_gen)
  }
  
  # Write the processed data to a CSV file
  write.csv(df, file.path("data", "processed", filename))
}

process_data_by_treatment("ADV", "data_adv.csv")
process_data_by_treatment("OBS", "data_obs.csv")