// "use client";
// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import axios from "axios";
// import confetti from "canvas-confetti";

// import {
//   CheckCircle,
//   PackageCheck,
//   ReceiptText,
//   ArrowRightCircle,
// } from "lucide-react";

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
//           // lấy order từ API
//           let order = res.data.order;

//           // kiểm tra nếu order chưa có order_items đầy đủ thì fallback từ localStorage
//           if (!order.order_items || order.order_items.length === 0) {
//             const latestOrderStr = localStorage.getItem("latestOrder");
//             if (latestOrderStr) {
//               const latestOrder = JSON.parse(latestOrderStr);
//               order.order_items = latestOrder.items.map((item: any) => ({
//                 quantity: item.quantity,
//                 variant: {
//                   name: item.variant.name,
//                   price: item.variant.price,
//                   image: item.variant.image_url,
//                 },
//                 price: item.variant.price,
//               }));
//             }
//           }

//           setOrder(order);
//           localStorage.setItem("latestOrder", JSON.stringify(order));
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
//         <CheckCircle className="text-[#ff5722] w-14 h-14 mx-auto mb-2" />
//         <h1 className="text-3xl font-extrabold text-[#ff5722]">
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
//                   <li key={idx} className="py-3 flex items-center gap-3">
//                     {/* ảnh sản phẩm */}
//                     <img
//                       src={item.variant?.image || "/placeholder.png"}
//                       alt={item.variant?.name}
//                       className="w-14 h-14 rounded border"
//                     />

//                     {/* thông tin chi tiết */}
//                     <div className="flex-1">
//                       <p className="text-gray-800 font-semibold">
//                         {item.variant?.name || "Sản phẩm"}
//                       </p>
//                       <p className="text-gray-500 text-sm">
//                         Số lượng: {item.quantity}
//                       </p>
//                     </div>

//                     {/* giá */}
//                     <div className="text-gray-700 font-semibold">
//                       {item.price?.toLocaleString("vi-VN")}₫
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-sm text-gray-500 italic mt-2">
//                 (Chưa có chi tiết sản phẩm hiển thị)
//               </p>
//             )}
//           </div>

//           {/* ✅ Nút quay về trang đơn hàng */}
//           <div className="mt-8 text-center">
//             <button
//               onClick={() => router.push("/account")}
//               className="inline-flex items-center px-6 py-2 bg-[#ff5752] text-white font-semibold rounded-lg hover:bg-[#ff5722] transition"
//             >
//               <ArrowRightCircle className="w-5 h-5 mr-2" />
//               Xem đơn hàng của tôi
//             </button>
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
import confetti from "canvas-confetti";
import {
  CheckCircle,
  PackageCheck,
  ReceiptText,
  ArrowRightCircle,
} from "lucide-react";
import Image from "next/image";

interface Variant {
  name: string;
  price: number;
  image: string;
}

interface OrderItem {
  quantity: number;
  price: number;
  variant: Variant;
}

interface Order {
  vnp_TxnRef: string;
  total_price: number;
  order_items: OrderItem[];
}

interface StoredItem {
  quantity: number;
  variant: {
    name: string;
    price: number;
    image_url: string;
  };
}

export default function VnpaySuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
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
          confetti({
            particleCount: 200,
            spread: 150,
            origin: { y: 0.6 },
          });

          const order: Order = res.data.order;

          if (!order.order_items || order.order_items.length === 0) {
            const latestOrderStr = localStorage.getItem("latestOrder");
            if (latestOrderStr) {
              const latestOrder = JSON.parse(latestOrderStr) as {
                items: StoredItem[];
              };

              order.order_items = latestOrder.items.map(
                (item: StoredItem): OrderItem => ({
                  quantity: item.quantity,
                  price: item.variant.price,
                  variant: {
                    name: item.variant.name,
                    price: item.variant.price,
                    image: item.variant.image_url,
                  },
                })
              );
            }
          }

          setOrder(order);
          localStorage.setItem("latestOrder", JSON.stringify(order));
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
        <CheckCircle className="text-[#ff5722] w-14 h-14 mx-auto mb-2" />
        <h1 className="text-3xl font-extrabold text-[#ff5722]">
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
                <strong>Mã giao dịch VNPAY:</strong> {order.vnp_TxnRef}
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
                {order.order_items.map((item, idx) => (
                  <li key={idx} className="py-3 flex items-center gap-3">
                    <Image
                      src={item.variant.image || "/placeholder.png"}
                      alt={item.variant.name}
                      width={56}
                      height={56}
                      className="rounded border object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-gray-800 font-semibold">
                        {item.variant.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <div className="text-gray-700 font-semibold">
                      {item.price.toLocaleString("vi-VN")}₫
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic mt-2">
                (Chưa có chi tiết sản phẩm hiển thị)
              </p>
            )}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/account")}
              className="inline-flex items-center px-6 py-2 bg-[#ff5752] text-white font-semibold rounded-lg hover:bg-[#ff5722] transition"
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
