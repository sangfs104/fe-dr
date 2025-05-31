// import ProductDetailClient from "./ProductDetailPage";
// import HeaderHome from "../../components/Header";
// async function getProduct(id: string) {
//   try {
//     const res = await fetch(`http://127.0.0.1:8000/product/${id}`, {
//       cache: "no-store",
//     });
//     const data = await res.json();
//     return data.data;
//   } catch (err) {
//     return null;
//   }
// }
// export default async function ProductDetailPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const product = await getProduct(params.id);

//   if (!product) {
//     return <div className="p-6 text-red-500">Sản phẩm không tồn tại.</div>;
//   }

//   return (
//     <>
//       <HeaderHome />
//       <ProductDetailClient product={product} />
//     </>
//   );
// }
import ProductDetailClient from "./ProductDetailPage";
import HeaderHome from "../../components/Header";

async function getProduct(id: string) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/product/${id}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.data;
  } catch (err) {
    return null;
  }
}

async function getProductReviews(productId: number) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/review`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.data.filter((review: any) => review.product_id === productId);
  } catch (err) {
    return [];
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) {
    return <div className="p-6 text-red-500">Sản phẩm không tồn tại.</div>;
  }

  const reviews = await getProductReviews(product.id);

  return (
    <>
      <HeaderHome />
      <ProductDetailClient product={product} reviews={reviews} />
    </>
  );
}
