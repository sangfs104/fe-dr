// // "use client";
// // import { useAppSelector, useAppDispatch } from "@/store/hooks";
// // import {
// //   removeFromWishlistAPI,
// //   clearWishlist,
// //   fetchWishlist,
// // } from "@/store/wishlistSlice";
// // import Image from "next/image";
// // import toast from "react-hot-toast";

// // export default function WishlistModal({ onClose }: { onClose: () => void }) {
// //   const wishlist = useAppSelector((state) => state.wishlist.items);
// //   const dispatch = useAppDispatch();

// //   const handleRemove = async (productId: number) => {
// //     const result = await dispatch(removeFromWishlistAPI(productId));
// //     if (removeFromWishlistAPI.fulfilled.match(result)) {
// //       await dispatch(fetchWishlist());
// //       toast.success("Đã xóa khỏi wishlist");
// //     } else {
// //       toast.error("Có lỗi khi xóa khỏi wishlist");
// //     }
// //   };

// //   const handleClear = async () => {
// //     for (const item of wishlist) {
// //       await dispatch(removeFromWishlistAPI(item.productId));
// //     }
// //     dispatch(clearWishlist());
// //     toast.success("Đã xóa tất cả sản phẩm yêu thích");
// //     await dispatch(fetchWishlist());
// //   };

// //   return (
// //     <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
// //       <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
// //         <button
// //           className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
// //           onClick={onClose}
// //         >
// //           ×
// //         </button>
// //         <h2 className="text-xl font-bold mb-4">Sản phẩm yêu thích</h2>
// //         {wishlist.length === 0 ? (
// //           <p className="text-gray-500 text-center py-8">
// //             Chưa có sản phẩm nào trong danh sách yêu thích.
// //           </p>
// //         ) : (
// //           <>
// //             <ul className="divide-y">
// //               {wishlist.map((item) => (
// //                 <li
// //                   key={`${item.productId}-${item.variantId}`}
// //                   className="flex items-center gap-4 py-3"
// //                 >
// //                   <Image
// //                     src={
// //                       item.img &&
// //                       typeof item.img === "string" &&
// //                       item.img.trim() !== ""
// //                         ? `/img/${item.img}`
// //                         : "/img/no-image.png"
// //                     }
// //                     alt={item.name}
// //                     width={60}
// //                     height={60}
// //                     className="rounded border"
// //                   />

// //                   <div className="flex-1">
// //                     <div className="font-semibold">{item.name}</div>
// //                     <div className="text-sm text-gray-500">
// //                       Size: {item.size}
// //                     </div>
// //                     <div className="text-orange-600 font-bold">
// //                       {typeof item.price === "number"
// //                         ? item.price.toLocaleString("vi-VN")
// //                         : "—"}
// //                       ₫
// //                     </div>
// //                   </div>
// //                   <button
// //                     className="text-xs text-red-500 hover:underline"
// //                     onClick={() => handleRemove(item.productId)}
// //                   >
// //                     Xóa
// //                   </button>
// //                 </li>
// //               ))}
// //             </ul>
// //             <button
// //               className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
// //               onClick={handleClear}
// //             >
// //               Xóa tất cả
// //             </button>
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// // // // "use client";
// // // // import { useAppSelector, useAppDispatch } from "@/store/hooks";
// // // // import {
// // // //   removeFromWishlistAPI,
// // // //   clearWishlist,
// // // //   fetchWishlist,
// // // // } from "@/store/wishlistSlice";
// // // // import Image from "next/image";
// // // // import toast from "react-hot-toast";
// // // // import { X, Heart } from "lucide-react";

// // // // export default function WishlistModal({ onClose }: { onClose: () => void }) {
// // // //   const wishlist = useAppSelector((state) => state.wishlist.items);
// // // //   const dispatch = useAppDispatch();

// // // //   const handleRemove = async (productId: number) => {
// // // //     const result = await dispatch(removeFromWishlistAPI(productId));
// // // //     if (removeFromWishlistAPI.fulfilled.match(result)) {
// // // //       await dispatch(fetchWishlist());
// // // //       toast.success("Đã xóa khỏi wishlist");
// // // //     } else {
// // // //       toast.error("Có lỗi khi xóa khỏi wishlist");
// // // //     }
// // // //   };

