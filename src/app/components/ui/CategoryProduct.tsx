// // // import { Shirt, ShoppingBag, Tags, Package, MoveDiagonal } from "lucide-react";
// // // import ProductCard from "./ProductList";
// // // import Image from "next/image";
// // // import Link from "next/link";

// // // const getCategoryIcon = (name: string) => {
// // //   const lower = name?.toLowerCase() || "";

// // //   if (lower.includes("bomber") || lower.includes("áo khoác"))
// // //     return <Shirt size={48} strokeWidth={1.5} />;
// // //   if (lower.includes("áo thun")) return <Shirt size={48} strokeWidth={1.5} />;
// // //   if (lower.includes("quần")) return <Package size={48} strokeWidth={1.5} />;
// // //   if (lower.includes("hoodie"))
// // //     return <MoveDiagonal size={48} strokeWidth={1.5} />;
// // //   if (lower.includes("túi") || lower.includes("bag"))
// // //     return <ShoppingBag size={48} strokeWidth={1.5} />;

// // //   return <Tags size={48} strokeWidth={1.5} />;
// // // };

// // // export default async function CategoryProduct() {
// // //   const [catRes, prodRes] = await Promise.all([
// // //     fetch("http://127.0.0.1:8000/category", { cache: "no-store" }),
// // //     fetch("http://127.0.0.1:8000/api/product", { cache: "no-store" }),
// // //   ]);

// // //   const catJson = await catRes.json();
// // //   const prodJson = await prodRes.json();

// // //   const categories = Array.isArray(catJson.data)
// // //     ? catJson.data.filter((c) => c.status === 1)
// // //     : [];

// // //   const products = Array.isArray(prodJson.data)
// // //     ? prodJson.data
// // //     : Array.isArray(prodJson.data?.data)
// // //     ? prodJson.data.data
// // //     : [];

// // //   return (
// // //     // <div className="px-4 sm:px-10 md:px-20 lg:px-40 py-10 bg-white">
// // //     // <div className="px-4 sm:px-10 md:px-20 lg:px-40 py-12 bg-white mt-4">
// // //     <div className="px-4 sm:px-10 md:px-20 lg:px-40 py-12 bg-white mt-4">
// // //       <div className="flex flex-col lg:flex-row gap-10">
// // //         {/* Bên trái: danh mục */}
// // //         <div className="w-full lg:w-1/4">
// // //           <div className="mb-4 relative">
// // //             <h2 className="text-white bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] px-4 py-2 text-lg font-bold uppercase inline-block">
// // //               DANH MỤC
// // //             </h2>
// // //             <div className="h-[2px] bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] w-1/2 mt-1"></div>
// // //           </div>

// // //           <div className="grid grid-cols-2 gap-4">
// // //             {categories.slice(0, 6).map((category) => (
// // //               <div
// // //                 key={category.id}
// // //                 className="border rounded-md shadow-sm p-4 flex flex-col items-center hover:shadow-lg transition duration-200 bg-white"
// // //               >
// // //                 <div className="w-24 h-24 mb-3 overflow-hidden flex items-center justify-center">
// // //                   {category.image_url ? (
// // //                     <Image
// // //                       width={96}
// // //                       height={96}
// // //                       src={`/img/${category.image_url}`}
// // //                       alt={category.name}
// // //                       className="object-contain w-full h-full"
// // //                     />
// // //                   ) : (
// // //                     <div className="w-12 h-12">
// // //                       {getCategoryIcon(category.name)}
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //                 <h3 className="text-sm font-semibold text-black text-center uppercase">
// // //                   {category.name}
// // //                 </h3>
// // //               </div>
// // //             ))}
// // //           </div>

// // //           <div className="mb-4 mt-6">
// // //             <video
// // //               src="img/video1.mp4"
// // //               autoPlay
// // //               muted
// // //               loop
// // //               playsInline
// // //               className="w-full h-auto rounded-md object-cover"
// // //             />
// // //           </div>
// // //         </div>

// // //         {/* Bên phải: sản phẩm */}
// // //         <div className="w-full lg:w-3/4">
// // //           <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
// // //             <div>
// // //               <h2 className="text-white bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] px-4 py-2 text-lg font-bold uppercase inline-block">
// // //                 SẢN PHẨM
// // //               </h2>
// // //               <div className="h-[2px] bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] w-1/2 mt-1"></div>
// // //             </div>

