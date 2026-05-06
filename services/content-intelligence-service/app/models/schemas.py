from typing import List, Literal
from pydantic import BaseModel, Field


class ContentRequest(BaseModel):
    product_name: str = Field(..., example="Wireless Bluetooth Headphones")
    brand: str = Field(..., example="TechNova")
    category: str = Field(..., example="Electronics")
    features: List[str] = Field(
        ...,
        example=[
            "long battery life",
            "wireless connectivity",
            "compact design"
        ],
    )
    tone: Literal["premium", "budget-friendly", "family-focused", "technical", "simple"] = Field(
        default="premium",
        example="premium",
    )
    mode: Literal["template", "ai"] = Field(
        default="template",
        example="template",
    )


class ContentResponse(BaseModel):
    title: str
    short_description: str
    long_description: str
    bullets: List[str]
    seo_title: str
    seo_description: str
    mode_used: str