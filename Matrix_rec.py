from Recommendation import *
import numpy as np
import Data

from keras.layers import Input, Dense
from keras.models import Model
from scipy.sparse import csr_matrix




PA_Nightlife_Recommendation = decompress_pickle("Data/nightlife/PA_Nightlife_Recommendation.pbz2")
FL_Nightlife_Recommendation = decompress_pickle("Data/nightlife/FL_Nightlife_Recommendation.pbz2")
TN_Nightlife_Recommendation = decompress_pickle("Data/nightlife/TN_Nightlife_Recommendation.pbz2")
IN_Nightlife_Recommendation = decompress_pickle("Data/nightlife/IN_Nightlife_Recommendation.pbz2")
MO_Nightlife_Recommendation = decompress_pickle("Data/nightlife/MO_Nightlife_Recommendation.pbz2")


PA_Hotel_Recommendation = decompress_pickle('Data/hotel/PA_Hotel_Recommendation.pbz2')
FL_Hotel_Recommendation = decompress_pickle('Data/hotel/FL_Hotel_Recommendation.pbz2')
TN_Hotel_Recommendation = decompress_pickle('Data/hotel/TN_Hotel_Recommendation.pbz2')
IN_Hotel_Recommendation = decompress_pickle('Data/hotel/IN_Hotel_Recommendation.pbz2')
MO_Hotel_Recommendation = decompress_pickle('Data/hotel/MO_Hotel_Recommendation.pbz2')


PA_Restaurent_Recommendation = decompress_pickle("Data/restaurant/PA_Restaurent_Recommendation.pbz2")
FL_Restaurent_Recommendation = decompress_pickle("Data/restaurant/FL_Restaurent_Recommendation.pbz2")
TN_Restaurent_Recommendation = decompress_pickle("Data/restaurant/TN_Restaurent_Recommendation.pbz2")
IN_Restaurent_Recommendation = decompress_pickle("Data/restaurant/IN_Restaurent_Recommendation.pbz2")
MO_Restaurent_Recommendation = decompress_pickle("Data/restaurant/MO_Restaurent_Recommendation.pbz2")





class MF_implicit:
    def __init__(self, train_mat, latent=5, lr=0.01, reg=0.01):
        
        # the training rating matrix of size (#user, #movie)
        self.train_mat = train_mat  
        
        # the latent dimension
        
        self.latent = latent
        
        # learning rate  
        self.lr = lr  
        
        # regularization weight, i.e., the lambda in the objective function
        self.reg = reg  
        
        self.num_user, self.num_movie = train_mat.shape
        
        self.sample_user, self.sample_movie = self.train_mat.nonzero()  # get the user-movie paris having ratings in train_mat
        self.num_sample = len(self.sample_user)  # the number of user-movie pairs having ratings in train_mat

        # self.user_test_like = []
        # for u in range(self.num_user):
        #     self.user_test_like.append(np.where(self.test_mat[u, :] > 0)[0])

        self.P = np.random.random((self.num_user, self.latent))  # latent factors for users, size (#user, self.latent), randomly initialized
        self.Q = np.random.random((self.num_movie, self.latent))  # latent factors for users, size (#movie, self.latent), randomly initialized
        
    def negative_sampling(self):
        negative_movie = np.random.choice(np.arange(self.num_movie), size=(len(self.sample_user)), replace=True)
        true_negative = self.train_mat[self.sample_user, negative_movie] == 0
        negative_user = self.sample_user[true_negative]
        negative_movie = negative_movie[true_negative]
        return np.concatenate([self.sample_user, negative_user]), np.concatenate([self.sample_movie, negative_movie])

    def train(self, epoch=20):
        """
        Goal: Write your code to train your matrix factorization model for epoch iterations in this function
        Input: epoch -- the number of training epoch 
        """
        for ep in range(epoch):
            """ 
            Write your code here to implement the training process for one epoch, 
            at the end of each epoch, run self.test() to evaluate current version of MF.
            """
            # print("Epoch:", ep+1)
            s_user, s_movie_i = self.negative_sampling()
            data = np.column_stack((s_user, s_movie_i))
            np.random.shuffle(data)
            for u, i  in zip(data[:, 0], data[:, 1]):
              actual_rating = self.train_mat[u, i]
              pu = self.P[u, :]
              qi = self.Q[i, :]

              predicted_rating = np.dot(pu, qi)
              error = 2*(predicted_rating-actual_rating)

              grad_Pu = error * qi + 2*self.reg * pu
              grad_Qi = error * pu + 2*self.reg * qi

              self.P[u, :] -= self.lr * grad_Pu
              self.Q[i, :] -= self.lr * grad_Qi
            self.predict()

            
    def predict(self):
        """
        Write your code here to implement the prediction function, which generates the ranked lists of movies 
        by the trained MF for every user, store the result (named 'recommendation') in a numpy array of size (#user, 50), where entry (u, k) 
        represents the movie id that is ranked at position k in the recommendation list to user u. Return the 'recommendation' variable. 
        """
        prediction_mat = np.matmul(self.P, self.Q.T)
        recommendation = []
        for u in range(self.num_user):
          scores = prediction_mat[u]
          train_like = np.where(self.train_mat[u, :] > 0)[0]
          scores[train_like] = -9999
          top50_iid = np.argpartition(scores, -50)[-50:]
          top50_iid = top50_iid[np.argsort(scores[top50_iid])[-1::-1]]
          recommendation.append(top50_iid)
        recommendation = np.array(recommendation)
        return recommendation
    
    

def calculateMF(ratings_mat):
    mf_implicit = MF_implicit(ratings_mat, latent=5, lr=0.01, reg=0.0001)
    mf_implicit.train(epoch=20)
    recommendation = mf_implicit.predict()
    return recommendation


PA_Hotel_MF = calculateMF(PA_Hotel_Recommendation.ratings_mat)

compressed_pickle("PA_Hotel_MF", PA_Hotel_MF)

PA_Restaurent_MF = calculateMF(PA_Restaurent_Recommendation.ratings_mat)

compressed_pickle("PA_Restaurent_MF", PA_Restaurent_MF)



FL_Hotel_MF = calculateMF(FL_Hotel_Recommendation.ratings_mat)
compressed_pickle("FL_Hotel_MF", FL_Hotel_MF)
FL_Restaurent_MF = calculateMF(FL_Restaurent_Recommendation.ratings_mat)
compressed_pickle("FL_Restaurent_MF", FL_Restaurent_MF)

TN_Hotel_MF = calculateMF(TN_Hotel_Recommendation.ratings_mat)
compressed_pickle("TN_Hotel_MF", TN_Hotel_MF)
TN_Restaurent_MF = calculateMF(TN_Restaurent_Recommendation.ratings_mat)
compressed_pickle("TN_Restaurent_MF", TN_Restaurent_MF)

IN_Hotel_MF = calculateMF(IN_Hotel_Recommendation.ratings_mat)
compressed_pickle("IN_Hotel_MF", IN_Hotel_MF)
IN_Restaurent_MF = calculateMF(IN_Restaurent_Recommendation.ratings_mat)
compressed_pickle("IN_Restaurent_MF", IN_Restaurent_MF)

MO_Hotel_MF = calculateMF(MO_Hotel_Recommendation.ratings_mat)
compressed_pickle("MO_Hotel_MF", MO_Hotel_MF)
MO_Restaurent_MF = calculateMF(MO_Restaurent_Recommendation.ratings_mat)
compressed_pickle("MO_Restaurent_MF", MO_Restaurent_MF)

