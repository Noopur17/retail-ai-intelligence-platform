from app.models.schemas import ContentRequest, ContentResponse


def generate_content(request: ContentRequest) -> ContentResponse:
    features_text = ", ".join(request.features)
    title = f"{request.brand} {request.product_name}"

    short_description = (
        f"Discover {title}, designed for shoppers looking for quality, style, "
        f"and reliable performance in {request.category}."
    )

    long_description = (
        f"{title} brings together {features_text} to create a practical and "
        f"customer-focused retail experience. Built for modern commerce, this product "
        f"description demonstrates how structured AI content can support product discovery, "
        f"search visibility, and consistent digital merchandising."
    )

    bullets = [
        f"Includes key features such as {feature}" for feature in request.features
    ]

    seo_title = f"{title} | {request.category}"
    seo_description = (
        f"Shop {title} featuring {features_text}. Built for modern retail experiences."
    )

    return ContentResponse(
        title=title,
        short_description=short_description,
        long_description=long_description,
        bullets=bullets,
        seo_title=seo_title,
        seo_description=seo_description,
    )