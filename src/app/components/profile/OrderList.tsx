// // "use client";
// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import * as Dialog from "@radix-ui/react-dialog";
// // import { Star, X } from "lucide-react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { toast } from "react-hot-toast";

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
// //   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
// //   const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
// //     null
// //   );
// //   const [rating, setRating] = useState(5);
// //   const [comment, setComment] = useState("");
// //   const [hoveredStars, setHoveredStars] = useState(0);
// //   const [showReviewModal, setShowReviewModal] = useState(false);

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
// //         toast.error("Không thể tải danh sách đơn hàng");
// //       }
// //     };

// //     fetchOrders();
// //   }, []);

// //   const handleSubmitReview = async () => {
// //     if (!selectedProduct || selectedVariantId === null) return;

// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       toast.error("Bạn cần đăng nhập để bình luận!", {
// //         icon: "⚠️",
// //         style: {
// //           borderRadius: "16px",
// //           background: "#FEF2F2",
// //           color: "#DC2626",
// //           border: "1px solid #FECACA",
// //         },
// //       });
// //       return;
// //     }
// //     if (!comment.trim()) {
// //       toast.error("Vui lòng nhập nội dung bình luận!", {
// //         icon: "⚠️",
// //         style: {
// //           borderRadius: "16px",
// //           background: "#FEF2F2",
// //           color: "#DC2626",
// //           border: "1px solid #FECACA",
// //         },
// //       });
// //       return;
// //     }

// //     try {
// //       const res = await fetch(`${API_BASE_URL}/api/review`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Accept: "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({
// //           product_id: selectedProduct.id,
// //           rating,
// //           comment,
// //         }),
// //       });
// //       const data = await res.json();
// //       if (res.ok) {
// //         toast.success("Đánh giá thành công!", {
// //           icon: "⭐",
// //           style: {
// //             borderRadius: "16px",
// //             background: "#F0FDF4",
// //             color: "#16A34A",
// //           },
// //         });
// //         setComment("");
// //         setRating(5);
// //         setShowReviewModal(false);
// //       } else {
// //         toast.error(data.message || "Có lỗi khi gửi đánh giá", {
// //           style: {
// //             borderRadius: "16px",
// //             background: "#FEF2F2",
// //             color: "#DC2626",
// //             border: "1px solid #FECACA",
// //           },
// //         });
// //       }
// //     } catch {
// //       toast.error("Có lỗi khi gửi đánh giá", {
// //         style: {
// //           borderRadius: "16px",
// //           background: "#FEF2F2",
// //           color: "#DC2626",
// //           border: "1px solid #FECACA",
// //         },
// //       });
// //     }
// //   };

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

// //                 return (
// //                   <div
// //                     key={item.id}
// //                     className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4"
// //                   >
// //                     <div className="flex items-center gap-4 w-full sm:w-auto">
// //                       <img
// //                         src={
// //                           productImage
// //                             ? `${API_BASE_URL}/public/img/${productImage.name}`
// //                             : item.image_url || "/img/default.webp"
// //                         }
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
// //                     <div className="flex items-center gap-4 text-right">
// //                       <div className="text-base font-semibold text-orange-600 whitespace-nowrap min-w-[100px]">
// //                         {parseInt(item.price).toLocaleString("vi-VN")}₫
// //                       </div>
// //                       {order.status === "paid" && (
// //                         <button
// //                           className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
// //                           onClick={() => {
// //                             setSelectedProduct(item.product);
// //                             setSelectedVariantId(item.variant_id);
// //                             setShowReviewModal(true);
// //                           }}
// //                         >
// //                           Đánh giá
// //                         </button>
// //                       )}
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

// //       {/* Review Modal */}
// //       <Dialog.Root open={showReviewModal} onOpenChange={setShowReviewModal}>
// //         <Dialog.Portal>
// //           <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300" />
// //           <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[95vw] sm:w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white to-gray-50 p-6 sm:p-8 rounded-2xl shadow-2xl max-h-[90vh] overflow-auto focus:outline-none">
// //             <AnimatePresence>
// //               <motion.div
// //                 initial={{ scale: 0.95, opacity: 0, y: 20 }}
// //                 animate={{ scale: 1, opacity: 1, y: 0 }}
// //                 exit={{ scale: 0.95, opacity: 0, y: 20 }}
// //                 transition={{
// //                   type: "spring",
// //                   stiffness: 400,
// //                   damping: 25,
// //                 }}
// //                 className="space-y-6"
// //               >
// //                 <div className="flex items-center justify-between border-b border-gray-200 pb-4">
// //                   <Dialog.Title className="text-xl sm:text-2xl font-bold text-gray-900">
// //                     Đánh giá sản phẩm
// //                   </Dialog.Title>
// //                   <Dialog.Close asChild>
// //                     <motion.button
// //                       className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200"
// //                       whileHover={{ scale: 1.2, rotate: 90 }}
// //                       whileTap={{ scale: 0.9 }}
// //                     >
// //                       <X size={24} />
// //                     </motion.button>
// //                   </Dialog.Close>
// //                 </div>

