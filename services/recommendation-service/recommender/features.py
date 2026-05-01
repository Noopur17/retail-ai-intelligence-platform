import pandas as pd


def build_text(df: pd.DataFrame) -> pd.Series:
    return (
        df["product_name"].fillna("") + " "
        + df["brand"].fillna("") + " "
        + df["category"].fillna("") + " "
        + df["sub_category"].fillna("") + " "
        + df["tags"].fillna("").str.replace("|", " ", regex=False) + " "
        + df["description"].fillna("")
    ).str.lower().str.strip()