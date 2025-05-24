"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImage {
  id: number;
  name: string;
}

interface ProductVariant {
  id: number;
  size: string;
  color: string;
  price: number;
  sale_price: number | null;
  stock_quantity: number;
  img_id: number;
}

interface Product {
  name: string;
  description: string;
  category: { name: string };
  img: ProductImage[];
  variant: ProductVariant[];
}

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variant[0] || null
  );
  const selectedImage = product.img.find(
    (img) => img.id === selectedVariant?.img_id
  )?.name;

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* LEFT: Images */}
      <div className="flex flex-col gap-4">
        {selectedImage ? (
          <Image
            src={`/img/${selectedImage}`}
            alt="Main Product"
            width={500}
            height={500}
            className="w-full max-w-md object-contain border"
          />
        ) : (
          <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        <div className="flex gap-2 flex-wrap">
          {product.img.map((img) => (
            <Image
              key={img.id}
              src={`/img/${img.name}`}
              alt={img.name}
              width={80}
              height={80}
              onClick={() => {
                const variant = product.variant.find(
                  (v) => v.img_id === img.id
                );
                if (variant) handleVariantChange(variant);
              }}
              className={`w-20 h-20 object-cover border cursor-pointer ${
                selectedImage === img.name ? "border-black" : "border-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* RIGHT: Details */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          Danh mục: {product.category.name}
        </p>

        {/* Price */}
        <div className="mt-4 text-xl text-red-600 font-semibold">
          {selectedVariant?.sale_price
            ? `${selectedVariant.sale_price.toLocaleString("vi-VN")} ₫`
            : `${selectedVariant?.price?.toLocaleString("vi-VN")} ₫`}
        </div>

        {/* Variant */}
        <div className="mt-4">
          <h4 className="font-medium">Chọn size:</h4>
          <div className="flex gap-2 mt-2">
            {product.variant.map((variant) => (
              <button
                key={variant.id}
                onClick={() => handleVariantChange(variant)}
                className={`px-3 py-1 border rounded ${
                  selectedVariant?.id === variant.id
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {variant.size}
              </button>
            ))}
          </div>
        </div>

        {/* Stock */}
        <p className="mt-4 text-sm text-green-600">
          Tồn kho: {selectedVariant?.stock_quantity} sản phẩm
        </p>
      </div>
    </div>
  );
}
