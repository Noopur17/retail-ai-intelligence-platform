# syntax=docker/dockerfile:1

FROM python:3.11-slim-bookworm

# Security + performance
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# Create non-root user (CRITICAL for Scout)
RUN addgroup --system appgroup && \
    adduser --system --ingroup appgroup appuser

# Install dependencies
COPY requirements.txt .

RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy only required files (avoid bloat)
COPY app ./app
COPY recommender ./recommender
COPY models ./models

# Fix permissions
RUN chown -R appuser:appgroup /app

# Run as non-root (REQUIRED)
USER appuser

EXPOSE 8000

CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]