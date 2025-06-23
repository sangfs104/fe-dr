// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { CheckCircle, PackageCheck, ReceiptText } from "lucide-react";

// export default function VnpaySuccessPage() {
//   const [order, setOrder] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   useEffect(() => {
//     const confirmVnpay = async () => {
//       const params = Object.fromEntries(searchParams.entries());

//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.post(
//           "http://localhost:8000/api/payment/vnpay/return",
//           params,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (res.data.status === 200) {
//           console.log("✅ Đơn hàng từ backend:", res.data.order);
//           setOrder(res.data.order);
//           localStorage.setItem("latestOrder", JSON.stringify(res.data.order));
//         } else {
//           alert("Thanh toán thất bại");
//           router.push("/cart");
//         }
//       } catch (err) {
//         console.error("❌ Lỗi xác thực đơn hàng:", err);
//         router.push("/cart");
//       } finally {
//         setLoading(false);
//       }
//     };

//     confirmVnpay();
//   }, [searchParams, router]);

//   if (loading)
//     return (
//       <p className="text-center mt-10 text-gray-600">
//         Đang xác nhận đơn hàng...
//       </p>
//     );

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border">
//       <div className="text-center mb-6">
//         <CheckCircle className="text-green-500 w-14 h-14 mx-auto mb-2" />
//         <h1 className="text-3xl font-extrabold text-green-600">
//           Thanh toán thành công!
//         </h1>
//         <p className="text-gray-500 mt-1">Cảm ơn bạn đã đặt hàng 🎉</p>
//       </div>

//       {order ? (
//         <>
//           <div className="bg-gray-50 rounded-lg p-4 mb-4 border">
//             <div className="flex items-center mb-2 text-gray-700">
//               <ReceiptText className="w-5 h-5 mr-2 text-gray-500" />
//               <span>
//                 <strong>Mã giao dịch VNPAY:</strong> {order?.vnp_TxnRef}
//               </span>
//             </div>
//             <div className="text-xl text-center font-semibold text-blue-600">
//               Tổng cộng: {Number(order.total_price).toLocaleString("vi-VN")}₫
//             </div>
//           </div>

//           <div className="mt-6">
//             <div className="flex items-center mb-2 text-gray-700">
//               <PackageCheck className="w-5 h-5 mr-2 text-gray-500" />
//               <h2 className="text-lg font-semibold">Chi tiết đơn hàng</h2>
//             </div>

//             {order.order_items && order.order_items.length > 0 ? (
//               <ul className="divide-y divide-gray-200 mt-2">
//                 {order.order_items.map((item: any, idx: number) => (
//                   <li
//                     key={idx}
//                     className="py-2 flex justify-between items-center"
//                   >
//                     <span className="text-gray-800">
//                       {item.variant?.name || "Sản phẩm"} x {item.quantity}
//                     </span>
//                     <span className="text-gray-600">
//                       {item.price?.toLocaleString("vi-VN")}₫
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-sm text-gray-500 italic mt-2">
//                 (Chưa có chi tiết sản phẩm hiển thị)
//               </p>
//             )}
//           </div>

//         </>
//       ) : (
//         <p className="text-red-500 text-center mt-4">
//           Không tìm thấy thông tin đơn hàng!
//         </p>
//       )}
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import {
  CheckCircle,
  PackageCheck,
  ReceiptText,
  ArrowRightCircle,
} from "lucide-react";

export default function VnpaySuccessPage() {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const confirmVnpay = async () => {
      const params = Object.fromEntries(searchParams.entries());

      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          "http://localhost:8000/api/payment/vnpay/return",
          params,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.status === 200) {
          setOrder(res.data.order);
          localStorage.setItem("latestOrder", JSON.stringify(res.data.order));
        } else {
          alert("Thanh toán thất bại");
          router.push("/cart");
        }
      } catch (err) {
        console.error("❌ Lỗi xác thực đơn hàng:", err);
        router.push("/cart");
      } finally {
        setLoading(false);
      }
    };

    confirmVnpay();
  }, [searchParams, router]);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600">
        Đang xác nhận đơn hàng...
      </p>
    );

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border">
      <div className="text-center mb-6">
        <CheckCircle className="text-green-500 w-14 h-14 mx-auto mb-2" />
        <h1 className="text-3xl font-extrabold text-green-600">
          Thanh toán thành công!
        </h1>
        <p className="text-gray-500 mt-1">Cảm ơn bạn đã đặt hàng 🎉</p>
      </div>

      {order ? (
        <>
          <div className="bg-gray-50 rounded-lg p-4 mb-4 border">
            <div className="flex items-center mb-2 text-gray-700">
              <ReceiptText className="w-5 h-5 mr-2 text-gray-500" />
              <span>
                <strong>Mã giao dịch VNPAY:</strong> {order?.vnp_TxnRef}
              </span>
            </div>
            <div className="text-xl text-center font-semibold text-blue-600">
              Tổng cộng: {Number(order.total_price).toLocaleString("vi-VN")}₫
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center mb-2 text-gray-700">
              <PackageCheck className="w-5 h-5 mr-2 text-gray-500" />
              <h2 className="text-lg font-semibold">Chi tiết đơn hàng</h2>
            </div>

            {order.order_items && order.order_items.length > 0 ? (
              <ul className="divide-y divide-gray-200 mt-2">
                {order.order_items.map((item: any, idx: number) => (
                  <li
                    key={idx}
                    className="py-2 flex justify-between items-center"
                  >
                    <span className="text-gray-800">
                      {item.variant?.name || "Sản phẩm"} x {item.quantity}
                    </span>
                    <span className="text-gray-600">
                      {item.price?.toLocaleString("vi-VN")}₫
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic mt-2">
                (Chưa có chi tiết sản phẩm hiển thị)
              </p>
            )}
          </div>

          {/* ✅ Nút quay về trang đơn hàng */}
          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/account")}
              className="inline-flex items-center px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              <ArrowRightCircle className="w-5 h-5 mr-2" />
              Xem đơn hàng của tôi
            </button>
          </div>
        </>
      ) : (
        <p className="text-red-500 text-center mt-4">
          Không tìm thấy thông tin đơn hàng!
        </p>
      )}
    </div>
  );
}