// //                 {selectedProduct && (
// //                   <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg">
// //                     <img
// //                       src={
// //                         selectedProduct.img[0]
// //                           ? `${API_BASE_URL}/public/img/${selectedProduct.img[0].name}`
// //                           : "/img/default.webp"
// //                       }
// //                       alt={selectedProduct.name}
// //                       className="w-16 h-16 object-cover rounded-md border border-gray-200"
// //                     />
// //                     <div>
// //                       <p className="text-lg font-semibold text-gray-800">
// //                         {selectedProduct.name}
// //                       </p>
// //                       <p className="text-sm text-gray-500 line-clamp-2">
// //                         {selectedProduct.description}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 )}

// //                 <div className="space-y-4">
// //                   <label className="block text-base font-semibold text-gray-700">
// //                     Chất lượng sản phẩm
// //                   </label>
// //                   <div className="flex items-center gap-2">
// //                     {[1, 2, 3, 4, 5].map((star) => (
// //                       <motion.button
// //                         key={star}
// //                         whileHover={{ scale: 1.3, y: -2 }}
// //                         whileTap={{ scale: 1.1 }}
// //                         onClick={() => setRating(star)}
// //                         onMouseEnter={() => setHoveredStars(star)}
// //                         onMouseLeave={() => setHoveredStars(0)}
// //                         className="p-2 rounded-full hover:bg-yellow-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
// //                       >
// //                         <Star
// //                           size={32}
// //                           className={`${
// //                             (hoveredStars > 0
// //                             ? star <= hoveredStars
// //                             : star <= rating)
// //                               ? "text-yellow-400 fill-yellow-400"
// //                               : "text-gray-300"
// //                           } transition-colors duration-200`}
// //                         />
// //                       </motion.button>
// //                     ))}
// //                     <span className="ml-3 text-sm font-medium text-gray-600">
// //                       {hoveredStars > 0 ? hoveredStars : rating} sao
// //                     </span>
// //                   </div>
// //                 </div>

// //                 <div className="space-y-4">
// //                   <label className="block text-base font-semibold text-gray-700">
// //                     Nhận xét của bạn
// //                   </label>
// //                   <motion.textarea
// //                     initial={{ scale: 0.98 }}
// //                     animate={{ scale: 1 }}
// //                     whileFocus={{ scale: 1.01, borderColor: "#3B82F6" }}
// //                     transition={{ duration: 0.2 }}
// //                     className="w-full border border-gray-300 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none bg-white shadow-sm hover:shadow-md"
// //                     rows={5}
// //                     placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
// //                     value={comment}
// //                     onChange={(e) => setComment(e.target.value)}
// //                   />
// //                 </div>

// //                 <div className="flex justify-end gap-3">
// //                   <Dialog.Close asChild>
// //                     <motion.button
// //                       whileHover={{ scale: 1.05 }}
// //                       whileTap={{ scale: 0.95 }}
// //                       className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-300 transition-all duration-200"
// //                     >
// //                       Hủy
// //                     </motion.button>
// //                   </Dialog.Close>
// //                   <motion.button
// //                     whileHover={{
// //                       scale: 1.05,
// //                       boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
// //                     }}
// //                     whileTap={{ scale: 0.95 }}
// //                     onClick={handleSubmitReview}
// //                     className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium text-sm hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
// //                     disabled={!comment.trim()}
// //                   >
// //                     Gửi đánh giá
// //                   </motion.button>
// //                 </div>
// //               </motion.div>
// //             </AnimatePresence>
// //           </Dialog.Content>
// //         </Dialog.Portal>
// //       </Dialog.Root>
// //     </section>
// //   );
// // }
// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import * as Dialog from "@radix-ui/react-dialog";
// import { Star, X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
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

