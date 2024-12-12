## setup
library(tidyverse)
library(patchwork)
set.seed(37)


## Parameters
n_sim <- 100
pop_size <- 100   # population size
generations <- 20 # number of generations
p_gain <- 0.1     # probability of improving knowledge
sigma_t <- 0.05   # transmission noise sigma
mu_t <- 0         # transmission noise mu


## functions
compute_score <- function(knowledge) {
  # compute score (float) based on knowledge (vector of float)
  scores <- rowMeans(round(knowledge))
  scores
}

bound_knowledge <- function(knowledge) {
  # bound knowledge (list of float) in range [0, 1]
  pmin(pmax(knowledge, 0), 1)
}

improve_knowledge <- function(knowledge, p_gain, pop_size) {
  # randomly improve knowledge (vector of float) by p_gain
  improve <- matrix(runif(pop_size * 8) < p_gain, nrow = pop_size, ncol = 8)
  knowledge[improve] <- knowledge[improve] + runif(sum(improve), 0, 0.1)
  knowledge
}

select_parents <- function(scores, pop_size) {
  # select parent base on scores (vector of float) and pop size (int)
  if (sum(scores) > 0) {
    selection_probs <- scores / max(scores)
  } else {
    selection_probs <- rep(1 / pop_size, pop_size)
  }
  selected_parents <- sample(1:pop_size, pop_size, replace = TRUE, prob = selection_probs)
  selected_parents
}


add_noise <- function(knowledge, pop_size, sigma_t, mu_t){
  # add noise to knowledge vector using random distribution
  knowledge + rnorm(pop_size * 4, mean = mu_t, sd = sigma_t)
}


offspring_inheritance <- function(knowledge, selected_parents, pop_size, sigma_t, mu_t){
  # create offspring knowledge (vector of float) inheriting knowledge from 
  # selected parents (vector of float)
  offspring_knowledge <- knowledge[selected_parents, ]
  offspring_knowledge <- add_noise(offspring_knowledge, pop_size, sigma_t, mu_t)
  offspring_knowledge <- bound_knowledge(offspring_knowledge)
  offspring_knowledge
}

df <- tibble(
  sim = numeric(),
  gen = numeric(),
  mu_t = numeric(),
  score = numeric(),
  know = numeric()
)

# l_p_gain <- seq(0.1, 1, by = 0.1)
l_mu_t <- c(0, -0.01, -0.05, -0.1, -0.15, -0.2)


for (mu_t in l_mu_t) {

  for (sim in 1:n_sim) {
    ## data
    gen_score <- numeric(generations)
    gen_know <- numeric(generations)
    
    
    ## initialization
    knowledge <- matrix(0, nrow = pop_size, ncol = 8)
    
    
    ## simulation
    for (gen in 1:generations) {
      # task
      knowledge <- improve_knowledge(knowledge, p_gain, pop_size)
      knowledge <- bound_knowledge(knowledge)
      scores <- compute_score(knowledge)
      
      # selection
      selected_parents <- select_parents(scores, pop_size)
      
      # offspring knowledge inheritance
      offspring_knowledge <- offspring_inheritance(knowledge, selected_parents, pop_size, sigma_t, mu_t)
      
      # data collection
      gen_score[gen] <- mean(scores)
      gen_know[gen] <- mean(rowMeans((knowledge)))
      
      # update the population knowledge for the next generation
      knowledge <- offspring_knowledge
    }
    
    df <- bind_rows(df, tibble(
      sim = rep(sim, generations),
      gen = 1:generations,
      mu_t = rep(mu_t, generations),
      score = gen_score,
      know = gen_know
    ))
  }
}





# plotting
df_plot <- df %>%
  group_by(mu_t, gen) %>%
  summarise(
    score = mean(score),
    know = mean(know),
    mu_t = mean(mu_t)
  )

plot_score <- df_plot %>%
  ggplot( aes(x = gen, y = score, col = as.factor(mu_t))) +
  geom_line(lwd = 1) +
  scale_x_continuous(
    limits = c(1, generations),
    breaks = c(1, generations/4, generations/2, 3*generations/4, generations),
    expand = c(0, 0)
  ) +
  scale_y_continuous(
    limits = c(0, 1),
    breaks = c(0, 0.25, 0.5, 0.75, 1),
    expand = c(0, 0)
  ) +
  labs(
    x = "generation",
    y = "average score",
    title = "Score growth"
  ) +
  theme_minimal()

plot_knowledge <- df_plot %>%
  ggplot( aes(x = gen, y = know, col = as.factor(mu_t))) +
  geom_line(lwd = 1) +
  scale_x_continuous(
    limits = c(1, generations),
    breaks = c(1, generations/4, generations/2, 3*generations/4, generations),
    expand = c(0, 0)
  ) +
  scale_y_continuous(
    limits = c(0, 1),
    breaks = c(0, 0.25, 0.5, 0.75, 1),
    expand = c(0, 0)
  ) +
  labs(
    x = "generation",
    y = "average knowledge",
    title = "Knowledge growth"
  ) +
  theme_minimal()

combined_plot <- plot_knowledge / plot_score
combined_plot

## plotting
# df_plot <- df %>%
#   group_by(p_gain, gen) %>%
#   summarise(
#     score = mean(score),
#     know = mean(know),
#     p_gain = mean(p_gain)
#   )
# 
# plot_score <- df_plot %>%
#   ggplot( aes(x = gen, y = score, col = as.factor(p_gain))) +
#   geom_line(lwd = 1) +
#   scale_x_continuous(
#     limits = c(1, generations),
#     breaks = c(1, generations/4, generations/2, 3*generations/4, generations),
#     expand = c(0, 0)
#   ) +
#   scale_y_continuous(
#     limits = c(0, 1),
#     breaks = c(0, 0.25, 0.5, 0.75, 1),
#     expand = c(0, 0)
#   ) +
#   labs(
#     x = "generation",
#     y = "average score",
#     title = "Score growth"
#   ) +
#   theme_minimal()
# 
# plot_knowledge <- df_plot %>%
#   ggplot( aes(x = gen, y = know, col = as.factor(p_gain))) +
#   geom_line(lwd = 1) +
#   scale_x_continuous(
#     limits = c(1, generations),
#     breaks = c(1, generations/4, generations/2, 3*generations/4, generations),
#     expand = c(0, 0)
#   ) +
#   scale_y_continuous(
#     limits = c(0, 1),
#     breaks = c(0, 0.25, 0.5, 0.75, 1),
#     expand = c(0, 0)
#   ) +
#   labs(
#     x = "generation",
#     y = "average knowledge",
#     title = "Knowledge growth"
#   ) +
#   theme_minimal()
# 
# combined_plot <- plot_knowledge / plot_score
# combined_plot


# write.csv(df, "data_sweep_mu.csv")