// // // //   const handleClear = async () => {
// // // //     for (const item of wishlist) {
// // // //       await dispatch(removeFromWishlistAPI(item.productId));
// // // //     }
// // // //     dispatch(clearWishlist());
// // // //     toast.success("Đã xóa tất cả sản phẩm yêu thích");
// // // //     await dispatch(fetchWishlist());
// // // //   };

// // // //   return (
// // // //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#f8fafc]/80 via-[#f1f5f9]/80 to-[#f8fafc]/80 backdrop-blur-sm">
// // // //       <div className="relative w-full max-w-xl mx-4 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-lg border border-white/40 p-0 overflow-hidden animate-fadeIn">
// // // //         {/* Close Button */}
// // // //         <button
// // // //           className="absolute top-4 right-4 bg-white/70 hover:bg-red-500 hover:text-white text-gray-700 rounded-full p-2 shadow transition-all duration-200"
// // // //           onClick={onClose}
// // // //           aria-label="Đóng"
// // // //         >
// // // //           <X className="w-5 h-5" />
// // // //         </button>

// // // //         {/* Header */}
// // // //         <div className="flex items-center gap-2 px-8 pt-8 pb-4 border-b border-white/30 bg-gradient-to-r from-[#fff0] via-[#ffe5ec]/60 to-[#fff0]">
// // // //           <Heart className="text-pink-500 animate-pulse" size={28} />
// // // //           <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight drop-shadow">
// // // //             Yêu thích của bạn
// // // //           </h2>
// // // //           <span className="ml-auto text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-semibold shadow">
// // // //             {wishlist.length} sản phẩm
// // // //           </span>
// // // //         </div>

// // // //         {/* Wishlist Content */}
// // // //         <div className="p-6 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-transparent">
// // // //           {wishlist.length === 0 ? (
// // // //             <div className="flex flex-col items-center justify-center py-12">
// // // //               <Heart className="w-12 h-12 text-pink-300 mb-2 animate-bounce" />
// // // //               <p className="text-gray-500 text-lg font-medium text-center">
// // // //                 Danh sách yêu thích của bạn đang trống!
// // // //               </p>
// // // //               <p className="text-gray-400 text-sm mt-1 text-center">
// // // //                 Hãy thêm sản phẩm bạn yêu thích để dễ dàng xem lại và mua sắm
// // // //                 nhé.
// // // //               </p>
// // // //             </div>
// // // //           ) : (
// // // //             <>
// // // //               <ul className="divide-y divide-pink-100">
// // // //                 {wishlist.map((item) => (
// // // //                   <li
// // // //                     key={`${item.productId}-${item.variantId}`}
// // // //                     className="flex items-center gap-4 py-4 group hover:bg-pink-50/60 rounded-xl transition"
// // // //                   >
// // // //                     <div className="relative">
// // // //                       <Image
// // // //                         src={
// // // //                           item.img &&
// // // //                           typeof item.img === "string" &&
// // // //                           item.img.trim() !== ""
// // // //                             ? `/img/${item.img}`
// // // //                             : "/img/no-image.png"
// // // //                         }
// // // //                         alt={item.name}
// // // //                         width={70}
// // // //                         height={70}
// // // //                         className="rounded-xl border border-pink-100 shadow-sm object-cover w-16 h-16 md:w-20 md:h-20 bg-white"
// // // //                       />
// // // //                       <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full shadow font-bold animate-bounce">
// // // //                         {item.size}
// // // //                       </span>
// // // //                     </div>
// // // //                     <div className="flex-1 min-w-0">
// // // //                       <div className="font-bold text-base md:text-lg text-gray-900 truncate">
// // // //                         {item.name}
// // // //                       </div>
// // // //                       <div className="flex items-center gap-2 mt-1">
// // // //                         <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded font-semibold">
// // // //                           Size: {item.size}
// // // //                         </span>
// // // //                         <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded font-semibold">
// // // //                           Giá:{" "}
// // // //                           {typeof item.price === "number"
// // // //                             ? item.price.toLocaleString("vi-VN")
// // // //                             : "—"}
// // // //                           ₫
// // // //                         </span>
// // // //                       </div>
// // // //                     </div>
// // // //                     <button
// // // //                       className="ml-2 text-xs bg-white/80 hover:bg-red-500 hover:text-white text-red-500 border border-red-200 rounded-full px-3 py-1 font-semibold shadow transition-all duration-200"
// // // //                       onClick={() => handleRemove(item.productId)}
// // // //                     >
// // // //                       Xóa
// // // //                     </button>
// // // //                   </li>
// // // //                 ))}
// // // //               </ul>
// // // //               <button
// // // //                 className="mt-6 w-full py-3 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-white font-bold rounded-full shadow-lg hover:scale-105 hover:from-pink-600 transition-all duration-200 text-lg tracking-wide"
// // // //                 onClick={handleClear}
// // // //               >
// // // //                 Xóa tất cả yêu thích
// // // //               </button>
// // // //             </>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //       <style jsx global>{`
// // // //         .animate-fadeIn {
// // // //           animation: fadeInUp 0.5s cubic-bezier(0.23, 1, 0.32, 1);
// // // //         }
// // // //         @keyframes fadeInUp {
// // // //           0% {
// // // //             opacity: 0;
// // // //             transform: translateY(40px) scale(0.98);
// // // //           }
// // // //           100% {
// // // //             opacity: 1;
// // // //             transform: translateY(0) scale(1);
// // // //           }
// // // //         }
// // // //         .scrollbar-thin {
// // // //           scrollbar-width: thin;
// // // //         }
// // // //         .scrollbar-thumb-pink-200::-webkit-scrollbar-thumb {
// // // //           background: #fbcfe8;
// // // //           border-radius: 8px;
// // // //         }
// // // //         .scrollbar-track-transparent::-webkit-scrollbar-track {
// // // //           background: transparent;
// // // //         }
// // // //       `}</style>
// // // //     </div>
// // // //   );
// // // // }

