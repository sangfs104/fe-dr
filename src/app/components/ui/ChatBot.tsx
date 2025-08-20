// // "use client";

// // import { useState, useRef, useEffect } from "react";
// // import axios from "axios";
// // import { useDarkMode } from "../../types/useDarkMode";
// // import Link from "next/link";
// // import Image from "next/image";
// // import toast from "react-hot-toast";
// // import {
// //   Brain,
// //   MessageCircle,
// //   Trash2,
// //   Sun,
// //   Moon,
// //   Minus,
// //   X,
// //   Bot,
// //   Smile,
// //   Heart,
// //   Send,
// //   Loader2,
// //   Sparkles,
// //   Briefcase,
// //   Waves,
// //   Palette,
// //   ShoppingCart,
// //   Eye,
// // } from "lucide-react";
// // import { useAppDispatch } from "@/store/hooks";
// // import { addToCart } from "@/store/cartSlice";
// // import { addToWishlistAPI, fetchWishlist } from "@/store/wishlistSlice";
// // import { useRouter } from "next/navigation";

// // const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
// // const aiAvatar = `${apiUrl.replace(/\/$/, "")}/public/img/ai-avatar.webp`;

// // type ProductVariant = {
// //   id: number;
// //   product_id: number;
// //   img_id: number;
// //   size: string;
// //   color?: string;
// //   price: number;
// //   sale_price: string | null;
// //   stock_quantity: number;
// //   status: string;
// // };

// // type Product = {
// //   id: number;
// //   name: string;
// //   description: string;
// //   images: string[];
// //   image?: string; // Thêm dòng này
// //   variant: ProductVariant[];
// //   category: {
// //     id: number;
// //     name: string;
// //   };
// // };

// // type Message = {
// //   type: "user" | "bot";
// //   text: string;
// //   products?: Product[];
// //   keywords?: string[];
// //   mix_and_match?: string | null;
// //   timestamp?: Date;
// // };

// // type UserInfo = {
// //   id: number;
// //   name: string;
// //   email: string;
// //   phone: string;
// //   role: string;
// //   avatar: string | null;
// // };

// // export default function ChatBox({ onClose }: { onClose: () => void }) {
// //   const [darkMode, setDarkMode] = useDarkMode();
// //   const [messages, setMessages] = useState<Message[]>(() => {
// //     const saved = localStorage.getItem("chat_messages");
// //     return saved
// //       ? JSON.parse(saved)
// //       : [
// //           {
// //             type: "bot",
// //             text:
// //               "🎉 Chào bạn! Mình là stylist AI, rất vui được giúp bạn chọn trang phục hôm nay. Bạn cần tư vấn gì ạ?",
// //             timestamp: new Date(),
// //           },
// //         ];
// //   });

// //   const [input, setInput] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [isTyping, setIsTyping] = useState(false);
// //   const chatEndRef = useRef<HTMLDivElement>(null);
// //   const inputRef = useRef<HTMLInputElement>(null);
// //   const [user, setUser] = useState<UserInfo | null>(null);
// //   const [isMinimized, setIsMinimized] = useState(false);
// //   const dispatch = useAppDispatch();
// //   const router = useRouter();

// //   const scrollToBottom = () => {
// //     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   };

// //   useEffect(() => {
// //     inputRef.current?.focus();
// //   }, []);

// //   useEffect(() => {
// //     scrollToBottom();
// //     localStorage.setItem("chat_messages", JSON.stringify(messages));
// //   }, [messages]);

// //   useEffect(() => {
// //     const storedUser = localStorage.getItem("user");
// //     if (storedUser) {
// //       try {
// //         setUser(JSON.parse(storedUser));
// //       } catch (err) {
// //         console.error("Không thể phân tích user từ localStorage", err);
// //       }
// //     }
// //   }, []);

// //   const handleAddToCart = (product: Product) => {
// //     const selectedVariant = product.variant?.[0];
// //     if (!selectedVariant) {
// //       toast.error("Không có biến thể sản phẩm!");
// //       return;
// //     }

// //     const priceToUse =
// //       selectedVariant.sale_price && Number(selectedVariant.sale_price) > 0
// //         ? Number(selectedVariant.sale_price)
// //         : selectedVariant.price;

// //     dispatch(
// //       addToCart({
// //         productId: product.id,
// //         variantId: selectedVariant.id,
// //         name: `${product.name} - Size ${selectedVariant.size}`,
// //         img: product.images?.[0] || "/img/no-image.jpg",
// //         price: priceToUse,
// //         sale_price: selectedVariant.sale_price, // Add this line
// //         size: selectedVariant.size,
// //         quantity: 1,
// //         variantList: product.variant,
// //       })
// //     );

// //     toast.success("Đã thêm vào giỏ hàng thành công!");
// //   };

// //   const handleAddToWishlist = async (product: Product) => {
// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       toast.error("Bạn cần đăng nhập để thêm vào wishlist!");
// //       router.push("/login");
// //       return;
// //     }

// //     const selectedVariant = product.variant?.[0];
// //     if (!selectedVariant) {
// //       toast.error("Không có biến thể sản phẩm!");
// //       return;
// //     }

// //     const wishlistItem = {
// //       productId: product.id,
// //       variantId: selectedVariant.id,
// //       name: product.name,
// //       img: product.images?.[0] || "/img/no-image.jpg",
// //       price:
// //         selectedVariant.sale_price && Number(selectedVariant.sale_price) > 0
// //           ? Number(selectedVariant.sale_price)
// //           : selectedVariant.price,
// //       size: selectedVariant.size,
// //     };

// //     const result = await dispatch(addToWishlistAPI(wishlistItem));
// //     if (addToWishlistAPI.fulfilled.match(result)) {
// //       toast.success("Đã thêm vào wishlist thành công 💖");
// //       await dispatch(fetchWishlist());
// //     } else {
// //       toast.error(
// //         (result.payload as string) || "Có lỗi khi thêm vào wishlist!"
// //       );
// //     }
// //   };

// //   // const handleSend = async () => {
// //   //   if (!input.trim()) return;

// //   //   const userMessage: Message = {
// //   //     type: "user",
// //   //     text: input,
// //   //     timestamp: new Date(),
// //   //   };
// //   //   setMessages((prev) => [...prev, userMessage]);
// //   //   setInput("");
// //   //   setLoading(true);
// //   //   setIsTyping(true);

// //   //   try {
// //   //     setTimeout(async () => {
// //   //       const res = await axios.post(
// //   //         `${process.env.NEXT_PUBLIC_API_URL}/api/stylist/analyze`,
// //   //         {
// //   //           answers: [input],
// //   //         }
// //   //       );

// //   //       const {
// //   //         message,
// //   //         style_name,
// //   //         description,
// //   //         keywords,
// //   //         products,
// //   //         mix_and_match,
// //   //       } = res.data;

// //   //       let reply =
// //   //         message ||
// //   //         "Chào bạn! Mình chưa hiểu rõ gu của bạn lắm. Bạn có thể mô tả thêm một chút không ạ?";
// //   //       let productList = products || [];

