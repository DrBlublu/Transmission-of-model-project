from octis.evaluation_metrics.diversity_metrics import TopicDiversity
import numpy as np
import pandas as pd
from bertopic import BERTopic
import gensim.corpora as corpora
from gensim.models.coherencemodel import CoherenceModel
from sklearn.metrics import silhouette_score
from sklearn.metrics.pairwise import cosine_similarity

def calculate_topic_diversity(topic_words: list[list[str]], topk: int) -> float:
    """
    (from https://github.com/MIND-Lab/OCTIS/issues/61#issuecomment-1135461183)
    Calculate the diversity of topics in a topic model.
    This function computes the topic diversity score for a given list of topics
    by extracting the top words for each topic and then using the TopicDiversity
    function from octis to calculate the diversity score.

    Args:
        topic_words (list[list[str]]): A list of topics, where each topic is a list of words.
        topk (int): The number of top words to consider for each topic when calculating diversity.
    
    Returns:
        t_D (float): The topic diversity score.
    """
    topic_diversity = TopicDiversity(topk=topk)
    t_D = topic_diversity.score({"topics": topic_words})
    return t_D

 
def calculate_coherence(topic_words: list[list[str]], texts: list[str], corpus: list[list[str]], dictionary: str, method: str) -> float:
    """
    (ressource on coherence https://towardsdatascience.com/understanding-topic-coherence-measures-4aa41339634c/)
    Calculate the coherence score for a set of topics.
    This function computes the coherence score using a CoherenceModel from Gensim, 
    which evaluates the quality of topics based on the specified method.

    Args:
        topic_words (list[list[str]]): A list of topics, where each topic is a list of words.
        texts (list[str]): A list of tokenized texts (documents) used to compute coherence.
        corpus (list[list[str]]): The corpus represented as a list of tokenized words.
        dictionary (str): A string representing the dictionary, which is the mapping between words and their integer ids.
        method (str): The method to calculate coherence (e.g., 'c_v', 'u_mass', etc.).

    Returns:
        float: The coherence score of the topics.
    """
    coherence_model = CoherenceModel(topics=topic_words, 
                                     texts=texts, 
                                     corpus=corpus,
                                     dictionary=dictionary, 
                                     coherence=method)
    return coherence_model.get_coherence()

def calculate_silhouette(topic_model: BERTopic, topics: list[int], embeddings: np.ndarray) -> float:
    """
    (from https://github.com/MaartenGr/BERTopic/issues/428)
    Calculate the silhouette score of topic clusters.
    This function computes the silhouette score from a BERTopic model
    using UMAP by extracting the topics & labels.

    Args:
        topic_model (BERTopic): A trained BERTopic model object.
        topics (list[int]): A list of topic assignments for each document.
        embeddings (np.ndarray): The embeddings used to train the topic_model.
    
    Returns:
        (float): The silhouette score.
    """
    umap_embeddings = topic_model.umap_model.transform(embeddings)
    indices = [index for index, topic in enumerate(topics) if topic != -1]
    X = umap_embeddings[np.array(indices)]
    labels = [topic for index, topic in enumerate(topics) if topic != -1]
    return silhouette_score(X, labels)

def calculate_similarity(topic_model: BERTopic, docs: list[str], topics: list[int]) -> float:
    """
    Calculate the similarity score accros topics.
    This computes the similarity scores of documents in the same topics
    and then average this score accross all topics.
    
    Args:
        topic_model (BERTopic): The trained BERTopic model.
        docs (list[str]): A list of documents (strings).
        topics (list[int]): A list of topic assignments for each document.
    
    Returns:
        float: The average similarity score accross each topics
    """
    topic_distr, _ = topic_model.approximate_distribution(docs)
    global_similarity = []
    for topic_n in range(len(topic_distr[0,:])):
        topic_docs = [doc for doc, topic in zip(docs, topics) if topic == topic_n]
        embeddings = topic_model._extract_embeddings(topic_docs)
        similarity_matrix = cosine_similarity(embeddings)
        average_similarity = np.mean(similarity_matrix)
        global_similarity.append(average_similarity)
    return np.mean(global_similarity)

def evaluate_model(topic_model: BERTopic, docs: list[str], topics: list[int], embeddings: np.ndarray, topk: int) -> tuple[float, float, float, float, float]:
    """
    Evaluates the quality of a topic model using various metrics including coherence, diversity, and silhouette score.

    Args:
        topic_model (BERTopic): The trained BERTopic model.
        docs (list[str]): A list of documents (strings).
        topics (list[int]): A list of topic assignments for each document.
        embeddings (np.ndarray): A numpy array of document embeddings.
        topk (int): The number of top words to consider when calculating topic diversity.

    Returns:
        tuple[float, float, float, float, float]: A tuple containing the coherence scores ('c_v' and 'c_npmi'),
                                            the topic diversity score, the silhouette score and the similarity score.
    """
    
    # Preprocess Documents
    documents = pd.DataFrame({"Document": docs,
                            "ID": range(len(docs)),
                            "Topic": topics})
    documents_per_topic = documents.groupby(['Topic'], as_index=False).agg({'Document': ' '.join})
    cleaned_docs = topic_model._preprocess_text(documents_per_topic.Document.values)

    # Extract vectorizer and analyzer from BERTopic
    vectorizer = topic_model.vectorizer_model
    analyzer = vectorizer.build_analyzer()

    # Extract features for Topic Coherence evaluation
    words = vectorizer.get_feature_names_out()
    tokens = [analyzer(doc) for doc in cleaned_docs]
    dictionary = corpora.Dictionary(tokens)
    corpus = [dictionary.doc2bow(token) for token in tokens]
    topic_words = [[words for words, _ in topic_model.get_topic(topic)] 
                for topic in range(len(set(topics)) - 1)]
    
    # Evaluate
    c_v = calculate_coherence(topic_words, tokens, corpus, dictionary, method='c_v')
    c_npmi = calculate_coherence(topic_words, tokens, corpus, dictionary, method='c_npmi')
    t_D = calculate_topic_diversity(topic_words, topk)
    silhouette = calculate_silhouette(topic_model, topics, embeddings)
    similarity = calculate_similarity(topic_model, docs, topics)
    
    return c_v, c_npmi, t_D, silhouette, similarity
