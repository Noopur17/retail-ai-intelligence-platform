# 📂 Project Structure

## Overview

The Retail AI Intelligence Platform is organized as a modular multi-service AI ecosystem.

The repository separates:

- frontend applications,
- AI microservices,
- datasets,
- notebooks,
- and architecture documentation

to simulate production-inspired engineering workflows.

---

# 🏗️ Repository Structure

```text
retail-ai-intelligence-platform/
│
├── docs/
│   ├── architecture/
│   ├── api/
│   ├── datasets/
│   ├── setup/
│   ├── screenshots/
│   ├── roadmap.md
│   └── research-alignment.md
│
├── frontend/
│   └── frontend/
│       ├── src/
│       ├── public/
│       └── package.json
│
├── services/
│   ├── recommendation-service/
│   │   ├── app/
│   │   ├── models/
│   │   ├── requirements.txt
│   │   └── README.md
│   │
│   ├── content-intelligence-service/
│   │   ├── app/
│   │   ├── templates/
│   │   ├── requirements.txt
│   │   └── README.md
│   │
│   ├── rag-assistant-service/
│   │   ├── app/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── vector_db/
│   │   │   └── data/
│   │   ├── requirements.txt
│   │   └── README.md
│   │
│   ├── customer-analytics-service/
│   │
│   └── log-intelligence-service/
│
├── datasets/
│
├── notebooks/
│
├── docker-compose.yml
│
└── README.md
```

---

# 🧩 Service Organization

## Recommendation Service

Responsible for:

- recommendation workflows,
- product similarity,
- and retail discovery systems.

---

## Content Intelligence Service

Responsible for:

- AI-generated retail content,
- SEO metadata,
- and merchandising workflows.

---

## Retail AI RAG Assistant

Responsible for:

- semantic retrieval,
- vector search,
- OpenAI embeddings,
- and AI-powered commerce Q&A.

---

# 📓 Dataset Organization

Datasets are separated into:

- recommendation datasets,
- retail intelligence datasets,
- and AI-ready commerce knowledge bases.

---

# 🧠 Documentation Organization

The `docs/` directory contains:

| Folder | Purpose |
|---|---|
| architecture | System and workflow diagrams |
| api | Service API documentation |
| datasets | Dataset design and schema |
| setup | Local development and Docker workflows |
| screenshots | Demo screenshots |
| roadmap.md | Future platform direction |
| research-alignment.md | AI engineering alignment |

---

# 🚀 Engineering Goals

The project structure is designed to support:

- modular AI development,
- scalable service boundaries,
- independent deployment workflows,
- and enterprise-inspired platform engineering.