// //   //       if (
// //   //         !input.match(
// //   //           /(phối đồ|set đồ|đi chơi|du lịch|outfit|mix and match)/iu
// //   //         )
// //   //       ) {
// //   //         productList = products && products.length > 0 ? [products[0]] : [];
// //   //         reply =
// //   //           products && products.length > 0
// //   //             ? `Chào bạn! Mình đã tìm thấy một sản phẩm rất phù hợp cho bạn là ${products[0].name}. Bạn thấy thế nào ạ?`
// //   //             : reply;
// //   //       } else {
// //   //         if (style_name || description) {
// //   //           reply = `Chào bạn! Mình thấy phong cách ${style_name ||
// //   //             "của bạn"} rất thú vị!`;
// //   //           if (description) {
// //   //             reply += `\n${description}`;
// //   //           }
// //   //         }
// //   //         if (mix_and_match) {
// //   //           reply += `\nMình có gợi ý phối đồ cho bạn đây: ${mix_and_match}. Bạn có thích không ạ?`;
// //   //         }
// //   //         if (products && products.length > 0) {
// //   //           reply += `\nMình cũng tìm thấy một số sản phẩm phù hợp, bạn có muốn xem không ạ?`;
// //   //         }
// //   //       }

// //   //       setMessages((prev) => [
// //   //         ...prev,
// //   //         {
// //   //           type: "bot",
// //   //           text: reply,
// //   //           products: productList,
// //   //           keywords: keywords || [],
// //   //           mix_and_match: mix_and_match || null,
// //   //           timestamp: new Date(),
// //   //         },
// //   //       ]);
// //   //       setIsTyping(false);
// //   //       setLoading(false);
// //   //     }, 1000);
// //   //   } catch {
// //   //     setMessages((prev) => [
// //   //       ...prev,
// //   //       {
// //   //         type: "bot",
// //   //         text:
// //   //           "Rất tiếc, mình không thể kết nối đến hệ thống ngay bây giờ. Bạn vui lòng thử lại sau nhé!",
// //   //         timestamp: new Date(),
// //   //       },
// //   //     ]);
// //   //     setIsTyping(false);
// //   //     setLoading(false);
// //   //   }
// //   // };
// //   const handleSend = async () => {
// //     if (!input.trim()) return;

// //     const userMessage: Message = {
// //       type: "user",
// //       text: input,
// //       timestamp: new Date(),
// //     };
// //     setMessages((prev) => [...prev, userMessage]);
// //     setInput("");
// //     setLoading(true);
// //     setIsTyping(true);

// //     try {
// //       // Nếu muốn giả lập delay typing
// //       await new Promise((resolve) => setTimeout(resolve, 1000));

// //       const res = await axios.post(
// //         `${process.env.NEXT_PUBLIC_API_URL}/api/stylist/analyze`,
// //         {
// //           answers: [input],
// //         }
// //       );

// //       const {
// //         message,
// //         style_name,
// //         description,
// //         keywords,
// //         products,
// //         mix_and_match,
// //       } = res.data;

// //       let reply =
// //         message ||
// //         "Chào bạn! Mình chưa hiểu rõ gu của bạn lắm. Bạn có thể mô tả thêm một chút không ạ?";
// //       let productList = products || [];

// //       if (
// //         !input.match(/(phối đồ|set đồ|đi chơi|du lịch|outfit|mix and match)/iu)
// //       ) {
// //         productList = products && products.length > 0 ? [products[0]] : [];
// //         reply =
// //           products && products.length > 0
// //             ? `Chào bạn! Mình đã tìm thấy một sản phẩm rất phù hợp cho bạn là ${products[0].name}. Bạn thấy thế nào ạ?`
// //             : reply;
// //       } else {
// //         if (style_name || description) {
// //           reply = `Chào bạn! Mình thấy phong cách ${style_name ||
// //             "của bạn"} rất thú vị!`;
// //           if (description) {
// //             reply += `\n${description}`;
// //           }
// //         }
// //         if (mix_and_match) {
// //           reply += `\nMình có gợi ý phối đồ cho bạn đây: ${mix_and_match}. Bạn có thích không ạ?`;
// //         }
// //         if (products && products.length > 0) {
// //           reply += `\nMình cũng tìm thấy một số sản phẩm phù hợp, bạn có muốn xem không ạ?`;
// //         }
// //       }

// //       setMessages((prev) => [
// //         ...prev,
// //         {
// //           type: "bot",
// //           text: reply,
// //           products: productList,
// //           keywords: keywords || [],
// //           mix_and_match: mix_and_match || null,
// //           timestamp: new Date(),
// //         },
// //       ]);
// //     } catch (error) {
// //       console.error(error);
// //       setMessages((prev) => [
// //         ...prev,
// //         {
// //           type: "bot",
// //           text:
// //             "Rất tiếc, mình không thể kết nối đến hệ thống ngay bây giờ. Bạn vui lòng thử lại sau nhé!",
// //           timestamp: new Date(),
// //         },
// //       ]);
// //     } finally {
// //       setIsTyping(false);
// //       setLoading(false);
// //     }
// //   };

// //   const clearChat = () => {
// //     setMessages([
// //       {
// //         type: "bot",
// //         text:
// //           "🎉 Chào bạn! Mình là stylist AI, rất vui được giúp bạn chọn trang phục hôm nay. Bạn cần tư vấn gì ạ?",
// //         timestamp: new Date(),
// //       },
// //     ]);
// //   };

// //   const quickReplies = [
// //     { text: "Phong cách nữ tính" },
// //     { text: "Trang phục công sở", icon: <Briefcase size={16} /> },
// //     { text: "Outfit đi biển", icon: <Waves size={16} /> },
// //     { text: "Màu sắc hợp da trắng", icon: <Palette size={16} /> },
// //   ];

// //   const formatTime = (date: Date) => {
// //     return new Date(date).toLocaleTimeString("vi-VN", {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //     });
// //   };

// //   if (isMinimized) {
// //     return (
// //       <div className="fixed bottom-20 right-4 z-50">
// //         <button
// //           onClick={() => setIsMinimized(false)}
// //           className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center animate-bounce"
// //         >
// //           <MessageCircle size={24} />
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="fixed bottom-20 right-4 w-[90vw] max-w-[400px] max-h-[600px] rounded-3xl shadow-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 flex flex-col z-50 overflow-hidden backdrop-blur-sm transition-all duration-300 transform animate-slideIn">
// //       {/* Header */}
// //       <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-pink-500 dark:from-orange-700 dark:via-orange-800 dark:to-pink-700 text-white px-6 py-5 font-semibold text-lg flex justify-between items-center relative overflow-hidden">
// //         <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
// //         <div className="flex items-center gap-3 relative z-10">
// //           <div className="relative">
// //             <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
// //               <Brain size={20} />
// //             </div>
// //             <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
// //           </div>
// //           <div>
// //             <div className="font-bold">Trợ lý AI</div>
// //             <div className="text-xs opacity-90">
// //               {isTyping ? "đang nhập..." : "trực tuyến"}
// //             </div>
// //           </div>
// //         </div>
// //         <div className="flex items-center gap-2 relative z-10">
// //           <button
// //             onClick={clearChat}
// //             title="Xóa cuộc trò chuyện"
// //             className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-all"
// //           >
// //             <Trash2 size={18} />
// //           </button>
// //           <button
// //             onClick={() => setDarkMode(!darkMode)}
// //             title="Bật/Tắt chế độ tối"
// //             className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-all"
// //           >
// //             {darkMode ? <Sun size={18} /> : <Moon size={18} />}
// //           </button>
// //           <button
// //             onClick={() => setIsMinimized(true)}
// //             title="Thu nhỏ"
// //             className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-all"
// //           >
// //             <Minus size={18} />
// //           </button>
// //           <button
// //             onClick={onClose}
// //             title="Đóng"
// //             className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/20 transition-all"
// //           >
// //             <X size={20} />
// //           </button>
// //         </div>
// //       </div>

