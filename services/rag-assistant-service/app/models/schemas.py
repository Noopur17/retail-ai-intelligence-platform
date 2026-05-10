from typing import List, Optional
from pydantic import BaseModel, Field


class IngestResponse(BaseModel):
    status: str
    documents_loaded: int
    chunks_created: int
    collection_name: str


class AskRequest(BaseModel):
    question: str = Field(
        ...,
        example="What merchandising opportunities exist for electronics products?"
    )
    top_k: int = Field(default=4, ge=1, le=10)


class RetrievedContext(BaseModel):
    source: str
    chunk_id: str
    content: str
    similarity_score: Optional[float] = None


class AskResponse(BaseModel):
    question: str
    answer: str
    retrieved_context: List[RetrievedContext]
    business_use_case: str
    confidence: str
    mode: str