from octis.evaluation_metrics.diversity_metrics import TopicDiversity
from octis.evaluation_metrics.coherence_metrics import Coherence

def evaluate_model(topic_model, docs: list[str], topk: int) -> tuple[float, float]:
    """
    Evaluates a BERTopic model using Topic Diversity and Coherence metrics from the octis library.

    Args:
        topic_model: A trained BERTopic model.
        docs: A list of documents (strings).
        topk: Number of top words per topic to consider (should be the same as top_n_words of the BERTopic model).

    Returns:
        A tuple containing:
        - Topic Diversity score (float)
        - Coherence score (float)
    """
    # Retrieve topics (top_n_terms) from topic_model
    dictionary = topic_model.get_topics()
    top_n_terms = [[word for word, _ in terms] for terms in dictionary.values()]

    # Prepare model output in OCTIS format
    model_output = {
        "topics": top_n_terms,
        "topic-word-matrix": topic_model.c_tf_idf_,
        "topic-document-matrix": topic_model.approximate_distribution(docs),
    }

    # Tokenize documents
    tokenizer = topic_model.vectorizer_model.build_tokenizer()
    tokens = [tokenizer(doc) for doc in docs]

    # Compute Topic Diversity score
    topic_diversity = TopicDiversity(topk=topk)
    topic_diversity_score = topic_diversity.score(model_output)

    # Compute Coherence score
    coherence = Coherence(texts=tokens, topk=topk, measure="c_npmi")
    coherence_score = coherence.score(model_output)

    return topic_diversity_score, coherence_score