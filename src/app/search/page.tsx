"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  description: string;
  img: { name: string }[];
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!keyword) return;
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8000/api/search`, {
          params: { search: keyword },
        });
        setProducts(res.data.data || []);
        setError("");
      } catch {
        setError("Không tìm thấy sản phẩm hoặc lỗi server.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Kết quả tìm kiếm: &quot;{keyword}&quot;</h2>
      {loading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p>Không có sản phẩm nào.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded p-4 dark:bg-zinc-800 dark:text-white">
              <Image
                src={
                  product.img[0]?.name
                    ? `http://localhost:8000/storage/${product.img[0].name}`
                    : "/fallback-image.jpg"
                }
                alt={product.name}
                width={300}
                height={160}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm">{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}