import json
import os

from openai import OpenAI

from app.models.schemas import ContentRequest, ContentResponse


def generate_template_content(request: ContentRequest) -> ContentResponse:
    features_text = ", ".join(request.features)
    title = f"{request.brand} {request.product_name}"

    short_description = (
        f"Discover {title}, designed for everyday shoppers looking for quality, "
        f"convenience, and reliable value in {request.category}."
    )

    long_description = (
        f"{title} brings together {features_text} to support a practical and "
        f"customer-focused retail experience. This structured content demonstrates "
        f"how intelligent content systems can improve product discovery, search visibility, "
        f"and consistent digital merchandising across modern commerce platforms."
    )

    bullets = [
        f"Designed with {feature} for modern retail customers"
        for feature in request.features
    ]

    seo_title = f"{title} | {request.category}"
    seo_description = (
        f"Shop {title} featuring {features_text}. Built for modern retail and commerce experiences."
    )

    return ContentResponse(
        title=title,
        short_description=short_description,
        long_description=long_description,
        bullets=bullets,
        seo_title=seo_title,
        seo_description=seo_description,
        mode_used="template",
    )


def generate_ai_content(request: ContentRequest) -> ContentResponse:
    api_key = os.getenv("OPENAI_API_KEY")

    if not api_key:
        return generate_template_content(request)

    client = OpenAI(api_key=api_key)

    prompt = f"""
Generate structured retail product content for a broad commerce platform.

Product:
- Name: {request.product_name}
- Brand: {request.brand}
- Category: {request.category}
- Features: {", ".join(request.features)}
- Tone: {request.tone}

Return ONLY valid JSON with this exact schema:
{{
  "title": "...",
  "short_description": "...",
  "long_description": "...",
  "bullets": ["...", "...", "..."],
  "seo_title": "...",
  "seo_description": "..."
}}
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are a retail AI content generation assistant for enterprise commerce platforms.",
            },
            {"role": "user", "content": prompt},
        ],
        temperature=0.7,
    )

    raw_content = response.choices[0].message.content
    data = json.loads(raw_content)

    return ContentResponse(
        title=data["title"],
        short_description=data["short_description"],
        long_description=data["long_description"],
        bullets=data["bullets"],
        seo_title=data["seo_title"],
        seo_description=data["seo_description"],
        mode_used="ai",
    )


def generate_content(request: ContentRequest) -> ContentResponse:
    if request.mode == "ai":
        return generate_ai_content(request)

    return generate_template_content(request)