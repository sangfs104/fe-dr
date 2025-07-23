export interface CartItem {
  productId: number | string;
  variantId: number | string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  img: string; 
   sale_price?: string | null; 
}
