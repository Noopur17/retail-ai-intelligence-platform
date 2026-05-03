from pydantic import BaseModel
from typing import List


class ContentRequest(BaseModel):
    product_name: str
    brand: str
    category: str
    features: List[str]


class ContentResponse(BaseModel):
    title: str
    short_description: str
    long_description: str
    bullets: List[str]
    seo_title: str
    seo_description: str