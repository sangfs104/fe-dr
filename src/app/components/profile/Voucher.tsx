// "use client";

// import { useEffect, useState } from "react";
// import { Copy } from "lucide-react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";

// type VoucherItem = {
//   code: string;
//   date: string;
//   discount: string;
// };

// export default function Voucher() {
//   const [vouchers, setVouchers] = useState<VoucherItem[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     const stored = localStorage.getItem("vouchers");
//     if (stored) {
//       setVouchers(JSON.parse(stored));
//     }
//   }, []);

//   const copyCode = (code: string) => {
//     navigator.clipboard.writeText(code);
//     toast.success("Đã sao chép mã!");
//   };

//   const handleUseVoucher = (code: string) => {
//     copyCode(code);
//     toast.success("Đã sao chép mã!");
//     setTimeout(() => {
//       router.push("/payment");
//     }, 500);
//   };

//   return (
//     <div className="bg-white from-orange-50 to-yellow-50 p-5 rounded-2xl shadow-lg space-y-5">
//       <h2 className="text-xl sm:text-2xl font-extrabold text-orange-600 flex items-center gap-2">
//         Voucher của bạn
//       </h2>

//       {vouchers.length > 0 ? (
//         <div className="space-y-4">
//           {vouchers.map((v, idx) => (
//             <div
//               key={idx}
//               className="relative group overflow-hidden rounded-2xl shadow-md border border-orange-200
//                          bg-gradient-to-r from-orange-100 via-orange-50 to-yellow-50
//                          transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl"
//             >
//               {/* Ribbon góc */}
//               <div className="absolute -top-2 -left-8 w-32 bg-orange-500 text-white text-xs font-bold rotate-[-45deg] text-center py-1 shadow-md">
//                 Voucher
//               </div>

//               {/* Nội dung */}
//               <div className="flex items-center justify-between p-4">
//                 <div>
//                   <div className="flex items-center gap-2 ml-3">
//                     <span className="text-lg sm:text-xl font-extrabold text-orange-700 tracking-wider">
//                       {v.code}
//                     </span>
//                     <button
//                       onClick={() => copyCode(v.code)}
//                       className="text-gray-500 hover:text-orange-600 transition"
//                       title="Sao chép mã"
//                     >
//                       <Copy size={18} />
//                     </button>
//                   </div>
//                   <p className="text-sm text-gray-500 mt-1">
//                     Hết hạn:{" "}
//                     {new Date(v.date).toLocaleDateString("vi-VN", {
//                       day: "2-digit",
//                       month: "2-digit",
//                       year: "numeric",
//                     })}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => handleUseVoucher(v.code)}
//                   className="bg-orange-600 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-orange-700 shadow hover:shadow-lg transition-all duration-200"
//                 >
//                   Dùng ngay
//                 </button>
//               </div>

//               {/* Hiệu ứng sóng khi hover */}
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500 italic">Hiện chưa có voucher nào.</p>
//       )}
//     </div>
//   );
// }
// Voucher.tsx
"use client";

import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type VoucherItem = {
  code: string;
  date: string;
  discount: string;
};

export default function Voucher() {
  const [vouchers, setVouchers] = useState<VoucherItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("vouchers");
      if (stored) {
        const parsedVouchers = JSON.parse(stored);
        if (Array.isArray(parsedVouchers)) {
          setVouchers(parsedVouchers);
        } else {
          throw new Error("Dữ liệu voucher không hợp lệ");
        }
      }
    } catch (error) {
      console.error("Lỗi khi đọc vouchers từ localStorage:", error);
      setVouchers([]);
      toast.error("Không thể tải danh sách voucher");
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

  return (
    <div className="bg-white from-orange-50 to-yellow-50 p-5 rounded-2xl shadow-lg space-y-5">
      <h2 className="text-xl sm:text-2xl font-extrabold text-orange-600 flex items-center gap-2">
        Voucher của bạn
      </h2>

      {vouchers.length > 0 ? (
        <div className="space-y-4">
          {vouchers.map((v, idx) => (
            <div
              key={idx}
              className="relative group overflow-hidden rounded-2xl shadow-md border border-orange-200 
                         bg-gradient-to-r from-orange-100 via-orange-50 to-yellow-50 
                         transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl"
            >
              {/* Ribbon góc */}
              <div className="absolute -top-2 -left-8 w-32 bg-orange-500 text-white text-xs font-bold rotate-[-45deg] text-center py-1 shadow-md">
                Voucher
              </div>

              {/* Nội dung */}
              <div className="flex items-center justify-between p-4">
                <div>
                  <div className="flex items-center gap-2 ml-3">
                    <span className="text-lg sm:text-xl font-extrabold text-orange-700 tracking-wider">
                      {v.code}
                    </span>
                    <button
                      onClick={() => copyCode(v.code)}
                      className="text-gray-500 hover:text-orange-600 transition"
                      title="Sao chép mã"
                      aria-label={`Sao chép mã voucher ${v.code}`}
                    >
                      <Copy size={18} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Hết hạn:{" "}
                    {v.date && !isNaN(new Date(v.date).getTime())
                      ? new Date(v.date).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>
                <button
                  onClick={() => handleUseVoucher(v.code)}
                  className="bg-orange-600 text-white px-4 py-1.5 rounded-lg font-semibold hover:bg-orange-700 shadow hover:shadow-lg transition-all duration-200"
                  aria-label={`Sử dụng voucher ${v.code}`}
                >
                  Dùng ngay
                </button>
              </div>

              {/* Hiệu ứng sóng khi hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-200/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic">Hiện chưa có voucher nào.</p>
      )}
    </div>
  );
}
