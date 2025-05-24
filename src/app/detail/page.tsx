"use client";
import Image from "next/image";
import { useState } from "react";
import "../css/productdetails.css";
export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);

  const handleQtyChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  return (
    <main>
      <header>
        {/* Top bar */}
        <div className="top-bar">
          <div className="social-icons">
            <i className="fab fa-twitter" />
            <i className="fab fa-facebook-f" />
            <i className="fab fa-instagram" />
            <i className="fab fa-youtube" />
          </div>
          <div className="notice">🔥 Free shipping on all U.S. orders $50+</div>
          <div className="auth-buttons">
            <a href="#">Login</a>
            <button>Sign Up</button>
          </div>
        </div>

        {/* Main header */}
        <div className="main-header">
          <nav className="nav-left">
            <a href="#">HOME</a>
            <a href="#">TEESPACE</a>
            <a href="#">SHOP</a>
            <a href="#">BLOG</a>
            <a href="#">PAGES</a>
          </nav>
          <div className="logo">
            <Image src="/image/kitty.png" alt="Kitty" width={24} height={24} />
            <strong>DREAM</strong>
          </div>
          <div className="nav-right">
            <input type="text" placeholder="Search..." />
            <i className="far fa-star" />
            <div className="cart-icon">
              <i className="fas fa-shopping-bag" />
              <span className="badge">0</span>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <a href="#">Home</a> &mdash; <a href="#">Hoodie</a> &mdash;{" "}
          <span>HADES VALOR GRIP TEE - WHITE</span>
        </div>
      </header>

      <div className="product-detail-container">
        <div className="left">
          <Image
            src="/img/sp2_2.webp"
            alt="Main Product"
            width={500}
            height={500}
            className="main-image"
          />
          <div className="thumbnails">
            {[1, 2, 3, 4].map((_, i) => (
              <Image
                key={i}
                src="/img/sp2_2.webp"
                alt={`thumb-${i}`}
                width={100}
                height={100}
              />
            ))}
          </div>
        </div>

        <div className="right">
          <div className="price-range">450.000 – 750.000</div>
          <h2>HADES VALOR GRIP TEE - WHITE</h2>
          <p className="short-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque nec tristique sapien et.
          </p>
          <a href="#">Product Guide</a>

          <div className="section">
            <label>Color:</label>
            <div className="colors">
              <div className="color black"></div>
              <div className="color red"></div>
              <div className="color yellow"></div>
              <div className="color white"></div>
            </div>
          </div>

          <div className="section">
            <label>Size:</label>
            <div className="sizes">
              {["2XL", "XL", "L", "M", "S", "XS"].map((size, i) => (
                <button key={i} className={size === "S" ? "active" : ""}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="section price-block">
            <span className="price">550.000</span>
            <span className="old-price">700.000</span>
          </div>

          <div className="cart-actions">
            <div className="qty">
              <button onClick={() => handleQtyChange(-1)}>-</button>
              <input type="text" value={quantity} readOnly />
              <button onClick={() => handleQtyChange(1)}>+</button>
            </div>
            <button className="add-to-cart">Thêm vào giỏ</button>
          </div>

          <div className="wishlist-compare">
            <a href="#">♡ Thêm vào yêu thích</a>
            <a href="#">⇄ Đổi</a>
          </div>

          <div className="meta">
            <p>
              <strong>SKU:</strong> HCLT0001
            </p>
            <p>
              <strong>Category:</strong> Tee
            </p>
            <p>
              <strong>Tags:</strong> designer, t-shirt
            </p>
            <p>
              <strong>Share:</strong>
              <i className="fab fa-facebook-f" />
              <i className="fab fa-twitter" />
              <i className="fab fa-linkedin-in" />
              <i className="fab fa-pinterest" />
              <i className="fab fa-telegram-plane" />
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
