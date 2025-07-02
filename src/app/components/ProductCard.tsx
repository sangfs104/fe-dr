"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { addToCart } from "@/store/cartSlice";
import { addToWishlistAPI, fetchWishlist } from "@/store/wishlistSlice";
import { useAppDispatch } from "@/store/hooks";
import ProductModal from "./ProductModal";

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
  const dispatch = useAppDispatch();
  const router = useRouter();
  const defaultImg = product.img?.[0];
  const [mainImage, setMainImage] = useState<string | undefined>(
    defaultImg?.name
  );
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(product.variant?.[0]);
  const [showModal, setShowModal] = useState(false);

  const handleImageHover = (imgName: string) => setMainImage(imgName);

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const priceToUse =
      selectedVariant.sale_price && Number(selectedVariant.sale_price) > 0
        ? Number(selectedVariant.sale_price)
        : selectedVariant.price;

    dispatch(
      addToCart({
        productId: product.id,
        variantId: selectedVariant.id,
        // name: product.name,
        name: `${product.name} - Size ${selectedVariant.size}`,
        img: `/img/${mainImage}`,
        price: priceToUse,
        size: selectedVariant.size,
        quantity: 1,
        variantList: product.variant,
      })
    );

    toast.success("Đã thêm vào giỏ hàng");
  };

  const handleAddToWishlist = async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      toast.error("Bạn cần đăng nhập để thêm vào wishlist!");
      router.push("/login");
      return;
    }

    if (!selectedVariant) return;

    const wishlistItem = {
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      img: `/img/${mainImage}`,
      price:
        selectedVariant.sale_price && Number(selectedVariant.sale_price) > 0
          ? Number(selectedVariant.sale_price)
          : selectedVariant.price,
      size: selectedVariant.size,
    };

    const result = await dispatch(addToWishlistAPI(wishlistItem));
    if (addToWishlistAPI.fulfilled.match(result)) {
      toast.success("Đã thêm vào wishlist 💖");
      await dispatch(fetchWishlist());
    } else {
      toast.error((result.payload as string) || "Có lỗi khi thêm vào wishlist");
    }
  };

  const discountPercent =
    selectedVariant?.sale_price &&
    Number(selectedVariant.sale_price) > 0 &&
    selectedVariant.price > Number(selectedVariant.sale_price)
      ? Math.round(
          ((selectedVariant.price - Number(selectedVariant.sale_price)) /
            selectedVariant.price) *
            100
        )
      : 0;

  return (
    <>
      <div className="border rounded-lg mt-10 shadow-sm p-4 group bg-white hover:shadow-md transition duration-200">
        <div className="relative">
          <Link href={`/products/${product.id}`} className="block relative">
            {discountPercent > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow z-10">
                -{discountPercent}%
              </div>
            )}

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
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <FontAwesomeIcon icon={faCartShopping} />
            </button>

            <button
              className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
              onClick={() => setShowModal(true)}
              aria-label="View details"
            >
              <FontAwesomeIcon icon={faEye} />
            </button>

            <button
              className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
              onClick={handleAddToWishlist}
              aria-label="Add to wishlist"
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          {product.img?.slice(0, 2).map((img, idx) => (
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

          <div className="mt-1 text-base font-medium">
            {selectedVariant?.sale_price &&
            Number(selectedVariant.sale_price) > 0 ? (
              <>
                <span className="text-red-500 font-semibold">
                  {Number(selectedVariant.sale_price).toLocaleString("vi-VN")} ₫
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
