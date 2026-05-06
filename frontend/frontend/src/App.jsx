import { useMemo, useState } from "react";
import "./styles.css";

const CATEGORY_OPTIONS = {
  Footwear: {
    brands: ["UrbanStep", "StrideLab", "EverydayFit", "ActiveWay"],
    products: [
      "Everyday Comfort Running Shoes",
      "Lightweight Walking Sneakers",
      "All-Day Training Shoes",
    ],
    features: [
      "lightweight design",
      "breathable mesh",
      "durable outsole",
      "responsive cushioning",
    ],
  },
  Electronics: {
    brands: ["TechNova", "SoundCore", "SmartEdge", "Voltify"],
    products: [
      "Wireless Bluetooth Headphones",
      "Smart Fitness Watch",
      "Portable Power Bank",
    ],
    features: [
      "long battery life",
      "wireless connectivity",
      "compact design",
      "fast charging",
    ],
  },
  Groceries: {
    brands: ["FreshFarm", "DailyHarvest", "NatureBasket", "GoodPantry"],
    products: [
      "Organic Whole Grain Cereal",
      "Cold Pressed Orange Juice",
      "High Protein Snack Pack",
    ],
    features: [
      "fresh ingredients",
      "family-size pack",
      "ready to serve",
      "great everyday value",
    ],
  },
  Home: {
    brands: ["HomeEssentials", "ComfortNest", "LivingPro", "CasaLine"],
    products: [
      "Premium Cotton Bath Towels",
      "Non-Stick Cookware Set",
      "Memory Foam Pillow",
    ],
    features: [
      "durable materials",
      "easy to clean",
      "modern design",
      "everyday comfort",
    ],
  },
  Fashion: {
    brands: ["StyleHub", "UrbanMode", "ClassicWear", "TrendLine"],
    products: [
      "Everyday Casual Jacket",
      "Slim Fit Denim Jeans",
      "Soft Cotton Crewneck T-Shirt",
    ],
    features: [
      "comfortable fit",
      "soft fabric",
      "versatile styling",
      "machine washable",
    ],
  },
};

