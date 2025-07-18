"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { ShoppingCart, Eye, Heart } from "lucide-react";

type Product = {
  id: number;
  name: string;
  description: string;
  img: { name: string }[];
  variant: any[];
  category: { name: string };
  price: number;
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("query") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!keyword) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8000/api/search?search=${encodeURIComponent(keyword)}`
        );
        setProducts(res.data.data || []);
      } catch (err) {
        setError("Không tìm thấy sản phẩm hoặc lỗi server.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Kết quả tìm kiếm: <span className="text-blue-600">"{keyword}"</span>
      </h1>

      {loading && <p>Đang tải...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && products.length === 0 && (
        <p>Không tìm thấy sản phẩm nào.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden relative group"
          >
            {/* Top Icons */}
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button className="bg-white p-2 rounded-full shadow hover:scale-105">
                <ShoppingCart size={18} />
              </button>
              <button className="bg-white p-2 rounded-full shadow hover:scale-105">
                <Eye size={18} />
              </button>
              <button className="bg-white p-2 rounded-full shadow hover:scale-105">
                <Heart size={18} />
              </button>
            </div>

            {/* Product Image */}
            <img
              src={`http://localhost:8000/storage/products/${product.img?.[0]?.name}`}
              alt={product.name}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Content */}
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-1 line-clamp-1">
                {product.category?.name || "Chưa phân loại"}
              </p>
              <h2 className="text-md font-semibold line-clamp-1">{product.name}</h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
              <p className="text-base font-bold mt-2 text-black">
                {product.price?.toLocaleString("vi-VN")} ₫
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
