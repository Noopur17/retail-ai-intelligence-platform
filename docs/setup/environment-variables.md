# 🔐 Environment Variables

## Overview

This document lists environment variables used across the Retail AI Intelligence Platform.

---

## Required Variables

### OpenAI API Key

Used by:

- Content Intelligence Service
- Retail AI RAG Assistant Service

```bash
OPENAI_API_KEY=your_api_key_here
```

---

## Optional Variables

### Embedding Model

Used by the RAG Assistant Service.

```bash
EMBEDDING_MODEL=text-embedding-3-small
```

### LLM Model

Used for AI-generated responses.

```bash
LLM_MODEL=gpt-4o-mini
```

---

## Local Usage

```bash
export OPENAI_API_KEY="your_api_key_here"
export EMBEDDING_MODEL="text-embedding-3-small"
export LLM_MODEL="gpt-4o-mini"
```

---

## Security Notes

Never commit API keys to GitHub.

Use:

```text
.env
.env.*
```

in `.gitignore`.

---

## Services Using Environment Variables

| Service | Variable |
|---|---|
| Content Intelligence Service | OPENAI_API_KEY |
| RAG Assistant Service | OPENAI_API_KEY, EMBEDDING_MODEL, LLM_MODEL |