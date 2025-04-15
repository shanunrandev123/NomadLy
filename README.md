# RECSys

## NomadLy - Travel Recommendation Engine

NomadLy is a travel recommendation engine that harnesses Yelp's rich business and review datasets to help users discover the best travel destinations, restaurants, nightlife spots, and entertainment venues. By processing and filtering business data based on categories and geographic regions, NomadLy aims to provide personalized and insightful recommendations for travelers.



## Recommendation.py

The file implements a recommendation system for businesses using Yelp review data. Its primary goal is to generate non-personalized recommendations based on business popularity derived from user ratings. The code is organized into utility functions for compressed file storage and a class that encapsulates the recommendation logic. The system is applied across different business categories (e.g., hotels, restaurants, nightlife) for various states.

## Key Components

Imports and Utility Functions
Imports:
The code imports various libraries such as pandas, numpy, SciPy’s coo_matrix for building sparse matrices, and Python’s built-in pickle for serialization. It also imports preprocessed data mappings from an external module (EDA) which contains state-level filtered DataFrames for hotels, restaurants, and nightlife.

Compressed Pickle Functions:

compressed_pickle(title, data): Compresses and saves Python objects using the bz2 module along with pickle.

decompress_pickle(file): Loads and decompresses the previously stored file.




## The Recommendations Class
This class is the core component of the recommendation system and includes:

## Inner Business Class
### Purpose:
## 1.Represents a single business entity with attributes:

name
address
city
state
postal_code
stars (rating score)

## 2.Initialization (__init__ method)
Parameters:

business_df: A DataFrame containing business information filtered for a specific state.

state_name: The abbreviation or name of the state (used for logging).

shorten (optional): A boolean flag that, if true, reduces the review dataset to only the top 100 most active users for faster computations.

Process:

It logs the state being processed.

Initializes various dictionaries for mapping user and business IDs (hashes) to numerical indices. These mappings facilitate the creation of a ratings matrix.

Calls two main methods:

calculateRatingMatrix()

nonPersonalizedRecommendations()

## 3. Rating Matrix Calculation (calculateRatingMatrix)
Objective:
Constructs the user-business ratings matrix using review stars.

Steps:

Filter Reviews:
Selects only those reviews whose business_id appears in the provided business_df.

Optional Data Shortening:
If shorten is set to true, the code reduces the review dataset to include reviews only from the top 100 users (determined by the count of reviews).

Mapping IDs:
Creates bidirectional mappings between raw user/business IDs and internal numerical indices.

Matrix Construction:
Utilizes SciPy’s coo_matrix to build a sparse matrix based on the ratings provided by users for the businesses. This sparse matrix is then converted into a dense NumPy array for further processing.

Logging:
Outputs the dimensions of the resulting ratings matrix.

## 4. Non-Personalized Recommendations (nonPersonalizedRecommendations)
Objective:
Compute recommendations based solely on business popularity.

Process:

Popularity Computation:
Business popularity is calculated by summing the stars (ratings) received by each business over all users. This serves as a proxy for overall business performance.

Recommendations Generation:
For each user in the ratings matrix, the method:

Identifies the businesses the user has not rated (i.e., entries with zero in their row).

Sorts these “unvisited” businesses by their overall popularity (in descending order).

Selects up to 50 top recommendations for that user.

Storage:
These recommendations are stored in a NumPy array (self.business_recommendations), where each row corresponds to a user and contains indices of recommended businesses.




## Matrix Factorization.py

## Matrix Factorization for Implicit Feedback

This module implements a matrix factorization model (MF) to generate collaborative recommendations based on implicit feedback from Yelp reviews. It is designed to work on the same business rating matrix that the non-personalized recommendation system uses, but leverages latent factors to capture hidden user–business interactions.

### Key Components

#### 1. **MF_implicit Class**

- **Purpose:**  
  The `MF_implicit` class encapsulates the logic for training a matrix factorization model on a rating matrix. It is particularly geared for implicit feedback situations where the absence of a review (or rating) is treated as missing information.

- **Initialization (`__init__`):**  
  - **Input Parameters:**  
    - `train_mat`: The user-by-business rating matrix (derived from Yelp reviews).
    - `latent`: The number of latent factors used to represent users and businesses (default is 5).
    - `lr`: The learning rate for gradient descent updates.
    - `reg`: The regularization weight to avoid overfitting.
  - **Internal Setup:**  
    - Determines the number of users and businesses from the shape of the rating matrix.
    - Randomly initializes the user latent factor matrix `P` and the business latent factor matrix `Q`.
    - Retrieves the non-zero (i.e., observed) user–business rating pairs to guide training.

- **Negative Sampling (`negative_sampling`):**  
  Because the rating matrix is sparse (with many missing values), the model uses a negative sampling technique. For each observed rating, it randomly selects additional “negative” items (businesses) that the user has not rated, ensuring that training considers both positive and implicit negative interactions.