// // // // "use client";
// // // // import { useAppSelector, useAppDispatch } from "@/store/hooks";
// // // // import {
// // // //   removeFromWishlistAPI,
// // // //   clearWishlist,
// // // //   fetchWishlist,
// // // // } from "@/store/wishlistSlice";
// // // // import Image from "next/image";
// // // // import toast from "react-hot-toast";
// // // // import { X, Heart } from "lucide-react";

// // // // export default function WishlistModal({ onClose }: { onClose: () => void }) {
// // // //   const wishlist = useAppSelector((state) => state.wishlist.items);
// // // //   const dispatch = useAppDispatch();

// // // //   const handleRemove = async (productId: number) => {
// // // //     const result = await dispatch(removeFromWishlistAPI(productId));
// // // //     if (removeFromWishlistAPI.fulfilled.match(result)) {
// // // //       await dispatch(fetchWishlist());
// // // //       toast.success("Đã xóa khỏi wishlist");
// // // //     } else {
// // // //       toast.error("Có lỗi khi xóa khỏi wishlist");
// // // //     }
// // // //   };

// // // //   const handleClear = async () => {
// // // //     for (const item of wishlist) {
// // // //       await dispatch(removeFromWishlistAPI(item.productId));
// // // //     }
// // // //     dispatch(clearWishlist());
// // // //     toast.success("Đã xóa tất cả sản phẩm yêu thích");
// // // //     await dispatch(fetchWishlist());
// // // //   };

// // // //   return (
// // // //     <div className="fixed inset-0 z-50 flex items-center justify-center">
// // // //       <div className="relative w-full max-w-xl mx-4 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-lg border border-white/40 p-0 overflow-hidden animate-fadeIn">
// // // //         {/* Close Button */}
// // // //         <button
// // // //           className="absolute top-4 right-4 bg-white/70 hover:bg-orange-500 hover:text-white text-gray-700 rounded-full p-2 shadow transition-all duration-200"
// // // //           onClick={onClose}
// // // //           aria-label="Đóng"
// // // //         >
// // // //           <X className="w-5 h-5" />
// // // //         </button>

