// // "use client";
// // import { ChevronDown, Search, User, Heart, ShoppingCart } from "lucide-react";
// // import { useState } from "react";
// // import DropdownMenu from "./DropdownMenu";
// // import CartModal from "./CartModal";
// // import { useCart } from "../../context/CartContext";
// // import Link from "next/link";
// // export default function Header() {
// //   const [language, setLanguage] = useState<"vi" | "en">("vi");
// //   const { cartItems } = useCart();
// //   const [showCartModal, setShowCartModal] = useState(false);
// //   const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

// //   const shopMenu = [
// //     { label: { vi: "Tất cả sản phẩm", en: "All Products" }, link: "#" },
// //     { label: { vi: "Khuyến mãi", en: "Sale" }, link: "#" },
// //     { label: { vi: "Hàng mới", en: "New Arrivals" }, link: "#" },
// //   ];

// //   const pagesMenu = [
// //     { label: { vi: "Về chúng tôi", en: "About Us" }, link: "#" },
// //     { label: { vi: "Liên hệ", en: "Contact" }, link: "#" },
// //     { label: { vi: "Câu hỏi thường gặp", en: "FAQ" }, link: "#" },
// //   ];

// //   const blogMenu = [
// //     { label: { vi: "Lưới bài viết", en: "Grid layout" }, link: "#" },
// //     { label: { vi: "Sidebar trái", en: "Left sidebar" }, link: "#" },
// //     { label: { vi: "Sidebar phải", en: "Right sidebar" }, link: "#" },
// //     { label: { vi: "Danh sách blog", en: "Blog list" }, link: "#" },
// //     { label: { vi: "Bài viết đơn", en: "Single Post" }, link: "#" },
// //   ];

// //   return (
// //     <div className="w-full bg-white">
// //       {/* Top Bar - NOT sticky */}
// //       <div className="bg-[tomato] text-white text-sm text-center py-1 font-semibold">
// //         {/* ✅ Đã sửa scrollAmount => scrollamount */}
// //         <marquee behavior="scroll" direction="left" scrollamount="5">
// //           {language === "vi"
// //             ? "MÙA MỚI, PHONG CÁCH MỚI: ƯU ĐÃI THỜI TRANG KHÔNG THỂ BỎ LỠ — MIỄN PHÍ VẬN CHUYỂN VÀ TRẢ HÀNG"
// //             : "NEW SEASON, NEW STYLES: FASHION SALE YOU CAN’T MISS — FREE SHIPPING AND RETURNS"}
// //         </marquee>
// //       </div>

// //       {/* Sticky Header + Nav container */}
// //       <div className="sticky top-0 z-50 bg-white shadow-md">
// //         {/* Header */}
// //         <header className="flex justify-between items-center px-6 py-4 border-b bg-white">
// //           {/* Language Selector */}
// //           <div className="relative">
// //             <select
// //               className="appearance-none bg-transparent pr-6 pl-2 outline-none cursor-pointer"
// //               value={language}
// //               onChange={(e) => setLanguage(e.target.value as "vi" | "en")}
// //             >
// //               <option value="vi">Tiếng Việt</option>
// //               <option value="en">English</option>
// //             </select>
// //             <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-500" />
// //           </div>

// //           {/* Logo */}
// //           <h1 className="text-3xl font-bold tracking-wide">DREAMS</h1>

// //           {/* Icons */}
// //           <div className="flex gap-6 items-center text-xl relative">
// //             <Search className="cursor-pointer size-5" />
// //             <User className="cursor-pointer size-5" />
// //             <span className="cursor-pointer relative">
// //               <Heart className="size-5" />
// //               <span className="absolute -top-2 -right-3 text-xs bg-red-500 text-white rounded-full px-1">
// //                 0
// //               </span>
// //             </span>
// //             <span
// //               className="cursor-pointer relative"
// //               onClick={() => setShowCartModal(true)}
// //             >
// //               <ShoppingCart className="size-5" />
// //               {totalQty > 0 && (
// //                 <span className="absolute -top-2 -right-3 text-xs bg-red-500 text-white rounded-full px-1">
// //                   {totalQty}
// //                 </span>
// //               )}
// //             </span>
// //           </div>
// //         </header>

// //         {/* Navigation */}
// //         <nav className="flex justify-center gap-8 py-4 font-medium text-sm border-b bg-white">
// //           <span className="cursor-pointer hover:text-purple-600">
// //             {language === "vi" ? "Trang chủ" : "Home"}
// //           </span>

// //           <DropdownMenu
// //             label={language === "vi" ? "Cửa hàng" : "Shop"}
// //             items={shopMenu}
// //             language={language}
// //           />

// //           <DropdownMenu
// //             label={language === "vi" ? "Trang" : "Pages"}
// //             items={pagesMenu}
// //             language={language}
// //           />

// //           <span className="cursor-pointer hover:text-purple-600">
// //             {language === "vi" ? "Mua ngay" : "Buy now"}
// //           </span>

// //           <DropdownMenu label="Blog" items={blogMenu} language={language} />
// //         </nav>
// //       </div>

