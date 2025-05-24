"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "../css/productlist.css";

interface ProductImage {
  id: number;
  product_id: number;
  name: string;
}

interface ProductVariant {
  id: number;
  product_id: number;
  img_id: number;
  size: string;
  color: string;
  price: number;
  sale_price: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  img: ProductImage[];
  variant: ProductVariant[];
  category: {
    name: string;
  };
}

export default function ProductCard({ product }: { product: Product }) {
  const defaultImg = product.img?.[0];
  const [mainImage, setMainImage] = useState<string | undefined>(
    defaultImg?.name
  );
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(product.variant?.[0]);

  const variantImageNames = Array.from(
    new Set(
      product.variant
        .map((v) => product.img.find((img) => img.id === v.img_id)?.name)
        .filter(Boolean)
    )
  ) as string[];

  const handleImageHover = (imgName: string) => {
    setMainImage(imgName);
    const imgObj = product.img.find((img) => img.name === imgName);
    if (!imgObj) return;
    const matchedVariant = product.variant.find((v) => v.img_id === imgObj.id);
    if (matchedVariant) {
      setSelectedVariant(matchedVariant);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <Link href={`/products/${product.id}`} className="product-link">
          {mainImage ? (
            <Image
              src={`/img/${mainImage}`}
              alt={product.name}
              width={500}
              height={600}
              className="product-image"
            />
          ) : (
            <div className="product-image bg-gray-100 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          {/* <span className="badge">EASY BUY</span> */}
        </Link>
        <div className="image-overlay">
          <div className="icon-wrapper">
            <button
              className="icon-btn"
              onClick={() => alert("Thêm vào giỏ hàng")}
            >
              🛒
              <span className="icon-label">Thêm vào giỏ</span>
            </button>
          </div>
          <div className="icon-wrapper">
            <Link href={`/products/${product.id}`} className="icon-btn">
              👁️
              <span className="icon-label">Xem chi tiết</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="variant-thumbnails">
        {variantImageNames.map((imgName, idx) => (
          <div
            key={idx}
            className={`thumbnail ${imgName === mainImage ? "active" : ""}`}
            onMouseEnter={() => handleImageHover(imgName)}
          >
            <Image
              src={`/img/${imgName}`}
              alt={`variant-${idx}`}
              width={40}
              height={40}
            />
          </div>
        ))}
      </div>

      <div className="product-info">
        <h3 className="category">{product.category.name}</h3>
        <h2 className="name">{product.name}</h2>
        {/* <div className="price">
          {selectedVariant?.price?.toLocaleString("vi-VN") || "—"} ₫
        </div> */}
        <div className="price">
          {selectedVariant?.sale_price ? (
            <>
              <span className="sale-price">
                {selectedVariant.sale_price.toLocaleString("vi-VN")} ₫
              </span>
              <span className="original-price line-through text-gray-500 text-sm ml-2">
                {selectedVariant.price.toLocaleString("vi-VN")} ₫
              </span>
            </>
          ) : (
            <>{selectedVariant?.price?.toLocaleString("vi-VN") || "—"} ₫</>
          )}
        </div>

        {/* <div className="fundiin">
          Từ 100.000đ qua <span>Fundiin</span>
        </div> */}
      </div>
    </div>
  );
}
