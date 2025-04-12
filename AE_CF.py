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


# LA_Restaurent_AECF = calculateAECF(LA_Restaurent_Recommendation.ratings_mat)
# NJ_Restaurent_AECF = calculateAECF(NJ_Restaurent_Recommendation.ratings_mat)
# NV_Restaurent_AECF = calculateAECF(NV_Restaurent_Recommendation.ratings_mat)
# AB_Restaurent_AECF = calculateAECF(AB_Restaurent_Recommendation.ratings_mat)
# AZ_Restaurent_AECF = calculateAECF(AZ_Restaurent_Recommendation.ratings_mat)



# LA_Hotel_AECF = calculateAECF(LA_Hotel_Recommendation.ratings_mat)
# NJ_Hotel_AECF = calculateAECF(NJ_Hotel_Recommendation.ratings_mat)
# NV_Hotel_AECF = calculateAECF(NV_Hotel_Recommendation.ratings_mat)
# AB_Hotel_AECF = calculateAECF(AB_Hotel_Recommendation.ratings_mat)
# AZ_Hotel_AECF = calculateAECF(AZ_Hotel_Recommendation.ratings_mat)

# TN_Hotel_AECF = calculateAECF(TN_Hotel_Recommendation.ratings_mat)

#
# LA_Nightlife_AECF = calculateAECF(LA_Nightlife_Recommendation.ratings_mat)
# NJ_Nightlife_AECF = calculateAECF(NJ_Nightlife_Recommendation.ratings_mat)
# NV_Nightlife_AECF = calculateAECF(NV_Nightlife_Recommendation.ratings_mat)
# AB_Nightlife_AECF = calculateAECF(AB_Nightlife_Recommendation.ratings_mat)
# AZ_Nightlife_AECF = calculateAECF(AZ_Nightlife_Recommendation.ratings_mat)

#
# compressed_pickle("/home/ubuntu/capstone/Data/restaurant/LA_Restaurent_AECF", LA_Restaurent_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/restaurant/NJ_Restaurent_AECF", NJ_Restaurent_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/restaurant/NV_Restaurent_AECF", NV_Restaurent_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/restaurant/AB_Restaurent_AECF", AB_Restaurent_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/restaurant/AZ_Restaurent_AECF", AZ_Restaurent_AECF)
#



# compressed_pickle("/home/ubuntu/capstone/Data/hotel/NJ_Hotel_AECF", NJ_Hotel_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/hotel/NJ_Hotel_AECF", NJ_Hotel_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/hotel/NV_Hotel_AECF", NV_Hotel_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/hotel/AB_Hotel_AECF", AB_Hotel_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/hotel/AZ_Hotel_AECF", AZ_Hotel_AECF)

# compressed_pickle("/home/ubuntu/capstone/Data/hotel/NV_Hotel_AECF", NV_Hotel_AECF)




#
# compressed_pickle("/home/ubuntu/capstone/Data/nightlife/PA_Nightlife_AECF", PA_Nightlife_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/nightlife/FL_Nightlife_AECF", FL_Nightlife_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/nightlife/TN_Nightlife_AECF", TN_Nightlife_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/nightlife/IN_Nightlife_AECF", IN_Nightlife_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/nightlife/MO_Nightlife_AECF", MO_Nightlife_AECF)
#
#
#
# compressed_pickle("/home/ubuntu/capstone/Data/nightlife/NV_Nightlife_AECF", NV_Nightlife_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/nightlife/AB_Nightlife_AECF", AB_Nightlife_AECF)
# compressed_pickle("/home/ubuntu/capstone/Data/nightlife/AZ_Nightlife_AECF", AZ_Nightlife_AECF)
