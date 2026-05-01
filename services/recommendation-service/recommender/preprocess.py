def preprocess(df):
    df = df.copy()
    df.fillna("", inplace=True)
    return df