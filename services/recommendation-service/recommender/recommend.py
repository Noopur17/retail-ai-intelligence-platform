import joblib
from pathlib import Path
from math import log1p


MODELS_DIR = Path("models")
DATA_PATH = MODELS_DIR / "data.pkl"
SIMILARITY_PATH = MODELS_DIR / "similarity.pkl"


def get_recommendations(product_id, top_k=5):
    if not DATA_PATH.exists() or not SIMILARITY_PATH.exists():
        return []

    df = joblib.load(DATA_PATH)
    similarity = joblib.load(SIMILARITY_PATH)

    if product_id not in df["product_id"].values:
        return []

    target_idx = df[df["product_id"] == product_id].index[0]
    target_product = df.iloc[target_idx]

    scored_items = []

    for idx, sim_score in enumerate(similarity[target_idx]):
        if idx == target_idx:
            continue

        candidate = df.iloc[idx]

        # hard filter: skip completely unrelated items
        if float(sim_score) <= 0:
            continue

        final_score = float(sim_score)

        # category boost
        if candidate["category"] == target_product["category"]:
            final_score += 0.30

        # sub-category boost
        if candidate["sub_category"] == target_product["sub_category"]:
            final_score += 0.20

        # brand boost
        if candidate["brand"] == target_product["brand"]:
            final_score += 0.15

        # rating boost
        rating = candidate.get("rating", 0)
        if rating:
            final_score += float(rating) * 0.03

        # review count boost
        review_count = candidate.get("review_count", 0)
        if review_count:
            final_score += log1p(float(review_count)) * 0.01

        item = candidate.to_dict()
        item["similarity_score"] = round(float(sim_score), 4)
        item["final_score"] = round(final_score, 4)

        scored_items.append(item)

    scored_items = sorted(scored_items, key=lambda x: x["final_score"], reverse=True)

    return scored_items[:top_k]