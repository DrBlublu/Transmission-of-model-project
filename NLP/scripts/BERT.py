from bertopic import BERTopic
import os
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer


vectorizer_model = CountVectorizer(stop_words="english", min_df=2, ngram_range=(1, 2))

df = pd.read_csv(os.path.join(os.getcwd(), "data", "data_advice_fulltext.csv"))
docs = list(df["text"])

topic_model = BERTopic(language="english", calculate_probabilities=True, verbose=True, vectorizer_model = vectorizer_model)
topics, probs = topic_model.fit_transform(docs)

frq = topic_model.get_topic_info()
frq.head(5)

topic_model.visualize_topics()

topic_model.visualize_distribution(probs[10], min_probability=0.015)

topic_model.visualize_hierarchy(top_n_topics=50)

