"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCheck,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
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

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const defaultImg = product.img?.[0];
  const [mainImage, setMainImage] = useState<string | undefined>(
    defaultImg?.name
  );
  const selectedVariant = product.variant?.[0];
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addedToWishlist, setAddedToWishlist] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for card entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageHover = (imgName: string) => {
    setMainImage(imgName);
  };

  const handleAddToCart = async () => {
    if (!selectedVariant || cartLoading) return;

    setCartLoading(true);

    try {
      const priceToUse =
        selectedVariant.sale_price && Number(selectedVariant.sale_price) > 0
          ? Number(selectedVariant.sale_price)
          : selectedVariant.price;

      dispatch(
        addToCart({
          productId: product.id,
          variantId: selectedVariant.id,
          name: `${product.name} - Size ${selectedVariant.size}`,
          img: `${API_BASE}/img/${mainImage}`,
          price: priceToUse,
          size: selectedVariant.size,
          quantity: 1,
          variantList: product.variant,
        })
      );

      setAddedToCart(true);
      toast.success("Đã thêm vào giỏ hàng", {
        icon: "🛒",
        style: {
          borderRadius: "12px",
          background: "#10B981",
          color: "#fff",
        },
      });

      // Reset success state after animation
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng");
    } finally {
      setCartLoading(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (wishlistLoading) return;

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      toast.error("Bạn cần đăng nhập để thêm vào wishlist!", {
        style: {
          borderRadius: "12px",
          background: "#EF4444",
          color: "#fff",
        },
      });
      router.push("/login");
      return;
    }

    if (!selectedVariant) return;

    setWishlistLoading(true);

    try {
      const wishlistItem = {
        productId: product.id,
        variantId: selectedVariant.id,
        name: product.name,
        img: `${API_BASE}/img/${mainImage}`,
        price:
          selectedVariant.sale_price && Number(selectedVariant.sale_price) > 0
            ? Number(selectedVariant.sale_price)
            : selectedVariant.price,
        size: selectedVariant.size,
      };

      const result = await dispatch(addToWishlistAPI(wishlistItem));
      if (addToWishlistAPI.fulfilled.match(result)) {
        setAddedToWishlist(true);
        toast.success("Đã thêm vào wishlist 💖", {
          style: {
            borderRadius: "12px",
            background: "#EC4899",
            color: "#fff",
          },
        });
        await dispatch(fetchWishlist());

        // Reset success state after animation
        setTimeout(() => setAddedToWishlist(false), 2000);
      } else {
        toast.error(
          (result.payload as string) || "Có lỗi khi thêm vào wishlist"
        );
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm vào wishlist");
    } finally {
      setWishlistLoading(false);
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

  const isOutOfStock = !selectedVariant || selectedVariant.stock_quantity === 0;

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes bounce {
          0%,
          20%,
          53%,
          80%,
          100% {
            transform: translateY(0);
          }
          40%,
          43% {
            transform: translateY(-8px);
          }
          70% {
            transform: translateY(-4px);
          }
          90% {
            transform: translateY(-2px);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-pulse-gentle {
          animation: pulse 2s infinite;
        }

        .animate-bounce-gentle {
          animation: bounce 1s ease-in-out;
        }

        .card-shadow {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-shadow:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
          transform: translateY(-8px) scale(1.02);
        }

        .gradient-overlay {
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.3) 100%
          );
        }

        .action-button {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .action-button:hover {
          background: rgba(255, 255, 255, 1);
          transform: translateY(-2px) scale(1.1);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .success-button {
          background: linear-gradient(135deg, #10b981, #059669) !important;
          color: white !important;
        }

        .wishlist-success {
          background: linear-gradient(135deg, #ec4899, #be185d) !important;
          color: white !important;
        }

        .image-skeleton {
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        .price-highlight {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .discount-badge {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          animation: pulse 2s infinite;
        }

        .thumbnail-hover {
          transition: all 0.2s ease;
        }

        .thumbnail-hover:hover {
          transform: scale(1.1);
        }
      `}</style>

      <div
        ref={cardRef}
        className={`
          relative border-0 rounded-2xl mt-10 p-6 group bg-white 
          card-shadow overflow-hidden
          ${isOutOfStock ? "opacity-75" : ""}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Stock Status Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-20 rounded-2xl">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
              Hết hàng
            </span>
          </div>
        )}

        <div className="relative overflow-hidden rounded-xl">
          <Link href={`/products/${product.id}`} className="block relative">
            {/* Discount Badge */}
            {discountPercent > 0 && (
              <div className="absolute top-3 left-3 discount-badge text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
                -{discountPercent}%
              </div>
            )}

            {/* Stock Badge */}
            {selectedVariant &&
              selectedVariant.stock_quantity <= 5 &&
              selectedVariant.stock_quantity > 0 && (
                <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow z-10">
                  Còn {selectedVariant.stock_quantity}
                </div>
              )}

            {/* Main Product Image */}
            <div className="relative w-full h-80 bg-gray-50 rounded-xl overflow-hidden">
              {imageLoading && (
                <div className="absolute inset-0 image-skeleton rounded-xl" />
              )}

              {mainImage ? (
                <Image
                  src={`${API_BASE}/img/${mainImage}`}
                  alt={product.name}
                  width={500}
                  height={600}
                  className={`
                    w-full h-full object-cover transition-all duration-500 ease-out
                    ${isHovered ? "scale-110" : "scale-100"}
                    ${imageLoading ? "opacity-0" : "opacity-100"}
                  `}
                  onLoad={() => setImageLoading(false)}
                  unoptimized
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 rounded-xl">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📷</div>
                    <div className="text-sm">No Image</div>
                  </div>
                </div>
              )}

              {/* Gradient Overlay on Hover */}
              <div
                className={`
                absolute inset-0 gradient-overlay transition-opacity duration-300
                ${isHovered ? "opacity-100" : "opacity-0"}
              `}
              />
            </div>
          </Link>

          {/* Action Buttons */}
          <div
            className={`
            absolute top-4 right-4 flex flex-col gap-3 transition-all duration-300 ease-out
            ${
              isHovered
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
            }
          `}
          >
            {/* Add to Cart Button */}
            <button
              className={`
                action-button p-3 rounded-full shadow-lg transition-all duration-300
                ${addedToCart ? "success-button animate-bounce-gentle" : ""}
                ${
                  isOutOfStock
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-110"
                }
              `}
              disabled={!selectedVariant || cartLoading || isOutOfStock}
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              {cartLoading ? (
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              ) : addedToCart ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : (
                <FontAwesomeIcon icon={faCartShopping} />
              )}
            </button>

            {/* Quick View Button */}
            <button
              className="action-button p-3 rounded-full shadow-lg hover:scale-110"
              onClick={() => setShowModal(true)}
              aria-label="View details"
            >
              <FontAwesomeIcon icon={faEye} />
            </button>

            {/* Wishlist Button */}
            <button
              className={`
                action-button p-3 rounded-full shadow-lg transition-all duration-300
                ${
                  addedToWishlist
                    ? "wishlist-success animate-bounce-gentle"
                    : ""
                }
                hover:scale-110
              `}
              onClick={handleAddToWishlist}
              aria-label="Add to wishlist"
              disabled={wishlistLoading}
            >
              {wishlistLoading ? (
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
              ) : addedToWishlist ? (
                <FontAwesomeIcon icon={faCheck} />
              ) : (
                <FontAwesomeIcon icon={faHeart} />
              )}
            </button>
          </div>
        </div>

        {/* Thumbnail Images */}
        <div className="flex gap-3 mt-4">
          {product.img?.slice(0, 3).map((img, idx) => (
            <div
              key={idx}
              className={`
                w-12 h-12 rounded-lg border-2 cursor-pointer thumbnail-hover overflow-hidden
                ${
                  img.name === mainImage
                    ? "border-blue-500 ring-2 ring-blue-200"
                    : "border-gray-200"
                }
              `}
              onMouseEnter={() => handleImageHover(img.name)}
            >
              <Image
                src={`${API_BASE}/img/${img.name}`}
                alt={`variant-${idx}`}
                width={48}
                height={48}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          ))}

          {/* Show more indicator */}
          {product.img && product.img.length > 3 && (
            <div className="w-12 h-12 rounded-lg border-2 border-gray-200 flex items-center justify-center bg-gray-50 text-gray-400 text-xs font-medium cursor-pointer hover:bg-gray-100 transition-colors">
              +{product.img.length - 3}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-5 space-y-2">
          {/* Category */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.category.name}
            </span>
            {selectedVariant && selectedVariant.stock_quantity > 0 && (
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                Còn hàng
              </span>
            )}
          </div>

          {/* Product Name */}
          <Link href={`/products/${product.id}`}>
            <h2 className="text-lg font-bold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
              {product.name}
            </h2>
          </Link>

          {/* Size Info */}
          {selectedVariant && (
            <p className="text-sm text-gray-600">
              Size: <span className="font-medium">{selectedVariant.size}</span>
            </p>
          )}

          {/* Price */}
          <div className="flex items-center gap-3 pt-2">
            {selectedVariant?.sale_price &&
            Number(selectedVariant.sale_price) > 0 ? (
              <>
                <span className="text-xl font-bold price-highlight">
                  {Number(selectedVariant.sale_price).toLocaleString("vi-VN")} ₫
                </span>
                <span className="text-base text-gray-500 line-through">
                  {selectedVariant.price.toLocaleString("vi-VN")} ₫
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900">
                {selectedVariant?.price?.toLocaleString("vi-VN") || "—"} ₫
              </span>
            )}
          </div>

          {/* Stock Status */}
          {selectedVariant && (
            <div className="flex items-center gap-2 text-sm">
              <div
                className={`w-2 h-2 rounded-full ${
                  selectedVariant.stock_quantity > 5
                    ? "bg-green-500"
                    : selectedVariant.stock_quantity > 0
                    ? "bg-orange-500"
                    : "bg-red-500"
                }`}
              />
              <span
                className={`text-sm ${
                  selectedVariant.stock_quantity > 5
                    ? "text-green-600"
                    : selectedVariant.stock_quantity > 0
                    ? "text-orange-600"
                    : "text-red-600"
                }`}
              >
                {selectedVariant.stock_quantity > 5
                  ? "Còn nhiều"
                  : selectedVariant.stock_quantity > 0
                  ? `Còn ${selectedVariant.stock_quantity} sản phẩm`
                  : "Hết hàng"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      {showModal && (
        <ProductModal product={product} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
