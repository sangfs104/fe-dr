// // "use client";

// // import { useState, useEffect } from "react";
// // import ProductCard from "../components/ui/ProductList";
// // import BreadcrumbFilter from "../components/ui/Sort";

// // // Custom hook để debounce
// // function useDebounce<T>(value: T, delay: number): T {
// //   const [debouncedValue, setDebouncedValue] = useState(value);

// //   useEffect(() => {
// //     const handler = setTimeout(() => setDebouncedValue(value), delay);
// //     return () => clearTimeout(handler);
// //   }, [value, delay]);

// //   return debouncedValue;
// // }

// // export default function ProductPage() {
// //   const [products, setProducts] = useState([]);
// //   const [sortDirection, setSortDirection] = useState<string>("asc");
// //   const [selectedSize, setSelectedSize] = useState<string | null>(null);
// //   const [priceRange, setPriceRange] = useState<number>(0);
// //   const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
// //     null
// //   );
// //   const [loading, setLoading] = useState<boolean>(false);
// //   const [error, setError] = useState<string | null>(null);

// //   const debouncedSort = useDebounce(sortDirection, 300);
// //   const debouncedSize = useDebounce(selectedSize, 300);
// //   const debouncedPrice = useDebounce(priceRange, 300);
// //   const debouncedCategory = useDebounce(selectedCategoryId, 300);

// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       setLoading(true);
// //       setError(null);

// //       try {
// //         let url = "";
// //         const params = new URLSearchParams();

// //         // Nếu có danh mục thì gọi API lọc theo danh mục
// //         if (debouncedCategory) {
// //           params.append("category_id", debouncedCategory.toString());
// //           url = `http://127.0.0.1:8000/api/products-by-category?${params.toString()}`;
// //         } else {
// //           if (debouncedSize) params.append("size", debouncedSize);
// //           if (debouncedPrice > 0) {
// //             params.append("min", "0");
// //             params.append("max", debouncedPrice.toString());
// //           }
// //           if (debouncedSort) params.append("sort", debouncedSort);
// //           url = `http://127.0.0.1:8000/api/products/filter-all?${params.toString()}`;
// //         }

// //         const res = await fetch(url);
// //         const json = await res.json();

// //         const productList = Array.isArray(json?.data)
// //           ? json.data
// //           : Array.isArray(json?.data?.data)
// //           ? json.data.data
// //           : [];

// //         if (json.status === 200) {
// //           setProducts(productList);
// //         } else {
// //           setError("Không lấy được sản phẩm từ máy chủ.");
// //           setProducts([]);
// //         }
// //       } catch {
// //         setError("Đã xảy ra lỗi kết nối đến máy chủ.");
// //         setProducts([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProducts();
// //   }, [debouncedSort, debouncedSize, debouncedPrice, debouncedCategory]);

// //   return (
// //     <>
// //       <BreadcrumbFilter
// //         onSortChange={setSortDirection}
// //         onSizeChange={setSelectedSize}
// //         onPriceChange={setPriceRange}
// //         onCategoryChange={setSelectedCategoryId} // ✅ Gửi selectedCategoryId từ BreadcrumbFilter
// //         currentSize={selectedSize}
// //         currentPrice={priceRange}
// //         currentCategory={selectedCategoryId}
// //       />

// //       <div className="px-6 md:px-20 lg:px-40 py-6">
// //         {loading && (
// //           <div className="text-center py-4 text-blue-500 font-medium">
// //             Đang tải sản phẩm...
// //           </div>
// //         )}
// //         {error && (
// //           <div className="text-center py-4 text-red-500 font-medium">
// //             {error}
// //           </div>
// //         )}
// //         {!loading && !error && products.length === 0 && (
// //           <div className="text-center py-10 text-gray-500">
// //             Không có sản phẩm phù hợp.
// //           </div>
// //         )}
// //         {!loading && !error && products.length > 0 && (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
// //             {products.map((product) => (
// //               <ProductCard key={product.id || product.slug} product={product} />
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import ProductCard from "../components/ui/ProductList";
// import BreadcrumbFilter from "../components/ui/Sort";

// // Custom hook để debounce
// function useDebounce<T>(value: T, delay: number): T {
//   const [debouncedValue, setDebouncedValue] = useState<T>(value);

//   useEffect(() => {
//     const handler = setTimeout(() => setDebouncedValue(value), delay);
//     return () => clearTimeout(handler);
//   }, [value, delay]);

//   return debouncedValue;
// }

// export default function ProductPage() {
//   const [products, setProducts] = useState<any[]>([]);
//   const [sortDirection, setSortDirection] = useState<string>("asc");
//   const [selectedSize, setSelectedSize] = useState<string | null>(null);
//   const [priceRange, setPriceRange] = useState<number>(0);
//   const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
//     null
//   );
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const debouncedSort = useDebounce(sortDirection, 300);
//   const debouncedSize = useDebounce(selectedSize, 300);
//   const debouncedPrice = useDebounce(priceRange, 300);
//   const debouncedCategory = useDebounce(selectedCategoryId, 300);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         let url = "";
//         const params = new URLSearchParams();

//         // Nếu có danh mục thì gọi API lọc theo danh mục
//         if (debouncedCategory) {
//           params.append("category_id", debouncedCategory.toString());
//           url = `http://127.0.0.1:8000/api/products-by-category?${params.toString()}`;
//         } else {
//           if (debouncedSize) params.append("size", debouncedSize);
//           if (debouncedPrice > 0) {
//             params.append("min", "0");
//             params.append("max", debouncedPrice.toString());
//           }
//           if (debouncedSort) params.append("sort", debouncedSort);
//           url = `http://127.0.0.1:8000/api/products/filter-all?${params.toString()}`;
//         }

