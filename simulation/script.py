# -*- coding: utf-8 -*-
"""
Created on Tue Nov 26 18:35:01 2024

@author: aleblu
"""

import functions, random
import numpy as np
import pandas as pd
from objects import Gnome, Agent

n_trials = 5
rmin = 0
rmax = 9
p_mutation_knowledge = 0.01
possible_pairs = [1, 2, 3, 4]
possible_forests = [0, 1]
gnome_colors = ["green", "blue", "red", "yellow", "purple", "pink", "orange", "brown"]
gnome_pairs = possible_pairs * 2
gnome_forests = [x for x in possible_forests for _ in range(4)] #rep every elements of possible_forests
run_pairs = possible_pairs * 64
random.shuffle(run_pairs)

reward_distribution = functions.create_reward_distribution(n_trials, rmin, rmax)
l_gnomes = functions.create_gnomes(gnome_colors, gnome_pairs, gnome_forests)
jack = Agent(id = 1, env = l_gnomes, reward_dist = reward_distribution)

for trial in range(n_trials):
    trial_pair = run_pairs[trial]
