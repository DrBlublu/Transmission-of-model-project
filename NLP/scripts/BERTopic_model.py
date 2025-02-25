
import os
import pandas as pd
from sentence_transformers import SentenceTransformer
from bertopic.representation import KeyBERTInspired
from bertopic.representation import MaximalMarginalRelevance
from bertopic import BERTopic
from umap import UMAP
from hdbscan import HDBSCAN
from sklearn.feature_extraction.text import CountVectorizer
from bertopic.vectorizers import ClassTfidfTransformer
from evaluation import evaluate_model


# hyperparameters setting
run_name = "BERTopic_model"
param_dic = {
    "embedding_model": "sentence-transformers/all-MiniLM-L6-v2",
    "n_neighbors": 15,
    "n_components": 10,
    "min_dist": 0.0,
    "min_cluster_size": 20,
    "min_df": 3,
    "max_df": 1.0,
    "ngram_range": (1, 3),
    "top_n_words": 5
}


# Dataloading
df = pd.read_csv(os.path.join(os.path.dirname(os.getcwd()), "data", "data_advice_fulltext.csv"))
docs = list(df["text"])
classes = list(df["gen"])
id = list(df["ID"])

# Pre-calculate embeddings
embedding_model = SentenceTransformer(param_dic["embedding_model"], use_auth_token=False)
embeddings = embedding_model.encode(docs, show_progress_bar=True)

# The main representation of a topic
main_representation = KeyBERTInspired()

# Additional ways of representing a topic
aspect_model2 = [KeyBERTInspired(top_n_words=20), MaximalMarginalRelevance(diversity=.5)]

# Add all models together to be run in a single `fit`
representation_model = {
   "KeyBERT": main_representation,
   "MMR":  aspect_model2 
}

data = []
seed = 37

# Setup different models
cluster_model = HDBSCAN(min_cluster_size=param_dic["min_cluster_size"], metric='euclidean', cluster_selection_method='eom', prediction_data=True)
vectorizer_model = CountVectorizer(stop_words="english", min_df=param_dic["min_df"], max_df=param_dic["max_df"], ngram_range=param_dic["ngram_range"])
umap_model = UMAP(n_neighbors=param_dic["n_neighbors"], n_components=param_dic["n_components"], min_dist=param_dic["min_dist"], metric='cosine', random_state=seed)
topic_model = BERTopic(

    # Pipeline models
    embedding_model=embedding_model,
    umap_model=umap_model,
    hdbscan_model=cluster_model,
    vectorizer_model=vectorizer_model,
    representation_model=representation_model,

    # Hyperparameters
    top_n_words=param_dic["top_n_words"],
    n_gram_range=param_dic["ngram_range"],
    min_topic_size="auto", #use HDBSCAN
    verbose=True,

    # General parameters
    calculate_probabilities=True,
    language="english"
)

topics, probs = topic_model.fit_transform(docs, embeddings)

# model evalution
eval_res = evaluate_model(topic_model, docs, topics, embeddings, topk=param_dic["top_n_words"])
data.append([max(topic_model.topics_)] + [i for i in eval_res])
data = pd.DataFrame(data, columns=["nr_topic", "c_v", "c_npmi", "t_D", "silhouette", "similarity"])

# save BERTopic model object
embedding_model = "all-MiniLM-L6-v2"
topic_model.save(os.path.join(os.path.dirname(os.getcwd()), "results", run_name), serialization="safetensors", save_ctfidf=True, save_embedding_model=embedding_model)