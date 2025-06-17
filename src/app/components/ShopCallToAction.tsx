// components/ShopCallToAction.tsx
"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function ShopCallToAction() {
  return (
    <section className="px-40 py-20 bg-gradient-to-r from-pink-100 via-white to-orange-100 rounded-t-3xl shadow-inner">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 justify-center text-orange-600 font-semibold uppercase text-sm tracking-wider">
          <Sparkles size={20} /> Mua sắm ngay hôm nay
        </div>
        <h2 className="text-4xl font-extrabold text-gray-800">
          Sẵn sàng <span className="text-orange-500">F5 phong cách</span> của
          bạn?
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Khám phá bộ sưu tập mới nhất, đa phong cách – từ năng động đến tối
          giản. Ưu đãi đang chờ bạn!
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300 shadow-lg"
        >
          Khám phá ngay <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}
