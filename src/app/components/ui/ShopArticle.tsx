"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ShopVideoSection() {
  return (
    // <section className="bg-white py-16 px-6 md:px-20 lg:px-40 my-16 rounded-3xl shadow-sm">
    <section className="bg-white py-12 px-4 md:px-20 lg:px-40 my-12 rounded-3xl shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Video bên trái */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
            <video
              src="/img/vide3.mp4"
              controls
              autoPlay
              loop
              muted
              className="w-full h-[500px] object-cover"
            />
          </div>
        </motion.div>

        {/* Nội dung bên phải */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold leading-snug text-gray-900">
            Khám phá <span className="text-[#FF5722]">Phong Cách 2025</span> tại{" "}
            <span className="text-[#ee4d2d]">Dream Shop</span>
          </h2>

          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Cập nhật xu hướng thời trang mới nhất với bộ sưu tập độc quyền.
            Thiết kế trẻ trung, chất liệu cao cấp, phù hợp nhiều phong cách cá
            tính.
          </p>

          <ul className="space-y-3 text-sm md:text-base">
            {[
              "✔ Đa dạng mẫu mã, bắt kịp xu hướng",
              "✔ Chất liệu thân thiện với môi trường",
              "✔ Miễn phí đổi trả trong 7 ngày",
            ].map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.15 }}
                viewport={{ once: true }}
                className="flex items-start text-gray-700"
              >
                {item}
              </motion.li>
            ))}
          </ul>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              href="/products"
              className="inline-block bg-gradient-to-r from-[#FF7043] to-[#FF5722] hover:brightness-110 text-white font-semibold px-6 py-3 rounded-full text-base md:text-lg shadow-md transition-all duration-300"
            >
              Xem sản phẩm ngay
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
