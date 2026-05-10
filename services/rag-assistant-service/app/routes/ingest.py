from fastapi import APIRouter

from app.config import DATA_DIR, COLLECTION_NAME
from app.services.document_loader import load_markdown_documents
from app.services.chunker import chunk_text
from app.services.embeddings import generate_embedding
from app.services.vector_store import add_chunks_to_vector_store

router = APIRouter(prefix="/ingest", tags=["Ingestion"])


@router.post("/")
def ingest_documents():
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
        "documents_loaded": len(documents),
        "chunks_created": total_chunks,
        "collection_name": COLLECTION_NAME,
    }