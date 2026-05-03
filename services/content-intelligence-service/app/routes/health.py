from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
def health_check():
    return {
        "service": "Content Intelligence Service",
        "status": "healthy",
    }