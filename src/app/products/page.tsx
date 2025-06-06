"use client";
import { useState, useEffect } from "react";

import ProductCard from "../components/ProductList";
import BreadcrumbFilter from "../components/Sort";
import HeaderHome from "../components/Header";
import Footer from "../components/Footer";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [sortDirection, setSortDirection] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [priceRange, setPriceRange] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const baseUrl = "http://127.0.0.1:8000/api/product";
      let url = baseUrl;
      const baseUrl1 = "http://127.0.0.1:8000/api/products";
      // Ưu tiên filter: size + price > size > price > sort > all
      if (selectedSize && priceRange > 0) {
        url = `${baseUrl1}/filter-size-price?size=${selectedSize}&price=${priceRange}`;
      } else if (selectedSize) {
        url = `${baseUrl1}/filter-size?size=${selectedSize}`;
      } else if (priceRange > 0) {
        url = `${baseUrl1}/price/${priceRange}`;
      } else if (sortDirection) {
        url = `${baseUrl1}/sort?sort=${sortDirection}`;
      }

      try {
        const res = await fetch(url);
        const json = await res.json();
        console.log("API response:", json);

        if (json.status === 200) {
          // Nếu là API trả về dạng phân trang
          const productList = Array.isArray(json.data)
            ? json.data
            : Array.isArray(json.data?.data)
            ? json.data.data
            : [];

          setProducts(productList);
        } else {
          console.warn("Dữ liệu không hợp lệ:", json);
          setProducts([]);
        }
      } catch (error) {
        console.error("Lỗi khi fetch sản phẩm:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [sortDirection, selectedSize, priceRange]);

  return (
    <>
      <HeaderHome />

      <BreadcrumbFilter
        onSortChange={setSortDirection}
        onSizeChange={setSelectedSize}
        onPriceChange={setPriceRange}
        currentPrice={priceRange}
      />

      <div className="px-6 md:px-20 lg:px-40 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            Không có sản phẩm phù hợp.
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
