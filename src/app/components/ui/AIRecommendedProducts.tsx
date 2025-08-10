// "use client";

// import useSWR from "swr";
// import axios from "axios";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import ProductCard from "./ProductList";
// import aiGif from "@/animations/sang.gif";

// interface ProductImage {
//   id: number;
//   product_id: number;
//   name: string;
//   color?: string;
// }

// interface ProductVariant {
//   id: number;
//   product_id: number;
//   img_id: number;
//   size: string;
//   color?: string;
//   price: number;
//   sale_price: string | null;
//   stock_quantity: number;
//   status: string;
// }

// interface Category {
//   id: number;
//   name: string;
//   image_url: string;
// }

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   status: string;
//   img: ProductImage[];
//   images?: string[];
//   variant: ProductVariant[];
//   category: Category;
//   category_id?: number;
// }

// // Fetcher with token
// const fetcher = (url: string) => {
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;
//   if (!token) return Promise.reject("No token");
//   return axios
//     .get(url, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((res) => res.data);
// };

// export default function AIRecommendedProducts() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [animateProducts, setAnimateProducts] = useState(false);

//   const { data: aiData, isLoading: aiLoading } = useSWR(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/user/ai-recommend`,
//     fetcher
//   );

//   const { data: viewedData, isLoading: viewedLoading } = useSWR(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/user/viewed-products`,
//     fetcher
//   );

//   const products: Product[] = aiData?.suggested || [];
//   const viewedNames: string[] =
//     viewedData?.products?.map((p: Product) => p.name) || [];

//   // Animation trigger
//   useEffect(() => {
//     if (products.length > 0) {
//       const timer = setTimeout(() => {
//         setIsVisible(true);
//         setTimeout(() => setAnimateProducts(true), 400);
//       }, 100);
//       return () => clearTimeout(timer);
//     }
//   }, [products.length]);

//   // Loading state
//   if (aiLoading || viewedLoading) {
//     return (
//       <div className="px-4 xl:px-40 pt-4 pb-10">
//         <div className="animate-pulse">
//           <div className="flex items-center gap-4 mb-6">
//             <div className="w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full"></div>
//             <div className="space-y-2 flex-1">
//               <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4"></div>
//               <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/2"></div>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {[...Array(4)].map((_, i) => (
//               <div key={i} className="space-y-4">
//                 <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl"></div>
//                 <div className="space-y-2">
//                   <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
//                   <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Don't show if no products
//   if (products.length === 0) return null;

//   return (
//     <div className="relative overflow-hidden ">
//       <div className="relative px-4 xl:px-40 pt-8 pb-16">
//         {/* Enhanced Header Section */}
//         <div
//           className={`transform transition-all duration-1000 ease-out ${
//             isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
//           }`}
//         >
//           <div className="flex items-center gap-4 mb-8 p-6 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl shadow-pink-100/20">
//             {/* AI Avatar with Glow Effect */}
//             <div className="relative group">
//               <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
//               <div className="relative w-24 h-24 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full p-2 shadow-lg">
//                 <Image
//                   src={aiGif}
//                   alt="AI Assistant"
//                   width={88}
//                   height={88}
//                   className="object-contain rounded-full"
//                   priority
//                 />
//               </div>
//               {/* Floating particles */}
//               <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-300"></div>
//               <div className="absolute top-2 -left-1 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-700"></div>
//             </div>

//             {/* Enhanced Title */}
//             <div className="flex-1">
//               <div className="flex items-center gap-2 mb-2">
//                 <div className="flex items-center gap-1">
//                   <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                   <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     AI Powered
//                   </span>
//                 </div>
//               </div>

//               <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent leading-tight">
//                 Vì bạn đã xem{" "}
//                 <span className="relative inline-block">
//                   <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent font-extrabold">
//                     {viewedNames.join(", ")}
//                   </span>
//                   <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 transform scale-x-0 animate-pulse group-hover:scale-x-100 transition-transform duration-700"></div>
//                 </span>
//               </h2>

//               <p className="text-sm text-gray-600 mt-2 font-medium">
//                 Dreams gợi ý những sản phẩm hoàn hảo dành cho bạn ✨
//               </p>
//             </div>

