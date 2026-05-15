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
  Grocery: {
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
  const [loadingContent, setLoadingContent] = useState(false);

  const [assistantQuestion, setAssistantQuestion] = useState(
    "What retail AI capabilities improve product discovery?"
  );
  const [assistantResponse, setAssistantResponse] = useState(null);
  const [assistantLoading, setAssistantLoading] = useState(false);

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
    setLoadingRecommendations(true);

    try {
      const res = await fetch(
        `http://127.0.0.1:8001/recommendations/${productId}?top_k=5`
      );
      const data = await res.json();

      setSourceProduct(data.source_product || null);
      setResults(data.recommendations || data.products || []);
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
      console.error("Content API error:", err);
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

  const askAssistant = async () => {
    if (!assistantQuestion.trim()) return;

    setAssistantLoading(true);
    setAssistantResponse(null);

    try {
      const res = await fetch("http://127.0.0.1:8003/assistant/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: assistantQuestion,
          top_k: 4,
        }),
      });

      const data = await res.json();
      setAssistantResponse(data);
    } catch (err) {
      console.error("RAG Assistant API error:", err);
      setAssistantResponse(null);
    }

    setAssistantLoading(false);
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

            <button
              className={activeTab === "assistant" ? "active" : ""}
              onClick={() => setActiveTab("assistant")}
            >
              Retail AI Assistant
            </button>

            <button disabled>Customer Analytics</button>
            <button disabled>Operations</button>
          </nav>
        </div>

        <div className="sidebarFooter">
          <p>Platform Status</p>
          <strong>3 AI Services Live</strong>
        </div>
      </aside>

      <main className="main">
        <header className="hero">
          <div>
            <p className="eyebrow">Enterprise Retail Intelligence</p>
            <h1>Retail AI Intelligence Platform</h1>
            <p>
              A multi-service dashboard for recommendations, AI-generated
              product content, and RAG-powered retail knowledge workflows.
            </p>
          </div>

          <div className="heroBadge">
            <span>Architecture</span>
            <strong>React + FastAPI + OpenAI</strong>
          </div>
        </header>

        <section className="metrics">
          <div className="metricCard">
            <span>Live Services</span>
            <strong>3</strong>
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
            <span>RAG Assistant</span>
            <strong>Active</strong>
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
              {results.map((item, index) => (
                <article className="productCard" key={item.product_id || index}>
                  <div className="cardTop">
                    <div>
                      <span className="rank">Rank #{item.rank || index + 1}</span>
                      <h3>{item.product_name}</h3>
                    </div>
                    <span className="score">
                      {item.similarity_score
                        ? `${(item.similarity_score * 100).toFixed(1)}%`
                        : "AI"}
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

            <div className="contentGrid">
              <div className="contentForm">
                <label>Generation Mode</label>
                <select
                  value={contentForm.mode}
                  onChange={(e) =>
                    setContentForm({ ...contentForm, mode: e.target.value })
                  }
                >
                  <option value="template">Template Mode</option>
                  <option value="ai">AI Mode</option>
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
                    <p>Select retail attributes and generate structured content.</p>
                  </div>
                )}

                {generatedContent && (
                  <>
                    <div className="generatedBlock primary">
                      <span>Mode: {generatedContent.mode_used}</span>
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

        {activeTab === "assistant" && (
          <section className="panel">
            <div className="panelHeader">
              <div>
                <p className="eyebrow">Retail AI RAG Assistant</p>
                <h2>Ask retail intelligence questions</h2>
              </div>

              <a
                href="http://127.0.0.1:8003/docs"
                target="_blank"
                rel="noreferrer"
                className="swaggerLink"
              >
                Open RAG Swagger
              </a>
            </div>

            <div className="assistantGrid">
              <div className="assistantQuestionCard">
                <label>Ask a Retail AI Question</label>
                <textarea
                  value={assistantQuestion}
                  onChange={(e) => setAssistantQuestion(e.target.value)}
                  placeholder="Ask about product discovery, recommendations, merchandising, semantic search..."
                />

                <button onClick={askAssistant} disabled={assistantLoading}>
                  {assistantLoading ? "Thinking..." : "Ask Assistant"}
                </button>

                <div className="suggestionBox">
                  <p>Try asking:</p>
                  <button
                    onClick={() =>
                      setAssistantQuestion(
                        "What merchandising opportunities exist for electronics products?"
                      )
                    }
                  >
                    Electronics merchandising opportunities
                  </button>
                  <button
                    onClick={() =>
                      setAssistantQuestion(
                        "How can RAG improve retail AI assistants?"
                      )
                    }
                  >
                    RAG for retail assistants
                  </button>
                  <button
                    onClick={() =>
                      setAssistantQuestion(
                        "What retail AI capabilities improve product discovery?"
                      )
                    }
                  >
                    Product discovery AI
                  </button>
                </div>
              </div>

              <div className="assistantResponseCard">
                {!assistantResponse && (
                  <div className="emptyState compact">
                    <h3>No answer yet</h3>
                    <p>
                      Ask a retail intelligence question to retrieve context and
                      generate an AI answer.
                    </p>
                  </div>
                )}

                {assistantResponse && (
                  <>
                    <div className="generatedBlock primary">
                      <span>
                        {assistantResponse.mode} • Confidence:{" "}
                        {assistantResponse.confidence}
                      </span>
                      <h3>AI Answer</h3>
                      <p>{assistantResponse.answer}</p>
                    </div>

                    <div className="generatedBlock">
                      <span>Business Use Case</span>
                      <p>{assistantResponse.business_use_case}</p>
                    </div>

                    <div className="generatedBlock">
                      <span>Retrieved Context</span>
                      {assistantResponse.retrieved_context?.map(
                        (ctx, index) => (
                          <div className="contextCard" key={index}>
                            <strong>{ctx.source}</strong>
                            <p>{ctx.content}</p>
                            <small>
                              Chunk: {ctx.chunk_id} • Score:{" "}
                              {ctx.similarity_score}
                            </small>
                          </div>
                        )
                      )}
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