// // // //         {/* Header */}
// // // //         <div className="flex items-center gap-2 px-8 pt-8 pb-4 border-b border-white/30 bg-gradient-to-r from-[#fff0] via-[#ffe5d9]/60 to-[#fff0]">
// // // //           <Heart className="text-[#ee4d2d] animate-pulse" size={28} />
// // // //           <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight drop-shadow">
// // // //             Yêu thích của bạn
// // // //           </h2>
// // // //           <span className="ml-auto text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-semibold shadow">
// // // //             {wishlist.length} sản phẩm
// // // //           </span>
// // // //         </div>

// // // //         {/* Wishlist Content */}
// // // //         <div className="p-6 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-transparent">
// // // //           {wishlist.length === 0 ? (
// // // //             <div className="flex flex-col items-center justify-center py-12">
// // // //               <Heart className="w-12 h-12 text-orange-200 mb-2 animate-bounce" />
// // // //               <p className="text-gray-500 text-lg font-medium text-center">
// // // //                 Danh sách yêu thích của bạn đang trống!
// // // //               </p>
// // // //               <p className="text-gray-400 text-sm mt-1 text-center">
// // // //                 Hãy thêm sản phẩm bạn yêu thích để dễ dàng xem lại và mua sắm
// // // //                 nhé.
// // // //               </p>
// // // //             </div>
// // // //           ) : (
// // // //             <>
// // // //               <ul className="divide-y divide-orange-100">
// // // //                 {wishlist.map((item) => (
// // // //                   <li
// // // //                     key={`${item.productId}-${item.variantId}`}
// // // //                     className="flex items-center gap-4 py-4 group hover:bg-orange-50/60 rounded-xl transition"
// // // //                   >
// // // //                     <div className="relative">
// // // //                       <Image
// // // //                         src={
// // // //                           item.img &&
// // // //                           typeof item.img === "string" &&
// // // //                           item.img.trim() !== ""
// // // //                             ? `/img/${item.img}`
// // // //                             : "/img/no-image.png"
// // // //                         }
// // // //                         alt={item.name}
// // // //                         width={70}
// // // //                         height={70}
// // // //                         className="rounded-xl border border-orange-100 shadow-sm object-cover w-16 h-16 md:w-20 md:h-20 bg-white"
// // // //                       />
// // // //                       <span className="absolute -top-2 -right-2 bg-[#ee4d2d] text-white text-xs px-2 py-0.5 rounded-full shadow font-bold animate-bounce">
// // // //                         {item.size}
// // // //                       </span>
// // // //                     </div>
// // // //                     <div className="flex-1 min-w-0">
// // // //                       <div className="font-bold text-base md:text-lg text-gray-900 truncate">
// // // //                         {item.name}
// // // //                       </div>
// // // //                       <div className="flex items-center gap-2 mt-1">
// // // //                         <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded font-semibold">
// // // //                           Size: {item.size}
// // // //                         </span>
// // // //                         <span className="text-xs bg-orange-200 text-orange-700 px-2 py-0.5 rounded font-semibold">
// // // //                           Giá:{" "}
// // // //                           {typeof item.price === "number"
// // // //                             ? item.price.toLocaleString("vi-VN")
// // // //                             : "—"}
// // // //                           ₫
// // // //                         </span>
// // // //                       </div>
// // // //                     </div>
// // // //                     <button
// // // //                       className="ml-2 text-xs bg-white/80 hover:bg-orange-500 hover:text-white text-orange-500 border border-orange-200 rounded-full px-3 py-1 font-semibold shadow transition-all duration-200"
// // // //                       onClick={() => handleRemove(item.productId)}
// // // //                     >
// // // //                       Xóa
// // // //                     </button>
// // // //                   </li>
// // // //                 ))}
// // // //               </ul>
// // // //               <button
// // // //                 className="mt-6 w-full py-3 bg-gradient-to-r from-[#ee4d2d] via-orange-400 to-yellow-400 text-white font-bold rounded-full shadow-lg hover:scale-105 hover:from-orange-600 transition-all duration-200 text-lg tracking-wide"
// // // //                 onClick={handleClear}
// // // //               >
// // // //                 Xóa tất cả yêu thích
// // // //               </button>
// // // //             </>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //       <style jsx global>{`
// // // //         .animate-fadeIn {
// // // //           animation: fadeInUp 0.5s cubic-bezier(0.23, 1, 0.32, 1);
// // // //         }
// // // //         @keyframes fadeInUp {
// // // //           0% {
// // // //             opacity: 0;
// // // //             transform: translateY(40px) scale(0.98);
// // // //           }
// // // //           100% {
// // // //             opacity: 1;
// // // //             transform: translateY(0) scale(1);
// // // //           }
// // // //         }
// // // //         .scrollbar-thin {
// // // //           scrollbar-width: thin;
// // // //         }
// // // //         .scrollbar-thumb-orange-200::-webkit-scrollbar-thumb {
// // // //           background: #fed7aa;
// // // //           border-radius: 8px;
// // // //         }
// // // //         .scrollbar-track-transparent::-webkit-scrollbar-track {
// // // //           background: transparent;
// // // //         }
// // // //       `}</style>
// // // //     </div>
// // // //   );
// // // // }

