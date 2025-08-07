"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactImageMagnify from "react-image-magnify";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";

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
  final_price?: number | null;
  status: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  status: string;
  img: ProductImage[];
  images: string[];
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
  const dispatch = useAppDispatch();

  const [mainImage, setMainImage] = useState(
    product.images[0] || product.img[0]?.name || ""
  );

  const [selectedVariant, setSelectedVariant] = useState<
    ProductVariant | undefined
  >(product.variant[0]);

  const getImageSrc = (image: string) => {
    return image.startsWith("http") ? image : `/img/${image}`;
  };

  const getPriceToUse = (variant: ProductVariant) => {
    if (variant.final_price && variant.final_price > 0)
      return variant.final_price;
    if (variant.sale_price && Number(variant.sale_price) > 0)
      return Number(variant.sale_price);
    return variant.price;
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const priceToUse = getPriceToUse(selectedVariant);
    dispatch(
      addToCart({
        productId: product.id,
        variantId: selectedVariant.id,
        name: product.name,
        img: getImageSrc(mainImage),
        price: priceToUse,
        size: selectedVariant.size,
        quantity: 1,
        variantList: product.variant,
      })
    );
    toast.success("Đã thêm vào giỏ hàng");
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-2 sm:px-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white p-4 sm:p-6 rounded-2xl w-full max-w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
          <button
            className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-500 hover:text-black text-xl sm:text-2xl"
            onClick={onClose}
          >
            &times;
          </button>

          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            {product.name}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* LEFT IMAGE */}
            <div>
              <div className="w-full aspect-square relative mb-2 sm:mb-3 rounded-lg overflow-hidden shadow">
                {mainImage && (
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Main Product Image",
                        isFluidWidth: true,
                        src: getImageSrc(mainImage),
                      },
                      largeImage: {
                        src: getImageSrc(mainImage),
                        width: 1200,
                        height: 1200,
                      },
                      enlargedImageContainerStyle: {
                        zIndex: 9999,
                        display: "block",
                      },
                      isActivatedOnTouch: true,
                      enlargedImagePosition: "beside",
                      enlargedImageContainerDimensions: {
                        width: "150%",
                        height: "100%",
                      },
                    }}
                  />
                )}
              </div>
              <div className="flex gap-2 overflow-x-auto py-2">
                {product.images.map((image, index) => (
                  <Image
                    key={index}
                    src={getImageSrc(image)}
                    alt={`Product image ${index + 1}`}
                    width={60}
                    height={60}
                    className={`rounded-lg object-cover border cursor-pointer transition-transform duration-200 hover:scale-105 sm:w-20 sm:h-20 ${
                      image === mainImage
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => {
                      setMainImage(image);
                      const imgObj = product.img.find(
                        (img) => img.name === image.split("/").pop()
                      );
                      const variantForImage = product.variant.find(
                        (v) => v.img_id === imgObj?.id
                      );
                      if (variantForImage) setSelectedVariant(variantForImage);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT INFO */}
            <div className="text-xs sm:text-sm space-y-2 sm:space-y-3">
              <p className="font-semibold text-sm sm:text-base">
                <strong>Danh mục:</strong> {product.category.name}
              </p>
              <p className="font-semibold text-sm sm:text-base">
                <strong>Mô tả:</strong> {product.description}
              </p>
              <p className="font-semibold text-sm sm:text-base">
                <strong>Trạng thái sản phẩm:</strong> {product.status}
              </p>

              {selectedVariant ? (
                <>
                  <div className="mt-3 sm:mt-4">
                    <label className="block mb-1 sm:mb-2 font-semibold text-sm sm:text-base">
                      Chọn size:
                    </label>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
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
                                if (imgForVariant) {
                                  const fullImageUrl = product.images.find(
                                    (img) => img.includes(imgForVariant.name)
                                  );
                                  if (fullImageUrl) setMainImage(fullImageUrl);
                                }
                              }
                            }}
                            disabled={isOutOfStock}
                            className={`relative px-3 sm:px-5 py-1 sm:py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all duration-200 
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
                                className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 bg-white rounded-full p-1 shadow text-green-500 text-[8px] sm:text-xs"
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

                  <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-2 text-sm sm:text-base font-semibold">
                    <p>Size: {selectedVariant.size}</p>
                    <p>
                      Giá gốc: {selectedVariant.price.toLocaleString("vi-VN")} ₫
                    </p>
                    <p>
                      Giá KM:{" "}
                      {selectedVariant.sale_price
                        ? `${parseInt(
                            selectedVariant.sale_price
                          ).toLocaleString("vi-VN")} ₫`
                        : "—"}
                    </p>
                    <p>
                      Giá thực tế:{" "}
                      {getPriceToUse(selectedVariant).toLocaleString("vi-VN")} ₫
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
                      <div className="text-red-600 font-medium mt-2 text-sm sm:text-base">
                        ⚠️ Sản phẩm này hiện đã hết hàng.
                      </div>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-2 sm:mt-3 px-4 sm:px-6 py-2 sm:py-3 bg-[#FF5722] hover:bg-[#F44336] text-white rounded-2xl shadow-md transition-colors duration-200 text-sm sm:text-base"
                        onClick={handleAddToCart}
                      >
                        Thêm vào giỏ hàng
                      </motion.button>
                    )}
                  </div>
                </>
              ) : (
                <p className="mt-3 sm:mt-4 text-red-500 font-medium text-sm sm:text-base">
                  Không có biến thể.
                </p>
              )}
            </div>
          </div>

          {/* TABLE */}
          <div className="mt-4 sm:mt-6">
            <strong className="text-sm sm:text-base font-semibold">
              Tất cả bảng size:
            </strong>
            <div className="overflow-x-auto">
              <table className="w-full mt-2 text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b bg-gray-100 text-sm sm:text-base font-semibold">
                    <th className="py-1 sm:py-2 px-2 sm:px-3 text-left">
                      Size
                    </th>
                    <th className="py-1 sm:py-2 px-2 sm:px-3 text-left">Giá</th>
                    <th className="py-1 sm:py-2 px-2 sm:px-3 text-left">
                      Giá KM
                    </th>
                    <th className="py-1 sm:py-2 px-2 sm:px-3 text-left">
                      Tồn kho
                    </th>
                    <th className="py-1 sm:py-2 px-2 sm:px-3 text-left">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product.variant.map((variant) => (
                    <tr
                      key={variant.id}
                      className="border-b hover:bg-gray-50 transition-all"
                    >
                      <td className="py-1 sm:py-2 px-2 sm:px-3">
                        {variant.size}
                      </td>
                      <td className="py-1 sm:py-2 px-2 sm:px-3">
                        {variant.price.toLocaleString("vi-VN")} ₫
                      </td>
                      <td className="py-1 sm:py-2 px-2 sm:px-3">
                        {variant.sale_price
                          ? `${parseInt(variant.sale_price).toLocaleString(
                              "vi-VN"
                            )} ₫`
                          : "—"}
                      </td>
                      <td className="py-1 sm:py-2 px-2 sm:px-3">
                        {variant.stock_quantity}
                      </td>
                      <td className="py-1 sm:py-2 px-2 sm:px-3">
                        {variant.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
