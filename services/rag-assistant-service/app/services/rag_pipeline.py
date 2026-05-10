from openai import OpenAI

from app.config import OPENAI_API_KEY, LLM_MODEL
from app.services.embeddings import generate_embedding
from app.services.vector_store import search_vector_store

client = OpenAI(api_key=OPENAI_API_KEY)


def generate_rag_answer(question: str, top_k: int = 4):
    query_embedding = generate_embedding(question)
    retrieved_context = search_vector_store(query_embedding, top_k=top_k)

    context_text = "\n\n".join(
        [f"Source: {item['source']}\nContent: {item['content']}" for item in retrieved_context]
    )

    prompt = f"""
You are a Retail AI Assistant for commerce, merchandising, and product intelligence.

Use the retrieved context to answer the user question.

Question:
{question}

Retrieved Context:
{context_text}

Return a practical, business-focused answer for retail teams.
Include reasoning grounded in the provided context.
"""

    response = client.chat.completions.create(
        model=LLM_MODEL,
        messages=[
            {
                "role": "system",
                "content": "You are a retail AI assistant that answers using retrieved retail knowledge.",
            },
            {"role": "user", "content": prompt},
        ],
        temperature=0.4,
    )

    answer = response.choices[0].message.content

    return {
        "answer": answer,
        "retrieved_context": retrieved_context,
        "business_use_case": "Retail merchandising, product strategy, catalog intelligence, and AI-assisted decision support.",
        "confidence": "medium-high" if retrieved_context else "low",
        "mode": "openai-rag",
    }