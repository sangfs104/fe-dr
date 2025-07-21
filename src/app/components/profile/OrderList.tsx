"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
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
  vnp_TxnRef: string;
};

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Record<number, Address>>({});
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);
  const statusTabs = [
    { key: "all", label: "Tất cả" },
    { key: "pending", label: "Chờ xác nhận" },
    { key: "processing", label: "Đang giao" },
    { key: "paid", label: "Đã hoàn thành" },
    { key: "cancelled", label: "Đã hủy" },
  ];
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

  const statusCounts: Record<string, number> = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    paid: orders.filter((o) => o.status === "paid").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  return (
    <section className="bg-white p-4 sm:p-6 rounded-xl shadow hover:shadow-md transition w-full overflow-x-hidden">
      <h2 className="text-xl font-semibold mb-6 text-orange-600">
        Đơn hàng của bạn
      </h2>

      <div className="flex flex-wrap gap-3 mb-6">
        {statusTabs.map((tab) => (
          <button
            key={tab.key}
            className={`relative px-4 py-2 rounded-full border text-sm font-medium transition
            ${
              statusFilter === tab.key
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-orange-50"
            }`}
            onClick={() => setStatusFilter(tab.key)}
          >
            {tab.label}
            {statusCounts[tab.key] > 0 && (
              <span
                className={`absolute -top-2 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded-full
                ${
                  statusFilter === tab.key
                    ? "bg-white text-orange-500 border border-orange-500"
                    : "bg-orange-500 text-white"
                }`}
                style={{ minWidth: 20, display: "inline-block" }}
              >
                {statusCounts[tab.key]}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredOrders.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            Không có đơn hàng nào.
          </div>
        )}

        {filteredOrders.map((order) => {
          const addr = addresses[order.address_id];
          return (
            <div
              key={order.id}
              className="border rounded-xl transition bg-white"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-orange-50 border-b p-4 rounded-t-xl gap-2">
                <div className="text-sm text-gray-700 space-x-2">
                  <span>Mã đơn:</span>
                  <span className="font-medium text-gray-900">
                    #{order.vnp_TxnRef}
                  </span>
                  <span className="text-gray-400">|</span>
                  <span
                    className={`${
                      order.status === "pending"
                        ? "text-yellow-500"
                        : order.status === "processing"
                        ? "text-blue-500"
                        : order.status === "paid"
                        ? "text-green-600"
                        : order.status === "cancelled"
                        ? "text-red-500"
                        : ""
                    } font-semibold`}
                  >
                    {order.status === "pending" && "Chờ xác nhận"}
                    {order.status === "processing" && "Đang giao"}
                    {order.status === "paid" && "Đã thanh toán"}
                    {order.status === "cancelled" && "Đã hủy"}
                    {!["pending", "processing", "paid", "cancelled"].includes(
                      order.status
                    ) && order.status}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </div>
              </div>

              <div className="divide-y">
                {order.order_items.map((item) => {
                  const productImage = item.product.img.find(
                    (img) => img.id === item.variant.img_id
                  );

                  return (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4"
                    >
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <Image
                          src={
                            productImage
                              ? `/img/${productImage.name}`
                              : "/img/default.webp"
                          }
                          alt={item.product.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border"
                        />
                        <div className="space-y-1 text-sm">
                          <p className="text-base font-medium text-gray-800 break-words">
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
                      <div className="text-right text-base font-semibold text-orange-600 whitespace-nowrap min-w-[100px]">
                        {parseInt(item.price).toLocaleString("vi-VN")}₫
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-2 px-4 py-3 bg-gray-50 rounded-b-xl text-sm text-gray-700">
                <div>
                  {addr && (
                    <div className="space-y-1 text-sm text-gray-500">
                      <p>
                        Giao đến: {addr.name} | {addr.phone}
                      </p>
                      <p className="truncate max-w-full sm:max-w-xs">
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

              <div className="flex flex-wrap justify-end gap-2 p-4 border-t bg-white rounded-b-xl">
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
