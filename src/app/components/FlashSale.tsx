// // "use client";

// // import Image from "next/image";
// // import Link from "next/link";
// // import { useEffect, useState } from "react";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// // import { faEye } from "@fortawesome/free-regular-svg-icons";
// // import { useCart } from "../../context/CartContext";

// // interface FlashProduct {
// //   product_id: number;
// //   product_name: string;
// //   description: string;
// //   product_status: string;
// //   variant_id: number;
// //   size: string;
// //   original_price: number;
// //   sale_price: number;
// //   flash_quantity: number;
// //   flash_sold: number;
// //   image: string;
// // }

// // interface FlashSaleData {
// //   flash_sale_id: number;
// //   flash_sale_name: string;
// //   start_time: string;
// //   end_time: string;
// //   products: FlashProduct[];
// // }

// // export default function FlashSale() {
// //   const [flashSale, setFlashSale] = useState<FlashSaleData | null>(null);
// //   const { addToCart } = useCart();

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const res = await fetch(
// //         "http://localhost:8000/api/flash-sale/5/products"
// //       );
// //       const data = await res.json();
// //       setFlashSale(data);
// //     };
// //     fetchData();
// //   }, []);

// //   if (!flashSale)
// //     return <div className="text-center py-10">Đang tải flash sale...</div>;

// //   return (
// //     <div className="my-10 px-6">
// //       <h2 className="text-2xl font-bold mb-6 text-red-600">
// //         🔥 Flash Sale: {flashSale.flash_sale_name}
// //       </h2>
// //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
// //         {flashSale.products.map((product) => (
// //           <div
// //             key={product.product_id}
// //             className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
// //           >
// //             <Link href={`/products/${product.product_id}`} className="block">
// //               <Image
// //                 src={`/img/${product.image}`}
// //                 alt={product.product_name}
// //                 width={500}
// //                 height={600}
// //                 className="w-full h-64 object-cover rounded"
// //               />
// //             </Link>
// //             <div className="mt-3">
// //               <h2 className="text-lg font-semibold">{product.product_name}</h2>
// //               <p className="text-sm text-gray-600 mt-1">
// //                 {product.description}
// //               </p>
// //               <p className="text-sm text-gray-500">Size: {product.size}</p>

// //               <div className="mt-2">
// //                 <span className="text-red-500 font-bold text-lg">
// //                   {product.sale_price.toLocaleString("vi-VN")} ₫
// //                 </span>
// //                 <span className="ml-2 text-gray-400 line-through text-sm">
// //                   {product.original_price.toLocaleString("vi-VN")} ₫
// //                 </span>
// //               </div>

// //               <div className="flex justify-between items-center mt-3">
// //                 <button
// //                   className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-800"
// //                   onClick={() =>
// //                     addToCart({
// //                       productId: product.product_id,
// //                       variantId: product.variant_id,
// //                       name: product.product_name,
// //                       img: `/img/${product.image}`,
// //                       price: product.original_price,
// //                       sale_price: product.sale_price,
// //                       size: product.size,
// //                       quantity: 1,
// //                       variantList: [], // Optional
// //                     })
// //                   }
// //                 >
// //                   <FontAwesomeIcon icon={faCartShopping} className="mr-1" />{" "}
// //                   Thêm vào giỏ
// //                 </button>
// //                 <span className="text-xs text-gray-500">
// //                   {product.flash_sold}/{product.flash_quantity} đã bán
// //                 </span>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// import { useCart } from "../../context/CartContext";
// import dayjs from "dayjs";
// import duration from "dayjs/plugin/duration";

// dayjs.extend(duration);

// interface FlashProduct {
//   product_id: number;
//   product_name: string;
//   description: string;
//   product_status: string;
//   variant_id: number;
//   size: string;
//   original_price: number;
//   sale_price: number;
//   flash_quantity: number;
//   flash_sold: number;
//   image: string;
// }

// interface FlashSaleData {
//   flash_sale_id: number;
//   flash_sale_name: string;
//   start_time: string;
//   end_time: string;
//   products: FlashProduct[];
// }

// export default function FlashSale() {
//   const [flashSale, setFlashSale] = useState<FlashSaleData | null>(null);
//   const [remainingTime, setRemainingTime] = useState<string>("");
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch(
//         "http://localhost:8000/api/flash-sale/5/products"
//       );
//       const data = await res.json();
//       setFlashSale(data);
//     };
//     fetchData();
//   }, []);

//   // Countdown timer
//   useEffect(() => {
//     if (!flashSale?.end_time) return;

//     const interval = setInterval(() => {
//       const now = dayjs();
//       const end = dayjs(flashSale.end_time);
//       const diff = end.diff(now);

//       if (diff <= 0) {
//         setRemainingTime("Đã kết thúc");
//         clearInterval(interval);
//       } else {
//         const dur = dayjs.duration(diff);
//         const mm = dur.minutes().toString().padStart(2, "0");
//         const ss = dur.seconds().toString().padStart(2, "0");
//         setRemainingTime(`${mm}:${ss}`);
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [flashSale?.end_time]);

//   if (!flashSale)
//     return <div className="text-center py-10">Đang tải Flash Sale...</div>;

//   return (
//     <div className="my-10 px-6">
//       <div className="mb-6 flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-red-600">
//             🔥 Flash Sale: {flashSale.flash_sale_name}
//           </h2>
//           <p className="text-sm text-gray-600 mt-1">
//             Kết thúc sau:{" "}
//             <span className="text-red-500 font-semibold">{remainingTime}</span>
//           </p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//         {flashSale.products.map((product) => (
//           <div
//             key={product.product_id}
//             className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
//           >
//             <Link href={`/products/${product.product_id}`} className="block">
//               <Image
//                 src={`/img/${product.image}`}
//                 alt={product.product_name}
//                 width={500}
//                 height={600}
//                 className="w-full h-64 object-cover rounded"
//               />
//             </Link>
//             <div className="mt-3">
//               <h2 className="text-lg font-semibold">{product.product_name}</h2>
//               <p className="text-sm text-gray-600 mt-1">
//                 {product.description}
//               </p>
//               <p className="text-sm text-gray-500">Size: {product.size}</p>

//               <div className="mt-2">
//                 <span className="text-red-500 font-bold text-lg">
//                   {product.sale_price.toLocaleString("vi-VN")} ₫
//                 </span>
//                 <span className="ml-2 text-gray-400 line-through text-sm">
//                   {product.original_price.toLocaleString("vi-VN")} ₫
//                 </span>
//               </div>

//               <div className="flex justify-between items-center mt-3">
//                 <button
//                   className="bg-black text-white px-3 py-1 rounded text-sm hover:bg-gray-800"
//                   onClick={() =>
//                     addToCart({
//                       productId: product.product_id,
//                       variantId: product.variant_id,
//                       name: product.product_name,
//                       img: `/img/${product.image}`,
//                       price: product.original_price,
//                       sale_price: product.sale_price,
//                       size: product.size,
//                       quantity: 1,
//                       variantList: [],
//                     })
//                   }
//                 >
//                   <FontAwesomeIcon icon={faCartShopping} className="mr-1" />{" "}
//                   Thêm vào giỏ
//                 </button>
//                 <span className="text-xs text-gray-500">
//                   {product.flash_sold}/{product.flash_quantity} đã bán
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface Variant {
  id: number;
  name: string;
  description: string;
  original_price: number;
  flash_sale_price: number;
  flash_quantity: number;
  flash_sold: number;
  images: string[];
}

interface FlashSaleData {
  flash_sale_id: number;
  flash_sale_name: string;
  start_time: string;
  end_time: string;
  variants: Variant[];
}

export default function FlashSale() {
  const [data, setData] = useState<FlashSaleData | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/flash-sale/5/products")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  if (!data)
    return (
      <p className="text-center text-gray-500">
        Đang tải dữ liệu Flash Sale...
      </p>
    );

  const formatTime = (time: string) =>
    format(new Date(time), "HH:mm - dd/MM/yyyy", { locale: vi });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-red-600 mb-2">
        🔥 Flash Sale: {data.flash_sale_name}
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Từ <span className="font-semibold">{formatTime(data.start_time)}</span>{" "}
        đến <span className="font-semibold">{formatTime(data.end_time)}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.variants.map((variant) => (
          <div
            key={variant.id}
            className="border rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition"
          >
            <Image
              src={`/img/${variant.images[0]}`}
              alt={variant.name}
              width={400}
              height={400}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{variant.name}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">
                {variant.description}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-red-600 font-bold text-lg">
                  {variant.flash_sale_price.toLocaleString("vi-VN")}₫
                </span>
                <span className="line-through text-gray-400 text-sm">
                  {variant.original_price.toLocaleString("vi-VN")}₫
                </span>
              </div>
              <div className="text-xs text-gray-600">
                Còn lại: {variant.flash_quantity - variant.flash_sold} sản phẩm
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
