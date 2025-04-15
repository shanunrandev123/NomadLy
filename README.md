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





