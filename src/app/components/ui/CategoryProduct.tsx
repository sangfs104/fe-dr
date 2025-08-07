// // // // import { Shirt, ShoppingBag, Tags, Package, MoveDiagonal } from "lucide-react";
// // // // import ProductCard from "./ProductList";
// // // // import Image from "next/image";
// // // // import Link from "next/link";

// // // // const getCategoryIcon = (name: string) => {
// // // //   const lower = name?.toLowerCase() || "";

// // // //   if (lower.includes("bomber") || lower.includes("áo khoác"))
// // // //     return <Shirt size={48} strokeWidth={1.5} />;
// // // //   if (lower.includes("áo thun")) return <Shirt size={48} strokeWidth={1.5} />;
// // // //   if (lower.includes("quần")) return <Package size={48} strokeWidth={1.5} />;
// // // //   if (lower.includes("hoodie"))
// // // //     return <MoveDiagonal size={48} strokeWidth={1.5} />;
// // // //   if (lower.includes("túi") || lower.includes("bag"))
// // // //     return <ShoppingBag size={48} strokeWidth={1.5} />;

// // // //   return <Tags size={48} strokeWidth={1.5} />;
// // // // };

// // // // export default async function CategoryProduct() {
// // // //   const [catRes, prodRes] = await Promise.all([
// // // //     fetch("http://127.0.0.1:8000/category", { cache: "no-store" }),
// // // //     fetch("http://127.0.0.1:8000/api/product", { cache: "no-store" }),
// // // //   ]);

// // // //   const catJson = await catRes.json();
// // // //   const prodJson = await prodRes.json();

// // // //   const categories = Array.isArray(catJson.data)
// // // //     ? catJson.data.filter((c) => c.status === 1)
// // // //     : [];

// // // //   const products = Array.isArray(prodJson.data)
// // // //     ? prodJson.data
// // // //     : Array.isArray(prodJson.data?.data)
// // // //     ? prodJson.data.data
// // // //     : [];

// // // //   return (
// // // //     // <div className="px-4 sm:px-10 md:px-20 lg:px-40 py-10 bg-white">
// // // //     // <div className="px-4 sm:px-10 md:px-20 lg:px-40 py-12 bg-white mt-4">
// // // //     <div className="px-4 sm:px-10 md:px-20 lg:px-40 py-12 bg-white mt-4">
// // // //       <div className="flex flex-col lg:flex-row gap-10">
// // // //         {/* Bên trái: danh mục */}
// // // //         <div className="w-full lg:w-1/4">
// // // //           <div className="mb-4 relative">
// // // //             <h2 className="text-white bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] px-4 py-2 text-lg font-bold uppercase inline-block">
// // // //               DANH MỤC
// // // //             </h2>
// // // //             <div className="h-[2px] bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] w-1/2 mt-1"></div>
// // // //           </div>

// // // //           <div className="grid grid-cols-2 gap-4">
// // // //             {categories.slice(0, 6).map((category) => (
// // // //               <div
// // // //                 key={category.id}
// // // //                 className="border rounded-md shadow-sm p-4 flex flex-col items-center hover:shadow-lg transition duration-200 bg-white"
// // // //               >
// // // //                 <div className="w-24 h-24 mb-3 overflow-hidden flex items-center justify-center">
// // // //                   {category.image_url ? (
// // // //                     <Image
// // // //                       width={96}
// // // //                       height={96}
// // // //                       src={`/img/${category.image_url}`}
// // // //                       alt={category.name}
// // // //                       className="object-contain w-full h-full"
// // // //                     />
// // // //                   ) : (
// // // //                     <div className="w-12 h-12">
// // // //                       {getCategoryIcon(category.name)}
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
// // // //                 <h3 className="text-sm font-semibold text-black text-center uppercase">
// // // //                   {category.name}
// // // //                 </h3>
// // // //               </div>
// // // //             ))}
// // // //           </div>