//             {/* Decorative Elements */}
//             <div className="hidden sm:block">
//               <div className="flex flex-col gap-2">
//                 <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"></div>
//                 <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full"></div>
//                 <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-pink-500 rounded-full"></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Enhanced Product Grid */}
//         <div className="relative">
//           {/* Grid Background Pattern */}
//           <div className="absolute inset-0 opacity-5">
//             <div className="grid grid-cols-4 gap-6 h-full">
//               {[...Array(8)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="border border-gray-300 rounded-lg"
//                 ></div>
//               ))}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map((product) => {
//               // Transform dữ liệu để đảm bảo ProductCard nhận được đúng format
//               const transformedProduct = {
//                 ...product,
//                 category_id: product.category?.id || 0,
//                 category: product.category
//                   ? {
//                       id: product.category.id,
//                       name: product.category.name,
//                     }
//                   : undefined,
//               };

//               return (
//                 <ProductCard key={product.id} product={transformedProduct} />
//               );
//             })}
//           </div>
//         </div>

//         {/* Bottom Decoration */}
//         <div
//           className={`mt-12 text-center transform transition-all duration-1000 delay-1000 ${
//             animateProducts
//               ? "translate-y-0 opacity-100"
//               : "translate-y-4 opacity-0"
//           }`}
//         >
//           <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-white/30 shadow-lg">
//             <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
//             <span className="text-sm font-medium text-gray-600">
//               Được cung cấp bởi AI Dreams
//             </span>
//             <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-500"></div>
//           </div>
//         </div>
//       </div>

//       {/* Floating Animation Elements */}
//       <div className="absolute top-20 left-10 w-6 h-6 border border-pink-300 rounded-full animate-bounce opacity-20 delay-1000"></div>
//       <div className="absolute top-40 right-20 w-4 h-4 bg-purple-300 rounded-full animate-pulse opacity-30 delay-2000"></div>
//       <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-blue-300 rounded-full animate-bounce opacity-25 delay-1500"></div>
//     </div>
//   );
// }

// "use client";

// import useSWR from "swr";
// import axios from "axios";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import ProductCard from "./ProductList";
// import aiGif from "@/animations/sang.gif";

// interface ProductImage {
//   id: number;
//   product_id: number;
//   name: string;
//   color?: string;
// }

// interface ProductVariant {
//   id: number;
//   product_id: number;
//   img_id: number;
//   size: string;
//   color?: string;
//   price: number;
//   sale_price: string | null;
//   stock_quantity: number;
//   status: string;
// }

// interface Category {
//   id: number;
//   name: string;
//   image_url: string;
// }

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   status: string;
//   img: ProductImage[];
//   images?: string[];
//   variant: ProductVariant[];
//   category: Category;
//   category_id?: number;
// }

// // Fetcher with token
// const fetcher = (url: string) => {
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;
//   if (!token) return Promise.reject("No token");
//   return axios
//     .get(url, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((res) => res.data);
// };

// export default function AIRecommendedProducts() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [animateProducts, setAnimateProducts] = useState(false);

//   const { data: aiData, isLoading: aiLoading } = useSWR(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/user/ai-recommend`,
//     fetcher
//   );

//   const { data: viewedData, isLoading: viewedLoading } = useSWR(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/user/viewed-products`,
//     fetcher
//   );

//   const products: Product[] = aiData?.suggested || [];
//   const viewedNames: string[] =
//     viewedData?.products?.map((p: Product) => p.name) || [];

//   // Animation trigger
//   useEffect(() => {
//     if (products.length > 0) {
//       const timer = setTimeout(() => {
//         setIsVisible(true);
//         setTimeout(() => setAnimateProducts(true), 400);
//       }, 100);
//       return () => clearTimeout(timer);
//     }
//   }, [products.length]);

//   // Loading state
//   if (aiLoading || viewedLoading) {
//     return (
//       <div className="px-4 xl:px-40 pt-4 pb-10">
//         <div className="animate-pulse">
//           <div className="flex items-center gap-4 mb-6">
//             <div className="w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full"></div>
//             <div className="space-y-2 flex-1">
//               <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4"></div>
//               <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/2"></div>
//             </div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {[...Array(4)].map((_, i) => (
//               <div key={i} className="space-y-4">
//                 <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl"></div>
//                 <div className="space-y-2">
//                   <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
//                   <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Don't show if no products
//   if (products.length === 0) return null;

