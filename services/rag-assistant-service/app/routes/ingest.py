from pathlib import Path
from fastapi import APIRouter, Query

from app.config import DATA_DIR, COLLECTION_NAME
from app.services.document_loader import load_markdown_documents
from app.services.csv_loader import load_retail_csv
from app.services.chunker import chunk_text
from app.services.embeddings import generate_embedding
from app.services.vector_store import add_chunks_to_vector_store

router = APIRouter(prefix="/ingest", tags=["Ingestion"])


@router.post("/")
def ingest_markdown_documents():
    documents = load_markdown_documents(DATA_DIR)

    prepared_chunks = []
    total_chunks = 0

    for doc in documents:
        chunks = chunk_text(doc["content"])

        for idx, chunk in enumerate(chunks):
            embedding = generate_embedding(chunk)

            prepared_chunks.append({
                "chunk_id": f"{doc['source']}-{idx}",
                "source": doc["source"],
                "content": chunk,
                "embedding": embedding,
            })

            total_chunks += 1

    add_chunks_to_vector_store(prepared_chunks)

    return {
        "status": "success",
        "ingestion_type": "markdown",
        "documents_loaded": len(documents),
        "chunks_created": total_chunks,
        "collection_name": COLLECTION_NAME,
    }


@router.post("/csv")
def ingest_csv_dataset(limit: int = Query(default=1000, ge=1, le=5000)):
    csv_path = DATA_DIR / "csv" / "retail_ai_knowledge_base_100k.csv"

    if not csv_path.exists():
        return {
            "status": "error",
            "message": f"CSV file not found at {csv_path}",
        }

    records = load_retail_csv(csv_path=csv_path, limit=limit)

    prepared_chunks = []

    for record in records:
        embedding = generate_embedding(record["content"])

        prepared_chunks.append({
            "chunk_id": record["chunk_id"],
            "source": record["source"],
            "content": record["content"],
            "embedding": embedding,
        })

    add_chunks_to_vector_store(prepared_chunks)

    return {
        "status": "success",
        "ingestion_type": "csv",
        "records_loaded": len(records),
        "chunks_created": len(prepared_chunks),
        "collection_name": COLLECTION_NAME,
        "source": "retail_ai_knowledge_base_100k.csv",
    }