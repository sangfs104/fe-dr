// AiAssistantTest.tsx
"use client";

import { useEffect, useState } from "react";

export default function AiAssistantTest() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  // Hàm phát giọng nói
  const speak = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utter = new window.SpeechSynthesisUtterance(text);
      utter.lang = "vi-VN";
      window.speechSynthesis.speak(utter);
    }
  };

  // Chào khách khi vào trang
  useEffect(() => {
    const welcome = "Xin chào! Tôi là trợ lý AI. Bạn cần tìm kiếm gì?";
    setReply(welcome);
    speak(welcome);
  }, []);

  // Gửi câu hỏi lên API
  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setReply("Đang xử lý...");
    try {
      const res = await fetch("http://localhost:8000/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setReply(data.reply);
      speak(data.reply);
    } catch (err) {
      setReply("Có lỗi xảy ra!");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "40px auto",
        padding: 24,
        border: "1px solid #eee",
        borderRadius: 8,
      }}
    >
      <h2>Test AI Assistant</h2>
      <div>
        <input
          type="text"
          placeholder="Nhập câu hỏi..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          style={{ padding: "8px 16px" }}
        >
          Gửi
        </button>
      </div>
      <div style={{ marginTop: 24 }}>
        <strong>Phản hồi AI:</strong>
        <div
          style={{
            marginTop: 8,
            background: "#f8f8f8",
            padding: 12,
            borderRadius: 4,
          }}
        >
          {reply}
        </div>
      </div>
    </div>
  );
}
