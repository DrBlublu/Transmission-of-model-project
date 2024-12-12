# -*- coding: utf-8 -*-
"""
Created on Tue Nov 26 18:45:55 2024

@author: aleblu
"""

from objects import Gnome, Agent
import random
import math
import numpy as np
import pandas as pd


def js_round(value):
    """Round to the nearest integer in the same way as javascript."""
    x = math.floor(value)
    if (value - x) < .5:
        return x
    else:
        return math.ceil(value)

def bound_value(value, rmin=0, rmax=9):
    """Ensure the value stays within the reflecting bounded range."""
    value = min(value, max(rmax * 2 - value, 0))
    value = max(value, min(rmin * 2 - value, 9))
    return value

def random_walk(start_val, mu=0, sigma=2, rmin=0, rmax=9):
    """Perform a random walk based on normal dsitribution and reflect bound the result."""
    random_step = js_round(np.random.normal(mu, sigma))
    new_val = start_val + random_step
    return bound_value(new_val, rmin, rmax)

def create_reward_distribution(n_trials, rmin=0, rmax=9):
    """"Create two reward distributions with gaussian random walk and reflecting boundaries."""
    val_high_start = random.randint(math.ceil((rmax+rmin)/2), rmax)
    val_low_start = random.randint(rmin, math.ceil((rmax+rmin)/2))

    L_val_step2_A = [val_high_start]
    L_val_step2_B = [val_low_start]
    
    for _ in range(n_trials - 1):
        new_val_step2_A = random_walk(L_val_step2_A[-1], rmin, rmax)
        L_val_step2_A.append(new_val_step2_A)
        
        new_val_step2_B = random_walk(L_val_step2_B[-1], rmin, rmax)
        L_val_step2_B.append(new_val_step2_B)
    
    df = pd.DataFrame(
        {"forest_A" : L_val_step2_A,
         "forest_B" : L_val_step2_B}
    )

    return df

def create_gnomes(gnome_colors, gnome_pairs, gnome_forests):
    """Create a list of gnome object based on a list of colors, pairs and forests."""
    random.shuffle(gnome_colors)
    l_gnome = []
    for i in range(len(gnome_colors)):
        gnome = Gnome(color = gnome_colors[i],
                    pair = gnome_pairs[i],
                    forest = gnome_forests[i],
                    knowledge = 0)
        l_gnome.append(gnome)
    return l_gnome

def create_agent(id, env, reward_distribution, score=0):
    """Create an Agent object based on id, list of gnomes (env), reward distribution and score"""
    return Agent(id = id, env = env, reward_dist = reward_distribution, score = score)