"use client";
import ProductModal from "./ProductModal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useCart } from "../../context/CartContext";

interface ProductImage {
  id: number;
  product_id: number;
  name: string;
  color?: string;
}

interface ProductVariant {
  id: number;
  product_id: number;
  img_id: number;
  size: string;
  color?: string;
  price: number;
  sale_price: string | null;
  stock_quantity: number;
  status: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  status: string;
  img: ProductImage[];
  variant: ProductVariant[];
  category: {
    id: number;
    name: string;
  };
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const defaultImg = product.img?.[0];
  const [mainImage, setMainImage] = useState<string | undefined>(
    defaultImg?.name
  );
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(product.variant?.[0]);
  const [showModal, setShowModal] = useState(false);

  const handleImageHover = (imgName: string) => {
    setMainImage(imgName);
  };

  return (
    <>
      <div className="border rounded-lg mt-10 shadow-sm p-4 group bg-white hover:shadow-md transition duration-200">
        <div className="relative">
          <Link href={`/products/${product.id}`} className="block">
            {mainImage ? (
              <Image
                src={`/img/${mainImage}`}
                alt={product.name}
                width={500}
                height={600}
                className="w-full h-64 object-cover rounded"
              />
            ) : (
              <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400 rounded">
                No Image
              </div>
            )}
          </Link>

          <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
            <button
              className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
              disabled={!selectedVariant}
              onClick={() =>
                selectedVariant &&
                addToCart({
                  productId: product.id,
                  variantId: selectedVariant.id,
                  name: product.name,
                  img: `/img/${mainImage}`,
                  price: selectedVariant.price,
                  sale_price: selectedVariant.sale_price,
                  size: selectedVariant.size,
                  quantity: 1,
                  variantList: product.variant,
                })
              }
            >
              <FontAwesomeIcon icon={faCartShopping} />
            </button>

            <button
              className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
              onClick={() => setShowModal(true)}
            >
              <FontAwesomeIcon icon={faEye} />
            </button>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          {product.img.slice(0, 2).map((img, idx) => (
            <div
              key={idx}
              className={`w-10 h-10 rounded border cursor-pointer ${
                img.name === mainImage ? "border-blue-500" : "border-gray-300"
              }`}
              onMouseEnter={() => handleImageHover(img.name)}
            >
              <Image
                src={`/img/${img.name}`}
                alt={`variant-${idx}`}
                width={40}
                height={40}
                className="w-full h-full object-cover rounded"
              />
            </div>
          ))}
        </div>

        <div className="mt-3">
          <h3 className="text-sm text-gray-500">{product.category.name}</h3>
          <h2 className="text-lg font-semibold">{product.name}</h2>
          {/* 
          {selectedVariant && (
            <div className="text-sm text-gray-600">
              Size: {selectedVariant.size}
            </div>
          )} */}

          <div className="mt-1 text-base font-medium">
            {selectedVariant?.sale_price ? (
              <>
                <span className="text-red-500 font-semibold">
                  {parseInt(selectedVariant.sale_price).toLocaleString("vi-VN")}{" "}
                  ₫
                </span>
                <span className="ml-2 text-gray-500 line-through text-sm">
                  {selectedVariant.price.toLocaleString("vi-VN")} ₫
                </span>
              </>
            ) : (
              <>{selectedVariant?.price?.toLocaleString("vi-VN") || "—"} ₫</>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <ProductModal product={product} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
