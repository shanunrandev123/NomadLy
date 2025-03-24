import numpy as np
from keras.layers import Input, Dense, Dropout
from keras.models import Model
from scipy.sparse import csr_matrix
from sklearn.metrics import mean_squared_error
from math import sqrt
from keras.callbacks import LearningRateScheduler
from Recommendation import *
from Matrix_rec import *



class AE_CF:
    def __init__(self, ratings_mat):
        self.ratings_mat_sparse = ratings_mat
        self.train_size = int(0.8 * self.ratings_mat_sparse.shape[0])
        self.train_ratings = self.ratings_mat_sparse[:self.train_size, :]
        self.test_ratings = self.ratings_mat_sparse[self.train_size:, :]
        self.user_ratings = []
        # self.item_ratings = []
        self.train_cf()
        self.rmse = self.calculate_rmse()

    def embeddings_generator(self, hidden_layer, batch_size):
        num_users = self.ratings_mat_sparse.shape[0]
        indices = np.arange(num_users)
        for start_idx in range(0, num_users, batch_size):
            end_idx = min(start_idx + batch_size, num_users)
            batch_indices = indices[start_idx:end_idx]
            batch_ratings = self.ratings_mat_sparse[batch_indices]
            batch_embeddings = hidden_layer.predict(batch_ratings)
            yield batch_embeddings

    def train_cf(self):
        # Build the autoencoder model
        input_layer = Input(shape=(self.ratings_mat_sparse.shape[1],))
        encoded = Dense(64, activation='relu')(input_layer)
        encoded = Dropout(0.2)(encoded)
        encoded = Dense(32, activation='relu')(encoded)
        encoded = Dropout(0.2)(encoded)
        encoded = Dense(16, activation='relu')(encoded)
        decoded = Dense(32, activation='relu')(encoded)
        decoded = Dropout(0.2)(decoded)
        decoded = Dense(64, activation='relu')(decoded)
        decoded = Dropout(0.2)(decoded)
        decoded = Dense(self.ratings_mat_sparse.shape[1], activation='sigmoid')(decoded)
        autoencoder = Model(input_layer, decoded)

        # Define the learning rate schedule
        def lr_schedule(epoch):
            lr = 0.001
            if epoch > 100:
                lr *= 0.1
            elif epoch > 50:
                lr *= 0.5
            return lr

        # Compile the model with the scheduler
        autoencoder.compile(optimizer='adam', loss='binary_crossentropy')
        scheduler = LearningRateScheduler(lr_schedule)
        autoencoder.fit(self.train_ratings, self.train_ratings, epochs=150, batch_size=32, shuffle=True,
                        validation_data=(self.test_ratings, self.test_ratings), callbacks=[scheduler])

        # Extract the hidden layer output for all the users and items
        hidden_layer = Model(input_layer, encoded)
        batch_size = 32
        user_embeddings = np.concatenate(list(self.embeddings_generator(hidden_layer, batch_size)), axis=0)
        # user_embeddings = hidden_layer.predict(self.ratings_mat_sparse)

        # Compute the similarity between users and items
        user_similarity = np.dot(user_embeddings, user_embeddings.T)
        item_similarity = np.dot(user_embeddings.T, user_embeddings)

        # Use the similarity scores to predict the ratings of the items for each user
        self.user_ratings = np.dot(user_similarity, self.ratings_mat_sparse) / np.sum(np.abs(user_similarity), axis=1)[
                                                                               :, np.newaxis]

    def calculate_rmse(self):
        mask = self.test_ratings != 0
        masked_predicted_ratings = self.user_ratings[self.train_size:, :][mask]
        masked_actual_ratings = self.test_ratings[mask]
        rmse = sqrt(mean_squared_error(masked_actual_ratings, masked_predicted_ratings))
        return rmse

    # Get predicted ratings for user
    def get_user_recommendation(self, user_id):
        top_n = 12
        # Get the predicted ratings for the user
        user_predicted_ratings = self.user_ratings[user_id]
        # Get the indices of the items sorted by predicted ratings
        sorted_item_indices = np.argsort(user_predicted_ratings)
        # Get the indices of the top-n items
        top_n_item_indices = sorted_item_indices[-top_n:]
        return top_n_item_indices

def calculateAECF(ratings_mat):
    ratings_mat = ratings_mat[:100,:500]
    return AE_CF(ratings_mat)

#
# FL_Restaurent_AECF = calculateAECF(FL_Restaurent_Recommendation.ratings_mat)
# PA_Restaurent_AECF = calculateAECF(PA_Restaurent_Recommendation.ratings_mat)
# TN_Restaurent_AECF = calculateAECF(TN_Restaurent_Recommendation.ratings_mat)
# IN_Restaurent_AECF = calculateAECF(IN_Restaurent_Recommendation.ratings_mat)
# MO_Restaurent_AECF = calculateAECF(MO_Restaurent_Recommendation.ratings_mat)

#
# PA_Hotel_AECF = calculateAECF(PA_Hotel_Recommendation.ratings_mat)
# FL_Hotel_AECF = calculateAECF(FL_Hotel_Recommendation.ratings_mat)
# # TN_Hotel_AECF = calculateAECF(TN_Hotel_Recommendation.ratings_mat)
# IN_Hotel_AECF = calculateAECF(IN_Hotel_Recommendation.ratings_mat)
# MO_Hotel_AECF = calculateAECF(MO_Hotel_Recommendation.ratings_mat)

#
# PA_Nightlife_AECF = calculateAECF(PA_Nightlife_Recommendation.ratings_mat)
# FL_Nightlife_AECF = calculateAECF(FL_Nightlife_Recommendation.ratings_mat)
TN_Nightlife_AECF = calculateAECF(TN_Nightlife_Recommendation.ratings_mat)
# IN_Nightlife_AECF = calculateAECF(IN_Nightlife_Recommendation.ratings_mat)
# MO_Nightlife_AECF = calculateAECF(MO_Nightlife_Recommendation.ratings_mat)

#
# compressed_pickle("/home/ubuntu/capstone/Data/restaurant/PA_Restaurent_AECF", PA_Restaurent_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/restaurant/FL_Restaurent_AECF", FL_Restaurent_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/restaurant/TN_Restaurent_AECF", TN_Restaurent_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/restaurant/IN_Restaurent_AECF", IN_Restaurent_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/restaurant/MO_Restaurent_AECF", MO_Restaurent_AECF)

#
#
#
# compressed_pickle("/home/ubuntu/capstone/Data/hotel/PA_Hotel_AECF", PA_Hotel_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/hotel/FL_Hotel_AECF", FL_Hotel_AECF)
# # compressed_pickle("/home/ubuntu/capstone/Data/hotel/TN_Hotel_AECF", TN_Hotel_MF)
# compressed_pickle("/home/ubuntu/capstone/Data/hotel/IN_Hotel_AECF", IN_Hotel_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/hotel/MO_Hotel_AECF", MO_Hotel_AECF)

#
#
#
# compressed_pickle("/home/ubuntu/capstone/Data/nightlife/PA_Nightlife_AECF", PA_Nightlife_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/nightlife/FL_Nightlife_AECF", FL_Nightlife_AECF)
compressed_pickle("/home/ubuntu/capstone/Data/nightlife/TN_Nightlife_AECF", TN_Nightlife_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/nightlife/IN_Nightlife_AECF", IN_Nightlife_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/nightlife/MO_Nightlife_AECF", MO_Nightlife_AECF)
#


