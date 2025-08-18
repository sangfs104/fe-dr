// // // "use client";
// // // import { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import Image from "next/image";

// // // type Variant = {
// // //   id: number;
// // //   product_id: number;
// // //   img_id: number;
// // //   size: string;
// // //   stock_quantity: number;
// // //   price: number;
// // //   sale_price: number | null;
// // //   status: string;
// // //   active: string;
// // // };

// // // type ProductImage = {
// // //   id: number;
// // //   product_id: number;
// // //   name: string;
// // // };

// // // type Product = {
// // //   id: number;
// // //   name: string;
// // //   description: string;
// // //   category_id: number;
// // //   status: string;
// // //   active: string;
// // //   img: ProductImage[];
// // // };

// // // type OrderItem = {
// // //   id: number;
// // //   order_id: number;
// // //   variant_id: number;
// // //   quantity: string;
// // //   price: string;
// // //   variant: Variant;
// // //   product: Product;
// // // };

// // // type Order = {
// // //   id: number;
// // //   created_at: string;
// // //   total_price: string;
// // //   status: string;
// // //   order_items: OrderItem[];
// // //   vnp_TxnRef: string;
// // //   order_code?: string;
// // // };

// // // export default function OrderList() {
// // //   const [orders, setOrders] = useState<Order[]>([]);
// // //   const [statusFilter, setStatusFilter] = useState<string>("all");

// // //   const filteredOrders =
// // //     statusFilter === "all"
// // //       ? orders
// // //       : orders.filter((order) => order.status === statusFilter);

// // //   const statusTabs = [
// // //     { key: "all", label: "Tất cả" },
// // //     { key: "pending", label: "Chờ xác nhận" },
// // //     { key: "processing", label: "Đang giao" },
// // //     { key: "paid", label: "Đã hoàn thành" },
// // //     { key: "cancelled", label: "Đã hủy" },
// // //   ];

// // //   useEffect(() => {
// // //     const fetchOrders = async () => {
// // //       const token = localStorage.getItem("token");
// // //       const res = await axios.get("http://127.0.0.1:8000/api/order", {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       setOrders(res.data.data);
// // //     };

// // //     fetchOrders();
// // //   }, []);

// // //   const statusCounts: Record<string, number> = {
// // //     all: orders.length,
// // //     pending: orders.filter((o) => o.status === "pending").length,
// // //     processing: orders.filter((o) => o.status === "processing").length,
// // //     paid: orders.filter((o) => o.status === "paid").length,
// // //     cancelled: orders.filter((o) => o.status === "cancelled").length,
// // //   };

// // //   return (
// // //     <section className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-md transition w-full overflow-x-hidden">
// // //       <h2 className="text-xl font-semibold mb-6 text-orange-600">
// // //         Đơn hàng của bạn
// // //       </h2>

// // //       <div className="flex flex-wrap gap-3 mb-6">
// // //         {statusTabs.map((tab) => (
// // //           <button
// // //             key={tab.key}
// // //             className={`relative px-4 py-2 rounded-full border text-sm font-medium transition
// // //             ${
// // //               statusFilter === tab.key
// // //                 ? "bg-orange-500 text-white border-orange-500"
// // //                 : "bg-white text-gray-700 border-gray-300 hover:bg-orange-50"
// // //             }`}
// // //             onClick={() => setStatusFilter(tab.key)}
// // //           >
// // //             {tab.label}
// // //             {statusCounts[tab.key] > 0 && (
// // //               <span
// // //                 className={`absolute -top-2 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded-full
// // //                 ${
// // //                   statusFilter === tab.key
// // //                     ? "bg-white text-orange-500 border border-orange-500"
// // //                     : "bg-orange-500 text-white"
// // //                 }`}
// // //                 style={{ minWidth: 20, display: "inline-block" }}
// // //               >
// // //                 {statusCounts[tab.key]}
// // //               </span>
// // //             )}
// // //           </button>
// // //         ))}
// // //       </div>

// // //       <div className="space-y-6">
// // //         {filteredOrders.length === 0 && (
// // //           <div className="text-center text-gray-400 py-10">
// // //             Không có đơn hàng nào.
// // //           </div>
// // //         )}

// // //         {filteredOrders.map((order) => (
// // //           <div key={order.id} className="border rounded-xl transition bg-white">
// // //             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-orange-50 border-b p-4 rounded-t-xl gap-2">
// // //               <div className="text-sm text-gray-700 space-x-2">
// // //                 <span>Mã đơn:</span>
// // //                 <span className="font-medium text-gray-900">
// // //                   #{order.order_code ?? order.vnp_TxnRef}
// // //                 </span>
// // //                 <span className="text-gray-400">|</span>
// // //                 <span
// // //                   className={`${
// // //                     order.status === "pending"
// // //                       ? "text-yellow-500"
// // //                       : order.status === "processing"
// // //                       ? "text-blue-500"
// // //                       : order.status === "paid"
// // //                       ? "text-green-600"
// // //                       : order.status === "cancelled"
// // //                       ? "text-red-500"
// // //                       : ""
// // //                   } font-semibold`}
// // //                 >
// // //                   {order.status === "pending" && "Chờ xác nhận"}
// // //                   {order.status === "processing" && "Đang giao"}
// // //                   {order.status === "paid" && "Đã thanh toán"}
// // //                   {order.status === "cancelled" && "Đã hủy"}
// // //                   {!["pending", "processing", "paid", "cancelled"].includes(
// // //                     order.status
// // //                   ) && order.status}
// // //                 </span>
// // //               </div>
// // //               <div className="text-sm text-gray-500">
// // //                 {new Date(order.created_at).toLocaleDateString()}
// // //               </div>
// // //             </div>

