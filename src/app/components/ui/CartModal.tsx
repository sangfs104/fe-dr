"use client";

import Image from "next/image";
import { ChangeEvent } from "react";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeFromCart,
  updateVariant,
  updateQuantity,
} from "@/store/cartSlice";

export default function CartModal({ onClose }: { onClose: () => void }) {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

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
      dispatch(
        updateVariant({
          productId,
          oldVariantId: currentVariantId,
          newData: {
            variantId: newVariant.id,
            price: newVariant.sale_price
              ? parseInt(newVariant.sale_price)
              : newVariant.price,
            size: newVariant.size,
          },
        })
      );
      toast.success(`Đã đổi size thành ${newVariant.size}`);
    }
  };

  const handleRemove = (productId: number, variantId: number) => {
    const item = cartItems.find(
      (i) => i.productId === productId && i.variantId === variantId
    );
    dispatch(removeFromCart({ productId, variantId }));

    if (item) {
      toast.success(`🗑️ Đã xóa "${item.name}" khỏi giỏ hàng`);
    }
  };

  const handleChangeQuantity = (
    productId: number,
    variantId: number,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ productId, variantId, newQuantity }));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[99999] flex justify-end">
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full sm:w-[400px] bg-white flex flex-col h-full shadow-xl"
      >
        {/* Header */}
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold"> Giỏ hàng</h2>
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ rotate: 90 }}
            onClick={onClose}
            className="text-gray-500 hover:text-black transition"
          >
            <X size={22} />
          </motion.button>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {cartItems.length === 0 ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-gray-500"
              >
                Giỏ hàng trống
              </motion.p>
            ) : (
              cartItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{
                    scale: 1.01,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  }}
                  className="flex gap-3 border rounded-lg p-3"
                >
                  {/* Image */}
                  <div className="w-[60px] h-[60px] shrink-0 overflow-hidden rounded">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-sm leading-snug">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {typeof item.price === "number"
                            ? item.price.toLocaleString("vi-VN")
                            : "N/A"}{" "}
                          ₫
                        </p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.8, rotate: -20 }}
                        whileHover={{ scale: 1.1, color: "#e11d48" }}
                        onClick={() =>
                          handleRemove(item.productId, item.variantId)
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </motion.button>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      {/* Size */}
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-gray-500">Size:</span>
                        <motion.select
                          whileFocus={{ scale: 1.02 }}
                          transition={{ duration: 0.2 }}
                          value={item.size}
                          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                            handleSizeChange(
                              item.productId,
                              item.variantId,
                              e.target.value
                            )
                          }
                          className="border rounded px-1 py-0.5 text-sm"
                        >
                          {Array.isArray(item.variantList) &&
                            item.variantList.map((v) => (
                              <option key={v.id} value={v.size}>
                                {v.size}
                              </option>
                            ))}
                        </motion.select>
                      </div>{" "}
                      {/* Quantity Control – Clean modern design */}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-full border border-gray-300">
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() =>
                              handleChangeQuantity(
                                item.productId,
                                item.variantId,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity <= 1}
                            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-700 disabled:opacity-50"
                          >
                            −
                          </motion.button>
                          <span className="text-sm font-medium w-5 text-center">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() =>
                              handleChangeQuantity(
                                item.productId,
                                item.variantId,
                                item.quantity + 1
                              )
                            }
                            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-700"
                          >
                            +
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-white sticky bottom-0 space-y-3">
          <div className="flex justify-between items-center text-base font-semibold">
            <span>Tổng cộng:</span>
            <span className="text-blue-600">
              {totalPrice.toLocaleString("vi-VN")} ₫
            </span>
          </div>

          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => {
                onClose();
                window.location.href = "/cart";
              }}
              className="flex-1 px-4 py-2 rounded-xl bg-[#FFF0E6] text-[#E55300] hover:bg-[#FFE3D6] text-sm font-medium border border-[#E55300] transition"
            >
              Tới giỏ hàng
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => {
                onClose();
                window.location.href = "/payment";
              }}
              className="flex-1 px-4 py-2 rounded-xl bg-[#E55300] text-white hover:bg-[#cc4400] text-sm font-semibold transition"
            >
              Tới thanh toán
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
