

export interface ProductImage {
  id: number;
  product_id: number;
  name: string;
  color?: string;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  img_id: number;
  size: string;
  color?: string;
  price: number;
  sale_price: string | null;
  stock_quantity: number;
  status: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  status: string;
  img: ProductImage[];
  images: string[];
  variant: ProductVariant[];
  category_id: number;
  category: { id: number; name: string };
  hot?: boolean;
  slug?: string;
}