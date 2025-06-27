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
import WishlistModal from "./WishlistModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchWishlist } from "@/store/wishlistSlice";

type UserInfo = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
};

export default function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [language, setLanguage] = useState<"vi" | "en">("vi");
  const [showCartModal, setShowCartModal] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  // Lấy token để xác định trạng thái đăng nhập
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Lấy số lượng wishlist: nếu không có token thì luôn là 0
  const wishlistQty = useAppSelector((state) =>
    token ? state.wishlist.items.length : 0
  );

  const cartItems = useAppSelector((state) => state.cart.items);
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    // Gọi fetchWishlist khi Header mount hoặc khi user thay đổi
    if (token) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, token]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
      }
    } else {
      setUser(null);
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
    <>
      {/* Top Bar - KHÔNG sticky */}
      <div className="bg-[tomato] text-white text-sm text-center py-1 font-semibold">
        <marquee behavior="scroll" direction="left" scrollamount="5">
          {language === "vi"
            ? "MÙA MỚI, PHONG CÁCH MỚI: ƯU ĐÃI THỜI TRANG KHÔNG THỂ BỎ LỠ — MIỄN PHÍ VẬN CHUYỂN VÀ TRẢ HÀNG"
            : "NEW SEASON, NEW STYLES: FASHION SALE YOU CAN’T MISS — FREE SHIPPING AND RETURNS"}
        </marquee>
      </div>

      {/* Header + Navigation sticky */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        {/* Header */}
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

          <div className="flex-1 text-center">
            <Link href="/">
              <img
                src="/img/dr2025.png"
                alt="DREAMS Logo"
                className="mx-auto w-24 h-24 object-contain" // to hơn (96px x 96px)
              />
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex-1 flex justify-end gap-6 items-center text-xl">
            <Search className="cursor-pointer size-5" />

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

            {/* Wishlist Icon */}
            <span
              className="cursor-pointer relative"
              onClick={() => {
                if (token) setShowWishlistModal(true);
              }}
            >
              <Heart className="size-5" />
              {wishlistQty > 0 && (
                <span className="absolute -top-2 -right-3 text-xs bg-red-500 text-white rounded-full px-1">
                  {wishlistQty}
                </span>
              )}
            </span>
            {showWishlistModal && (
              <WishlistModal onClose={() => setShowWishlistModal(false)} />
            )}

            {/* Cart Icon */}
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

        {/* Loading Bar */}
        {loading && (
          <div className="relative h-1 w-full overflow-hidden bg-gray-200">
            <div className="absolute inset-0 w-full">
              <div className="h-full w-1/3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-loading-bar" />
            </div>
          </div>
        )}
        {showCartModal && <CartModal onClose={() => setShowCartModal(false)} />}
      </div>
    </>
  );
}
