from fastapi import APIRouter

from app.models.schemas import AskRequest
from app.services.rag_pipeline import generate_rag_answer

router = APIRouter(prefix="/assistant", tags=["Assistant"])


@router.post("/ask")
def ask_question(request: AskRequest):
    result = generate_rag_answer(
        question=request.question,
        top_k=request.top_k,
    )

    return {
        "question": request.question,
        "answer": result["answer"],
        "retrieved_context": result["retrieved_context"],
        "business_use_case": result["business_use_case"],
        "confidence": result["confidence"],
        "mode": result["mode"],
    }