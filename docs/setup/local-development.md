# 🧪 Local Development Setup

## Overview

This document explains how to run the Retail AI Intelligence Platform locally for development and experimentation.

The platform consists of:

- React frontend
- FastAPI microservices
- OpenAI-powered AI workflows
- ChromaDB vector retrieval
- Retail AI RAG pipelines

---

# 🛠️ Prerequisites

Before running the platform, install:

- Python 3.10+
- Node.js 18+
- npm
- Docker Desktop
- Git

---

# 📂 Clone Repository

```bash
git clone https://github.com/Noopur17/retail-ai-intelligence-platform.git

cd retail-ai-intelligence-platform
````

---

# 🐍 Python Environment Setup

## Recommendation Service

```bash
cd services/recommendation-service

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt
```

---

## Content Intelligence Service

```bash
cd services/content-intelligence-service

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt
```

---

## Retail AI RAG Assistant Service

```bash
cd services/rag-assistant-service

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt
```

---

# 🔐 Environment Variables

Set OpenAI API key:

```bash
export OPENAI_API_KEY="your_api_key_here"
```

---

# 🚀 Run Services

## Recommendation Service

```bash
cd services/recommendation-service

source venv/bin/activate

python -m uvicorn app.main:app --reload --port 8001
```

---

## Content Intelligence Service

```bash
cd services/content-intelligence-service

source venv/bin/activate

python -m uvicorn app.main:app --reload --port 8002
```

---

## Retail AI RAG Assistant Service

```bash
cd services/rag-assistant-service

source venv/bin/activate

python -m uvicorn app.main:app --reload --port 8003
```

---

# ⚛️ Frontend Setup

```bash
cd frontend/frontend

npm install

npm run dev
```

---

# 🌐 Local URLs

| Service                     | URL                                                      |
| --------------------------- | -------------------------------------------------------- |
| Frontend Dashboard          | [http://localhost:5173](http://localhost:5173)           |
| Recommendation API          | [http://localhost:8001/docs](http://localhost:8001/docs) |
| Content Intelligence API    | [http://localhost:8002/docs](http://localhost:8002/docs) |
| Retail AI RAG Assistant API | [http://localhost:8003/docs](http://localhost:8003/docs) |

---

# 🧠 Retail AI RAG Dataset Setup

## Create CSV Directory

```bash
mkdir -p services/rag-assistant-service/app/data/csv
```

---

## Add Dataset

Place the dataset:

```text
retail_ai_knowledge_base_100k.csv
```

inside:

```text
services/rag-assistant-service/app/data/csv/
```

---

# 📊 Ingest Retail AI Dataset

Open Swagger:

```text
http://localhost:8003/docs
```

Run:

```text
POST /ingest/csv
```

Recommended test value:

```text
limit = 1000
```

---

# 🧪 Test RAG Assistant

Example question:

```text
How can semantic search improve retail product discovery?
```

---

# 🐳 Docker Development

Run the full platform:

```bash
docker compose up --build
```

---

# 🧠 Development Workflow

```text
Dataset Engineering
        ↓
AI Service Development
        ↓
FastAPI APIs
        ↓
Frontend Integration
        ↓
Semantic Retrieval
        ↓
Retail AI Dashboard
```

---

# ⚡ Recommended Development Order

1. Recommendation workflows
2. Content intelligence workflows
3. RAG ingestion pipelines
4. Frontend integrations
5. Semantic retrieval improvements
6. AI workflow orchestration

---

# 🔬 Platform Development Areas

The project explores:

* Recommendation systems
* Retrieval-Augmented Generation (RAG)
* Semantic search
* OpenAI embeddings
* Vector databases
* Commerce intelligence workflows
* AI-powered merchandising
* Enterprise AI platform engineering

---

# 🚀 Future Improvements

Planned improvements include:

* Conversational memory
* Streaming AI responses
* Vector analytics dashboards
* Recommendation explanations
* Retail knowledge graphs
* Cloud deployment workflows
* Production monitoring