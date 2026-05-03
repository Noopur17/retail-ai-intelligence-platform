from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routes.health import router as health_router
from app.routes.recommendations import router as recommendations_router
from app.routes.products import router as products_router

app = FastAPI(
    title="Retail Recommendation Service",
    description="Product recommendation API for the Retail AI Intelligence Platform.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.include_router(health_router, tags=["Health"])
app.include_router(products_router, prefix="/products", tags=["Products"])
app.include_router(recommendations_router, prefix="/recommendations", tags=["Recommendations"])


@app.get("/", tags=["Root"])
def root():
    return {
        "service": "Retail Recommendation Service",
        "status": "running",
        "docs": "/docs",
    }