- **Training (`train`):**  
  The training function iterates through a number of epochs (default set to 20) where:
  - For each epoch, negative sampling is performed to generate a shuffled list of user–business pairs.
  - For each pair, the model computes the prediction error using the dot product of the corresponding latent vectors.
  - The latent factors (in both `P` for users and `Q` for businesses) are updated using gradient descent, incorporating a regularization term to stabilize learning.

- **Prediction (`predict`):**  
  After training, the `predict` method computes the full prediction matrix by multiplying the user and business latent factor matrices (`P` and `Q`). For each user:
  - It filters out businesses already rated (by setting their score to a very low value).
  - It then selects the top *k* (up to 50) recommended businesses based on the highest predicted scores.
  - These recommendations are returned in a NumPy array where each row corresponds to one user.
 






## Autoencoder-based Collaborative Filtering (AECF.py)

This module implements a deep learning approach to collaborative filtering using an autoencoder architecture built with Keras. The goal of this module is to learn latent representations of users from a sparse ratings matrix, so that the system can predict unknown ratings and generate recommendations for businesses based on user–item interactions.

### Overview

- **Input Data:**  
  The model takes as input the user–item (ratings) matrix. This matrix is generally sparse because most users have rated only a few businesses.

- **Train/Test Split:**  
  The ratings matrix is split into training and test sets along the user axis. By default, 80% of the user data is used for training, and the remaining 20% is kept for testing.

- **Model Architecture:**  
  The autoencoder is defined using several fully connected (`Dense`) layers and regularized using `Dropout`. The encoder part transforms the high-dimensional input into a lower-dimensional latent space, while the decoder attempts to reconstruct the original ratings. The final output layer uses a sigmoid activation function to predict ratings on a normalized scale.

- **Learning Rate Scheduling:**  
  A custom learning rate scheduler is used during training. The learning rate decays once the training epochs cross certain thresholds (e.g., after 50 and 100 epochs), which helps in fine-tuning the model.

- **Prediction and Recommendation:**  
  Once trained, the encoder is used to generate user embeddings. Using these embeddings, user–user similarities are computed via the dot product. The predicted ratings for each user are estimated as a weighted sum of the known ratings, where the weights come from user similarity scores.  
  A helper function (`get_user_recommendation`) returns the top-N item indices for a given user based on predicted ratings.

- **Evaluation:**  
  The model calculates the Root Mean Squared Error (RMSE) on the test set to measure prediction accuracy.

### Detailed Code Walkthrough

1. **Class Initialization:**  
   - The `AE_CF` class receives the ratings matrix as input and divides it into training and testing datasets.
   - The constructor (`__init__`) calls the training function and then computes the RMSE for evaluation.

2. **Model Training (`train_cf` Method):**  
   - **Architecture:**  
     An autoencoder model is built:
     - **Input Layer:** Matches the number of items in the ratings matrix.
     - **Encoder:** Three sequential dense layers reduce dimensionality (with dropout for regularization).
     - **Decoder:** Mirrors the encoder with dense layers and dropout, ending with a sigmoid activation to output predicted ratings.
   - **Learning Rate Schedule:**  
     A custom learning rate scheduler adjusts the learning rate based on the current epoch.
   - **Training:**  
     The model is compiled with the Adam optimizer and trained on the training set for 150 epochs using a batch size of 32. Validation is performed on the test set.

3. **Generating Embeddings:**  
   - After training, the encoder model (obtained via extracting the hidden layer) is used to generate latent embeddings for every user.
   - These embeddings are used to calculate:
     - **User Similarity:** Computed as the dot product between user embeddings.
     - **Item Similarity:** Computed from the transposed embeddings (if needed).

4. **Making Predictions:**  
   - The predicted ratings (`self.user_ratings`) are computed by taking the dot product of the user similarity matrix with the original ratings matrix, normalized by the sum of absolute similarity scores per user.
   - The `get_user_recommendation` method retrieves the top 12 predicted items (business indices) for any user.

5. **Helper Function (`calculateAECF`):**  
   - For quick experiments or resource constraints, a helper function slices the ratings matrix to a smaller subset (first 100 users and 500 items) before training the AE_CF model.

6. **Model Saving:**  
   - Although commented out, the code includes lines for using custom compression functions (via `pickle` and `bz2file`) to save the trained models for later use.

### Summary

This AECF module augments the recommendation engine by employing an autoencoder-based collaborative filtering technique. By learning compressed user representations:
- The system can better capture hidden interactions between users and businesses.
- It provides more nuanced and personalized recommendations compared to simpler popularity-based methods.
- The use of deep learning allows the model to adapt to complex patterns in user behavior, thus improving prediction accuracy.

The module is part of the larger NomadLy project, enhancing travel recommendations based on Yelp review data and complementing other recommendation approaches such as traditional matrix factorization.

---







