"use client";
// export default PromotionCard;
import { BadgePercent, Truck, Ticket, Copy } from "lucide-react";
import { useState } from "react";

interface Promo {
  title: string;
  description: string;
  code: string;
  expiry: string;
  expired: boolean;
  icon: "truck" | "ticket" | "percent";
}

const iconMap = {
  truck: <Truck className="w-6 h-6 text-white" />,
  ticket: <Ticket className="w-6 h-6 text-white" />,
  percent: <BadgePercent className="w-6 h-6 text-white" />,
};

const PromotionCard = ({ promo }: { promo: Promo }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(promo.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={`relative flex rounded-2xl overflow-hidden shadow-md border transition-all duration-300
        ${
          promo.expired
            ? "bg-white border-gray-300"
            : "bg-orange-50 border-orange-300 shadow-lg"
        }`}
    >
      {/* Icon Section */}
      <div
        className={`flex items-center justify-center w-16 ${
          promo.expired ? "bg-gray-400" : "bg-orange-500"
        }`}
      >
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full ${
            promo.expired ? "bg-gray-300" : "bg-orange-400"
          }`}
        >
          {iconMap[promo.icon]}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 relative">
        <div className="flex items-start justify-between">
          <div>
            <h3
              className={`text-sm font-semibold ${
                promo.expired ? "text-gray-500" : "text-orange-600"
              }`}
            >
              {promo.title}
            </h3>
            <p className="text-xs text-gray-600">{promo.description}</p>
          </div>

          {/* Chỉ hiện ℹ️ nếu đã hết hạn */}
          {promo.expired && (
            <div className="ml-2 text-gray-400 cursor-default text-lg">ℹ️</div>
          )}
        </div>

        <div className="mt-3 text-sm flex items-center gap-2">
          <span className="font-semibold">Mã:</span>
          <span
            className={`text-gray-800 ${
              promo.expired ? "line-through opacity-60" : ""
            }`}
          >
            {promo.code}
          </span>
          {!promo.expired && (
            <button
              onClick={handleCopy}
              className="p-1 hover:bg-orange-100 rounded transition"
              title="Sao chép mã"
            >
              <Copy className="w-4 h-4 text-orange-500" />
            </button>
          )}
          {copied && (
            <span className="text-xs text-green-600">Đã sao chép!</span>
          )}
        </div>

        <div className="text-xs text-gray-500">HSD: {promo.expiry}</div>

        {promo.expired && (
          <span className="absolute top-2 right-2 rotate-[-15deg] text-[10px] text-gray-500 border border-gray-300 px-2 py-[1px] rounded-md shadow-sm bg-white">
            ĐÃ HẾT HẠN
          </span>
        )}
      </div>
    </div>
  );
};

export default PromotionCard;