//         const res = await fetch(url);
//         const json = await res.json();

//         const productList = Array.isArray(json?.data)
//           ? json.data
//           : Array.isArray(json?.data?.data)
//           ? json.data.data
//           : [];

//         if (json.status === 200) {
//           setProducts(productList);
//         } else {
//           setError("Không lấy được sản phẩm từ máy chủ.");
//           setProducts([]);
//         }
//       } catch {
//         setError("Đã xảy ra lỗi kết nối đến máy chủ.");
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [debouncedSort, debouncedSize, debouncedPrice, debouncedCategory]);

//   return (
//     <div className="max-w-7xl mx-auto">
//       <BreadcrumbFilter
//         onSortChange={setSortDirection}
//         onSizeChange={setSelectedSize}
//         onPriceChange={setPriceRange}
//         onCategoryChange={setSelectedCategoryId}
//         currentSize={selectedSize}
//         currentPrice={priceRange}
//         currentCategory={selectedCategoryId}
//       />

//       <div className="px-6 md:px-20 lg:px-40 py-6">
//         {loading && (
//           <div className="text-center py-4 text-blue-500 font-medium">
//             Đang tải sản phẩm...
//           </div>
//         )}
//         {error && (
//           <div className="text-center py-4 text-red-500 font-medium">
//             {error}
//           </div>
//         )}
//         {!loading && !error && products.length === 0 && (
//           <div className="text-center py-10 text-gray-500">
//             Không có sản phẩm phù hợp.
//           </div>
//         )}
//         {!loading && !error && products.length > 0 && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map((product) => (
//               <ProductCard key={product.id || product.slug} product={product} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import ProductCard from "../components/ui/ProductList";
import BreadcrumbFilter from "../components/ui/Sort";

// Define interfaces locally to match search/page.tsx
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  images: string[];
  variant: ProductVariant[];
  category_id: number;
  category: { id: number; name: string };
  hot?: boolean;
  slug?: string;
}

// Interface for raw API response data
interface RawProduct {
  id: number;
  name: string;
  description?: string;
  status?: string;
  img?: ProductImage[];
  images?: string[];
  variant?: ProductVariant[];
  category_id?: number;
  category?: { id: number; name: string };
  hot?: boolean;
  slug?: string;
}

// Custom hook để debounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]); // Replace any[] with Product[]
  const [sortDirection, setSortDirection] = useState<string>("asc");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number>(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSort = useDebounce(sortDirection, 300);
  const debouncedSize = useDebounce(selectedSize, 300);
  const debouncedPrice = useDebounce(priceRange, 300);
  const debouncedCategory = useDebounce(selectedCategoryId, 300);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = "";
        const params = new URLSearchParams();

        // Nếu có danh mục thì gọi API lọc theo danh mục
        if (debouncedCategory) {
          params.append("category_id", debouncedCategory.toString());
          url = `http://127.0.0.1:8000/api/products-by-category?${params.toString()}`;
        } else {
          if (debouncedSize) params.append("size", debouncedSize);
          if (debouncedPrice > 0) {
            params.append("min", "0");
            params.append("max", debouncedPrice.toString());
          }
          if (debouncedSort) params.append("sort", debouncedSort);
          url = `http://127.0.0.1:8000/api/products/filter-all?${params.toString()}`;
        }

        const res = await fetch(url);
        const json = await res.json();

        const productList = Array.isArray(json?.data)
          ? json.data
          : Array.isArray(json?.data?.data)
          ? json.data.data
          : [];

        if (json.status === 200) {
          // Sanitize API data to match Product interface
          const sanitizedProducts: Product[] = productList.map(
            (item: RawProduct) => ({
              id: item.id,
              name: item.name,
              description: item.description || "",
              status: item.status || "",
              img: Array.isArray(item.img) ? item.img : [],
              images: Array.isArray(item.images)
                ? item.images
                : Array.isArray(item.img)
                ? item.img.map(
                    (img: ProductImage) =>
                      `http://127.0.0.1:8000/img/${img.name}`
                  )
                : [],
              variant: Array.isArray(item.variant) ? item.variant : [],
              category_id: item.category_id || 0,
              category: item.category || { id: 0, name: "" },
              hot: item.hot || false,
              slug: item.slug || undefined,
            })
          );
          setProducts(sanitizedProducts);
        } else {
          setError("Không lấy được sản phẩm từ máy chủ.");
          setProducts([]);
        }
      } catch {
        setError("Đã xảy ra lỗi kết nối đến máy chủ.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSort, debouncedSize, debouncedPrice, debouncedCategory]);

  return (
    <div className="">
      <BreadcrumbFilter
        onSortChange={setSortDirection}
        onSizeChange={setSelectedSize}
        onPriceChange={setPriceRange}
        onCategoryChange={setSelectedCategoryId}
        currentSize={selectedSize}
        currentPrice={priceRange}
        currentCategory={selectedCategoryId}
      />

      <div className="px-6 md:px-20 lg:px-40 py-6">
        {loading && (
          <div className="text-center py-4 text-blue-500 font-medium">
            Đang tải sản phẩm...
          </div>
        )}
        {error && (
          <div className="text-center py-4 text-red-500 font-medium">
            {error}
          </div>
        )}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            Không có sản phẩm phù hợp.
          </div>
        )}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
