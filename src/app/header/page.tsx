// "use client";

// import { useState } from "react";
// import BlogMenu from "../components/BlogMenu"; // điều chỉnh path nếu cần
// import BannerCarousel from "../components/BannerCarousel"; // điều chỉnh path nếu cần
// import { Search, User, Heart, ShoppingCart } from "lucide-react";
// import DropdownMenu from "../components/DropdownMenu"; // điều chỉnh path nếu cần
// export default function HomePage() {
//   const [language, setLanguage] = useState("vi"); // mặc định tiếng Việt
//   const shopMenu = [
//     { label: "All Products", link: "#" },
//     { label: "Sale", link: "#" },
//     { label: "New Arrivals", link: "#" },
//   ];

//   const pagesMenu = [
//     { label: "About Us", link: "#" },
//     { label: "Contact", link: "#" },
//     { label: "FAQ", link: "#" },
//   ];

//   const blogMenu = [
//     { label: "Grid layout", link: "#" },
//     { label: "Left sidebar", link: "#" },
//     { label: "Right sidebar", link: "#" },
//     { label: "Blog list", link: "#" },
//     { label: "Single Post", link: "#" },
//   ];
//   return (
//     <div className="w-full bg-white">
//       {/* Top Marquee Bar */}
//       <div className="bg-purple-600 text-white text-sm text-center py-2 font-semibold">
//         <marquee behavior="scroll" direction="left" scrollamount="5">
//           {language === "vi"
//             ? "MÙA MỚI, PHONG CÁCH MỚI: ƯU ĐÃI THỜI TRANG KHÔNG THỂ BỎ LỠ — MIỄN PHÍ VẬN CHUYỂN VÀ TRẢ HÀNG"
//             : "NEW SEASON, NEW STYLES: FASHION SALE YOU CAN’T MISS — FREE SHIPPING AND RETURNS"}
//         </marquee>
//       </div>
//       {/* Wrapper với khoảng cách đều hai bên */}

//       {/* Header */}
//       <header className="flex justify-between items-center px-6 py-4 border-b">
//         {/* Language & Option */}
//         <div className="flex gap-6 text-sm">
//           <div className="relative">
//             <select className="appearance-none bg-transparent pr-6 outline-none">
//               <option>Nothing</option>
//             </select>
//           </div>
//           <div className="relative">
//             {/* <select className="appearance-none bg-transparent pr-6 outline-none">
//               <option>English</option>
//             </select> */}
//             <select
//               className="appearance-none bg-transparent pr-6 outline-none cursor-pointer"
//               value={language}
//               onChange={(e) => setLanguage(e.target.value)}
//             >
//               <option value="vi">Tiếng Việt</option>
//               <option value="en">English</option>
//             </select>
//           </div>
//         </div>

//         {/* Logo */}
//         <h1 className="text-3xl font-bold tracking-wide">DREAMS</h1>

//         {/* Icons */}
//         <div className="flex gap-6 items-center text-xl relative">
//           <span className="cursor-pointer">
//             {" "}
//             <Search className="cursor-pointer size-5" />
//           </span>
//           <span className="cursor-pointer">
//             {" "}
//             <User className="cursor-pointer size-5" />
//           </span>
//           <span className="cursor-pointer relative">
//             <Heart className="size-5" />
//             <span className="absolute -top-2 -right-3 text-xs bg-red-500 text-white rounded-full px-1">
//               0
//             </span>
//           </span>
//           <span className="cursor-pointer relative">
//             <ShoppingCart className="size-5" />
//             <span className="absolute -top-2 -right-3 text-xs bg-red-500 text-white rounded-full px-1">
//               0
//             </span>
//           </span>
//         </div>
//       </header>

//       {/* Navigation */}
//       {/* <nav className="flex justify-center gap-8 py-4 font-medium text-sm border-b relative z-40">
//         <span className="cursor-pointer hover:text-purple-600">
//           {" "}
//           {language === "vi" ? "Trang chủ" : "Home"}
//         </span>
//         <span className="cursor-pointer hover:text-purple-600">
//           {" "}
//           {language === "vi" ? "Cửa hàng" : "Shop"}
//         </span>
//         <span className="cursor-pointer hover:text-purple-600">
//           {language === "vi" ? "Trang" : "Pages"}
//         </span>
//         <span className="cursor-pointer hover:text-purple-600">
//           {" "}
//           {language === "vi" ? "Mua ngay" : "Buy now"}
//         </span>
//         <BlogMenu />
//         <span className="cursor-pointer text-purple-600">Buy now</span>
//       </nav> */}
//       {/* 🔥 Brand Banner Carousel */}
//       <nav className="flex justify-center gap-8 py-4 font-medium text-sm border-b relative z-40">
//         <span className="cursor-pointer hover:text-purple-600">
//           {language === "vi" ? "Trang chủ" : "Home"}
//         </span>

