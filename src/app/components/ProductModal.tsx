"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactImageMagnify from "react-image-magnify";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

interface ProductImage {
  id: number;
  product_id: number;
  name: string;
}

interface ProductVariant {
  id: number;
  product_id: number;
  img_id: number;
  size: string;
  stock_quantity: number;
  price: number;
  sale_price: string | null;
  status: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  status: string;
  img: ProductImage[];
  variant: ProductVariant[];
  category: {
    id: number;
    name: string;
  };
}

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart();

  const [mainImage, setMainImage] = useState(product.img[0]?.name);
  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(product.variant[0]);

  const handleImageClick = (img: ProductImage) => {
    setMainImage(img.name);
    const variantForImage = product.variant.find((v) => v.img_id === img.id);
    if (variantForImage) setSelectedVariant(variantForImage);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white p-6 rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto relative shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT: IMAGE */}
            <div>
              <div className="w-full aspect-square relative mb-3 rounded-lg overflow-hidden shadow">
                {mainImage && (
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Main Product Image",
                        isFluidWidth: true,
                        src: `/img/${mainImage}`,
                      },
                      largeImage: {
                        src: `/img/${mainImage}`,
                        width: 1200,
                        height: 1200,
                      },
                      enlargedImageContainerStyle: { zIndex: 9999 },
                    }}
                  />
                )}
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {product.img.map((img) => (
                  <Image
                    key={img.id}
                    src={`/img/${img.name}`}
                    alt={img.name}
                    width={80}
                    height={80}
                    className={`rounded-lg object-cover border cursor-pointer transition-transform duration-200 hover:scale-105 ${
                      img.name === mainImage
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleImageClick(img)}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT: INFO */}
            <div className="text-sm space-y-3">
              <p className="font-semibold text-base">
                <strong>Danh mục:</strong> {product.category.name}
              </p>
              <p className="font-semibold text-base">
                <strong>Mô tả:</strong> {product.description}
              </p>
              <p className="font-semibold text-base">
                <strong>Trạng thái sản phẩm:</strong> {product.status}
              </p>

              {/* {selectedVariant ? (
                <>
                  <div className="mt-4">
                    <label className="block mb-2 font-semibold text-base">
                      Chọn size:
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {product.variant.map((v) => {
                        const isSelected = selectedVariant?.id === v.id;
                        const isOutOfStock = v.stock_quantity === 0;

                        return (
                          <motion.button
                            layout
                            whileHover={!isOutOfStock ? { scale: 1.05 } : {}}
                            whileTap={!isOutOfStock ? { scale: 0.95 } : {}}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                            key={v.id}
                            onClick={() => {
                              if (!isOutOfStock) {
                                setSelectedVariant(v);
                                const imgForVariant = product.img.find(
                                  (img) => img.id === v.img_id
                                );
                                if (imgForVariant)
                                  setMainImage(imgForVariant.name);
                              }
                            }}
                            disabled={isOutOfStock}
                            className={`relative px-5 py-2 rounded-full border text-sm font-semibold transition-all duration-200 
                              ${
                                isSelected
                                  ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200"
                                  : isOutOfStock
                                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                  : "bg-white text-gray-800 border-gray-300 hover:border-blue-400"
                              }`}
                          >
                            {v.size}

                            {isSelected && (
                              <motion.span
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 10,
                                }}
                                className="absolute -top-1.5 -right-1.5 bg-white rounded-full p-1 shadow text-green-500 text-xs"
                              >
                                ✅
                              </motion.span>
                            )}

                            {isOutOfStock && (
                              <span className="absolute inset-0 bg-white/60 rounded-full pointer-events-none"></span>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-base font-semibold">
                    <p>Size: {selectedVariant.size}</p>
                    <p>
                      Giá: {selectedVariant.price.toLocaleString("vi-VN")} ₫
                    </p>
                    <p>
                      Giá KM:{" "}
                      {selectedVariant.sale_price
                        ? `${parseInt(
                            selectedVariant.sale_price
                          ).toLocaleString("vi-VN")} ₫`
                        : "—"}
                    </p>
                    <p
                      className={
                        selectedVariant.stock_quantity === 0
                          ? "text-red-600"
                          : ""
                      }
                    >
                      Tồn kho: {selectedVariant.stock_quantity}
                    </p>
                    <p>Trạng thái: {selectedVariant.status}</p>

                    {selectedVariant.stock_quantity === 0 ? (
                      <div className="text-red-600 font-medium mt-2">
                        ⚠️ Sản phẩm này hiện đã hết hàng.
                      </div>
                    ) : (
                      // <motion.button
                      //   whileHover={{ scale: 1.05 }}
                      //   whileTap={{ scale: 0.95 }}
                      //   className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
                      // >
                      //   Thêm vào giỏ hàng
                      // </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
                        onClick={() => {
                          if (selectedVariant) {
                            addToCart({
                              productId: product.id,
                              variantId: selectedVariant.id,
                              name: product.name,
                              img: `/img/${mainImage}`,
                              price: selectedVariant.price,
                              sale_price: selectedVariant.sale_price,
                              size: selectedVariant.size,
                              quantity: 1,
                              variantList: product.variant,
                            });
                            toast.success("Đã thêm vào giỏ hàng!");
                          }
                        }}
                      >
                        Thêm vào giỏ hàng
                      </motion.button>
                    )}
                  </div>
                </>
              ) : (
                <p className="mt-4 text-red-500 font-medium">
                  Không có biến thể.
                </p>
              )} */}
              {selectedVariant ? (
                <>
                  <div className="mt-4">
                    <label className="block mb-2 font-semibold text-base">
                      Chọn size:
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {product.variant.map((v) => {
                        const isSelected = selectedVariant?.id === v.id;
                        const isOutOfStock = v.stock_quantity === 0;

                        return (
                          <motion.button
                            layout
                            whileHover={!isOutOfStock ? { scale: 1.05 } : {}}
                            whileTap={!isOutOfStock ? { scale: 0.95 } : {}}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                            key={v.id}
                            onClick={() => {
                              if (!isOutOfStock) {
                                setSelectedVariant(v);
                                const imgForVariant = product.img.find(
                                  (img) => img.id === v.img_id
                                );
                                if (imgForVariant)
                                  setMainImage(imgForVariant.name);
                              }
                            }}
                            disabled={isOutOfStock}
                            className={`relative px-5 py-2 rounded-full border text-sm font-semibold transition-all duration-200 
                ${
                  isSelected
                    ? "bg-[#FF5722] text-white border-[#FF5722] shadow-md"
                    : isOutOfStock
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-white text-[#FF5722] border-[#FF5722] hover:bg-[#FF5722]/10"
                }`}
                          >
                            {v.size}

                            {isSelected && (
                              <motion.span
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 10,
                                }}
                                className="absolute -top-1.5 -right-1.5 bg-white rounded-full p-1 shadow text-green-500 text-xs"
                              >
                                ✅
                              </motion.span>
                            )}

                            {isOutOfStock && (
                              <span className="absolute inset-0 bg-white/60 rounded-full pointer-events-none"></span>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-base font-semibold">
                    <p>Size: {selectedVariant.size}</p>
                    <p>
                      Giá: {selectedVariant.price.toLocaleString("vi-VN")} ₫
                    </p>
                    <p>
                      Giá KM:{" "}
                      {selectedVariant.sale_price
                        ? `${parseInt(
                            selectedVariant.sale_price
                          ).toLocaleString("vi-VN")} ₫`
                        : "—"}
                    </p>
                    <p
                      className={
                        selectedVariant.stock_quantity === 0
                          ? "text-red-600"
                          : ""
                      }
                    >
                      Tồn kho: {selectedVariant.stock_quantity}
                    </p>
                    <p>Trạng thái: {selectedVariant.status}</p>

                    {selectedVariant.stock_quantity === 0 ? (
                      <div className="text-red-600 font-medium mt-2">
                        ⚠️ Sản phẩm này hiện đã hết hàng.
                      </div>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-3 px-6 py-3 bg-[#FF5722] hover:bg-[#F44336] text-white rounded-2xl shadow-md transition-colors duration-200"
                        onClick={() => {
                          if (selectedVariant) {
                            addToCart({
                              productId: product.id,
                              variantId: selectedVariant.id,
                              name: product.name,
                              img: `/img/${mainImage}`,
                              price: selectedVariant.price,
                              sale_price: selectedVariant.sale_price,
                              size: selectedVariant.size,
                              quantity: 1,
                              variantList: product.variant,
                            });
                            toast.success("Đã thêm vào giỏ hàng!");
                          }
                        }}
                      >
                        Thêm vào giỏ hàng
                      </motion.button>
                    )}
                  </div>
                </>
              ) : (
                <p className="mt-4 text-red-500 font-medium">
                  Không có biến thể.
                </p>
              )}
            </div>
          </div>

          {/* TABLE */}
          <div className="mt-6">
            <strong className="text-base font-semibold">
              Tất cả biến thể:
            </strong>
            <table className="w-full mt-2 text-sm border-collapse">
              <thead>
                <tr className="border-b bg-gray-100 text-base font-semibold">
                  <th className="py-2 px-3 text-left">Size</th>
                  <th className="py-2 px-3 text-left">Giá</th>
                  <th className="py-2 px-3 text-left">Giá KM</th>
                  <th className="py-2 px-3 text-left">Tồn kho</th>
                  <th className="py-2 px-3 text-left">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {product.variant.map((variant) => (
                  <tr
                    key={variant.id}
                    className="border-b hover:bg-gray-50 transition-all"
                  >
                    <td className="py-2 px-3">{variant.size}</td>
                    <td className="py-2 px-3">
                      {variant.price.toLocaleString("vi-VN")} ₫
                    </td>
                    <td className="py-2 px-3">
                      {variant.sale_price
                        ? `${parseInt(variant.sale_price).toLocaleString(
                            "vi-VN"
                          )} ₫`
                        : "—"}
                    </td>
                    <td className="py-2 px-3">{variant.stock_quantity}</td>
                    <td className="py-2 px-3">{variant.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
