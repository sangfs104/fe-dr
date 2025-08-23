"use client";

import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type VoucherItem = {
  code: string;
  discount: number;
  discount_type: "percent" | "amount";
  expiry_date: string;
  date: string; // ngày quay trúng
};

export default function Voucher() {
  const [vouchers, setVouchers] = useState<VoucherItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("vouchers");
    if (stored) {
      const parsed: VoucherItem[] = JSON.parse(stored);

      // Giữ voucher mới nhất nếu trùng code
      const uniqueVouchers = parsed.reduce((acc: VoucherItem[], curr) => {
        const existingIndex = acc.findIndex((x) => x.code === curr.code);
        if (existingIndex >= 0) {
          acc[existingIndex] = curr; // ghi đè bằng bản mới
        } else {
          acc.push(curr);
        }
        return acc;
      }, []);

      setVouchers(uniqueVouchers);

      if (uniqueVouchers.length !== parsed.length) {
        localStorage.setItem("vouchers", JSON.stringify(uniqueVouchers));
      }
    }
  }, []);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Đã sao chép mã!");
  };

  const handleUseVoucher = (code: string) => {
    copyCode(code);
    setTimeout(() => {
      router.push("/payment");
    }, 500);
  };

  const isExpired = (expiry_date: string) => {
    const today = new Date();
    const expiry = new Date(expiry_date);
    return expiry < today;
  };

  // 👉 Sắp xếp voucher: còn hạn trước, hết hạn sau; trong cùng nhóm thì mới hơn trước
  const sortedVouchers = [...vouchers].sort((a, b) => {
    const expiredA = isExpired(a.expiry_date);
    const expiredB = isExpired(b.expiry_date);

    if (expiredA === expiredB) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return expiredA ? 1 : -1;
  });

  return (
    <div className="bg-white from-orange-50 to-yellow-50 p-5 rounded-2xl shadow-lg space-y-5">
      <h2 className="text-xl sm:text-2xl font-extrabold text-orange-600 flex items-center gap-2">
        Voucher của bạn
      </h2>

      {sortedVouchers.length > 0 ? (
        <div className="space-y-4">
          {sortedVouchers.map((v, idx) => {
            const expired = isExpired(v.expiry_date);
            return (
              <div
                key={idx}
                className={`relative group overflow-hidden rounded-2xl shadow-md border 
                           ${
                             expired
                               ? "border-gray-300 bg-gray-100"
                               : "border-orange-200 bg-gradient-to-r from-orange-100 via-orange-50 to-yellow-50"
                           } 
                           transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl`}
              >
                {/* Ribbon góc */}
                <div className="absolute -top-2 -left-8 w-32 bg-orange-500 text-white text-xs font-bold rotate-[-45deg] text-center py-1 shadow-md">
                  Voucher
                </div>

                {/* Nội dung */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3">
                  <div>
                    {/* Code */}
                    <div className="flex items-center gap-2 ml-3">
                      <span
                        className={`text-lg sm:text-xl font-extrabold tracking-wider ${
                          expired
                            ? "text-gray-500 line-through"
                            : "text-orange-700"
                        }`}
                      >
                        {v.code}
                      </span>
                      {!expired && (
                        <button
                          onClick={() => copyCode(v.code)}
                          className="text-gray-500 hover:text-orange-600 transition"
                          title="Sao chép mã"
                        >
                          <Copy size={18} />
                        </button>
                      )}
                    </div>

                    {/* Giảm giá */}
                    <p
                      className={`text-sm mt-2 ${
                        expired ? "text-gray-400" : "text-gray-700"
                      }`}
                    >
                      Giảm:{" "}
                      <b
                        className={
                          expired ? "text-gray-500" : "text-orange-600"
                        }
                      >
                        {v.discount_type === "percent"
                          ? `${v.discount}%`
                          : new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(v.discount)}
                      </b>
                    </p>

                    {/* Hạn sử dụng */}
                    <p className="text-sm">
                      {expired ? (
                        <span className="text-red-600 font-semibold">
                          Đã hết hạn
                        </span>
                      ) : (
                        <span className="text-gray-500">
                          Hết hạn:{" "}
                          {new Date(v.expiry_date).toLocaleDateString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </span>
                      )}
                    </p>

                    {/* Ngày quay trúng */}
                    <p className="text-xs text-gray-400 italic">
                      Nhận vào:{" "}
                      {new Date(v.date).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Button */}
                  {!expired && (
                    <button
                      onClick={() => handleUseVoucher(v.code)}
                      className="bg-orange-600 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-orange-700 shadow hover:shadow-lg transition-all duration-200"
                    >
                      Dùng ngay
                    </button>
                  )}
                </div>

                {/* Hiệu ứng sóng khi hover */}
                {!expired && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 italic">Hiện chưa có voucher nào.</p>
      )}
    </div>
  );
}
