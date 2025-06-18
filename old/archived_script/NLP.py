import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer, util
from multiprocessing import Pool, cpu_count

model_1 = SentenceTransformer("all-MiniLM-L6-v2")
model_2 = SentenceTransformer("all-mpnet-base-v2")
model_3 = SentenceTransformer("distiluse-base-multilingual-cased-v1")

models = ["all-MiniLM-L6-v2", "all-mpnet-base-v2", "distiluse-base-multilingual-cased-v1"]

df = pd.read_csv("../output/processed/data_advice_fulltext.csv")


embeddings = [model_1.encode(df["text"].tolist()),
              model_2.encode(df["text"].tolist()),
              model_3.encode(df["text"].tolist())]


# sim_matrix = np.zeros((1000, 1000))

# def compute_similarity(index_pair):
#     i, j = index_pair
#     text1_embedding = embeddings[i]
#     text2_embedding = embeddings[j]
#     cosine_scores = util.cos_sim(text1_embedding, text2_embedding)
#     return (i, j, cosine_scores.cpu().numpy())

# if __name__ == '__main__':
#     indices = [(i, j) for i in range(1000) for j in range(1000)]
#     with Pool(cpu_count()) as pool:
#         results = pool.map(compute_similarity, indices)

#     sim_matrix = np.zeros((1000, 1000))
#     for i, j, score in results:
#         sim_matrix[i][j] = score

#     np.savetxt("similarity_matrix.csv", sim_matrix, delimiter=",")
    


# Define the "perfect advice"
perfect_advice = "There are two types of baskets: RED and YELLOW. RED baskets are associated with gnomes of the following colours: RED, PINK, PURPLE, and BROWN, while YELLOW baskets are linked to YELLOW, ORANGE, BLUE, and GREEN gnomes. To maximize your rewards, choose gnomes leading to one basket type until the number of mushrooms drops to 0, 1, or 2, then switch to the other basket. Stick with the new basket until its rewards also decline, then switch back. At times, both baskets may produce low results; in these cases, stay with one basket for a few rounds before switching again. This back-and-forth approach ensures you stay aligned with changes in basket values. Keep an eye on mushroom patterns, as they may shift randomly, requiring you to adapt your strategy throughout the game. Good luck!"
perfect_advice_embedding = [model_1.encode(perfect_advice),
                            model_2.encode(perfect_advice),
                            model_3.encode(perfect_advice)]

similarity = [model_1.similarity(embeddings[0], perfect_advice_embedding[0]),
              model_2.similarity(embeddings[1], perfect_advice_embedding[1]),
              model_3.similarity(embeddings[2], perfect_advice_embedding[2])]


    

results = pd.DataFrame(columns=["ID", "gen", "model", "similarity"])

index = 0

for i in range(len(models)):
    for j in range(len(embeddings[i])):
        results.loc[index] = [df["ID"][j],
                              df["gen"][j],
                              models[i],
                              float(similarity[i][j])]
        index += 1



results.to_csv("../output/processed/similarity_matrix_perfect_advice.csv", index = False)