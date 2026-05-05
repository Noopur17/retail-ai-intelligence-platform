from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.content import router as content_router
from app.routes.health import router as health_router

app = FastAPI(
    title="Content Intelligence Service",
    description="Template-based retail product content generation service for the Retail AI Intelligence Platform.",
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
app.include_router(content_router, prefix="/content", tags=["Content Generation"])


@app.get("/", tags=["Root"])
def root():
    return {
        "service": "Content Intelligence Service",
        "status": "running",
        "docs": "/docs",
    }