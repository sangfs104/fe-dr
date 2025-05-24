export type ImageType = {
  id: number;
  product_id: number;
  name: string;
};

export type Variant = {
  id: number;
  product_id: number;
  img_id: number;
  size: string;
  color: string;
  stock_quantity: number;
  price: number;
  sale_price: number | null;
  status: string;
};

export type Category = {
  id: number;
  name: string;
};

export type Product = {
  hot: boolean;
  id: number;
  name: string;
  description: string;
  status: string;
  img: ImageType[];
  variant: Variant[];
  category: Category;
};
