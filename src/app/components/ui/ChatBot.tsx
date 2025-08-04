"use client";

import { useState } from "react";

export default function ChatBox({ onClose }: { onClose: () => void }) {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/stylist/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answers: [input], // hoặc điều chỉnh nếu Laravel cần khác
        }),
      });

      if (!res.ok) throw new Error("Lỗi từ server");

      const data = await res.json();
      setResponse(data);
    } catch (err: any) {
      console.error("Lỗi gửi:", err);
      setResponse({ message: "Không thể kết nối đến Stylist AI." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-6 bg-white shadow-xl w-96 h-[500px] border rounded-xl z-50 flex flex-col">
      <div className="p-4 border-b font-semibold flex justify-between items-center">
        Stylist AI
        <button onClick={onClose} className="text-sm text-gray-500 hover:text-black">
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 text-sm">
        <p className="mb-2">💬 Bạn cần gợi ý trang phục nào hôm nay?</p>
        {loading && <p>⏳ Đang phân tích...</p>}

        {response?.product && (
          <div className="mt-4 border p-2 rounded bg-gray-50">
            <p className="font-bold mb-2">{response.product.name}</p>
            <img
              src={response.product.images[0]}
              alt={response.product.name}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <p>Giá: {response.product.variants[0].price.toLocaleString()}₫</p>
            <p>Size: {response.product.variants[0].size}</p>
          </div>
        )}

        {response?.message && !response?.product && (
          <p className="text-red-500 mt-2">{response.message}</p>
        )}
      </div>

      <div className="p-3 border-t flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-1 text-sm"
          placeholder="Nhập yêu cầu của bạn..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded text-sm"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
