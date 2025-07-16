"use client";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { Star, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ReactImageMagnify from "react-image-magnify";
import { toast } from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";
import AddToCartModal from "../../components/ui/AddToCartModal";
import { useRouter } from "next/navigation";

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
}

interface Product {
  id: number;
  name: string;
  description: string;
  status: string;
  category: { id: number; name: string };
  img: ProductImage[];
  variant: ProductVariant[];
}

function getColorByName(name: string): string {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-rose-500",
    "bg-teal-500",
    "bg-cyan-500",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}
function getEffectivePrice(variant: ProductVariant & { final_price?: number }) {
  if (variant.final_price && variant.final_price > 0) {
    return variant.final_price;
  }
  if (variant.sale_price && Number(variant.sale_price) > 0) {
    return Number(variant.sale_price);
  }
  return variant.price;
}
export default function ProductDetailClient({
  product,
  reviews: initialReviews, // Đổi tên prop reviews thành initialReviews
}: ProductDetailClientProps) {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const router = useRouter();
  const [reviews, setReviews] = useState(initialReviews);
  const [mainImg, setMainImg] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (product.variant.length > 0) {
      const firstVariant = product.variant[0];
      setSelectedVariant(firstVariant);
      const matchedImg = product.img.find(
        (img) => img.id === firstVariant.img_id
      );
      if (matchedImg) {
        setMainImg(matchedImg.name);
      } else {
        setMainImg(product.img[0]?.name || "");
      }
    } else {
      setMainImg(product.img[0]?.name || "");
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error("Vui lòng chọn kích thước");
      return;
    }

    dispatch(
      addToCart({
        productId: product.id,
        variantId: selectedVariant.id,
        name: product.name,
        img: `/img/${mainImg}`,
        price: getEffectivePrice(selectedVariant),
        sale_price: selectedVariant.sale_price,
        size: selectedVariant.size,
        quantity,
        variantList: product.variant,
      })
    );

    setShowModal(true);
  };
  const handleSubmitReview = async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      toast.error("Bạn cần đăng nhập để bình luận!");
      // router.push("/login");
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
        toast.success("Đánh giá thành công!");
        setComment("");
        await fetchReviews(); // Cập nhật lại reviews mới nhất
        // Gọi lại API lấy review mới nếu cần
        // await fetchReviews();
      } else {
        toast.error(data.message || "Có lỗi khi gửi đánh giá");
      }
    } catch (err) {
      toast.error("Có lỗi khi gửi đánh giá");
    }
  };
  const fetchReviews = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/review/${product.id}`);
    const data = await res.json();
    setReviews(data.data);
  };
  return (
    <>
      <div className="w-full px-40 py-8 max-w-7xl ">
        {/* <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 py-8 max-w-7xl mx-auto"> */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible md:max-h-[500px] scrollbar-thin pr-1">
              {product.img.map((img) => {
                const isActive = mainImg === img.name;
                return (
                  <motion.div
                    key={img.id}
                    whileHover={{ scale: 1.05 }}
                    className={`rounded-xl overflow-hidden border-2 cursor-pointer ${
                      isActive ? "border-blue-500 shadow-md" : "border-gray-200"
                    }`}
                    onClick={() => setMainImg(img.name)}
                  >
                    <Image
                      src={`/img/${img.name}`}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="object-cover w-20 h-20 rounded-xl"
                    />
                  </motion.div>
                );
              })}
            </div>

            <div className="w-full flex items-center justify-center border rounded-2xl overflow-hidden">
              {mainImg ? (
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: product.name,
                      isFluidWidth: true,
                      src: `/img/${mainImg}`,
                    },
                    largeImage: {
                      src: `/img/${mainImg}`,
                      width: 1200,
                      height: 1800,
                    },
                    enlargedImageContainerStyle: { zIndex: 999 },
                  }}
                />
              ) : (
                <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <h1 className="text-3xl font-bold tracking-tight">
              {product.name}
            </h1>
            <p className="text-gray-500">{product.description}</p>
            <p className="text-gray-400">Danh mục: {product.category.name}</p>
            <div>
              <p className="font-medium mb-1">Chọn kích thước:</p>
              <div className="flex flex-wrap gap-3">
                {product.variant.map((v) => {
                  const isSelected = selectedVariant?.size === v.size;
                  return (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      key={v.id}
                      onClick={() => {
                        if (v.stock_quantity > 0) {
                          setSelectedVariant(v);
                          setQuantity(1);
                          const matchedImg = product.img.find(
                            (img) => img.id === v.img_id
                          );
                          if (matchedImg) setMainImg(matchedImg.name);
                        }
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200
            ${
              isSelected
                ? "bg-[#FF5722] text-white border-[#FF5722] shadow-md"
                : "bg-white text-[#FF5722] border-[#FF5722] hover:bg-[#FF5722]/10"
            }
            ${
              v.stock_quantity === 0
                ? "opacity-40 cursor-not-allowed"
                : "cursor-pointer"
            }`}
                    >
                      Size {v.size}
                    </motion.button>
                  );
                })}
              </div>
            </div>
            {selectedVariant && (
              <>
                <p>
                  <strong>Giá:</strong>{" "}
                  <span className="text-blue-600 text-lg font-semibold">
                    {getEffectivePrice(selectedVariant).toLocaleString("vi-VN")}{" "}
                    ₫
                  </span>
                  {selectedVariant.sale_price &&
                    Number(selectedVariant.sale_price) > 0 && (
                      <span className="ml-2 text-gray-500 line-through text-base">
                        {selectedVariant.price.toLocaleString("vi-VN")} ₫
                      </span>
                    )}
                </p>
                <p>
                  <strong>Số lượng còn:</strong>{" "}
                  {selectedVariant.stock_quantity}
                </p>
                <p>
                  <strong>Trạng thái:</strong>{" "}
                  <span
                    className={
                      selectedVariant.status === "còn hàng"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {selectedVariant.status}
                  </span>
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <p className="font-medium">Số lượng:</p>
                  <div className="flex items-center border rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-lg"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4">{quantity}</span>
                    <button
                      onClick={() =>
                        setQuantity((q) =>
                          Math.min(selectedVariant.stock_quantity, q + 1)
                        )
                      }
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-lg"
                      disabled={quantity >= selectedVariant.stock_quantity}
                    >
                      +
                    </button>
                  </div>
                </div>
              </>
            )}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="bg-[#FF5722] hover:bg-[#F44336] text-white px-6 py-3 rounded-2xl text-sm font-medium shadow-md transition-colors duration-200"
              >
                Thêm vào giỏ hàng
              </motion.button>
            </div>
          </div>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-black hover:underline transition">
                Bảng Size
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" />
              <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[90vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-4 rounded-xl shadow-xl space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <Dialog.Title className="text-lg font-semibold">
                    Danh sách biến thể
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="text-gray-500 hover:text-black">
                      <X size={20} />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm max-h-[60vh]">
                  <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-700">
                      <tr>
                        <th className="px-4 py-3 border">Size</th>
                        <th className="px-4 py-3 border">Giá</th>
                        <th className="px-4 py-3 border">Giá khuyến mãi</th>
                        <th className="px-4 py-3 border">Số lượng</th>
                        <th className="px-4 py-3 border">Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.variant.map((v) => (
                        <tr key={v.id} className="even:bg-gray-50">
                          <td className="px-4 py-2 border">{v.size}</td>
                          <td className="px-4 py-2 border text-right">
                            {v.price.toLocaleString("vi-VN")} ₫
                          </td>
                          <td className="px-4 py-2 border text-right">
                            {v.sale_price
                              ? parseInt(v.sale_price).toLocaleString("vi-VN") +
                                " ₫"
                              : "-"}
                          </td>
                          <td className="px-4 py-2 border text-center">
                            {v.stock_quantity}
                          </td>
                          <td className="px-4 py-2 border text-center">
                            {v.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-6 text-gray-900">
            Viết đánh giá của bạn
          </h2>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-gray-700">Chọn sao:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                className={`cursor-pointer transition-colors ${
                  rating >= star
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                } hover:scale-110`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <textarea
            className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            rows={3}
            placeholder="Nhập bình luận của bạn..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition"
            onClick={handleSubmitReview}
          >
            Gửi đánh giá
          </button>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-6 text-gray-900">
            💬 Đánh giá từ khách hàng
          </h2>

          {reviews.length === 0 ? (
            <p className="text-gray-500 text-sm italic">
              Chưa có đánh giá nào...
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-lg transition"
                >
                  {/* Avatar + Info */}
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-10 h-10 rounded-full ${getColorByName(
                        review.user.name
                      )} text-white flex items-center justify-center font-semibold text-sm`}
                    >
                      {review.user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {review.user.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(review.created_at).toLocaleDateString(
                          "vi-VN"
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Star rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    ))}
                    {Array.from({ length: 5 - review.rating }).map((_, i) => (
                      <Star key={i} size={18} className="text-gray-300" />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AddToCartModal
        open={showModal}
        onClose={() => setShowModal(false)}
        productName={product.name}
        quantity={quantity}
        price={selectedVariant ? getEffectivePrice(selectedVariant) : 0}
        salePrice={selectedVariant?.sale_price}
        image={mainImg}
      />
    </>
  );
}
