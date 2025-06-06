// src/types/cart.ts
export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  img: string;
}
