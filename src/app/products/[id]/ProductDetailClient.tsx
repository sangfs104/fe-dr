"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductDetailClient({ product }: { product: any }) {
  const [selectedImage, setSelectedImage] = useState(product.img[0]);

  const handleVariantClick = (imgId: number) => {
    const image = product.img.find((img: any) => img.id === imgId);
    if (image) {
      setSelectedImage(image);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>

      {/* Ảnh đang chọn */}
      {selectedImage && (
        <div className="mb-4">
          <Image
            src={`/img/${selectedImage.name}`}
            alt={product.name}
            width={400}
            height={400}
            className="rounded mx-auto"
          />
        </div>
      )}

      {/* Biến thể sản phẩm */}
      <h2 className="text-xl font-semibold">Tất cả biến thể:</h2>
      <div className="grid gap-3 mt-2">
        {product.variant.map((v: any) => (
          <div
            key={v.id}
            onClick={() => handleVariantClick(v.img_id)}
            className="border p-2 rounded bg-gray-50 hover:bg-gray-100 cursor-pointer"
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
