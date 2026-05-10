# 🧠 Retail AI RAG Assistant Service

A production-inspired RAG assistant for retail intelligence workflows.

This service combines **OpenAI embeddings**, **ChromaDB vector search**, and **FastAPI** to answer retail questions using a custom retail knowledge base.

---

## 🚀 What This Service Does

The RAG Assistant helps answer retail strategy, merchandising, product discovery, and commerce workflow questions using retrieved knowledge.

It follows this flow:

```text
Retail Knowledge Base
        ↓
Document Loading
        ↓
Chunking
        ↓
OpenAI Embeddings
        ↓
ChromaDB Vector Store
        ↓
Semantic Retrieval
        ↓
OpenAI Answer Generation
````

---

## 🧠 Key Features

* Retail knowledge ingestion
* Markdown knowledge base support
* Chunking pipeline
* OpenAI embedding generation
* ChromaDB persistent vector storage
* Semantic search
* OpenAI-powered answer generation
* Retrieved context returned with each answer
* Swagger API documentation

---

## 📂 Service Structure

```text
rag-assistant-service/
├── app/
│   ├── data/
│   │   └── retail_knowledge_base.md
│   ├── models/
│   │   └── schemas.py
│   ├── routes/
│   │   ├── assistant.py
│   │   ├── health.py
│   │   └── ingest.py
│   ├── services/
│   │   ├── chunker.py
│   │   ├── document_loader.py
│   │   ├── embeddings.py
│   │   ├── rag_pipeline.py
│   │   └── vector_store.py
│   ├── vector_db/
│   ├── config.py
│   └── main.py
├── requirements.txt
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint         | Description                                    |
| ------ | ---------------- | ---------------------------------------------- |
| GET    | `/`              | Service root                                   |
| GET    | `/health`        | Health check                                   |
| POST   | `/ingest/`       | Load, chunk, embed, and store retail knowledge |
| POST   | `/assistant/ask` | Ask a retail intelligence question             |

---

## ▶️ Run Locally

```bash
cd services/rag-assistant-service

python3 -m venv venv
source venv/bin/activate

python -m pip install -r requirements.txt

export OPENAI_API_KEY="your_api_key_here"

python -m uvicorn app.main:app --reload --port 8003
```

Open Swagger:

```text
http://127.0.0.1:8003/docs
```

---

## 📥 Step 1: Ingest Knowledge

Run:

```text
POST /ingest/
```

This loads:

```text
app/data/retail_knowledge_base.md
```

Then it:

* splits the document into chunks
* creates OpenAI embeddings
* stores vectors in ChromaDB

Example response:

```json
{
  "status": "success",
  "documents_loaded": 1,
  "chunks_created": 4,
  "collection_name": "retail_knowledge_base"
}
```

---

## 💬 Step 2: Ask a Question

Run:

```text
POST /assistant/ask
```

Example request:

```json
{
  "question": "What retail AI capabilities improve product discovery?",
  "top_k": 4
}
```

Example response:

```json
{
  "question": "What retail AI capabilities improve product discovery?",
  "answer": "AI-powered recommendation systems improve product discovery by helping customers find relevant products based on category, behavior, and product similarity...",
  "retrieved_context": [
    {
      "source": "retail_knowledge_base.md",
      "chunk_id": "retail_knowledge_base.md-2",
      "content": "AI-powered recommendation systems improve product discovery...",
      "similarity_score": 0.82
    }
  ],
  "business_use_case": "Retail merchandising, product strategy, catalog intelligence, and AI-assisted decision support.",
  "confidence": "medium-high",
  "mode": "openai-rag"
}
```

---

## 🧩 Role in Platform

This service adds a **Retail AI Assistant layer** to the Retail AI Intelligence Platform.

It complements:

* Recommendation Service → Product discovery
* Content Intelligence Service → AI product content generation
* RAG Assistant Service → Retail knowledge reasoning and Q&A

Together, these services create a multi-service AI platform for commerce workflows.

---

## 🔮 Future Enhancements

* CSV ingestion for product catalogs
* Kaggle dataset integration
* Customer review ingestion
* PDF/document ingestion
* Source citations in UI
* Conversation history
* Retail strategy assistant dashboard
* ChromaDB collection management
* Dockerized deployment
