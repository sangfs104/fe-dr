"use client";

import { useEffect, useState, useRef } from "react";
import HeaderHome from "../../components/Header";
import Footer from "../../components/Footer";
import CheckoutProgress from "../../components/CheckoutProgress";
import ProductDetailClient from "./ProductDetailPage";
import ProductList1 from "../../components/ProductList1";

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = params.id;

  const [product, setProduct] = useState<any>(null);
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
            (p: any) => p.id !== finalProduct.id
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
      <HeaderHome />
      <CheckoutProgress currentStep="detail" />

      {!product ? (
        <div className="p-6 text-center text-gray-500">
          <span className="animate-pulse">Đang tải sản phẩm...</span>
        </div>
      ) : (
        <>
          <ProductDetailClient product={product} reviews={reviews} />
          <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-bold mb-6">Sản phẩm cùng danh mục</h2>
            <ProductList1 products={sameCategoryProducts} />
          </div>
        </>
      )}
      <Footer />
    </>
  );
}
// app/product/[id]/page.

// import HeaderHome from "../../components/Header";
// import Footer from "../../components/Footer";
// import CheckoutProgress from "../../components/CheckoutProgress";
// import ProductSection from "../[id]/ProductSection";
// import ProductList1 from "../../components/ProductList1";

// async function getProductPageData(productId: string) {
//   const res = await fetch(`http://127.0.0.1:8000/api/product/${productId}`, {
//     cache: "no-store",
//   });
//   const productRes = await res.json();
//   const product = productRes.data;

//   const categoryId = product.category_id ?? product.category?.id ?? null;

//   const [reviewsRes, relatedRes] = await Promise.all([
//     fetch(`http://127.0.0.1:8000/api/review/${product.id}`),
//     fetch(
//       `http://127.0.0.1:8000/api/products-by-category?category_id=${categoryId}`
//     ),
//   ]);

//   const reviewsData = await reviewsRes.json();
//   const relatedData = await relatedRes.json();

//   return {
//     product: {
//       ...product,
//       img: Array.isArray(product.img) ? product.img : [],
//       variant: Array.isArray(product.variant) ? product.variant : [],
//     },
//     reviews: reviewsData.data || [],
//     relatedProducts: (relatedData.data || []).filter(
//       (p: any) => p.id !== product.id
//     ),
//   };
// }

// export default async function ProductPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const { product, reviews, relatedProducts } = await getProductPageData(
//     params.id
//   );

//   return (
//     <>
//       <HeaderHome />
//       <CheckoutProgress currentStep="detail" />
//       <ProductSection product={product} reviews={reviews} />
//       <div className="max-w-7xl mx-auto px-4 py-10">
//         <h2 className="text-2xl font-bold mb-6">Sản phẩm cùng danh mục</h2>
//         <ProductList1 products={relatedProducts} />
//       </div>
//       <Footer />
//     </>
//   );
// }
