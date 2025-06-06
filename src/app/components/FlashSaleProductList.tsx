// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import FlashSaleHeader from "./FlashSaleHeader";
// import ProductCard from "./ProductList"; // Giữ nguyên đường dẫn của bạn

// interface FlashSaleVariant {
//   product_id: number;
//   id: number;
//   name: string;
//   category_id: number;
//   description: string;
//   status: string;
//   view: number | null;
//   hot: string;
//   created_at: string | null;
//   updated_at: string;
//   deleted_at: string | null;
//   active: string;
//   variant_id: number;
//   original_price: number;
//   flash_sale_price: number;
//   flash_quantity: number;
//   flash_sold: number;
//   images: string[];
// }

// interface FlashSale {
//   flash_sale_id: number;
//   flash_sale_name: string;
//   start_time: string;
//   end_time: string;
//   variants: FlashSaleVariant[];
// }

// function formatTimeLeft(timeLeft: number) {
//   if (timeLeft <= 0) return "Đã kết thúc";

//   const totalSeconds = Math.floor(timeLeft / 1000);
//   const days = Math.floor(totalSeconds / (3600 * 24));
//   const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
//   const minutes = Math.floor((totalSeconds % 3600) / 60);
//   const seconds = totalSeconds % 60;

//   return `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
// }

// export default function FlashSaleProductList() {
//   const [flashSales, setFlashSales] = useState<FlashSale[]>([]);
//   const [countdowns, setCountdowns] = useState<Record<number, string>>({});

//   useEffect(() => {
//     const fetchFlashSales = async () => {
//       try {
//         const response = await axios.get<FlashSale[]>(
//           "http://127.0.0.1:8000/api/flash-sales"
//         );
//         setFlashSales(response.data);
//       } catch (error) {
//         console.error("Failed to fetch flash sale data:", error);
//       }
//     };

//     fetchFlashSales();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date().getTime();

//       const newCountdowns: Record<number, string> = {};
//       flashSales.forEach((sale) => {
//         const endTime = new Date(sale.end_time).getTime();
//         const timeLeft = endTime - now;
//         newCountdowns[sale.flash_sale_id] = formatTimeLeft(timeLeft);
//       });
//       setCountdowns(newCountdowns);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [flashSales]);

//   if (flashSales.length === 0) return <div>Loading flash sale products...</div>;

//   return (
//     <div className="space-y-14">
//       {flashSales.map((sale) => (
//         <div key={sale.flash_sale_id}>
//           <div
//             className="
//     p-6 space-y-6
//     bg-gradient-to-tr from-[#FF7043]/20 via-[#FF5722]/20 to-[#FF8A50]/10
//     rounded-3xl
//     shadow-2xl
//     border border-orange-400/40
//     animate-fade-in-up
//     transition-transform duration-500
//     hover:scale-[1.02]
//   "
//           >
//             <FlashSaleHeader
//               name={sale.flash_sale_name}
//               timeLeft={countdowns[sale.flash_sale_id] ?? ""}
//             />

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//               {sale.variants.map((variant) => (
//                 <ProductCard
//                   key={variant.id}
//                   product={{
//                     id: variant.product_id,
//                     name: variant.name,
//                     description: variant.description,
//                     status: variant.status,
//                     img: variant.images.map((img, idx) => ({
//                       id: idx,
//                       product_id: variant.product_id,
//                       name: img,
//                     })),
//                     variant: [
//                       {
//                         id: variant.variant_id,
//                         product_id: variant.product_id,
//                         img_id: 0,
//                         size: "M",
//                         color: "",
//                         price: variant.original_price,
//                         sale_price: variant.flash_sale_price.toString(),
//                         stock_quantity:
//                           variant.flash_quantity - variant.flash_sold,
//                         status: variant.status,
//                       },
//                     ],
//                     category: {
//                       id: variant.category_id,
//                       name: sale.flash_sale_name,
//                     },
//                   }}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import FlashSaleHeader from "./FlashSaleHeader";
import ProductCard from "./ProductList";

interface FlashSaleVariant {
  product_id: number;
  id: number;
  name: string;
  category_id: number;
  description: string;
  status: string;
  view: number | null;
  hot: string;
  created_at: string | null;
  updated_at: string;
  deleted_at: string | null;
  active: string;
  variant_id: number;
  original_price: number;
  flash_sale_price: number;
  flash_quantity: number;
  flash_sold: number;
  images: string[];
}

interface FlashSale {
  flash_sale_id: number;
  flash_sale_name: string;
  start_time: string;
  end_time: string;
  variants: FlashSaleVariant[];
}

function formatTimeLeft(timeLeft: number) {
  if (timeLeft <= 0) return "Đã kết thúc";

  const totalSeconds = Math.floor(timeLeft / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
}

export default function FlashSaleProductList() {
  const [flashSales, setFlashSales] = useState<FlashSale[]>([]);
  const [countdowns, setCountdowns] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchFlashSales = async () => {
      try {
        const response = await axios.get<FlashSale[]>(
          "http://127.0.0.1:8000/api/flash-sales"
        );
        setFlashSales(response.data);
      } catch (error) {
        console.error("Failed to fetch flash sale data:", error);
      }
    };

    fetchFlashSales();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();

      const newCountdowns: Record<number, string> = {};
      flashSales.forEach((sale) => {
        const endTime = new Date(sale.end_time).getTime();
        const timeLeft = endTime - now;
        newCountdowns[sale.flash_sale_id] = formatTimeLeft(timeLeft);
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [flashSales]);

  if (flashSales.length === 0) return <div>Loading flash sale products...</div>;

  return (
    <div className="space-y-14  px-40">
      {flashSales.map((sale) => (
        <div key={sale.flash_sale_id} className="relative">
          <div
            className="
              relative z-10
 space-y-6
              from-[#FF7043]/20 via-[#FF5722]/20 to-[#FF8A50]/10
              rounded-3xl
         
            
              animate-fade-in-up
              transition-transform duration-500
             
            "
          >
            <FlashSaleHeader
              name={sale.flash_sale_name}
              timeLeft={countdowns[sale.flash_sale_id] ?? ""}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {sale.variants.map((variant) => (
                <div key={variant.id} className="fire-card">
                  <ProductCard
                    product={{
                      id: variant.product_id,
                      name: variant.name,
                      description: variant.description,
                      status: variant.status,
                      img: variant.images.map((img, idx) => ({
                        id: idx,
                        product_id: variant.product_id,
                        name: img,
                      })),
                      variant: [
                        {
                          id: variant.variant_id,
                          product_id: variant.product_id,
                          img_id: 0,
                          size: "M",
                          color: "",
                          price: variant.original_price,
                          sale_price: variant.flash_sale_price.toString(),
                          stock_quantity:
                            variant.flash_quantity - variant.flash_sold,
                          status: variant.status,
                        },
                      ],
                      category: {
                        id: variant.category_id,
                        name: sale.flash_sale_name,
                      },
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
