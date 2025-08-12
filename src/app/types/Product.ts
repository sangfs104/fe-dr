// // export type ImageType = {
// //   id: number;
// //   product_id: number;
// //   name: string;
// // };

// // export type Variant = {
// //   id: number;
// //   product_id: number;
// //   img_id: number;
// //   size: string;
// //   color: string;
// //   stock_quantity: number;
// //   price: number;
// //   // sale_price: number | null;
// //     sale_price: string | null; 
// //   status: string;
// // };

// // export type Category = {
// //   id: number;
// //   name: string;
// // };

// // export type Product = {
// //   hot: boolean;
// //   id: number;
// //   name: string;
// //   description: string;
// //   status: string;
// //   img: ImageType[];
// //   images: string[];
// //   variant: Variant[];
// //   category: Category;
// //    category_id: number;
// // };

// // export interface ProductImage {
// //   id: number;
// //   product_id: number;
// //   name: string;
// //   color?: string;
// // }

// // export interface ProductVariant {
// //   id: number;
// //   product_id: number;
// //   img_id: number;
// //   size: string;
// //   color?: string;
// //   price: number;
// //   sale_price: string | null;
// //   stock_quantity: number;
// //   status: string;
// // }

// // export interface Category {
// //   id: number;
// //   name: string;
// // }

// // export interface Product {
// //   id: number;
// //   name: string;
// //   description: string;
// //   status: string;
// //   img: ProductImage[];
// //   images: string[]; // Đảm bảo images là string[], không cho phép undefined
// //   variant: ProductVariant[];
// //   category_id: number;
// //   category?: Category;
// //   hot?: boolean; // Thêm hot để tương thích với định nghĩa thứ hai
// // }

// export interface ProductImage {
//   id: number;
//   product_id: number;
//   name: string;
//   color?: string;
// }

// export interface ProductVariant {
//   id: number;
//   product_id: number;
//   img_id: number;
//   size: string;
//   color?: string;
//   price: number;
//   sale_price: string | null;
//   stock_quantity: number;
//   status: string;
// }

// export interface Category {
//   id: number;
//   name: string;
// }

// export interface Product {
//   id: number;
//   name: string;
//   description: string;
//   status: string;
//   img: ProductImage[];
//   images: string[]; // Đảm bảo images là string[], không cho phép undefined
//   variant: ProductVariant[];
//   category_id: number;
// category: { id: number; name: string; }; // Bắt buộc category
//   hot?: boolean; // Thêm hot để tương thích nếu cần
//   slug?: string;
// }
// types/Product.ts


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