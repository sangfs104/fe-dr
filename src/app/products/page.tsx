"use client";
import { useState, useEffect } from "react";

import ProductCard from "../components/ProductList";
import BreadcrumbFilter from "../components/Sort";
import HeaderHome from "../components/Header";
import Footer from "../components/Footer";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedSize, setSelectedSize] = useState(null);
  const [priceRange, setPriceRange] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedPrice = useDebounce(priceRange, 500);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      const baseUrl = "http://127.0.0.1:8000/api/products";
      let url = "";

      if (selectedSize && debouncedPrice > 0) {
        url = `${baseUrl}/filter-size-price?size=${selectedSize}&max=${debouncedPrice}`;
      } else if (selectedSize) {
        url = `${baseUrl}/filter-size?size=${selectedSize}`;
      } else if (debouncedPrice > 0) {
        url = `${baseUrl}/price?min=0&max=${debouncedPrice}`;
      } else {
        url = `${baseUrl}/sort?sort=${sortDirection}`;
      }

      try {
        const res = await fetch(url);
        const json = await res.json();

        if (json.status === 200) {
          const productList = Array.isArray(json.data)
            ? json.data
            : Array.isArray(json.data?.data)
            ? json.data.data
            : [];

          setProducts(productList);
        } else {
          setError("Không lấy được sản phẩm từ máy chủ.");
          setProducts([]);
        }
      } catch (err) {
        console.error("Lỗi khi fetch sản phẩm:", err);
        setError("Đã xảy ra lỗi kết nối đến máy chủ.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sortDirection, selectedSize, debouncedPrice]);

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
        {loading && (
          <div className="text-center py-4 text-blue-500 font-medium">
            Đang tải sản phẩm...
          </div>
        )}

        {error && (
          <div className="text-center py-4 text-red-500 font-medium">
            {error}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            Không có sản phẩm phù hợp.
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}