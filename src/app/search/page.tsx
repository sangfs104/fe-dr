// // "use client";

// // import { useEffect, useState, useCallback, useRef } from "react";
// // import { useSearchParams } from "next/navigation";
// // import axios from "axios";
// // import { FaSpinner } from "react-icons/fa";
// // import ProductCard from "../components/ui/ProductCard";
// // import HeaderHome from "../components/ui/Header";
// // import Footer from "../components/ui/Footer";
// // import ProductModal from "../components/ui/ProductModal";

// // type Product = {
// //   id: number;
// //   name: string;
// //   description: string;
// //   slug?: string;
// //   img: { name: string }[];
// //   images: string[]; // Thêm trường images
// //   variant?: Record<string, unknown>;
// // };

// // const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// // const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
// //   let timeout: NodeJS.Timeout | null = null;
// //   return (...args: Parameters<T>) => {
// //     if (timeout) clearTimeout(timeout);
// //     timeout = setTimeout(() => func(...args), wait);
// //   };
// // };

// // const SearchPage = () => {
// //   const searchParams = useSearchParams();
// //   const keyword = searchParams.get("keyword") || searchParams.get("query") || "";

// //   const [products, setProducts] = useState<Product[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [skeletonCount, setSkeletonCount] = useState(4);
// //   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

// //   const cache = useRef<Map<string, Product[]>>(new Map());

// //   useEffect(() => {
// //     const updateSkeletonCount = () => {
// //       if (typeof window !== "undefined") {
// //         setSkeletonCount(window.innerWidth >= 1024 ? 8 : window.innerWidth >= 768 ? 6 : 4);
// //       }
// //     };
// //     updateSkeletonCount();
// //     window.addEventListener("resize", updateSkeletonCount);
// //     return () => window.removeEventListener("resize", updateSkeletonCount);
// //   }, []);

// //   const fetchProducts = useCallback(async () => {
// //     if (!keyword) return;

// //     setLoading(true);
// //     const cacheKey = `${keyword}`;

// //     if (cache.current.has(cacheKey)) {
// //       setProducts(cache.current.get(cacheKey)!);
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       const res = await axios.get(`${API_BASE}/api/search?${new URLSearchParams({ search: keyword })}`);
// //       const { status, data, message } = res.data;
// //       console.log("SearchPage API response:", data); // Debug dữ liệu gốc
// //       if (status === 200 && Array.isArray(data)) {
// //         const sanitizedData = data.map((item: Product) => ({
// //           ...item,
// //           img: Array.isArray(item.img) ? item.img : [],
// //           variant: Array.isArray(item.variant) ? item.variant : [],
// //           images: Array.isArray(item.img)
// //             ? item.img.map(img => `${API_BASE}/img/${img.name}`)
// //             : [],
// //         }));
// //         console.log("Sanitized data:", sanitizedData); // Debug dữ liệu sau xử lý
// //         cache.current.set(cacheKey, sanitizedData);
// //         setProducts(sanitizedData);
// //         setError("");
// //       } else {
// //         setProducts([]);
// //         setError(message || "Không tìm thấy sản phẩm nào phù hợp.");
// //       }
// //     } catch (err: any) {
// //       console.error("Fetch error:", err);
// //       if (err.response && err.response.data) {
// //         const { message } = err.response.data;
// //         setError(message || "Không tìm thấy sản phẩm.");
// //       } else {
// //         setError("Lỗi kết nối đến server.");
// //       }
// //       setProducts([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [keyword]);

// //   const debouncedFetchProducts = useCallback(debounce(fetchProducts, 300), [fetchProducts]);

// //   useEffect(() => {
// //     cache.current.clear();
// //     debouncedFetchProducts();
// //   }, [debouncedFetchProducts, keyword]);

// //   const renderSkeleton = () => (
// //     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //       {Array.from({ length: skeletonCount }).map((_, index) => (
// //         <div
// //           key={index}
// //           className="animate-pulse bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl p-4 shadow-sm opacity-0 animate-fadeIn"
// //         >
// //           <div className="h-40 bg-gray-200 dark:bg-zinc-700 rounded mb-4" />
// //           <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-3/4 mb-2" />
// //           <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-1/2" />
// //         </div>
// //       ))}
// //     </div>
// //   );

// //   return (
// //     <>
// //       <HeaderHome />
// //       <section className="md:sticky md:top-0 z-10 bg-white dark:bg-zinc-900 py-4">
// //         <div className="md:hidden flex justify-between items-center px-6 mb-4">
// //           <h2 className="text-xl font-bold dark:text-white">
// //             Kết quả tìm kiếm: <span className="text-orange-500">{keyword}</span>
// //           </h2>
// //         </div>
// //       </section>

