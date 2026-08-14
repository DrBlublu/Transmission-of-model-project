import os
import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer, util
from multiprocessing import Pool, cpu_count

script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

df = pd.read_csv("../../data/processed, data_adv.csv")
model_1 = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
embeddings = model_1.encode(df["ADVICE"].tolist(), convert_to_tensor=True)

def compute_similarity(index_pair):
    i, j = index_pair
    text1_embedding = embeddings[i]
    text2_embedding = embeddings[j]
    cosine_score = util.cos_sim(text1_embedding, text2_embedding)
    return (i, j, cosine_score.item())  # Convert single-valued tensor to float

if __name__ == '__main__':
    n = len(embeddings)
    indices = [(i, j) for i in range(n) for j in range(n)]

    with Pool(cpu_count()) as pool:
        results = pool.map(compute_similarity, indices)

    sim_matrix = np.zeros((n, n))
    for i, j, score in results:
        sim_matrix[i][j] = score

    np.savetxt("../data/processed/similarity_matrix_all-MiniLM-L6-v2.csv", sim_matrix, delimiter=",")
