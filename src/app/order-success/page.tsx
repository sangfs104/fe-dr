"use client";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { useDispatch } from "react-redux";
import { clearCart } from "@/store/cartSlice";
import Image from "next/image";

type Variant = {
  name: string;
  price: number;
  image_url: string;
};

type OrderItem = {
  variant: Variant;
  quantity: number;
};

type Order = {
  id: string;
  total_price: number;
  payment_method: string | { name?: string };
  items: OrderItem[];
};

const renderPaymentMethod = (
  method: string | { name?: string } | null
): string => {
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
  const [order, setOrder] = useState<Order | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const latestOrder = localStorage.getItem("latestOrder");
    dispatch(clearCart());

    if (latestOrder) {
      const parsed: Order = JSON.parse(latestOrder);
      setOrder(parsed);

      const duration = 3000;
      const animationEnd = Date.now() + duration;

      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 1000,
      };

      const randomInRange = (min: number, max: number) =>
        Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        confetti({
          ...defaults,
          particleCount: 40,
          origin: {
            x: randomInRange(0.1, 0.3),
            y: Math.random() - 0.2,
          },
        });

        confetti({
          ...defaults,
          particleCount: 40,
          origin: {
            x: randomInRange(0.7, 0.9),
            y: Math.random() - 0.2,
          },
        });
      }, 250);
    }
  }, [dispatch]);

  if (!order) return <p className="text-center mt-20">Đang xử lý...</p>;

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col items-center bg-gray-100 py-8">
      <div className="relative z-10 w-full max-w-xl p-8 bg-white rounded-2xl shadow-xl text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#ff5722] mb-2">
          Cảm ơn bạn! 🎉
        </h2>
        <h3 className="text-lg sm:text-xl text-gray-600 mb-6">
          Đơn hàng của bạn sẽ được chuẩn bị.
        </h3>

        <div className="flex justify-center flex-wrap gap-4 mb-6">
          {order.items.map((item, index) => (
            <div key={index} className="relative">
              <Image
                src={item.variant?.image_url}
                alt={item.variant?.name}
                width={100}
                height={100}
                className="rounded-md object-cover"
              />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {item.quantity}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 space-y-2 text-sm text-left text-gray-700">
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

        <div className="text-center mt-6">
          <button
            onClick={() => (window.location.href = "/account")}
            className="bg-[#FF5722] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#ff5721] transition duration-200"
          >
            Lịch sử mua hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
