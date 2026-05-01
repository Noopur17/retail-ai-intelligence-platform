import { useEffect, useMemo, useState } from "react";
import "./styles.css";

const API_BASE = "http://127.0.0.1:8000";
const ITEMS_PER_PAGE = 8;

// 🔥 FIX: helper to build correct image URL
const getImageUrl = (path) => {
  if (!path) return "";
  return `${API_BASE}${path}`;
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalProduct, setModalProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch(() => setProducts([]));
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category).filter(Boolean))],
    [products]
  );

  const filtered = useMemo(() => {
    let list = products
      .filter((p) =>
        p.product_name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((p) =>
        selectedCategory === "All" ? true : p.category === selectedCategory
      );

    if (sortBy === "price_asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "rating_desc") list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [products, search, selectedCategory, sortBy]);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const visible = filtered.slice(start, start + ITEMS_PER_PAGE);

  const fetchRecommendations = async (product) => {
    setSelectedProduct(product);
    const res = await fetch(`${API_BASE}/recommendations/${product.product_id}?top_k=6`);
    const data = await res.json();
    setRecommendations(data.products || []);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="brand-block">
          <div className="brand">RetailRec</div>
          <div className="subbrand">AI retail discovery</div>
        </div>

        <div className="search-wrap">
          <input
            className="search-input"
            placeholder="Search products"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="cart-pill">🛒 {cart.length}</div>
      </header>

      <div className="content">
        <aside className="sidebar">
          <div className="sidebar-title">Categories</div>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`sidebar-item ${cat === selectedCategory ? "active" : ""}`}
              onClick={() => {
                setSelectedCategory(cat);
                setPage(1);
              }}
            >
              {cat}
            </button>
          ))}
        </aside>

        <main className="main">
          <div className="toolbar">
            <div className="toolbar-title">Shop Products</div>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="">Sort</option>
              <option value="price_asc">Price low to high</option>
              <option value="price_desc">Price high to low</option>
              <option value="rating_desc">Top rated</option>
            </select>
          </div>

          <div className="grid">
            {visible.map((p) => (
              <article key={p.product_id} className="card">
                <div className="image-frame">
                  {/* 🔥 FIX HERE */}
                  <img
                    src={getImageUrl(p.image_url)}
                    alt={p.product_name}
                    className="product-image"
                  />
                </div>

                <div className="card-body">
                  <div className="brand-text">{p.brand}</div>
                  <h3 className="product-title">{p.product_name}</h3>
                  <div className="meta-row">
                    <span className="rating">⭐ {p.rating} ({p.review_count})</span>
                  </div>
                  <div className="price">${Number(p.price).toFixed(2)}</div>

                  <button
                    className="primary-btn"
                    onClick={() => {
                      setModalProduct(p);
                      fetchRecommendations(p);
                    }}
                  >
                    View Details
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Recommendations */}
          {selectedProduct && (
            <section className="recommendations">
              <h2 className="recommendations-title">
                Recommended for {selectedProduct.product_name}
              </h2>

              <div className="grid">
                {recommendations.map((p) => (
                  <article key={p.product_id} className="card small-card">
                    <div className="image-frame small-frame">
                      <img
                        src={getImageUrl(p.image_url)}   // 🔥 FIX HERE ALSO
                        alt={p.product_name}
                        className="product-image"
                      />
                    </div>

                    <div className="card-body">
                      <div className="brand-text">{p.brand}</div>
                      <h4 className="small-title">{p.product_name}</h4>
                      <div className="price">${Number(p.price).toFixed(2)}</div>
                      <div className="small-meta">⭐ {p.rating}</div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Modal */}
      {modalProduct && (
        <div className="modal-overlay" onClick={() => setModalProduct(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-image-wrap">
              <img
                src={getImageUrl(modalProduct.image_url)}  // 🔥 FIX HERE
                alt={modalProduct.product_name}
                className="modal-image"
              />
            </div>

            <div className="modal-content">
              <div className="modal-brand">{modalProduct.brand}</div>
              <h2 className="modal-title">{modalProduct.product_name}</h2>
              <div className="modal-price">${Number(modalProduct.price).toFixed(2)}</div>
              <div className="modal-rating">⭐ {modalProduct.rating}</div>

              <button
                className="add-cart-btn"
                onClick={() => addToCart(modalProduct)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}