# -*- coding: utf-8 -*-
"""
Created on Fri Nov 29

@author: aleblu
"""

import pandas as pd
import numpy as np

class Agent:
    def __init__(self, id: int, env: list, reward_dist, score: int = 0):
        self.id = id
        self.score = score
        self.env = env
        self.reward_dist = reward_dist

    def __repr__(self):
        return f"Agent(id={self.id}, score={self.score}, env={self.env})"

class Gnome:
    def __init__(self, color: str, pair: int, forest: int, knowledge: int = 0):
        self.color = color
        self.pair = pair
        self.forest = forest
        self.knowledge = knowledge
    
    def __repr__(self):
        return f"Gnome(color={self.color}, pair={self.pair}, forest={self.forest}, knowledge={self.knowledge})"
    
    def update_knowledge(self, new_value: int):
        """Update the knowledge value"""
        self.knowledge += new_value