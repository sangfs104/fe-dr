"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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
  hot: boolean | null;
  id: number;
  name: string;
  description: string;
  status: string;
  img: ImageType[];
  variant: Variant[];
  category: Category;
};

type ProductListProps = {
  products: Product[];
  onAddToCart: (product: Product, variant: Variant) => void;
  onViewDetail?: (product: Product) => void;
};

export default function ProductList({
  products,
  onAddToCart,
  onViewDetail,
}: ProductListProps) {
  return (
    <div className="product-listp5">
      {products.map((product) => {
        const firstVariant = product.variant[0];
        return (
          <div className="product-cardp5" key={product.id}>
            <div className="image-containerp5">
              {product.img.length > 0 && (
                <>
                  <Image
                    src={`/img/${product.img[0].name}`}
                    alt={product.name}
                    width={150}
                    height={150}
                    className="image-defaultp5 rounded object-cover"
                  />
                  <Image
                    src={`/img/${product.img[0].name}`}
                    alt={product.name}
                    width={150}
                    height={150}
                    className="image-hoverp5 rounded object-cover"
                  />
                </>
              )}

              <div className="hover-iconsp5">
                <div className="iconp5" style={{ cursor: "pointer" }}>
                  👁
                  <span className="icon-text">
                    <Link href={`/products/${product.id}`}>Xem chi tiết</Link>
                  </span>
                </div>

                <div
                  className="iconp55"
                  onClick={() => {
                    if (firstVariant) onAddToCart(product, firstVariant);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  ➕ <span className="icon-text">Thêm vào giỏ hàng</span>
                </div>
              </div>
            </div>

            {firstVariant && (
              <div className="product-infop5">
                <p className="p5">{product.name}</p>
                <p className="product-pricep5">
                  {firstVariant.sale_price ? (
                    <>
                      <span className="line-through text-red-500">
                        {firstVariant.price.toLocaleString()}đ
                      </span>{" "}
                      <span className="text-green-600 font-semibold">
                        {firstVariant.sale_price.toLocaleString()}đ
                      </span>
                    </>
                  ) : (
                    <span>{firstVariant.price.toLocaleString()}đ</span>
                  )}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
