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

## 🚀 Quick Start (Docker)

Run the full platform:

```bash
docker compose up --build
````

Open:

* UI → [http://localhost:5173](http://localhost:5173)
* Recommendation API → [http://localhost:8001/docs](http://localhost:8001/docs)
* Content Intelligence API → [http://localhost:8002/docs](http://localhost:8002/docs)

---

## 🧠 Core Modules

### 🔹 Recommendation Service

* Content-based recommendation engine
* Similarity-based ranking
* Category-aware filtering

### 🔹 Content Intelligence Service ✅

* AI-generated product titles and descriptions
* Bullet points and structured product content
* SEO metadata generation

### 🔹 Customer Analytics Service *(In Progress)*

* Customer segmentation
* Behavioral insights

### 🔹 Log Intelligence Service *(Planned)*

* Error detection
* Operational insights

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
```

---

## 🖼️ Demo Screenshots

### 🛒 Retail AI Dashboard

![Dashboard](docs/screenshots/dashboard.png)

---

### 🤖 AI Recommendation Engine

![Recommendations](docs/screenshots/recommendations.png)

---

### 🧠 Content Intelligence Service

AI-generated retail product content with titles, descriptions, bullet points, and SEO metadata.

![Content AI](docs/screenshots/content-ai.png)

---

### ⚙️ Backend API (Swagger)

![Swagger](docs/screenshots/swagger.png)

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite
* **Backend:** FastAPI (Python)
* **ML/Data:** Pandas, Scikit-learn
* **Deployment:** Docker, Docker Compose
* **Domain:** Retail AI, Personalization, Content Intelligence

---

## 📊 Dataset Connection

This platform is designed for **multi-category retail systems (Walmart-style datasets)** including:

* Grocery
* Electronics
* Fashion
* Home

### Current Data Used

* Product Catalog Dataset (sample)

### Features

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

* Content-based similarity model
* Category-aware filtering
* Ranked recommendation scoring

---

## 📂 Project Structure

```text
retail-ai-intelligence-platform/
├── docs/
│   └── screenshots/
├── frontend/
├── services/
│   ├── recommendation-service/
│   ├── content-intelligence-service/
│   ├── customer-analytics-service/
│   └── log-intelligence-service/
├── datasets/
├── notebooks/
└── docker-compose.yml
```

---

## 🔌 API Documentation

### Recommendation Service

```
http://localhost:8001/docs
```

### Content Intelligence Service

```
http://localhost:8002/docs
```

---

## 📊 API Example (Recommendation)

### Request

```http
GET /recommendations/1?top_k=5
```

### Response

```json
{
  "source_product": {
    "product_name": "Sample Product",
    "category": "Electronics"
  },
  "recommendations": [
    {
      "product_name": "Wireless Headphones",
      "similarity_score": 0.81
    }
  ]
}
```

---

## 🧪 Local Development (Optional)

### Recommendation Service

```bash
cd services/recommendation-service
uvicorn app.main:app --reload --port 8001
```

### Content Intelligence Service

```bash
cd services/content-intelligence-service
uvicorn app.main:app --reload --port 8002
```

### Frontend

```bash
cd frontend/frontend
npm install
npm run dev
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
* [x] Dockerized Full Platform
* [ ] Customer Analytics Service
* [ ] Cross-service Integration (Recommendation → Content AI)
* [ ] Large-scale Dataset Integration
* [ ] End-to-End Retail Simulation

---

## 👩‍💻 Author

**Noopur Bhatt**
AI & Full-Stack Engineer specializing in **Retail Intelligence Systems, Personalization, and Scalable AI Platforms**

---

## ⭐ Future Vision

This platform aims to evolve into a **production-scale retail intelligence system**, demonstrating how AI can power modern commerce platforms end-to-end.