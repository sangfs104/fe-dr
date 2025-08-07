"use client";

import { use, useEffect, useState, useRef } from "react";

import CheckoutProgress from "../../components/ui/CheckoutProgress";
import ProductDetailClient from "./ProductDetailPage";
import ProductList1 from "../../components/ui/ProductList1";
import type { Product } from "../../types/Product"; // đường dẫn có thể cần chỉnh lại

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // unwrap `params` using `use()`
  const { id: productId } = use(params);

  // const [product, setProduct] = useState<any>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState([]);
  const [sameCategoryProducts, setSameCategoryProducts] = useState([]);
  const didFetch = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (didFetch.current) return;
    didFetch.current = true;

    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const headers = { Authorization: token ? `Bearer ${token}` : "" };

      try {
        const productRes = await fetch(
          `http://localhost:8000/api/product/${productId}`,
          { headers }
        );
        const productData = await productRes.json();
        const rawProduct = productData.data;

        const categoryId =
          rawProduct.category_id ?? rawProduct.category?.id ?? null;

        const [reviewsRes, productsByCatRes] = await Promise.all([
          fetch(`http://localhost:8000/api/review/${rawProduct.id}`, {
            headers,
          }),
          fetch(
            `http://localhost:8000/api/products-by-category?category_id=${categoryId}`,
            { headers }
          ),
        ]);

        const reviewsData = await reviewsRes.json();
        const productsData = await productsByCatRes.json();

        const finalProduct = {
          ...rawProduct,
          img: Array.isArray(rawProduct.img) ? rawProduct.img : [],
          variant: Array.isArray(rawProduct.variant) ? rawProduct.variant : [],
        };

        setProduct(finalProduct);
        setReviews(reviewsData.data || []);
        setSameCategoryProducts(
          (Array.isArray(productsData.data) ? productsData.data : []).filter(
          (p: Product) => p.id !== finalProduct.id
          )
        );
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    };

    fetchData();
  }, [productId]);

  return (
    <>
      <CheckoutProgress currentStep="detail" />

      {!product ? (
        <div className="p-6 text-center text-gray-500">
          <span className="animate-pulse">Đang tải sản phẩm...</span>
        </div>
      ) : (
        <>
          <ProductDetailClient product={product} reviews={reviews} />
          <div className="max-w-7xl mx-auto px-12 py-10">
            <h2 className="text-2xl font-bold ">Sản phẩm cùng danh mục</h2>
            <ProductList1 products={sameCategoryProducts} />
          </div>
        </>
      )}
    </>
  );
}