// //       <section className="px-6 md:px-20 lg:px-40 py-6 min-h-[70vh]">
// //         <div className="flex justify-between items-center mb-4">
// //           <h2 className="text-3xl font-bold dark:text-white hidden md:block">
// //             Kết quả tìm kiếm cho: <span className="text-orange-500">{keyword}</span>
// //           </h2>
// //         </div>

// //         {loading && (
// //           <>
// //             <div className="flex justify-center items-center py-4">
// //               <FaSpinner className="animate-spin text-2xl text-orange-500 mr-2" />
// //               <span className="text-gray-600 dark:text-zinc-400">Đang tìm kiếm sản phẩm...</span>
// //             </div>
// //             {renderSkeleton()}
// //           </>
// //         )}

// //         {error && (
// //           <div className="text-center py-16 text-red-500 font-semibold text-lg">{error}</div>
// //         )}

// //         {!loading && !error && products.length === 0 && (
// //           <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-lg">
// //             Không có sản phẩm nào phù hợp với từ khóa bạn đã nhập.
// //             <span className="block mt-2">
// //               Hãy thử các từ khóa khác như{" "}
// //               <span className="text-orange-500 cursor-pointer hover:underline">áo thun</span> hoặc{" "}
// //               <span className="text-orange-500 cursor-pointer hover:underline">quần jeans</span>.
// //             </span>
// //           </div>
// //         )}

// //         {!loading && !error && products.length > 0 && (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //             {products.map((product) => (
// //               <ProductCard
// //                 key={product.id || product.slug}
// //                 product={product}
// //                 keyword={keyword}
// //                 onClick={() => setSelectedProduct(product)}
// //               />
// //             ))}
// //           </div>
// //         )}
// //       </section>

// //       <Footer />

// //       {selectedProduct && (
// //         <ProductModal
// //           product={selectedProduct}
// //           onClose={() => setSelectedProduct(null)}
// //         />
// //       )}

// //       <style jsx>{`
// //         @keyframes fadeIn {
// //           from {
// //             opacity: 0;
// //           }
// //           to {
// //             opacity: 1;
// //           }
// //         }
// //         .animate-fadeIn {
// //           animation: fadeIn 0.5s ease-in-out forwards;
// //         }
// //       `}</style>
// //     </>
// //   );
// // };

// // export default SearchPage;
// "use client";

// import { useEffect, useState, useCallback, useRef } from "react";
// import { useSearchParams } from "next/navigation";
// import axios from "axios";
// import { FaSpinner } from "react-icons/fa";
// import ProductCard from "../components/ui/ProductCard";
// import HeaderHome from "../components/ui/Header";
// import Footer from "../components/ui/Footer";
// import ProductModal from "../components/ui/ProductModal";

// type Product = {
//   id: number;
//   name: string;
//   description: string;
//   slug?: string;
//   img: { name: string }[];
//   images: string[];
//   variant?: Record<string, unknown>;
// };

// const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// const debounce = <T extends (...args: unknown[]) => void>(
//   func: T,
//   wait: number
// ) => {
//   let timeout: NodeJS.Timeout | null = null;
//   return (...args: Parameters<T>) => {
//     if (timeout) clearTimeout(timeout);
//     timeout = setTimeout(() => func(...args), wait);
//   };
// };

// const SearchPage = () => {
//   const searchParams = useSearchParams();
//   const keyword =
//     searchParams.get("keyword") || searchParams.get("query") || "";

//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [skeletonCount, setSkeletonCount] = useState(4);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

//   const cache = useRef<Map<string, Product[]>>(new Map());

//   useEffect(() => {
//     const updateSkeletonCount = () => {
//       if (typeof window !== "undefined") {
//         setSkeletonCount(
//           window.innerWidth >= 1024 ? 8 : window.innerWidth >= 768 ? 6 : 4
//         );
//       }
//     };
//     updateSkeletonCount();
//     window.addEventListener("resize", updateSkeletonCount);
//     return () => window.removeEventListener("resize", updateSkeletonCount);
//   }, []);

//   const fetchProducts = useCallback(async () => {
//     if (!keyword) return;

//     setLoading(true);
//     const cacheKey = `${keyword}`;

