"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDarkMode } from "../../types/useDarkMode";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  Brain,
  MessageCircle,
  Trash2,
  Sun,
  Moon,
  Minus,
  X,
  Bot,
  Smile,
  Heart,
  Send,
  Loader2,
  Sparkles,
  Briefcase,
  Waves,
  Palette,
  ShoppingCart,
  Eye,
} from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";
import { addToWishlistAPI, fetchWishlist } from "@/store/wishlistSlice";
import { useRouter } from "next/navigation";

const aiAvatar = "http://localhost:8000/img/ai-avatar.webp";

type ProductVariant = {
  id: number;
  product_id: number;
  img_id: number;
  size: string;
  color?: string;
  price: number;
  sale_price: string | null;
  stock_quantity: number;
  status: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  images: string[];
  variant: ProductVariant[];
  category: {
    id: number;
    name: string;
  };
};

type Message = {
  type: "user" | "bot";
  text: string;
  products?: Product[];
  style_name?: string;
  description?: string;
  keywords?: string[];
  mix_and_match?: string[];
  timestamp?: Date;
};

type UserInfo = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string | null;
};

export default function ChatBox({ onClose }: { onClose: () => void }) {
  const [darkMode, setDarkMode] = useDarkMode();
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("chat_messages");
    return saved
      ? JSON.parse(saved)
      : [
          {
            type: "bot",
            text: "🎉 Xin chào! Mình là stylist AI. Bạn cần tư vấn gì hôm nay?",
            timestamp: new Date(),
          },
        ];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollToBottom();
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
      }
    }
  }, []);

  const handleAddToCart = (product: Product) => {
    const selectedVariant = product.variant?.[0];
    if (!selectedVariant) {
      toast.error("Không có biến thể sản phẩm!");
      return;
    }

    const priceToUse =
      selectedVariant.sale_price && Number(selectedVariant.sale_price) > 0
        ? Number(selectedVariant.sale_price)
        : selectedVariant.price;

    dispatch(
      addToCart({
        productId: product.id,
        variantId: selectedVariant.id,
        name: `${product.name} - Size ${selectedVariant.size}`,
        img: product.images?.[0] || "/img/no-image.jpg",
        price: priceToUse,
        size: selectedVariant.size,
        quantity: 1,
        variantList: product.variant,
      })
    );

    toast.success("Đã thêm vào giỏ hàng");
  };

  const handleAddToWishlist = async (product: Product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Bạn cần đăng nhập để thêm vào wishlist!");
      router.push("/login");
      return;
    }

    const selectedVariant = product.variant?.[0];
    if (!selectedVariant) {
      toast.error("Không có biến thể sản phẩm!");
      return;
    }

    const wishlistItem = {
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      img: product.images?.[0] || "/img/no-image.jpg",
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

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      type: "user",
      text: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setIsTyping(true);

    try {
      setTimeout(async () => {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/stylist/analyze",
          {
            answers: [input],
          }
        );

        let reply = res.data.message || "🤖 Xin lỗi, mình chưa rõ gu bạn. Hỏi lại nhé?";
        let products = res.data.products || [];
        let style_name = res.data.style_name;
        let description = res.data.description;
        let keywords = res.data.keywords;
        let mix_and_match = res.data.mix_and_match;

        // Xử lý câu hỏi về size
        if (input.match(/size\s+\w+|cỡ\s+\w+/iu)) {
          if (products.length > 0) {
            reply = res.data.message || `Tìm thấy sản phẩm ${products[0].name}!`;
          } else {
            reply = res.data.message || "Không tìm thấy sản phẩm hoặc size yêu cầu!";
          }
        }
        // Xử lý câu hỏi về phối đồ
        else if (input.match(/(phối đồ|set đồ|đi chơi|du lịch|outfit|mix and match)/iu)) {
          reply = style_name
            ? `🎯 Phong cách phù hợp: ${style_name}\n${description || ""}`
            : res.data.message;
          if (mix_and_match && mix_and_match.length > 0) {
            reply += `\nGợi ý phối đồ: ${mix_and_match.join(", ")}`;
          }
        }
        // Xử lý câu hỏi về giảm giá/flash sale
        else if (input.match(/(giảm giá|flash sale|ưu đãi)/iu)) {
          reply = res.data.message;
        }

        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: reply,
            products,
            style_name,
            description,
            keywords,
            mix_and_match,
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
        setLoading(false);
      }, 1000);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "❌ Không thể kết nối đến hệ thống. Vui lòng thử lại.",
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        type: "bot",
        text: "🎉 Xin chào! Mình là stylist AI. Bạn cần tư vấn gì hôm nay?",
        timestamp: new Date(),
      },
    ]);
  };

  const quickReplies = [
    { text: "Phong cách nữ tính" },
    { text: "Trang phục công sở", icon: <Briefcase size={16} /> },
    { text: "Outfit đi biển", icon: <Waves size={16} /> },
    { text: "Phối đồ đi học giúp tôi", icon: <Palette size={16} /> },
  ];

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-20 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center animate-bounce"
        >
          <MessageCircle size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 w-[90vw] max-w-[400px] max-h-[600px] rounded-3xl shadow-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex flex-col z-50 overflow-hidden backdrop-blur-sm transition-all duration-300 transform animate-slideIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-pink-500 dark:from-orange-700 dark:via-orange-800 dark:to-pink-700 text-white px-6 py-5 font-semibold text-lg flex justify-between items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="relative">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Brain size={20} />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div>
            <div className="font-bold">Trợ lý AI</div>
            <div className="text-xs opacity-90">
              {isTyping ? "đang nhập..." : "trực tuyến"}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 relative z-10">
          <button
            onClick={clearChat}
            title="Xóa cuộc trò chuyện"
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-all"
          >
            <Trash2 size={18} />
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            title="Bật/Tắt chế độ tối"
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-all"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            title="Thu nhỏ"
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-all"
          >
            <Minus size={18} />
          </button>
          <button
            onClick={onClose}
            title="Đóng"
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-all"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-orange-50/50 to-white dark:from-gray-800 dark:to-gray-900 text-sm scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-transparent">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex flex-col ${
              m.type === "user" ? "items-end" : "items-start"
            } animate-fadeInUp`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div
              className={`flex items-start gap-3 max-w-[85%] ${
                m.type === "bot" ? "" : "flex-row-reverse"
              }`}
            >
              {m.type === "bot" ? (
                <div className="relative">
                  <img
                    src={aiAvatar}
                    alt="AI Avatar"
                    className="w-10 h-10 rounded-full shadow-md object-cover border-2 border-orange-200"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Bot size={10} />
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <Image
                    src={
                      user?.avatar
                        ? `http://127.0.0.1:8000/storage/${encodeURIComponent(
                            user.avatar
                          )}`
                        : "/img/user-avatar.webp"
                    }
                    width={40}
                    height={40}
                    alt="User Avatar"
                    className="rounded-full shadow-md object-cover border-2 border-orange-200"
                    onError={(e) => console.log("Image load error:", e)}
                  />
                </div>
              )}

              <div className="flex flex-col gap-1">
                <div
                  className={`px-4 py-3 rounded-2xl shadow-sm whitespace-pre-line relative ${
                    m.type === "bot"
                      ? "bg-white dark:bg-gray-700 border border-orange-100 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-tl-md"
                      : "bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-tr-md"
                  }`}
                >
                  {m.text}
                  {m.style_name && (
                    <div className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                      <strong>Phong cách:</strong> {m.style_name}
                    </div>
                  )}
                  {m.description && (
                    <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                      <strong>Mô tả:</strong> {m.description}
                    </div>
                  )}
                  {m.keywords && m.keywords.length > 0 && (
                    <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                      <strong>Từ khóa:</strong> {m.keywords.join(", ")}
                    </div>
                  )}
                  {m.mix_and_match && m.mix_and_match.length > 0 && (
                    <div className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                      <strong>Gợi ý phối đồ:</strong> {m.mix_and_match.join(", ")}
                    </div>
                  )}
                  <div
                    className={`text-xs mt-2 opacity-70 ${
                      m.type === "bot" ? "text-gray-500" : "text-orange-100"
                    }`}
                  >
                    {m.timestamp && formatTime(m.timestamp)}
                  </div>
                </div>

                {/* Products Grid */}
                {m.products && m.products.length > 0 && (
                  <div className="mt-3 grid grid-cols-1 gap-3">
                    {m.products.map((p) => (
                      <div
                        key={p.id}
                        className="block border border-orange-200 dark:border-orange-700 rounded-xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 bg-white dark:bg-gray-800 group relative"
                      >
                        <Link href={`/products/${p.id}`}>
                          <div className="relative overflow-hidden">
                            <img
                              src={p.images?.[0] || "/img/no-image.jpg"}
                              alt={p.name}
                              className="w-full h-36 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          </div>
                          <div className="p-3">
                            <div className="font-semibold text-orange-700 dark:text-orange-300 group-hover:text-orange-800 transition-colors">
                              {p.name}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 text-xs mt-1 line-clamp-2">
                              {p.description}
                            </div>
                            {p.variant && p.variant.length > 0 && (
                              <div className="text-gray-600 dark:text-gray-300 text-xs mt-1">
                                <strong>Size:</strong> {p.variant[0].size} (
                                {p.variant[0].stock_quantity} sản phẩm)
                              </div>
                            )}
                            <div className="mt-2 text-xs text-orange-600 dark:text-orange-400 font-medium">
                              Xem chi tiết →
                            </div>
                          </div>
                        </Link>
                        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleAddToCart(p)}
                            className="text-white bg-orange-500 p-1 rounded-full hover:bg-orange-600"
                            title="Thêm vào giỏ hàng"
                          >
                            <ShoppingCart size={20} />
                          </button>
                          <button
                            onClick={() => router.push(`/products/${p.id}`)}
                            className="text-white bg-orange-500 p-1 rounded-full hover:bg-orange-600"
                            title="Xem chi tiết"
                          >
                            <Eye size={20} />
                          </button>
                          <button
                            onClick={() => handleAddToWishlist(p)}
                            className="text-white bg-orange-500 p-1 rounded-full hover:bg-orange-600"
                            title="Thêm vào wishlist"
                          >
                            <Heart size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3 animate-fadeInUp">
            <img
              src={aiAvatar}
              className="w-10 h-10 rounded-full shadow-md border-2 border-orange-200"
            />
            <div className="bg-white dark:bg-gray-700 border border-orange-200 dark:border-gray-600 px-4 py-3 rounded-2xl rounded-tl-md flex items-center gap-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <span className="text-gray-600 dark:text-gray-300 text-xs ml-2">
                AI đang suy nghĩ...
              </span>
            </div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      {/* Quick Replies */}
      {!loading && (
        <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 border-t border-orange-100 dark:border-gray-700">
          <div className="text-xs font-medium text-orange-700 dark:text-orange-300 mb-2 flex items-center gap-2">
            <Sparkles size={14} />
            Gợi ý nhanh:
          </div>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((q, i) => (
              <button
                key={i}
                onClick={() => setInput(q.text)}
                className="px-3 py-2 bg-white dark:bg-gray-700 border border-orange-200 dark:border-gray-600 text-xs rounded-full hover:bg-orange-100 dark:hover:bg-gray-600 hover:scale-105 transition-all duration-200 flex items-center gap-1 shadow-sm"
              >
                {q.icon}
                <span>{q.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-center border-t border-orange-200 dark:border-gray-700 px-3 py-3 bg-white dark:bg-gray-900 gap-3">
        <div className="flex gap-1">
          <button
            onClick={() => setInput((prev) => prev + "😊")}
            className="hover:scale-125 transition-transform p-1"
            title="Thêm cảm xúc"
          >
            <Smile size={18} />
          </button>
          <button
            onClick={() => setInput((prev) => prev + "❤️")}
            className="hover:scale-125 transition-transform p-1"
            title="Thêm trái tim"
          >
            <Heart size={18} />
          </button>
        </div>

        <div className="flex-1 relative">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            className="w-full px-4 py-3 text-sm rounded-2xl border border-orange-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-orange-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition-all placeholder:text-gray-500"
            placeholder="Nhập tin nhắn của bạn..."
            disabled={loading}
          />
          {input && (
            <button
              onClick={() => setInput("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className={`${
            loading || !input.trim()
              ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-95"
          } text-white px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-md`}
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <span>Gửi</span>
              <Send size={16} />
            </>
          )}
        </button>
      </div>

      <style >{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out forwards;
        }

        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }

        .scrollbar-thumb-orange-300::-webkit-scrollbar-thumb {
          background-color: #fed7aa;
          border-radius: 2px;
        }

        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}