# 🛒 Retail AI Intelligence Platform

A production-inspired AI platform for retail intelligence, designed for large-scale commerce environments including grocery, electronics, fashion, and general merchandise.

---

## 🚀 Why This Project Matters

Modern retail systems require more than isolated machine learning models.

They need **end-to-end intelligent platforms** that can:
- Understand customer behavior
- Recommend relevant products
- Generate high-quality product content
- Provide actionable business insights

This project demonstrates how AI can be applied across the **entire retail lifecycle**.

---

## 🧠 Core Modules

### 🔹 Recommendation Service
- Content-based recommendation engine
- Similarity-based ranking
- Category-aware filtering

### 🔹 Content Intelligence Service ✅
- AI-generated product titles and descriptions
- Bullet points and structured product content
- SEO metadata generation

### 🔹 Customer Analytics Service *(In Progress)*
- Customer segmentation
- Behavioral insights

### 🔹 Log Intelligence Service *(Planned)*
- Error detection
- Operational insights

---

## 🏗️ Architecture

```text
Frontend (React Dashboard)
        |
        v
API Layer (FastAPI Services)
        |
        ├── Recommendation Service
        ├── Content Intelligence Service
        ├── Customer Analytics Service
        └── Log Intelligence Service
        |
        v
Datasets + ML Models + Retail Knowledge Base
````

---

## 🖼️ Demo Screenshots

### 🛒 Retail AI Dashboard

Production-inspired interface for retail intelligence systems

![Dashboard](docs/screenshots/dashboard.png)

---

### 🤖 AI Recommendation Engine (Live Results)

Real-time product recommendations with ranking and similarity scoring

![Recommendations](docs/screenshots/recommendations.png)

---

### ⚙️ Backend API (Swagger)

FastAPI-powered recommendation service with interactive API documentation

![Swagger](docs/screenshots/swagger.png)

---

### 🧠 Content Intelligence Service  
AI-generated retail product content with titles, descriptions, bullet points, and SEO metadata.

![Content AI](docs/screenshots/content-ai.png)

---

## 🛠️ Tech Stack

* **Frontend:** React, TypeScript, Vite
* **Backend:** FastAPI (Python)
* **ML/Data:** Pandas, Scikit-learn
* **Deployment:** Docker, Docker Compose
* **Domain:** Retail AI, Personalization, Content Intelligence

---

## 📊 Dataset Connection

This platform is designed to work with **large-scale retail datasets across multiple categories such as grocery, electronics, fashion, and home goods**, similar to enterprise commerce platforms.

### Current Data Used

* Product Catalog Dataset (sample included)
* Features:

  * product_id
  * product_name
  * brand
  * category
  * sub_category
  * price
  * rating
  * stock_status
  * tags
  * description

### How Data is Used

* Recommendation engine uses **content-based similarity**
* Filters by **category and sub-category**
* Ranks products using similarity scoring

### Kaggle Profile

👉 [https://www.kaggle.com/noopurbhatt](https://www.kaggle.com/noopurbhatt)

---

## 📂 Project Structure

```text
retail-ai-intelligence-platform/
├── docs/
├── frontend/
├── services/
│   ├── recommendation-service/
│   ├── content-intelligence-service/
│   ├── customer-analytics-service/
│   └── log-intelligence-service/
├── datasets/
├── notebooks/
└── scripts/
```

---

## 🔌 API Documentation (Swagger)

### Recommendation Service

```text
http://127.0.0.1:8001/docs
```

### Content Intelligence Service

```text
http://127.0.0.1:8002/docs
```

---

### Available Endpoints

#### Recommendation Service

* `GET /health` → Health check
* `GET /products` → Product catalog
* `GET /recommendations/{product_id}` → Ranked recommendations

#### Content Intelligence Service

* `POST /content/generate` → Generate product title, descriptions, bullet points, and SEO metadata

---

## 📊 API Example (Recommendation)

### Request

```http
GET /recommendations/1?top_k=5
```

### Response

```json
{
  "query": {
    "product_id": 1,
    "top_k": 5
  },
  "source_product": {
    "product_id": 1,
    "product_name": "Sample Product",
    "brand": "BrandX",
    "category": "Electronics",
    "sub_category": "Headphones"
  },
  "recommendation_count": 5,
  "recommendations": [
    {
      "rank": 1,
      "product_id": 7,
      "product_name": "Wireless Headphones",
      "brand": "BrandY",
      "category": "Electronics",
      "sub_category": "Headphones",
      "price": 59.99,
      "rating": 4.5,
      "stock_status": "In Stock",
      "similarity_score": 0.8123
    }
  ]
}
```

---

## 🧪 How to Run

### Recommendation Service

```bash
cd services/recommendation-service

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload --port 8001
```

---

### Content Intelligence Service

```bash
cd services/content-intelligence-service

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload --port 8002
```

---

## 🔬 Research Alignment

This project supports research in:

* Retail Recommendation Systems
* AI-powered Content Generation
* Customer Behavior Analytics
* Scalable Retail Intelligence Platforms

---

## 🛣️ Roadmap

* [x] Recommendation Engine API
* [x] Swagger API Documentation
* [x] Premium Dashboard UI
* [x] Content Intelligence Service MVP
* [ ] Customer Analytics Service
* [ ] Full Frontend Integration (Content AI)
* [ ] Dockerized Full Platform
* [ ] Kaggle Dataset Integration
* [ ] End-to-End Demo

---

## 👩‍💻 Author

**Noopur Bhatt**
AI & Full-Stack Engineer specializing in **Retail Intelligence Systems, Personalization, and Scalable AI Platforms**

---

## ⭐ Future Vision

This platform aims to evolve into a **production-scale retail intelligence system**, demonstrating how AI can power modern commerce platforms end-to-end.