//     if (cache.current.has(cacheKey)) {
//       setProducts(cache.current.get(cacheKey)!);
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await axios.get(
//         `${API_BASE}/api/search?${new URLSearchParams({ search: keyword })}`
//       );
//       const { status, data, message } = res.data;

//       if (status === 200 && Array.isArray(data)) {
//         const sanitizedData = data.map((item: Product) => ({
//           ...item,
//           img: Array.isArray(item.img) ? item.img : [],
//           variant: Array.isArray(item.variant) ? item.variant : [],
//           images: Array.isArray(item.img)
//             ? item.img.map((img) => `${API_BASE}/img/${img.name}`)
//             : [],
//         }));
//         cache.current.set(cacheKey, sanitizedData);
//         setProducts(sanitizedData);
//         setError("");
//       } else {
//         setProducts([]);
//         setError(message || "Không tìm thấy sản phẩm nào phù hợp.");
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       if (axios.isAxiosError(err)) {
//         const { message } = err.response?.data || {};
//         setError(message || "Không tìm thấy sản phẩm.");
//       } else {
//         setError("Lỗi kết nối đến server.");
//       }
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   }, [keyword]);

//   const debouncedFetchProducts = useCallback(() => {
//     const handler = debounce(fetchProducts, 300);
//     handler();
//   }, [fetchProducts]);

//   useEffect(() => {
//     cache.current.clear();
//     debouncedFetchProducts();
//   }, [debouncedFetchProducts, keyword]);

//   const renderSkeleton = () => (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {Array.from({ length: skeletonCount }).map((_, index) => (
//         <div
//           key={index}
//           className="animate-pulse bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl p-4 shadow-sm opacity-0 animate-fadeIn"
//         >
//           <div className="h-40 bg-gray-200 dark:bg-zinc-700 rounded mb-4" />
//           <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-3/4 mb-2" />
//           <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-1/2" />
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <>
//       <HeaderHome />
//       <section className="md:sticky md:top-0 z-10 bg-white dark:bg-zinc-900 py-4">
//         <div className="md:hidden flex justify-between items-center px-6 mb-4">
//           <h2 className="text-xl font-bold dark:text-white">
//             Kết quả tìm kiếm: <span className="text-orange-500">{keyword}</span>
//           </h2>
//         </div>
//       </section>

//       <section className="px-6 md:px-20 lg:px-40 py-6 min-h-[70vh]">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-3xl font-bold dark:text-white hidden md:block">
//             Kết quả tìm kiếm cho:{" "}
//             <span className="text-orange-500">{keyword}</span>
//           </h2>
//         </div>

//         {loading && (
//           <>
//             <div className="flex justify-center items-center py-4">
//               <FaSpinner className="animate-spin text-2xl text-orange-500 mr-2" />
//               <span className="text-gray-600 dark:text-zinc-400">
//                 Đang tìm kiếm sản phẩm...
//               </span>
//             </div>
//             {renderSkeleton()}
//           </>
//         )}

//         {error && (
//           <div className="text-center py-16 text-red-500 font-semibold text-lg">
//             {error}
//           </div>
//         )}

//         {!loading && !error && products.length === 0 && (
//           <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-lg">
//             Không có sản phẩm nào phù hợp với từ khóa bạn đã nhập.
//             <span className="block mt-2">
//               Hãy thử các từ khóa khác như{" "}
//               <span className="text-orange-500 cursor-pointer hover:underline">
//                 áo thun
//               </span>{" "}
//               hoặc{" "}
//               <span className="text-orange-500 cursor-pointer hover:underline">
//                 quần jeans
//               </span>
//               .
//             </span>
//           </div>
//         )}

//         {!loading && !error && products.length > 0 && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map((product) => (
//               <ProductCard
//                 key={product.id || product.slug}
//                 product={product}
//                 keyword={keyword}
//                 onClick={() => setSelectedProduct(product)}
//               />
//             ))}
//           </div>
//         )}
//       </section>

//       <Footer />

//       {selectedProduct && (
//         <ProductModal
//           product={selectedProduct}
//           onClose={() => setSelectedProduct(null)}
//         />
//       )}

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.5s ease-in-out forwards;
//         }
//       `}</style>
//     </>
//   );
// };

// export default SearchPage;

"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import ProductCard from "../components/ui/ProductCard";
import HeaderHome from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import ProductModal from "../components/ui/ProductModal";

// Use locally defined interfaces instead of importing from a potentially mismatched file
interface ProductImage {
  id: number;
  product_id: number;
  name: string;
  color?: string;
}

