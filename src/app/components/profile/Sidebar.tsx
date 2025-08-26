"use client";

import { useRouter } from "next/navigation";
import { User, Package, MapPin, LogOut, Gift } from "lucide-react"; // Thêm Gift icon cho Voucher

type Props = {
  tab: "info" | "orders" | "addresses" | "voucher";
  onTabChange: (tab: "info" | "orders" | "addresses" | "voucher") => void;
};

export default function Sidebar({ tab, onTabChange }: Props) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  const menuItems = [
    {
      label: "Thông tin cá nhân",
      icon: <User className="w-4 h-4 sm:w-5 sm:h-5" />,
      key: "info",
    },
    {
      label: "Đơn hàng",
      icon: <Package className="w-4 h-4 sm:w-5 sm:h-5" />,
      key: "orders",
    },
    {
      label: "Địa chỉ",
      icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />,
      key: "addresses",
    },
    {
      label: "Voucher",
      icon: <Gift className="w-4 h-4 sm:w-5 sm:h-5" />, // Sử dụng Gift icon cho Voucher
      key: "voucher",
    },
  ] as const;

  return (
    <aside className="w-full sm:w-64 bg-white shadow-xl rounded-2xl px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 text-xs sm:text-sm font-medium border border-orange-100 mb-4 sm:mb-0">
      <h2 className="text-orange-500 font-bold text-lg sm:text-xl mb-3 sm:mb-4 md:mb-6 text-center sm:text-left">
        Tài khoản của tôi
      </h2>

      <ul className="space-y-1 sm:space-y-2 md:space-y-3">
        {menuItems.map((item) => (
          <li
            key={item.key}
            className={`flex items-center gap-2 sm:gap-3 cursor-pointer px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-xl transition-all duration-200 ${
              tab === item.key
                ? "bg-orange-100 text-orange-600 font-semibold"
                : "hover:bg-orange-50 text-gray-700"
            }`}
            onClick={() => onTabChange(item.key)}
          >
            {item.icon}
            <span className="truncate">{item.label}</span>
          </li>
        ))}

        <li
          className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4 md:mt-6 cursor-pointer px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-xl transition-all duration-200 text-red-500 hover:bg-red-100 hover:font-semibold"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Đăng xuất</span>
        </li>
      </ul>
    </aside>
  );
}
