"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDarkMode } from "../../types/useDarkMode";
import Link from "next/link";
import Image from "next/image"; // Import Image từ Next.js

const aiAvatar = "/img/ai-avatar.webp";

type Product = {
  id: number;
  name: string;
  description: string;
  img: { name: string }[];
};

type Message = {
  type: "user" | "bot";
  text: string;
  products?: Product[];
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
          },
        ];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<UserInfo | null>(null);

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

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/stylist/analyze", {
        message: input,
      });

      const reply = res.data.style_name
        ? `🎯 Phong cách phù hợp: ${res.data.style_name}`
        : "🤖 Xin lỗi, mình chưa rõ gu bạn. Hỏi lại nhé?";
      const products = res.data.products || [];

      setMessages((prev) => [...prev, { type: "bot", text: reply, products }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "❌ Không thể kết nối đến hệ thống. Vui lòng thử lại.",
        },
      ]);
    }

    setLoading(false);
  };

  const quickReplies = [
    "Phong cách nữ tính",
    "Trang phục công sở",
    "Outfit đi biển",
    "Màu sắc hợp da trắng",
  ];

  return (
    <div className="fixed bottom-20 right-4 w-[90vw] max-w-[380px] max-h-[520px] rounded-2xl shadow-2xl bg-white dark:bg-gray-900 border border-orange-300 dark:border-orange-700 flex flex-col z-50 overflow-hidden animate-fade-in transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-700 dark:to-orange-800 text-white px-4 py-3 font-semibold text-base flex justify-between items-center">
        🧠 Trợ lý Thời Trang AI
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            title="Bật/Tắt chế độ tối"
            className="text-white text-lg"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button onClick={onClose} className="text-white text-xl">
            ×
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-orange-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex flex-col ${m.type === "bot" ? "items-start" : "items-end"}`}
          >
            <div className="text-xs text-orange-600 dark:text-orange-300 mb-1">
              {m.type === "bot" ? "🤖 AI" : "🙋 Bạn"}
            </div>
            <div
              className={`flex items-start gap-2 ${m.type === "bot" ? "" : "flex-row-reverse"}`}
            >
              {m.type === "bot" ? (
                <img
                  src={aiAvatar}
                  alt="AI Avatar"
                  className="w-8 h-8 rounded-full mt-1 shadow-md object-cover"
                />
              ) : (
                <Image
                  src={
                    user?.avatar
                      ? `http://127.0.0.1:8000/storage/${encodeURIComponent(user.avatar)}`
                      : "/img/user-avatar.webp"
                  }
                  width={32}
                  height={32}
                  alt="User Avatar"
                  className="rounded-full mt-1 shadow-md object-cover"
                  onError={(e) => console.log("Image load error:", e)}
                />
              )}
              <div
                className={`px-4 py-2 rounded-2xl max-w-[75%] shadow-sm whitespace-pre-line ${
                  m.type === "bot"
                    ? "bg-white border border-orange-200 text-gray-800"
                    : "bg-orange-100 text-right"
                }`}
              >
                {m.text}

                {m.products && m.products.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {m.products.map((p) => (
                      <Link
                        key={p.id}
                        href={`/products/${p.id}`}
                        className="block border border-orange-200 dark:border-orange-700 rounded-lg overflow-hidden hover:shadow-md hover:scale-[1.01] transition-transform duration-200"
                      >
                        <img
                          src={p.img?.[0]?.name ? `/img/${p.img[0].name}` : "/img/no-image.jpg"}
                          alt={p.name}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-2 text-xs">
                          <div className="font-semibold text-orange-700">{p.name}</div>
                          <div className="text-gray-600 dark:text-gray-300 line-clamp-2">
                            {p.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 animate-pulse">
            <img src={aiAvatar} className="w-8 h-8 rounded-full mt-1 shadow-md" />
            <div className="bg-white border border-orange-300 px-4 py-2 rounded-xl text-gray-600">
              ✍️ Đang phân tích phong cách...
            </div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      {/* Gợi ý nhanh */}
      {!loading && (
        <div className="px-3 pt-1 pb-2 text-xs text-orange-700 dark:text-orange-300">
          Gợi ý nhanh:
          <div className="flex flex-wrap gap-2 mt-1">
            {quickReplies.map((q, i) => (
              <button
                key={i}
                onClick={() => setInput(q)}
                className="px-3 py-1 bg-orange-100 dark:bg-orange-800 text-xs rounded-full hover:bg-orange-200 dark:hover:bg-orange-700 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex items-center border-t border-orange-200 dark:border-orange-700 px-2 py-2 bg-white dark:bg-gray-900 gap-2">
        <button
          onClick={() => setInput((prev) => prev + "😊")}
          className="text-lg hover:scale-110"
          title="Thêm cảm xúc"
        >
          😊
        </button>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-3 py-2 text-sm rounded-lg border border-orange-300 dark:border-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          placeholder="Nhập mô tả phong cách bạn muốn..."
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className={`${
            loading
              ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          } text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all`}
        >
          {loading ? "..." : "Gửi"}
        </button>
      </div>
    </div>
  );
}