//   const handleCancelOrder = async (orderId: number) => {
//     if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.post(
//           `${API_BASE_URL}/api/order/cancel/${orderId}`,
//           {},
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         if (res.status === 200) {
//           toast.success("Đơn hàng đã được hủy thành công!");
//           setOrders(
//             orders.map((order) =>
//               order.id === orderId ? { ...order, status: "cancelled" } : order
//             )
//           );
//         }
//       } catch (err) {
//         console.error("Lỗi khi hủy đơn hàng:", err);
//         toast.error("Không thể hủy đơn hàng");
//       }
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
//                       {order.status === "paid" && (
//                         <button
//                           className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
//                           onClick={() => {
//                             setSelectedProduct(item.product);
//                             setSelectedVariantId(item.variant_id);
//                             setShowReviewModal(true);
//                           }}
//                         >
//                           Đánh giá
//                         </button>
//                       )}
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
//               {order.status === "pending" && (
//                 <button
//                   className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
//                   onClick={() => handleCancelOrder(order.id)}
//                 >
//                   Hủy đơn
//                 </button>
//               )}
//               {/* <button className="px-4 py-1 border rounded text-gray-600 hover:bg-gray-100 text-sm">
//                 Xem chi tiết
//               </button>
//               <button className="px-4 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm">
//                 Mua lại
//               </button> */}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Review Modal */}
//       <Dialog.Root open={showReviewModal} onOpenChange={setShowReviewModal}>
//         <Dialog.Portal>
//           <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300" />
//           <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[95vw] sm:w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white to-gray-50 p-6 sm:p-8 rounded-2xl shadow-2xl max-h-[90vh] overflow-auto focus:outline-none">
//             <AnimatePresence>
//               <motion.div
//                 initial={{ scale: 0.95, opacity: 0, y: 20 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.95, opacity: 0, y: 20 }}
//                 transition={{
//                   type: "spring",
//                   stiffness: 400,
//                   damping: 25,
//                 }}
//                 className="space-y-6"
//               >
//                 <div className="flex items-center justify-between border-b border-gray-200 pb-4">
//                   <Dialog.Title className="text-xl sm:text-2xl font-bold text-gray-900">
//                     Đánh giá sản phẩm
//                   </Dialog.Title>
//                   <Dialog.Close asChild>
//                     <motion.button
//                       className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200"
//                       whileHover={{ scale: 1.2, rotate: 90 }}
//                       whileTap={{ scale: 0.9 }}
//                     >
//                       <X size={24} />
//                     </motion.button>
//                   </Dialog.Close>
//                 </div>

//                 {selectedProduct && (
//                   <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg">
//                     <img
//                       src={
//                         selectedProduct.img[0]
//                           ? `${API_BASE_URL}/public/img/${selectedProduct.img[0].name}`
//                           : "/img/default.webp"
//                       }
//                       alt={selectedProduct.name}
//                       className="w-16 h-16 object-cover rounded-md border border-gray-200"
//                     />
//                     <div>
//                       <p className="text-lg font-semibold text-gray-800">
//                         {selectedProduct.name}
//                       </p>
//                       <p className="text-sm text-gray-500 line-clamp-2">
//                         {selectedProduct.description}
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 <div className="space-y-4">
//                   <label className="block text-base font-semibold text-gray-700">
//                     Chất lượng sản phẩm
//                   </label>
//                   <div className="flex items-center gap-2">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <motion.button
//                         key={star}
//                         whileHover={{ scale: 1.3, y: -2 }}
//                         whileTap={{ scale: 1.1 }}
//                         onClick={() => setRating(star)}
//                         onMouseEnter={() => setHoveredStars(star)}
//                         onMouseLeave={() => setHoveredStars(0)}
//                         className="p-2 rounded-full hover:bg-yellow-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                       >
//                         <Star
//                           size={32}
//                           className={`${
//                             (hoveredStars > 0
//                             ? star <= hoveredStars
//                             : star <= rating)
//                               ? "text-yellow-400 fill-yellow-400"
//                               : "text-gray-300"
//                           } transition-colors duration-200`}
//                         />
//                       </motion.button>
//                     ))}
//                     <span className="ml-3 text-sm font-medium text-gray-600">
//                       {hoveredStars > 0 ? hoveredStars : rating} sao
//                     </span>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <label className="block text-base font-semibold text-gray-700">
//                     Nhận xét của bạn
//                   </label>
//                   <motion.textarea
//                     initial={{ scale: 0.98 }}
//                     animate={{ scale: 1 }}
//                     whileFocus={{ scale: 1.01, borderColor: "#3B82F6" }}
//                     transition={{ duration: 0.2 }}
//                     className="w-full border border-gray-300 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none bg-white shadow-sm hover:shadow-md"
//                     rows={5}
//                     placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                   />
//                 </div>

//                 <div className="flex justify-end gap-3">
//                   <Dialog.Close asChild>
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-300 transition-all duration-200"
//                     >
//                       Hủy
//                     </motion.button>
//                   </Dialog.Close>
//                   <motion.button
//                     whileHover={{
//                       scale: 1.05,
//                       boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
//                     }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={handleSubmitReview}
//                     className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium text-sm hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
//                     disabled={!comment.trim()}
//                   >
//                     Gửi đánh giá
//                   </motion.button>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </Dialog.Content>
//         </Dialog.Portal>
//       </Dialog.Root>
//     </section>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import { Star, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

export default function OrderList() {
  // Lấy trạng thái tab từ localStorage khi khởi tạo
  const [statusFilter, setStatusFilter] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("orderStatusTab") || "all";
    }
    return "all";
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    null
  );
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoveredStars, setHoveredStars] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Lưu trạng thái tab vào localStorage khi thay đổi
  const handleTabChange = (key: string) => {
    setStatusFilter(key);
    localStorage.setItem("orderStatusTab", key);
  };

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
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE_URL}/api/order`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data.data);
      } catch (err) {
        console.error("Lỗi khi lấy đơn hàng:", err);
        toast.error("Không thể tải danh sách đơn hàng");
      }
    };

    fetchOrders();
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

  const handleCancelOrder = async (orderId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          `${API_BASE_URL}/api/order/cancel/${orderId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.status === 200) {
          toast.success("Đơn hàng đã được hủy thành công!");
          setOrders(
            orders.map((order) =>
              order.id === orderId ? { ...order, status: "cancelled" } : order
            )
          );
        }
      } catch (err) {
        console.error("Lỗi khi hủy đơn hàng:", err);
        toast.error("Không thể hủy đơn hàng");
      }
    }
  };

  const statusCounts: Record<string, number> = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    paid: orders.filter((o) => o.status === "paid").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
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
            onClick={() => handleTabChange(tab.key)}
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
                      {order.status === "paid" && (
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
              {order.status === "pending" && (
                <button
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  onClick={() => handleCancelOrder(order.id)}
                >
                  Hủy đơn
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      <Dialog.Root open={showReviewModal} onOpenChange={setShowReviewModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300" />
          <Dialog.Content className="fixed z-50 top-1/2 left-1/2 w-[95vw] sm:w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white to-gray-50 p-6 sm:p-8 rounded-2xl shadow-2xl max-h-[90vh] overflow-auto focus:outline-none">
            <AnimatePresence>
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <Dialog.Title className="text-xl sm:text-2xl font-bold text-gray-900">
                    Đánh giá sản phẩm
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <motion.button
                      className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200"
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={24} />
                    </motion.button>
                  </Dialog.Close>
                </div>

                {selectedProduct && (
                  <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg">
                    <img
                      src={
                        selectedProduct.img[0]
                          ? `${API_BASE_URL}/public/img/${selectedProduct.img[0].name}`
                          : "/img/default.webp"
                      }
                      alt={selectedProduct.name}
                      className="w-16 h-16 object-cover rounded-md border border-gray-200"
                    />
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {selectedProduct.name}
                      </p>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {selectedProduct.description}
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <label className="block text-base font-semibold text-gray-700">
                    Chất lượng sản phẩm
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        whileHover={{ scale: 1.3, y: -2 }}
                        whileTap={{ scale: 1.1 }}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredStars(star)}
                        onMouseLeave={() => setHoveredStars(0)}
                        className="p-2 rounded-full hover:bg-yellow-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      >
                        <Star
                          size={32}
                          className={`${
                            (hoveredStars > 0
                            ? star <= hoveredStars
                            : star <= rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          } transition-colors duration-200`}
                        />
                      </motion.button>
                    ))}
                    <span className="ml-3 text-sm font-medium text-gray-600">
                      {hoveredStars > 0 ? hoveredStars : rating} sao
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-base font-semibold text-gray-700">
                    Nhận xét của bạn
                  </label>
                  <motion.textarea
                    initial={{ scale: 0.98 }}
                    animate={{ scale: 1 }}
                    whileFocus={{ scale: 1.01, borderColor: "#3B82F6" }}
                    transition={{ duration: 0.2 }}
                    className="w-full border border-gray-300 rounded-lg p-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none bg-white shadow-sm hover:shadow-md"
                    rows={5}
                    placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Dialog.Close asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-300 transition-all duration-200"
                    >
                      Hủy
                    </motion.button>
                  </Dialog.Close>
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmitReview}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium text-sm hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                    disabled={!comment.trim()}
                  >
                    Gửi đánh giá
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