// // // //           <div className="mb-4 mt-6">
// // // //             <video
// // // //               src="img/video1.mp4"
// // // //               autoPlay
// // // //               muted
// // // //               loop
// // // //               playsInline
// // // //               className="w-full h-auto rounded-md object-cover"
// // // //             />
// // // //           </div>
// // // //         </div>

// //         {/* Bên phải: sản phẩm */}
// //         <div className="w-full lg:w-3/4">
// //           <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
// //             <div>
// //               <h2 className="text-white bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] px-4 py-2 text-lg font-bold uppercase inline-block">
// //                 SẢN PHẨM
// //               </h2>
// //               <div className="h-[2px] bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] w-1/2 mt-1"></div>
// //             </div>

// //             {products.length > 6 && (
// //               <Link
// //                 href="/products"
// //                 className="text-black font-semibold hover:underline inline-flex items-center gap-1 text-sm"
// //               >
// //                 Xem thêm
// //                 <svg
// //                   className="w-4 h-4"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   strokeWidth="2"
// //                   viewBox="0 0 24 24"
// //                 >
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     d="M9 5l7 7-7 7"
// //                   />
// //                 </svg>
// //               </Link>
// //             )}
// //           </div>

// //           {products.length > 0 ? (
// //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 -gap-y-4 -mt-10">
// //               {products.slice(0, 6).map((product) => (
// //                 <ProductCard key={product.id} product={product} />
// //               ))}
// //             </div>
// //           ) : (
// //             <div className="text-center py-10 text-gray-500">
// //               Không có sản phẩm nào.
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import {
//   Shirt,
//   ShoppingBag,
//   Tags,
//   Package,
//   MoveDiagonal,
//   ArrowRight,
//   Sparkles,
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
//   }: {
//     title: string;
//     subtitle?: string;
//   }) => (
//     <div className="relative mb-8 group">
//       <div className="flex items-center gap-3">
//         <div className="relative">
//           <h2 className="text-white bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] px-6 py-3 text-xl font-bold uppercase inline-block rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-105">
//             {title}
//           </h2>
//           <div className="absolute -inset-1 bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] rounded-lg blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
//         </div>
//         <Sparkles className="w-6 h-6 text-[#FF7043] animate-pulse" />
//       </div>
//       <div className="h-1 bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] w-32 mt-2 rounded-full transform origin-left transition-all duration-500 group-hover:scale-x-150"></div>
//       {subtitle && (
//         <p className="text-gray-600 mt-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           {subtitle}
//         </p>
//       )}
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="px-4 sm:px-10 md:px-20 lg:px-40 py-12 bg-gradient-to-br from-gray-50 via-white to-orange-50 mt-4">
//         <div className="flex items-center justify-center min-h-[400px]">
//           <div className="relative">
//             <div className="w-16 h-16 border-4 border-[#FF7043] border-t-transparent rounded-full animate-spin"></div>
//             <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-[#FF8A50] rounded-full animate-spin animation-delay-75"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 mt-4 transition-all duration-1000 ${
//         isVisible ? "opacity-100" : "opacity-0"
//       }`}
//     >
//       {/* Floating background elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-5 animate-pulse"></div>
//         <div
//           className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-red-200 to-orange-200 rounded-full opacity-5 animate-pulse"
//           style={{ animationDelay: "1s" }}
//         ></div>
//       </div>

//       <div className="relative px-4 sm:px-10 md:px-20 lg:px-40 py-12">
//         <div className="flex flex-col lg:flex-row gap-10">
//           {/* Categories Section */}
//           <div
//             className={`w-full lg:w-1/4 transform transition-all duration-1000 ${
//               isVisible
//                 ? "translate-x-0 opacity-100"
//                 : "-translate-x-10 opacity-0"
//             }`}
//           >
//             <SectionTitle
//               title="DANH MỤC"
//               subtitle="Khám phá bộ sưu tập đa dạng của chúng tôi"
//             />

//             <div className="grid grid-cols-2 gap-6">
//               {categories.slice(0, 6).map((category, index) => (
//                 <div
//                   key={category.id}
//                   className={`group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 p-6 flex flex-col items-center cursor-pointer transform hover:-translate-y-3 hover:scale-105 overflow-hidden border border-gray-100 ${
//                     activeCategory === category.id
//                       ? "ring-2 ring-[#FF7043] scale-105"
//                       : ""
//                   }`}
//                   style={{
//                     animationDelay: `${index * 0.1}s`,
//                     animation: isVisible
//                       ? "slideInUp 0.6s ease-out forwards"
//                       : "none",
//                   }}
//                   onMouseEnter={() => setActiveCategory(category.id)}
//                   onMouseLeave={() => setActiveCategory(null)}
//                 >
//                   {/* Background gradient overlay */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//                   {/* Animated border */}
//                   <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
//                   <div className="absolute inset-[1px] rounded-xl bg-white"></div>

//                   <div className="relative z-10 w-full">
//                     <div className="w-24 h-24 mb-3 mx-auto overflow-hidden flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100 rounded-full group-hover:from-orange-200 group-hover:to-red-200 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-6">
//                       {category.image_url ? (
//                         <Image
//                           width={96}
//                           height={96}
//                           src={`/img/${category.image_url}`}
//                           alt={category.name}
//                           className="object-contain w-full h-full rounded-full transition-transform duration-300 group-hover:scale-110"
//                         />
//                       ) : (
//                         <div className="text-[#FF7043] group-hover:text-[#FF5722] transition-colors duration-300 transform group-hover:scale-110">
//                           {getCategoryIcon(category.name)}
//                         </div>
//                       )}
//                     </div>
//                     <h3 className="text-sm font-bold text-gray-800 text-center uppercase tracking-wide group-hover:text-[#FF7043] transition-colors duration-300">
//                       {category.name}
//                     </h3>
//                   </div>

//                   {/* Hover effect particles */}
//                   <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                     <div className="w-2 h-2 bg-[#FF7043] rounded-full animate-ping"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Enhanced Video Section */}
//             <div
//               className={`mt-8 relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-1000 hover:scale-105 ${
//                 isVisible
//                   ? "translate-y-0 opacity-100"
//                   : "translate-y-10 opacity-0"
//               }`}
//               style={{ animationDelay: "0.8s" }}
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-[#FF8A50] to-[#FF5722] opacity-20"></div>
//               <video
//                 src="img/video1.mp4"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 className="w-full h-auto rounded-2xl object-cover relative z-10 transition-transform duration-500 hover:scale-105"
//                 style={{
//                   filter: "brightness(1.1) contrast(1.1)",
//                 }}
//               />
//               <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
//             </div>
//           </div>
//           <div className="w-full lg:w-3/4">
//             <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//               <SectionTitle
//                 title="SẢN PHẨM"
//                 subtitle="Những sản phẩm hot nhất hiện tại"
//               />
//               {products.length > 6 && (
//                 <Link
//                   href="/products"
//                   className="text-black font-semibold hover:underline inline-flex items-center gap-1 text-sm"
//                 >
//                   Xem thêm
//                   <svg
//                     className="w-4 h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M9 5l7 7-7 7"
//                     />
//                   </svg>
//                 </Link>
//               )}
//             </div>

//             {products.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 -gap-y-4 -mt-10">
//                 {products.slice(0, 6).map((product) => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-10 text-gray-500">
//                 Không có sản phẩm nào.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes slideInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animation-delay-75 {
//           animation-delay: 0.075s;
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
"use client";

import {
  Shirt,
  ShoppingBag,
  Tags,
  Package,
  MoveDiagonal,
  Sparkles,
} from "lucide-react";
import ProductCard from "./ProductList";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { Product } from "@/app/types/Product";

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
          <div className="w-full lg:w-3/4">
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <SectionTitle
                title="SẢN PHẨM"
                subtitle="Những sản phẩm hot nhất hiện tại"
              />
              {products.length > 6 && (
                <Link
                  href="/products"
                  className="text-black font-semibold hover:underline inline-flex items-center gap-1 text-sm"
                >
                  Xem thêm
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              )}
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 -gap-y-4 -mt-10">
                {products.slice(0, 6).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                Không có sản phẩm nào.
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