// //       {/* Messages Area */}
// //       <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-orange-50/50 to-white dark:from-gray-800 dark:to-gray-900 text-sm scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-transparent">
// //         {messages.map((m, i) => (
// //           <div
// //             key={i}
// //             className={`flex flex-col ${
// //               m.type === "bot" ? "items-start" : "items-end"
// //             } animate-fadeInUp`}
// //             style={{ animationDelay: `${i * 0.1}s` }}
// //           >
// //             <div
// //               className={`flex items-start gap-3 max-w-[85%] ${
// //                 m.type === "bot" ? "" : "flex-row-reverse"
// //               }`}
// //             >
// //               {m.type === "bot" ? (
// //                 <div className="relative">
// //                   <Image
// //                     src={aiAvatar}
// //                     alt="AI Avatar"
// //                     width={40}
// //                     height={40}
// //                     className="w-10 h-10 rounded-full shadow-md object-cover border-2 border-orange-200"
// //                     unoptimized
// //                   />

// //                   <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
// //                     <Bot size={10} />
// //                   </div>
// //                 </div>
// //               ) : (
// //                 <div className="relative">
// //                   <Image
// //                     src={
// //                       user?.avatar
// //                         ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${user.avatar}`
// //                         : "/img/user-avatar.webp"
// //                     }
// //                     width={40}
// //                     height={40}
// //                     alt="User Avatar"
// //                     className="rounded-full shadow-md object-cover border-2 border-orange-200"
// //                     onError={(e) => console.log("Lỗi tải ảnh:", e)}
// //                   />
// //                 </div>
// //               )}

// //               <div className="flex flex-col gap-1">
// //                 <div
// //                   className={`px-4 py-3 rounded-2xl shadow-sm whitespace-pre-line relative ${
// //                     m.type === "bot"
// //                       ? "bg-white dark:bg-gray-700 border border-orange-100 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-tl-md"
// //                       : "bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-tr-md"
// //                   }`}
// //                 >
// //                   {m.text}
// //                   {m.keywords && m.keywords.length > 0 && (
// //                     <div className="mt-2 text-xs text-gray-500 dark:text-gray-300">
// //                       Từ khóa: {m.keywords.join(", ")}
// //                     </div>
// //                   )}
// //                   <div
// //                     className={`text-xs mt-2 opacity-70 ${
// //                       m.type === "bot" ? "text-gray-500" : "text-orange-100"
// //                     }`}
// //                   >
// //                     {m.timestamp && formatTime(m.timestamp)}
// //                   </div>
// //                 </div>
// //                 {/* {m.products && m.products.length > 0 && (
// //                   <div className="mt-3 grid grid-cols-1 gap-3">
// //                     {m.products.map((p) => (
// //                       <div
// //                         key={p.id}
// //                         className="block border border-orange-200 dark:border-orange-700 rounded-xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 bg-white dark:bg-gray-800 group relative"
// //                       >
// //                         <Link href={`/products/${p.id}`}>
// //                           <div className="relative overflow-hidden">
// //                             <Image
// //                               src={p.images?.[0] || "/img/no-image.jpg"}
// //                               width={400}
// //                               height={144}
// //                               unoptimized
// //                               alt={p.name}
// //                               className="w-full h-36 object-cover group-hover:scale-110 transition-transform duration-300"
// //                             />
// //                             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
// //                           </div>
// //                           <div className="p-3">
// //                             <div className="font-semibold text-orange-700 dark:text-orange-300 group-hover:text-orange-800 transition-colors">
// //                               {p.name}
// //                             </div>
// //                             <div className="text-gray-600 dark:text-gray-300 text-xs mt-1 line-clamp-2">
// //                               {p.description}
// //                             </div>
// //                             <div className="mt-2 text-xs text-orange-600 dark:text-orange-400 font-medium">
// //                               Xem chi tiết →
// //                             </div>
// //                           </div>
// //                         </Link>
// //                         <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
// //                           <button
// //                             onClick={() => handleAddToCart(p)}
// //                             className="text-white bg-orange-500 p-1 rounded-full hover:bg-orange-600"
// //                             title="Thêm vào giỏ hàng"
// //                           >
// //                             <ShoppingCart size={20} />
// //                           </button>
// //                           <button
// //                             onClick={() => router.push(`/products/${p.id}`)}
// //                             className="text-white bg-orange-500 p-1 rounded-full hover:bg-orange-600"
// //                             title="Xem chi tiết"
// //                           >
// //                             <Eye size={20} />
// //                           </button>
// //                           <button
// //                             onClick={() => handleAddToWishlist(p)}
// //                             className="text-white bg-orange-500 p-1 rounded-full hover:bg-orange-600"
// //                             title="Thêm vào wishlist"
// //                           >
// //                             <Heart size={20} />
// //                           </button>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )} */}
// //                 {m.products && m.products.length > 0 && (
// //                   <div className="mt-3 grid grid-cols-1 gap-3">
// //                     {m.products.map((p) => (
// //                       <div
// //                         key={p.id}
// //                         className="block border border-orange-200 dark:border-orange-700 rounded-xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 bg-white dark:bg-gray-800 group relative"
// //                       >
// //                         <Link href={`/products/${p.id}`}>
// //                           <div className="relative overflow-hidden">
// //                             <Image
// //                               src={
// //                                 p.image || p.images?.[0] || "/img/no-image.jpg"
// //                               }
// //                               width={400}
// //                               height={144}
// //                               unoptimized
// //                               alt={p.name}
// //                               className="w-full h-36 object-cover group-hover:scale-110 transition-transform duration-300"
// //                             />
// //                             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
// //                           </div>
// //                           <div className="p-3">
// //                             <div className="font-semibold text-orange-700 dark:text-orange-300 group-hover:text-orange-800 transition-colors">
// //                               {p.name}
// //                             </div>
// //                             <div className="text-gray-600 dark:text-gray-300 text-xs mt-1 line-clamp-2">
// //                               {p.description}
// //                             </div>
// //                             <div className="mt-2 text-xs text-orange-600 dark:text-orange-400 font-medium">
// //                               Xem chi tiết →
// //                             </div>
// //                           </div>
// //                         </Link>
// //                         <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
// //                           <button
// //                             onClick={() => handleAddToCart(p)}
// //                             className="text-white bg-orange-500 p-1 rounded-full hover:bg-orange-600"
// //                             title="Thêm vào giỏ hàng"
// //                           >
// //                             <ShoppingCart size={20} />
// //                           </button>
// //                           <button
// //                             onClick={() => router.push(`/products/${p.id}`)}
// //                             className="text-white bg-orange-500 p-1 rounded-full hover:bg-orange-600"
// //                             title="Xem chi tiết"
// //                           >
// //                             <Eye size={20} />
// //                           </button>
// //                           <button
// //                             onClick={() => handleAddToWishlist(p)}
// //                             className="text-white bg-orange-500 p-1 rounded-full hover:bg-orange-600"
// //                             title="Thêm vào wishlist"
// //                           >
// //                             <Heart size={20} />
// //                           </button>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         ))}

