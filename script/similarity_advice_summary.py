import os
import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer, util
from multiprocessing import Pool, cpu_count

script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

df = pd.read_csv(os.path.join(os.path.dirname(os.getcwd()), "data", "processed", "data_advice_summary.csv"))
df = df[df["gen"] > 1]
df_filtered = df.dropna(subset=["parent_ADVICE", "ADVICE_summary"])

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

emb_parent = model.encode(df_filtered["parent_ADVICE"].tolist(), convert_to_tensor=True)
emb_summary = model.encode(df_filtered["ADVICE_summary"].tolist(), convert_to_tensor=True)
similarities = util.cos_sim(emb_parent, emb_summary).diagonal()
df_filtered["similarity_score"] = similarities.cpu().numpy()
df["similarity_score"] = pd.NA
df.loc[df_filtered.index, "similarity_score"] = df_filtered["similarity_score"]

df.to_csv("../data/processed/data_advice_summary_similarity.csv", index=False)
