"use client";
import { useEffect, useState } from "react";
import PromotionCard from "./PromotionCard";

interface Coupon {
  id: number;
  code: string;
  discount_value: string;
  expiry_date: string;
  created_at: string;
  updated_at: string;
}

const getRandomIcon = () => {
  const icons = ["truck", "ticket", "percent"] as const;
  return icons[Math.floor(Math.random() * icons.length)];
};

const PromotionList = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/coupons")
      .then((res) => res.json())
      .then((data) => setCoupons(data))
      .catch((err) => console.error("Lỗi load coupons:", err));
  }, []);

  const promotions = coupons.map((coupon) => {
    const expiryDate = new Date(coupon.expiry_date);
    const now = new Date();
    const isExpired = expiryDate.getTime() < now.getTime();

    return {
      title: `GIẢM ${Number(coupon.discount_value).toLocaleString()}đ`,
      description: "Áp dụng theo điều kiện đơn hàng",
      code: coupon.code,
      expiry: expiryDate.toLocaleDateString("vi-VN"),
      expired: isExpired,
      icon: getRandomIcon(),
    };
  });

  return (
    <div className="px-40 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {promotions.map((promo, index) => (
        <PromotionCard key={index} promo={promo} />
      ))}
    </div>
  );
};

export default PromotionList;