// //         {isTyping && (
// //           <div className="flex items-center gap-3 animate-fadeInUp">
// //             <Image
// //               src={aiAvatar}
// //               alt="AI Avatar"
// //               width={40}
// //               height={40}
// //               unoptimized
// //               className="w-10 h-10 rounded-full shadow-md object-cover border-2 border-orange-200"
// //             />

// //             <div className="bg-white dark:bg-gray-700 border border-orange-200 dark:border-gray-600 px-4 py-3 rounded-2xl rounded-tl-md flex items-center gap-2">
// //               <div className="flex space-x-1">
// //                 <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
// //                 <div
// //                   className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
// //                   style={{ animationDelay: "0.1s" }}
// //                 ></div>
// //                 <div
// //                   className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"
// //                   style={{ animationDelay: "0.2s" }}
// //                 ></div>
// //               </div>
// //               <span className="text-gray-600 dark:text-gray-300 text-xs ml-2">
// //                 AI đang suy nghĩ...
// //               </span>
// //             </div>
// //           </div>
// //         )}
// //         <div ref={chatEndRef}></div>
// //       </div>

// //       {!loading && (
// //         <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 border-t border-orange-100 dark:border-gray-700">
// //           <div className="text-xs font-medium text-orange-700 dark:text-orange-300 mb-2 flex items-center gap-2">
// //             <Sparkles size={14} />
// //             Gợi ý nhanh:
// //           </div>
// //           <div className="flex flex-wrap gap-2">
// //             {quickReplies.map((q, i) => (
// //               <button
// //                 key={i}
// //                 onClick={() => setInput(q.text)}
// //                 className="px-3 py-2 bg-white dark:bg-gray-700 border border-orange-200 dark:border-gray-600 text-xs rounded-full hover:bg-orange-100 dark:hover:bg-gray-600 hover:scale-105 transition-all duration-200 flex items-center gap-1 shadow-sm"
// //               >
// //                 {q.icon}
// //                 <span>{q.text}</span>
// //               </button>
// //             ))}
// //           </div>
// //         </div>
// //       )}

// //       <div className="flex items-center border-t border-orange-200 dark:border-gray-700 px-3 py-3 bg-white dark:bg-gray-900 gap-3">
// //         <div className="flex gap-1">
// //           <button
// //             onClick={() => setInput((prev) => prev + "😊")}
// //             className="hover:scale-125 transition-transform p-1"
// //             title="Thêm cảm xúc"
// //           >
// //             <Smile size={18} />
// //           </button>
// //           <button
// //             onClick={() => setInput((prev) => prev + "❤️")}
// //             className="hover:scale-125 transition-transform p-1"
// //             title="Thêm trái tim"
// //           >
// //             <Heart size={18} />
// //           </button>
// //         </div>

// //         <div className="flex-1 relative">
// //           <input
// //             ref={inputRef}
// //             value={input}
// //             onChange={(e) => setInput(e.target.value)}
// //             onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
// //             className="w-full px-4 py-3 text-sm rounded-2xl border border-orange-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 bg-orange-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 transition-all placeholder:text-gray-500"
// //             placeholder="Nhập tin nhắn của bạn..."
// //             disabled={loading}
// //           />
// //           {input && (
// //             <button
// //               onClick={() => setInput("")}
// //               className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
// //             >
// //               <X size={16} />
// //             </button>
// //           )}
// //         </div>

// //         <button
// //           onClick={handleSend}
// //           disabled={loading || !input.trim()}
// //           className={`${
// //             loading || !input.trim()
// //               ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
// //               : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-95"
// //           } text-white px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 shadow-md`}
// //         >
// //           {loading ? (
// //             <Loader2 size={16} className="animate-spin" />
// //           ) : (
// //             <>
// //               <span>Gửi</span>
// //               <Send size={16} />
// //             </>
// //           )}
// //         </button>
// //       </div>

// //       <style jsx>{`
// //         @keyframes slideIn {
// //           from {
// //             opacity: 0;
// //             transform: translateY(20px) scale(0.95);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: translateY(0) scale(1);
// //           }
// //         }

// //         @keyframes fadeInUp {
// //           from {
// //             opacity: 0;
// //             transform: translateY(10px);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: translateY(0);
// //           }
// //         }

// //         .animate-slideIn {
// //           animation: slideIn 0.3s ease-out;
// //         }

// //         .animate-fadeInUp {
// //           animation: fadeInUp 0.3s ease-out forwards;
// //         }

// //         .scrollbar-thin::-webkit-scrollbar {
// //           width: 4px;
// //         }

// //         .scrollbar-thumb-orange-300::-webkit-scrollbar-thumb {
// //           background-color: #fed7aa;
// //           border-radius: 2px;
// //         }

// //         .scrollbar-track-transparent::-webkit-scrollbar-track {
// //           background: transparent;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

// "use client";

// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import Image from "next/image"; // Thêm import Image
// import {
//   MessageCircle,
//   Send,
//   Loader2,
//   Sparkles,
//   Tag,
//   Shirt,
//   Stars,
//   X,
// } from "lucide-react";

// // ---------------------------------------------
// // Types matching your Laravel API responses
// // ---------------------------------------------

// type ApiVariant = {
//   id: number;
//   product_id?: number;
//   img_id?: number | null;
//   size?: string | null;
//   color?: string | null;
//   price?: number | null;
//   sale_price?: number | null;
//   stock_quantity?: number | null;
//   status?: number | null;
// };

// type ApiCategory = {
//   id?: number | null;
//   name?: string | null;
// };

// type ApiProductBasic = {
//   id: number;
//   name: string;
//   description?: string | null;
//   price?: number | null;
//   images: string[];
// };

// type ApiProductFull = {
//   id: number;
//   name: string;
//   description?: string | null;
//   images: string[];
//   variant?: ApiVariant[];
//   category?: ApiCategory;
// };

// type ApiResponse = {
//   message?: string;
//   style_name?: string | null;
//   description?: string | null;
//   keywords?: string[];
//   products?: ApiProductBasic[] | ApiProductFull[];
//   mix_and_match?: string[] | null;
// };

// // ---------------------------------------------
// // Chat UI Types
// // ---------------------------------------------

// type ChatRole = "user" | "assistant" | "system";

