"use client";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import {
  Star,
  X,
  ShoppingCart,
  Heart,
  Share2,
  Zap,
  Shield,
  Truck,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import ReactImageMagnify from "react-image-magnify";
import { toast } from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";
import AddToCartModal from "../../components/ui/AddToCartModal";

interface Review {
  id: number;
  rating: number;
  comment: string;
  created_at: string;
  user: {
    id: number;
    name: string;
  };
}
interface ProductDetailClientProps {
  product: Product;
  reviews: Review[];
}
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
  price: number;
  sale_price: string | null;
  stock_quantity: number;
  status: string;
  final_price?: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  status: string;
  category: { id: number; name: string };
  img: ProductImage[];
  variant: ProductVariant[];
  images: string[];
}

function getColorByName(name: string): string {
  const colors = [
    "bg-gradient-to-br from-red-500 to-pink-600",
    "bg-gradient-to-br from-blue-500 to-indigo-600",
    "bg-gradient-to-br from-green-500 to-emerald-600",
    "bg-gradient-to-br from-purple-500 to-violet-600",
    "bg-gradient-to-br from-pink-500 to-rose-600",
    "bg-gradient-to-br from-indigo-500 to-blue-600",
    "bg-gradient-to-br from-yellow-500 to-orange-600",
    "bg-gradient-to-br from-rose-500 to-pink-600",
    "bg-gradient-to-br from-teal-500 to-cyan-600",
    "bg-gradient-to-br from-cyan-500 to-blue-600",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

function getEffectivePrice(variant: ProductVariant) {
  if (variant.final_price && variant.final_price > 0) {
    return variant.final_price;
  }
  if (variant.sale_price && Number(variant.sale_price) > 0) {
    return Number(variant.sale_price);
  }
  return variant.price;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.8,
    },
  },
};

const priceAnimationVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};

