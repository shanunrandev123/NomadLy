from Recommendation import *
import numpy as np

from keras.layers import Input, Dense
from keras.models import Model
from scipy.sparse import csr_matrix

def


# def getNPRForUser(self, user_num):
#     print(f"Non-personalized recommendations for User {user_num}:")
#
#     if user_num >= self.business_recommendations.shape[0]:
#         print(f"Error: User {user_num} index out of range.")
#         return None  # Prevents index errors
#
#     recommendations = []
#
#     for i in range(5):
#         business_num = self.business_recommendations[user_num, i]
#         business_hash = self.getBusinessHashFromBusinessNum(business_num)
#         business = self.getBusinessInfo(business_hash)
#
#         rec_info = {
#             "rank": i + 1,
#             "business_id": business_num,
#             "name": business.name,
#             "state": business.state,
#             "stars": business.stars,
#             "popularity": self.business_popularity[business_num]
#         }
#
#         print(f"Rank {rec_info['rank']}: Name: {rec_info['name']} - State: {rec_info['state']} - Stars: {rec_info['stars']} - Popularity: {rec_info['popularity']}")
#
#         recommendations.append(rec_info)
#
#     return recommendations  # Returns a list of recommendations
#
#
#
#
# FL_Restaurent_Recommendation = decompress_pickle("/home/ubuntu/capstone/Data/restaurant/FL_Restaurent_Recommendation.pbz2")
# PA_Hotel_Recommendation = decompress_pickle('/home/ubuntu/capstone/Data/hotel/PA_Hotel_Recommendation.pbz2')
# MO_Nightlife_Recommendation = decompress_pickle("/home/ubuntu/capstone/Data/nightlife/MO_Nightlife_Recommendation.pbz2")
# # FL_Nightlife_Recommendation = decompress_pickle("/home/ubuntu/capstone/Data/nightlife/FL_Nightlife_Recommendation.pbz2")
# IN_Restaurent_Recommendation = decompress_pickle("/home/ubuntu/capstone/Data/restaurant/IN_Restaurent_Recommendation.pbz2")
#
# # print(FL_Restaurent_Recommendation.ratings_mat[:5, :5])
#
# # print(PA_Hotel_Recommendation.business_popularity)
# # print(MO_Nightlife_Recommendation.business_popularity)
# # print(IN_Restaurent_Recommendation.business_popularity)
#
#
# # List of recommendation objects and their state names
# recommendation_data = {
#     "FL_Restaurant": FL_Restaurent_Recommendation,
#     "PA_Hotel": PA_Hotel_Recommendation,
#     "MO_Nightlife": MO_Nightlife_Recommendation,
#     "IN_Restaurant": IN_Restaurent_Recommendation
# }
#
# # Loop through each state dataset
# for state, rec_obj in recommendation_data.items():
#     print(f"\nRecommendations for {state}:")
#
#     # Check if recommendations exist
#     if rec_obj.business_recommendations is None:
#         print(f"Warning: No recommendations found for {state}")
#         continue
#
#     for i in range(5):  # Get top 5 recommendations
#         try:
#             business_num = rec_obj.business_recommendations[0, i]
#             business_hash = rec_obj.getBusinessHashFromBusinessNum(business_num)
#             business_info = rec_obj.getBusinessInfo(business_hash)
#
#             if business_info is None:
#                 print(f"Warning: Business info is None for hash {business_hash}")
#                 continue
#
#             print(f"Rank {i + 1}: Name: {business_info.name} - State: {business_info.state} - Stars: {business_info.stars} - Popularity: {rec_obj.business_popularity[business_num]}")
#
#         except IndexError:
#             print(f"Warning: Index out of range for {state}, skipping...")
#             break