// type ChatAttachment = {
//   kind: "style";
//   style_name?: string | null;
//   description?: string | null;
//   keywords?: string[];
//   products?: (ApiProductBasic | ApiProductFull)[];
//   mix_and_match?: string[] | null;
// };

// type ChatMessage = {
//   id: string;
//   role: ChatRole;
//   text: string;
//   attachment?: ChatAttachment;
// };

// // ---------------------------------------------
// // Utilities
// // ---------------------------------------------

// function clsx(...args: (string | false | null | undefined)[]): string {
//   return args.filter(Boolean).join(" ");
// }

// function formatPrice(p?: number | null): string {
//   if (p == null) return "";
//   try {
//     return new Intl.NumberFormat("vi-VN", {
//       style: "currency",
//       currency: "VND",
//       maximumFractionDigits: 0,
//     }).format(p);
//   } catch {
//     return `${p}`;
//   }
// }

// // ---------------------------------------------
// // Main Component
// // ---------------------------------------------

// export default function ChatBoxStylistAI({
//   apiUrl,
//   title = "Stylist AI",
// }: {
//   /** Optional override. Defaults to `${process.env.NEXT_PUBLIC_API_URL}/api/stylist/analyze` */
//   apiUrl?: string;
//   title?: string;
//   onClose?: () => void; // thêm dòng này
// }) {
//   const endpoint = useMemo(() => {
//     const defaultUrl = `${process.env.NEXT_PUBLIC_API_URL ??
//       ""}/api/stylist/analyze`;
//     if (!process.env.NEXT_PUBLIC_API_URL) {
//       console.warn("NEXT_PUBLIC_API_URL is not set. Using default endpoint.");
//     }
//     return apiUrl || defaultUrl;
//   }, [apiUrl]);

//   const [isOpen, setIsOpen] = useState<boolean>(true);
//   const [input, setInput] = useState<string>("");
//   const [sending, setSending] = useState<boolean>(false);
//   const [messages, setMessages] = useState<ChatMessage[]>([
//     {
//       id: crypto.randomUUID(),
//       role: "assistant",
//       text:
//         "Xin chào! Mình là Stylist AI 👗 Hãy nói cho mình biết bạn muốn tìm sản phẩm gì, hỏi size, xem ưu đãi/flash sale, hoặc mình có thể phối một set đồ theo gu của bạn nhé!",
//     },
//   ]);

//   const listRef = useRef<HTMLDivElement>(null);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   useEffect(() => {
//     listRef.current?.scrollTo({
//       top: listRef.current.scrollHeight,
//       behavior: "smooth",
//     });
//   }, [messages.length, sending]);

//   useEffect(() => {
//     if (!textareaRef.current) return;
//     const el = textareaRef.current;
//     el.style.height = "0px";
//     el.style.height = `${Math.min(120, el.scrollHeight)}px`;
//   }, [input]);

//   const sendInput = useCallback(async () => {
//     const trimmed = input.trim();
//     if (!trimmed) return;

//     const userMsg: ChatMessage = {
//       id: crypto.randomUUID(),
//       role: "user",
//       text: trimmed,
//     };

//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     setSending(true);

//     try {
//       const res = await axios.post<ApiResponse>(endpoint, {
//         answers: [trimmed],
//       });

//       const data = res.data || {};

//       const attachment: ChatAttachment | undefined =
//         data.style_name ||
//         data.description ||
//         data.keywords ||
//         data.products ||
//         data.mix_and_match
//           ? {
//               kind: "style",
//               style_name: data.style_name,
//               description: data.description,
//               keywords: data.keywords,
//               products: data.products ?? [],
//               mix_and_match: data.mix_and_match ?? null,
//             }
//           : undefined;

//       const assistantMsg: ChatMessage = {
//         id: crypto.randomUUID(),
//         role: "assistant",
//         text: data.message || "Mình đã tìm thấy một số gợi ý cho bạn!",
//         attachment,
//       };

//       setMessages((prev) => [...prev, assistantMsg]);
//     } catch (err) {
//       console.error("API Error:", err);
//       let msg = "Đã có lỗi xảy ra. Vui lòng thử lại.";
//       if (err instanceof axios.AxiosError && err.response?.data?.message) {
//         msg = err.response.data.message;
//       }
//       toast.error(msg);
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: crypto.randomUUID(),
//           role: "assistant",
//           text: msg,
//         },
//       ]);
//     } finally {
//       setSending(false);
//     }
//   }, [input, endpoint]);

//   const onKeyDown = useCallback(
//     (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//       if (e.key === "Enter" && !e.shiftKey) {
//         e.preventDefault();
//         if (!sending) sendInput();
//       }
//     },
//     [sending, sendInput]
//   );

//   return (
//     <div className="fixed bottom-4 right-4 z-50 w-full max-w-md">
//       <Toaster position="top-right" />
//       <div className="rounded-2xl shadow-2xl bg-zinc-900 text-zinc-100 border border-zinc-800 overflow-hidden">
//         <div className="flex items-center justify-between p-3 border-b border-zinc-800">
//           <div className="flex items-center gap-2">
//             <div className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-800">
//               <Sparkles className="h-4 w-4" />
//             </div>
//             <div className="font-semibold">{title}</div>
//           </div>
//           <button
//             onClick={() => setIsOpen((v) => !v)}
//             className="inline-flex items-center gap-2 text-sm px-2 py-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors"
//           >
//             {isOpen ? (
//               <>
//                 <X className="h-4 w-4" /> Đóng
//               </>
//             ) : (
//               <>
//                 <MessageCircle className="h-4 w-4" /> Mở
//               </>
//             )}
//           </button>
//         </div>

//         {isOpen && (
//           <>
//             <div
//               ref={listRef}
//               className="max-h-[60vh] overflow-y-auto p-3 space-y-3"
//             >
//               {messages.map((m) => (
//                 <MessageBubble key={m.id} msg={m} />
//               ))}
//               {sending && (
//                 <div className="flex items-center gap-2 text-zinc-400 text-sm">
//                   <Loader2 className="h-4 w-4 animate-spin" /> Đang soạn trả
//                   lời...
//                 </div>
//               )}
//             </div>

//             <div className="border-t border-zinc-800 p-3">
//               <div className="relative">
//                 <textarea
//                   ref={textareaRef}
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   onKeyDown={onKeyDown}
//                   placeholder="Nhập câu hỏi: tìm sản phẩm, hỏi size, xem giảm giá/flash sale, hoặc nhờ phối đồ..."
//                   className="w-full resize-none bg-zinc-800 text-zinc-100 rounded-2xl p-3 pr-12 placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-zinc-700"
//                   rows={1}
//                 />
//                 <button
//                   onClick={sendInput}
//                   disabled={sending || !input.trim()}
//                   className={clsx(
//                     "absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm transition-colors",
//                     sending || !input.trim()
//                       ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
//                       : "bg-white text-zinc-900 hover:bg-zinc-200"
//                   )}
//                 >
//                   {sending ? (
//                     <>
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                       Gửi
//                     </>
//                   ) : (
//                     <>
//                       <Send className="h-4 w-4" /> Gửi
//                     </>
//                   )}
//                 </button>
//               </div>
//               <div className="mt-2 text-[11px] text-zinc-500">
//                 Nhấn Enter để gửi • Shift+Enter để xuống dòng
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// // ---------------------------------------------
// // Message Bubble + Rich Attachments
// // ---------------------------------------------

