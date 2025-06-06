"use client";
import { useEffect, useState } from "react";
import axios from "axios";

type Address = {
  id: number;
  name: string;
  address: string;
  phone: string;
};

type Variant = {
  id: number;
  product_id: number;
  img_id: number;
  size: string;
  stock_quantity: number;
  price: number;
  sale_price: number | null;
  status: string;
  active: string;
};

type ProductImage = {
  id: number;
  product_id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  category_id: number;
  status: string;
  active: string;
  img: ProductImage[];
};

type OrderItem = {
  id: number;
  order_id: number;
  variant_id: number;
  quantity: string;
  price: string;
  variant: Variant;
  product: Product;
};

type Order = {
  id: number;
  created_at: string;
  total_price: string;
  status: string;
  address_id: number;
  order_items: OrderItem[];
};

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Record<number, Address>>({});

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://127.0.0.1:8000/api/order", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(res.data.data);

      const addressIds = [
        ...new Set(res.data.data.map((o: Order) => o.address_id)),
      ];
      const addressRes = await Promise.all(
        addressIds.map((id) =>
          axios.get(`http://127.0.0.1:8000/api/address/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );

      const addressMap: Record<number, Address> = {};
      addressRes.forEach((res) => {
        const addr = res.data.data;
        addressMap[addr.id] = addr;
      });

      setAddresses(addressMap);
    };

    fetchOrders();
  }, []);

  return (
    // <section className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
    //   <h2 className="text-xl font-semibold mb-4 text-orange-600">
    //     📦 Đơn hàng
    //   </h2>
    //   <div className="space-y-4 text-sm">
    //     {orders.map((order) => {
    //       const addr = addresses[order.address_id];
    //       return (
    //         <div
    //           key={order.id}
    //           className="border p-4 rounded hover:bg-orange-50 transition"
    //         >
    //           <p>
    //             <strong>Mã đơn:</strong> {order.id}
    //           </p>
    //           <p>
    //             <strong>Ngày:</strong>{" "}
    //             {new Date(order.created_at).toLocaleDateString()}
    //           </p>
    //           <p>
    //             <strong>Trạng thái:</strong>{" "}
    //             <span className="text-green-600">{order.status}</span>
    //           </p>
    //           <p className="mt-2">
    //             <strong>Tổng tiền:</strong>{" "}
    //             {parseInt(order.total_price).toLocaleString("vi-VN")}₫
    //           </p>

    //           {addr && (
    //             <>
    //               <p>
    //                 <strong>Địa chỉ:</strong> {addr.address}
    //               </p>
    //               <p>
    //                 <strong>SĐT:</strong> {addr.phone}
    //               </p>
    //             </>
    //           )}

    //           {/* <div className="mt-4 space-y-2">
    //             <p className="font-semibold text-orange-600">🛍️ Sản phẩm:</p>
    //             {order.order_items.map((item) => {
    //               const productImage = item.product.img.find(
    //                 (img) => img.id === item.variant.img_id
    //               );

    //               return (
    //                 <div
    //                   key={item.id}
    //                   className="flex items-start gap-4 border-l border-orange-300 pl-4 py-2"
    //                 >
    //                   <img
    //                     src={
    //                       productImage
    //                         ? `/img/${productImage.name}`
    //                         : "/img/default.webp"
    //                     }
    //                     alt={item.product.name}
    //                     className="w-16 h-16 object-cover rounded-md border"
    //                   />
    //                   <div className="space-y-1 text-sm">
    //                     <p className="font-medium">
    //                       {item.product.name} (Size {item.variant.size})
    //                     </p>
    //                     <p>Số lượng: {item.quantity}</p>
    //                     <p>
    //                       Giá: {parseInt(item.price).toLocaleString("vi-VN")}₫
    //                     </p>
    //                   </div>
    //                 </div>
    //               );
    //             })}
    //           </div> */}
    //           <div className="mt-4">
    //             <p className="font-semibold text-orange-600 mb-2">
    //               🛍️ Sản phẩm:
    //             </p>
    //             <div className="space-y-2">
    //               {order.order_items.map((item) => {
    //                 const productImage = item.product.img.find(
    //                   (img) => img.id === item.variant.img_id
    //                 );

    //                 return (
    //                   <div
    //                     key={item.id}
    //                     className="flex items-center gap-4 border-l border-orange-300 pl-4 py-2"
    //                   >
    //                     <img
    //                       src={
    //                         productImage
    //                           ? `/img/${productImage.name}`
    //                           : "/img/default.webp"
    //                       }
    //                       alt={item.product.name}
    //                       className="w-20 h-20 object-cover rounded-md border"
    //                     />
    //                     <div className="text-sm space-x-4">
    //                       <span className="font-medium">
    //                         {item.product.name} (Size {item.variant.size})
    //                       </span>
    //                       <span>Số lượng: {item.quantity}</span>
    //                       <span>
    //                         Giá: {parseInt(item.price).toLocaleString("vi-VN")}₫
    //                       </span>
    //                     </div>
    //                   </div>
    //                 );
    //               })}
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </section>
    <section className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
      <h2 className="text-xl font-semibold mb-6 text-orange-600">
        Đơn hàng của bạn
      </h2>

      <div className="space-y-6">
        {orders.map((order) => {
          const addr = addresses[order.address_id];
          return (
            <div
              key={order.id}
              className="border rounded-xl  transition bg-white"
            >
              {/* Header đơn hàng */}
              <div className="flex justify-between items-center bg-orange-50 border-b p-4 rounded-t-xl">
                <div className="text-sm text-gray-700 space-x-2">
                  <span>Mã đơn:</span>
                  <span className="font-medium text-gray-900">#{order.id}</span>
                  <span className="text-gray-400">|</span>
                  <span className="text-green-600 font-semibold">
                    {order.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </div>
              </div>

              {/* Danh sách sản phẩm */}
              <div className="divide-y">
                {order.order_items.map((item) => {
                  const productImage = item.product.img.find(
                    (img) => img.id === item.variant.img_id
                  );

                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            productImage
                              ? `/img/${productImage.name}`
                              : "/img/default.webp"
                          }
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-md border"
                        />
                        <div className="space-y-1 text-sm">
                          <p className="text-base font-medium text-gray-800">
                            {item.product.name}
                          </p>
                          <p className="text-gray-500">
                            Phân loại: Size {item.variant.size}
                          </p>
                          <p className="text-gray-500">
                            Số lượng: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-base font-semibold text-orange-600 whitespace-nowrap">
                        {parseInt(item.price).toLocaleString("vi-VN")}₫
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Tổng tiền + địa chỉ */}
              <div className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-b-xl text-sm text-gray-700">
                <div>
                  {addr && (
                    <div className="space-y-1 text-sm text-gray-500">
                      <p>
                        Giao đến: {addr.name} | {addr.phone}
                      </p>
                      <p className="truncate max-w-xs">
                        Địa chỉ: {addr.address}
                      </p>
                    </div>
                  )}
                </div>
                <div className="text-right space-y-1">
                  <p className="text-gray-500">Tổng tiền:</p>
                  <p className="text-lg font-bold text-orange-600">
                    {parseInt(order.total_price).toLocaleString("vi-VN")}₫
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-2 p-4 border-t bg-white rounded-b-xl">
                <button className="px-4 py-1 border rounded text-gray-600 hover:bg-gray-100 text-sm">
                  Xem chi tiết
                </button>
                <button className="px-4 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm">
                  Mua lại
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
