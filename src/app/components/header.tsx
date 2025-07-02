"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Search,
  User,
  Heart,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { useEffect, useState, startTransition } from "react";
import DropdownMenu from "./DropdownMenu";
import CartModal from "./CartModal";
import ImageSearch from "./AISearchCart";
import { useAppSelector } from "@/store/hooks";

type UserInfo = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
};

export default function Header() {
  const router = useRouter();
  const [language, setLanguage] = useState<"vi" | "en">("vi");
  const [showCartModal, setShowCartModal] = useState(false);
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [user, setUser] = useState<UserInfo | null>(null);

  const cartItems = useAppSelector((state) => state.cart.items);
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
      }
    }
  }, []);

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
    { label: { vi: "Sidebar trái", en: "Left sidebar" }, link: "/blog/left-sidebar" },
    { label: { vi: "Sidebar phải", en: "Right sidebar" }, link: "/blog/right-sidebar" },
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

      {/* Header */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <header className="flex items-center justify-between px-40 py-4 border-b bg-white">
          {/* Left: Language Selector */}
          <div className="flex-1">
            <div className="relative w-fit">
              <select
                className="appearance-none bg-transparent pr-6 pl-3 py-1 outline-none cursor-pointer"
                value={language}
                onChange={(e) => setLanguage(e.target.value as "vi" | "en")}
              >
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
              </select>
              <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-500" />
            </div>
          </div>

          {/* Center: Logo */}
          <div className="flex-1 text-center">
            <Link href="/" className="text-3xl font-bold tracking-wide">
              DREAMS
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex-1 flex justify-end gap-4 items-center text-xl">
            {/* 🔎 Tìm kiếm chữ */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm sản phẩm..."
                className="border px-2 py-1 rounded-md text-sm"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && keyword.trim()) {
                    router.push(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
                    setKeyword("");
                  }
                }}
              />
            </div>

            {/* 📷 Icon tìm kiếm hình ảnh */}
            <Search
              className="cursor-pointer size-5"
              onClick={() => setShowImageSearch(true)}
            />

            {/* 👤 User */}
            {user ? (
              <button
                className="text-sm font-semibold hover:text-purple-600 flex items-center gap-1"
                onClick={() => router.push("/account")}
              >
                <UserRound className="size-5" />
                {user.name}
              </button>
            ) : (
              <Link href="/login">
                <User className="cursor-pointer size-5" />
              </Link>
            )}

            {/* ❤️ Wishlist */}
            <span className="cursor-pointer relative">
              <Heart className="size-5" />
              <span className="absolute -top-2 -right-3 text-xs bg-red-500 text-white rounded-full px-1">
                0
              </span>
            </span>

            {/* 🛒 Cart */}
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
      <nav className="flex justify-center gap-10 py-4 font-semibold text-sm border-b bg-white">
  <button
    onClick={() => handleLinkClick("/")}
    className="hover:text-purple-600"
  >
    {language === "vi" ? "Trang chủ" : "Home"}
  </button>

  <button
    onClick={() => handleLinkClick("/products")}
    className="hover:text-purple-600"
  >
    {language === "vi" ? "Cửa hàng" : "Shop"}
  </button>

  <button
    onClick={() => handleLinkClick("/lucky")}
    className="hover:text-purple-600"
  >
    {language === "vi" ? "Vòng quay may mắn" : "Lucky Wheel"}
  </button>

  <button
    onClick={() => handleLinkClick("/blog")}
    className="hover:text-purple-600"
  >
    {language === "vi" ? "Giới thiệu" : "About"}
  </button>
</nav>

      </div>

      {/* Loading */}
      {loading && (
        <div className="relative h-1 w-full overflow-hidden bg-gray-200">
          <div className="absolute inset-0 w-full">
            <div className="h-full w-1/3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-loading-bar" />
          </div>
        </div>
      )}

      {/* Modal Giỏ hàng */}
      {showCartModal && <CartModal onClose={() => setShowCartModal(false)} />}

      {/* Modal Tìm kiếm hình ảnh */}
      {showImageSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-end">
          <div className="relative bg-white p-6 shadow-xl w-[50vw] max-w-[600px] h-full overflow-y-auto rounded-l-xl">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
              onClick={() => setShowImageSearch(false)}
            >
              ✖
            </button>
            <ImageSearch />
          </div>
        </div>
      )}
    </div>
  );
}