// function MessageBubble({ msg }: { msg: ChatMessage }) {
//   const isUser = msg.role === "user";
//   return (
//     <div className={clsx("flex", isUser ? "justify-end" : "justify-start")}>
//       <div
//         className={clsx(
//           "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
//           isUser ? "bg-zinc-700 text-zinc-100" : "bg-zinc-800 text-zinc-100"
//         )}
//       >
//         {msg.text && (
//           <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
//         )}
//         {!isUser && msg.attachment?.kind === "style" && (
//           <div className="mt-2 space-y-3">
//             <StyleSummary
//               name={msg.attachment.style_name}
//               desc={msg.attachment.description}
//               keywords={msg.attachment.keywords}
//             />
//             {Array.isArray(msg.attachment.mix_and_match) &&
//               msg.attachment.mix_and_match.length > 0 && (
//                 <MixAndMatch names={msg.attachment.mix_and_match} />
//               )}
//             {Array.isArray(msg.attachment.products) &&
//               msg.attachment.products.length > 0 && (
//                 <ProductsGrid products={msg.attachment.products} />
//               )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function StyleSummary({
//   name,
//   desc,
//   keywords,
// }: {
//   name?: string | null;
//   desc?: string | null;
//   keywords?: string[];
// }) {
//   if (!name && !desc && (!keywords || keywords.length === 0)) return null;
//   return (
//     <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-3">
//       <div className="flex items-center gap-2 text-sm font-semibold">
//         <Stars className="h-4 w-4" />
//         {name || "Gu thời trang của bạn"}
//       </div>
//       {desc && (
//         <p className="mt-2 text-zinc-300 text-sm leading-relaxed">{desc}</p>
//       )}
//       {keywords && keywords.length > 0 && (
//         <div className="mt-2 flex flex-wrap gap-2">
//           {keywords.map((k, i) => (
//             <span
//               key={i}
//               className="inline-flex items-center gap-1 rounded-full border border-zinc-700 px-2 py-1 text-[11px] text-zinc-300"
//             >
//               <Tag className="h-3 w-3" /> {k}
//             </span>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function MixAndMatch({ names }: { names: string[] }) {
//   return (
//     <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-3">
//       <div className="flex items-center gap-2 text-sm font-semibold">
//         <Shirt className="h-4 w-4" /> Set phối đồ gợi ý
//       </div>
//       <ul className="mt-2 list-disc list-inside text-sm text-zinc-300 space-y-1">
//         {names.map((n, i) => (
//           <li key={i}>{n}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function ProductsGrid({
//   products,
// }: {
//   products: (ApiProductBasic | ApiProductFull)[];
// }) {
//   return (
//     <div className="grid grid-cols-1 gap-3">
//       {products.map((p) => (
//         <ProductCard
//           key={p.id + ((p as ApiProductFull).variant ? "-full" : "-basic")}
//           product={p}
//         />
//       ))}
//     </div>
//   );
// }

// function ProductCard({
//   product,
// }: {
//   product: ApiProductBasic | ApiProductFull;
// }) {
//   const cover = product.images?.[0];
//   const hasVariants = Array.isArray((product as ApiProductFull).variant);
//   const variants = (product as ApiProductFull).variant || [];

//   // Compute display price - Kiểm tra 'price' in product để tránh lỗi TypeScript
//   const basePrice = "price" in product ? product.price ?? null : null;
//   const firstSale =
//     variants.find((v) => v.sale_price != null)?.sale_price ?? null;
//   const firstPrice = variants.find((v) => v.price != null)?.price ?? null;
//   const displayPrice = basePrice ?? firstSale ?? firstPrice ?? null;

//   return (
//     <div className="rounded-2xl overflow-hidden border border-zinc-700">
//       <div className="aspect-[16/9] bg-zinc-800">
//         {cover ? (
//           <Image
//             src={cover}
//             alt={product.name}
//             className="h-full w-full object-cover"
//             width={500} // Giả định chiều rộng, điều chỉnh theo thực tế
//             height={281} // Tỷ lệ 16:9, điều chỉnh theo thực tế
//             unoptimized
//             loading="lazy"
//           />
//         ) : (
//           <div className="h-full w-full flex items-center justify-center text-zinc-500 text-xs">
//             Không có ảnh
//           </div>
//         )}
//       </div>

//       <div className="p-3">
//         <div className="font-medium text-zinc-100 line-clamp-2">
//           {product.name}
//         </div>
//         {displayPrice != null && (
//           <div className="mt-1 text-sm text-zinc-300">
//             {formatPrice(displayPrice)}
//           </div>
//         )}
//         {product.description && (
//           <div className="mt-1 text-xs text-zinc-400 line-clamp-2">
//             {product.description}
//           </div>
//         )}

//         {hasVariants && variants.length > 0 && (
//           <div className="mt-3 overflow-x-auto">
//             <table className="min-w-full text-xs">
//               <thead>
//                 <tr className="text-zinc-400">
//                   <th className="text-left font-normal pr-3 py-1">Size</th>
//                   <th className="text-left font-normal pr-3 py-1">Màu</th>
//                   <th className="text-left font-normal pr-3 py-1">Giá</th>
//                   <th className="text-left font-normal pr-3 py-1">Giá KM</th>
//                   <th className="text-left font-normal pr-3 py-1">Kho</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {variants.map((v, i) => (
//                   <tr key={v.id ?? i} className="text-zinc-300">
//                     <td className="pr-3 py-1">{v.size ?? "-"}</td>
//                     <td className="pr-3 py-1">{v.color ?? "-"}</td>
//                     <td className="pr-3 py-1">
//                       {v.price != null ? formatPrice(v.price) : "-"}
//                     </td>
//                     <td className="pr-3 py-1">
//                       {v.sale_price != null ? formatPrice(v.sale_price) : "-"}
//                     </td>
//                     <td className="pr-3 py-1">{v.stock_quantity ?? "-"}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import {
  Send,
  Loader2,
  Sparkles,
  Tag,
  Shirt,
  Stars,
  X,
  Mic,
  MicOff,
  Minimize2,
  Maximize2,
} from "lucide-react";

// ---------------------------------------------
// Types matching your Laravel API responses
// ---------------------------------------------

type ApiVariant = {
  id: number;
  product_id?: number;
  img_id?: number | null;
  size?: string | null;
  color?: string | null;
  price?: number | null;
  sale_price?: number | null;
  stock_quantity?: number | null;
  status?: number | null;
};

type ApiCategory = {
  id?: number | null;
  name?: string | null;
};

type ApiProductBasic = {
  id: number;
  name: string;
  description?: string | null;
  price?: number | null;
  images: string[];
};

type ApiProductFull = {
  id: number;
  name: string;
  description?: string | null;
  images: string[];
  variant?: ApiVariant[];
  category?: ApiCategory;
};

