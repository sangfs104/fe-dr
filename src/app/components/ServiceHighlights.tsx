// components/ServiceHighlights.tsx
import { FC } from "react";
import { Truck, Gift, BadgeCheck, Headphones } from "lucide-react";

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

const ServiceHighlights: FC = () => {
  return (
    <div className="px-6 py-10 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-md p-6 text-center hover:shadow-sm transition"
          >
            <div className="flex justify-center mb-3">{item.icon}</div>
            <h3 className="text-lg font-semibold text-black">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceHighlights;
