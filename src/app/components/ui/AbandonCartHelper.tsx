"use client";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";

export default function AbandonCartHelper() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Khi chuột rời khỏi cửa sổ
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && cartItems.length > 0) {
        setShow(true);
      }
    };

    // Khi không hoạt động trong 60s
    let idleTimeout: NodeJS.Timeout;
    const resetIdleTimer = () => {
      clearTimeout(idleTimeout);
      if (cartItems.length > 0) {
        idleTimeout = setTimeout(() => setShow(true), 60000);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousemove", resetIdleTimer);
    document.addEventListener("keydown", resetIdleTimer);

    resetIdleTimer();

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousemove", resetIdleTimer);
      document.removeEventListener("keydown", resetIdleTimer);
      clearTimeout(idleTimeout);
    };
  }, [cartItems.length]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded shadow-lg max-w-xs text-center">
        <h3 className="text-lg font-bold mb-2">Bạn cần trợ giúp?</h3>
        <p className="mb-4">
          Bạn còn sản phẩm trong giỏ hàng. Hãy hoàn tất đơn hoặc liên hệ hỗ trợ
          nếu cần!
        </p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setShow(false)}
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
