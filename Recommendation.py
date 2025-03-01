from scipy.sparse import coo_matrix
import numpy as np
from collections import defaultdict
import pandas as pd
import numpy as np
from EDA import hotel_state_df_map, restaurent_state_df_map, nightlife_state_df_map
import pickle


import bz2file as bz2

def compressed_pickle(title, data):
    with bz2.BZ2File(title + ".pbz2", "w") as f:
        pickle.dump(data, f)

def decompress_pickle(file):
    data = bz2.BZ2File(file, "rb")
    data = pickle.load(data)
    return data



review_df = pd.read_csv(r'C:\Users\Asus\Downloads\yelp_academic_dataset_review.json\yelp_academic_dataset_review.csv')



#This Recommendations class is a 
# recommendation system designed to provide 
# non-personalized recommendations for businesses based on user ratings. 


#Represents a business with attributes like name, address, city, state, postal_code, and stars.


class Recommendations:
    
    class Business:
        def __init__(self, name, address, city, state, postal_code, stars):
            self.name = name
            self.address = address
            self.city = city
            self.state = state
            self.postal_code = postal_code
            self.stars = stars
        
    def __init__(self, business_df, state_name, shorten=False):
        print(f"========Calculating For {state_name} State========")
        self.business_df = business_df
        self.rating_mat = []
        self.shorten = shorten if isinstance(shorten, bool) else False
        self.user_num_to_user_hash_dict = dict()
        self.user_hash_to_user_num_dict = dict()
        self.business_num_to_business_hash_dict = dict()
        self.business_hash_to_business_num_dict = dict()
        self.business_recommendations = []
        self.business_popularity = []
        self.calculateRatingMatrix()
        self.nonPersonalizedRecommendations()
        
    
    def calculateRatingMatrix(self):
        print("Calculating rating matrix...")
        business_list = list(self.business_df['business_id'])
        reviews_df_updated = review_df[review_df['business_id'].isin(business_list)]
        
        if (self.shorten):
            print(f"Size Before Cutting Down: {reviews_df_updated.shape[0]}")
            user_counts = reviews_df_updated.groupby('user_id').size().reset_index(name='count')
            
            # Sort the user_counts dataframe in descending order by count and select the top 100 user_ids
            top_users = user_counts.sort_values(by='count', ascending=False).head(100)['user_id'].tolist()
            
            # Filter the original dataframe to keep only the records that belong to the top 100 user_ids
            reviews_df_updated = reviews_df_updated[reviews_df_updated['user_id'].isin(top_users)]
            
        unique_business_id = reviews_df_updated['business_id'].unique()
        unique_user_id = reviews_df_updated['user_id'].unique()
        
        
        j = 0
        for u in unique_user_id:
            self.user_hash_to_user_num_dict[u] = j
            self.user_num_to_user_hash_dict[j] = u
            j += 1

        j = 0
        for i in unique_business_id:
            self.business_hash_to_business_num_dict[i] = j
            self.business_num_to_business_hash_dict[j] = i
            j += 1
            
            
        user_list = reviews_df_updated['user_id'].values
        movie_list = reviews_df_updated['business_id'].values
        for j in range(len(reviews_df_updated)):
            user_list[j] = self.user_hash_to_user_num_dict[user_list[j]]
            movie_list[j] = self.business_hash_to_business_num_dict[movie_list[j]]
        reviews_df_updated['user_id'] = user_list
        reviews_df_updated['business_id'] = movie_list

        num_user = len(reviews_df_updated['user_id'].unique())
        num_movie = len(reviews_df_updated['business_id'].unique())

        self.ratings_mat = coo_matrix((reviews_df_updated['stars'].values, (reviews_df_updated['user_id'].values, reviews_df_updated['business_id'].values)), shape=(num_user, num_movie)).astype(float).toarray()
        print(f"Size of Ratings Matrix: {self.ratings_mat.shape[0]}, {self.ratings_mat.shape[1]}")
    
    
    
    def nonPersonalizedRecommendations(self):
        print("Calculating NPR...")
        n = len(self.ratings_mat) # number of users
        m = len(self.ratings_mat[0]) # number of movies

        # Creating popularity array - size number of movies
        self.business_popularity = np.zeros((m,))
        self.business_popularity = self.ratings_mat.sum(axis=0) # claculating the popularity of each movie by summing the values in each column

        self.business_recommendations = np.zeros((n, 50), dtype=np.int32)

        for u in range(self.ratings_mat.shape[0]):
            business_unvisited = np.where(self.ratings_mat[u] == 0)[0]
            unwatched_popularity = self.business_popularity[business_unvisited]
        # Sort the unwatched movies according to popularity and fetch top 50 to recommend
            self.business_recommendations[u] = business_unvisited[np.argsort(unwatched_popularity)[::-1]][:50]
            

    
    def getNPRForUser(self, user_num):
        print(f"Non personalized recommendations for User {user_num}:")
        for i in range(5):
            business_hash = self.getBusinessHashFromBusinessNum(self.business_recommendations[0,i])
            business = self.getBusinessInfo(business_hash)
            print(f"Rank {i+1}: Business {self.business_recommendations[0,i]} - Name: {business.name} - state: {business.state} - stars: {business.stars}  - Popularity {self.business_popularity[self.business_recommendations[0,i]]}")


    def getUserHashFromUserNum(self, user_num):
        return self.user_num_to_user_hash_dict[user_num]

    def getUserNumFromUserHash(self, user_hash):
        return self.user_hash_to_user_num_dict[user_hash]

    def getBusinessHashFromBusinessNum(self, business_num):
        return self.business_num_to_business_hash_dict[business_num]

    def getBusinessNumFromBusinessHash(self, business_hash):
        return self.business_hash_to_business_num_dict[business_hash]

    def getBusinessInfo(self, business_hash):
        bus_df = self.business_df[self.business_df['business_id'] == business_hash].iloc[0]
        return self.Business(bus_df['name'], bus_df['address'], bus_df['city'], bus_df['state'], bus_df['postal_code'], bus_df['stars'])
    
    
    
