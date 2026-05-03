from pathlib import Path

import joblib
from fastapi import APIRouter, HTTPException, Query

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parents[2]
MODELS_DIR = BASE_DIR / "models"
DATA_PATH = MODELS_DIR / "data.pkl"
SIM_PATH = MODELS_DIR / "similarity.pkl"


@router.get("/{product_id}")
def get_recommendations(
    product_id: int,
    top_k: int = Query(5, ge=1, le=20, description="Number of recommendations to return"),
):
    # Validate model files
    if not DATA_PATH.exists() or not SIM_PATH.exists():
        raise HTTPException(
            status_code=500,
            detail="Model files missing. Run training first.",
        )

    # Load data
    df = joblib.load(DATA_PATH)
    similarity = joblib.load(SIM_PATH)

    # Find product
    matches = df[df["product_id"].astype(str) == str(product_id)]
    if matches.empty:
        raise HTTPException(
            status_code=404,
            detail=f"Product ID {product_id} not found",
        )

    idx = matches.index[0]
    source_product = df.iloc[idx].to_dict()

    current_category = source_product.get("category")
    current_sub_category = source_product.get("sub_category")

    scores = list(enumerate(similarity[idx]))

    # Filter + rank
    filtered_scores = [
        (i, score)
        for i, score in scores
        if i != idx and (
            df.iloc[i].get("category") == current_category
            or df.iloc[i].get("sub_category") == current_sub_category
        )
    ]

    filtered_scores = sorted(filtered_scores, key=lambda x: x[1], reverse=True)[:top_k]

    recommendations = []
    for rank, (i, score) in enumerate(filtered_scores, start=1):
        product = df.iloc[i].to_dict()

        recommendations.append({
            "rank": rank,
            "product_id": product.get("product_id"),
            "product_name": product.get("product_name"),
            "brand": product.get("brand"),
            "category": product.get("category"),
            "sub_category": product.get("sub_category"),
            "price": product.get("price"),
            "rating": product.get("rating"),
            "stock_status": product.get("stock_status"),
            "similarity_score": round(float(score), 4)
        })

    return {
        "query": {
            "product_id": product_id,
            "top_k": top_k
        },
        "source_product": {
            "product_id": source_product.get("product_id"),
            "product_name": source_product.get("product_name"),
            "brand": source_product.get("brand"),
            "category": source_product.get("category"),
            "sub_category": source_product.get("sub_category"),
        },
        "recommendation_count": len(recommendations),
        "recommendations": recommendations
    }