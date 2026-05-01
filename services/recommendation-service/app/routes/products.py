from fastapi import APIRouter
import joblib
from pathlib import Path

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parents[2]
DATA_PATH = BASE_DIR / "models" / "data.pkl"


@router.get("")  # ✅ IMPORTANT: empty string
def get_products(limit: int = 100):
    if not DATA_PATH.exists():
        return {"products": []}

    df = joblib.load(DATA_PATH)
    products = df.head(limit).fillna("").to_dict(orient="records")

    return {"products": products}