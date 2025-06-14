"use client";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  removeFromWishlistAPI,
  clearWishlist,
  fetchWishlist,
} from "@/store/wishlistSlice";
import Image from "next/image";
import toast from "react-hot-toast";

export default function WishlistModal({ onClose }: { onClose: () => void }) {
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const dispatch = useAppDispatch();

  const handleRemove = async (productId: number) => {
    const result = await dispatch(removeFromWishlistAPI(productId));
    if (removeFromWishlistAPI.fulfilled.match(result)) {
      await dispatch(fetchWishlist());
      toast.success("Đã xóa khỏi wishlist");
    } else {
      toast.error("Có lỗi khi xóa khỏi wishlist");
    }
  };

  const handleClear = async () => {
    for (const item of wishlist) {
      await dispatch(removeFromWishlistAPI(item.productId));
    }
    dispatch(clearWishlist());
    toast.success("Đã xóa tất cả sản phẩm yêu thích");
    await dispatch(fetchWishlist());
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Sản phẩm yêu thích</h2>
        {wishlist.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Chưa có sản phẩm nào trong danh sách yêu thích.
          </p>
        ) : (
          <>
            <ul className="divide-y">
              {wishlist.map((item) => (
                <li
                  key={`${item.productId}-${item.variantId}`}
                  className="flex items-center gap-4 py-3"
                >
                  <Image
                    src={
                      item.img &&
                      typeof item.img === "string" &&
                      item.img.trim() !== ""
                        ? `/img/${item.img}` // thêm dấu `/` để đúng đường dẫn public
                        : "/img/no-image.png"
                    }
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded border"
                  />

                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-500">
                      Size: {item.size}
                    </div>
                    <div className="text-orange-600 font-bold">
                      {typeof item.price === "number"
                        ? item.price.toLocaleString("vi-VN")
                        : "—"}
                      ₫
                    </div>
                  </div>
                  <button
                    className="text-xs text-red-500 hover:underline"
                    onClick={() => handleRemove(item.productId)}
                  >
                    Xóa
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
              onClick={handleClear}
            >
              Xóa tất cả
            </button>
          </>
        )}
      </div>
    </div>
  );
}
