// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   ChevronDown,
//   Search,
//   User,
//   Heart,
//   ShoppingCart,
//   X,
//   Menu,
// } from "lucide-react";
// import {
//   useEffect,
//   useState,
//   startTransition,
//   useRef,
//   useCallback,
// } from "react";

// import CartModal from "./CartModal";
// import ImageSearch from "./AISearchCart";
// import WishlistModal from "./WishlistModal";

// import { useAppSelector, useAppDispatch } from "@/store/hooks";
// import { fetchWishlist } from "@/store/wishlistSlice";

// type UserInfo = {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   role: string;
//   avatar: string | null;
// };

// export default function Header() {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const searchInputRef = useRef<HTMLInputElement>(null);
//   const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

//   const [language, setLanguage] = useState<"vi" | "en">("vi");
//   const [showCartModal, setShowCartModal] = useState(false);
//   const [showImageSearch, setShowImageSearch] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [keyword, setKeyword] = useState("");
//   const [user, setUser] = useState<UserInfo | null>(null);
//   const [showWishlistModal, setShowWishlistModal] = useState(false);
//   const [hasMounted, setHasMounted] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
//   const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
//   const [isSearchFocused, setIsSearchFocused] = useState(false);
//   const [showNotification, setShowNotification] = useState(false);
//   const [headerAnimation, setHeaderAnimation] = useState("");
//   const [cartPulse, setCartPulse] = useState(false);
//   const [wishlistPulse, setWishlistPulse] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false); // Thêm state cho menu hamburger

//   const wishlistItems = useAppSelector((state) => state.wishlist.items);
//   const cartItems = useAppSelector((state) => state.cart.items);
//   const prevCartCount = useRef(0);
//   const prevWishlistCount = useRef(0);

//   const wishlistCount = hasMounted ? wishlistItems.length : 0;
//   const totalQty = hasMounted
//     ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
//     : 0;

//   // Scroll handling
//   useEffect(() => {
//     let lastScrollY = window.scrollY;

//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY > 100) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }

//       if (currentScrollY > lastScrollY && currentScrollY > 200) {
//         setHeaderAnimation("translate-y-[-100%]");
//       } else {
//         setHeaderAnimation("translate-y-0");
//       }

//       lastScrollY = currentScrollY;
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Search suggestions
//   useEffect(() => {
//     const mockSuggestions = [
//       "Áo thun nam",
//       "Áo khoác nữ",
//       "Giày sneaker",
//       "Túi xách",
//       "Quần jeans",
//       "Váy midi",
//       "Áo sơ mi",
//       "Phụ kiện thời trang",
//     ];

//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }

//     if (keyword.trim() && isSearchFocused) {
//       searchTimeoutRef.current = setTimeout(() => {
//         const filtered = mockSuggestions.filter((item) =>
//           item.toLowerCase().includes(keyword.toLowerCase())
//         );
//         setSearchSuggestions(filtered.slice(0, 5));
//         setShowSearchSuggestions(filtered.length > 0);
//       }, 300);
//     } else {
//       setShowSearchSuggestions(false);
//     }

//     return () => {
//       if (searchTimeoutRef.current) {
//         clearTimeout(searchTimeoutRef.current);
//       }
//     };
//   }, [keyword, isSearchFocused]);

//   // Pulse animations for cart/wishlist
//   useEffect(() => {
//     if (hasMounted && totalQty > prevCartCount.current) {
//       setCartPulse(true);
//       setTimeout(() => setCartPulse(false), 600);
//     }
//     prevCartCount.current = totalQty;
//   }, [totalQty, hasMounted]);

//   useEffect(() => {
//     if (hasMounted && wishlistCount > prevWishlistCount.current) {
//       setWishlistPulse(true);
//       setTimeout(() => setWishlistPulse(false), 600);
//     }
//     prevWishlistCount.current = wishlistCount;
//   }, [wishlistCount, hasMounted]);

//   // Auto-close modals on outside click
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as Element;
//       if (showSearchSuggestions && !target.closest(".search-container")) {
//         setShowSearchSuggestions(false);
//         setIsSearchFocused(false);
//       }
//       if (showMobileMenu && !target.closest(".mobile-menu")) {
//         setShowMobileMenu(false);
//       }
//     };

//     document.addEventListener("click", handleClickOutside);
//     return () => document.removeEventListener("click", handleClickOutside);
//   }, [showSearchSuggestions, showMobileMenu]);

//   // Save search history
//   const saveSearchHistory = useCallback((query: string) => {
//     if (typeof window !== "undefined") {
//       const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
//       const updatedHistory = [
//         query,
//         ...history.filter((h: string) => h !== query),
//       ].slice(0, 10);
//       localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
//     }
//   }, []);

//   // Welcome notification
//   useEffect(() => {
//     if (hasMounted && user && !localStorage.getItem("welcomeShown")) {
//       setTimeout(() => {
//         setShowNotification(true);
//         localStorage.setItem("welcomeShown", "true");
//         setTimeout(() => setShowNotification(false), 5000);
//       }, 1000);
//     }
//   }, [user, hasMounted]);

//   useEffect(() => {
//     setHasMounted(true);
//   }, []);

//   useEffect(() => {
//     if (hasMounted) {
//       const storedUser = localStorage.getItem("user");
//       if (storedUser) {
//         try {
//           setUser(JSON.parse(storedUser));
//         } catch (err) {
//           console.error("Failed to parse user from localStorage", err);
//         }
//       }
//       dispatch(fetchWishlist());
//     }
//   }, [hasMounted, dispatch]);

