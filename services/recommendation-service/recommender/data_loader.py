import pandas as pd

def load_data(path="data/raw/products.csv"):
    return pd.read_csv(path)