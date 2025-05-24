"use client";
import "../css/homepage.css";
import { useEffect } from "react";

export default function BannerSection() {
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

  const handleAddToCart = (
    name: string,
    variation: string,
    price: number,
    image: string
  ) => {
    console.log("Add to cart:", { name, variation, price, image });
  };

  return (
    <>
      <div className="banner-container reveal-banner">
        <img
          id="banner-image"
          className="reveal-banner-item delay-1"
          src="/img/banner3.webp"
          alt="Banner"
        />
      </div>

      <div className="dots reveal-banner-item delay-2" id="dots">
        <span className="dot active" data-index="0"></span>
        <span className="dot" data-index="1"></span>
        <span className="dot" data-index="2"></span>
      </div>

      <h2 className="shop">Shopping by Categories</h2>

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

      <div className="container reveal">
        {/* Card 1 */}
        <div className="card reveal">
          <div className="card-text">
            <h2>Thousands of free templates</h2>
            <p>Free and easy way to bring your ideas to life</p>
            <button className="btn">Explore More →</button>
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
            <h2>Create your unique style</h2>
            <p>Free and easy way to create your ideas to life</p>
            <button className="btn">Shop Now →</button>
          </div>
          <div className="card-image-single">
            <img src="/img/sp5.webp" alt="T-shirt" />
          </div>
        </div>
      </div>

      <div className="product-section reveal-left">
        <div className="tabs">
          <button className="tab active">New Arrivals</button>
          <button className="tab">Best Seller</button>
          <button className="tab">Sale</button>
        </div>

        <div className="product-listp5">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div className="product-cardp5" key={i}>
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
                        handleAddToCart(
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
    </>
  );
}