//   const handleLinkClick = (href: string) => {
//     setLoading(true);
//     setShowMobileMenu(false); // Đóng menu di động khi nhấn link
//     startTransition(() => {
//       router.push(href);
//       setLoading(false);
//     });
//   };

//   const handleSearch = (query: string) => {
//     if (query.trim()) {
//       saveSearchHistory(query.trim());
//       router.push(`/search?query=${encodeURIComponent(query.trim())}`);
//       setKeyword("");
//       setShowSearchSuggestions(false);
//       setIsSearchFocused(false);
//     }
//   };

//   const handleSuggestionClick = (suggestion: string) => {
//     setKeyword(suggestion);
//     handleSearch(suggestion);
//   };

//   return (
//     <div className="w-full bg-white">
//       {/* Viewport Meta Tag (Add this in app/layout.tsx) */}
//       {/* <head>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       </head> */}

//       {/* Welcome Notification */}
//       {showNotification && user && (
//         <div className="fixed top-4 right-4 z-[100] transform transition-all duration-500 ease-out animate-slide-in-right max-w-[90%] sm:max-w-md">
//           <div className="bg-[tomato] text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
//             <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
//               👋
//             </div>
//             <div>
//               <p className="font-semibold text-sm sm:text-base">
//                 Chào mừng {user.name}!
//               </p>
//               <p className="text-xs sm:text-sm opacity-90">
//                 Khám phá những sản phẩm mới nhất
//               </p>
//             </div>
//             <button
//               onClick={() => setShowNotification(false)}
//               className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Top Bar */}
//       <div className="overflow-hidden whitespace-nowrap bg-[tomato] text-white text-xs sm:text-sm text-center py-2 font-semibold">
//         <div className="inline-block animate-marquee hover:animation-pause">
//           {language === "vi"
//             ? "MÙA MỚI, PHONG CÁCH MỚI: ƯU ĐÃI THỜI TRANG KHÔNG THỂ BỎ LỠ — MIỄN PHÍ VẬN CHUYỂN VÀ TRẢ HÀNG"
//             : "NEW SEASON, NEW STYLES: FASHION SALE YOU CAN'T MISS — FREE SHIPPING AND RETURNS"}
//         </div>
//       </div>

//       {/* Header */}
//       <div
//         className={`sticky top-0 z-50 bg-white shadow-md transition-all duration-300 ${headerAnimation} ${
//           isScrolled ? "shadow-lg backdrop-blur-sm bg-white/95" : ""
//         }`}
//       >
//         <header className="flex items-center justify-between px-4 sm:px-10 md:px-20 lg:px-40 py-2 border-b bg-white">
//           {/* Left: Language Selector */}
//           <div className="flex-1">
//             <div className="relative w-fit group">
//               <select
//                 className="appearance-none bg-transparent pr-5 pl-3 py-1 text-xs sm:text-sm outline-none cursor-pointer transition-all duration-200 group-hover:bg-gray-50 rounded-md"
//                 value={language}
//                 onChange={(e) => setLanguage(e.target.value as "vi" | "en")}
//               >
//                 <option value="vi">Tiếng Việt</option>
//                 <option value="en">English</option>
//               </select>
//               <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-500 transition-transform group-hover:rotate-180" />
//             </div>
//           </div>

//           {/* Center: Logo */}
//           <div className="flex-1 text-center">
//             <Link href="/" className="inline-block group">
//               <Image
//                 src="/img/dr2025.png"
//                 alt="DREAMS Logo"
//                 width={80}
//                 height={30}
//                 className="mx-auto object-contain w-16 sm:w-20 transition-transform duration-300 group-hover:scale-110"
//                 priority
//               />
//             </Link>
//           </div>

//           {/* Right: Icons */}
//           <div className="flex-1 flex justify-end gap-2 sm:gap-3 items-center text-lg">
//             {/* Search Input */}
//             <div className="relative search-container flex-1 max-w-[200px] sm:max-w-[250px]">
//               <div className="relative group">
//                 <input
//                   ref={searchInputRef}
//                   type="text"
//                   placeholder={
//                     language === "vi" ? "Tìm sản phẩm..." : "Search products..."
//                   }
//                   value={keyword}
//                   onChange={(e) => setKeyword(e.target.value)}
//                   onFocus={() => setIsSearchFocused(true)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       handleSearch(keyword);
//                     }
//                   }}
//                   className="w-full pl-4 pr-10 py-1.5 sm:py-2 border border-gray-200 rounded-full text-xs sm:text-sm focus:outline-none focus:border-[tomato] focus:ring-2 focus:ring-orange-200 transition-all duration-300"
//                 />
//                 {/* <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[tomato] transition-colors" /> */}
//               </div>

//               {/* Search Suggestions */}
//               {showSearchSuggestions && (
//                 <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-fade-in">
//                   {searchSuggestions.map((suggestion, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleSuggestionClick(suggestion)}
//                       className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-xs sm:text-sm first:rounded-t-lg last:rounded-b-lg"
//                     >
//                       <Search className="inline w-3 h-3 mr-2 text-gray-400" />
//                       {suggestion}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Image Search */}
//             <button
//               onClick={() => setShowImageSearch(true)}
//               className="p-1.5 sm:p-2 rounded-full hover:bg-orange-50 hover:text-[tomato] transition-all duration-200 hover:scale-110"
//               title="Tìm kiếm bằng hình ảnh"
//             >
//               <Search className="w-4 h-4" />
//             </button>