// // //             {products.length > 6 && (
// // //               <Link
// // //                 href="/products"
// // //                 className="text-black font-semibold hover:underline inline-flex items-center gap-1 text-sm"
// // //               >
// // //                 Xem thêm
// // //                 <svg
// // //                   className="w-4 h-4"
// // //                   fill="none"
// // //                   stroke="currentColor"
// // //                   strokeWidth="2"
// // //                   viewBox="0 0 24 24"
// // //                 >
// // //                   <path
// // //                     strokeLinecap="round"
// // //                     strokeLinejoin="round"
// // //                     d="M9 5l7 7-7 7"
// // //                   />
// // //                 </svg>
// // //               </Link>
// // //             )}
// // //           </div>

// // //           {products.length > 0 ? (
// // //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 -gap-y-4 -mt-10">
// // //               {products.slice(0, 6).map((product) => (
// // //                 <ProductCard key={product.id} product={product} />
// // //               ))}
// // //             </div>
// // //           ) : (
// // //             <div className="text-center py-10 text-gray-500">
// // //               Không có sản phẩm nào.
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

"use client";

import {
  Shirt,
  ShoppingBag,
  Tags,
  Package,
  MoveDiagonal,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import ProductCard from "./ProductList";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const getCategoryIcon = (name: string) => {
  const lower = name?.toLowerCase() || "";

  if (lower.includes("bomber") || lower.includes("áo khoác"))
    return <Shirt size={48} strokeWidth={1.5} />;
  if (lower.includes("áo thun")) return <Shirt size={48} strokeWidth={1.5} />;
  if (lower.includes("quần")) return <Package size={48} strokeWidth={1.5} />;
  if (lower.includes("hoodie"))
    return <MoveDiagonal size={48} strokeWidth={1.5} />;
  if (lower.includes("túi") || lower.includes("bag"))
    return <ShoppingBag size={48} strokeWidth={1.5} />;

  return <Tags size={48} strokeWidth={1.5} />;
};

interface Category {
  id: number;
  name: string;
  image_url?: string;
  status: number;
}

interface Product {
  id: number;
  name: string;
  price?: string;
  [key: string]: any;
}

interface CategoryProductProps {
  initialCategories?: Category[];
  initialProducts?: Product[];
}

export default function CategoryProduct({
  initialCategories = [],
  initialProducts = [],
}: CategoryProductProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(!initialCategories.length);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (initialCategories.length && initialProducts.length) {
        setIsVisible(true);
        return;
      }

      try {
        const [catRes, prodRes] = await Promise.all([
          fetch("http://127.0.0.1:8000/category", { cache: "no-store" }),
          fetch("http://127.0.0.1:8000/api/product", { cache: "no-store" }),
        ]);

        const catJson = await catRes.json();
        const prodJson = await prodRes.json();

        const fetchedCategories = Array.isArray(catJson.data)
          ? catJson.data.filter((c: Category) => c.status === 1)
          : [];

        const fetchedProducts = Array.isArray(prodJson.data)
          ? prodJson.data
          : Array.isArray(prodJson.data?.data)
          ? prodJson.data.data
          : [];

        setCategories(fetchedCategories);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        setIsVisible(true);
      }
    };

    fetchData();
  }, [initialCategories, initialProducts]);

  const SectionTitle = ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle?: string;
  }) => (
    <div className="relative mb-8 group">
      <div className="flex items-center gap-3">
        <div className="relative">
          <h2 className="text-white bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] px-6 py-3 text-xl font-bold uppercase inline-block rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105">
            {title}
          </h2>
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] rounded-lg blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
        </div>
        <Sparkles className="w-6 h-6 text-[#FF7043] animate-pulse" />
      </div>
      <div className="h-1 bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] w-32 mt-2 rounded-full transform origin-left transition-all duration-500 group-hover:scale-x-150"></div>
      {subtitle && (
        <p className="text-gray-600 mt-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {subtitle}
        </p>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="px-4 sm:px-10 md:px-20 lg:px-40 py-12 bg-gradient-to-br from-gray-50 via-white to-orange-50 mt-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#FF7043] border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-[#FF8A50] rounded-full animate-spin animation-delay-75"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 mt-4 transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-5 animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-red-200 to-orange-200 rounded-full opacity-5 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative px-4 sm:px-10 md:px-20 lg:px-40 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Categories Section */}
          <div
            className={`w-full lg:w-1/4 transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <SectionTitle
              title="DANH MỤC"
              subtitle="Khám phá bộ sưu tập đa dạng của chúng tôi"
            />

            <div className="grid grid-cols-2 gap-6">
              {categories.slice(0, 6).map((category, index) => (
                <div
                  key={category.id}
                  className={`group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 p-6 flex flex-col items-center cursor-pointer transform hover:-translate-y-3 hover:scale-105 overflow-hidden border border-gray-100 ${
                    activeCategory === category.id
                      ? "ring-2 ring-[#FF7043] scale-105"
                      : ""
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: isVisible
                      ? "slideInUp 0.6s ease-out forwards"
                      : "none",
                  }}
                  onMouseEnter={() => setActiveCategory(category.id)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  <div className="absolute inset-[1px] rounded-xl bg-white"></div>

                  <div className="relative z-10 w-full">
                    <div className="w-24 h-24 mb-3 mx-auto overflow-hidden flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100 rounded-full group-hover:from-orange-200 group-hover:to-red-200 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6">
                      {category.image_url ? (
                        <Image
                          width={96}
                          height={96}
                          src={`/img/${category.image_url}`}
                          alt={category.name}
                          className="object-contain w-full h-full rounded-full transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="text-[#FF7043] group-hover:text-[#FF5722] transition-colors duration-300 transform group-hover:scale-110">
                          {getCategoryIcon(category.name)}
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-gray-800 text-center uppercase tracking-wide group-hover:text-[#FF7043] transition-colors duration-300">
                      {category.name}
                    </h3>
                  </div>

                  {/* Hover effect particles */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-2 h-2 bg-[#FF7043] rounded-full animate-ping"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Video Section */}
            <div
              className={`mt-8 relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-1000 hover:scale-105 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ animationDelay: "0.8s" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF8A50] to-[#FF5722] opacity-20"></div>
              <video
                src="img/video1.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto rounded-2xl object-cover relative z-10 transition-transform duration-500 hover:scale-105"
                style={{
                  filter: "brightness(1.1) contrast(1.1)",
                }}
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Products Section */}
          <div
            className={`w-full lg:w-3/4 transform transition-all duration-1000 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
            style={{ animationDelay: "0.3s" }}
          >
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <SectionTitle
                title="SẢN PHẨM"
                subtitle="Những sản phẩm hot nhất hiện tại"
              />

              {products.length > 6 && (
                <Link
                  href="/products"
                  className="group relative bg-white text-gray-800 font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border border-gray-200 hover:border-[#FF7043] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF8A50] to-[#FF5722] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                    Xem thêm
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>
              )}
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.slice(0, 6).map((product, index) => (
                  <div
                    key={product.id}
                    className="transform transition-all duration-500 hover:-translate-y-2"
                    style={{
                      animationDelay: `${0.5 + index * 0.1}s`,
                      animation: isVisible
                        ? "slideInUp 0.6s ease-out forwards"
                        : "none",
                    }}
                  >
                    <div className="group relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg"></div>
                      <div className="relative">
                        <ProductCard product={product} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center animate-pulse">
                  <Package className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-gray-500 text-lg font-medium">
                  Không có sản phẩm nào.
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Vui lòng quay lại sau!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animation-delay-75 {
          animation-delay: 0.075s;
        }
      `}</style>
    </div>
  );
}

// Server Component wrapper for backward compatibility
export async function CategoryProductServer() {
  let categories: Category[] = [];
  let products: Product[] = [];

  try {
    const [catRes, prodRes] = await Promise.all([
      fetch("http://127.0.0.1:8000/category", { cache: "no-store" }),
      fetch("http://127.0.0.1:8000/api/product", { cache: "no-store" }),
    ]);

    const catJson = await catRes.json();
    const prodJson = await prodRes.json();

    categories = Array.isArray(catJson.data)
      ? catJson.data.filter((c: Category) => c.status === 1)
      : [];

    products = Array.isArray(prodJson.data)
      ? prodJson.data
      : Array.isArray(prodJson.data?.data)
      ? prodJson.data.data
      : [];
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <CategoryProduct
      initialCategories={categories}
      initialProducts={products}
    />
  );
}

// "use client";

// import {
//   Shirt,
//   ShoppingBag,
//   Tags,
//   Package,
//   MoveDiagonal,
//   ArrowRight,
//   Sparkles,
//   Star,
//   Heart,
//   Eye,
//   TrendingUp,
// } from "lucide-react";
// import ProductCard from "./ProductList";
// import Image from "next/image";
// import Link from "next/link";
// import { useState, useEffect } from "react";

// const getCategoryIcon = (name: string) => {
//   const lower = name?.toLowerCase() || "";

//   if (lower.includes("bomber") || lower.includes("áo khoác"))
//     return <Shirt size={48} strokeWidth={1.5} />;
//   if (lower.includes("áo thun")) return <Shirt size={48} strokeWidth={1.5} />;
//   if (lower.includes("quần")) return <Package size={48} strokeWidth={1.5} />;
//   if (lower.includes("hoodie"))
//     return <MoveDiagonal size={48} strokeWidth={1.5} />;
//   if (lower.includes("túi") || lower.includes("bag"))
//     return <ShoppingBag size={48} strokeWidth={1.5} />;

//   return <Tags size={48} strokeWidth={1.5} />;
// };

// interface Category {
//   id: number;
//   name: string;
//   image_url?: string;
//   status: number;
// }

// interface Product {
//   id: number;
//   name: string;
//   price?: string;
//   [key: string]: any;
// }

// interface CategoryProductProps {
//   initialCategories?: Category[];
//   initialProducts?: Product[];
// }

// export default function CategoryProduct({
//   initialCategories = [],
//   initialProducts = [],
// }: CategoryProductProps) {
//   const [categories, setCategories] = useState<Category[]>(initialCategories);
//   const [products, setProducts] = useState<Product[]>(initialProducts);
//   const [loading, setLoading] = useState(!initialCategories.length);
//   const [activeCategory, setActiveCategory] = useState<number | null>(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (initialCategories.length && initialProducts.length) {
//         setIsVisible(true);
//         return;
//       }

//       try {
//         const [catRes, prodRes] = await Promise.all([
//           fetch("http://127.0.0.1:8000/category", { cache: "no-store" }),
//           fetch("http://127.0.0.1:8000/api/product", { cache: "no-store" }),
//         ]);

//         const catJson = await catRes.json();
//         const prodJson = await prodRes.json();

//         const fetchedCategories = Array.isArray(catJson.data)
//           ? catJson.data.filter((c: Category) => c.status === 1)
//           : [];

//         const fetchedProducts = Array.isArray(prodJson.data)
//           ? prodJson.data
//           : Array.isArray(prodJson.data?.data)
//           ? prodJson.data.data
//           : [];

//         setCategories(fetchedCategories);
//         setProducts(fetchedProducts);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//         setIsVisible(true);
//       }
//     };

//     fetchData();
//   }, [initialCategories, initialProducts]);

//   const SectionTitle = ({
//     title,
//     subtitle,
//     icon,
//   }: {
//     title: string;
//     subtitle?: string;
//     icon?: React.ReactNode;
//   }) => (
//     <div className="relative mb-12 group">
//       <div className="flex items-center gap-4 mb-4">
//         <div className="relative">
//           {/* Glowing background effect */}
//           <div className="absolute -inset-3 bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500 animate-pulse"></div>

//           {/* Main title */}
//           <h2 className="relative text-white bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] px-8 py-4 text-2xl font-black uppercase inline-block rounded-xl shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:-rotate-1">
//             <span className="relative z-10 flex items-center gap-3">
//               {icon}
//               {title}
//             </span>
//             {/* Shimmer effect */}
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"></div>
//           </h2>
//         </div>

//         {/* Floating decorative elements */}
//         <div className="flex gap-2">
//           <div
//             className="w-3 h-3 bg-[#FF8A50] rounded-full animate-bounce"
//             style={{ animationDelay: "0s" }}
//           ></div>
//           <div
//             className="w-3 h-3 bg-[#FF7043] rounded-full animate-bounce"
//             style={{ animationDelay: "0.1s" }}
//           ></div>
//           <div
//             className="w-3 h-3 bg-[#FF5722] rounded-full animate-bounce"
//             style={{ animationDelay: "0.2s" }}
//           ></div>
//         </div>
//       </div>

//       {/* Enhanced underline with gradient */}
//       <div className="relative">
//         <div className="h-2 bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] w-40 rounded-full transform origin-left transition-all duration-700 group-hover:scale-x-150 group-hover:rotate-1"></div>
//         <div className="absolute inset-0 h-2 bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] w-40 rounded-full blur-sm opacity-50"></div>
//       </div>

//       {subtitle && (
//         <p className="text-gray-600 mt-4 text-base font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
//           {subtitle}
//         </p>
//       )}
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 mt-4 flex items-center justify-center">
//         <div className="relative">
//           {/* Outer rotating ring */}
//           <div className="w-32 h-32 border-4 border-transparent border-t-[#FF8A50] border-r-[#FF7043] rounded-full animate-spin"></div>
//           {/* Inner rotating ring */}
//           <div className="absolute inset-4 w-24 h-24 border-4 border-transparent border-t-[#FF7043] border-r-[#FF5722] rounded-full animate-spin-reverse"></div>
//           {/* Center pulsing dot */}
//           <div className="absolute inset-1/2 w-4 h-4 -ml-2 -mt-2 bg-gradient-to-r from-[#FF8A50] to-[#FF5722] rounded-full animate-pulse"></div>

//           {/* Loading text */}
//           <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
//             <p className="text-white font-semibold animate-pulse">
//               Đang tải...
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`min-h-screen relative overflow-hidden transition-all duration-1500 ${
//         isVisible ? "opacity-100" : "opacity-0"
//       }`}
//     >
//       {/* Dynamic gradient background */}
//       <div
//         className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-all duration-1000"
//         style={{
//           background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 138, 80, 0.1) 0%, rgba(255, 112, 67, 0.05) 25%, rgba(255, 87, 34, 0.02) 50%, transparent 100%), linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)`,
//         }}
//       ></div>

//       {/* Animated mesh background */}
//       <div className="absolute inset-0">
//         <div className="absolute top-0 left-0 w-full h-full opacity-10">
//           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-400 to-red-500 rounded-full filter blur-3xl animate-float"></div>
//           <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full filter blur-3xl animate-float-delayed"></div>
//           <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full filter blur-3xl animate-float-slow"></div>
//         </div>
//       </div>

//       {/* Particles */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-twinkle"
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 3}s`,
//               animationDuration: `${2 + Math.random() * 3}s`,
//             }}
//           ></div>
//         ))}
//       </div>

//       <div className="relative z-10 px-4 sm:px-10 md:px-20 lg:px-40 py-16">
//         <div className="flex flex-col lg:flex-row gap-16">
//           {/* Categories Section */}
//           <div
//             className={`w-full lg:w-1/3 transform transition-all duration-1500 ${
//               isVisible
//                 ? "translate-x-0 opacity-100"
//                 : "-translate-x-20 opacity-0"
//             }`}
//           >
//             <SectionTitle
//               title="DANH MỤC"
//               subtitle="Khám phá thế giới thời trang đa sắc màu"
//               icon={<Tags className="w-7 h-7" />}
//             />

//             <div className="grid grid-cols-2 gap-8">
//               {categories.slice(0, 6).map((category, index) => (
//                 <div
//                   key={category.id}
//                   className={`group relative cursor-pointer transform transition-all duration-700 hover:scale-110 ${
//                     activeCategory === category.id ? "scale-105" : ""
//                   }`}
//                   style={{
//                     animationDelay: `${index * 0.15}s`,
//                     animation: isVisible
//                       ? "slideInUp 0.8s ease-out forwards"
//                       : "none",
//                   }}
//                   onMouseEnter={() => setActiveCategory(category.id)}
//                   onMouseLeave={() => setActiveCategory(null)}
//                 >
//                   {/* Glass morphism card */}
//                   <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 overflow-hidden shadow-2xl">
//                     {/* Gradient overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//                     {/* Animated border */}
//                     <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] opacity-0 group-hover:opacity-100 transition-all duration-500 p-[2px]">
//                       <div className="w-full h-full bg-white/10 backdrop-blur-xl rounded-3xl"></div>
//                     </div>

//                     <div className="relative z-10">
//                       {/* Icon container */}
//                       <div className="w-28 h-28 mb-6 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-lg border border-white/30 group-hover:from-orange-200/30 group-hover:to-red-200/30 transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110">
//                         {category.image_url ? (
//                           <div className="relative overflow-hidden rounded-full w-full h-full">
//                             <Image
//                               width={112}
//                               height={112}
//                               src={`/img/${category.image_url}`}
//                               alt={category.name}
//                               className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-125"
//                             />
//                             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                           </div>
//                         ) : (
//                           <div className="text-white group-hover:text-[#FF8A50] transition-all duration-300 transform group-hover:scale-125">
//                             {getCategoryIcon(category.name)}
//                           </div>
//                         )}
//                       </div>

//                       {/* Category name */}
//                       <h3 className="text-base font-bold text-white text-center uppercase tracking-wider group-hover:text-[#FF8A50] transition-all duration-300 transform group-hover:scale-105">
//                         {category.name}
//                       </h3>
//                     </div>

//                     {/* Floating particles on hover */}
//                     <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
//                       <div className="flex gap-1">
//                         <div className="w-2 h-2 bg-[#FF8A50] rounded-full animate-ping"></div>
//                         <div
//                           className="w-2 h-2 bg-[#FF7043] rounded-full animate-ping"
//                           style={{ animationDelay: "0.2s" }}
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Enhanced Video Section */}
//             <div
//               className={`mt-12 relative group transform transition-all duration-1500 ${
//                 isVisible
//                   ? "translate-y-0 opacity-100"
//                   : "translate-y-20 opacity-0"
//               }`}
//               style={{ animationDelay: "1s" }}
//             >
//               <div className="relative overflow-hidden rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 p-2">
//                 {/* Glowing frame */}
//                 <div className="absolute -inset-2 bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] rounded-3xl opacity-0 group-hover:opacity-50 blur-xl transition-all duration-700"></div>

//                 <div className="relative overflow-hidden rounded-2xl">
//                   <video
//                     src="img/video1.mp4"
//                     autoPlay
//                     muted
//                     loop
//                     playsInline
//                     className="w-full h-auto relative z-10 transition-all duration-700 group-hover:scale-105"
//                   />

//                   {/* Video overlay effects */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//                   {/* Play button overlay */}
//                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
//                     <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/30 transform scale-0 group-hover:scale-100 transition-transform duration-500">
//                       <Eye className="w-8 h-8 text-white" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Products Section */}
//           <div
//             className={`w-full lg:w-2/3 transform transition-all duration-1500 ${
//               isVisible
//                 ? "translate-x-0 opacity-100"
//                 : "translate-x-20 opacity-0"
//             }`}
//             style={{ animationDelay: "0.5s" }}
//           >
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-12">
//               <SectionTitle
//                 title="SẢN PHẨM"
//                 subtitle="Bộ sưu tập độc quyền & xu hướng mới nhất"
//                 icon={<TrendingUp className="w-7 h-7" />}
//               />

//               {products.length > 6 && (
//                 <Link
//                   href="/products"
//                   className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-[#FF8A50] to-[#FF5722] text-white font-bold rounded-full shadow-2xl hover:shadow-[#FF7043]/50 transition-all duration-500 transform hover:scale-110 hover:-rotate-1"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-[#FF5722] to-[#FF8A50] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   <span className="relative z-10 flex items-center gap-3">
//                     <Sparkles className="w-5 h-5 animate-spin" />
//                     Xem thêm
//                     <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
//                   </span>

//                   {/* Shimmer effect */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shimmer"></div>
//                 </Link>
//               )}
//             </div>

//             {products.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {products.slice(0, 6).map((product, index) => (
//                   <div
//                     key={product.id}
//                     className="group relative transform transition-all duration-700 hover:scale-105 hover:-rotate-1"
//                     style={{
//                       animationDelay: `${0.8 + index * 0.15}s`,
//                       animation: isVisible
//                         ? "slideInUp 0.8s ease-out forwards"
//                         : "none",
//                     }}
//                     onMouseEnter={() => setHoveredProduct(product.id)}
//                     onMouseLeave={() => setHoveredProduct(null)}
//                   >
//                     {/* Glowing background */}
//                     <div className="absolute -inset-4 bg-gradient-to-r from-[#FF8A50]/20 via-[#FF7043]/20 to-[#FF5722]/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

//                     {/* Glass morphism product card */}
//                     <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
//                       <div className="relative">
//                         <ProductCard product={product} />

//                         {/* Hover overlay with icons */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
//                           <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
//                             <div className="flex gap-2">
//                               <button className="w-10 h-10 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/30 hover:bg-red-500 transition-colors duration-300">
//                                 <Heart className="w-5 h-5 text-white" />
//                               </button>
//                               <button className="w-10 h-10 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/30 hover:bg-blue-500 transition-colors duration-300">
//                                 <Eye className="w-5 h-5 text-white" />
//                               </button>
//                             </div>
//                             <div className="flex items-center gap-1 text-white text-sm">
//                               <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                               <span>4.8</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-32">
//                 <div className="relative w-32 h-32 mx-auto mb-8">
//                   <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-full backdrop-blur-lg border border-white/20"></div>
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <Package className="w-16 h-16 text-white/60 animate-pulse" />
//                   </div>
//                 </div>
//                 <h3 className="text-white text-2xl font-bold mb-4">
//                   Không có sản phẩm nào
//                 </h3>
//                 <p className="text-white/60 text-lg">
//                   Vui lòng quay lại sau để khám phá những sản phẩm mới!
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes slideInUp {
//           from {
//             opacity: 0;
//             transform: translateY(60px) scale(0.8);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }

//         @keyframes shimmer {
//           0% {
//             transform: translateX(-100%) skewX(-12deg);
//           }
//           100% {
//             transform: translateX(200%) skewX(-12deg);
//           }
//         }

//         @keyframes float {
//           0%,
//           100% {
//             transform: translateY(0px) rotate(0deg);
//           }
//           50% {
//             transform: translateY(-20px) rotate(5deg);
//           }
//         }

//         @keyframes float-delayed {
//           0%,
//           100% {
//             transform: translateY(0px) rotate(0deg);
//           }
//           50% {
//             transform: translateY(-15px) rotate(-3deg);
//           }
//         }

//         @keyframes float-slow {
//           0%,
//           100% {
//             transform: translateY(0px) rotate(0deg);
//           }
//           50% {
//             transform: translateY(-10px) rotate(2deg);
//           }
//         }

//         @keyframes twinkle {
//           0%,
//           100% {
//             opacity: 0.3;
//             transform: scale(1);
//           }
//           50% {
//             opacity: 1;
//             transform: scale(1.5);
//           }
//         }

//         @keyframes spin-reverse {
//           from {
//             transform: rotate(360deg);
//           }
//           to {
//             transform: rotate(0deg);
//           }
//         }

//         .animate-shimmer {
//           animation: shimmer 2s infinite;
//         }

//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }

//         .animate-float-delayed {
//           animation: float-delayed 8s ease-in-out infinite;
//           animation-delay: 2s;
//         }

//         .animate-float-slow {
//           animation: float-slow 10s ease-in-out infinite;
//           animation-delay: 4s;
//         }

//         .animate-twinkle {
//           animation: twinkle 3s ease-in-out infinite;
//         }

//         .animate-spin-reverse {
//           animation: spin-reverse 1s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// }

// // Server Component wrapper for backward compatibility
// export async function CategoryProductServer() {
//   let categories: Category[] = [];
//   let products: Product[] = [];

//   try {
//     const [catRes, prodRes] = await Promise.all([
//       fetch("http://127.0.0.1:8000/category", { cache: "no-store" }),
//       fetch("http://127.0.0.1:8000/api/product", { cache: "no-store" }),
//     ]);

//     const catJson = await catRes.json();
//     const prodJson = await prodRes.json();

//     categories = Array.isArray(catJson.data)
//       ? catJson.data.filter((c: Category) => c.status === 1)
//       : [];

//     products = Array.isArray(prodJson.data)
//       ? prodJson.data
//       : Array.isArray(prodJson.data?.data)
//       ? prodJson.data.data
//       : [];
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }

//   return (
//     <CategoryProduct
//       initialCategories={categories}
//       initialProducts={products}
//     />
//   );
// }
