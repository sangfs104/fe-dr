"use client";

import { useState } from "react";

interface AIAssistantButtonProps {
  onOpenChat: () => void; // Hàm để mở ChatBoxStylistAI
  onOpenVoiceOrder: () => void; // Hàm để mở VoiceQuickOrderTest
}

export default function AIAssistantButton({
  onOpenChat,
  onOpenVoiceOrder,
}: AIAssistantButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [userQuery, setUserQuery] = useState(""); // Để lưu câu hỏi của user
  const [response, setResponse] = useState(""); // Để hiển thị phản hồi (ví dụ: giới thiệu cửa hàng)

  const handleClick = () => {
    setShowModal(true);
    setResponse(""); // Reset phản hồi khi mở modal
  };

  const handleSelectFeature = (feature: "chat" | "voice") => {
    setShowModal(false);
    if (feature === "chat") {
      onOpenChat();
    } else if (feature === "voice") {
      onOpenVoiceOrder();
    }
  };

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý câu hỏi đơn giản: kiểm tra từ khóa (có thể mở rộng sau)
    if (
      userQuery.toLowerCase().includes("thông tin cửa hàng") ||
      userQuery.toLowerCase().includes("giới thiệu")
    ) {
      setResponse(
        "Cửa hàng chúng tôi là một thương hiệu thời trang cao cấp, chuyên cung cấp quần áo, phụ kiện chất lượng cao với giá cả phải chăng. Chúng tôi có hơn 10 năm kinh nghiệm và cam kết mang đến trải nghiệm mua sắm tốt nhất cho khách hàng!"
      );
    } else {
      setResponse(
        "Xin lỗi, tôi chỉ hỗ trợ hỏi về thông tin cửa hàng hoặc chọn tính năng. Hãy thử lại!"
      );
    }
    setUserQuery(""); // Reset input
  };

  return (
    <>
      {/* Button AI với SVG animated (nhảy chuyển động) */}
      <button
        onClick={handleClick}
        className="fixed bottom-4 right-4 z-50 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 animate-bounce"
        aria-label="Trợ lý AI"
      >
        {/* SVG inline cho con AI (robot), animate bằng CSS */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Thân robot */}
          <rect x="6" y="10" width="12" height="10" rx="2" fill="white" />
          {/* Đầu robot */}
          <circle cx="12" cy="6" r="4" fill="white" />
          {/* Mắt trái */}
          <circle cx="9" cy="5" r="1" fill="blue" />
          {/* Mắt phải */}
          <circle cx="15" cy="5" r="1" fill="blue" />
          {/* Ăng-ten (tùy chọn, để thêm chuyển động) */}
          <line x1="12" y1="2" x2="12" y2="0" stroke="white" strokeWidth="2" />
        </svg>
      </button>

      {/* Modal khi nhấn */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              Chào bạn! Tôi là trợ lý AI.
            </h2>
            <p className="mb-4">
              Website chúng tôi có 2 tính năng chính:
              <br />- <strong>Chat với Stylist AI</strong>: Tư vấn phong cách
              thời trang.
              <br />- <strong>Mua hàng bằng giọng nói</strong>: Đặt hàng nhanh
              qua voice.
            </p>
            <p className="mb-4">
              Bạn muốn tính năng nào? Tôi gợi ý thử Chat nếu bạn cần tư vấn!
            </p>

            {/* Buttons chọn tính năng */}
            <div className="flex justify-around mb-4">
              <button
                onClick={() => handleSelectFeature("chat")}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Mở Chat
              </button>
              <button
                onClick={() => handleSelectFeature("voice")}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Mở Voice Order
              </button>
            </div>

            {/* Phần hỏi về thông tin cửa hàng */}
            <form onSubmit={handleQuerySubmit} className="mb-4">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                placeholder="Hỏi về thông tin cửa hàng..."
                className="w-full p-2 border rounded mb-2"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Gửi
              </button>
            </form>

            {response && <p className="text-gray-700">{response}</p>}

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-red-500 hover:underline"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
}