//             {/* User */}
//             {hasMounted && user ? (
//               <button
//                 className="text-xs sm:text-sm font-semibold hover:text-[tomato] flex items-center gap-1 group transition-all duration-200"
//                 onClick={() => router.push("/account")}
//               >
//                 {user.avatar ? (
//                   <Image
//                     src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${user.avatar}`}
//                     width={24}
//                     height={24}
//                     alt="Avatar"
//                     unoptimized
//                     className="w-6 h-6 rounded-full object-cover border group-hover:border-[tomato] transition-all duration-200 group-hover:scale-110"
//                   />
//                 ) : (
//                   <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[tomato] to-red-500 text-white flex items-center justify-center text-xs font-bold uppercase group-hover:scale-110 transition-transform">
//                     {user.name.charAt(0)}
//                   </div>
//                 )}
//               </button>
//             ) : hasMounted ? (
//               <Link
//                 href="/login"
//                 className="p-1.5 sm:p-2 rounded-full hover:bg-orange-50 hover:text-[tomato] transition-all duration-200 hover:scale-110"
//               >
//                 <User className="w-4 h-4" />
//               </Link>
//             ) : null}

//             {/* Wishlist */}
//             <button
//               className={`cursor-pointer relative p-1.5 sm:p-2 rounded-full hover:bg-orange-50 hover:text-[tomato] transition-all duration-200 hover:scale-110 ${
//                 wishlistPulse ? "animate-pulse-scale" : ""
//               }`}
//               onClick={() => setShowWishlistModal(true)}
//               title="Danh sách yêu thích"
//             >
//               <Heart className="w-4 h-4" />
//               {wishlistCount > 0 && (
//                 <span className="absolute -top-1 -right-1 text-xs bg-gradient-to-r from-[tomato] to-red-500 text-white rounded-full px-1.5 py-0.5 font-semibold animate-bounce-subtle">
//                   {wishlistCount}
//                 </span>
//               )}
//             </button>

//             {/* Cart */}
//             <button
//               className={`cursor-pointer relative p-1.5 sm:p-2 rounded-full hover:bg-orange-50 hover:text-[tomato] transition-all duration-200 hover:scale-110 ${
//                 cartPulse ? "animate-pulse-scale" : ""
//               }`}
//               onClick={() => setShowCartModal(true)}
//               title="Giỏ hàng"
//             >
//               <ShoppingCart className="w-4 h-4" />
//               {totalQty > 0 && (
//                 <span className="absolute -top-1 -right-1 text-xs bg-gradient-to-r from-[tomato] to-red-500 text-white rounded-full px-1.5 py-0.5 font-semibold animate-bounce-subtle">
//                   {totalQty}
//                 </span>
//               )}
//             </button>

//             {/* Hamburger Menu Button */}
//             <button
//               className="p-1.5 sm:p-2 rounded-full hover:bg-orange-50 hover:text-[tomato] transition-all duration-200 hover:scale-110 md:hidden"
//               onClick={() => setShowMobileMenu(!showMobileMenu)}
//               title="Menu"
//             >
//               <Menu className="w-4 h-4" />
//             </button>
//           </div>
//         </header>

//         {/* Mobile Menu */}
//         {showMobileMenu && (
//           <div className="md:hidden mobile-menu bg-white border-b py-4 flex flex-col items-center gap-4 font-semibold text-sm shadow-sm animate-slide-in-right">
//             <button
//               onClick={() => handleLinkClick("/")}
//               className="relative hover:text-[tomato] transition-all duration-200 group"
//             >
//               {language === "vi" ? "Trang chủ" : "Home"}
//               <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[tomato] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
//             </button>
//             <button
//               onClick={() => handleLinkClick("/products")}
//               className="relative hover:text-[tomato] transition-all duration-200 group"
//             >
//               {language === "vi" ? "Cửa hàng" : "Shop"}
//               <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[tomato] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
//             </button>
//             <button
//               onClick={() => handleLinkClick("/lucky")}
//               className="relative hover:text-[tomato] transition-all duration-200 group"
//             >
//               {language === "vi" ? "Vòng quay may mắn" : "Lucky Wheel"}
//               <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[tomato] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
//             </button>
//             <button
//               onClick={() => handleLinkClick("/blog")}
//               className="relative hover:text-[tomato] transition-all duration-200 group"
//             >
//               {language === "vi" ? "Tin tức" : "News"}
//               <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[tomato] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
//             </button>
//           </div>
//         )}

//         {/* Navigation for Desktop */}
//         <nav className="hidden md:flex sticky top-0 z-40 bg-white border-b py-4 justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 font-semibold text-xs sm:text-sm">
//           <button
//             onClick={() => handleLinkClick("/")}
//             className="relative hover:text-[tomato] transition-all duration-200 group"
//           >
//             {language === "vi" ? "Trang chủ" : "Home"}
//             <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-[tomato] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
//           </button>
//           <button
//             onClick={() => handleLinkClick("/products")}
//             className="relative hover:text-[tomato] transition-all duration-200 group"
//           >
//             {language === "vi" ? "Cửa hàng" : "Shop"}
//             <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-[tomato] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
//           </button>
//           <button
//             onClick={() => handleLinkClick("/lucky")}
//             className="relative hover:text-[tomato] transition-all duration-200 group"
//           >
//             {language === "vi" ? "Vòng quay may mắn" : "Lucky Wheel"}
//             <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-[tomato] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
//           </button>
//           <button
//             onClick={() => handleLinkClick("/blog")}
//             className="relative hover:text-[tomato] transition-all duration-200 group"
//           >
//             {language === "vi" ? "Tin tức" : "News"}
//             <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-[tomato] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
//           </button>
//         </nav>
//       </div>

