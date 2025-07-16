"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function ReviewForm({ productId }: { productId: number }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Bạn cần đăng nhập để bình luận!");
    if (!comment.trim())
      return toast.error("Vui lòng nhập nội dung bình luận!");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: productId, rating, comment }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Đánh giá thành công!");
        setComment("");
        // Optional: trigger re-fetch review list
      } else {
        toast.error(data.message || "Gửi đánh giá thất bại");
      }
    } catch {
      toast.error("Có lỗi khi gửi đánh giá");
    }
  };

  return (
    <div className="border rounded p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2">Viết đánh giá của bạn</h3>
      <textarea
        className="w-full border p-2 mb-2"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Nội dung đánh giá..."
      />
      <button
        className="bg-black text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Gửi đánh giá
      </button>
    </div>
  );
}
