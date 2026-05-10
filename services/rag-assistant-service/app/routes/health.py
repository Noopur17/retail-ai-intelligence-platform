from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def health():
    return {
        "service": "Retail AI RAG Assistant",
        "status": "running"
    }