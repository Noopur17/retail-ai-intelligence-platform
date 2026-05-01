from __future__ import annotations

from typing import Dict
import math


def safe_float(value, default: float = 0.0) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def normalize_rating(rating: float) -> float:
    rating = max(0.0, min(5.0, safe_float(rating)))
    return rating / 5.0


def normalize_review_count(review_count: float, cap: float = 1000.0) -> float:
    rc = max(0.0, safe_float(review_count))
    rc = min(rc, cap)
    return rc / cap


def price_similarity(base_price: float, candidate_price: float) -> float:
    base = safe_float(base_price)
    cand = safe_float(candidate_price)

    if base <= 0 or cand <= 0:
        return 0.5

    diff_ratio = abs(base - cand) / max(base, cand)
    return max(0.0, 1.0 - diff_ratio)


def compute_final_score(
    base_product: Dict,
    candidate_product: Dict,
    similarity_score: float,
) -> float:
    category_match = 1.0 if base_product.get("category") == candidate_product.get("category") else 0.0
    brand_match = 1.0 if base_product.get("brand") == candidate_product.get("brand") else 0.0

    rating_score = normalize_rating(candidate_product.get("rating", 0))
    review_score = normalize_review_count(candidate_product.get("review_count", 0))
    price_score = price_similarity(
        base_product.get("price", 0),
        candidate_product.get("price", 0),
    )

    final_score = (
        0.55 * similarity_score +
        0.15 * category_match +
        0.10 * brand_match +
        0.10 * rating_score +
        0.05 * review_score +
        0.05 * price_score
    )

    return round(final_score, 4)