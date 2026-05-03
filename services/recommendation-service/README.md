# Recommendation Service

The Recommendation Service powers product discovery for the Retail AI Intelligence Platform.

It provides similarity-based product recommendations using product metadata such as category, sub-category, brand, tags, description, rating, and price.

## Features

- Product catalog API
- Similarity-based recommendations
- Category-aware filtering
- Ranked recommendation results
- FastAPI Swagger documentation

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Service root |
| GET | `/health` | Health check |
| GET | `/products` | Product catalog |
| GET | `/recommendations/{product_id}` | Product recommendations |

## Run Locally

```bash
cd services/recommendation-service

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload --port 8001