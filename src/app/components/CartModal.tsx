"use client";
import Image from "next/image";
import { useCart } from "../../context/CartContext";
import { ChangeEvent } from "react";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";

export default function CartModal({ onClose }: { onClose: () => void }) {
  const { cartItems, updateVariant, removeFromCart } = useCart();

  const handleSizeChange = (
    productId: number,
    currentVariantId: number,
    newSize: string
  ) => {
    const item = cartItems.find(
      (i) => i.productId === productId && i.variantId === currentVariantId
    );
    if (!item) return;

    const newVariant = item.variantList.find((v) => v.size === newSize);
    if (newVariant) {
      updateVariant(productId, currentVariantId, {
        variantId: newVariant.id,
        price: newVariant.sale_price
          ? parseInt(newVariant.sale_price)
          : newVariant.price,
        size: newVariant.size,
      });
    }
  };

  const handleRemove = (productId: number, variantId: number) => {
    const item = cartItems.find(
      (i) => i.productId === productId && i.variantId === variantId
    );

    removeFromCart(productId, variantId);

    if (item) {
      toast.success(`🗑️ Đã xóa "${item.name}" khỏi giỏ hàng`);
    }
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="w-[400px] bg-white flex flex-col h-full">
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold">Giỏ hàng</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X size={22} />
          </button>
        </div>

        {/* Product list */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <p>Giỏ hàng trống</p>
          ) : (
            <ul>
              {cartItems.map((item, idx) => (
                <li key={idx} className="mb-4 pb-3 border-b">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded object-cover w-14 h-14"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Giá: {item.price.toLocaleString("vi-VN")} ₫
                      </p>
                      <p className="text-sm text-gray-500">
                        Số lượng: {item.quantity}
                      </p>
                      <div className="mt-1">
                        <label className="text-sm mr-2">Size:</label>
                        <select
                          value={item.size}
                          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                            handleSizeChange(
                              item.productId,
                              item.variantId,
                              e.target.value
                            )
                          }
                          className="border rounded px-2 py-1 text-sm"
                        >
                          {item.variantList.map((v) => (
                            <option key={v.id} value={v.size}>
                              {v.size}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleRemove(item.productId, item.variantId)
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-white sticky bottom-0 space-y-3">
          <div className="flex justify-between items-center text-base font-semibold">
            <span>Tổng cộng:</span>
            <span className="text-blue-600">
              {totalPrice.toLocaleString("vi-VN")} ₫
            </span>
          </div>

          {/* <div className="flex gap-2">
            <button
              onClick={() => {
                onClose();
                window.location.href = "/cart";
              }}
              className="flex-1 px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm"
            >
              Tới giỏ hàng
            </button>
            <button
              onClick={() => {
                onClose();
                window.location.href = "/checkout";
              }}
              className="flex-1 px-4 py-2 rounded bg-black text-white hover:bg-gray-800 text-sm"
            >
              Tới thanh toán
            </button>
          </div> */}
          <div className="flex gap-2">
            {/* Nút Tới giỏ hàng (nút phụ) */}
            <button
              onClick={() => {
                onClose();
                window.location.href = "/cart";
              }}
              className="flex-1 px-4 py-2 rounded-xl bg-[#FFF0E6] text-[#E55300] hover:bg-[#FFE3D6] text-sm font-medium border border-[#E55300] transition"
            >
              Tới giỏ hàng
            </button>

            {/* Nút Tới thanh toán (nút chính) */}
            <button
              onClick={() => {
                onClose();
                window.location.href = "/checkout";
              }}
              className="flex-1 px-4 py-2 rounded-xl bg-[#E55300] text-white hover:bg-[#cc4400] text-sm font-semibold transition"
            >
              Tới thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
