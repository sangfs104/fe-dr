"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDarkMode } from "./useDarkMode";

const aiAvatar = "/img/ai-avatar.webp";
const userAvatar = "/img/user-avatar.webp";

// ... đoạn đầu giữ nguyên

type Product = {
  id: number;
  name: string;
  description: string;
  img: { name: string }[]; // tùy theo backend trả về
};

type Message = {
  type: "user" | "bot";
  text: string;
  products?: Product[];
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

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8000/api/chat-ai", {
        message: input,
      });

      const reply =
        res.data.reply || "🤖 Xin lỗi, mình chưa hiểu rõ. Bạn hỏi lại nhé?";
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
    "Phối đồ đi học",
    "Phong cách Hàn Quốc",
    "Trang phục lịch sự",
    "Màu nào hợp da ngăm?",
  ];

  return (
    <div className="fixed bottom-20 right-4 w-[90vw] max-w-[380px] max-h-[520px] rounded-2xl shadow-2xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 flex flex-col z-50 overflow-hidden animate-fade-in transition-colors duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-gray-800 dark:to-gray-700 text-white px-4 py-3 font-semibold text-base flex justify-between items-center">
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
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex flex-col ${
              m.type === "bot" ? "items-start" : "items-end"
            }`}
          >
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              {m.type === "bot" ? "🤖 AI" : "🙋 Bạn"}
            </div>
            <div
              className={`flex items-start gap-2 ${
                m.type === "bot" ? "" : "flex-row-reverse"
              }`}
            >
              <img
                src={m.type === "bot" ? aiAvatar : userAvatar}
                alt="avatar"
                className="w-8 h-8 rounded-full mt-1 shadow-md"
              />
              <div
                className={`px-4 py-2 rounded-2xl max-w-[75%] shadow-sm whitespace-pre-line ${
                  m.type === "bot"
                    ? "bg-blue-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    : "bg-gray-200 dark:bg-gray-600 text-right"
                }`}
              >
                {m.text}

                {/* Hiển thị sản phẩm nếu có */}
                {m.products && m.products.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {m.products.map((p) => (
                      <div
                        key={p.id}
                        className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
                      >
                        <img
                          src={
                            p.img?.[0]?.name
                              ? `/img/${p.img[0].name}`
                              : "/img/no-image.jpg"
                          }
                          alt={p.name}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-2 text-xs">
                          <div className="font-semibold">{p.name}</div>
                          <div className="text-gray-600 dark:text-gray-300">
                            {p.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 animate-pulse">
            <img
              src={aiAvatar}
              className="w-8 h-8 rounded-full mt-1 shadow-md"
            />
            <div className="bg-blue-100 dark:bg-gray-700 px-4 py-2 rounded-xl text-gray-600 dark:text-gray-300">
              ✍️ Đang soạn phản hồi...
            </div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      {/* Gợi ý nhanh */}
      {!loading && (
        <div className="px-3 pt-1 pb-2 text-xs text-gray-500 dark:text-gray-400">
          Gợi ý nhanh:
          <div className="flex flex-wrap gap-2 mt-1">
            {quickReplies.map((q, i) => (
              <button
                key={i}
                onClick={() => setInput(q)}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-xs rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex items-center border-t border-gray-200 dark:border-gray-600 px-2 py-2 bg-white dark:bg-gray-900 gap-2">
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
          className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          placeholder="Nhập câu hỏi hoặc thêm emoji..."
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className={`${
            loading
              ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all`}
        >
          {loading ? "..." : "Gửi"}
        </button>
      </div>
    </div>
  );
}