PA_Hotel_Recommendation = Recommendations(hotel_state_df_map['PA'], 'PA')
FL_Hotel_Recommendation = Recommendations(hotel_state_df_map['FL'], 'FL')
TN_Hotel_Recommendation = Recommendations(hotel_state_df_map['TN'], 'TN')
IN_Hotel_Recommendation = Recommendations(hotel_state_df_map['IN'], 'IN')
MO_Hotel_Recommendation = Recommendations(hotel_state_df_map['MO'], 'MO')


PA_Restaurent_Recommendation = Recommendations(restaurent_state_df_map['PA'], 'PA', True)
FL_Restaurent_Recommendation = Recommendations(restaurent_state_df_map['FL'], 'FL', True)
TN_Restaurent_Recommendation = Recommendations(restaurent_state_df_map['TN'], 'TN', True)
IN_Restaurent_Recommendation = Recommendations(restaurent_state_df_map['IN'], 'IN', True)
MO_Restaurent_Recommendation = Recommendations(restaurent_state_df_map['MO'], 'MO', True)


PA_Nightlife_Recommendation = Recommendations(nightlife_state_df_map['PA'], 'PA', True)
FL_Nightlife_Recommendation = Recommendations(nightlife_state_df_map['FL'], 'FL', True)
TN_Nightlife_Recommendation = Recommendations(nightlife_state_df_map['TN'], 'TN', True)
IN_Nightlife_Recommendation = Recommendations(nightlife_state_df_map['IN'], 'IN', True)
MO_Nightlife_Recommendation = Recommendations(nightlife_state_df_map['MO'], 'MO', True)



compressed_pickle("C:/Users/Asus/capstone/Data/nightlife/PA_Nightlife_Recommendation", PA_Nightlife_Recommendation)
compressed_pickle("C:/Users/Asus/capstone/Data/nightlife/FL_Nightlife_Recommendation", FL_Nightlife_Recommendation)
compressed_pickle("C:/Users/Asus/capstone/Data/nightlife/TN_Nightlife_Recommendation", TN_Nightlife_Recommendation)
compressed_pickle("C:/Users/Asus/capstone/Data/nightlife/IN_Nightlife_Recommendation", IN_Nightlife_Recommendation)
compressed_pickle("C:/Users/Asus/capstone/Data/nightlife/MO_Nightlife_Recommendation", MO_Nightlife_Recommendation)







compressed_pickle("C:/Users/Asus/capstone/Data/restaurant/PA_Restaurent_Recommendation", PA_Restaurent_Recommendation)
compressed_pickle("C:/Users/Asus/capstone/Data/restaurant/FL_Restaurent_Recommendation", FL_Restaurent_Recommendation)
compressed_pickle("C:/Users/Asus/capstone/Data/restaurant/TN_Restaurent_Recommendation", TN_Restaurent_Recommendation)
compressed_pickle("C:/Users/Asus/capstone/Data/restaurant/IN_Restaurent_Recommendation", IN_Restaurent_Recommendation)
compressed_pickle("C:/Users/Asus/capstone/Data/restaurant/MO_Restaurent_Recommendation", MO_Restaurent_Recommendation)



compressed_pickle("C:/Users/Asus/capstone/Data/hotel/PA_Hotel_Recommendation", PA_Hotel_Recommendation)
compressed_pickle("C:/Users/Asus/capstone/Data/hotel/FL_Hotel_Recommendation", FL_Hotel_Recommendation)
compressed_pickle("C:/Users/Asus/capstone/Data/hotel/TN_Hotel_Recommendation", TN_Hotel_Recommendation)
compressed_pickle("C:/Users/Asus/capstone/Data/hotel/IN_Hotel_Recommendation", IN_Hotel_Recommendation)
compressed_pickle("C:/Users/Asus/capstone/Data/hotel/MO_Hotel_Recommendation", MO_Hotel_Recommendation)
        



        
        

