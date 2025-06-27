"use client";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti"; // ✅ Import đúng thư viện
import "../css/order-success.css";

const renderPaymentMethod = (method: any) => {
  if (!method) return "Chưa xác định";

  if (typeof method === "string") {
    const lowerMethod = method.toLowerCase();
    if (lowerMethod === "cod") return "Thanh toán khi nhận hàng";
    if (lowerMethod === "vnpay" || lowerMethod === "bank") return "VNPAY";
    return method;
  }

  if (typeof method === "object" && method !== null) {
    return method.name || "Chưa rõ";
  }

  return "Chưa rõ";
};

const OrderSuccess = () => {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const latestOrder = localStorage.getItem("latestOrder");
    if (latestOrder) {
      const parsed = JSON.parse(latestOrder);
      console.log("🔥 order.payment_method:", parsed.payment_method);
      setOrder(parsed);

      // 🌟 Hiệu ứng confetti kéo dài 3 giây
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;

      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 1000,
      };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        confetti({
          ...defaults,
          particleCount: 50,
          origin: {
            x: randomInRange(0.1, 0.3),
            y: Math.random() - 0.2,
          },
        });

        confetti({
          ...defaults,
          particleCount: 50,
          origin: {
            x: randomInRange(0.7, 0.9),
            y: Math.random() - 0.2,
          },
        });
      }, 250);
    }
  }, []);

  if (!order) return <p>Đang xử lý...</p>;

  return (
    <div className="success-wrapper">
      <div className="confetti-bg" />
      <div className="success-box">
        <h2>Cảm ơn bạn! 🎉</h2>
        <h3>Đơn hàng của bạn sẽ được chuẩn bị.</h3>

        <div className="product-preview">
          {order.items?.map((item: any, index: number) => (
            <div key={index}>
              <img
                src={item.variant?.image_url}
                alt={item.variant?.name}
                className="product-img"
              />
              <div className="product-info">
                <h4>{item.variant?.name}</h4>
                <p>Số lượng: {item.quantity}</p>
                {item.variant?.price && (
                  <p>
                    Giá: {Number(item.variant.price).toLocaleString("vi-VN")}₫
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="order-details">
          <p>
            <strong>Mã đơn hàng:</strong> {order.id}
          </p>
          <p>
            <strong>Ngày:</strong>{" "}
            {new Date().toLocaleDateString("vi-VN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p>
            <strong>Tổng cộng:</strong>{" "}
            {Number(order.total_price).toLocaleString("vi-VN")}₫
          </p>
          <p>
            <strong>Phương thức thanh toán:</strong>{" "}
            {renderPaymentMethod(order.payment_method)}
          </p>
        </div>

        <button
          onClick={() => (window.location.href = "/account")}
          className="bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-600"
        >
          Lịch sử mua hàng
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
