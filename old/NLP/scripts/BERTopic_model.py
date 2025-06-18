from sentence_transformers import SentenceTransformer
from bertopic.representation import KeyBERTInspired
from bertopic.representation import MaximalMarginalRelevance
from bertopic import BERTopic
from umap import UMAP
from hdbscan import HDBSCAN
from sklearn.feature_extraction.text import CountVectorizer
from bertopic.vectorizers import ClassTfidfTransformer



def run_BERTopic_model(param_dic, docs):
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

    # Setup different models
    cluster_model = HDBSCAN(min_cluster_size=param_dic["min_cluster_size"], metric='euclidean', cluster_selection_method='eom', prediction_data=True)
    vectorizer_model = CountVectorizer(stop_words="english", min_df=param_dic["min_df"], max_df=param_dic["max_df"], ngram_range=param_dic["ngram_range"])
    umap_model = UMAP(n_neighbors=param_dic["n_neighbors"], n_components=param_dic["n_components"], min_dist=param_dic["min_dist"], metric='cosine', random_state=param_dic["seed"])
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
    return topic_model
