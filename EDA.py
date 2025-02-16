import pandas as pd
import numpy as np
import os
import json
import re
import sys
import csv



business_df = pd.read_csv(r'Data\yelp_academic_dataset_business.csv')

# print(business_df.head())
# print(business_df.isnull().sum().sum())


business_df = business_df.dropna(subset=['categories'])

# print(business_df.isnull().sum().sum())


unique_states = list(business_df['state'].unique())

state_map = dict()

for s in unique_states:
    state_map[s] = business_df[business_df.state == s].shape[0]
    
    

top_10_states = [state[0] for state in sorted(state_map.items(), key=lambda x : x[1], reverse=True)][:10]


# print(list(business_df.categories.unique()))

#creating mask for hotels and travel

hotel_mask = business_df['categories'].str.contains('Hotels & Travel')
hotel_df = business_df[hotel_mask]

# Creating mask for Restaurents

restaurent_mask = business_df['categories'].str.contains('Restaurants')
restaurent_df = business_df[restaurent_mask]

#creating mask for nightlife

nightlife_mask = business_df['categories'].str.contains('Nightlife')
nightlife_df = business_df[nightlife_mask]



entertainment_mask = business_df['categories'].str.contains('Arts & Entertainment')
entertainment_df = business_df[entertainment_mask]


hotel_state_df_map = {}
restaurent_state_df_map = {}
nightlife_state_df_map = {}
entertainment_state_df_map = {}

for state in top_10_states:
    df_name = f'business_df_{state}'

    hotel_state_df = hotel_df[hotel_df['state'] == state]
    restaurent_state_df = restaurent_df[restaurent_df['state'] == state]
    nightlife_state_df = nightlife_df[nightlife_df['state'] == state]
    entertainment_state_df = entertainment_df[entertainment_df['state'] == state]

    exec(f"{df_name} = hotel_state_df")
    # add the dataframe to the dictionary with the state abbreviation as the key
    hotel_state_df_map[state] = hotel_state_df

    exec(f"{df_name} = restaurent_state_df")
    # add the dataframe to the dictionary with the state abbreviation as the key
    restaurent_state_df_map[state] = restaurent_state_df

    exec(f"{df_name} = nightlife_state_df")
    # add the dataframe to the dictionary with the state abbreviation as the key
    nightlife_state_df_map[state] = nightlife_state_df
    
    exec(f"{df_name} = entertainment_df")
    
    entertainment_state_df_map[state] = entertainment_state_df
    
    
    
# print(entertainment_state_df_map)


    
    
    




