// // "use client";

// // import useSWR from "swr";
// // import axios from "axios";
// // import Image from "next/image";
// // import ProductCard from "./ProductList";
// // import aiGif from "@/animations/sang.gif";

// // interface ProductImage {
// //   id: number;
// //   product_id: number;
// //   name: string;
// //   color?: string;
// // }

// // interface ProductVariant {
// //   id: number;
// //   product_id: number;
// //   img_id: number;
// //   size: string;
// //   color?: string;
// //   price: number;
// //   sale_price: string | null;
// //   stock_quantity: number;
// //   status: string;
// // }

// // interface Category {
// //   id: number;
// //   name: string;
// //   image_url: string;
// // }

// // interface Product {
// //   id: number;
// //   name: string;
// //   description: string;
// //   status: string;
// //   img: ProductImage[];
// //   variant: ProductVariant[];
// //   category: Category;
// // }

// // // Fetcher chung cho các request có token
// // const fetcher = (url: string) => {
// //   const token =
// //     typeof window !== "undefined" ? localStorage.getItem("token") : null;
// //   if (!token) return Promise.reject("No token");
// //   return axios
// //     .get(url, {
// //       headers: { Authorization: `Bearer ${token}` },
// //     })
// //     .then((res) => res.data);
// // };

// // export default function AIRecommendedProducts() {
// //   const { data: aiData } = useSWR(
// //     "http://localhost:8000/api/user/ai-recommend",
// //     fetcher
// //   );

// //   const { data: viewedData } = useSWR(
// //     "http://localhost:8000/api/user/viewed-products",
// //     fetcher
// //   );

// //   const products: Product[] = aiData?.suggested || [];
// //   const viewedNames: string[] =
// //     viewedData?.products?.map((p: Product) => p.name) || [];

// //   return (
// //     <div className="px-4 xl:px-40 pt-2 pb-10">
// //       {/* AI GIF + Tiêu đề */}
// //       <div className="flex items-center gap-4 mt-6">
// //         <div className="w-24 h-24 relative">
// //           <Image
// //             src={aiGif}
// //             alt="AI nhảy"
// //             width={250}
// //             height={250}
// //             className="object-contain"
// //             priority
// //           />
// //         </div>
// //         <h2 className="text-2xl font-bold text-gray-800">
// //           {viewedNames.length > 0 ? (
// //             <>
// //               Vì bạn đã xem{" "}
// //               <span className="text-pink-600 font-semibold">
// //                 {viewedNames.join(", ")}
// //               </span>
// //               , Dreams gợi ý bạn những sản phẩm này
// //             </>
// //           ) : (
// //             "Dreams gợi ý bạn những sản phẩm này"
// //           )}
// //         </h2>
// //       </div>

// //       {/* Danh sách sản phẩm */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
// //         {products.length > 0 ? (
// //           products.map((product) => (
// //             <ProductCard key={product.id} product={product} />
// //           ))
// //         ) : (
// //           <p className="text-gray-500">Chưa có dữ liệu gợi ý.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import useSWR from "swr";
// import axios from "axios";
// import Image from "next/image";
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
//   variant: ProductVariant[];
//   category: Category;
// }

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
//   const { data: aiData } = useSWR(
//     "http://localhost:8000/api/user/ai-recommend",
//     fetcher
//   );

//   const { data: viewedData } = useSWR(
//     "http://localhost:8000/api/user/viewed-products",
//     fetcher
//   );

//   const products: Product[] = aiData?.suggested || [];

//   // ❗ Nếu không có gợi ý thì ẩn luôn component
//   if (!products || products.length === 0) return null;

//   const viewedNames: string[] =
//     viewedData?.products?.map((p: Product) => p.name) || [];

//   return (
//     <div className="px-4 xl:px-40 py-2">
//       {/* AI GIF + Tiêu đề */}
//       <div className="flex items-center gap-4 mt-2">
//         <div className="w-24 h-24 relative">
//           <Image
//             src={aiGif}
//             alt="AI nhảy"
//             width={250}
//             height={250}
//             className="object-contain"
//             priority
//           />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-800">
//           {viewedNames.length > 0 ? (
//             <>
//               Vì bạn đã xem{" "}
//               <span className="text-pink-600 font-semibold">
//                 {viewedNames.join(", ")}
//               </span>
//               , Dreams gợi ý bạn những sản phẩm này
//             </>
//           ) : (
//             "Dreams gợi ý bạn những sản phẩm này"
//           )}
//         </h2>
//       </div>

//       {/* Danh sách sản phẩm */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-2">
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import useSWR from "swr";
import axios from "axios";
import Image from "next/image";
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
  variant: ProductVariant[];
  category: Category;
}

// Fetcher có token
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
  const { data: aiData } = useSWR(
    "http://localhost:8000/api/user/ai-recommend",
    fetcher
  );

  const { data: viewedData } = useSWR(
    "http://localhost:8000/api/user/viewed-products",
    fetcher
  );

  const products: Product[] = aiData?.suggested || [];
  const viewedNames: string[] =
    viewedData?.products?.map((p: Product) => p.name) || [];

  // ❗ Chỉ hiển thị nếu có lịch sử xem và có sản phẩm gợi ý
  if (viewedNames.length === 0 || products.length === 0) return null;

  return (
    <div className="px-4 xl:px-40 pt-4 pb-10">
      {/* AI GIF + Tiêu đề */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-24 h-24 relative shrink-0">
          <Image
            src={aiGif}
            alt="AI nhảy"
            width={250}
            height={250}
            className="object-contain"
            priority
          />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Vì bạn đã xem{" "}
          <span className="text-pink-600 font-semibold">
            {viewedNames.join(", ")}
          </span>
          , Dreams gợi ý bạn những sản phẩm này
        </h2>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
