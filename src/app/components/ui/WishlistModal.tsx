"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  removeFromWishlistAPI,
  clearWishlist,
  fetchWishlist,
  setSelectedForPayment, // Thêm action mới
} from "@/store/wishlistSlice";
import Image from "next/image";
import toast from "react-hot-toast";
import { X, Trash2, Loader2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface WishlistItem {
  productId: number;
  variantId: number;
  name: string;
  img: string | string[];
  size: string;
  price: number;
  salePrice?: number;
  quantity?: number; // Thêm quantity nếu cần
}

export default function WishlistModal({ onClose }: { onClose: () => void }) {
  const wishlist = useAppSelector(
    (state) => state.wishlist.items
  ) as WishlistItem[];
  const dispatch = useAppDispatch();
  const [removingKey, setRemovingKey] = useState<string | null>(null);
  const router = useRouter();
  const [selected, setSelected] = useState<number[]>([]);

  const handleRemove = async (productId: number, variantId: number) => {
    const key = `${productId}-${variantId}`;
    setRemovingKey(key);

    const result = await dispatch(
      removeFromWishlistAPI({ productId, variantId })
    );
    if (removeFromWishlistAPI.fulfilled.match(result)) {
      await dispatch(fetchWishlist());
      toast.success("Đã xóa khỏi wishlist", { duration: 2000 });
    } else {
      toast.error("Có lỗi khi xóa khỏi wishlist", { duration: 2000 });
    }

    setRemovingKey(null);
  };

  const handleClear = async () => {
    setRemovingKey("all");
    for (const item of wishlist) {
      await dispatch(
        removeFromWishlistAPI({
          productId: item.productId,
          variantId: item.variantId,
        })
      );
    }
    dispatch(clearWishlist());
    toast.success("Đã xóa tất cả sản phẩm yêu thích", { duration: 2000 });
    await dispatch(fetchWishlist());
    setRemovingKey(null);
  };

  const handleGoToPayment = () => {
    if (selected.length === 0) {
      toast.error("Bạn chưa chọn sản phẩm nào!");
      return;
    }

    // Lưu danh sách sản phẩm được chọn vào Redux
    const selectedItems = wishlist
      .filter((item) => selected.includes(item.productId))
      .map((item) => ({ ...item, quantity: 1 })); // Thêm quantity mặc định
    dispatch(setSelectedForPayment(selectedItems));

    router.push("/payment");
    onClose();
  };

  const handleCheck = (productId: number) => {
    setSelected((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 font-sans">
      <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl w-full max-w-md p-6 border border-white/20 max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-white/80 hover:text-red-400 transition-colors transform hover:scale-110"
          onClick={onClose}
          aria-label="Đóng"
        >
          <X size={28} />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">
          Sản phẩm yêu thích
        </h2>

        {wishlist.length === 0 ? (
          <div className="text-white/70 text-center py-12">
            <p className="text-lg">
              Chưa có sản phẩm nào trong danh sách yêu thích.
            </p>
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {wishlist.map((item) => {
                const key = `${item.productId}-${item.variantId}`;
                const isRemoving = removingKey === key;
                const imageSrc = Array.isArray(item.img)
                  ? item.img[0]
                  : item.img || "/img/no-image.png";

                return (
                  <li
                    key={key}
                    className="grid grid-cols-[32px_80px_1fr_auto] items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition"
                  >
                    <input
                      type="checkbox"
                      checked={selected.includes(item.productId)}
                      onChange={() => handleCheck(item.productId)}
                      className="accent-[#FF5722] w-5 h-5"
                    />
                    <div
                      className="cursor-pointer"
                      onClick={() => router.push(`/products/${item.productId}`)}
                    >
                      <Image
                        src={imageSrc}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg border border-white/20 object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-base">
                        {item.name}
                      </div>
                      <div className="text-sm text-white/60 mt-1">
                        Size: {item.size}
                      </div>
                      <div className="mt-1 text-white/80 font-bold text-base">
                        {item.salePrice && item.salePrice < item.price ? (
                          <>
                            <span className="line-through text-sm text-white/40 mr-2">
                              {item.price.toLocaleString("vi-VN")} ₫
                            </span>
                            <span className="text-orange-400">
                              {item.salePrice.toLocaleString("vi-VN")} ₫
                            </span>
                          </>
                        ) : (
                          <>{item.price.toLocaleString("vi-VN")} ₫</>
                        )}
                      </div>
                    </div>
                    <button
                      className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-500/20 disabled:opacity-50"
                      onClick={() =>
                        handleRemove(item.productId, item.variantId)
                      }
                      disabled={isRemoving}
                      aria-label="Xóa"
                    >
                      {isRemoving ? (
                        <Loader2 size={20} className="animate-spin" />
                      ) : (
                        <Trash2 size={20} />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
            <button
              className="mt-6 w-full px-4 py-3 bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] text-white rounded-lg hover:brightness-110 transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
              onClick={handleClear}
              disabled={removingKey !== null}
            >
              {removingKey === "all" ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Trash2 size={20} />
              )}
              Xóa tất cả
            </button>
            <button
              className="mt-3 w-full px-4 py-3 bg-[#FF5722] text-white rounded-lg font-semibold hover:brightness-110 transition-all flex items-center justify-center gap-2"
              onClick={handleGoToPayment}
            >
              <ShoppingCart size={20} />
              Mua sản phẩm đã chọn
            </button>
          </>
        )}
      </div>
    </div>
  );
}
