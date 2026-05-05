# 🧠 Content Intelligence Service

The Content Intelligence Service generates structured retail product content for the Retail AI Intelligence Platform.

It is designed for **general retail environments** such as grocery, electronics, fashion, home goods, and large-scale commerce platforms.

---

## 🚀 What It Does

This service automatically generates:

- Product title
- Short description
- Long description
- Bullet points
- SEO title
- SEO description

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|---------|------------|
| GET | `/` | Service root |
| GET | `/health` | Health check |
| POST | `/content/generate` | Generate product content |

---

## 📥 Example Request

```json
{
  "product_name": "Everyday Comfort Running Shoes",
  "brand": "UrbanStep",
  "category": "Footwear",
  "features": [
    "lightweight design",
    "breathable mesh",
    "durable outsole"
  ]
}
````

---

## 📤 Example Response

```json
{
  "title": "UrbanStep Everyday Comfort Running Shoes",
  "short_description": "Discover UrbanStep Everyday Comfort Running Shoes, designed for everyday shoppers looking for quality and convenience.",
  "long_description": "UrbanStep Everyday Comfort Running Shoes combines lightweight design, breathable mesh, and durable outsole to support modern retail experiences. This structured content improves product discovery, SEO visibility, and digital merchandising.",
  "bullets": [
    "Includes lightweight design for everyday use",
    "Built with breathable mesh for comfort",
    "Features durable outsole for long-lasting performance"
  ],
  "seo_title": "UrbanStep Everyday Comfort Running Shoes | Footwear",
  "seo_description": "Shop UrbanStep Everyday Comfort Running Shoes with lightweight design, breathable mesh, and durable outsole."
}
```

---

## ▶️ Run Locally

```bash
cd services/content-intelligence-service

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload --port 8002
```

---

## 📘 API Docs (Swagger)

Open in browser:

```text
http://127.0.0.1:8002/docs
```

---

## 🧩 Role in Platform

This service represents the **AI content layer** of the Retail AI Intelligence Platform.

It demonstrates how AI can:

* Standardize product content
* Improve search visibility
* Support scalable retail catalogs
* Enable intelligent merchandising systems

````


