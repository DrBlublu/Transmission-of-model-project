---
title: "BERTopic parameters"
date: "2025-02-24"
output: html_document
---

## Parameter Settings

Below is a table comparing the base and best parameter settings for BERTopic modeling:

| Parameter         | Base Value | Best Value | Description                                                |
|-------------------|------------|------------|------------------------------------------------------------|
| n_neighbors       | 15         | 15         | number of sample points used for dimensionality reduction  |
| n_components      | 5          | 10         | dimensionality of embeddings after reduction               |
| min_dist          | 0.1        | 0.0        | effective minimum distance between embedded points         |
| min_cluster_size  | 10         | 20         | minimum size of clusters                                   |
| min_df            | 0          | 3          | how frequent a word must be (i.e., n_doc > min_df)         |
| max_df            | 1.0        | 1.0        | how infrequent a word must be (i.e., n_doc < max_df*n_doc) |
| ngram_range       | (1, 2)     | (1, 3)     | ngram range used for tokenization                          |
| top_n_words       | 10         | 5          | number of words per topic to extract                       |

## Additional Notes

- Base Value according to the BERTopic library (https://maartengr.github.io/BERTopic/index.html)
- All other parameters have been optimized from their base values to the best values as shown in the table above.