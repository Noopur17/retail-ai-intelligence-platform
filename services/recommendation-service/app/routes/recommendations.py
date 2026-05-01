from fastapi import APIRouter, HTTPException
import joblib
from pathlib import Path

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parents[2]
MODELS_DIR = BASE_DIR / "models"
DATA_PATH = MODELS_DIR / "data.pkl"
SIM_PATH = MODELS_DIR / "similarity.pkl"


@router.get("/{product_id}")
def get_recommendations(product_id: int, top_k: int = 5):
    if not DATA_PATH.exists() or not SIM_PATH.exists():
        raise HTTPException(status_code=500, detail="Model files missing. Run training first.")

    df = joblib.load(DATA_PATH)
    similarity = joblib.load(SIM_PATH)

    matches = df[df["product_id"].astype(str) == str(product_id)]
    if matches.empty:
        raise HTTPException(status_code=404, detail=f"Product ID {product_id} not found")

    idx = matches.index[0]
    current = df.iloc[idx]
    current_category = current["category"]
    current_sub_category = current["sub_category"]

    scores = list(enumerate(similarity[idx]))

    filtered_scores = [
        (i, score)
        for i, score in scores
        if i != idx and (
            df.iloc[i]["category"] == current_category
            or df.iloc[i]["sub_category"] == current_sub_category
        )
    ]

    filtered_scores = sorted(filtered_scores, key=lambda x: x[1], reverse=True)[:top_k]

    results = []
    for i, score in filtered_scores:
        product = df.iloc[i].to_dict()
        product["similarity_score"] = float(score)
        product["final_score"] = float(score)
        results.append(product)

    return {
        "product_id": product_id,
        "top_k": top_k,
        "products": results,
    }