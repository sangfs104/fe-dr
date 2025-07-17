"use client";
import { useState } from "react";
import DropdownMenu from "../components/ui/DropdownMenu";
import BannerCarousel from "../components/ui/BannerCarousel";
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
      <div className="overflow-hidden whitespace-nowrap bg-[tomato] text-white text-sm text-center py-2 font-semibold">
        <div className="inline-block animate-scroll">
          {language === "vi"
            ? "MÙA MỚI, PHONG CÁCH MỚI: ƯU ĐÃI THỜI TRANG KHÔNG THỂ BỎ LỠ — MIỄN PHÍ VẬN CHUYỂN VÀ TRẢ HÀNG"
            : "NEW SEASON, NEW STYLES: FASHION SALE YOU CAN’T MISS — FREE SHIPPING AND RETURNS"}
        </div>
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
