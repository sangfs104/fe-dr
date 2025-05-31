"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Variant {
  id: number;
  size: string;
  price: number;
  stock_quantity: number;
}

interface ProductImage {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  status: string;
  variant: Variant[];
  img: ProductImage[];
  category: Category;
}

export default function ProductDetailPage() {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/product/")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
      })
      .catch((err) => {
        console.error("Lỗi tải sản phẩm:", err);
      });
  }, []);

  if (!product) return <p>Đang tải sản phẩm...</p>;

  return (
    <div style={{ padding: 24 }}>
      <h1>{product.name}</h1>
      <p>
        <strong>Danh mục:</strong> {product.category.name}
      </p>
      <p>
        <strong>Mô tả:</strong> {product.description}
      </p>
      <p>
        <strong>Trạng thái:</strong> {product.status}
      </p>

      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        {product.img.map((image) => (
          <Image
            key={image.id}
            src={`/img/${image.name}`}
            alt={product.name}
            width={150}
            height={150}
          />
        ))}
      </div>

      <h2 style={{ marginTop: 24 }}>Các biến thể:</h2>
      <ul>
        {product.variant.map((v) => (
          <li key={v.id}>
            Size: {v.size} - Giá: {v.price.toLocaleString()}₫ - Còn:{" "}
            {v.stock_quantity} cái
          </li>
        ))}
      </ul>
    </div>
  );
}