// // //             <div className="divide-y">
// // //               {order.order_items.map((item) => {
// // //                 const productImage = item.product.img.find(
// // //                   (img) => img.id === item.variant.img_id
// // //                 );

// // //                 return (
// // //                   <div
// // //                     key={item.id}
// // //                     className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4"
// // //                   >
// // //                     <div className="flex items-center gap-4 w-full sm:w-auto">
// // //                       <Image
// // //                         src={
// // //                           productImage
// // //                             ? `/img/${productImage.name}`
// // //                             : "/img/default.webp"
// // //                         }
// // //                         width={80}
// // //                         height={80}
// // //                         alt={item.product.name}
// // //                         className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border"
// // //                       />
// // //                       <div className="space-y-1 text-sm">
// // //                         <p className="text-base font-medium text-gray-800 break-words">
// // //                           {item.product.name}
// // //                         </p>
// // //                         <p className="text-gray-500">
// // //                           Phân loại: Size {item.variant.size}
// // //                         </p>
// // //                         <p className="text-gray-500">
// // //                           Số lượng: {item.quantity}
// // //                         </p>
// // //                       </div>
// // //                     </div>
// // //                     <div className="text-right text-base font-semibold text-orange-600 whitespace-nowrap min-w-[100px]">
// // //                       {parseInt(item.price).toLocaleString("vi-VN")}₫
// // //                     </div>
// // //                   </div>
// // //                 );
// // //               })}
// // //             </div>

// // //             <div className="flex justify-end gap-2 px-4 py-3 bg-gray-50 rounded-b-xl text-sm text-gray-700">
// // //               <div className="text-right space-y-1">
// // //                 <p className="text-gray-500">Tổng tiền:</p>
// // //                 <p className="text-lg font-bold text-orange-600">
// // //                   {parseInt(order.total_price).toLocaleString("vi-VN")}₫
// // //                 </p>
// // //               </div>
// // //             </div>

// // //             <div className="flex flex-wrap justify-end gap-2 p-4 border-t bg-white rounded-b-xl">
// // //               <button className="px-4 py-1 border rounded text-gray-600 hover:bg-gray-100 text-sm">
// // //                 Xem chi tiết
// // //               </button>
// // //               <button className="px-4 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm">
// // //                 Mua lại
// // //               </button>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </section>
// // //   );
// // // }
// // "use client";
// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // // import Image from "next/image";

// // const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// // type Variant = {
// //   id: number;
// //   product_id: number;
// //   img_id: number;
// //   size: string;
// //   stock_quantity: number;
// //   price: number;
// //   sale_price: number | null;
// //   status: string;
// //   active: string;
// // };

// // type ProductImage = {
// //   id: number;
// //   product_id: number;
// //   name: string;
// // };

// // type Product = {
// //   id: number;
// //   name: string;
// //   description: string;
// //   category_id: number;
// //   status: string;
// //   active: string;
// //   img: ProductImage[];
// // };

// // type OrderItem = {
// //   id: number;
// //   order_id: number;
// //   variant_id: number;
// //   quantity: string;
// //   price: string;
// //   variant: Variant;
// //   product: Product;
// //   image_url?: string;
// // };

// // type Order = {
// //   id: number;
// //   created_at: string;
// //   total_price: string;
// //   status: string;
// //   order_items: OrderItem[];
// //   vnp_TxnRef: string;
// //   order_code?: string;
// // };

// // export default function OrderList() {
// //   const [orders, setOrders] = useState<Order[]>([]);
// //   const [statusFilter, setStatusFilter] = useState<string>("all");

// //   const filteredOrders =
// //     statusFilter === "all"
// //       ? orders
// //       : orders.filter((order) => order.status === statusFilter);

// //   const statusTabs = [
// //     { key: "all", label: "Tất cả" },
// //     { key: "pending", label: "Chờ xác nhận" },
// //     { key: "processing", label: "Đang giao" },
// //     { key: "paid", label: "Đã hoàn thành" },
// //     { key: "cancelled", label: "Đã hủy" },
// //   ];

// //   useEffect(() => {
// //     const fetchOrders = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         const res = await axios.get(`${API_BASE_URL}/api/order`, {
// //           headers: { Authorization: `Bearer ${token}` },
// //         });
// //         setOrders(res.data.data);
// //       } catch (err) {
// //         console.error("Lỗi khi lấy đơn hàng:", err);
// //       }
// //     };

// //     fetchOrders();
// //   }, []);

// //   const statusCounts: Record<string, number> = {
// //     all: orders.length,
// //     pending: orders.filter((o) => o.status === "pending").length,
// //     processing: orders.filter((o) => o.status === "processing").length,
// //     paid: orders.filter((o) => o.status === "paid").length,
// //     cancelled: orders.filter((o) => o.status === "cancelled").length,
// //   };

// //   return (
// //     <section className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-md transition w-full overflow-x-hidden">
// //       <h2 className="text-xl font-semibold mb-6 text-orange-600">
// //         Đơn hàng của bạn
// //       </h2>

