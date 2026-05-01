from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routes.health import router as health_router
from app.routes.recommendations import router as rec_router
from app.routes.products import router as products_router  # make sure this exists

app = FastAPI(title="Retail Recommendation Engine")

# ✅ CORS (needed for React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for local dev; restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Mount static folder (THIS IS YOUR IMAGE FIX)
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# ✅ Routes
app.include_router(health_router)
app.include_router(rec_router, prefix="/recommendations")
app.include_router(products_router, prefix="/products")

# ✅ Root endpoint
@app.get("/")
def root():
    return {"message": "API is running"}