// //       {/* Cart Modal */}
// //       {showCartModal && <CartModal onClose={() => setShowCartModal(false)} />}
// //     </div>
// //   );
// // }

// "use client";
// import Link from "next/link"; // ✅ Thêm dòng này
// import { ChevronDown, Search, User, Heart, ShoppingCart } from "lucide-react";
// import { useState } from "react";
// import DropdownMenu from "./DropdownMenu";
// import CartModal from "./CartModal";
// import { useCart } from "../../context/CartContext";

// export default function Header() {
//   const [language, setLanguage] = useState<"vi" | "en">("vi");
//   const { cartItems } = useCart();
//   const [showCartModal, setShowCartModal] = useState(false);
//   const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   const shopMenu = [
//     { label: { vi: "Tất cả sản phẩm", en: "All Products" }, link: "/products" },
//     { label: { vi: "Khuyến mãi", en: "Sale" }, link: "/shop/sale" },
//     { label: { vi: "Hàng mới", en: "New Arrivals" }, link: "/shop/new" },
//   ];

//   const pagesMenu = [
//     { label: { vi: "Về chúng tôi", en: "About Us" }, link: "/about" },
//     { label: { vi: "Liên hệ", en: "Contact" }, link: "/contact" },
//     { label: { vi: "Câu hỏi thường gặp", en: "FAQ" }, link: "/faq" },
//   ];

//   const blogMenu = [
//     { label: { vi: "Lưới bài viết", en: "Grid layout" }, link: "/blog/grid" },
//     {
//       label: { vi: "Sidebar trái", en: "Left sidebar" },
//       link: "/blog/left-sidebar",
//     },
//     {
//       label: { vi: "Sidebar phải", en: "Right sidebar" },
//       link: "/blog/right-sidebar",
//     },
//     { label: { vi: "Danh sách blog", en: "Blog list" }, link: "/blog/list" },
//     { label: { vi: "Bài viết đơn", en: "Single Post" }, link: "/blog/single" },
//   ];

//   return (
//     <div className="w-full bg-white">
//       {/* Top Bar */}
//       <div className="bg-[tomato] text-white text-sm text-center py-1 font-semibold">
//         <marquee behavior="scroll" direction="left" scrollamount="5">
//           {language === "vi"
//             ? "MÙA MỚI, PHONG CÁCH MỚI: ƯU ĐÃI THỜI TRANG KHÔNG THỂ BỎ LỠ — MIỄN PHÍ VẬN CHUYỂN VÀ TRẢ HÀNG"
//             : "NEW SEASON, NEW STYLES: FASHION SALE YOU CAN’T MISS — FREE SHIPPING AND RETURNS"}
//         </marquee>
//       </div>

//       {/* Header + Nav */}
//       <div className="sticky top-0 z-50 bg-white shadow-md">
//         <header className="flex justify-between items-center px-6 py-4 border-b bg-white">
//           {/* Language Selector */}
//           <div className="relative">
//             <select
//               className="appearance-none bg-transparent pr-6 pl-2 outline-none cursor-pointer"
//               value={language}
//               onChange={(e) => setLanguage(e.target.value as "vi" | "en")}
//             >
//               <option value="vi">Tiếng Việt</option>
//               <option value="en">English</option>
//             </select>
//             <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-500" />
//           </div>

//           {/* Logo */}
//           <Link href="/" className="text-3xl font-bold tracking-wide">
//             DREAMS
//           </Link>

//           {/* Icons */}
//           <div className="flex gap-6 items-center text-xl relative">
//             <Search className="cursor-pointer size-5" />
//             <User className="cursor-pointer size-5" />
//             <span className="cursor-pointer relative">
//               <Heart className="size-5" />
//               <span className="absolute -top-2 -right-3 text-xs bg-red-500 text-white rounded-full px-1">
//                 0
//               </span>
//             </span>
//             <span
//               className="cursor-pointer relative"
//               onClick={() => setShowCartModal(true)}
//             >
//               <ShoppingCart className="size-5" />
//               {totalQty > 0 && (
//                 <span className="absolute -top-2 -right-3 text-xs bg-red-500 text-white rounded-full px-1">
//                   {totalQty}
//                 </span>
//               )}
//             </span>
//           </div>
//         </header>

//         {/* Navigation */}
//         <nav className="flex justify-center gap-8 py-4 font-medium text-sm border-b bg-white">
//           <Link href="/" className="hover:text-purple-600">
//             {language === "vi" ? "Trang chủ" : "Home"}
//           </Link>

//           <DropdownMenu
//             label={language === "vi" ? "Cửa hàng" : "Shop"}
//             items={shopMenu}
//             language={language}
//           />

//           <DropdownMenu
//             label={language === "vi" ? "Trang" : "Pages"}
//             items={pagesMenu}
//             language={language}
//           />

//           <Link href="/buy-now" className="hover:text-purple-600">
//             {language === "vi" ? "Mua ngay" : "Buy now"}
//           </Link>

//           <DropdownMenu label="Blog" items={blogMenu} language={language} />
//         </nav>
//       </div>