type ApiResponse = {
  message?: string;
  style_name?: string | null;
  description?: string | null;
  keywords?: string[];
  products?: ApiProductBasic[] | ApiProductFull[];
  mix_and_match?: string[] | null;
};

// ---------------------------------------------
// Chat UI Types
// ---------------------------------------------

type ChatRole = "user" | "assistant" | "system";

type ChatAttachment = {
  kind: "style";
  style_name?: string | null;
  description?: string | null;
  keywords?: string[];
  products?: (ApiProductBasic | ApiProductFull)[];
  mix_and_match?: string[] | null;
};

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  attachment?: ChatAttachment;
  timestamp: Date;
};

// ---------------------------------------------
// Utilities
// ---------------------------------------------

function clsx(...args: (string | false | null | undefined)[]): string {
  return args.filter(Boolean).join(" ");
}

function formatPrice(p?: number | null): string {
  if (p == null) return "";
  try {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(p);
  } catch {
    return `${p}`;
  }
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ---------------------------------------------
// Speech Recognition Setup
// ---------------------------------------------

const SpeechRecognition =
  typeof window !== "undefined"
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;

const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.lang = "vi-VN";
  recognition.interimResults = true;
  recognition.continuous = false;
}

// ---------------------------------------------
// Main Component
// ---------------------------------------------