//         <DropdownMenu
//           label={language === "vi" ? "Cửa hàng" : "Shop"}
//           items={shopMenu}
//         />

//         <DropdownMenu
//           label={language === "vi" ? "Trang" : "Pages"}
//           items={pagesMenu}
//         />

//         <span className="cursor-pointer hover:text-purple-600">
//           {language === "vi" ? "Mua ngay" : "Buy now"}
//         </span>

//         <DropdownMenu label="Blog" items={blogMenu} />
//       </nav>

//       <BannerCarousel />
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import DropdownMenu from "../components/DropdownMenu";
import BannerCarousel from "../components/BannerCarousel";
import { Search, User, Heart, ShoppingCart } from "lucide-react";

export default function HomePage() {
  const [language, setLanguage] = useState<"vi" | "en">("vi");

  const shopMenu = [
    { label: { vi: "Tất cả sản phẩm", en: "All Products" }, link: "#" },
    { label: { vi: "Khuyến mãi", en: "Sale" }, link: "#" },
    { label: { vi: "Hàng mới", en: "New Arrivals" }, link: "#" },
  ];

  const pagesMenu = [
    { label: { vi: "Về chúng tôi", en: "About Us" }, link: "#" },
    { label: { vi: "Liên hệ", en: "Contact" }, link: "#" },
    { label: { vi: "Câu hỏi thường gặp", en: "FAQ" }, link: "#" },
  ];

  const blogMenu = [
    { label: { vi: "Lưới bài viết", en: "Grid layout" }, link: "#" },
    { label: { vi: "Sidebar trái", en: "Left sidebar" }, link: "#" },
    { label: { vi: "Sidebar phải", en: "Right sidebar" }, link: "#" },
    { label: { vi: "Danh sách blog", en: "Blog list" }, link: "#" },
    { label: { vi: "Bài viết đơn", en: "Single Post" }, link: "#" },
  ];

  return (
    <div className="w-full bg-white">
      {/* Top Bar */}
      <div className="bg-[tomato] text-white text-sm text-center py-2 font-semibold ">
        <marquee behavior="scroll" direction="left" scrollamount="5">
          {language === "vi"
            ? "MÙA MỚI, PHONG CÁCH MỚI: ƯU ĐÃI THỜI TRANG KHÔNG THỂ BỎ LỠ — MIỄN PHÍ VẬN CHUYỂN VÀ TRẢ HÀNG"
            : "NEW SEASON, NEW STYLES: FASHION SALE YOU CAN’T MISS — FREE SHIPPING AND RETURNS"}
        </marquee>
      </div>

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b">
        <div className="flex gap-6 text-sm">
          <select
            className="appearance-none bg-transparent pr-6 outline-none cursor-pointer"
            value={language}
            onChange={(e) => setLanguage(e.target.value as "vi" | "en")}
          >
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
          </select>
        </div>

        <h1 className="text-3xl font-bold tracking-wide">DREAMS</h1>

        <div className="flex gap-6 items-center text-xl relative">
          <Search className="cursor-pointer size-5" />
          <User className="cursor-pointer size-5" />
          <span className="cursor-pointer relative">
            <Heart className="size-5" />
            <span className="absolute -top-2 -right-3 text-xs bg-red-500 text-white rounded-full px-1">
              0
            </span>
          </span>
          <span className="cursor-pointer relative">
            <ShoppingCart className="size-5" />
            <span className="absolute -top-2 -right-3 text-xs bg-red-500 text-white rounded-full px-1">
              0
            </span>
          </span>
        </div>
      </header>

      {/* Navigation */}
      <nav className="flex justify-center gap-8 py-4 font-medium text-sm border-b relative z-40">
        <span className="cursor-pointer hover:text-purple-600">
          {language === "vi" ? "Trang chủ" : "Home"}
        </span>

        <DropdownMenu
          label={language === "vi" ? "Cửa hàng" : "Shop"}
          items={shopMenu}
          language={language}
        />

        <DropdownMenu
          label={language === "vi" ? "Trang" : "Pages"}
          items={pagesMenu}
          language={language}
        />

        <span className="cursor-pointer hover:text-purple-600">
          {language === "vi" ? "Mua ngay" : "Buy now"}
        </span>

        <DropdownMenu label="Blog" items={blogMenu} language={language} />
      </nav>

      <BannerCarousel />
    </div>
  );
}
