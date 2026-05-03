import { useState } from "react";
import "./styles.css";

function App() {
  const [productId, setProductId] = useState("1");
  const [results, setResults] = useState([]);
  const [sourceProduct, setSourceProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    if (!productId) return;

    setLoading(true);

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

    setLoading(false);
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="brandBlock">
          <div className="logo">RA</div>
          <div>
            <h2>Retail AI</h2>
            <p>Intelligence Platform</p>
          </div>
        </div>

        <nav>
          <span className="active">Dashboard</span>
          <span>Recommendations</span>
          <span>Customer Analytics</span>
          <span>Content AI</span>
          <span>Operations</span>
        </nav>

        <div className="sidebarFooter">
          <p>Platform Status</p>
          <strong>Recommendation API Live</strong>
        </div>
      </aside>

      <main className="main">
        <header className="hero">
          <div>
            <p className="eyebrow">AI-Powered Retail Intelligence</p>
            <h1>Retail AI Recommendation Engine</h1>
            <p>
              A production-inspired dashboard for real-time product discovery,
              personalization, and retail decision support.
            </p>
          </div>

          <div className="heroBadge">
            <span>Service</span>
            <strong>FastAPI + ML</strong>
          </div>
        </header>

        <section className="metrics">
          <div className="metricCard">
            <span>Active Service</span>
            <strong>Recommendation</strong>
          </div>
          <div className="metricCard">
            <span>Ranking Method</span>
            <strong>Similarity</strong>
          </div>
          <div className="metricCard">
            <span>Catalog Type</span>
            <strong>Retail Products</strong>
          </div>
          <div className="metricCard">
            <span>Demo Status</span>
            <strong>Live MVP</strong>
          </div>
        </section>

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
              Open Swagger
            </a>
          </div>

          <div className="searchBox">
            <input
              type="number"
              placeholder="Enter Product ID"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
            <button onClick={fetchRecommendations} disabled={loading}>
              {loading ? "Loading..." : "Get Recommendations"}
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
            {results.length === 0 && !loading && (
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
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;