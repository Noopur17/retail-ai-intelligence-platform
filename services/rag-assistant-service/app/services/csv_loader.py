import pandas as pd
from pathlib import Path


def load_retail_csv(csv_path: Path, limit: int = 1000):
    df = pd.read_csv(csv_path)

    if limit:
        df = df.head(limit)

    records = []

    for _, row in df.iterrows():
        content = f"""
Knowledge ID: {row.get("knowledge_id", "")}
Category: {row.get("category", "")}
Topic: {row.get("topic", "")}
Retail Problem: {row.get("retail_problem", "")}
Retail Insight: {row.get("retail_insight", "")}
AI Use Case: {row.get("ai_use_case", "")}
Customer Segment: {row.get("customer_segment", "")}
Merchandising Strategy: {row.get("merchandising_strategy", "")}
Source Type: {row.get("source_type", "")}
Region: {row.get("region", "")}
Tags: {row.get("tags", "")}
""".strip()

        records.append({
            "source": "retail_ai_knowledge_base_100k.csv",
            "chunk_id": str(row.get("knowledge_id", "")),
            "content": content
        })

    return records