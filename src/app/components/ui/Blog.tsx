"use client";
import { useState, useEffect } from "react";

const featuredData = [
  {
    img: "/img/quilt.webp",
    title: "VẢI QUILT LÀ GÌ? KHÁM PHÁ KỸ THUẬT GHÉP VẢI ĐỘC ĐÁO",
  },
  {
    img: "/img/quilt.webp",
    title: "TEXTILE LÀ GÌ? KHÁM PHÁ TOÀN DIỆN VỀ VẢI DỆT",
  },
  {
    img: "/img/quilt.webp",
    title: "UNISEX – THỜI TRANG KHÔNG GIỚI HẠN",
  },
];

const sideArticles = [
  {
    img: "/img/quilt.webp",
    category: "Khám phá",
    title: "Vải Không Dệt Là Gì? Tổng Hợp Thông Tin Và Ứng Dụng Thực Tế",
    description: "Tìm hiểu vải không dệt là gì và các ứng dụng phổ biến...",
  },
  {
    img: "/img/quilt.webp",
    category: "Khám phá",
    title:
      "Unisex Là Gì? Khám Phá Xu Hướng Thời Trang Không Phân Biệt Giới Tính",
    description: "",
  },
  {
    img: "/img/quilt.webp",
    category: "Khám phá",
    title: "Textile Là Gì? Tìm Hiểu Từ A Đến Z Về Vải Textile",
    description: "",
  },
];

const allArticles = [
  {
    img: "/img/quilt.webp",
    category: "Khám phá",
    title: "Sợi Sorona Là Gì? Đặc Điểm Nổi Bật Và Ứng Dụng Của Sorona",
    description:
      "Sợi Sorona là loại sợi nhân tạo có nguồn gốc sinh học, nổi bật với độ mềm mại, co giãn tốt, khám phá nguồn gốc và...",
  },
  {
    img: "/img/quilt.webp",
    category: "Khám phá",
    title: "Soft Girl Là Gì? Gợi Ý Cách Phối Đồ Soft Girl Ngọt Ngào, Điệu Đà",
    description:
      "Khám phá phong cách Soft Girl là gì? Đây là xu hướng thời trang “kẹo ngọt” nữ tính với pastel, váy xếp ly,...",
  },
  {
    img: "/img/quilt.webp",
    category: "Khám phá",
    title: "Seamless Là Gì? Tìm Hiểu Công Nghệ Không Đường May Vượt Trội",
    description:
      "Khám phá công nghệ dệt không đường may tiên tiến, tối ưu sự thoải mái và thẩm mỹ trong đồ lót, đồ tập,...",
  },
];

const categories = [
  "Tất cả",
  "Xu hướng",
  "Sự kiện",
  "Khuyến mãi",
  "Giải trí",
  "Mix Match",
  "Khám phá",
];

export default function MainContent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [category, setCategory] = useState("Tất cả");
  const [filteredArticles, setFilteredArticles] = useState(allArticles);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (category === "Tất cả") {
      setFilteredArticles(allArticles);
    } else {
      setFilteredArticles(
        allArticles.filter((article) => article.category === category)
      );
    }
  }, [category]);

  return (
    <div>
      <section className="text-center py-16 px-5">
        <h1 className="text-5xl italic font-light">
          The <strong className="font-bold">Rgazine</strong>
        </h1>
      </section>
      <main className="flex flex-wrap gap-6 px-20">
        <div className="flex-2 relative overflow-hidden rounded-lg max-w-2xl">
          <img
            src={featuredData[currentIndex].img}
            alt={featuredData[currentIndex].title}
            className="w-full h-[77%] max-h-[500px] object-cover block rounded-lg brightness-90"
          />
          <h2 className="absolute bottom-5 left-5 right-5 text-white text-lg font-bold drop-shadow-lg">
            {featuredData[currentIndex].title}
          </h2>
        </div>
        <div className="flex flex-col gap-4 flex-1.2">
          {sideArticles.map((article, index) => (
            <div
              key={index}
              className="flex gap-3 bg-gray-900 rounded-lg p-2 items-start"
            >
              <img
                src={article.img}
                alt={article.title}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <p className="text-xs text-gray-400 mb-1">{article.category}</p>
                <h3 className="text-sm font-bold text-white mb-1">
                  {article.title}
                </h3>
                {article.description && (
                  <p className="text-xs text-gray-300">{article.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
      <section className="category-section bg-white text-black py-10 px-8 text-center">
        <h2 className="text-xl font-bold mb-4">DANH MỤC BÀI VIẾT</h2>
        <div className="flex justify-center flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 border border-black cursor-pointer text-sm transition-all duration-300 ${
                category === cat ? "bg-black text-white" : "bg-transparent"
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>
      <section className="article-list bg-white text-black px-20 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredArticles.length === 0 ? (
          <p>Không có bài viết nào thuộc danh mục này.</p>
        ) : (
          filteredArticles.map((article, index) => (
            <div key={index} className="article-item">
              <img
                src={article.img}
                alt={article.title}
                className="w-full h-44 object-cover rounded-md"
              />
              <p className="text-xs text-gray-500 my-2">{article.category}</p>
              <h3 className="text-base font-bold mb-2">{article.title}</h3>
              <p className="text-sm text-gray-700">{article.description}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