interface ProductVariant {
  id: number;
  product_id: number;
  img_id: number;
  size: string;
  color?: string;
  price: number;
  sale_price: string | null;
  stock_quantity: number;
  status: string;
}

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  status: string;
  img: ProductImage[];
  images: string[]; // Ensure images is string[], not undefined
  variant: ProductVariant[];
  category_id: number;
  category: { id: number; name: string }; // Required category
  hot?: boolean; // Optional hot
  slug?: string; // Added to match the usage in key prop
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const SearchPage = () => {
  const searchParams = useSearchParams();
  const keyword =
    searchParams.get("keyword") || searchParams.get("query") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [skeletonCount, setSkeletonCount] = useState(4);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const cache = useRef<Map<string, Product[]>>(new Map());

  useEffect(() => {
    const updateSkeletonCount = () => {
      if (typeof window !== "undefined") {
        setSkeletonCount(
          window.innerWidth >= 1024 ? 8 : window.innerWidth >= 768 ? 6 : 4
        );
      }
    };
    updateSkeletonCount();
    window.addEventListener("resize", updateSkeletonCount);
    return () => window.removeEventListener("resize", updateSkeletonCount);
  }, []);

  const fetchProducts = useCallback(async () => {
    if (!keyword) return;

    setLoading(true);
    const cacheKey = `${keyword}`;

    if (cache.current.has(cacheKey)) {
      setProducts(cache.current.get(cacheKey)!);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `${API_BASE}/api/search?${new URLSearchParams({ search: keyword })}`
      );
      const { status, data, message } = res.data;

      if (status === 200 && Array.isArray(data)) {
        const sanitizedData = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description || "",
          status: item.status || "",
          img: Array.isArray(item.img) ? item.img : [],
          images: Array.isArray(item.img)
            ? item.img.map((img: ProductImage) => `${API_BASE}/img/${img.name}`)
            : [],
          variant: Array.isArray(item.variant) ? item.variant : [],
          category_id: item.category_id || 0,
          category: item.category || { id: 0, name: "" },
          hot: item.hot || false,
          slug: item.slug || undefined, // Include slug with fallback
        }));
        cache.current.set(cacheKey, sanitizedData);
        setProducts(sanitizedData);
        setError("");
      } else {
        setProducts([]);
        setError(message || "Không tìm thấy sản phẩm nào phù hợp.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      if (axios.isAxiosError(err)) {
        const { message } = err.response?.data || {};
        setError(message || "Không tìm thấy sản phẩm.");
      } else {
        setError("Lỗi kết nối đến server.");
      }
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [keyword]);

  const debouncedFetchProducts = useCallback(() => {
    const handler = debounce(fetchProducts, 300);
    handler();
  }, [fetchProducts]);

  useEffect(() => {
    cache.current.clear();
    debouncedFetchProducts();
  }, [debouncedFetchProducts, keyword]);

  const renderSkeleton = () => (
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

  return (
    <>
      <HeaderHome />
      <section className="md:sticky md:top-0 z-10 bg-white dark:bg-zinc-900 py-4">
        <div className="md:hidden flex justify-between items-center px-6 mb-4">
          <h2 className="text-xl font-bold dark:text-white">
            Kết quả tìm kiếm: <span className="text-orange-500">{keyword}</span>
          </h2>
        </div>
      </section>

      <section className="px-6 md:px-20 lg:px-40 py-6 min-h-[70vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold dark:text-white hidden md:block">
            Kết quả tìm kiếm cho:{" "}
            <span className="text-orange-500">{keyword}</span>
          </h2>
        </div>

        {loading && (
          <>
            <div className="flex justify-center items-center py-4">
              <FaSpinner className="animate-spin text-2xl text-orange-500 mr-2" />
              <span className="text-gray-600 dark:text-zinc-400">
                Đang tìm kiếm sản phẩm...
              </span>
            </div>
            {renderSkeleton()}
          </>
        )}

        {error && (
          <div className="text-center py-16 text-red-500 font-semibold text-lg">
            {error}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400 text-lg">
            Không có sản phẩm nào phù hợp với từ khóa bạn đã nhập.
            <span className="block mt-2">
              Hãy thử các từ khóa khác như{" "}
              <span className="text-orange-500 cursor-pointer hover:underline">
                áo thun
              </span>{" "}
              hoặc{" "}
              <span className="text-orange-500 cursor-pointer hover:underline">
                quần jeans
              </span>
              .
            </span>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id || product.slug} // Safe now with slug included
                product={product}
                keyword={keyword}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

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
