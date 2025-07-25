"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { FaSpinner, FaFilter } from "react-icons/fa";
import ProductCard from "../components/ui/ProductCard";
import BreadcrumbFilter from "../components/ui/Sort";
import HeaderHome from "../components/ui/Header";
import Footer from "../components/ui/Footer";

type Product = {
  id: number;
   slug: string;
  name: string;
  description: string;
  status: string;
  img: {
    id: number;
    product_id: number;
    name: string;
    color?: string;
  }[];
  variant: {
    id: number;
    product_id: number;
    img_id: number;
    size: string;
    color?: string;
    price: number;
    sale_price: string | null;
    stock_quantity: number;
    status: string;
  }[];
  category: {
    id: number;
    name: string;
  };
};


const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// Custom debounce function
const debounce = <T extends (...args: Parameters<T>) => void>(func: T, wait: number) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
};

const SearchPage = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || searchParams.get("query") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter states
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number>(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Cache for API results
  const cache = new Map<string, Product[]>();

  // Debounced filter setters
  const debouncedSetPriceRange = useCallback(
    debounce((value: number) => setPriceRange(value), 300),
    []
  );
  const debouncedSetSelectedSize = useCallback(
    debounce((value: string | null) => setSelectedSize(value), 300),
    []
  );
  const debouncedSetSelectedCategoryId = useCallback(
    debounce((value: number | null) => setSelectedCategoryId(value), 300),
    []
  );

  useEffect(() => {
    const fetchProducts = async (pageNum: number) => {
      if (!keyword || !hasMore) return;
      setLoading(true);

      const cacheKey = `${keyword}-${selectedSize}-${priceRange}-${sortDirection}-${selectedCategoryId}-${pageNum}`;
      if (cache.has(cacheKey)) {
        setProducts((prev) => (pageNum === 1 ? cache.get(cacheKey)! : [...prev, ...cache.get(cacheKey)!]));
        setLoading(false);
        return;
      }

      try {
        const params = new URLSearchParams({
          search: keyword,
          page: pageNum.toString(),
        });
        if (selectedSize) params.append("size", selectedSize);
        if (priceRange > 0) {
          params.append("min", "0");
          params.append("max", priceRange.toString());
        }
        if (sortDirection) params.append("sort", sortDirection);
        if (selectedCategoryId) params.append("category_id", selectedCategoryId.toString());

        const res = await axios.get(`${API_BASE}/api/search?${params.toString()}`);
        const result = res.data?.data;

        if (Array.isArray(result)) {
          setProducts((prev) => (pageNum === 1 ? result : [...prev, ...result]));
          cache.set(cacheKey, result);
          setHasMore(result.length > 0);
          setError("");
        } else {
          throw new Error("Kết quả không hợp lệ");
        }
      } catch (err) {
        console.error(err);
        setError("Không tìm thấy sản phẩm hoặc lỗi server.");
        if (pageNum === 1) setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(page);
  }, [keyword, selectedSize, priceRange, sortDirection, selectedCategoryId, page, cache, hasMore]);

  useEffect(() => {
    const currentLoadMoreRef = loadMoreRef.current;
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (currentLoadMoreRef) {
      observerRef.current.observe(currentLoadMoreRef);
    }

    return () => {
      if (currentLoadMoreRef && observerRef.current) {
        observerRef.current.unobserve(currentLoadMoreRef);
      }
    };
  }, [hasMore, loading]);

  const handleClearFilters = () => {
    setSelectedSize(null);
    setPriceRange(0);
    setSelectedCategoryId(null);
    setSortDirection("asc");
    setPage(1);
  };

  const renderSkeleton = () => {
    const skeletonCount = window.innerWidth >= 1024 ? 8 : window.innerWidth >= 768 ? 6 : 4;

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl p-4 shadow-sm opacity-0 animate-fadeIn"
          >
            <div className="h-40 bg-gray-200 dark:bg-zinc-700 rounded mb-4" />
            <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <HeaderHome />
      <section aria-label="Bộ lọc tìm kiếm" className="md:sticky md:top-0 z-10 bg-white dark:bg-zinc-900 py-4">
        <div className="md:hidden flex justify-between items-center px-6 mb-4">
          <h2 className="text-xl font-bold dark:text-white">
            Kết quả tìm kiếm: <span className="text-orange-500">{keyword}</span>
          </h2>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="text-orange-500 flex items-center gap-2"
            aria-label={isFilterOpen ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
          >
            <FaFilter /> Bộ lọc
          </button>
        </div>
        <div
          className={`md:block transition-all duration-300 ${isFilterOpen ? "max-h-screen" : "max-h-0 overflow-hidden"}`}
        >
          <BreadcrumbFilter
            onSortChange={setSortDirection}
            onSizeChange={debouncedSetSelectedSize}
            onPriceChange={debouncedSetPriceRange}
            onCategoryChange={debouncedSetSelectedCategoryId}
            currentSize={selectedSize}
            currentPrice={priceRange}
            currentCategory={selectedCategoryId}
          />
        </div>
        <div className="flex gap-2 mt-2 px-6 md:px-20 lg:px-40">
          {selectedSize && (
            <span className="bg-orange-100 dark:bg-orange-700 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full text-sm flex items-center">
              Kích cỡ: {selectedSize}
              <button
                onClick={() => debouncedSetSelectedSize(null)}
                className="ml-2 text-orange-600 dark:text-orange-400"
                aria-label={`Xóa bộ lọc kích cỡ ${selectedSize}`}
              >
                ✕
              </button>
            </span>
          )}
          {priceRange > 0 && (
            <span className="bg-orange-100 dark:bg-orange-700 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full text-sm flex items-center">
              Giá: 0 - {priceRange.toLocaleString()} VNĐ
              <button
                onClick={() => debouncedSetPriceRange(0)}
                className="ml-2 text-orange-600 dark:text-orange-400"
                aria-label="Xóa bộ lọc giá"
              >
                ✕
              </button>
            </span>
          )}
          {selectedCategoryId && (
            <span className="bg-orange-100 dark:bg-orange-700 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full text-sm flex items-center">
              Danh mục: {selectedCategoryId}
              <button
                onClick={() => debouncedSetSelectedCategoryId(null)}
                className="ml-2 text-orange-600 dark:text-orange-400"
                aria-label={`Xóa bộ lọc danh mục ${selectedCategoryId}`}
              >
                ✕
              </button>
            </span>
          )}
        </div>
      </section>

      <section
        aria-label={`Kết quả tìm kiếm cho ${keyword}`}
        className="px-6 md:px-20 lg:px-40 py-6 min-h-[70vh]"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl md:text-3xl font-bold dark:text-white hidden md:block">
            Kết quả tìm kiếm cho: <span className="text-orange-500">{keyword}</span>
          </h2>
          {(selectedSize || priceRange > 0 || selectedCategoryId || sortDirection !== "asc") && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              aria-label="Xóa tất cả bộ lọc"
            >
              Xóa tất cả bộ lọc
            </button>
          )}
        </div>

        {!loading && !error && (
          <p className="text-gray-600 dark:text-zinc-400 mb-6 text-sm">
            {products.length} sản phẩm được tìm thấy
          </p>
        )}

        {loading && page === 1 && (
          <div className="flex justify-center items-center py-10">
            <FaSpinner className="animate-spin text-3xl text-orange-500" />
            <span className="ml-2 text-gray-600 dark:text-zinc-400">
              Đang tìm kiếm sản phẩm...
            </span>
          </div>
        )}

        {loading && page === 1 && renderSkeleton()}

        {error && (
          <div className="text-center py-16 text-red-500 font-semibold text-lg">
            {error}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-lg">
            Không có sản phẩm nào phù hợp với từ khóa bạn đã nhập.{" "}
            <span className="block mt-2">
              Hãy thử các từ khóa khác như{" "}
              <span className="text-orange-500 cursor-pointer hover:underline">áo thun</span> hoặc{" "}
              <span className="text-orange-500 cursor-pointer hover:underline">quần jeans</span>.
            </span>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id || product.slug} product={product} keyword={keyword} />
            ))}
          </div>
        )}

        {hasMore && (
          <div ref={loadMoreRef} className="flex justify-center py-10">
            <FaSpinner className="animate-spin text-3xl text-orange-500" />
          </div>
        )}
        {!hasMore && products.length > 0 && (
          <p className="text-center py-10 text-gray-500 dark:text-gray-400">
            Đã tải tất cả sản phẩm.
          </p>
        )}
      </section>
      <Footer />
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out forwards;
        }
      `}</style>
    </>
  );
};

export default SearchPage;