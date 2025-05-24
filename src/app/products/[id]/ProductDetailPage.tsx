"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  id: string;
};

type ImageType = {
  id: number;
  product_id: number;
  name: string;
};

type Variant = {
  id: number;
  product_id: number;
  img_id: number;
  size: string;
  color: string;
  stock_quantity: number;
  price: number;
  sale_price: number | null;
  status: string;
};

type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  status: string;
  img: ImageType[];
  variant: Variant[];
  category: Category;
};

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`http://127.0.0.1:8000/product/${id}`, {
    cache: "no-store",
  });
  const json = await res.json();
  return json.data;
}

export default function ProductDetailPage({ id }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImgId, setSelectedImgId] = useState<number | null>(null);

  useEffect(() => {
    getProduct(id).then(setProduct);
  }, [id]);

  if (!product) return <p>Đang tải...</p>;

  const displayedImages = selectedImgId
    ? product.img.filter((img) => img.id === selectedImgId)
    : [];

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>

      {/* Hiển thị ảnh */}
      {displayedImages.length > 0 ? (
        <div className="flex gap-4 overflow-x-auto mb-4">
          {displayedImages.map((image) => (
            <Image
              key={image.id}
              src={`/img/${image.name}`}
              alt={product.name}
              width={200}
              height={200}
              className="rounded object-cover"
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-4">Chọn một biến thể để xem ảnh</p>
      )}

      {/* Biến thể */}
      <h2 className="text-xl font-semibold">Tất cả biến thể:</h2>
      <div className="grid gap-3 mt-2">
        {product.variant.map((v) => (
          <div
            key={v.id}
            onClick={() => setSelectedImgId(v.img_id)}
            className={`border p-2 rounded cursor-pointer ${
              selectedImgId === v.img_id ? "bg-blue-50 border-blue-500" : "bg-gray-50"
            }`}
          >
            <p>
              <span className="font-medium">Size:</span> {v.size} |{" "}
              <span className="font-medium">Màu:</span> {v.color}
            </p>
            <p>
              <span className="font-medium">Giá:</span>{" "}
              {v.sale_price ? (
                <>
                  <span className="line-through text-red-500">
                    {v.price.toLocaleString()}đ
                  </span>{" "}
                  <span className="text-green-600 font-semibold">
                    {v.sale_price.toLocaleString()}đ
                  </span>
                </>
              ) : (
                <span>{v.price.toLocaleString()}đ</span>
              )}
            </p>
            <p>
              <span className="font-medium">Tồn kho:</span> {v.stock_quantity} |{" "}
              <span className="font-medium">Trạng thái:</span> {v.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