export default function ProductDetailClient({
  product,
  reviews: initialReviews,
}: ProductDetailClientProps) {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState(initialReviews);
  const [mainImg, setMainImg] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [showModal, setShowModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [hoveredStars, setHoveredStars] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const reviewRef = useRef(null);
  const isInViewRef = useInView(reviewRef);

  // Auto-cycle through images with smooth transitions
  const nextImage = useCallback(() => {
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex((prev) => {
        const nextIndex = (prev + 1) % product.images.length;
        setMainImg(product.images[nextIndex]);
        return nextIndex;
      });
    }
  }, [product.images]);

  const prevImage = useCallback(() => {
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex((prev) => {
        const prevIndex = prev === 0 ? product.images.length - 1 : prev - 1;
        setMainImg(product.images[prevIndex]);
        return prevIndex;
      });
    }
  }, [product.images]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay && product.images && product.images.length > 1) {
      intervalRef.current = setInterval(nextImage, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlay, nextImage, product.images]);

  // Initialize main image
  useEffect(() => {
    if (product.images && product.images.length > 0) {
      setMainImg(product.images[0]);
      setCurrentImageIndex(0);
    } else if (product.img && product.img.length > 0) {
      setMainImg(`/img/${product.img[0].name}`);
    }
    if (product.variant.length > 0) {
      setSelectedVariant(product.variant[0]);
    }
  }, [product]);

  const handleImageClick = (imgUrl: string, index: number) => {
    setIsImageLoading(true);
    setMainImg(imgUrl);
    setCurrentImageIndex(index);
    setIsAutoPlay(false);
    // Resume autoplay after 8 seconds
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const handleVariantSelect = (v: ProductVariant) => {
    setSelectedVariant(v);
    setQuantity(1);

    if (
      product.images &&
      product.images.length > 0 &&
      product.img &&
      product.img.length > 0
    ) {
      const foundIndex = product.img.findIndex((img) => img.id === v.img_id);
      if (foundIndex !== -1 && foundIndex < product.images.length) {
        setMainImg(product.images[foundIndex]);
        setCurrentImageIndex(foundIndex);
        return;
      }
    }

    if (product.images && product.images.length > 0) {
      setMainImg(product.images[0]);
      setCurrentImageIndex(0);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error("Vui lòng chọn kích thước", {
        icon: "⚠️",
        style: {
          borderRadius: "16px",
          background: "#FEF2F2",
          color: "#DC2626",
          border: "1px solid #FECACA",
        },
      });
      return;
    }
    dispatch(
      addToCart({
        productId: product.id,
        variantId: selectedVariant.id,
        name: product.name,
        img: mainImg,
        price: getEffectivePrice(selectedVariant),
        sale_price: selectedVariant.sale_price,
        size: selectedVariant.size,
        quantity,
        variantList: product.variant,
      })
    );
    toast.success("Đã thêm vào giỏ hàng!", {
      icon: "🛒",
      style: {
        borderRadius: "16px",
        background: "#F0FDF4",
        color: "#16A34A",
        border: "1px solid #BBF7D0",
      },
    });
    setShowModal(true);
  };

  const handleSubmitReview = async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      toast.error("Bạn cần đăng nhập để bình luận!");
      return;
    }
    if (!comment.trim()) {
      toast.error("Vui lòng nhập nội dung bình luận!");
      return;
    }
    try {
      const res = await fetch("http://127.0.0.1:8000/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: product.id,
          rating,
          comment,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Đánh giá thành công!", {
          icon: "⭐",
          style: {
            borderRadius: "16px",
            background: "#F0FDF4",
            color: "#16A34A",
          },
        });
        setComment("");
        await fetchReviews();
      } else {
        toast.error(data.message || "Có lỗi khi gửi đánh giá");
      }
    } catch {
      toast.error("Có lỗi khi gửi đánh giá");
    }
  };

  const fetchReviews = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/review/${product.id}`);
    const data = await res.json();
    setReviews(data.data);
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getDiscountPercentage = (variant: ProductVariant) => {
    if (variant.sale_price && Number(variant.sale_price) > 0) {
      return Math.round((1 - Number(variant.sale_price) / variant.price) * 100);
    }
    return 0;
  };

  return (
    <>
      <motion.div
        className="w-full sm:px-6  lg:px-20  py-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row gap-6"
          >
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible md:max-h-[600px] scrollbar-thin pr-1">
              {(product.images || []).map((imgUrl, idx) => {
                const isActive = currentImageIndex === idx;
                return (
                  <motion.div
                    key={imgUrl}
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                      isActive
                        ? "ring-4 ring-blue-500/50 shadow-xl shadow-blue-200/50"
                        : "ring-2 ring-gray-200 hover:ring-gray-300 shadow-md hover:shadow-lg"
                    }`}
                    onClick={() => handleImageClick(imgUrl, idx)}
                    layout
                  >
                    <Image
                      src={imgUrl}
                      alt={`Thumbnail ${idx}`}
                      width={90}
                      height={90}
                      className="object-cover w-[90px] h-[90px] rounded-2xl"
                      unoptimized
                    />
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent rounded-2xl"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                    <div className="absolute bottom-1 right-1">
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isActive ? "bg-blue-500 shadow-lg" : "bg-gray-300"
                        }`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Main image */}
            <motion.div
              variants={imageVariants}
              className="relative w-full bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Image navigation */}
              {product.images && product.images.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1, x: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <ChevronLeft size={20} className="text-gray-700" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, x: 2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <ChevronRight size={20} className="text-gray-700" />
                  </motion.button>
                </>
              )}

              {/* Action buttons */}
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300"
                >
                  <Heart
                    size={20}
                    className={`transition-all duration-300 ${
                      isLiked
                        ? "text-red-500 fill-red-500 animate-pulse"
                        : "text-gray-600 hover:text-red-400"
                    }`}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
                >
                  <Share2
                    size={20}
                    className="text-gray-600 hover:text-blue-500 transition-colors"
                  />
                </motion.button>
              </div>

              {/* Auto-play indicator */}
              {product.images && product.images.length > 1 && (
                <motion.div
                  className="absolute bottom-4 left-4 z-10"
                  animate={isAutoPlay ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                      isAutoPlay
                        ? "bg-green-500/90 text-white shadow-lg"
                        : "bg-gray-500/90 text-white"
                    }`}
                  >
                    {isAutoPlay ? (
                      <>
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span>Auto Play</span>
                      </>
                    ) : (
                      <>
                        <div className="w-2 h-2 bg-white rounded-full" />
                        <span>Paused</span>
                      </>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Progress indicator */}
              {product.images && product.images.length > 1 && (
                <div className="absolute bottom-4 right-4 z-10">
                  <div className="flex gap-1">
                    {product.images.map((_, idx) => (
                      <motion.div
                        key={idx}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          idx === currentImageIndex
                            ? "w-8 bg-white shadow-lg"
                            : "w-2 bg-white/50"
                        }`}
                        whileHover={{ scale: 1.2 }}
                        onClick={() =>
                          handleImageClick(product.images[idx], idx)
                        }
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Main image with loading state */}
              <div className="relative aspect-square">
                {mainImg ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={mainImg}
                      initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 1.1, rotateY: -15 }}
                      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                      className="w-full h-full relative"
                      onAnimationStart={() => setIsImageLoading(true)}
                      onAnimationComplete={() => setIsImageLoading(false)}
                    >
                      <ReactImageMagnify
                        {...{
                          smallImage: {
                            alt: product.name,
                            isFluidWidth: true,
                            src: mainImg,
                          },
                          largeImage: {
                            src: mainImg,
                            width: 1200,
                            height: 1800,
                          },
                          enlargedImageContainerStyle: { zIndex: 999 },
                          enlargedImageContainerClassName: "rounded-2xl",
                        }}
                      />
                      {isImageLoading && (
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-3xl" />
                      )}
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          ease: "linear",
                        }}
                      />
                      <p className="text-gray-500 font-medium">Loading...</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Product Info */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            {/* Header */}
            <div className="space-y-4">
              <motion.h1
                className="text-2xl lg:text-3xl
font-bold tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                {product.name}
              </motion.h1>

              <motion.div
                className="flex items-center gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={`transition-all duration-300 ${
                          i < Math.floor(Number(calculateAverageRating()))
                            ? "text-yellow-400 fill-yellow-400 drop-shadow-sm"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600 font-medium">
                    {calculateAverageRating()} ({reviews.length} đánh giá)
                  </span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <motion.span
                  className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm font-semibold border border-blue-200"
                  whileHover={{ scale: 1.05 }}
                >
                  {product.category.name}
                </motion.span>
              </motion.div>

              <motion.p
                className="text-gray-600 leading-relaxed text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {product.description}
              </motion.p>
            </div>

            {/* Trust Badges */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(34, 197, 94, 0.15)",
                }}
              >
                <Shield size={18} className="text-green-600" />
                <span className="text-sm text-green-700 font-semibold">
                  Bảo hành 12 tháng
                </span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(59, 130, 246, 0.15)",
                }}
              >
                <Truck size={18} className="text-blue-600" />
                <span className="text-sm text-blue-700 font-semibold">
                  Giao hàng miễn phí
                </span>
              </motion.div>
              {/* <motion.div
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl border border-purple-200"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(147, 51, 234, 0.15)",
                }}
              >
                <Eye size={18} className="text-purple-600" />
                <span className="text-sm text-purple-700 font-semibold">
                  Đã xem: {Math.floor(Math.random() * 100) + 50}
                </span>
              </motion.div> */}
            </motion.div>

            {/* Size Selection */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold text-gray-900">
                  Chọn kích thước:
                </p>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <motion.button
                      className="text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-all duration-300 flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span>Bảng Size</span>
                      <ChevronRight size={16} />
                    </motion.button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
                    <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[90vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 bg-white px-8 py-6 rounded-3xl shadow-2xl">
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <div className="flex justify-between items-center border-b pb-4 mb-6">
                          <Dialog.Title className="text-2xl font-bold text-gray-900">
                            Bảng thông tin chi tiết
                          </Dialog.Title>
                          <Dialog.Close asChild>
                            <motion.button
                              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-200"
                              whileHover={{ scale: 1.1, rotate: 90 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <X size={24} />
                            </motion.button>
                          </Dialog.Close>
                        </div>

                        <div className="overflow-auto rounded-2xl border border-gray-200 shadow-lg max-h-[60vh]">
                          <table className="min-w-full text-sm">
                            <thead className="bg-gradient-to-r from-gray-50 via-white to-gray-50">
                              <tr>
                                <th className="px-6 py-4 text-left font-bold text-gray-900 border-b-2 border-gray-200">
                                  Size
                                </th>
                                <th className="px-6 py-4 text-right font-bold text-gray-900 border-b-2 border-gray-200">
                                  Giá gốc
                                </th>
                                <th className="px-6 py-4 text-right font-bold text-gray-900 border-b-2 border-gray-200">
                                  Giá khuyến mãi
                                </th>
                                <th className="px-6 py-4 text-center font-bold text-gray-900 border-b-2 border-gray-200">
                                  Số lượng
                                </th>
                                <th className="px-6 py-4 text-center font-bold text-gray-900 border-b-2 border-gray-200">
                                  Trạng thái
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {product.variant.map((v, index) => (
                                <motion.tr
                                  key={v.id}
                                  className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                  whileHover={{ scale: 1.01 }}
                                >
                                  <td className="px-6 py-4 border-b border-gray-100">
                                    <span className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full font-semibold text-gray-800">
                                      Size {v.size}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-right border-b border-gray-100 font-semibold">
                                    {v.price.toLocaleString("vi-VN")} ₫
                                  </td>
                                  <td className="px-6 py-4 text-right border-b border-gray-100">
                                    {v.sale_price ? (
                                      <span className="text-red-600 font-bold">
                                        {parseInt(v.sale_price).toLocaleString(
                                          "vi-VN"
                                        )}{" "}
                                        ₫
                                      </span>
                                    ) : (
                                      <span className="text-gray-400">-</span>
                                    )}
                                  </td>
                                  <td className="px-6 py-4 text-center border-b border-gray-100">
                                    <span
                                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        v.stock_quantity > 10
                                          ? "bg-green-100 text-green-700"
                                          : v.stock_quantity > 0
                                          ? "bg-yellow-100 text-yellow-700"
                                          : "bg-red-100 text-red-700"
                                      }`}
                                    >
                                      {v.stock_quantity}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-center border-b border-gray-100">
                                    <span
                                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        v.status === "còn hàng"
                                          ? "bg-green-100 text-green-700"
                                          : "bg-red-100 text-red-700"
                                      }`}
                                    >
                                      {v.status}
                                    </span>
                                  </td>
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
              </div>

              <div className="flex flex-wrap gap-3">
                {product.variant.map((v, index) => {
                  const isSelected = selectedVariant?.size === v.size;
                  const isOutOfStock = v.stock_quantity === 0;
                  const isLowStock =
                    v.stock_quantity <= 5 && v.stock_quantity > 0;
                  return (
                    <motion.button
                      key={v.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.1 * index,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={
                        !isOutOfStock
                          ? {
                              scale: 1.05,
                              y: -4,
                              boxShadow: "0 10px 25px rgba(59, 130, 246, 0.25)",
                            }
                          : {}
                      }
                      whileTap={!isOutOfStock ? { scale: 0.95 } : {}}
                      onClick={() => {
                        if (!isOutOfStock) {
                          handleVariantSelect(v);
                        }
                      }}
                      className={`relative px-6 py-4 rounded-2xl text-sm font-bold border-2 transition-all duration-300 ${
                        isSelected
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-500 shadow-lg shadow-blue-200"
                          : isOutOfStock
                          ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                          : "bg-white text-blue-600 border-blue-200 hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                      }`}
                      disabled={isOutOfStock}
                    >
                      <span>Size {v.size}</span>
                      {isOutOfStock && (
                        <motion.div
                          className="absolute inset-0 bg-gray-200/80 rounded-2xl flex items-center justify-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <span className="text-xs font-bold text-gray-500">
                            Hết hàng
                          </span>
                        </motion.div>
                      )}
                      {isLowStock && !isSelected && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                      )}
                      {getDiscountPercentage(v) > 0 && (
                        <motion.div
                          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                          initial={{ scale: 0, rotate: -12 }}
                          animate={{ scale: 1, rotate: -12 }}
                          transition={{
                            delay: 0.3,
                            type: "spring",
                            stiffness: 200,
                          }}
                        >
                          -{getDiscountPercentage(v)}%
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Price and Variant Info */}
            <AnimatePresence>
              {selectedVariant && (
                <motion.div
                  className="p-6 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 rounded-3xl border-2 border-blue-100 shadow-lg"
                  variants={priceAnimationVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  layout
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <motion.p
                        className="text-3xl font-bold text-gray-900"
                        key={selectedVariant.id}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                        }}
                      >
                        {getEffectivePrice(selectedVariant).toLocaleString(
                          "vi-VN"
                        )}{" "}
                        ₫
                      </motion.p>
                      <AnimatePresence>
                        {selectedVariant.sale_price &&
                          Number(selectedVariant.sale_price) > 0 && (
                            <motion.div
                              className="flex items-center gap-3 mt-2"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                            >
                              <span className="text-sm text-gray-500 line-through">
                                {selectedVariant.price.toLocaleString("vi-VN")}{" "}
                                ₫
                              </span>
                              <motion.span
                                className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-sm font-bold shadow-lg"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                              >
                                -{getDiscountPercentage(selectedVariant)}%
                              </motion.span>
                            </motion.div>
                          )}
                      </AnimatePresence>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 font-medium">
                        Còn lại
                      </p>
                      <motion.p
                        className={`text-xl font-bold ${
                          selectedVariant.stock_quantity > 10
                            ? "text-green-600"
                            : selectedVariant.stock_quantity > 0
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                        animate={
                          selectedVariant.stock_quantity <= 5
                            ? { scale: [1, 1.1, 1] }
                            : {}
                        }
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        {selectedVariant.stock_quantity}
                      </motion.p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-blue-200">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-700 font-semibold text-lg">
                        Số lượng:
                      </span>
                      <div className="flex items-center bg-white border-2 border-blue-200 rounded-2xl overflow-hidden shadow-md">
                        <motion.button
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "#EFF6FF",
                          }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="px-5 py-3 hover:bg-blue-50 text-gray-700 font-bold transition-all duration-200"
                          disabled={quantity <= 1}
                        >
                          -
                        </motion.button>
                        <motion.span
                          className="px-8 py-3 font-bold text-gray-900 text-lg min-w-[80px] text-center bg-gradient-to-r from-blue-50 to-indigo-50"
                          key={quantity}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.2 }}
                        >
                          {quantity}
                        </motion.span>
                        <motion.button
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "#EFF6FF",
                          }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            setQuantity((q) =>
                              Math.min(selectedVariant.stock_quantity, q + 1)
                            )
                          }
                          className="px-5 py-3 hover:bg-blue-50 text-gray-700 font-bold transition-all duration-200"
                          disabled={quantity >= selectedVariant.stock_quantity}
                        >
                          +
                        </motion.button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 font-medium">
                        Tổng cộng
                      </p>
                      <motion.p
                        className="text-2xl font-bold text-blue-600"
                        key={quantity * getEffectivePrice(selectedVariant)}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.3 }}
                      >
                        {(
                          getEffectivePrice(selectedVariant) * quantity
                        ).toLocaleString("vi-VN")}{" "}
                        ₫
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
                  y: -2,
                }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 relative bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  >
                    <ShoppingCart size={24} />
                  </motion.div>
                  <span>Thêm vào giỏ hàng</span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Zap size={20} />
                  </motion.div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
                  y: -2,
                  backgroundColor: "#F3F4F6",
                }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-5 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg"
              >
                Mua ngay
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Review Section */}
        <motion.div
          ref={reviewRef}
          initial={{ opacity: 0, y: 60 }}
          animate={isInViewRef ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 space-y-10"
        >
          {/* Write Review */}
          <div className="bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/50 rounded-3xl p-8 border-2 border-blue-100 shadow-xl">
            <motion.h2
              className="text-2xl font-bold mb-8 text-gray-900 flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={
                isInViewRef ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
              }
              transition={{ delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Star size={24} className="text-white fill-white" />
              </div>
              Viết đánh giá của bạn
            </motion.h2>

            <div className="space-y-8">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Đánh giá của bạn:
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      whileHover={{ scale: 1.3, rotate: 15 }}
                      whileTap={{ scale: 1.5, rotate: -15 }}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredStars(star)}
                      onMouseLeave={() => setHoveredStars(0)}
                      className="p-2 rounded-full hover:bg-yellow-50 transition-all duration-200"
                    >
                      <Star
                        size={36}
                        className={`transition-all duration-300 ${
                          (hoveredStars > 0
                          ? star <= hoveredStars
                          : rating >= star)
                            ? "text-yellow-400 fill-yellow-400 drop-shadow-lg"
                            : "text-gray-300 hover:text-yellow-200"
                        }`}
                      />
                    </motion.button>
                  ))}
                  <span className="ml-4 text-lg text-gray-600 font-semibold">
                    ({hoveredStars > 0 ? hoveredStars : rating} sao)
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Nhận xét của bạn:
                </label>
                <motion.textarea
                  initial={{ scale: 0.98, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="w-full border-2 border-blue-200 rounded-2xl p-6 text-base focus:outline-none focus:ring-4 focus:ring-blue-500/25 focus:border-blue-500 transition-all duration-300 resize-none shadow-lg hover:shadow-xl bg-white"
                  rows={5}
                  placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 15px 35px rgba(59, 130, 246, 0.4)",
                  y: -2,
                }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmitReview}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300"
              >
                Gửi đánh giá
              </motion.button>
            </div>
          </div>

          {/* Reviews Display */}
          <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl">
            <div className="flex items-center justify-between mb-10">
              <motion.h2
                className="text-2xl font-bold text-gray-900 flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={
                  isInViewRef ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                transition={{ delay: 0.4 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  💬
                </div>
                Đánh giá từ khách hàng
              </motion.h2>
              {reviews.length > 0 && (
                <motion.div
                  className="text-right"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInViewRef
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-3 justify-end">
                    <Star
                      size={24}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="text-3xl font-bold text-gray-900">
                      {calculateAverageRating()}
                    </span>
                  </div>
                  <p className="text-lg text-gray-600 font-medium">
                    {reviews.length} đánh giá
                  </p>
                </motion.div>
              )}
            </div>

            {reviews.length === 0 ? (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  isInViewRef
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="w-32 h-32 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 20,
                    ease: "linear",
                  }}
                >
                  <Star size={48} className="text-gray-400" />
                </motion.div>
                <p className="text-gray-500 text-2xl font-semibold mb-2">
                  Chưa có đánh giá nào...
                </p>
                <p className="text-gray-400 text-lg">
                  Hãy là người đầu tiên đánh giá sản phẩm này!
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={
                      isInViewRef
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 30, scale: 0.9 }
                    }
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{
                      y: -8,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                      scale: 1.02,
                    }}
                    className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-3xl p-6 shadow-lg transition-all duration-500 hover:border-blue-200"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        className={`w-14 h-14 rounded-2xl ${getColorByName(
                          review.user.name
                        )} text-white flex items-center justify-center font-bold text-xl shadow-xl`}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {review.user.name.charAt(0)}
                      </motion.div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 text-lg">
                          {review.user.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString(
                            "vi-VN"
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-6">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: i * 0.1 + 0.5,
                            type: "spring",
                            stiffness: 200,
                          }}
                        >
                          <Star
                            size={20}
                            className="text-yellow-400 fill-yellow-400 drop-shadow-sm"
                          />
                        </motion.div>
                      ))}
                      {Array.from({ length: 5 - review.rating }).map((_, i) => (
                        <Star key={i} size={20} className="text-gray-300" />
                      ))}
                    </div>

                    <p className="text-gray-700 leading-relaxed text-base line-clamp-4">
                      {review.comment}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced Modal */}
      <AddToCartModal
        open={showModal}
        onClose={() => setShowModal(false)}
        productName={product.name}
        quantity={quantity}
        price={selectedVariant ? getEffectivePrice(selectedVariant) : 0}
        salePrice={selectedVariant?.sale_price}
        image={mainImg}
      />

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-200%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e0 #f7fafc;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f7fafc;
          border-radius: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #cbd5e0, #a0aec0);
          border-radius: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #a0aec0, #718096);
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
