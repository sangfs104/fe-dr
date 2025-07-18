"use client";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  removeFromWishlistAPI,
  clearWishlist,
  fetchWishlist,
} from "@/store/wishlistSlice";
import Image from "next/image";
import toast from "react-hot-toast";
import { X, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";

export default function WishlistModal({ onClose }: { onClose: () => void }) {
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const dispatch = useAppDispatch();
  const [removingId, setRemovingId] = useState<number | null>(null);

  const handleRemove = async (productId: number) => {
    setRemovingId(productId);
    const result = await dispatch(removeFromWishlistAPI(productId));
    if (removeFromWishlistAPI.fulfilled.match(result)) {
      await dispatch(fetchWishlist());
      toast.success("Đã xóa khỏi wishlist", { duration: 2000 });
    } else {
      toast.error("Có lỗi khi xóa khỏi wishlist", { duration: 2000 });
    }
    setRemovingId(null);
  };

  const handleClear = async () => {
    setRemovingId(-1); // Indicate clearing all
    for (const item of wishlist) {
      await dispatch(removeFromWishlistAPI(item.productId));
    }
    dispatch(clearWishlist());
    toast.success("Đã xóa tất cả sản phẩm yêu thích", { duration: 2000 });
    await dispatch(fetchWishlist());
    setRemovingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-black/60 to-black/40 flex items-center justify-center p-4 font-sans">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md p-6 border border-white/20 max-h-[90vh] overflow-y-auto transition-all duration-300 hover:shadow-2xl">
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
              {wishlist.map((item) => (
                <li
                  key={`${item.productId}-${item.variantId}`}
                  className="grid grid-cols-[80px_1fr_auto] items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200"
                >
                  <Image
                    src={
                      item.img &&
                      typeof item.img === "string" &&
                      item.img.trim() !== ""
                        ? `/img/${item.img}`
                        : "/img/no-image.png"
                    }
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg border border-white/20 object-cover transform hover:scale-105 transition-transform duration-200"
                  />
                  <div>
                    <div className="font-semibold text-white text-lg">
                      {item.name}
                    </div>
                    <div className="text-sm text-white/60 mt-1">
                      Size: {item.size}
                    </div>
                    <div className="text-white/60 font-bold text-lg mt-1">
                      {typeof item.price === "number"
                        ? item.price.toLocaleString("vi-VN")
                        : "—"}
                      ₫
                    </div>
                  </div>
                  <button
                    className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-full hover:bg-red-500/20 disabled:opacity-50"
                    onClick={() => handleRemove(item.productId)}
                    disabled={removingId === item.productId}
                    aria-label="Xóa sản phẩm"
                  >
                    {removingId === item.productId ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <Trash2 size={20} />
                    )}
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="mt-6 w-full px-4 py-3 bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] text-white rounded-lg hover:from-[#FF7043] hover:via-[#FF5722] hover:to-[#FF8A50] transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              onClick={handleClear}
              disabled={removingId !== null}
            >
              {removingId === -1 ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Trash2 size={20} />
              )}
              Xóa tất cả
            </button>
          </>
        )}
      </div>
    </div>
  );
}