//       {showCartModal && <CartModal onClose={() => setShowCartModal(false)} />}
//     </div>
//   );
// }
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Search, User, Heart, ShoppingCart } from "lucide-react";
import { useState, startTransition } from "react";
import DropdownMenu from "./DropdownMenu";
import CartModal from "./CartModal";
import { useCart } from "../../context/CartContext";

export default function Header() {
  const router = useRouter();
  const [language, setLanguage] = useState<"vi" | "en">("vi");
  const { cartItems } = useCart();
  const [showCartModal, setShowCartModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLinkClick = (href: string) => {
    setLoading(true);
    startTransition(() => {
      router.push(href);
      setLoading(false);
    });
  };

  const shopMenu = [
    { label: { vi: "Tất cả sản phẩm", en: "All Products" }, link: "/products" },
    { label: { vi: "Khuyến mãi", en: "Sale" }, link: "/shop/sale" },
    { label: { vi: "Hàng mới", en: "New Arrivals" }, link: "/shop/new" },
  ];

  const pagesMenu = [
    { label: { vi: "Về chúng tôi", en: "About Us" }, link: "/about" },
    { label: { vi: "Liên hệ", en: "Contact" }, link: "/contact" },
    { label: { vi: "Câu hỏi thường gặp", en: "FAQ" }, link: "/faq" },
  ];

  const blogMenu = [
    { label: { vi: "Lưới bài viết", en: "Grid layout" }, link: "/blog/grid" },
    {
      label: { vi: "Sidebar trái", en: "Left sidebar" },
      link: "/blog/left-sidebar",
    },
    {
      label: { vi: "Sidebar phải", en: "Right sidebar" },
      link: "/blog/right-sidebar",
    },
    { label: { vi: "Danh sách blog", en: "Blog list" }, link: "/blog/list" },
    { label: { vi: "Bài viết đơn", en: "Single Post" }, link: "/blog/single" },
  ];

  return (
    <div className="w-full bg-white">
      {/* Top Bar */}
      <div className="bg-[tomato] text-white text-sm text-center py-1 font-semibold">
        <marquee behavior="scroll" direction="left" scrollamount="5">
          {language === "vi"
            ? "MÙA MỚI, PHONG CÁCH MỚI: ƯU ĐÃI THỜI TRANG KHÔNG THỂ BỎ LỠ — MIỄN PHÍ VẬN CHUYỂN VÀ TRẢ HÀNG"
            : "NEW SEASON, NEW STYLES: FASHION SALE YOU CAN’T MISS — FREE SHIPPING AND RETURNS"}
        </marquee>
      </div>

      {/* Header + Nav */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <header className="flex justify-between items-center px-24 py-4 border-b bg-white">
          {/* Language Selector */}
          <div className="relative">
            <select
              className="appearance-none bg-transparent pr-6 pl-2 outline-none cursor-pointer"
              value={language}
              onChange={(e) => setLanguage(e.target.value as "vi" | "en")}
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
            <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-500" />
          </div>

          {/* Logo */}
          <Link href="/" className="text-3xl font-bold tracking-wide">
            DREAMS
          </Link>

          {/* Icons */}
          <div className="flex gap-6 items-center text-xl relative">
            <Search className="cursor-pointer size-5" />
            <User className="cursor-pointer size-5" />
            <span className="cursor-pointer relative">
              <Heart className="size-5" />
              <span className="absolute -top-2 -right-3 text-xs bg-red-500 text-white rounded-full px-1">
                0
              </span>
            </span>
            <span
              className="cursor-pointer relative"
              onClick={() => setShowCartModal(true)}
            >
              <ShoppingCart className="size-5" />
              {totalQty > 0 && (
                <span className="absolute -top-2 -right-3 text-xs bg-red-500 text-white rounded-full px-1">
                  {totalQty}
                </span>
              )}
            </span>
          </div>
        </header>

        {/* Navigation */}
        <nav className="flex justify-center gap-8 py-4 font-medium text-sm border-b bg-white">
          <button
            onClick={() => handleLinkClick("/")}
            className="hover:text-purple-600"
          >
            {language === "vi" ? "Trang chủ" : "Home"}
          </button>

          <DropdownMenu
            label={language === "vi" ? "Cửa hàng" : "Shop"}
            items={shopMenu}
            language={language}
            onLinkClick={handleLinkClick}
          />
          <DropdownMenu
            label={language === "vi" ? "Trang" : "Pages"}
            items={pagesMenu}
            language={language}
            onLinkClick={handleLinkClick}
          />

          <button
            onClick={() => handleLinkClick("/buy-now")}
            className="hover:text-purple-600"
          >
            {language === "vi" ? "Mua ngay" : "Buy now"}
          </button>

          <DropdownMenu
            label="Blog"
            items={blogMenu}
            language={language}
            onLinkClick={handleLinkClick}
          />
        </nav>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="relative h-1 w-full overflow-hidden bg-gray-200">
          <div className="absolute inset-0 w-full">
            <div className="h-full w-1/3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-loading-bar" />
          </div>
        </div>
      )}

      {showCartModal && <CartModal onClose={() => setShowCartModal(false)} />}
    </div>
  );
}
