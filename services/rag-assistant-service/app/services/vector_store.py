import chromadb

from app.config import VECTOR_DB_DIR, COLLECTION_NAME


client = chromadb.PersistentClient(path=str(VECTOR_DB_DIR))


def get_collection():
    return client.get_or_create_collection(name=COLLECTION_NAME)


def add_chunks_to_vector_store(chunks):
    collection = get_collection()

    ids = []
    documents = []
    metadatas = []
    embeddings = []

    for chunk in chunks:
        ids.append(chunk["chunk_id"])
        documents.append(chunk["content"])
        metadatas.append({
            "source": chunk["source"],
            "chunk_id": chunk["chunk_id"],
        })
        embeddings.append(chunk["embedding"])

    collection.add(
        ids=ids,
        documents=documents,
        metadatas=metadatas,
        embeddings=embeddings,
    )


def search_vector_store(query_embedding, top_k: int = 4):
    collection = get_collection()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k,
        include=["documents", "metadatas", "distances"],
    )

    retrieved = []

    documents = results.get("documents", [[]])[0]
    metadatas = results.get("metadatas", [[]])[0]
    distances = results.get("distances", [[]])[0]

    for doc, metadata, distance in zip(documents, metadatas, distances):
        retrieved.append({
            "content": doc,
            "source": metadata.get("source", "unknown"),
            "chunk_id": metadata.get("chunk_id", "unknown"),
            "similarity_score": round(1 - distance, 4),
        })

    return retrieved