import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from matplotlib.colors import LinearSegmentedColormap

# Set style for professional plots
plt.style.use("seaborn-v0_8-whitegrid")
sns.set_context("talk")
custom_palette = sns.color_palette("viridis", 10)
sns.set_palette(custom_palette)

# Load datasets - adjust paths as needed
business_df = pd.read_csv(
    "/Users/vishnuarun/Documents/nomadly_capstone/NomadLy/Data/yelp_academic_dataset_business.csv"
)
review_df = pd.read_csv(
    "/Users/vishnuarun/Documents/nomadly_capstone/NomadLy/Data/yelp_academic_dataset_review.csv"
)

# Clean data - filtering for travel-related categories and handling nulls
business_df = business_df.dropna(subset=["categories"])
hotel_mask = business_df["categories"].str.contains("Hotels & Travel", na=False)
restaurant_mask = business_df["categories"].str.contains("Restaurants", na=False)
nightlife_mask = business_df["categories"].str.contains("Nightlife", na=False)
entertainment_mask = business_df["categories"].str.contains(
    "Arts & Entertainment", na=False
)

# Create category dataframes
hotel_df = business_df[hotel_mask]
restaurant_df = business_df[restaurant_mask]
nightlife_df = business_df[nightlife_mask]
entertainment_df = business_df[entertainment_mask]

# Plot 1: Rating Distribution by Category with Violin Plot
plt.figure(figsize=(12, 7))
categories = ["Hotels & Travel", "Restaurants", "Nightlife", "Arts & Entertainment"]
dfs = [hotel_df, restaurant_df, nightlife_df, entertainment_df]

data_to_plot = []
for df in dfs:
    data_to_plot.append(df["stars"].values)

violin_parts = plt.violinplot(data_to_plot, showmeans=False, showmedians=True)
for pc in violin_parts["bodies"]:
    pc.set_facecolor("#3274A1")
    pc.set_edgecolor("black")
    pc.set_alpha(0.7)

# Add boxplot within the violin
positions = range(1, len(categories) + 1)
box_parts = plt.boxplot(
    data_to_plot, positions=positions, widths=0.15, patch_artist=True, showfliers=False
)
for patch in box_parts["boxes"]:
    patch.set_facecolor("#1A9988")

plt.xticks(positions, categories, rotation=0)
plt.ylabel("Rating (Stars)")
plt.title("Distribution of Ratings Across Travel-Related Business Categories")
plt.grid(axis="y", linestyle="--", alpha=0.7)
plt.tight_layout()
plt.savefig("rating_distribution_violin.png", dpi=300, bbox_inches="tight")
plt.show()

# Plot 2: Bar chart of business categories by state
# Get top 10 states
state_counts = business_df["state"].value_counts().head(10)
top_10_states = state_counts.index.tolist()

# Create grouped data
state_category_data = pd.DataFrame()
for state in top_10_states:
    state_df = business_df[business_df["state"] == state]
    hotel_count = sum(state_df["categories"].str.contains("Hotels & Travel", na=False))
    restaurant_count = sum(state_df["categories"].str.contains("Restaurants", na=False))
    nightlife_count = sum(state_df["categories"].str.contains("Nightlife", na=False))
    entertainment_count = sum(
        state_df["categories"].str.contains("Arts & Entertainment", na=False)
    )

    state_category_data = pd.concat(
        [
            state_category_data,
            pd.DataFrame(
                {
                    "State": [state, state, state, state],
                    "Category": [
                        "Hotels & Travel",
                        "Restaurants",
                        "Nightlife",
                        "Arts & Entertainment",
                    ],
                    "Count": [
                        hotel_count,
                        restaurant_count,
                        nightlife_count,
                        entertainment_count,
                    ],
                }
            ),
        ]
    )

# Plot with seaborn
plt.figure(figsize=(14, 8))
bar_plot = sns.barplot(
    x="State", y="Count", hue="Category", data=state_category_data, palette="viridis"
)
plt.title("Distribution of Business Categories Across Top 10 States")
plt.xlabel("State")
plt.ylabel("Number of Businesses")
plt.legend(title="Category")
plt.xticks(rotation=45)
plt.grid(axis="y", linestyle="--", alpha=0.7)
plt.tight_layout()
plt.savefig("state_category_distribution.png", dpi=300, bbox_inches="tight")
plt.show()

