import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import joblib
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[1]
DATA_FILE = BASE_DIR / "data" / "products.csv"
MODELS_DIR = BASE_DIR / "models"

MODELS_DIR.mkdir(exist_ok=True)

if not DATA_FILE.exists():
    raise FileNotFoundError(f"Dataset not found at {DATA_FILE}")

df = pd.read_csv(DATA_FILE)

# ✅ Ensure required columns exist
required_columns = [
    "product_name",
    "category",
    "sub_category",
    "brand",
    "tags",
    "description",
    "price",
    "rating",
    "review_count"
]

for col in required_columns:
    if col not in df.columns:
        df[col] = ""

df = df.fillna("")

# ✅ Numeric cleanup
df["price"] = pd.to_numeric(df["price"], errors="coerce").fillna(0.0)
df["rating"] = pd.to_numeric(df["rating"], errors="coerce").fillna(0.0)
df["review_count"] = pd.to_numeric(df["review_count"], errors="coerce").fillna(0)

# ✅ Build text features
df["combined"] = (
    df["product_name"].astype(str) + " " +
    df["category"].astype(str) + " " +
    df["sub_category"].astype(str) + " " +
    df["brand"].astype(str) + " " +
    df["tags"].astype(str) + " " +
    df["description"].astype(str)
)

# ✅ Text similarity
vectorizer = TfidfVectorizer(stop_words="english")
tfidf_matrix = vectorizer.fit_transform(df["combined"])
text_similarity = cosine_similarity(tfidf_matrix)

# ✅ Normalize signals
df["rating_norm"] = df["rating"] / 5.0
max_price = df["price"].max() if df["price"].max() > 0 else 1
df["price_norm"] = 1 - (df["price"] / max_price)

# ✅ Category matrices (SAFE)
category_values = df["category"].astype(str).to_numpy()
sub_category_values = df["sub_category"].astype(str).to_numpy()

category_matrix = (category_values[:, None] == category_values[None, :]).astype(int)
sub_category_matrix = (sub_category_values[:, None] == sub_category_values[None, :]).astype(int)

# ✅ Hybrid scoring
hybrid_similarity = (
    0.55 * text_similarity +
    0.20 * category_matrix +
    0.10 * sub_category_matrix +
    0.10 * np.outer(df["rating_norm"], df["rating_norm"]) +
    0.05 * np.outer(df["price_norm"], df["price_norm"])
)

# ✅ Save
joblib.dump(df, MODELS_DIR / "data.pkl")
joblib.dump(hybrid_similarity, MODELS_DIR / "similarity.pkl")

print("Training complete")
print(f"Saved: {MODELS_DIR / 'data.pkl'}")
print(f"Saved: {MODELS_DIR / 'similarity.pkl'}")
print(f"Products: {len(df)}")