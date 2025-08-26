"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import FlashSaleHeader from "./FlashSaleHeader";
import ProductCard from "./ProductList";

interface FlashSaleVariant {
  product_id: number;
  id: number;
  name: string;
  product_name: string;
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlashSales = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<FlashSale[]>(
          `${process.env.NEXT_PUBLIC_API_URL}/api/flash-sales`
        );
        setFlashSales(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu flash sale:", error);
        setError(
          "Không thể tải dữ liệu. Vui lòng kiểm tra kết nối hoặc thử lại sau."
        );
      } finally {
        setLoading(false);
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

  if (loading)
    return <div className="text-center text-gray-600">Đang tải...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (flashSales.length === 0)
    return (
      <div className="text-center text-gray-600">
        Không có dữ liệu flash sale.
      </div>
    );

  return (
    <div className="space-y-20 px-6 sm:px-10 md:px-20 lg:px-40 py-6">
      {flashSales.map((sale) => (
        <div key={sale.flash_sale_id} className="relative space-y-6">
          <FlashSaleHeader
            name={sale.flash_sale_name}
            timeLeft={countdowns[sale.flash_sale_id] ?? ""}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {sale.variants.map((variant) => {
              const totalQuantity = variant.flash_quantity || 1; // Tránh chia cho 0
              const soldQuantity = Math.min(variant.flash_sold, totalQuantity); // Đảm bảo không vượt quá tổng số
              const availableQuantity = totalQuantity - soldQuantity;
              const percentSold = (soldQuantity / totalQuantity) * 100;
              const isSoldOut = availableQuantity <= 0;

              return (
                <div
                  key={`${variant.id}-${variant.variant_id}`}
                  className="fire-card group relative bg-white rounded-2xl p-4 shadow hover:shadow-lg transition duration-300"
                >
                  {/* Overlay khi hết hàng */}
                  {isSoldOut && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-2xl z-10">
                      <span className="text-white text-2xl font-bold animate-pulse">
                        HẾT HÀNG
                      </span>
                    </div>
                  )}

                  {/* Tên sản phẩm và trạng thái hết hàng */}
                  <div className="font-semibold text-base mb-2 text-center text-orange-600">
                    {variant.name}
                    {isSoldOut && (
                      <span className="text-red-500 text-sm ml-2">
                        (Hết hàng)
                      </span>
                    )}
                  </div>

                  <ProductCard
                    product={{
                      id: variant.product_id,
                      name: variant.product_name,
                      description: variant.description,
                      status: variant.status,
                      images: variant.images,
                      img: variant.images.map((imgName, index) => ({
                        id: index,
                        product_id: variant.product_id,
                        name: imgName,
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
                          stock_quantity: availableQuantity,
                          status: variant.status,
                        },
                      ],
                      category: {
                        id: variant.category_id,
                        name: sale.flash_sale_name,
                      },
                      category_id: variant.category_id,
                    }}
                  />

                  <div className="mt-2 space-y-1 text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="text-lg fire-flicker font-bold text-orange-500">
                        🔥 Đã bán:
                      </span>
                      <span>{soldQuantity}</span>
                      <span className="text-gray-400">/ {totalQuantity}</span>
                    </div>

                    {/* Thanh tiến trình với văn bản "HẾT HÀNG" */}
                    <div className="relative h-3 bg-orange-100 rounded-full overflow-hidden">
                      <div
                        className={`absolute left-0 top-0 h-full transition-all duration-500 flex items-center justify-center ${
                          isSoldOut
                            ? "bg-gray-400 text-white text-xs font-bold"
                            : "bg-gradient-to-r from-orange-500 to-orange-400"
                        }`}
                        style={{ width: `${Math.min(percentSold, 100)}%` }}
                      >
                        {isSoldOut && "HẾT HÀNG"}
                      </div>
                    </div>

                    <div
                      className={`text-xs text-right font-semibold ${
                        isSoldOut ? "text-red-500" : "text-orange-600"
                      }`}
                    >
                      {isSoldOut
                        ? "Đã hết hàng"
                        : `${Math.floor(percentSold)}% đã bán`}
                    </div>
                  </div>

                  {/* Nút mua hàng */}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
