# -*- coding: utf-8 -*-
"""
Created on Fri Nov 29

@author: aleblu
"""

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
        self.knowledge = new_value