//       {/* Loading Bar */}
//       {loading && (
//         <div className="relative h-1 w-full overflow-hidden bg-gray-200">
//           <div className="absolute inset-0 w-full">
//             <div className="h-full w-1/3 bg-gradient-to-r from-[tomato] via-red-500 to-orange-500 animate-loading-shimmer" />
//           </div>
//         </div>
//       )}

//       {/* Modals */}
//       {showCartModal && <CartModal onClose={() => setShowCartModal(false)} />}
//       {showWishlistModal && (
//         <WishlistModal onClose={() => setShowWishlistModal(false)} />
//       )}

//       {/* Image Search Modal */}
//       {showImageSearch && (
//         <div className="fixed inset-0 z-50 flex justify-end items-center bg-black/60 backdrop-blur-sm animate-fade-in">
//           <div className="relative h-full w-full sm:w-[90vw] md:max-w-[600px] overflow-y-auto bg-white/95 dark:bg-[#1e1e1e]/95 shadow-2xl rounded-l-3xl p-6 sm:p-8 animate-slide-in-right transition-all duration-300 ease-in-out backdrop-blur-md">
//             <button
//               onClick={() => setShowImageSearch(false)}
//               className="absolute top-5 right-5 rounded-full bg-white dark:bg-[#2c2c2c] p-2 shadow-md hover:shadow-lg hover:text-red-500 text-gray-600 dark:text-gray-300 hover:scale-110 transition-all duration-200 hover:rotate-90"
//               aria-label="Đóng modal"
//             >
//               <X className="w-5 h-5" />
//             </button>

//             <div className="mb-6">
//               <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white tracking-tight">
//                 Tìm kiếm hình ảnh thông minh
//               </h2>
//               <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
//                 Tải ảnh lên để tìm các sản phẩm tương tự qua trí tuệ nhân tạo.
//               </p>
//             </div>

//             <div className="space-y-4">
//               <ImageSearch />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Custom CSS */}
//       <style jsx>{`
//         @keyframes marquee {
//           0% {
//             transform: translateX(100%);
//           }
//           100% {
//             transform: translateX(-100%);
//           }
//         }

//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes slide-in-right {
//           from {
//             transform: translateX(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }

//         @keyframes pulse-scale {
//           0%,
//           100% {
//             transform: scale(1);
//           }
//           50% {
//             transform: scale(1.1);
//           }
//         }

//         @keyframes bounce-subtle {
//           0%,
//           100% {
//             transform: translateY(0);
//           }
//           50% {
//             transform: translateY(-2px);
//           }
//         }

//         @keyframes loading-shimmer {
//           0% {
//             transform: translateX(-100%);
//           }
//           100% {
//             transform: translateX(300%);
//           }
//         }

//         .animate-marquee {
//           animation: marquee 20s linear infinite;
//         }

//         .animate-fade-in {
//           animation: fade-in 0.3s ease-out;
//         }

//         .animate-slide-in-right {
//           animation: slide-in-right 0.5s ease-out;
//         }

//         .animate-pulse-scale {
//           animation: pulse-scale 0.6s ease-in-out;
//         }

//         .animate-bounce-subtle {
//           animation: bounce-subtle 2s ease-in-out infinite;
//         }

//         .animate-loading-shimmer {
//           animation: loading-shimmer 1.5s ease-in-out infinite;
//         }

//         .animation-pause:hover {
//           animation-play-state: paused;
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Search,
  User,
  Heart,
  ShoppingCart,
  X,
  Menu,
  Sparkles,
  Zap,
  Home,
  Store,
  Gamepad2,
  Newspaper,
} from "lucide-react";
import {
  useEffect,
  useState,
  startTransition,
  useRef,
  useCallback,
} from "react";

import CartModal from "./CartModal";
import ImageSearch from "./AISearchCart";
import WishlistModal from "./WishlistModal";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchWishlist } from "@/store/wishlistSlice";

type UserInfo = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string | null;
};