export default function ChatBoxStylistAI({
  apiUrl,
  title = "Stylist AI",
}: {
  apiUrl?: string;
  title?: string;
  onClose?: () => void;
}) {
  const endpoint = useMemo(() => {
    const defaultUrl = `${process.env.NEXT_PUBLIC_API_URL ??
      ""}/api/stylist/analyze`;
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.warn("NEXT_PUBLIC_API_URL is not set. Using default endpoint.");
    }
    return apiUrl || defaultUrl;
  }, [apiUrl]);

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      text:
        "Xin chào! Mình là Stylist AI 👗 Hãy nói cho mình biết bạn muốn tìm sản phẩm gì, hỏi size, xem ưu đãi/flash sale, hoặc mình có thể phối một set đồ theo gu của bạn nhé!",
      timestamp: new Date(),
    },
  ]);

  const listRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (listRef.current && !isMinimized) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages.length, sending, isMinimized]);

  useEffect(() => {
    if (!textareaRef.current) return;
    const el = textareaRef.current;
    el.style.height = "0px";
    el.style.height = `${Math.min(120, el.scrollHeight)}px`;
  }, [input]);

  const sendInput = useCallback(
    async (inputText?: string) => {
      const trimmed = (inputText || input).trim();
      if (!trimmed) return;

      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        text: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setSending(true);

      try {
        const res = await axios.post<ApiResponse>(endpoint, {
          answers: [trimmed],
        });

        const data = res.data || {};

        const defaultMessage =
          "Mình đã tìm thấy một số gợi ý phù hợp với yêu cầu của bạn. Hãy xem chi tiết bên dưới nhé!";
        const attachment: ChatAttachment | undefined =
          data.style_name ||
          data.description ||
          data.keywords ||
          data.products ||
          data.mix_and_match
            ? {
                kind: "style",
                style_name: data.style_name,
                description: data.description,
                keywords: data.keywords,
                products: data.products ?? [],
                mix_and_match: data.mix_and_match ?? null,
              }
            : undefined;

        const assistantMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          text:
            data.message && data.message !== "không"
              ? data.message
              : defaultMessage,
          attachment,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err) {
        console.error("API Error:", err);
        let msg = "Đã có lỗi xảy ra. Vui lòng thử lại.";
        if (err instanceof axios.AxiosError && err.response?.data?.message) {
          msg =
            err.response.data.message !== "không"
              ? err.response.data.message
              : "Có lỗi xảy ra, nhưng đừng lo, mình sẽ giúp bạn tìm gợi ý khác!";
        }
        toast.error(msg);
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            text: msg,
            timestamp: new Date(),
          },
        ]);
      } finally {
        setSending(false);
      }
    },
    [input, endpoint]
  );

  const startRecording = useCallback(() => {
    if (!recognition) {
      toast.error("Trình duyệt không hỗ trợ nhận diện giọng nói.");
      return;
    }

    setIsRecording(true);
    setInput("");

    let interimTranscript = "";
    let finalTranscript = "";

    recognition.onstart = () => {
      console.log("Speech recognition started");
    };

    recognition.onresult = (event) => {
      interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      setInput(finalTranscript + interimTranscript);

      // Clear existing timeout
      if (recognitionTimeoutRef.current) {
        clearTimeout(recognitionTimeoutRef.current);
      }

      // Set new timeout for auto-send after silence
      recognitionTimeoutRef.current = setTimeout(() => {
        if (recognition && isRecording) {
          recognition.stop();
        }
      }, 2000); // 2 seconds of silence
    };

    recognition.onend = () => {
      setIsRecording(false);

      // Clear timeout
      if (recognitionTimeoutRef.current) {
        clearTimeout(recognitionTimeoutRef.current);
        recognitionTimeoutRef.current = null;
      }

      // Auto-send if there's text
      if (finalTranscript.trim()) {
        sendInput(finalTranscript.trim());
        finalTranscript = "";
      }
    };

    recognition.onerror = (event) => {
      setIsRecording(false);
      toast.error("Lỗi nhận diện giọng nói: " + event.error);

      if (recognitionTimeoutRef.current) {
        clearTimeout(recognitionTimeoutRef.current);
        recognitionTimeoutRef.current = null;
      }
    };

    recognition.start();
  }, [sendInput, isRecording]);

  const stopRecording = useCallback(() => {
    if (recognition && isRecording) {
      recognition.stop();
    }
    if (recognitionTimeoutRef.current) {
      clearTimeout(recognitionTimeoutRef.current);
      recognitionTimeoutRef.current = null;
    }
  }, [isRecording]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (!sending) sendInput();
      }
    },
    [sending, sendInput]
  );

  const toggleMinimize = useCallback(() => {
    setIsMinimized((prev) => !prev);
  }, []);

  // Return null if chat is closed
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-full max-w-md">
      <Toaster position="top-right" />
      <div
        className={clsx(
          "rounded-2xl shadow-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white border border-purple-500/20 overflow-hidden backdrop-blur-sm transition-all duration-300",
          isMinimized ? "h-16" : "h-auto"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-purple-500/20 bg-black/20 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              {isRecording && (
                <div className="absolute -inset-1 rounded-xl bg-red-500 animate-pulse"></div>
              )}
            </div>
            <div>
              <div className="font-bold text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {title}
              </div>
              <div className="text-xs text-purple-300">
                {isRecording ? "Đang nghe..." : "Trợ lý thời trang AI"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMinimize}
              className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-all duration-200 text-red-400"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Chat Content */}
        {!isMinimized && (
          <>
            {/* Messages */}
            <div
              ref={listRef}
              className="max-h-[60vh] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-black/10"
            >
              {messages.map((m) => (
                <MessageBubble key={m.id} msg={m} />
              ))}
              {sending && (
                <div className="flex items-center justify-center p-4">
                  <div className="flex items-center gap-3 text-purple-300 bg-white/5 rounded-full px-4 py-2 backdrop-blur-sm">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Đang soạn trả lời...</span>
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-purple-500/20 p-4 bg-black/20 backdrop-blur-sm">
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder={
                    isRecording
                      ? "Đang nghe bạn nói..."
                      : "Nhập hoặc nói để hỏi: tìm sản phẩm, hỏi size, xem giảm giá/flash sale, hoặc nhờ phối đồ..."
                  }
                  className={clsx(
                    "w-full resize-none bg-white/10 text-white rounded-2xl p-4 pr-24 placeholder:text-purple-300/70 outline-none focus:ring-2 focus:ring-purple-500/50 backdrop-blur-sm transition-all duration-200",
                    isRecording && "ring-2 ring-red-500/50 bg-red-500/10"
                  )}
                  rows={1}
                  disabled={isRecording}
                />

                {/* Voice Button */}
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={sending || !SpeechRecognition}
                  className={clsx(
                    "absolute right-14 bottom-2 inline-flex items-center justify-center h-10 w-10 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg",
                    sending || !SpeechRecognition
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : isRecording
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse shadow-red-500/25"
                      : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 shadow-purple-500/25"
                  )}
                >
                  {isRecording ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </button>

                {/* Send Button */}
                <button
                  onClick={() => sendInput()}
                  disabled={sending || !input.trim() || isRecording}
                  className={clsx(
                    "absolute right-2 bottom-2 inline-flex items-center justify-center h-10 w-10 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg",
                    sending || !input.trim() || isRecording
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-green-500/25"
                  )}
                >
                  {sending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Status Text */}
              <div className="mt-2 flex items-center justify-between text-xs text-purple-300/70">
                <span>
                  {isRecording
                    ? "🎤 Nói xong sẽ tự động gửi sau 2 giây"
                    : "Enter để gửi • Shift+Enter xuống dòng"}
                </span>
                {SpeechRecognition && (
                  <span className="flex items-center gap-1">
                    <Mic className="h-3 w-3" />
                    Voice enabled
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------
// Message Bubble + Rich Attachments
// ---------------------------------------------

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === "user";

  return (
    <div className={clsx("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={clsx(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-lg backdrop-blur-sm transition-all duration-200 hover:shadow-xl",
          isUser
            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-purple-500/25"
            : "bg-white/10 text-white border border-white/20 shadow-black/25"
        )}
      >
        {msg.text && (
          <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
        )}

        {/* Timestamp */}
        <div
          className={clsx(
            "text-xs mt-1 opacity-70",
            isUser ? "text-right" : "text-left"
          )}
        >
          {formatTime(msg.timestamp)}
        </div>

        {!isUser && msg.attachment?.kind === "style" && (
          <div className="mt-3 space-y-3">
            <StyleSummary
              name={msg.attachment.style_name}
              desc={msg.attachment.description}
              keywords={msg.attachment.keywords}
            />
            {Array.isArray(msg.attachment.mix_and_match) &&
              msg.attachment.mix_and_match.length > 0 && (
                <MixAndMatch names={msg.attachment.mix_and_match} />
              )}
            {Array.isArray(msg.attachment.products) &&
              msg.attachment.products.length > 0 && (
                <ProductsGrid products={msg.attachment.products} />
              )}
          </div>
        )}
      </div>
    </div>
  );
}

function StyleSummary({
  name,
  desc,
  keywords,
}: {
  name?: string | null;
  desc?: string | null;
  keywords?: string[];
}) {
  if (!name && !desc && (!keywords || keywords.length === 0)) return null;
  return (
    <div className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-purple-200">
        <Stars className="h-4 w-4" />
        {name || "Gu thời trang của bạn"}
      </div>
      {desc && (
        <p className="mt-2 text-purple-100 text-sm leading-relaxed">{desc}</p>
      )}
      {keywords && keywords.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {keywords.map((k, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs text-purple-200 backdrop-blur-sm"
            >
              <Tag className="h-3 w-3" /> {k}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function MixAndMatch({ names }: { names: string[] }) {
  return (
    <div className="rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-900/50 to-cyan-900/50 p-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 text-sm font-semibold text-blue-200">
        <Shirt className="h-4 w-4" /> Set phối đồ gợi ý
      </div>
      <ul className="mt-2 space-y-1">
        {names.map((n, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-blue-100">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProductsGrid({
  products,
}: {
  products: (ApiProductBasic | ApiProductFull)[];
}) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {products.map((p) => (
        <ProductCard
          key={p.id + ((p as ApiProductFull).variant ? "-full" : "-basic")}
          product={p}
        />
      ))}
    </div>
  );
}

function ProductCard({
  product,
}: {
  product: ApiProductBasic | ApiProductFull;
}) {
  const cover = product.images?.[0];
  const hasVariants = Array.isArray((product as ApiProductFull).variant);
  const variants = (product as ApiProductFull).variant || [];

  const basePrice = "price" in product ? product.price ?? null : null;
  const firstSale =
    variants.find((v) => v.sale_price != null)?.sale_price ?? null;
  const firstPrice = variants.find((v) => v.price != null)?.price ?? null;
  const displayPrice = basePrice ?? firstSale ?? firstPrice ?? null;

  return (
    <div className="rounded-xl overflow-hidden border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
      <div className="aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900">
        {cover ? (
          <Image
            src={cover}
            alt={product.name}
            className="h-full w-full object-cover"
            width={500}
            height={281}
            unoptimized
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
            Không có ảnh
          </div>
        )}
      </div>

      <div className="p-3">
        <div className="font-medium text-white line-clamp-2">
          {product.name}
        </div>
        {displayPrice != null && (
          <div className="mt-1 text-sm font-semibold text-green-400">
            {formatPrice(displayPrice)}
          </div>
        )}
        {product.description && (
          <div className="mt-1 text-xs text-gray-300 line-clamp-2">
            {product.description}
          </div>
        )}

        {hasVariants && variants.length > 0 && (
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-xs bg-black/20 rounded-lg">
              <thead>
                <tr className="text-gray-400 bg-white/5">
                  <th className="text-left font-normal px-2 py-2">Size</th>
                  <th className="text-left font-normal px-2 py-2">Màu</th>
                  <th className="text-left font-normal px-2 py-2">Giá</th>
                  <th className="text-left font-normal px-2 py-2">Giá KM</th>
                  <th className="text-left font-normal px-2 py-2">Kho</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((v, i) => (
                  <tr
                    key={v.id ?? i}
                    className="text-gray-300 border-t border-white/10"
                  >
                    <td className="px-2 py-2">{v.size ?? "-"}</td>
                    <td className="px-2 py-2">{v.color ?? "-"}</td>
                    <td className="px-2 py-2 text-gray-400">
                      {v.price != null ? formatPrice(v.price) : "-"}
                    </td>
                    <td className="px-2 py-2 text-green-400 font-medium">
                      {v.sale_price != null ? formatPrice(v.sale_price) : "-"}
                    </td>
                    <td className="px-2 py-2">{v.stock_quantity ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