// //       <div className="flex flex-wrap gap-3 mb-6">
// //         {statusTabs.map((tab) => (
// //           <button
// //             key={tab.key}
// //             className={`relative px-4 py-2 rounded-full border text-sm font-medium transition
// //             ${
// //               statusFilter === tab.key
// //                 ? "bg-orange-500 text-white border-orange-500"
// //                 : "bg-white text-gray-700 border-gray-300 hover:bg-orange-50"
// //             }`}
// //             onClick={() => setStatusFilter(tab.key)}
// //           >
// //             {tab.label}
// //             {statusCounts[tab.key] > 0 && (
// //               <span
// //                 className={`absolute -top-2 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded-full
// //                 ${
// //                   statusFilter === tab.key
// //                     ? "bg-white text-orange-500 border border-orange-500"
// //                     : "bg-orange-500 text-white"
// //                 }`}
// //                 style={{ minWidth: 20, display: "inline-block" }}
// //               >
// //                 {statusCounts[tab.key]}
// //               </span>
// //             )}
// //           </button>
// //         ))}
// //       </div>

// //       <div className="space-y-6">
// //         {filteredOrders.length === 0 && (
// //           <div className="text-center text-gray-400 py-10">
// //             Không có đơn hàng nào.
// //           </div>
// //         )}

// //         {filteredOrders.map((order) => (
// //           <div key={order.id} className="border rounded-xl transition bg-white">
// //             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-orange-50 border-b p-4 rounded-t-xl gap-2">
// //               <div className="text-sm text-gray-700 space-x-2">
// //                 <span>Mã đơn:</span>
// //                 <span className="font-medium text-gray-900">
// //                   #{order.order_code ?? order.vnp_TxnRef}
// //                 </span>
// //                 <span className="text-gray-400">|</span>
// //                 <span
// //                   className={`${
// //                     order.status === "pending"
// //                       ? "text-yellow-500"
// //                       : order.status === "processing"
// //                       ? "text-blue-500"
// //                       : order.status === "paid"
// //                       ? "text-green-600"
// //                       : order.status === "cancelled"
// //                       ? "text-red-500"
// //                       : ""
// //                   } font-semibold`}
// //                 >
// //                   {order.status === "pending" && "Chờ xác nhận"}
// //                   {order.status === "processing" && "Đang giao"}
// //                   {order.status === "paid" && "Đã thanh toán"}
// //                   {order.status === "cancelled" && "Đã hủy"}
// //                   {!["pending", "processing", "paid", "cancelled"].includes(
// //                     order.status
// //                   ) && order.status}
// //                 </span>
// //               </div>
// //               <div className="text-sm text-gray-500">
// //                 {new Date(order.created_at).toLocaleDateString()}
// //               </div>
// //             </div>

// //             <div className="divide-y">
// //               {order.order_items.map((item) => {
// //                 const productImage = item.product.img.find(
// //                   (img) => img.id === item.variant.img_id
// //                 );

// //                 console.log("productImage", productImage);

// //                 return (
// //                   <div
// //                     key={item.id}
// //                     className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4"
// //                   >
// //                     <div className="flex items-center gap-4 w-full sm:w-auto">
// //                       {/* <Image
// //                         src={
// //                           productImage
// //                             ? `${process.env.NEXT_PUBLIC_API_URL}/public/img/${productImage.name}`
// //                             : "/img/default.webp"
// //                         }
// //                         width={80}
// //                         height={80}
// //                         alt={item.product.name}
// //                         className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border"
// //                       /> */}

// //                       {/* <Image
// //                         src={item.image_url || "/img/default.webp"}
// //                         width={80}
// //                         height={80}
// //                         alt={item.product.name}
// //                         className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border"
// //                       /> */}
// //                       <img
// //                         src={item.image_url || "/img/default.webp"}
// //                         width={80}
// //                         height={80}
// //                         alt={item.product.name}
// //                         className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border"
// //                       />
// //                       <div className="space-y-1 text-sm">
// //                         <p className="text-base font-medium text-gray-800 break-words">
// //                           {item.product.name}
// //                         </p>
// //                         <p className="text-gray-500">
// //                           Phân loại: Size {item.variant.size}
// //                         </p>
// //                         <p className="text-gray-500">
// //                           Số lượng: {item.quantity}
// //                         </p>
// //                       </div>
// //                     </div>
// //                     <div className="text-right text-base font-semibold text-orange-600 whitespace-nowrap min-w-[100px]">
// //                       {parseInt(item.price).toLocaleString("vi-VN")}₫
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </div>

// //             <div className="flex justify-end gap-2 px-4 py-3 bg-gray-50 rounded-b-xl text-sm text-gray-700">
// //               <div className="text-right space-y-1">
// //                 <p className="text-gray-500">Tổng tiền:</p>
// //                 <p className="text-lg font-bold text-orange-600">
// //                   {parseInt(order.total_price).toLocaleString("vi-VN")}₫
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="flex flex-wrap justify-end gap-2 p-4 border-t bg-white rounded-b-xl">
// //               <button className="px-4 py-1 border rounded text-gray-600 hover:bg-gray-100 text-sm">
// //                 Xem chi tiết
// //               </button>
// //               <button className="px-4 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm">
// //                 Mua lại
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }
// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import * as Dialog from "@radix-ui/react-dialog";
// import { Star, X } from "lucide-react";
// import { motion } from "framer-motion";
// import { toast } from "react-hot-toast";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// type Variant = {
//   id: number;
//   product_id: number;
//   img_id: number;
//   size: string;
//   stock_quantity: number;
//   price: number;
//   sale_price: number | null;
//   status: string;
//   active: string;
// };