export default function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [language, setLanguage] = useState<"vi" | "en">("vi");
  const [showCartModal, setShowCartModal] = useState(false);
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [user, setUser] = useState<UserInfo | null>(null);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [headerAnimation, setHeaderAnimation] = useState("");
  const [cartPulse, setCartPulse] = useState(false);
  const [wishlistPulse, setWishlistPulse] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [is3DMode, setIs3DMode] = useState(true);

  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const cartItems = useAppSelector((state) => state.cart.items);
  const prevCartCount = useRef(0);
  const prevWishlistCount = useRef(0);

  const wishlistCount = hasMounted ? wishlistItems.length : 0;
  const totalQty = hasMounted
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (headerRef.current && is3DMode) {
        const rect = headerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x: x * 15, y: y * 8 });
      }
    };

    if (is3DMode) {
      document.addEventListener("mousemove", handleMouseMove);
      return () => document.removeEventListener("mousemove", handleMouseMove);
    }
  }, [is3DMode]);

  // Enhanced scroll handling with 3D parallax
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHeaderAnimation("translate-y-[-100%]");
      } else {
        setHeaderAnimation("translate-y-0");
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search suggestions with enhanced animations
  useEffect(() => {
    const mockSuggestions = [
      "Áo thun nam",
      "Áo khoác nữ",
      "Giày sneaker",
      "Túi xách",
      "Quần jeans",
      "Váy midi",
      "Áo sơ mi",
      "Phụ kiện thời trang",
    ];

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (keyword.trim() && isSearchFocused) {
      searchTimeoutRef.current = setTimeout(() => {
        const filtered = mockSuggestions.filter((item) =>
          item.toLowerCase().includes(keyword.toLowerCase())
        );
        setSearchSuggestions(filtered.slice(0, 5));
        setShowSearchSuggestions(filtered.length > 0);
      }, 300);
    } else {
      setShowSearchSuggestions(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [keyword, isSearchFocused]);

  // Enhanced pulse animations
  useEffect(() => {
    if (hasMounted && totalQty > prevCartCount.current) {
      setCartPulse(true);
      setTimeout(() => setCartPulse(false), 800);
    }
    prevCartCount.current = totalQty;
  }, [totalQty, hasMounted]);

  useEffect(() => {
    if (hasMounted && wishlistCount > prevWishlistCount.current) {
      setWishlistPulse(true);
      setTimeout(() => setWishlistPulse(false), 800);
    }
    prevWishlistCount.current = wishlistCount;
  }, [wishlistCount, hasMounted]);

  // Auto-close modals on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showSearchSuggestions && !target.closest(".search-container")) {
        setShowSearchSuggestions(false);
        setIsSearchFocused(false);
      }
      if (showMobileMenu && !target.closest(".mobile-menu")) {
        setShowMobileMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showSearchSuggestions, showMobileMenu]);

  // Save search history
  const saveSearchHistory = useCallback((query: string) => {
    if (typeof window !== "undefined") {
      const history = JSON.parse(localStorage.getItem("searchHistory") || "[]");
      const updatedHistory = [
        query,
        ...history.filter((h: string) => h !== query),
      ].slice(0, 10);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }
  }, []);

  // Enhanced welcome notification with 3D effects
  useEffect(() => {
    if (hasMounted && user && !localStorage.getItem("welcomeShown")) {
      setTimeout(() => {
        setShowNotification(true);
        localStorage.setItem("welcomeShown", "true");
        setTimeout(() => setShowNotification(false), 5000);
      }, 1000);
    }
  }, [user, hasMounted]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (err) {
          console.error("Failed to parse user from localStorage", err);
        }
      }
      dispatch(fetchWishlist());
    }
  }, [hasMounted, dispatch]);

  const handleLinkClick = (href: string) => {
    setLoading(true);
    setShowMobileMenu(false);
    startTransition(() => {
      router.push(href);
      setLoading(false);
    });
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      saveSearchHistory(query.trim());
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
      setKeyword("");
      setShowSearchSuggestions(false);
      setIsSearchFocused(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setKeyword(suggestion);
    handleSearch(suggestion);
  };

  const menuItems = [
    { href: "/", text: language === "vi" ? "Trang chủ" : "Home", icon: Home },
    {
      href: "/products",
      text: language === "vi" ? "Cửa hàng" : "Shop",
      icon: Store,
    },
    {
      href: "/lucky",
      text: language === "vi" ? "Vòng quay may mắn" : "Lucky Wheel",
      icon: Gamepad2,
    },
    {
      href: "/blog",
      text: language === "vi" ? "Tin tức" : "News",
      icon: Newspaper,
    },
  ];

  return (
    <div className="w-full relative">
      {/* 3D Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-200/20 to-red-300/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-gradient-to-br from-pink-200/20 to-purple-300/20 rounded-full blur-3xl animate-float-reverse"></div>
        <div className="absolute top-40 left-1/2 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-cyan-300/20 rounded-full blur-2xl animate-float-fast"></div>
      </div>

      {/* Enhanced Welcome Notification with 3D */}
      {showNotification && user && (
        <div className="fixed top-6 right-6 z-[100] transform transition-all duration-700 ease-out animate-3d-slide-in max-w-[90%] sm:max-w-md">
          <div className="relative backdrop-blur-xl bg-gradient-to-br from-[tomato]/90 to-red-600/90 text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-300">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[tomato] to-red-600 blur-xl opacity-30 -z-10 animate-pulse-glow"></div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-bounce-3d">
                <Sparkles className="w-5 h-5 text-yellow-300" />
              </div>
              <div>
                <p className="font-bold text-base mb-1 drop-shadow-lg">
                  Chào mừng {user.name}! 🎉
                </p>
                <p className="text-sm opacity-90 drop-shadow-sm">
                  Khám phá những sản phẩm mới nhất với trải nghiệm 3D
                </p>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="ml-2 hover:bg-white/20 rounded-full p-2 transition-all duration-300 hover:rotate-90 hover:scale-110"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Top Bar with 3D Gradient */}
      <div className="relative overflow-hidden whitespace-nowrap bg-gradient-to-r from-[tomato] via-red-500 to-orange-500 text-white text-sm text-center py-3 font-bold shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        <div className="relative inline-block animate-marquee-3d hover:animation-pause drop-shadow-lg">
          {language === "vi"
            ? "✨ MÙA MỚI, PHONG CÁCH MỚI: ƯU ĐÃI THỜI TRANG KHÔNG THỂ BỎ LỠ — MIỄN PHÍ VẬN CHUYỂN VÀ TRẢ HÀNG ✨"
            : "✨ NEW SEASON, NEW STYLES: FASHION SALE YOU CAN'T MISS — FREE SHIPPING AND RETURNS ✨"}
        </div>
      </div>

      {/* Main Header with 3D Effects */}
      <div
        ref={headerRef}
        className={`sticky top-0 z-50 backdrop-blur-2xl bg-white/80 shadow-2xl transition-all duration-500 transform-gpu ${headerAnimation} ${
          isScrolled ? "shadow-3xl bg-white/70" : ""
        }`}
        style={{
          transform: is3DMode
            ? `
            perspective(1000px) 
            rotateX(${mousePosition.y * 0.2}deg) 
            rotateY(${mousePosition.x * 0.1}deg)
            translateZ(0)
          `
            : undefined,
          transformStyle: "preserve-3d",
        }}
      >
        {/* 3D Mode Toggle */}
        <button
          onClick={() => setIs3DMode(!is3DMode)}
          className="absolute top-2 left-2 z-10 p-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          title={is3DMode ? "Tắt chế độ 3D" : "Bật chế độ 3D"}
        >
          <Zap
            className={`w-4 h-4 transition-transform duration-300 ${
              is3DMode ? "animate-pulse" : ""
            } group-hover:rotate-12`}
          />
        </button>

        <header className="flex items-center justify-between px-4 sm:px-10 md:px-20 lg:px-40 py-4 relative">
          {/* Enhanced Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-100/20 via-transparent to-pink-100/20 pointer-events-none"></div>

          {/* Left: Enhanced Language Selector */}
          <div className="flex-1 relative z-10">
            <div className="relative w-fit group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-200/30 to-red-200/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"></div>
              <select
                className="relative appearance-none bg-white/60 backdrop-blur-sm border border-white/30 pr-8 pl-4 py-2 text-sm outline-none cursor-pointer transition-all duration-300 group-hover:bg-white/80 rounded-xl shadow-lg group-hover:shadow-xl transform group-hover:translateZ-2"
                value={language}
                onChange={(e) => setLanguage(e.target.value as "vi" | "en")}
                style={{ transformStyle: "preserve-3d" }}
              >
                <option value="vi">🇻🇳 Tiếng Việt</option>
                <option value="en">🇺🇸 English</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-600 transition-transform duration-300 group-hover:rotate-180 group-hover:text-[tomato]" />
            </div>
          </div>

          {/* Center: Enhanced 3D Logo */}
          <div className="flex-1 text-center relative z-10">
            <Link href="/" className="inline-block group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[tomato]/20 to-red-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-125"></div>
              <div
                className="relative transform transition-all duration-500 group-hover:scale-110 group-hover:rotateY-12"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src="/img/dr2025.png"
                  alt="DREAMS Logo"
                  width={100}
                  height={40}
                  className="mx-auto object-contain drop-shadow-2xl transition-all duration-500 group-hover:drop-shadow-3xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-lg transform translateZ-1"></div>
              </div>
            </Link>
          </div>

          {/* Right: Enhanced 3D Icons */}
          <div className="flex-1 flex justify-end gap-3 items-center text-lg relative z-10">
            {/* Enhanced Search Input with 3D Glass Effect */}
            <div className="relative search-container flex-1 max-w-[250px] sm:max-w-[300px]">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-all duration-300 transform group-focus-within:scale-105"></div>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={
                    language === "vi"
                      ? "🔍 Tìm sản phẩm..."
                      : "🔍 Search products..."
                  }
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(keyword);
                    }
                  }}
                  className="relative w-full pl-5 pr-12 py-3 backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl text-sm focus:outline-none focus:bg-white/80 focus:border-[tomato]/50 focus:ring-4 focus:ring-orange-200/50 transition-all duration-300 shadow-lg focus:shadow-xl transform focus:translateZ-2"
                  style={{ transformStyle: "preserve-3d" }}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-br from-[tomato] to-red-500 rounded-full p-1.5 shadow-lg group-focus-within:shadow-xl group-focus-within:scale-110 transition-all duration-300">
                  <Search className="w-3 h-3 text-white" />
                </div>
              </div>

              {/* Enhanced Search Suggestions with 3D */}
              {showSearchSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 backdrop-blur-xl bg-white/80 border border-white/30 rounded-2xl shadow-2xl z-20 animate-3d-fade-in overflow-hidden">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-5 py-3 hover:bg-gradient-to-r hover:from-orange-50/80 hover:to-red-50/80 transition-all duration-300 text-sm first:rounded-t-2xl last:rounded-b-2xl transform hover:translateZ-1 hover:scale-[1.02] border-b border-white/20 last:border-b-0"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <Search className="inline w-3 h-3 mr-3 text-gray-400" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Enhanced 3D Image Search Button */}
            <button
              onClick={() => setShowImageSearch(true)}
              className="relative p-3 rounded-2xl backdrop-blur-xl bg-white/60 border border-white/30 hover:bg-gradient-to-br hover:from-orange-100/80 hover:to-red-100/80 hover:border-[tomato]/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 hover:translateZ-2 group"
              title="Tìm kiếm bằng hình ảnh AI"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[tomato]/20 to-red-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <Search className="relative w-4 h-4 group-hover:text-[tomato] transition-colors duration-300" />
            </button>

            {/* Enhanced User Button with 3D Avatar */}
            {hasMounted && user ? (
              <button
                className="relative flex items-center gap-2 p-2 rounded-2xl backdrop-blur-xl bg-white/60 border border-white/30 hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:translateZ-2 group"
                onClick={() => router.push("/account")}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[tomato]/20 to-red-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                {user.avatar ? (
                  <div className="relative">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${user.avatar}`}
                      width={28}
                      height={28}
                      alt="Avatar"
                      unoptimized
                      className="relative w-7 h-7 rounded-full object-cover border-2 border-white/50 shadow-lg group-hover:border-[tomato]/50 transition-all duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                  </div>
                ) : (
                  <div className="relative w-7 h-7 rounded-full bg-gradient-to-br from-[tomato] to-red-500 text-white flex items-center justify-center text-xs font-bold uppercase shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 transform">
                    {user.name.charAt(0)}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                  </div>
                )}
              </button>
            ) : hasMounted ? (
              <Link
                href="/login"
                className="relative p-3 rounded-2xl backdrop-blur-xl bg-white/60 border border-white/30 hover:bg-gradient-to-br hover:from-blue-100/80 hover:to-purple-100/80 hover:border-blue-300/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 hover:translateZ-2 group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <User className="relative w-4 h-4 group-hover:text-blue-600 transition-colors duration-300" />
              </Link>
            ) : null}

            {/* Enhanced 3D Wishlist Button */}
            <button
              className={`relative cursor-pointer p-3 rounded-2xl backdrop-blur-xl bg-white/60 border border-white/30 hover:bg-gradient-to-br hover:from-pink-100/80 hover:to-red-100/80 hover:border-pink-300/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 hover:translateZ-2 group ${
                wishlistPulse ? "animate-3d-pulse" : ""
              }`}
              onClick={() => setShowWishlistModal(true)}
              title="Danh sách yêu thích"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-red-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <Heart className="relative w-4 h-4 group-hover:text-pink-600 transition-colors duration-300" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-gradient-to-br from-pink-500 to-red-500 text-white rounded-full px-2 py-1 font-bold shadow-lg animate-3d-bounce transform translateZ-4">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Enhanced 3D Cart Button */}
            <button
              className={`relative cursor-pointer p-3 rounded-2xl backdrop-blur-xl bg-white/60 border border-white/30 hover:bg-gradient-to-br hover:from-green-100/80 hover:to-emerald-100/80 hover:border-green-300/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 hover:translateZ-2 group ${
                cartPulse ? "animate-3d-pulse" : ""
              }`}
              onClick={() => setShowCartModal(true)}
              title="Giỏ hàng"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <ShoppingCart className="relative w-4 h-4 group-hover:text-green-600 transition-colors duration-300" />
              {totalQty > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-full px-2 py-1 font-bold shadow-lg animate-3d-bounce transform translateZ-4">
                  {totalQty}
                </span>
              )}
            </button>

            {/* Enhanced 3D Hamburger Menu */}
            <button
              className="relative p-3 rounded-2xl backdrop-blur-xl bg-white/60 border border-white/30 hover:bg-gradient-to-br hover:from-gray-100/80 hover:to-slate-100/80 hover:border-gray-300/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 hover:translateZ-2 md:hidden group"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              title="Menu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-400/20 to-slate-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <Menu className="relative w-4 h-4 group-hover:text-gray-700 transition-colors duration-300" />
            </button>
          </div>
        </header>

        {/* Enhanced Mobile Menu with 3D */}
        {showMobileMenu && (
          <div className="md:hidden mobile-menu backdrop-blur-xl bg-white/80 border-t border-white/30 py-6 flex flex-col items-center gap-6 font-bold text-sm shadow-xl animate-3d-slide-down">
            {menuItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.href}
                  onClick={() => handleLinkClick(item.href)}
                  className="relative flex items-center gap-3 px-6 py-3 rounded-2xl backdrop-blur-sm bg-white/40 hover:bg-gradient-to-br hover:from-orange-100/80 hover:to-red-100/80 transition-all duration-300 group transform hover:scale-105 hover:translateZ-2 shadow-lg hover:shadow-xl"
                  style={{
                    transformStyle: "preserve-3d",
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[tomato]/10 to-red-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <IconComponent className="relative w-5 h-5 text-gray-600 group-hover:text-[tomato] transition-colors duration-300" />
                  <span className="relative group-hover:text-[tomato] transition-colors duration-300">
                    {item.text}
                  </span>
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[tomato] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
                </button>
              );
            })}
          </div>
        )}

        {/* Enhanced Navigation for Desktop */}
        <nav className="hidden md:flex sticky top-0 z-40 backdrop-blur-xl bg-white/60 border-t border-white/30 py-6 justify-center gap-8 font-bold text-sm shadow-lg">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.href}
                onClick={() => handleLinkClick(item.href)}
                className="relative flex items-center gap-2 px-6 py-3 rounded-2xl backdrop-blur-sm bg-white/40 hover:bg-gradient-to-br hover:from-orange-100/80 hover:to-red-100/80 transition-all duration-300 group transform hover:scale-105 hover:translateZ-2 shadow-lg hover:shadow-xl"
                style={{
                  transformStyle: "preserve-3d",
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[tomato]/10 to-red-500/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <IconComponent className="relative w-4 h-4 text-gray-600 group-hover:text-[tomato] transition-colors duration-300" />
                <span className="relative group-hover:text-[tomato] transition-colors duration-300">
                  {item.text}
                </span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[tomato] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Enhanced Loading Bar with 3D */}
      {loading && (
        <div className="relative h-2 w-full overflow-hidden bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200">
          <div className="absolute inset-0 w-full">
            <div className="h-full w-1/3 bg-gradient-to-r from-[tomato] via-red-500 to-orange-500 animate-3d-loading-shimmer shadow-lg" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      )}

      {/* Modals */}
      {showCartModal && <CartModal onClose={() => setShowCartModal(false)} />}
      {showWishlistModal && (
        <WishlistModal onClose={() => setShowWishlistModal(false)} />
      )}

      {/* Enhanced Image Search Modal with 3D */}
      {showImageSearch && (
        <div className="fixed inset-0 z-50 flex justify-end items-center bg-black/60 backdrop-blur-lg animate-3d-fade-in">
          <div className="relative h-full w-full sm:w-[90vw] md:max-w-[600px] overflow-y-auto bg-white/90 backdrop-blur-2xl shadow-3xl rounded-l-3xl p-6 sm:p-8 animate-3d-slide-in-right transition-all duration-500 ease-in-out border-l border-white/30">
            {/* 3D Close Button */}
            <button
              onClick={() => setShowImageSearch(false)}
              className="absolute top-5 right-5 rounded-2xl bg-white/80 backdrop-blur-sm p-3 shadow-xl hover:shadow-2xl hover:text-red-500 text-gray-600 hover:scale-110 transition-all duration-300 hover:rotate-90 group border border-white/40"
              aria-label="Đóng modal"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-pink-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <X className="relative w-5 h-5 transform group-hover:translateZ-2" />
            </button>

            {/* Enhanced Modal Header */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight mb-2 bg-gradient-to-r from-[tomato] to-red-600 bg-clip-text text-transparent">
                🔍 Tìm kiếm hình ảnh thông minh
              </h2>
              <p className="text-sm text-gray-500 mt-2 backdrop-blur-sm bg-white/50 rounded-xl p-3 border border-white/30">
                ✨ Tải ảnh lên để tìm các sản phẩm tương tự qua trí tuệ nhân
                tạo.
              </p>
            </div>

            {/* Enhanced Content Area */}
            <div className="space-y-6 backdrop-blur-sm bg-white/30 rounded-2xl p-6 border border-white/40 shadow-lg">
              <ImageSearch />
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Custom CSS with 3D Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(15px) rotate(-3deg);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(8deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        @keyframes marquee-3d {
          0% {
            transform: translateX(100%) rotateY(0deg);
          }
          50% {
            transform: translateX(0) rotateY(2deg);
          }
          100% {
            transform: translateX(-100%) rotateY(0deg);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1) rotateZ(0deg);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05) rotateZ(1deg);
          }
        }

        @keyframes bounce-3d {
          0%,
          100% {
            transform: translateY(0) rotateZ(0deg) scale(1);
          }
          50% {
            transform: translateY(-8px) rotateZ(5deg) scale(1.1);
          }
        }

        @keyframes 3d-slide-in {
          from {
            transform: translateX(100%) rotateY(30deg) scale(0.8);
            opacity: 0;
          }
          to {
            transform: translateX(0) rotateY(0deg) scale(1);
            opacity: 1;
          }
        }

        @keyframes 3d-fade-in {
          from {
            opacity: 0;
            transform: translateZ(-100px) rotateX(10deg);
          }
          to {
            opacity: 1;
            transform: translateZ(0) rotateX(0deg);
          }
        }

        @keyframes 3d-slide-down {
          from {
            transform: translateY(-100%) rotateX(-20deg);
            opacity: 0;
          }
          to {
            transform: translateY(0) rotateX(0deg);
            opacity: 1;
          }
        }

        @keyframes 3d-slide-in-right {
          from {
            transform: translateX(100%) rotateY(45deg) scale(0.9);
            opacity: 0;
          }
          to {
            transform: translateX(0) rotateY(0deg) scale(1);
            opacity: 1;
          }
        }

        @keyframes 3d-pulse {
          0%,
          100% {
            transform: scale(1) rotateZ(0deg);
            box-shadow: 0 0 0 rgba(255, 99, 71, 0);
          }
          50% {
            transform: scale(1.15) rotateZ(2deg);
            box-shadow: 0 0 20px rgba(255, 99, 71, 0.3);
          }
        }

        @keyframes 3d-bounce {
          0%,
          100% {
            transform: translateY(0) translateZ(0) rotateZ(0deg);
          }
          50% {
            transform: translateY(-6px) translateZ(10px) rotateZ(5deg);
          }
        }

        @keyframes 3d-loading-shimmer {
          0% {
            transform: translateX(-100%) rotateY(-10deg);
          }
          50% {
            transform: translateX(0) rotateY(0deg);
          }
          100% {
            transform: translateX(300%) rotateY(10deg);
          }
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float-reverse 8s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        .animate-marquee-3d {
          animation: marquee-3d 25s linear infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-bounce-3d {
          animation: bounce-3d 1.5s ease-in-out infinite;
        }

        .animate-3d-slide-in {
          animation: 3d-slide-in 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .animate-3d-fade-in {
          animation: 3d-fade-in 0.5s ease-out;
        }

        .animate-3d-slide-down {
          animation: 3d-slide-down 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .animate-3d-slide-in-right {
          animation: 3d-slide-in-right 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .animate-3d-pulse {
          animation: 3d-pulse 0.8s ease-in-out;
        }

        .animate-3d-bounce {
          animation: 3d-bounce 2s ease-in-out infinite;
        }

        .animate-3d-loading-shimmer {
          animation: 3d-loading-shimmer 2s ease-in-out infinite;
        }

        .animation-pause:hover {
          animation-play-state: paused;
        }

        /* 3D Transform Utilities */
        .translateZ-1 {
          transform: translateZ(10px);
        }

        .translateZ-2 {
          transform: translateZ(20px);
        }

        .translateZ-4 {
          transform: translateZ(40px);
        }

        .rotateY-12 {
          transform: rotateY(12deg);
        }

        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        /* Glass Morphism Effects */
        .glass-effect {
          backdrop-filter: blur(16px) saturate(180%);
          background-color: rgba(255, 255, 255, 0.75);
          border: 1px solid rgba(209, 213, 219, 0.3);
        }

        /* Enhanced Perspective */
        .perspective-1000 {
          perspective: 1000px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        /* Responsive 3D adjustments */
        @media (max-width: 768px) {
          .animate-3d-slide-in-right {
            animation-duration: 0.5s;
          }

          .translateZ-1,
          .translateZ-2,
          .translateZ-4 {
            transform: none;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-float-slow,
          .animate-float-reverse,
          .animate-float-fast,
          .animate-shimmer,
          .animate-marquee-3d,
          .animate-pulse-glow,
          .animate-bounce-3d,
          .animate-3d-bounce {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
