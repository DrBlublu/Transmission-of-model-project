# -*- coding: utf-8 -*-
"""
Created on Tue Nov 26 18:35:01 2024

@author: aleblu
"""

import functions, random
from objects import Gnome

n_trials = 256
rmin = 0
rmax = 9
reward_distributions = functions.create_reward_distribution(n_trials, rmin, rmax)

possible_pairs = [1, 2, 3, 4]
possible_forests = [0, 1]

gnome_colors = ["green", "blue", "red", "yellow", "purple", "pink", "orange", "brown"]
gnome_pairs = possible_pairs * 2
gnome_forests = possible_forests * 4
random.shuffle(gnome_colors)
random.shuffle(gnome_pairs)
random.shuffle(gnome_forests)

l_gnome = []

for i in range(len(gnome_colors)):
    gnome = Gnome(color = gnome_colors[i],
                  pair = gnome_pairs[i],
                  forest = gnome_forests[i],
                  knowledge = 0)
    l_gnome.append(gnome)

trials = possible_pairs * 64
random.shuffle(trials)

score = 0
# chosen_gnome = []

p_mutation_knowledge = 0.01

for trial in range(n_trials):
    t_points = 0
    t_pair = trials[trial]
    t_gnomes = [gnome for gnome in l_gnome if gnome.pair == t_pair]
    t_knowledge = sum([gnome.knowledge for gnome in t_gnomes])
    if t_knowledge == 0:
        t_choice = random.choice(possible_forests)
        t_points = reward_distributions[t_choice][trial]
        t_gnome = t_gnomes[t_choice]
        score += t_points
    elif t_knowledge == 1:
        pass
    elif t_knowledge == 2:
        t_points = max(reward_distributions[trials])
    if (random.random() < p_mutation_knowledge):
        t_gnome.update_knowledge(1)

print(sum([gnome.knowledge for gnome in l_gnome]))
print(score)