// type ProductImage = {
//   id: number;
//   product_id: number;
//   name: string;
// };

// type Product = {
//   id: number;
//   name: string;
//   description: string;
//   category_id: number;
//   status: string;
//   active: string;
//   img: ProductImage[];
// };

// type OrderItem = {
//   id: number;
//   order_id: number;
//   variant_id: number;
//   quantity: string;
//   price: string;
//   variant: Variant;
//   product: Product;
//   image_url?: string;
// };

// type Order = {
//   id: number;
//   created_at: string;
//   total_price: string;
//   status: string;
//   order_items: OrderItem[];
//   vnp_TxnRef: string;
//   order_code?: string;
// };

// export default function OrderList() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
//     null
//   );
//   const [rating, setRating] = useState(5);
//   const [comment, setComment] = useState("");
//   const [hoveredStars, setHoveredStars] = useState(0);
//   const [showReviewModal, setShowReviewModal] = useState(false);

//   const filteredOrders =
//     statusFilter === "all"
//       ? orders
//       : orders.filter((order) => order.status === statusFilter);

//   const statusTabs = [
//     { key: "all", label: "Tất cả" },
//     { key: "pending", label: "Chờ xác nhận" },
//     { key: "processing", label: "Đang giao" },
//     { key: "paid", label: "Đã hoàn thành" },
//     { key: "cancelled", label: "Đã hủy" },
//   ];

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(`${API_BASE_URL}/api/order`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setOrders(res.data.data);
//       } catch (err) {
//         console.error("Lỗi khi lấy đơn hàng:", err);
//         toast.error("Không thể tải danh sách đơn hàng");
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleSubmitReview = async () => {
//     if (!selectedProduct || selectedVariantId === null) return;

//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Bạn cần đăng nhập để bình luận!", {
//         icon: "⚠️",
//         style: {
//           borderRadius: "16px",
//           background: "#FEF2F2",
//           color: "#DC2626",
//           border: "1px solid #FECACA",
//         },
//       });
//       return;
//     }
//     if (!comment.trim()) {
//       toast.error("Vui lòng nhập nội dung bình luận!", {
//         icon: "⚠️",
//         style: {
//           borderRadius: "16px",
//           background: "#FEF2F2",
//           color: "#DC2626",
//           border: "1px solid #FECACA",
//         },
//       });
//       return;
//     }

//     try {
//       const res = await fetch(`${API_BASE_URL}/api/review`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           product_id: selectedProduct.id,
//           rating,
//           comment,
//         }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         toast.success("Đánh giá thành công!", {
//           icon: "⭐",
//           style: {
//             borderRadius: "16px",
//             background: "#F0FDF4",
//             color: "#16A34A",
//           },
//         });
//         setComment("");
//         setRating(5);
//         setShowReviewModal(false);
//       } else {
//         toast.error(data.message || "Có lỗi khi gửi đánh giá", {
//           style: {
//             borderRadius: "16px",
//             background: "#FEF2F2",
//             color: "#DC2626",
//             border: "1px solid #FECACA",
//           },
//         });
//       }
//     } catch {
//       toast.error("Có lỗi khi gửi đánh giá", {
//         style: {
//           borderRadius: "16px",
//           background: "#FEF2F2",
//           color: "#DC2626",
//           border: "1px solid #FECACA",
//         },
//       });
//     }
//   };

//   const statusCounts: Record<string, number> = {
//     all: orders.length,
//     pending: orders.filter((o) => o.status === "pending").length,
//     processing: orders.filter((o) => o.status === "processing").length,
//     paid: orders.filter((o) => o.status === "paid").length,
//     cancelled: orders.filter((o) => o.status === "cancelled").length,
//   };

//   return (
//     <section className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-md transition w-full overflow-x-hidden">
//       <h2 className="text-xl font-semibold mb-6 text-orange-600">
//         Đơn hàng của bạn
//       </h2>

//       <div className="flex flex-wrap gap-3 mb-6">
//         {statusTabs.map((tab) => (
//           <button
//             key={tab.key}
//             className={`relative px-4 py-2 rounded-full border text-sm font-medium transition
//             ${
//               statusFilter === tab.key
//                 ? "bg-orange-500 text-white border-orange-500"
//                 : "bg-white text-gray-700 border-gray-300 hover:bg-orange-50"
//             }`}
//             onClick={() => setStatusFilter(tab.key)}
//           >
//             {tab.label}
//             {statusCounts[tab.key] > 0 && (
//               <span
//                 className={`absolute -top-2 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded-full
//                 ${
//                   statusFilter === tab.key
//                     ? "bg-white text-orange-500 border border-orange-500"
//                     : "bg-orange-500 text-white"
//                 }`}
//                 style={{ minWidth: 20, display: "inline-block" }}
//               >
//                 {statusCounts[tab.key]}
//               </span>
//             )}
//           </button>
//         ))}
//       </div>

//       <div className="space-y-6">
//         {filteredOrders.length === 0 && (
//           <div className="text-center text-gray-400 py-10">
//             Không có đơn hàng nào.
//           </div>
//         )}

//         {filteredOrders.map((order) => (
//           <div key={order.id} className="border rounded-xl transition bg-white">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-orange-50 border-b p-4 rounded-t-xl gap-2">
//               <div className="text-sm text-gray-700 space-x-2">
//                 <span>Mã đơn:</span>
//                 <span className="font-medium text-gray-900">
//                   #{order.order_code ?? order.vnp_TxnRef}
//                 </span>
//                 <span className="text-gray-400">|</span>
//                 <span
//                   className={`${
//                     order.status === "pending"
//                       ? "text-yellow-500"
//                       : order.status === "processing"
//                       ? "text-blue-500"
//                       : order.status === "paid"
//                       ? "text-green-600"
//                       : order.status === "cancelled"
//                       ? "text-red-500"
//                       : ""
//                   } font-semibold`}
//                 >
//                   {order.status === "pending" && "Chờ xác nhận"}
//                   {order.status === "processing" && "Đang giao"}
//                   {order.status === "paid" && "Đã thanh toán"}
//                   {order.status === "cancelled" && "Đã hủy"}
//                   {!["pending", "processing", "paid", "cancelled"].includes(
//                     order.status
//                   ) && order.status}
//                 </span>
//               </div>
//               <div className="text-sm text-gray-500">
//                 {new Date(order.created_at).toLocaleDateString()}
//               </div>
//             </div>

//             <div className="divide-y">
//               {order.order_items.map((item) => {
//                 const productImage = item.product.img.find(
//                   (img) => img.id === item.variant.img_id
//                 );

//                 return (
//                   <div
//                     key={item.id}
//                     className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4"
//                   >
//                     <div className="flex items-center gap-4 w-full sm:w-auto">
//                       <img
//                         src={
//                           productImage
//                             ? `${API_BASE_URL}/public/img/${productImage.name}`
//                             : item.image_url || "/img/default.webp"
//                         }
//                         width={80}
//                         height={80}
//                         alt={item.product.name}
//                         className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border"
//                       />
//                       <div className="space-y-1 text-sm">
//                         <p className="text-base font-medium text-gray-800 break-words">
//                           {item.product.name}
//                         </p>
//                         <p className="text-gray-500">
//                           Phân loại: Size {item.variant.size}
//                         </p>
//                         <p className="text-gray-500">
//                           Số lượng: {item.quantity}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4 text-right">
//                       <div className="text-base font-semibold text-orange-600 whitespace-nowrap min-w-[100px]">
//                         {parseInt(item.price).toLocaleString("vi-VN")}₫
//                       </div>
//                       <button
//                         className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
//                         onClick={() => {
//                           setSelectedProduct(item.product);
//                           setSelectedVariantId(item.variant_id);
//                           setShowReviewModal(true);
//                         }}
//                       >
//                         Đánh giá
//                       </button>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             <div className="flex justify-end gap-2 px-4 py-3 bg-gray-50 rounded-b-xl text-sm text-gray-700">
//               <div className="text-right space-y-1">
//                 <p className="text-gray-500">Tổng tiền:</p>
//                 <p className="text-lg font-bold text-orange-600">
//                   {parseInt(order.total_price).toLocaleString("vi-VN")}₫
//                 </p>
//               </div>
//             </div>

//             <div className="flex flex-wrap justify-end gap-2 p-4 border-t bg-white rounded-b-xl">
//               <button className="px-4 py-1 border rounded text-gray-600 hover:bg-gray-100 text-sm">
//                 Xem chi tiết
//               </button>
//               <button className="px-4 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm">
//                 Mua lại
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Review Modal */}
//       <Dialog.Root open={showReviewModal} onOpenChange={setShowReviewModal}>
//         <Dialog.Portal>
//           <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
//           <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[95vw] sm:w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white px-4 sm:px-6 py-4 sm:py-6 rounded-2xl shadow-2xl max-h-[90vh] overflow-auto">
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{
//                 type: "spring",
//                 stiffness: 300,
//                 damping: 30,
//               }}
//             >
//               <div className="flex justify-between items-center border-b pb-3 sm:pb-4 mb-4 sm:mb-6">
//                 <Dialog.Title className="text-lg sm:text-xl font-bold text-gray-900">
//                   Đánh giá sản phẩm: {selectedProduct?.name}
//                 </Dialog.Title>
//                 <Dialog.Close asChild>
//                   <motion.button
//                     className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-200"
//                     whileHover={{ scale: 1.1, rotate: 90 }}
//                     whileTap={{ scale: 0.9 }}
//                   >
//                     <X size={20} className="sm:w-6 sm:h-6" />
//                   </motion.button>
//                 </Dialog.Close>
//               </div>

//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-base font-semibold text-gray-700 mb-3">
//                     Đánh giá của bạn:
//                   </label>
//                   <div className="flex items-center gap-2">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <motion.button
//                         key={star}
//                         whileHover={{ scale: 1.2, rotate: 15 }}
//                         whileTap={{ scale: 1.4, rotate: -15 }}
//                         onClick={() => setRating(star)}
//                         onMouseEnter={() => setHoveredStars(star)}
//                         onMouseLeave={() => setHoveredStars(0)}
//                         className="p-1.5 rounded-full hover:bg-yellow-50 transition-all duration-200"
//                       >
//                         <Star
//                           size={28}
//                           className={`transition-all duration-300 ${
//                             (hoveredStars > 0
//                             ? star <= hoveredStars
//                             : rating >= star)
//                               ? "text-yellow-400 fill-yellow-400 drop-shadow-lg"
//                               : "text-gray-300 hover:text-yellow-200"
//                           }`}
//                         />
//                       </motion.button>
//                     ))}
//                     <span className="ml-3 text-base font-semibold text-gray-600">
//                       ({hoveredStars > 0 ? hoveredStars : rating} sao)
//                     </span>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-base font-semibold text-gray-700 mb-3">
//                     Nhận xét của bạn:
//                   </label>
//                   <motion.textarea
//                     initial={{ scale: 0.98, opacity: 0.8 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     whileFocus={{ scale: 1.02 }}
//                     transition={{ duration: 0.3 }}
//                     className="w-full border-2 border-blue-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/25 focus:border-blue-500 transition-all duration-300 resize-none shadow-lg hover:shadow-xl bg-white"
//                     rows={4}
//                     placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                   />
//                 </div>

//                 <motion.button
//                   whileHover={{
//                     scale: 1.02,
//                     boxShadow: "0 15px 35px rgba(59, 130, 246, 0.4)",
//                     y: -2,
//                   }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={handleSubmitReview}
//                   className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-bold text-base shadow-xl transition-all duration-300"
//                 >
//                   Gửi đánh giá
//                 </motion.button>
//               </div>
//             </motion.div>
//           </Dialog.Content>
//         </Dialog.Portal>
//       </Dialog.Root>

//       <style jsx>{`
//         .scrollbar-thin {
//           scrollbar-width: thin;
//           scrollbar-color: #cbd5e0 #f7fafc;
//         }
//         .scrollbar-thin::-webkit-scrollbar {
//           width: 4px;
//         }
//         .scrollbar-thin::-webkit-scrollbar-track {
//           background: #f7fafc;
//           border-radius: 6px;
//         }
//         .scrollbar-thin::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #cbd5e0, #a0aec0);
//           border-radius: 6px;
//         }
//         .scrollbar-thin::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #a0aec0, #718096);
//         }
//         .line-clamp-4 {
//           display: -webkit-box;
//           -webkit-line-clamp: 4;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//         @media (max-width: 640px) {
//           .scrollbar-thin::-webkit-scrollbar {
//             width: 2px;
//           }
//         }
//         @media (max-width: 480px) {
//           .line-clamp-4 {
//             -webkit-line-clamp: 3;
//           }
//         }
//         @media (max-width: 375px) {
//           .text-responsive {
//             font-size: 0.875rem;
//           }
//           .gap-responsive {
//             gap: 0.5rem;
//           }
//           .p-responsive {
//             padding: 0.75rem;
//           }
//         }
//         @media (max-width: 640px) {
//           button {
//             min-height: 44px;
//             min-width: 44px;
//           }
//           .touch-target {
//             padding: 12px;
//           }
//         }
//         @media (max-width: 480px) {
//           .text-balance {
//             text-wrap: balance;
//           }
//           .leading-relaxed {
//             line-height: 1.6;
//           }
//         }
//         @media (max-width: 320px) {
//           .container-sm {
//             padding-left: 0.5rem;
//             padding-right: 0.5rem;
//           }
//           .text-xs-responsive {
//             font-size: 0.75rem;
//           }
//           .gap-xs-responsive {
//             gap: 0.25rem;
//           }
//         }
//         @media (max-height: 500px) and (orientation: landscape) {
//           .mobile-landscape-optimize {
//             padding-top: 1rem;
//             padding-bottom: 1rem;
//           }
//           .mobile-landscape-grid {
//             grid-template-columns: 1fr 1fr;
//             gap: 1rem;
//           }
//         }
//         @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
//           .high-dpi-shadow {
//             box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
//           }
//         }
//         @media (prefers-color-scheme: dark) {
//           .dark-mode-support {
//             /* Add dark mode styles if needed */
//           }
//         }
//         @media (prefers-reduced-motion: reduce) {
//           * {
//             animation-duration: 0.01ms !important;
//             animation-iteration-count: 1 !important;
//             transition-duration: 0.01ms !important;
//           }
//         }
//         .focus-visible:focus-visible {
//           outline: 2px solid #3b82f6;
//           outline-offset: 2px;
//         }
//         @media (prefers-contrast: high) {
//           .high-contrast {
//             border-width: 2px;
//             font-weight: 600;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import { Star, X } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type Variant = {
  id: number;
  product_id: number;
  img_id: number;
  size: string;
  stock_quantity: number;
  price: number;
  sale_price: number | null;
  status: string;
  active: string;
};

type ProductImage = {
  id: number;
  product_id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  category_id: number;
  status: string;
  active: string;
  img: ProductImage[];
};

type OrderItem = {
  id: number;
  order_id: number;
  variant_id: number;
  quantity: string;
  price: string;
  variant: Variant;
  product: Product;
  image_url?: string;
};

type Order = {
  id: number;
  created_at: string;
  total_price: string;
  status: string;
  order_items: OrderItem[];
  vnp_TxnRef: string;
  order_code?: string;
};

type ReviewStatus = {
  product_id: number;
  variant_id: number;
  hasReviewed: boolean;
};

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    null
  );
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoveredStars, setHoveredStars] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewStatus, setReviewStatus] = useState<ReviewStatus[]>([]);

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  const statusTabs = [
    { key: "all", label: "Tất cả" },
    { key: "pending", label: "Chờ xác nhận" },
    { key: "processing", label: "Đang giao" },
    { key: "paid", label: "Đã hoàn thành" },
    { key: "cancelled", label: "Đã hủy" },
  ];

  useEffect(() => {
    const fetchOrdersAndReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Bạn cần đăng nhập để xem đơn hàng!");
          return;
        }

        // Fetch orders
        const orderRes = await axios.get(`${API_BASE_URL}/api/order`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(orderRes.data.data);

        // Fetch review status for each order item
        const reviewPromises = orderRes.data.data.flatMap((order: Order) =>
          order.order_items.map((item: OrderItem) =>
            axios.get(`${API_BASE_URL}/api/review/status`, {
              headers: { Authorization: `Bearer ${token}` },
              params: {
                product_id: item.product.id,
                variant_id: item.variant_id,
              },
            })
          )
        );

        const reviewResponses = await Promise.all(reviewPromises);
        const reviewStatusData = reviewResponses.map((res, index) => ({
          product_id:
            orderRes.data.data[
              Math.floor(index / orderRes.data.data[0].order_items.length)
            ].order_items[index % orderRes.data.data[0].order_items.length]
              .product.id,
          variant_id:
            orderRes.data.data[
              Math.floor(index / orderRes.data.data[0].order_items.length)
            ].order_items[index % orderRes.data.data[0].order_items.length]
              .variant_id,
          hasReviewed: res.data.hasReviewed,
        }));
        setReviewStatus(reviewStatusData);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
        toast.error(
          "Không thể tải danh sách đơn hàng hoặc trạng thái đánh giá"
        );
      }
    };

    fetchOrdersAndReviews();
  }, []);

  const handleSubmitReview = async () => {
    if (!selectedProduct || selectedVariantId === null) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Bạn cần đăng nhập để bình luận!", {
        icon: "⚠️",
        style: {
          borderRadius: "16px",
          background: "#FEF2F2",
          color: "#DC2626",
          border: "1px solid #FECACA",
        },
      });
      return;
    }
    if (!comment.trim()) {
      toast.error("Vui lòng nhập nội dung bình luận!", {
        icon: "⚠️",
        style: {
          borderRadius: "16px",
          background: "#FEF2F2",
          color: "#DC2626",
          border: "1px solid #FECACA",
        },
      });
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: selectedProduct.id,
          rating,
          comment,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Đánh giá thành công!", {
          icon: "⭐",
          style: {
            borderRadius: "16px",
            background: "#F0FDF4",
            color: "#16A34A",
          },
        });
        setReviewStatus((prev) => [
          ...prev,
          {
            product_id: selectedProduct.id,
            variant_id: selectedVariantId,
            hasReviewed: true,
          },
        ]);
        setComment("");
        setRating(5);
        setShowReviewModal(false);
      } else {
        toast.error(data.message || "Có lỗi khi gửi đánh giá", {
          style: {
            borderRadius: "16px",
            background: "#FEF2F2",
            color: "#DC2626",
            border: "1px solid #FECACA",
          },
        });
      }
    } catch {
      toast.error("Có lỗi khi gửi đánh giá", {
        style: {
          borderRadius: "16px",
          background: "#FEF2F2",
          color: "#DC2626",
          border: "1px solid #FECACA",
        },
      });
    }
  };

  const statusCounts: Record<string, number> = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    paid: orders.filter((o) => o.status === "paid").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  const hasReviewed = (productId: number, variantId: number) => {
    return reviewStatus.some(
      (status) =>
        status.product_id === productId &&
        status.variant_id === variantId &&
        status.hasReviewed
    );
  };

  return (
    <section className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-md transition w-full overflow-x-hidden">
      <h2 className="text-xl font-semibold mb-6 text-orange-600">
        Đơn hàng của bạn
      </h2>

      <div className="flex flex-wrap gap-3 mb-6">
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            className={`relative px-4 py-2 rounded-full border text-sm font-medium transition
            ${
              statusFilter === tab.key
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-orange-50"
            }`}
            onClick={() => setStatusFilter(tab.key)}
          >
            {tab.label}
            {statusCounts[tab.key] > 0 && (
              <span
                className={`absolute -top-2 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded-full
                ${
                  statusFilter === tab.key
                    ? "bg-white text-orange-500 border border-orange-500"
                    : "bg-orange-500 text-white"
                }`}
                style={{ minWidth: 20, display: "inline-block" }}
              >
                {statusCounts[tab.key]}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredOrders.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            Không có đơn hàng nào.
          </div>
        )}

        {filteredOrders.map((order) => (
          <div key={order.id} className="border rounded-xl transition bg-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-orange-50 border-b p-4 rounded-t-xl gap-2">
              <div className="text-sm text-gray-700 space-x-2">
                <span>Mã đơn:</span>
                <span className="font-medium text-gray-900">
                  #{order.order_code ?? order.vnp_TxnRef}
                </span>
                <span className="text-gray-400">|</span>
                <span
                  className={`${
                    order.status === "pending"
                      ? "text-yellow-500"
                      : order.status === "processing"
                      ? "text-blue-500"
                      : order.status === "paid"
                      ? "text-green-600"
                      : order.status === "cancelled"
                      ? "text-red-500"
                      : ""
                  } font-semibold`}
                >
                  {order.status === "pending" && "Chờ xác nhận"}
                  {order.status === "processing" && "Đang giao"}
                  {order.status === "paid" && "Đã thanh toán"}
                  {order.status === "cancelled" && "Đã hủy"}
                  {!["pending", "processing", "paid", "cancelled"].includes(
                    order.status
                  ) && order.status}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(order.created_at).toLocaleDateString()}
              </div>
            </div>

            <div className="divide-y">
              {order.order_items.map((item) => {
                const productImage = item.product.img.find(
                  (img) => img.id === item.variant.img_id
                );

                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={
                          productImage
                            ? `${API_BASE_URL}/public/img/${productImage.name}`
                            : item.image_url || "/img/default.webp"
                        }
                        width={80}
                        height={80}
                        alt={item.product.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border"
                      />
                      <div className="space-y-1 text-sm">
                        <p className="text-base font-medium text-gray-800 break-words">
                          {item.product.name}
                        </p>
                        <p className="text-gray-500">
                          Phân loại: Size {item.variant.size}
                        </p>
                        <p className="text-gray-500">
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div className="text-base font-semibold text-orange-600 whitespace-nowrap min-w-[100px]">
                        {parseInt(item.price).toLocaleString("vi-VN")}₫
                      </div>
                      {order.status === "paid" &&
                        !hasReviewed(item.product.id, item.variant_id) && (
                          <button
                            className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                            onClick={() => {
                              setSelectedProduct(item.product);
                              setSelectedVariantId(item.variant_id);
                              setShowReviewModal(true);
                            }}
                          >
                            Đánh giá
                          </button>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-2 px-4 py-3 bg-gray-50 rounded-b-xl text-sm text-gray-700">
              <div className="text-right space-y-1">
                <p className="text-gray-500">Tổng tiền:</p>
                <p className="text-lg font-bold text-orange-600">
                  {parseInt(order.total_price).toLocaleString("vi-VN")}₫
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-2 p-4 border-t bg-white rounded-b-xl">
              <button className="px-4 py-1 border rounded text-gray-600 hover:bg-gray-100 text-sm">
                Xem chi tiết
              </button>
              <button className="px-4 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm">
                Mua lại
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      <Dialog.Root open={showReviewModal} onOpenChange={setShowReviewModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
          <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[95vw] sm:w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white px-4 sm:px-6 py-4 sm:py-6 rounded-2xl shadow-2xl max-h-[90vh] overflow-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <div className="flex justify-between items-center border-b pb-3 sm:pb-4 mb-4 sm:mb-6">
                <Dialog.Title className="text-lg sm:text-xl font-bold text-gray-900">
                  Đánh giá sản phẩm: {selectedProduct?.name}
                </Dialog.Title>
                <Dialog.Close asChild>
                  <motion.button
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all duration-200"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} className="sm:w-6 sm:h-6" />
                  </motion.button>
                </Dialog.Close>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-3">
                    Đánh giá của bạn:
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        whileTap={{ scale: 1.4, rotate: -15 }}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredStars(star)}
                        onMouseLeave={() => setHoveredStars(0)}
                        className="p-1.5 rounded-full hover:bg-yellow-50 transition-all duration-200"
                      >
                        <Star
                          size={28}
                          className={`transition-all duration-300 ${
                            (hoveredStars > 0
                            ? star <= hoveredStars
                            : rating >= star)
                              ? "text-yellow-400 fill-yellow-400 drop-shadow-lg"
                              : "text-gray-300 hover:text-yellow-200"
                          }`}
                        />
                      </motion.button>
                    ))}
                    <span className="ml-3 text-base font-semibold text-gray-600">
                      ({hoveredStars > 0 ? hoveredStars : rating} sao)
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-base font-semibold text-gray-700 mb-3">
                    Nhận xét của bạn:
                  </label>
                  <motion.textarea
                    initial={{ scale: 0.98, opacity: 0.8 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="w-full border-2 border-blue-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/25 focus:border-blue-500 transition-all duration-300 resize-none shadow-lg hover:shadow-xl bg-white"
                    rows={4}
                    placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 15px 35px rgba(59, 130, 246, 0.4)",
                    y: -2,
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmitReview}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-bold text-base shadow-xl transition-all duration-300"
                >
                  Gửi đánh giá
                </motion.button>
              </div>
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <style jsx>{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e0 #f7fafc;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f7fafc;
          border-radius: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #cbd5e0, #a0aec0);
          border-radius: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #a0aec0, #718096);
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (max-width: 640px) {
          .scrollbar-thin::-webkit-scrollbar {
            width: 2px;
          }
        }
        @media (max-width: 480px) {
          .line-clamp-4 {
            -webkit-line-clamp: 3;
          }
        }
        @media (max-width: 375px) {
          .text-responsive {
            font-size: 0.875rem;
          }
          .gap-responsive {
            gap: 0.5rem;
          }
          .p-responsive {
            padding: 0.75rem;
          }
        }
        @media (max-width: 640px) {
          button {
            min-height: 44px;
            min-width: 44px;
          }
          .touch-target {
            padding: 12px;
          }
        }
        @media (max-width: 480px) {
          .text-balance {
            text-wrap: balance;
          }
          .leading-relaxed {
            line-height: 1.6;
          }
        }
        @media (max-width: 320px) {
          .container-sm {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
          .text-xs-responsive {
            font-size: 0.75rem;
          }
          .gap-xs-responsive {
            gap: 0.25rem;
          }
        }
        @media (max-height: 500px) and (orientation: landscape) {
          .mobile-landscape-optimize {
            padding-top: 1rem;
            padding-bottom: 1rem;
          }
          .mobile-landscape-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
        }
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .high-dpi-shadow {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
          }
        }
        @media (prefers-color-scheme: dark) {
          .dark-mode-support {
            /* Add dark mode styles if needed */
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        .focus-visible:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
        @media (prefers-contrast: high) {
          .high-contrast {
            border-width: 2px;
            font-weight: 600;
          }
        }
      `}</style>
    </section>
  );
}
