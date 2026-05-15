# 🧩 Service Architecture

## Overview

The Retail AI Intelligence Platform is built as a multi-service architecture where each AI capability is developed as an independent FastAPI service and connected through a React frontend dashboard.

---

## Service Architecture Diagram

```mermaid
flowchart TB

    UI["React Frontend Dashboard"]

    UI --> REC["Recommendation Service - Port 8001"]
    UI --> CONTENT["Content Intelligence Service - Port 8002"]
    UI --> RAG["Retail AI RAG Assistant - Port 8003"]

    REC --> REC_DATA[("Retail Product Catalog")]
    CONTENT --> OPENAI["OpenAI API"]
    RAG --> OPENAI
    RAG --> CHROMA[("ChromaDB Vector Store")]
    RAG --> KB[("Retail AI Knowledge Base CSV")]

    KB --> RAG
    CHROMA --> RAG
```

---

## Services

| Service | Purpose |
|---|---|
| Frontend Dashboard | Unified user interface for all AI workflows |
| Recommendation Service | Product discovery and recommendation workflows |
| Content Intelligence Service | AI-generated product content and SEO metadata |
| Retail AI RAG Assistant | Semantic retrieval and AI-powered retail Q&A |

---

## Design Principles

- Independent microservices
- Clear API boundaries
- Retail-specific AI workflows
- Dataset-driven intelligence
- Frontend orchestration
- Docker-ready architecture

---

## Current Service Ports

| Service | Port |
|---|---|
| Frontend | 5173 |
| Recommendation Service | 8001 |
| Content Intelligence Service | 8002 |
| RAG Assistant Service | 8003 |