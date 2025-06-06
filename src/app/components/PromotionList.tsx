// import PromotionCard from "./PromotionCard";

// const promotions = [
//   {
//     title: "MIỄN PHÍ VẬN CHUYỂN",
//     description: "Freeship cho đơn hàng từ 500k",
//     code: "EGAFREESHIP",
//     expiry: "30/12/2024",
//     expired: true,
//     icon: "truck",
//   },
//   {
//     title: "GIẢM 50K",
//     description: "Áp dụng cho đơn hàng từ 600k",
//     code: "GIAM50K",
//     expiry: "31/12/2024",
//     expired: false,
//     icon: "ticket",
//   },
//   {
//     title: "GIẢM 30%",
//     description: "Cho các sản phẩm trong Set đồ tập",
//     code: "GIAM30",
//     expiry: "01/09/2023",
//     expired: true,
//     icon: "percent",
//   },
//   {
//     title: "GIẢM 40%",
//     description: "Cho sản phẩm thứ 4 trong đơn hàng",
//     code: "GIAM40",
//     expiry: "20/05/2023",
//     expired: true,
//     icon: "percent",
//   },
// ];

// const PromotionList = () => {
//   return (
//     <div className="px-40 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//       {promotions.map((promo, index) => (
//         <PromotionCard key={index} promo={promo} />
//       ))}
//     </div>
//   );
// };

// export default PromotionList;
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
