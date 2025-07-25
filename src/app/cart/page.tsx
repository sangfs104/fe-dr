"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Image from "next/image";

import HeaderHome from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import CheckoutProgress from "../components/ui/CheckoutProgress";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFromCart, updateQuantity } from "@/store/cartSlice";
import { RootState } from "@/store/store";
import { CartItem } from "../types/cart";

export default function CartPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalPrice = isClient
    ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  return (
    <>
      <HeaderHome />
      <CheckoutProgress currentStep="cart" />

      <div className="mt-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 flex flex-col lg:flex-row gap-5">
        {/* Cart Items */}
        <div className="flex-[6] max-h-[500px] overflow-y-auto border border-gray-300 bg-white p-4 rounded-md">
          {isClient && (
            <p className="text-base mb-4">
              Bạn đang có <strong>{cartItems.length} sản phẩm</strong> trong giỏ
              hàng
            </p>
          )}

          {isClient &&
            cartItems.map((item: CartItem, i: number) => (
              <div key={i} className="flex flex-col gap-4 mb-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-200 pb-4">
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <h2 className="text-base font-bold truncate">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500">Size {item.size}</p>
                    <p className="text-sm text-gray-500">
                      {item.price.toLocaleString("vi-VN")}₫
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between min-w-[200px] gap-3 w-full sm:w-auto">
                    <div className="flex items-center">
                      <button
                        className="w-8 h-8 bg-gray-100 border border-gray-300 disabled:opacity-50"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: +item.productId,
                              variantId: +item.variantId,
                              newQuantity: item.quantity - 1,
                            })
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        readOnly
                        className="w-10 h-8 border-t border-b border-gray-300 text-center p-0"
                      />
                      <button
                        className="w-8 h-8 bg-gray-100 border border-gray-300"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              productId: +item.productId,
                              variantId: +item.variantId,
                              newQuantity: item.quantity + 1,
                            })
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="font-medium text-gray-800 text-right min-w-[100px]">
                      {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                    </p>
                    <button
                      className="text-red-500 text-lg"
                      onClick={() =>
                        dispatch(
                          removeFromCart({
                            productId: +item.productId,
                            variantId: +item.variantId,
                          })
                        )
                      }
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {/* Note & Policy */}
          <div className="flex flex-col md:flex-row justify-between gap-5 mt-5 p-4 bg-gray-100 border border-gray-300 rounded-lg">
            <div className="flex-1">
              <label
                htmlFor="order-note"
                className="block text-sm font-bold mb-2"
              >
                Ghi chú đơn hàng:
              </label>
              <textarea
                id="order-note"
                placeholder="Nhập ghi chú của bạn..."
                className="w-full h-24 border border-gray-300 rounded px-3 py-2 text-sm resize-none"
              ></textarea>
            </div>
            <div className="flex-1">
              <h4 className="text-base font-bold mb-2">Chính sách Đổi/Trả</h4>
              <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
                <li>Sản phẩm được đổi 1 lần duy nhất, không hỗ trợ trả.</li>
                <li>Sản phẩm còn đủ tem mác, chưa qua sử dụng.</li>
                <li>
                  Sản phẩm nguyên giá được đổi trong 30 ngày trên toàn hệ thống.
                </li>
                <li>Sản phẩm sale chỉ hỗ trợ đổi size trong 7 ngày.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="flex-[4] p-5 border border-gray-300 bg-white rounded-md h-fit">
          <h2 className="text-lg font-bold mb-4">Thông tin đơn hàng</h2>
          <p className="text-sm mb-2">
            Tổng tiền:{" "}
            <span className="font-bold text-lg text-rose-600">
              {isClient ? totalPrice.toLocaleString("vi-VN") : "0"}₫
            </span>
          </p>
          <p className="text-sm mb-4 text-gray-600">
            Bạn có thể nhập mã giảm giá ở trang thanh toán
          </p>
          <button
            onClick={() => router.push("/payment")}
            className="w-full bg-[#FF5722] hover:bg-[#F44336] text-white py-2 px-4 text-base rounded-2xl shadow-md"
          >
            THANH TOÁN
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
