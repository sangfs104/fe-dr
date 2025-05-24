"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "../components/ProductList";
import Banner from "./Banner";
import "../css/homepage.css";
export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<"new" | "hot">("new");
  const router = useRouter();
  const handleViewDetail = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  const fetchProducts = async (type: "new" | "hot") => {
    const url =
      type === "hot"
        ? "http://localhost:4000/products?hot=true"
        : "http://localhost:4000/products?_sort=created_day&_order=desc";

    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts(activeTab);
  }, [activeTab]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll(`
      .reveal, 
      .reveal-left, 
      .reveal-right, 
      .reveal-zoom, 
      .reveal-soft, 
      .reveal-flip-up, 
      .reveal-flip-left, 
      .reveal-slide-zoom, 
      .reveal-blur, 
      .reveal-bounce, 
      .reveal-banner, 
      .reveal-banner-item,
      .reveal-drop-fade,
      .reveal-rotate-zoom
    `);

    revealElements.forEach((el) => observer.observe(el));

    const elements = document.querySelectorAll(".scroll-animate");

    const isInViewport = (el: Element) => {
      const rect = el.getBoundingClientRect();
      return rect.top <= window.innerHeight - 100;
    };

    const checkScrollAnimation = () => {
      elements.forEach((el) => {
        if (isInViewport(el) && !el.classList.contains("active")) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", checkScrollAnimation);
    window.addEventListener("load", checkScrollAnimation);

    return () => {
      window.removeEventListener("scroll", checkScrollAnimation);
      window.removeEventListener("load", checkScrollAnimation);
    };
  }, []);
  type Product = {
    id: number;
    name: string;
    variant: string[];
    img: string[];
  };

  const handleAddToCart = (
    name: string,
    variation: string,
    price: number,
    image: string
  ) => {
    console.log("Add to cart:", { name, variation, price, image });
    // Bạn có thể tích hợp vào state hoặc backend ở đây
  };
  const addToCart = (
    name: string,
    variant: string,
    price: number,
    image: string
  ) => {
    console.log("Đã thêm vào giỏ:", { name, variant, price, image });
    // TODO: Tích hợp cart state / context ở đây
  };
  return (
    <>
      <Banner />
      <h2 className="shop">DANH MỤC SẢN PHẨM</h2>

      <div className="categories reveal">
        {[
          { img: "mau1.jpg", title: "T-shirt", count: 15 },
          { img: "mau2.jpg", title: "Long-sleeves", count: 8 },
          { img: "mau3.jpg", title: "Sweater", count: 18 },
          { img: "mau4.jpg", title: "Hoodies", count: 9 },
          { img: "mau4.jpg", title: "Tanktop", count: 6 },
        ].map((item) => (
          <div className="category" key={item.title}>
            <div className="circle">
              <img src={`/img/${item.img}`} alt={item.title} />
            </div>
            <div className="category-title">
              {item.title}
              <sup>{item.count}</sup>
            </div>
          </div>
        ))}
      </div>
      <div className="wrapper">
        <div className="container reveal">
          {/* Card 1 */}
          <div className="card reveal">
            <div className="card-text">
              <h2>Hàng ngàn mẫu áo cực chất đang chờ bạn</h2>
              <p>Free and easy way to bring your ideas to life</p>
              <button className="btn">Xem tất cả sản phẩm →</button>
            </div>
            <div className="card-images">
              {[1, 2, 3, 4].map((i) => (
                <img key={i} src={`/img/sp${i}.webp`} alt={`Image ${i}`} />
              ))}
            </div>
          </div>

          {/* Card 2 */}
          <div className="card reveal">
            <div className="card-text">
              <h2>Khẳng định cá tính – Chọn phong cách riêng</h2>
              <p>Mua sắm dễ dàng – Nhận hàng tận tay</p>
              <button className="btn">Mua ngay →</button>
            </div>
            <div className="card-image-single">
              <img src="/img/sp5.webp" alt="T-shirt" />
            </div>
          </div>
        </div>
      </div>
      <div className="product-section reveal-left">
        <div className="tabs">
          <button
            className={`tab ${activeTab === "new" ? "active" : ""}`}
            onClick={() => setActiveTab("new")}
          >
            Sản Phẩm Mới
          </button>
          <button
            className={`tab ${activeTab === "hot" ? "active" : ""}`}
            onClick={() => setActiveTab("hot")}
          >
            Sản Phẩm Bán Chạy
          </button>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="bannerp3 scroll-animate">
        <p> GIẢM GIÁ 20 % CHO ĐƠN HÀNG ĐẦU TIÊN KHI TẠO TÀI KHOẢN</p>
      </div>

      <div className="section">
        <div className="section-header">
          <h2>Hot under $39</h2>
          <button className="view-all">View All →</button>
        </div>

        <div className="product-listp5">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="product-cardp5 scroll-animate">
              <div className="image-containerp5">
                <img
                  src="/img/sp1.webp"
                  className="image-defaultp5"
                  alt="Product Front"
                />
                <img
                  src="/img/sp2_2.webp"
                  className="image-hoverp5"
                  alt="Product Back"
                />
                <div className="badgesp5"></div>
                <div className="hover-iconsp5">
                  <div className="iconp5">
                    👁 <span className="icon-text">Xem chi tiết</span>
                  </div>
                  <div
                    className="iconp55"
                    onClick={() =>
                      addToCart(
                        "Elessi Knit Coats",
                        "LADIES-TEE / BLUE / L",
                        589000,
                        "/img/sp1.webp"
                      )
                    }
                  >
                    ➕ <span className="icon-text">Thêm vào giỏ hàng</span>
                  </div>
                </div>
              </div>
              <div className="product-infop5">
                <p className="p5">Elessi Knit Coats</p>
                <p className="product-pricep5">589,000₫</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="fashion-trendsp4">
        <h2>Xu hướng thời trang</h2>
        <div className="trends-containerp4">
          {[
            {
              img: "/img/banner4.webp",
              category: "FASHIONS MAGAZINE",
              title: "Beauty life style classic",
            },
            {
              img: "/img/banner3.webp",
              category: "LIFE STYLE",
              title: "The need of life with vip style",
            },
            {
              img: "/img/banner2.webp",
              category: "IMAGES",
              title: "There is someone standing behind you",
            },
          ].map((trend, idx) => (
            <div key={idx} className="trend-itemp4 scroll-animate">
              <img src={trend.img} alt={trend.title} />
              <p className="categoryp4">{trend.category}</p>
              <h3>{trend.title}</h3>
              <p className="metap4">
                📅 13 Tháng Hai | 👤 monamedia | 📖 Đọc thêm
              </p>
            </div>
          ))}
        </div>
        <button className="view-allp4">TẤT CẢ BÀI VIẾT</button>
      </section>
    </>
  );
}