function App() {
  const [activeTab, setActiveTab] = useState("recommendations");

  const [productId, setProductId] = useState("1");
  const [results, setResults] = useState([]);
  const [sourceProduct, setSourceProduct] = useState(null);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  const [contentForm, setContentForm] = useState({
    category: "Footwear",
    brand: "UrbanStep",
    product_name: "Everyday Comfort Running Shoes",
    features:
      "lightweight design, breathable mesh, durable outsole, responsive cushioning",
    mode: "template",
    tone: "premium",
  });

  const [generatedContent, setGeneratedContent] = useState(null);
  const [bulkContent, setBulkContent] = useState([]);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [loadingContent, setLoadingContent] = useState(false);

  const currentCategory = useMemo(
    () => CATEGORY_OPTIONS[contentForm.category] || CATEGORY_OPTIONS.Footwear,
    [contentForm.category]
  );

  const handleCategoryChange = (category) => {
    const selected = CATEGORY_OPTIONS[category];

    setContentForm({
      category,
      brand: selected.brands[0],
      product_name: selected.products[0],
      features: selected.features.join(", "),
      mode: contentForm.mode,
      tone: contentForm.tone,
    });

    setGeneratedContent(null);
  };

  const fetchRecommendations = async () => {
    if (!productId) return;
    setLoadingRecommendations(true);

    try {
      const res = await fetch(
        `http://127.0.0.1:8001/recommendations/${productId}?top_k=5`
      );
      const data = await res.json();

      setSourceProduct(data.source_product || null);
      setResults(data.recommendations || []);
    } catch (err) {
      console.error("Recommendation API error:", err);
      setResults([]);
      setSourceProduct(null);
    }

    setLoadingRecommendations(false);
  };

  const generateContent = async () => {
    setLoadingContent(true);

    const payload = {
      product_name: contentForm.product_name,
      brand: contentForm.brand,
      category: contentForm.category,
      features: contentForm.features
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      mode: contentForm.mode,
      tone: contentForm.tone,
    };

    try {
      const res = await fetch("http://127.0.0.1:8002/content/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setGeneratedContent(data);
    } catch (err) {
      console.error("Content Intelligence API error:", err);
      setGeneratedContent(null);
    }

    setLoadingContent(false);
  };

  const handleGenerateFromRecommendation = (item) => {
    setActiveTab("content");

    setContentForm({
      category: item.category || "Electronics",
      brand: item.brand || "RetailBrand",
      product_name: item.product_name || "Recommended Product",
      features:
        item.tags?.split("|").join(", ") ||
        `${item.category || "retail"} product, customer favorite, high quality`,
      mode: "ai",
      tone: "premium",
    });

    setGeneratedContent(null);
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div>
          <div className="brandBlock">
            <div className="logo">RA</div>
            <div>
              <h2>Retail AI</h2>
              <p>Intelligence Platform</p>
            </div>
          </div>

          <nav>
            <button
              className={activeTab === "recommendations" ? "active" : ""}
              onClick={() => setActiveTab("recommendations")}
            >
              Recommendations
            </button>
            <button
              className={activeTab === "content" ? "active" : ""}
              onClick={() => setActiveTab("content")}
            >
              Content AI
            </button>
            <button disabled>Customer Analytics</button>
            <button disabled>Operations</button>
          </nav>
        </div>

        <div className="sidebarFooter">
          <p>Platform Status</p>
          <strong>2 AI Services Live</strong>
        </div>
      </aside>

      <main className="main">
        <header className="hero">
          <div>
            <p className="eyebrow">Enterprise Retail Intelligence</p>
            <h1>Retail AI Intelligence Platform</h1>
            <p>
              A multi-service dashboard for recommendations, AI-generated
              product content, and scalable retail decision workflows across
              commerce categories.
            </p>
          </div>

          <div className="heroBadge">
            <span>Architecture</span>
            <strong>React + FastAPI</strong>
          </div>
        </header>

        <section className="metrics">
          <div className="metricCard">
            <span>Live Services</span>
            <strong>2</strong>
          </div>
          <div className="metricCard">
            <span>Recommendation API</span>
            <strong>Active</strong>
          </div>
          <div className="metricCard">
            <span>Content AI</span>
            <strong>Active</strong>
          </div>
          <div className="metricCard">
            <span>Retail Scope</span>
            <strong>Multi-Category</strong>
          </div>
        </section>

        {activeTab === "recommendations" && (
          <section className="panel">
            <div className="panelHeader">
              <div>
                <p className="eyebrow">Recommendation Workflow</p>
                <h2>Find similar products</h2>
              </div>

              <a
                href="http://127.0.0.1:8001/docs"
                target="_blank"
                rel="noreferrer"
                className="swaggerLink"
              >
                Open Recommendation Swagger
              </a>
            </div>

            <div className="searchBox">
              <input
                type="number"
                placeholder="Enter Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
              <button
                onClick={fetchRecommendations}
                disabled={loadingRecommendations}
              >
                {loadingRecommendations ? "Loading..." : "Get Recommendations"}
              </button>
            </div>

            {sourceProduct && (
              <div className="sourceProduct">
                <span>Source Product</span>
                <strong>{sourceProduct.product_name}</strong>
                <p>
                  {sourceProduct.brand} • {sourceProduct.category} •{" "}
                  {sourceProduct.sub_category}
                </p>
              </div>
            )}

            <div className="resultsHeader">
              <h2>Ranked Recommendations</h2>
              <p>{results.length} products returned</p>
            </div>

            <div className="results">
              {results.length === 0 && !loadingRecommendations && (
                <div className="emptyState">
                  <h3>No recommendations loaded yet</h3>
                  <p>Enter a product ID and run the recommendation engine.</p>
                </div>
              )}

              {results.map((item) => (
                <article className="productCard" key={item.product_id}>
                  <div className="cardTop">
                    <div>
                      <span className="rank">Rank #{item.rank}</span>
                      <h3>{item.product_name}</h3>
                    </div>
                    <span className="score">
                      {(item.similarity_score * 100).toFixed(1)}%
                    </span>
                  </div>

                  <p className="brand">{item.brand}</p>

                  <div className="tags">
                    <span>{item.category}</span>
                    <span>{item.sub_category}</span>
                    <span>{item.stock_status}</span>
                  </div>

                  <div className="cardBottom">
                    <strong>${item.price}</strong>
                    <span className="rating">★ {item.rating}</span>
                  </div>

                  <button
                    className="contentActionButton"
                    onClick={() => handleGenerateFromRecommendation(item)}
                  >
                    Generate Content
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === "content" && (
          <section className="panel">
            <div className="panelHeader">
              <div>
                <p className="eyebrow">Content Intelligence Workflow</p>
                <h2>Generate enterprise retail product content</h2>
              </div>

              <a
                href="http://127.0.0.1:8002/docs"
                target="_blank"
                rel="noreferrer"
                className="swaggerLink"
              >
                Open Content Swagger
              </a>
            </div>

            <div className="enterpriseNotice">
              <strong>Retail Catalog Workspace</strong>
              <p>
                Select a category, brand, product, generation mode, and tone to
                generate structured merchandising content.
              </p>
            </div>

            <div className="contentGrid">
              <div className="contentForm">
                <label>Generation Mode</label>
                <select
                  value={contentForm.mode}
                  onChange={(e) =>
                    setContentForm({ ...contentForm, mode: e.target.value })
                  }
                >
                  <option value="template">Template Mode - Fast / Free</option>
                  <option value="ai">AI Mode - OpenAI Powered</option>
                </select>

                <label>Tone</label>
                <select
                  value={contentForm.tone}
                  onChange={(e) =>
                    setContentForm({ ...contentForm, tone: e.target.value })
                  }
                >
                  <option value="premium">Premium</option>
                  <option value="budget-friendly">Budget-Friendly</option>
                  <option value="family-focused">Family-Focused</option>
                  <option value="technical">Technical</option>
                  <option value="simple">Simple</option>
                </select>

                <label>Retail Category</label>
                <select
                  value={contentForm.category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  {Object.keys(CATEGORY_OPTIONS).map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>

                <label>Brand</label>
                <input
                  value={contentForm.brand}
                  onChange={(e) =>
                    setContentForm({ ...contentForm, brand: e.target.value })
                  }
                />

                <label>Product Name</label>
                <input
                  value={contentForm.product_name}
                  onChange={(e) =>
                    setContentForm({
                      ...contentForm,
                      product_name: e.target.value,
                    })
                  }
                />

                <label>Features</label>
                <textarea
                  value={contentForm.features}
                  onChange={(e) =>
                    setContentForm({ ...contentForm, features: e.target.value })
                  }
                />

                <button onClick={generateContent} disabled={loadingContent}>
                  {loadingContent ? "Generating..." : "Generate Retail Content"}
                </button>
              </div>

              <div className="contentOutput">
                {!generatedContent && (
                  <div className="emptyState compact">
                    <h3>No content generated yet</h3>
                    <p>
                      Select retail attributes and generate structured product
                      content.
                    </p>
                  </div>
                )}

                {generatedContent && (
                  <>
                    <div className="generatedBlock primary">
                      <span>
                        Generated Title • Mode: {generatedContent.mode_used}
                      </span>
                      <h3>{generatedContent.title}</h3>
                    </div>

                    <div className="generatedBlock">
                      <span>Short Description</span>
                      <p>{generatedContent.short_description}</p>
                    </div>

                    <div className="generatedBlock">
                      <span>Long Description</span>
                      <p>{generatedContent.long_description}</p>
                    </div>

                    <div className="generatedBlock">
                      <span>Bullet Points</span>
                      <ul>
                        {generatedContent.bullets?.map((bullet, index) => (
                          <li key={index}>{bullet}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="generatedBlock">
                      <span>SEO Metadata</span>
                      <p>
                        <strong>{generatedContent.seo_title}</strong>
                      </p>
                      <p>{generatedContent.seo_description}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;