"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductList";
import axios from "axios";

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

export default function FlashSaleProductList() {
  const [flashSales, setFlashSales] = useState<FlashSale[]>([]);

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

  if (flashSales.length === 0) return <div>Loading flash sale products...</div>;

  return (
    <div className="space-y-12">
      {flashSales.map((sale) => (
        <div key={sale.flash_sale_id}>
          {/* Hiển thị tiêu đề Flash Sale */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{sale.flash_sale_name}</h2>
            <p className="text-sm text-gray-500">
              Từ {new Date(sale.start_time).toLocaleString()} đến{" "}
              {new Date(sale.end_time).toLocaleString()}
            </p>
          </div>

          {/* Danh sách sản phẩm trong Flash Sale */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 animate-fadeIn">
            {sale.variants.map((variant) => (
              <ProductCard
                key={variant.id}
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
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
