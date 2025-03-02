
import pandas as pd
import numpy as np
import os
import json
import re
import sys
import csv
import matplotlib.pyplot as plt
import seaborn as sns


business_df = pd.read_csv("/Users/vishnuarun/Documents/nomadly_capstone/NomadLy/Data/yelp_academic_dataset_business.csv")

print(business_df.head())
print(business_df.isnull().sum().sum())


business_df = business_df.dropna(subset=["categories"])

print(business_df.isnull().sum().sum())


unique_states = list(business_df["state"].unique())

state_map = dict()

for s in unique_states:
    state_map[s] = business_df[business_df.state == s].shape[0]


top_10_states = [
    state[0] for state in sorted(state_map.items(), key=lambda x: x[1], reverse=True)
][:10]


print(list(business_df.categories.unique()))

#creating mask for hotels and travel

hotel_mask = business_df["categories"].str.contains("Hotels & Travel")
hotel_df = business_df[hotel_mask]

# Creating mask for Restaurents

restaurent_mask = business_df["categories"].str.contains("Restaurants")
restaurent_df = business_df[restaurent_mask]

# creating mask for nightlife

nightlife_mask = business_df["categories"].str.contains("Nightlife")
nightlife_df = business_df[nightlife_mask]


entertainment_mask = business_df["categories"].str.contains("Arts & Entertainment")
entertainment_df = business_df[entertainment_mask]


hotel_state_df_map = {}
restaurent_state_df_map = {}
nightlife_state_df_map = {}
entertainment_state_df_map = {}

for state in top_10_states:
    df_name = f"business_df_{state}"

    hotel_state_df = hotel_df[hotel_df["state"] == state]
    restaurent_state_df = restaurent_df[restaurent_df["state"] == state]
    nightlife_state_df = nightlife_df[nightlife_df["state"] == state]
    entertainment_state_df = entertainment_df[entertainment_df["state"] == state]

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


print(entertainment_state_df_map)


#plot 1
plt.figure(figsize=(12, 6))
sns.boxplot(data=[
    hotel_df['stars'],
    restaurent_df['stars'],
    nightlife_df['stars'],
    entertainment_df['stars']
])
plt.xticks([0, 1, 2, 3], ['Hotels', 'Restaurants', 'Nightlife', 'Entertainment'])
plt.title('Rating Distribution Across Business Categories')
plt.ylabel('Rating (stars)')
plt.savefig('ratings_distribution.png')
plt.show()


#plot 2
# Create a comparison dataframe
category_counts = pd.DataFrame({
    'Hotels': [len(hotel_state_df_map[state]) for state in top_10_states],
    'Restaurants': [len(restaurent_state_df_map[state]) for state in top_10_states],
    'Nightlife': [len(nightlife_state_df_map[state]) for state in top_10_states],
    'Entertainment': [len(entertainment_state_df_map[state]) for state in top_10_states]
}, index=top_10_states)

plt.figure(figsize=(15, 8))
category_counts.plot(kind='bar', width=0.8)
plt.title('Distribution of Business Categories Across Top 10 States')
plt.xlabel('States')
plt.ylabel('Number of Businesses')
plt.legend(title='Category')
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig('business_distribution.png')
plt.show()

#plot4
plt.figure(figsize=(12, 6))
price_data = pd.DataFrame({
    'Category': ['Hotels'] * len(hotel_df) + ['Restaurants'] * len(restaurent_df) +
                ['Nightlife'] * len(nightlife_df) + ['Entertainment'] * len(entertainment_df),
    'Price Range': list(hotel_df['attributes.RestaurantsPriceRange2']) + 
                  list(restaurent_df['attributes.RestaurantsPriceRange2']) +
                  list(nightlife_df['attributes.RestaurantsPriceRange2']) +
                  list(entertainment_df['attributes.RestaurantsPriceRange2'])
})

sns.countplot(data=price_data.dropna(), x='Category', hue='Price Range')
plt.title('Price Range Distribution Across Categories')
plt.xlabel('Business Category')
plt.ylabel('Count')
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig('price_distribution.png')
plt.show()

#plot5
plt.figure(figsize=(15, 8))
for idx, (name, df) in enumerate([
    ('Hotels', hotel_df),
    ('Restaurants', restaurent_df),
    ('Nightlife', nightlife_df),
    ('Entertainment', entertainment_df)
]):
    plt.subplot(2, 2, idx+1)
    sns.scatterplot(data=df, x='review_count', y='stars', alpha=0.5)
    plt.title(f'{name}: Reviews vs Ratings')
    plt.xlabel('Number of Reviews')
    plt.ylabel('Rating (stars)')
    
plt.tight_layout()
plt.show()