//   return (
//     <div className="relative overflow-hidden ">
//       <div className="relative px-4 xl:px-40 pt-8 pb-16">
//         {/* Enhanced Header Section */}
//         <div
//           className={`transform transition-all duration-1000 ease-out ${
//             isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
//           }`}
//         >
//           <div className="flex items-center gap-4 mb-8 p-6 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl shadow-pink-100/20">
//             {/* AI Avatar with Glow Effect */}
//             <div className="relative group">
//               <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
//               <div className="relative w-24 h-24 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full p-2 shadow-lg">
//                 <Image
//                   src={aiGif}
//                   alt="AI Assistant"
//                   width={88}
//                   height={88}
//                   className="object-contain rounded-full"
//                   priority
//                 />
//               </div>
//               {/* Floating particles */}
//               <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-300"></div>
//               <div className="absolute top-2 -left-1 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-700"></div>
//             </div>

//             {/* Enhanced Title */}
//             <div className="flex-1">
//               <div className="flex items-center gap-2 mb-2">
//                 <div className="flex items-center gap-1">
//                   <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                   <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     AI Powered
//                   </span>
//                 </div>
//               </div>

//               <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent leading-tight">
//                 Vì bạn đã xem{" "}
//                 <span className="relative inline-block">
//                   <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent font-extrabold">
//                     {viewedNames.join(", ")}
//                   </span>
//                   <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 transform scale-x-0 animate-pulse group-hover:scale-x-100 transition-transform duration-700"></div>
//                 </span>
//               </h2>

//               <p className="text-sm text-gray-600 mt-2 font-medium">
//                 Dreams gợi ý những sản phẩm hoàn hảo dành cho bạn ✨
//               </p>
//             </div>

//             {/* Decorative Elements */}
//             <div className="hidden sm:block">
//               <div className="flex flex-col gap-2">
//                 <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"></div>
//                 <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full"></div>
//                 <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-pink-500 rounded-full"></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Enhanced Product Grid */}
//         <div className="relative">
//           {/* Grid Background Pattern */}
//           <div className="absolute inset-0 opacity-5">
//             <div className="grid grid-cols-4 gap-6 h-full">
//               {[...Array(8)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="border border-gray-300 rounded-lg"
//                 ></div>
//               ))}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map((product) => {
//               // Transform dữ liệu để đảm bảo ProductCard nhận được đúng format
//               const imageList =
//                 product.images && product.images.length > 0
//                   ? product.images
//                   : product.img.map((i) => `/img/${i.name}`);
//               const transformedProduct = {
//                 ...product,
//                 category_id: product.category?.id || 0,
//                 category: product.category
//                   ? {
//                       id: product.category.id,
//                       name: product.category.name,
//                     }
//                   : undefined,
//                 images: imageList, // Đảm bảo images là string[]
//               };

//               return (
//                 <ProductCard key={product.id} product={transformedProduct} />
//               );
//             })}
//           </div>
//         </div>

//         {/* Bottom Decoration */}
//         <div
//           className={`mt-12 text-center transform transition-all duration-1000 delay-1000 ${
//             animateProducts
//               ? "translate-y-0 opacity-100"
//               : "translate-y-4 opacity-0"
//           }`}
//         >
//           <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-white/30 shadow-lg">
//             <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
//             <span className="text-sm font-medium text-gray-600">
//               Được cung cấp bởi AI Dreams
//             </span>
//             <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-500"></div>
//           </div>
//         </div>
//       </div>

//       {/* Floating Animation Elements */}
//       <div className="absolute top-20 left-10 w-6 h-6 border border-pink-300 rounded-full animate-bounce opacity-20 delay-1000"></div>
//       <div className="absolute top-40 right-20 w-4 h-4 bg-purple-300 rounded-full animate-pulse opacity-30 delay-2000"></div>
//       <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-blue-300 rounded-full animate-bounce opacity-25 delay-1500"></div>
//     </div>
//   );
// }
"use client";

import useSWR from "swr";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import ProductCard from "./ProductList";
import aiGif from "@/animations/sang.gif";

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
  image_url: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  status: string;
  img: ProductImage[];
  images?: string[];
  variant: ProductVariant[];
  category: Category;
  category_id?: number;
}

