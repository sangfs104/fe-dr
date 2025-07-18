"use client";
import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Search, User, Heart, ShoppingCart } from "lucide-react";
import { useEffect, useState, startTransition } from "react";

import CartModal from "./CartModal";
import ImageSearch from "./AISearchCart";
import { useAppSelector } from "@/store/hooks";
import WishlistModal from "./WishlistModal";
import { useAppDispatch } from "@/store/hooks";
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
  const [language, setLanguage] = useState<"vi" | "en">("vi");
  const [showCartModal, setShowCartModal] = useState(false);
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [user, setUser] = useState<UserInfo | null>(null);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const wishlistCount = wishlistItems.length;
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const dispatch = useAppDispatch();
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
  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);
  const handleLinkClick = (href: string) => {
    setLoading(true);
    startTransition(() => {
      router.push(href);
      setLoading(false);
    });
  };

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
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <header className="flex items-center justify-between px-6 lg:px-40 py-2 border-b bg-white">
          {/* Left: Language Selector */}
          <div className="flex-1">
            <div className="relative w-fit">
              <select
                className="appearance-none bg-transparent pr-5 pl-3 py-1 text-sm outline-none cursor-pointer"
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
            <Link href="/" className="inline-block">
              <Image
                src="/img/dr2025.png"
                alt="DREAMS Logo"
                width={80} // giảm kích thước logo
                height={30}
                className="mx-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex-1 flex justify-end gap-3 items-center text-lg">
            {/* Tìm kiếm */}
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm sản phẩm..."
                className="border px-2 py-1 rounded-md text-sm h-8"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && keyword.trim()) {
                    router.push(
                      `/search?keyword=${encodeURIComponent(keyword.trim())}`
                    );
                    setKeyword("");
                  }
                }}
              />
            </div>

            {/* Icon tìm ảnh */}
            <Search
              className="cursor-pointer w-4 h-4"
              onClick={() => setShowImageSearch(true)}
            />

            {/* User */}
            {user ? (
              <button
                className="text-sm font-semibold hover:text-purple-600 flex items-center gap-1"
                onClick={() => router.push("/account")}
              >
                {user.avatar ? (
                  <Image
                    src={`http://localhost:8000/storage/${user.avatar}`}
                    alt="Avatar"
                    className="w-6 h-6 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold uppercase">
                    {user.name.charAt(0)}
                  </div>
                )}
              </button>
            ) : (
              <Link href="/login">
                <User className="cursor-pointer w-4 h-4" />
              </Link>
            )}

            {/* Wishlist */}
            <span
              className="cursor-pointer relative"
              onClick={() => setShowWishlistModal(true)}
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-3 text-xs bg-red-500 text-white rounded-full px-1">
                  {wishlistCount}
                </span>
              )}
            </span>

            {showWishlistModal && (
              <WishlistModal onClose={() => setShowWishlistModal(false)} />
            )}

            {/* Cart */}
            <span
              className="cursor-pointer relative"
              onClick={() => setShowCartModal(true)}
            >
              <ShoppingCart className="w-4 h-4" />
              {totalQty > 0 && (
                <span className="absolute -top-2 -right-3 text-xs bg-red-500 text-white rounded-full px-1">
                  {totalQty}
                </span>
              )}
            </span>
          </div>
        </header>

        {/* Navigation */}
        <nav className="sticky top-0 z-40 bg-white border-b py-4 flex justify-center gap-10 font-semibold text-sm shadow-sm">
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
            {language === "vi" ? "Tin tức" : "About"}
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
