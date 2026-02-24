"""  This script select randomly 10 participants per generation and their advice.
Is is used to run the human rating of advices.
"""

import os
import pandas as pd
import random

df = pd.read_csv(os.path.join(os.path.dirname(os.getcwd()), "data", "processed", "data.csv"))
df = df[df['cond'] == 'ADV']
df = df[['ID', 'gen', 'ADVICE']]
df_sampled = df.groupby('gen').sample(n=10, random_state=42)
i = 5
df_shuffled = df_sampled.sample(frac=1, random_state=i).reset_index(drop=True)
print(os.path.join(os.path.dirname(os.getcwd()), "data", "processed", f"data_human_rating{i}.csv"))
df_shuffled.to_csv(os.path.join(os.path.dirname(os.getcwd()), "data", "processed", f"data_human_rating{i}.csv"), index=False)