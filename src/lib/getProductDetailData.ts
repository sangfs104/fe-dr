// // lib/getProductDetailData.ts
// export async function getProductDetailData(productId: string) {
//   const res = await fetch(`http://localhost:8000/api/product/${productId}`, {
//     cache: "no-store",
//   });
//   const productRes = await res.json();
//   const rawProduct = productRes.data;

//   const categoryId =
//     rawProduct.category_id ?? rawProduct.category?.id ?? null;

//   const [reviewsRes, relatedProductsRes] = await Promise.all([
//     fetch(`http://localhost:8000/api/review/${rawProduct.id}`),
//     fetch(
//       `http://localhost:8000/api/products-by-category?category_id=${categoryId}`
//     ),
//   ]);

//   const reviews = await reviewsRes.json();
//   const relatedProducts = await relatedProductsRes.json();

//   const product = {
//     ...rawProduct,
//     img: Array.isArray(rawProduct.img) ? rawProduct.img : [],
//     variant: Array.isArray(rawProduct.variant) ? rawProduct.variant : [],
//   };

//   return {
//     product,
//     reviews: reviews.data || [],
//     sameCategoryProducts: (Array.isArray(relatedProducts.data)
//       ? relatedProducts.data
//       : []
//     ).filter((p: any) => p.id !== rawProduct.id),
//   };
// }
import type { Product } from "@/app/types/Product";

interface Review {
  id: number;
  content: string;
  rating?: number;
  user?: {
    name?: string;
  };
  created_at?: string;
}

interface ProductDetailData {
  product: Product;
  reviews: Review[];
  sameCategoryProducts: Product[];
}

export async function getProductDetailData(productId: string): Promise<ProductDetailData> {
  const res = await fetch(`http://localhost:8000/api/product/${productId}`, {
    cache: "no-store",
  });
  const productRes = await res.json();
  const rawProduct: Product = productRes.data;

  const categoryId =
    rawProduct.category_id ?? rawProduct.category?.id ?? null;

  const [reviewsRes, relatedProductsRes] = await Promise.all([
    fetch(`http://localhost:8000/api/review/${rawProduct.id}`),
    fetch(
      `http://localhost:8000/api/products-by-category?category_id=${categoryId}`
    ),
  ]);

  const reviews: Review[] = (await reviewsRes.json()).data || [];
  const relatedProducts = await relatedProductsRes.json();

  const product: Product = {
    ...rawProduct,
    img: Array.isArray(rawProduct.img) ? rawProduct.img : [],
    variant: Array.isArray(rawProduct.variant) ? rawProduct.variant : [],
  };

  return {
    product,
    reviews,
    sameCategoryProducts: (Array.isArray(relatedProducts.data)
      ? relatedProducts.data
      : []
    ).filter((p: Product) => p.id !== rawProduct.id),
  };
}