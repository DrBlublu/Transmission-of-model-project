from bertopic import BERTopic
import os
import pandas as pd
from sentence_transformers import SentenceTransformer
from umap import UMAP
from hdbscan import HDBSCAN
from sklearn.feature_extraction.text import CountVectorizer


# Import data
df = pd.read_csv(os.path.join(os.getcwd(), "data", "data_advice_fulltext.csv"))
docs = list(df["text"])

# Embeddings
embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = embedding_model.encode(docs, show_progress_bar=True)

# Dimension reduction
umap_model = UMAP(n_neighbors=15, n_components=5, min_dist=0.0, metric='cosine', random_state=37)

# Clustering
hdbscan_model = HDBSCAN(min_cluster_size=10, metric='euclidean', cluster_selection_method='eom', prediction_data=True)

# Vectorizer
vectorizer_model = CountVectorizer(stop_words="english", min_df=2, ngram_range=(1, 2))

# Training
topic_model = BERTopic(

    # Pipeline models
    embedding_model=embedding_model,
    umap_model=umap_model,
    hdbscan_model=hdbscan_model,
    vectorizer_model=vectorizer_model,

    # Hyperparameters
    top_n_words=10,
    n_gram_range=(1, 2),
    min_topic_size="auto", #use HDBSCAN
    verbose=True,

    # General parameters
    calculate_probabilities=True,
    language="english"
)

topics, probs = topic_model.fit_transform(docs, embeddings)


# Save model
embedding_model = "all-MiniLM-L6-v2"
topic_model.save(os.path.join(os.getcwd(), "results", "BERT_fine_tuning", "First test"), serialization="safetensors", save_ctfidf=True, save_embedding_model=embedding_model)

# Show topics
print(topic_model.get_topic_info())