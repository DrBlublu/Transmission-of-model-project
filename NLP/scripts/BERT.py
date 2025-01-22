from bertopic import BERTopic
import os
import pandas as pd

df = pd.read_csv("../data/data_advice_fulltext.csv")
docs = list(df["text"])

topic_model = BERTopic(language="english", calculate_probabilities=True, verbose=True)
topics, probs = topic_model.fit_transform(docs)

frq = topic_model.get_topic_info()
frq.head(5)

topic_model.visualize_topics()

topic_model.visualize_distribution(probs[1000], min_probability=0.015)

topic_model.visualize_hierarchy(top_n_topics=50)