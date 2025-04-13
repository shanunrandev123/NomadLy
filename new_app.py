# from flask import Flask, render_template, request
# import json
# import bz2
# import pickle
# from AE_CF import *
#
# app = Flask(__name__)
#
# # 10-state hotel AECF map
# hotel_aecf_map = {}
#
# restaurent_aecf_map = {}
#
# nightlife_aecf_map = {}
#
# hotel_state_rec_map = {}
#
# restaurent_state_rec_map = {}
#
# nightlife_state_rec_map = {}
#
#
# # Load your AECF models here
# state_list = ['LA', 'MO', 'PA', 'TN', 'NV', 'IN', 'AB', 'AZ', 'FL', 'NJ']
#
# def decompress_pickle(file):
#     data = bz2.BZ2File(file, 'rb')
#     return pickle.load(data)
#
#
#
# for state in state_list:
#     path = f"Data/hotel/{state}_Hotel_Recommendation.pbz2"
#     hotel_state_rec_map[state] = decompress_pickle(path)
#
#
#
# for state in state_list:
#     path = f"Data/restaurant/{state}_Restaurent_Recommendation.pbz2"
#     restaurent_state_rec_map[state] = decompress_pickle(path)
#
#
# for state in state_list:
#     path = f"Data/nightlife/{state}_Nightlife_Recommendation.pbz2"
#     restaurent_state_rec_map[state] = decompress_pickle(path)
#
# # Load all models into memory
# for state in state_list:
#     path = f"Data/hotel/{state}_Hotel_AECF.pbz2"
#     hotel_aecf_map[state] = decompress_pickle(path)
#
#
# for state in state_list:
#     path = f"Data/restaurant/{state}_Restaurent_AECF.pbz2"
#     hotel_aecf_map[state] = decompress_pickle(path)
#
# for state in state_list:
#     path = f"Data/nightlife/{state}_Nightlife_AECF.pbz2"
#     hotel_aecf_map[state] = decompress_pickle(path)
#
# @app.route('/', methods=['GET', 'POST'])
# def index():
#     business_list = []
#     selected_state = None
#     selected_user = None
#
#     if request.method == 'POST':
#         selected_state = request.form.get('state')
#         selected_user = int(request.form.get('user_id'))
#
#         aecf_model = hotel_aecf_map[selected_state]
#         recommendations_class = hotel_state_rec_map[selected_state]
#
#         # recommendations_class = aecf_model.recommendations
#
#         business_ids = aecf_model.get_user_recommendation(selected_user)
#
#         for i in range(min(12, len(business_ids))):
#             business_hash = recommendations_class.getBusinessHashFromBusinessNum(business_ids[i])
#             business = recommendations_class.getBusinessInfo(business_hash)
#             business_list.append(business)
#
#     return render_template(
#         'index.html',
#         states=state_list,
#         user_ids=list(range(1, 6)),
#         recommendations=business_list,
#         selected_state=selected_state,
#         selected_user=selected_user
#     )
#
# if __name__ == '__main__':
#     app.run(debug=True)







from flask import Flask, render_template, request
import json
import bz2
import pickle
from AE_CF import *


app = Flask(__name__)

# AECF model maps
hotel_aecf_map = {}
restaurant_aecf_map = {}
nightlife_aecf_map = {}

# Recommendation class maps
hotel_rec_map = {}
restaurant_rec_map = {}
nightlife_rec_map = {}

# List of states
state_list = ['LA', 'MO', 'PA', 'TN', 'NV', 'IN', 'AB', 'AZ', 'FL', 'NJ']

# Supported categories
categories = ['hotel', 'restaurant', 'nightlife']

# Helper to decompress pickle
def decompress_pickle(file):
    data = bz2.BZ2File(file, 'rb')
    return pickle.load(data)

# Load Hotel Recommendations & AECF
for state in state_list:
    hotel_rec_map[state] = decompress_pickle(f"Data/hotel/{state}_Hotel_Recommendation.pbz2")
    hotel_aecf_map[state] = decompress_pickle(f"Data/hotel/{state}_Hotel_AECF.pbz2")

# Load Restaurant Recommendations & AECF
for state in state_list:
    restaurant_rec_map[state] = decompress_pickle(f"Data/restaurant/{state}_Restaurent_Recommendation.pbz2")
    restaurant_aecf_map[state] = decompress_pickle(f"Data/restaurant/{state}_Restaurent_AECF.pbz2")

# Load Nightlife Recommendations & AECF
for state in state_list:
    nightlife_rec_map[state] = decompress_pickle(f"Data/nightlife/{state}_Nightlife_Recommendation.pbz2")
    nightlife_aecf_map[state] = decompress_pickle(f"Data/nightlife/{state}_Nightlife_AECF.pbz2")

@app.route('/', methods=['GET', 'POST'])
def index():
    business_list = []
    selected_state = None
    selected_user = None
    selected_category = 'hotel'

    if request.method == 'POST':
        selected_state = request.form.get('state')
        selected_user = int(request.form.get('user_id'))
        selected_category = request.form.get('category')

        # Select model & recommendation class based on category
        if selected_category == 'hotel':
            aecf_model = hotel_aecf_map[selected_state]
            rec_class = hotel_rec_map[selected_state]
        elif selected_category == 'restaurant':
            aecf_model = restaurant_aecf_map[selected_state]
            rec_class = restaurant_rec_map[selected_state]
        elif selected_category == 'nightlife':
            aecf_model = nightlife_aecf_map[selected_state]
            rec_class = nightlife_rec_map[selected_state]
        else:
            return "Invalid category selected", 400

        # Get business recommendations
        business_ids = aecf_model.get_user_recommendation(selected_user)
        for i in range(min(12, len(business_ids))):
            business_hash = rec_class.getBusinessHashFromBusinessNum(business_ids[i])
            business = rec_class.getBusinessInfo(business_hash)
            business_list.append(business)

    return render_template(
        'index.html',
        states=state_list,
        user_ids=list(range(1, 11)),
        categories=categories,
        recommendations=business_list,
        selected_state=selected_state,
        selected_user=selected_user,
        selected_category=selected_category
    )

if __name__ == '__main__':
    app.run(debug=True)

