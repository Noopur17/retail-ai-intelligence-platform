from fastapi import APIRouter

from app.models.schemas import ContentRequest, ContentResponse
from app.services.content_generator import generate_content

router = APIRouter()


@router.post("/generate", response_model=ContentResponse)
def generate_product_content(request: ContentRequest):
    return generate_content(request)