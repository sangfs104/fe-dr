// lib/getProductDetailData.ts
export async function getProductDetailData(productId: string) {
  const res = await fetch(`http://localhost:8000/api/product/${productId}`, {
    cache: "no-store",
  });
  const productRes = await res.json();
  const rawProduct = productRes.data;

  const categoryId =
    rawProduct.category_id ?? rawProduct.category?.id ?? null;

  const [reviewsRes, relatedProductsRes] = await Promise.all([
    fetch(`http://localhost:8000/api/review/${rawProduct.id}`),
    fetch(
      `http://localhost:8000/api/products-by-category?category_id=${categoryId}`
    ),
  ]);

  const reviews = await reviewsRes.json();
  const relatedProducts = await relatedProductsRes.json();

  const product = {
    ...rawProduct,
    img: Array.isArray(rawProduct.img) ? rawProduct.img : [],
    variant: Array.isArray(rawProduct.variant) ? rawProduct.variant : [],
  };

  return {
    product,
    reviews: reviews.data || [],
    sameCategoryProducts: (Array.isArray(relatedProducts.data)
      ? relatedProducts.data
      : []
    ).filter((p: any) => p.id !== rawProduct.id),
  };
}
