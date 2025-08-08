// "use client";

// import { useState, useEffect } from "react";
// import ProductCard from "../components/ui/ProductList";
// import BreadcrumbFilter from "../components/ui/Sort";

// // Custom hook để debounce
// function useDebounce<T>(value: T, delay: number): T {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => setDebouncedValue(value), delay);
//     return () => clearTimeout(handler);
//   }, [value, delay]);

//   return debouncedValue;
// }

// export default function ProductPage() {
//   const [products, setProducts] = useState([]);
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
//     <>
//       <BreadcrumbFilter
//         onSortChange={setSortDirection}
//         onSizeChange={setSelectedSize}
//         onPriceChange={setPriceRange}
//         onCategoryChange={setSelectedCategoryId} // ✅ Gửi selectedCategoryId từ BreadcrumbFilter
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
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import ProductCard from "../components/ui/ProductList";
import BreadcrumbFilter from "../components/ui/Sort";

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
  const [products, setProducts] = useState<any[]>([]);
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
          setProducts(productList);
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
    <div className="max-w-7xl mx-auto">
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
