from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.health import router as health_router
from app.routes.ingest import router as ingest_router
from app.routes.assistant import router as assistant_router

app = FastAPI(
    title="Retail AI RAG Assistant Service",
    description="OpenAI + ChromaDB powered RAG assistant for retail intelligence workflows.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, tags=["Health"])
app.include_router(ingest_router)
app.include_router(assistant_router)


@app.get("/", tags=["Root"])
def root():
    return {
        "service": "Retail AI RAG Assistant Service",
        "status": "running",
        "docs": "/docs",
    }