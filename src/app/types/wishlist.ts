import type { Product } from "./Product";

export type WishlistResponseItem = Product & {
  pivot?: {
    variant_id: number;
    user_id: number;
  };
  size?: string;
};

export interface WishlistItem {
  productId: number;
  variantId: number;
  name: string;
  img: string | string[];
  price: number;
  size: string;
  userId?: number;
salePrice?: number | null; // 👈 THÊM DÒNG NÀY
}
