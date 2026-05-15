# 🧠 Retail AI RAG Assistant API

## Overview

The Retail AI RAG Assistant Service is a FastAPI-based Retrieval-Augmented Generation (RAG) system designed for semantic retail intelligence workflows.

The service enables:

- Retail knowledge ingestion
- CSV dataset ingestion
- OpenAI embedding generation
- ChromaDB vector storage
- Semantic retrieval
- AI-powered retail question answering

---

# 🚀 Service Information

| Property | Value |
|---|---|
| Service Name | Retail AI RAG Assistant |
| Framework | FastAPI |
| Default Port | 8003 |
| Vector Database | ChromaDB |
| Embeddings | OpenAI |
| Architecture | Retrieval-Augmented Generation (RAG) |

---

# 🔌 API Base URL

```text
http://localhost:8003
````

---

# 📚 Swagger Documentation

```text
http://localhost:8003/docs
```

---

# ⚙️ API Endpoints

## POST `/ingest/`

### Purpose

Ingest markdown retail knowledge documents into the vector database.

### Workflow

```text
Markdown Documents
        ↓
Chunk Generation
        ↓
Embedding Creation
        ↓
ChromaDB Storage
```

---

### Example Response

```json
{
  "status": "success",
  "ingestion_type": "markdown",
  "documents_loaded": 5,
  "chunks_created": 32,
  "collection_name": "retail_knowledge_base"
}
```

---

# 📊 POST `/ingest/csv`

## Purpose

Ingest the Retail AI Intelligence Knowledge Base CSV dataset into ChromaDB.

This endpoint powers dataset-driven semantic retrieval workflows.

---

## Query Parameters

| Parameter | Type    | Description                 |
| --------- | ------- | --------------------------- |
| limit     | integer | Number of records to ingest |

---

## Example Request

```text
POST /ingest/csv?limit=1000
```

---

## Workflow

```text
Retail AI Dataset
        ↓
CSV Loader
        ↓
Chunk Builder
        ↓
OpenAI Embeddings
        ↓
ChromaDB Vector Store
```

---

## Example Response

```json
{
  "status": "success",
  "ingestion_type": "csv",
  "records_loaded": 1000,
  "chunks_created": 1000,
  "collection_name": "retail_knowledge_base",
  "source": "retail_ai_knowledge_base_100k.csv"
}
```

---

# 🤖 POST `/assistant/ask`

## Purpose

Ask semantic retail intelligence questions using Retrieval-Augmented Generation.

---

## Example Request

```json
{
  "question": "How can semantic search improve retail product discovery?",
  "top_k": 4
}
```

---

## Retrieval Workflow

```text
User Question
        ↓
Generate Query Embedding
        ↓
Search ChromaDB
        ↓
Retrieve Similar Retail Chunks
        ↓
Inject Context into Prompt
        ↓
Generate OpenAI Response
```

---

## Example Response

```json
{
  "question": "How can semantic search improve retail product discovery?",
  "answer": "Semantic retrieval improves retail product discovery by understanding customer intent...",
  "mode": "openai-rag",
  "confidence": "high",
  "business_use_case": "Retail Product Discovery",
  "retrieved_context": [
    {
      "source": "retail_ai_knowledge_base_100k.csv",
      "chunk_id": "RIK-000102",
      "similarity_score": 0.91
    }
  ]
}
```

---

# 🧠 AI Capabilities

The service demonstrates:

* Retrieval-Augmented Generation (RAG)
* Semantic vector search
* OpenAI embedding workflows
* AI-powered commerce retrieval
* Intelligent retail Q&A
* Retail knowledge orchestration

---

# 🗂️ Vector Database

## ChromaDB

The service uses ChromaDB for:

* Embedding storage
* Similarity search
* Semantic retrieval
* Retail knowledge indexing

---

# 📊 Dataset Integration

The RAG service integrates with:

## Retail AI Intelligence Knowledge Base

### Dataset Characteristics

* 100K+ records
* Multi-category retail coverage
* AI use case mappings
* Merchandising intelligence
* Customer segment workflows
* Semantic retrieval tags

---

# 🖥️ Frontend Integration

The service is integrated into the React dashboard through:

## Retail AI Assistant

### Frontend Features

* AI chat interface
* Semantic retail search
* Retrieved context display
* Confidence scoring
* Retail AI workflows

---

# ⚡ Local Development

## Run Service

```bash
cd services/rag-assistant-service

source venv/bin/activate

export OPENAI_API_KEY="your_api_key_here"

python -m uvicorn app.main:app --reload --port 8003
```

---

# 🔬 Future Enhancements

Planned improvements:

* Conversational memory
* Streaming responses
* Metadata filtering
* Recommendation explanations
* Hybrid retrieval
* Retail knowledge graph workflows
* Cloud vector deployment

---

# 🎯 Purpose

The Retail AI RAG Assistant demonstrates how enterprise retail systems can integrate:

* semantic retrieval,
* vector search,
* generative AI,
* and structured commerce datasets

to build intelligent AI-powered commerce assistants.