# Plot 3: Rating vs. Review Count with Kernel Density Estimation
fig, axs = plt.subplots(2, 2, figsize=(14, 12))
categories = ["Hotels & Travel", "Restaurants", "Nightlife", "Arts & Entertainment"]
dfs = [hotel_df, restaurant_df, nightlife_df, entertainment_df]

for i, (category, df) in enumerate(zip(categories, dfs)):
    row, col = i // 2, i % 2

    # Limit to 99th percentile of review counts to avoid extreme outliers affecting visualization
    review_limit = df["review_count"].quantile(0.99)
    df_plot = df[df["review_count"] <= review_limit]

    # Create joint distribution plot
    sns.kdeplot(
        x=df_plot["review_count"],
        y=df_plot["stars"],
        cmap="viridis",
        fill=True,
        thresh=0.05,
        ax=axs[row, col],
    )

    # Add scatter with transparency
    axs[row, col].scatter(
        df_plot["review_count"],
        df_plot["stars"],
        alpha=0.3,
        s=10,
        c="white",
        edgecolors="gray",
    )

    axs[row, col].set_xlabel("Number of Reviews")
    axs[row, col].set_ylabel("Rating (Stars)")
    axs[row, col].set_title(f"{category}")

fig.suptitle("Relationship Between Ratings and Number of Reviews", fontsize=16)
plt.tight_layout()
fig.subplots_adjust(top=0.92)
plt.savefig("rating_review_relationship_kde.png", dpi=300, bbox_inches="tight")
plt.show()

# Plot 4: Review count distribution across categories
plt.figure(figsize=(12, 8))

# Create violin plots for review counts (log scale for better visualization)
log_review_counts = []
for df in dfs:
    # Add small value to avoid log(0)
    log_counts = np.log10(df["review_count"] + 1)
    log_review_counts.append(log_counts)

violin_parts = plt.violinplot(log_review_counts, showmeans=False, showmedians=True)
for pc in violin_parts["bodies"]:
    pc.set_facecolor("#3274A1")
    pc.set_edgecolor("black")
    pc.set_alpha(0.7)

positions = range(1, len(categories) + 1)
plt.xticks(positions, categories)
plt.ylabel("Log10(Review Count)")
plt.title("Distribution of Review Counts Across Categories (Log Scale)")
plt.grid(axis="y", linestyle="--", alpha=0.7)
plt.tight_layout()
plt.savefig("review_count_distribution.png", dpi=300, bbox_inches="tight")
plt.show()

# Plot 5: Top cities for travel within top states
# First get top states
top_5_states = top_10_states[:5]  # Use top 5 for clarity
city_data = []

for state in top_5_states:
    state_df = business_df[business_df["state"] == state]
    # Focus on travel-related businesses
    travel_df = state_df[
        state_df["categories"].str.contains(
            "Hotels & Travel|Restaurants|Nightlife|Arts & Entertainment", na=False
        )
    ]

    # Get top 5 cities by business count
    top_cities = travel_df["city"].value_counts().head(5)

    for city, count in top_cities.items():
        city_data.append({"State": state, "City": city, "Count": count})

city_df = pd.DataFrame(city_data)

# Plot as horizontal bar chart grouped by state
plt.figure(figsize=(14, 10))
# Sort by count within each state
city_df = city_df.sort_values(["State", "Count"], ascending=[True, False])

# Create color palette mapped to states
state_palette = dict(zip(top_5_states, sns.color_palette("viridis", len(top_5_states))))
colors = [state_palette[state] for state in city_df["State"]]

# Plot horizontal bars
bars = plt.barh(
    city_df["City"] + " (" + city_df["State"] + ")", city_df["Count"], color=colors
)

# Add a colorbar legend
sm = plt.cm.ScalarMappable(
    cmap=plt.cm.viridis, norm=plt.Normalize(vmin=0, vmax=len(top_5_states) - 1)
)
sm.set_array([])
cbar = plt.colorbar(sm)
cbar.set_ticks(np.arange(len(top_5_states)) + 0.5)
cbar.set_ticklabels(top_5_states)
cbar.set_label("State")

plt.xlabel("Number of Businesses")
plt.title("Top Cities for Travel-Related Businesses by State")
plt.grid(axis="x", linestyle="--", alpha=0.7)
plt.tight_layout()
plt.savefig("top_cities_by_state.png", dpi=300, bbox_inches="tight")
plt.show()