// Fetcher with token
const fetcher = (url: string) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) return Promise.reject("No token");
  return axios
    .get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};

export default function AIRecommendedProducts() {
  const [isVisible, setIsVisible] = useState(false);
  const [animateProducts, setAnimateProducts] = useState(false);

  const { data: aiData, isLoading: aiLoading } = useSWR(
    `https://dreams-admin.io.vn/api/user/ai-recommend`,
    fetcher
  );

  const { data: viewedData, isLoading: viewedLoading } = useSWR(
    `https://dreams-admin.io.vn/api/user/viewed-products`,
    fetcher
  );

  const products: Product[] = aiData?.suggested || [];
  const viewedNames: string[] =
    viewedData?.products?.map((p: Product) => p.name) || [];

  // Animation trigger
  useEffect(() => {
    if (products.length > 0) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setTimeout(() => setAnimateProducts(true), 400);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [products.length]);

  // Loading state
  if (aiLoading || viewedLoading) {
    return (
      <div className="px-4 xl:px-40 pt-4 pb-10">
        <div className="animate-pulse">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full"></div>
            <div className="space-y-2 flex-1">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/2"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Don't show if no products
  if (products.length === 0) return null;

  return (
    <div className="relative overflow-hidden ">
      <div className="relative px-4 xl:px-40 pt-8 pb-16">
        {/* Enhanced Header Section */}
        <div
          className={`transform transition-all duration-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex items-center gap-4 mb-8 p-6 rounded-3xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl shadow-pink-100/20">
            {/* AI Avatar with Glow Effect */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full p-2 shadow-lg">
                <Image
                  src={aiGif}
                  alt="AI Assistant"
                  width={88}
                  height={88}
                  className="object-contain rounded-full"
                  priority
                />
              </div>
              {/* Floating particles */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-300"></div>
              <div className="absolute top-2 -left-1 w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-700"></div>
            </div>

            {/* Enhanced Title */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AI Powered
                  </span>
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent leading-tight">
                Vì bạn đã xem{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent font-extrabold">
                    {viewedNames.join(", ")}
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-400 to-purple-500 transform scale-x-0 animate-pulse group-hover:scale-x-100 transition-transform duration-700"></div>
                </span>
              </h2>

              <p className="text-sm text-gray-600 mt-2 font-medium">
                Dreams gợi ý những sản phẩm hoàn hảo dành cho bạn ✨
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="hidden sm:block">
              <div className="flex flex-col gap-2">
                <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"></div>
                <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full"></div>
                <div className="w-8 h-1 bg-gradient-to-r from-blue-400 to-pink-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Product Grid */}
        <div className="relative">
          {/* Grid Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-4 gap-6 h-full">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="border border-gray-300 rounded-lg"
                ></div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              // Transform dữ liệu để đảm bảo ProductCard nhận được đúng format
              const imageList =
                product.images && product.images.length > 0
                  ? product.images
                  : product.img.map((i) => `/img/${i.name}`);
              const transformedProduct = {
                ...product,
                category_id: product.category?.id || 0,
                category: product.category
                  ? { id: product.category.id, name: product.category.name }
                  : {
                      id: product.category_id || 0,
                      name: `Category ${product.category_id || 0}`,
                    }, // Giá trị mặc định
                images: imageList, // Đảm bảo images là string[]
              };

              return (
                <ProductCard key={product.id} product={transformedProduct} />
              );
            })}
          </div>
        </div>

        {/* Bottom Decoration */}
        <div
          className={`mt-12 text-center transform transition-all duration-1000 delay-1000 ${
            animateProducts
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-white/30 shadow-lg">
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-600">
              Được cung cấp bởi AI Dreams
            </span>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-500"></div>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute top-20 left-10 w-6 h-6 border border-pink-300 rounded-full animate-bounce opacity-20 delay-1000"></div>
      <div className="absolute top-40 right-20 w-4 h-4 bg-purple-300 rounded-full animate-pulse opacity-30 delay-2000"></div>
      <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-blue-300 rounded-full animate-bounce opacity-25 delay-1500"></div>
    </div>
  );
}
