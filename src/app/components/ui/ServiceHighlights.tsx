"use client"; // đảm bảo chạy client-side cho animation

import { FC } from "react";
import { Truck, Gift, BadgeCheck, Headphones } from "lucide-react";
import { motion, easeOut } from "framer-motion"; // Import easeOut

const items = [
  {
    icon: <Truck className="w-8 h-8 text-gray-400" />,
    title: "Miễn phí vận chuyển",
    description: "Nhận hàng trong vòng 3 ngày",
  },
  {
    icon: <Gift className="w-8 h-8 text-gray-400" />,
    title: "Quà tặng hấp dẫn",
    description: "Nhiều ưu đãi khuyến mãi hot",
  },
  {
    icon: <BadgeCheck className="w-8 h-8 text-gray-400" />,
    title: "Bảo đảm chất lượng",
    description: "Sản phẩm đã được kiểm định",
  },
  {
    icon: <Headphones className="w-8 h-8 text-gray-400" />,
    title: "Hotline: 19001993",
    description: "Dịch vụ hỗ trợ bạn 24/7",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15, // mỗi item xuất hiện trễ hơn chút
      duration: 0.6,
      ease: easeOut, // Sử dụng easeOut từ framer-motion
    },
  }),
};

const ServiceHighlights: FC = () => {
  return (
    <div className="bg-white px-4 sm:px-10 md:px-20 lg:px-40 py-12 mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
            className="border border-gray-200 rounded-xl p-6 text-center transition hover:shadow-lg hover:scale-105 bg-white"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-base md:text-lg font-semibold text-gray-800">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServiceHighlights;