// "use client";
// import { useAppSelector, useAppDispatch } from "@/store/hooks";
// import {
//   removeFromWishlistAPI,
//   clearWishlist,
//   fetchWishlist,
// } from "@/store/wishlistSlice";
// import Image from "next/image";
// import toast from "react-hot-toast";
// import { X, Trash2, Loader2 } from "lucide-react";
// import { useState } from "react";

// export default function WishlistModal({ onClose }: { onClose: () => void }) {
//   const wishlist = useAppSelector((state) => state.wishlist.items);
//   const dispatch = useAppDispatch();
//   const [removingId, setRemovingId] = useState<number | null>(null);

//   const handleRemove = async (productId: number) => {
//     setRemovingId(productId);
//     const result = await dispatch(removeFromWishlistAPI(productId));
//     if (removeFromWishlistAPI.fulfilled.match(result)) {
//       await dispatch(fetchWishlist());
//       toast.success("Đã xóa khỏi wishlist", { duration: 2000 });
//     } else {
//       toast.error("Có lỗi khi xóa khỏi wishlist", { duration: 2000 });
//     }
//     setRemovingId(null);
//   };

//   const handleClear = async () => {
//     setRemovingId(-1); // Indicate clearing all
//     for (const item of wishlist) {
//       await dispatch(removeFromWishlistAPI(item.productId));
//     }
//     dispatch(clearWishlist());
//     toast.success("Đã xóa tất cả sản phẩm yêu thích", { duration: 2000 });
//     await dispatch(fetchWishlist());
//     setRemovingId(null);
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-gradient-to-b from-black/60 to-black/40 flex items-center justify-center p-4 font-sans">
//       <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md p-6 border border-white/20 max-h-[90vh] overflow-y-auto transition-all duration-300 hover:shadow-2xl">
//         <button
//           className="absolute top-4 right-4 text-white/80 hover:text-red-400 transition-colors transform hover:scale-110"
//           onClick={onClose}
//           aria-label="Đóng"
//         >
//           <X size={28} />
//         </button>
//         <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">
//           Sản phẩm yêu thích
//         </h2>
//         {wishlist.length === 0 ? (
//           <div className="text-white/70 text-center py-12">
//             <p className="text-lg">
//               Chưa có sản phẩm nào trong danh sách yêu thích.
//             </p>
//           </div>
//         ) : (
//           <>
//             <ul className="space-y-4">
//               {wishlist.map((item) => (
//                 <li
//                   key={`${item.productId}-${item.variantId}`}
//                   className="grid grid-cols-[80px_1fr_auto] items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200"
//                 >
//                   <Image
//                     src={
//                       item.img &&
//                       typeof item.img === "string" &&
//                       item.img.trim() !== ""
//                         ? `/img/${item.img}`
//                         : "/img/no-image.png"
//                     }
//                     alt={item.name}
//                     width={80}
//                     height={80}
//                     className="rounded-lg border border-white/20 object-cover transform hover:scale-105 transition-transform duration-200"
//                   />
//                   <div>
//                     <div className="font-semibold text-white text-lg">
//                       {item.name}
//                     </div>
//                     <div className="text-sm text-white/60 mt-1">
//                       Size: {item.size}
//                     </div>
//                     <div className="text-cyan-400 font-bold text-lg mt-1">
//                       {typeof item.price === "number"
//                         ? item.price.toLocaleString("vi-VN")
//                         : "—"}
//                       ₫
//                     </div>
//                   </div>
//                   <button
//                     className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-full hover:bg-red-500/20 disabled:opacity-50"
//                     onClick={() => handleRemove(item.productId)}
//                     disabled={removingId === item.productId}
//                     aria-label="Xóa sản phẩm"
//                   >
//                     {removingId === item.productId ? (
//                       <Loader2 size={20} className="animate-spin" />
//                     ) : (
//                       <Trash2 size={20} />
//                     )}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//             <button
//               className="mt-6 w-full px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
//               onClick={handleClear}
//               disabled={removingId !== null}
//             >
//               {removingId === -1 ? (
//                 <Loader2 size={20} className="animate-spin" />
//               ) : (
//                 <Trash2 size={20} />
//               )}
//               Xóa tất cả
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  removeFromWishlistAPI,
  clearWishlist,
  fetchWishlist,
} from "@/store/wishlistSlice";
import Image from "next/image";
import toast from "react-hot-toast";
import { X, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";

export default function WishlistModal({ onClose }: { onClose: () => void }) {
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const dispatch = useAppDispatch();
  const [removingId, setRemovingId] = useState<number | null>(null);

  const handleRemove = async (productId: number) => {
    setRemovingId(productId);
    const result = await dispatch(removeFromWishlistAPI(productId));
    if (removeFromWishlistAPI.fulfilled.match(result)) {
      await dispatch(fetchWishlist());
      toast.success("Đã xóa khỏi wishlist", { duration: 2000 });
    } else {
      toast.error("Có lỗi khi xóa khỏi wishlist", { duration: 2000 });
    }
    setRemovingId(null);
  };

  const handleClear = async () => {
    setRemovingId(-1); // Indicate clearing all
    for (const item of wishlist) {
      await dispatch(removeFromWishlistAPI(item.productId));
    }
    dispatch(clearWishlist());
    toast.success("Đã xóa tất cả sản phẩm yêu thích", { duration: 2000 });
    await dispatch(fetchWishlist());
    setRemovingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-black/60 to-black/40 flex items-center justify-center p-4 font-sans">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md p-6 border border-white/20 max-h-[90vh] overflow-y-auto transition-all duration-300 hover:shadow-2xl">
        <button
          className="absolute top-4 right-4 text-white/80 hover:text-red-400 transition-colors transform hover:scale-110"
          onClick={onClose}
          aria-label="Đóng"
        >
          <X size={28} />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">
          Sản phẩm yêu thích
        </h2>
        {wishlist.length === 0 ? (
          <div className="text-white/70 text-center py-12">
            <p className="text-lg">
              Chưa có sản phẩm nào trong danh sách yêu thích.
            </p>
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {wishlist.map((item) => (
                <li
                  key={`${item.productId}-${item.variantId}`}
                  className="grid grid-cols-[80px_1fr_auto] items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200"
                >
                  <Image
                    src={
                      item.img &&
                      typeof item.img === "string" &&
                      item.img.trim() !== ""
                        ? `/img/${item.img}`
                        : "/img/no-image.png"
                    }
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg border border-white/20 object-cover transform hover:scale-105 transition-transform duration-200"
                  />
                  <div>
                    <div className="font-semibold text-white text-lg">
                      {item.name}
                    </div>
                    <div className="text-sm text-white/60 mt-1">
                      Size: {item.size}
                    </div>
                    <div className="text-white/60 font-bold text-lg mt-1">
                      {typeof item.price === "number"
                        ? item.price.toLocaleString("vi-VN")
                        : "—"}
                      ₫
                    </div>
                  </div>
                  <button
                    className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-full hover:bg-red-500/20 disabled:opacity-50"
                    onClick={() => handleRemove(item.productId)}
                    disabled={removingId === item.productId}
                    aria-label="Xóa sản phẩm"
                  >
                    {removingId === item.productId ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <Trash2 size={20} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="mt-6 w-full px-4 py-3 bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] text-white rounded-lg hover:from-[#FF7043] hover:via-[#FF5722] hover:to-[#FF8A50] transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              onClick={handleClear}
              disabled={removingId !== null}
            >
              {removingId === -1 ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Trash2 size={20} />
              )}
              Xóa tất cả
            </button>
          </>
        )}
      </div>
    </div>
  );
}
