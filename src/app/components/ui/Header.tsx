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
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  const [language, setLanguage] = useState<"vi" | "en">("vi");
  const [showCartModal, setShowCartModal] = useState(false);
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [user, setUser] = useState<UserInfo | null>(null);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // New automation states
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [headerAnimation, setHeaderAnimation] = useState("");
  const [cartPulse, setCartPulse] = useState(false);
  const [wishlistPulse, setWishlistPulse] = useState(false);

  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const cartItems = useAppSelector((state) => state.cart.items);
  const prevCartCount = useRef(0);
  const prevWishlistCount = useRef(0);

  const wishlistCount = hasMounted ? wishlistItems.length : 0;
  const totalQty = hasMounted
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  // Mock search suggestions - replace with actual API call
  // const mockSuggestions = [
  //   "Áo thun nam",
  //   "Áo khoác nữ",
  //   "Giày sneaker",
  //   "Túi xách",
  //   "Quần jeans",
  //   "Váy midi",
  //   "Áo sơ mi",
  //   "Phụ kiện thời trang",
  // ];

  // // Auto-hide header on scroll down, show on scroll up
  // useEffect(() => {
  //   let lastScrollY = window.scrollY;

  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;

  //     if (currentScrollY > 100) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }

  //     if (currentScrollY > lastScrollY && currentScrollY > 200) {
  //       setHeaderAnimation("translate-y-[-100%]");
  //     } else {
  //       setHeaderAnimation("translate-y-0");
  //     }

  //     lastScrollY = currentScrollY;
  //   };

  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
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

  // Auto-search suggestions with debounce

  // Pulse animation for cart/wishlist updates
  useEffect(() => {
    if (hasMounted && totalQty > prevCartCount.current) {
      setCartPulse(true);
      setTimeout(() => setCartPulse(false), 600);
    }
    prevCartCount.current = totalQty;
  }, [totalQty, hasMounted]);

  useEffect(() => {
    if (hasMounted && wishlistCount > prevWishlistCount.current) {
      setWishlistPulse(true);
      setTimeout(() => setWishlistPulse(false), 600);
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
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showSearchSuggestions]);

  // Auto-save search history to localStorage
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

  // Show welcome notification for new users
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

  return (
    <div className="w-full bg-white">
      {/* Welcome Notification */}
      {showNotification && user && (
        <div className="fixed top-4 right-4 z-[100] transform transition-all duration-500 ease-out animate-slide-in-right">
          <div className="bg-[tomato] text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              👋
            </div>
            <div>
              <p className="font-semibold">Chào mừng {user.name}!</p>
              <p className="text-sm opacity-90">
                Khám phá những sản phẩm mới nhất
              </p>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Top Bar with enhanced animation */}
      <div className="overflow-hidden whitespace-nowrap bg-[tomato] text-white text-sm text-center py-2 font-semibold">
        <div className="inline-block animate-marquee hover:animation-pause">
          {language === "vi"
            ? "MÙA MỚI, PHONG CÁCH MỚI: ƯU ĐÃI THỜI TRANG KHÔNG THỂ BỎ LỠ — MIỄN PHÍ VẬN CHUYỂN VÀ TRẢ HÀNG"
            : "NEW SEASON, NEW STYLES: FASHION SALE YOU CAN'T MISS — FREE SHIPPING AND RETURNS"}
        </div>
      </div>

      {/* Header with smart animations */}
      <div
        className={`sticky top-0 z-50 bg-white shadow-md transition-all duration-300 ${headerAnimation} ${
          isScrolled ? "shadow-lg backdrop-blur-sm bg-white/95" : ""
        }`}
      >
        <header className="flex items-center justify-between px-6 lg:px-40 py-2 border-b bg-white">
          {/* Left: Language Selector with smooth transition */}
          <div className="flex-1">
            <div className="relative w-fit group">
              <select
                className="appearance-none bg-transparent pr-5 pl-3 py-1 text-sm outline-none cursor-pointer transition-all duration-200 group-hover:bg-gray-50 rounded-md"
                value={language}
                onChange={(e) => setLanguage(e.target.value as "vi" | "en")}
              >
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
              </select>
              <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-500 transition-transform group-hover:rotate-180" />
            </div>
          </div>

          {/* Center: Logo with hover effect */}
          <div className="flex-1 text-center">
            <Link href="/" className="inline-block group">
              <Image
                src="/img/dr2025.png"
                alt="DREAMS Logo"
                width={80}
                height={30}
                className="mx-auto object-contain transition-transform duration-300 group-hover:scale-110"
                priority
              />
            </Link>
          </div>

          {/* Right: Icons with enhanced interactions */}
          <div className="flex-1 flex justify-end gap-3 items-center text-lg">
            {/* Enhanced Search Input with suggestions */}
            <div className="relative search-container">
              <div className="relative group">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={
                    language === "vi" ? "Tìm sản phẩm..." : "Search products..."
                  }
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(keyword);
                    }
                  }}
                  className="pl-4 pr-10 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[tomato] focus:ring-2 focus:ring-orange-200 transition-all duration-300 w-48 focus:w-56"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[tomato] transition-colors" />
              </div>

              {/* Search Suggestions Dropdown */}
              {showSearchSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-fade-in">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors text-sm first:rounded-t-lg last:rounded-b-lg"
                    >
                      <Search className="inline w-3 h-3 mr-2 text-gray-400" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Image Search with enhanced styling */}
            <button
              onClick={() => setShowImageSearch(true)}
              className="p-2 rounded-full hover:bg-orange-50 hover:text-[tomato] transition-all duration-200 hover:scale-110"
              title="Tìm kiếm bằng hình ảnh"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* User with enhanced avatar */}
            {hasMounted && user ? (
              <button
                className="text-sm font-semibold hover:text-[tomato] flex items-center gap-1 group transition-all duration-200"
                onClick={() => router.push("/account")}
              >
                {user.avatar ? (
                  <Image
                    src={`http://127.0.0.1:8000/storage/${user.avatar}`}
                    width={80}
                    height={80}
                    alt="Avatar"
                    unoptimized
                    className="w-6 h-6 rounded-full object-cover border group-hover:border-[tomato] transition-all duration-200 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[tomato] to-red-500 text-white flex items-center justify-center text-xs font-bold uppercase group-hover:scale-110 transition-transform">
                    {user.name.charAt(0)}
                  </div>
                )}
              </button>
            ) : hasMounted ? (
              <Link
                href="/login"
                className="p-2 rounded-full hover:bg-orange-50 hover:text-[tomato] transition-all duration-200 hover:scale-110"
              >
                <User className="w-4 h-4" />
              </Link>
            ) : null}

            {/* Wishlist with pulse animation */}
            <button
              className={`cursor-pointer relative p-2 rounded-full hover:bg-orange-50 hover:text-[tomato] transition-all duration-200 hover:scale-110 ${
                wishlistPulse ? "animate-pulse-scale" : ""
              }`}
              onClick={() => setShowWishlistModal(true)}
              title="Danh sách yêu thích"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-gradient-to-r from-[tomato] to-red-500 text-white rounded-full px-1.5 py-0.5 font-semibold animate-bounce-subtle">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart with pulse animation */}
            <button
              className={`cursor-pointer relative p-2 rounded-full hover:bg-orange-50 hover:text-[tomato] transition-all duration-200 hover:scale-110 ${
                cartPulse ? "animate-pulse-scale" : ""
              }`}
              onClick={() => setShowCartModal(true)}
              title="Giỏ hàng"
            >
              <ShoppingCart className="w-4 h-4" />
              {totalQty > 0 && (
                <span className="absolute -top-1 -right-1 text-xs bg-gradient-to-r from-[tomato] to-red-500 text-white rounded-full px-1.5 py-0.5 font-semibold animate-bounce-subtle">
                  {totalQty}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Navigation with hover effects */}
        <nav className="sticky top-0 z-40 bg-white border-b py-4 flex justify-center gap-10 font-semibold text-sm shadow-sm">
          <button
            onClick={() => handleLinkClick("/")}
            className="relative hover:text-[tomato] transition-all duration-200 group"
          >
            {language === "vi" ? "Trang chủ" : "Home"}
            <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-[tomato] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
          </button>

          <button
            onClick={() => handleLinkClick("/products")}
            className="relative hover:text-[tomato] transition-all duration-200 group"
          >
            {language === "vi" ? "Cửa hàng" : "Shop"}
            <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-[tomato] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
          </button>

          <button
            onClick={() => handleLinkClick("/lucky")}
            className="relative hover:text-[tomato] transition-all duration-200 group"
          >
            {language === "vi" ? "Vòng quay may mắn" : "Lucky Wheel"}
            <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-[tomato] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
          </button>

          <button
            onClick={() => handleLinkClick("/blog")}
            className="relative hover:text-[tomato] transition-all duration-200 group"
          >
            {language === "vi" ? "Tin tức" : "News"}
            <span className="absolute inset-x-0 -bottom-2 h-0.5 bg-[tomato] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
          </button>
        </nav>
      </div>

      {/* Enhanced Loading bar */}
      {loading && (
        <div className="relative h-1 w-full overflow-hidden bg-gray-200">
          <div className="absolute inset-0 w-full">
            <div className="h-full w-1/3 bg-gradient-to-r from-[tomato] via-red-500 to-orange-500 animate-loading-shimmer" />
          </div>
        </div>
      )}

      {/* Modals */}
      {showCartModal && <CartModal onClose={() => setShowCartModal(false)} />}
      {showWishlistModal && (
        <WishlistModal onClose={() => setShowWishlistModal(false)} />
      )}

      {/* Enhanced Image Search Modal */}
      {showImageSearch && (
        <div className="fixed inset-0 z-50 flex justify-end items-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative h-full md:h-[90vh] w-full sm:w-[90vw] md:max-w-[600px] overflow-y-auto bg-white/95 dark:bg-[#1e1e1e]/95 shadow-2xl rounded-l-3xl p-8 animate-slide-in-right transition-all duration-300 ease-in-out backdrop-blur-md">
            <button
              onClick={() => setShowImageSearch(false)}
              className="absolute top-5 right-5 rounded-full bg-white dark:bg-[#2c2c2c] p-2 shadow-md hover:shadow-lg hover:text-red-500 text-gray-600 dark:text-gray-300 hover:scale-110 transition-all duration-200 hover:rotate-90"
              aria-label="Đóng modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white tracking-tight">
                Tìm kiếm hình ảnh thông minh
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Tải ảnh lên để tìm các sản phẩm tương tự qua trí tuệ nhân tạo.
              </p>
            </div>

            <div className="space-y-4">
              <ImageSearch />
            </div>
          </div>
        </div>
      )}

      {/* Add custom CSS styles */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes pulse-scale {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        @keyframes loading-shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }

        .animate-marquee {
          animation: marquee 20s linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }

        .animate-pulse-scale {
          animation: pulse-scale 0.6s ease-in-out;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-loading-shimmer {
          animation: loading-shimmer 1.5s ease-in-out infinite;
        }

        .animation-pause:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
