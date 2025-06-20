// // // import ProductDetailClient from "./ProductDetailPage";
// // // import HeaderHome from "../../components/Header";
// // // async function getProduct(id: string) {
// // //   try {
// // //     const res = await fetch(`http://127.0.0.1:8000/product/${id}`, {
// // //       cache: "no-store",
// // //     });
// // //     const data = await res.json();
// // //     return data.data;
// // //   } catch (err) {
// // //     return null;
// // //   }
// // // }
// // // export default async function ProductDetailPage({
// // //   params,
// // // }: {
// // //   params: { id: string };
// // // }) {
// // //   const product = await getProduct(params.id);

// // //   if (!product) {
// // //     return <div className="p-6 text-red-500">Sản phẩm không tồn tại.</div>;
// // //   }

// // //   return (
// // //     <>
// // //       <HeaderHome />
// // //       <ProductDetailClient product={product} />
// // //     </>
// // //   );
// // // }
// // import ProductDetailClient from "./ProductDetailPage";
// // import HeaderHome from "../../components/Header";
// // import Footer from "../../components/Footer";
// // import CheckoutProgress from "../../components/CheckoutProgress";
// // async function getProduct(id: string) {
// //   try {
// //     const res = await fetch(`http://127.0.0.1:8000/product/${id}`, {
// //       cache: "no-store",
// //     });
// //     const data = await res.json();
// //     return data.data;
// //   } catch (err) {
// //     return null;
// //   }
// // }

// // async function getProductReviews(productId: number) {
// //   try {
// //     const res = await fetch(`http://127.0.0.1:8000/api/review`, {
// //       cache: "no-store",
// //     });
// //     const data = await res.json();
// //     return data.data.filter((review: any) => review.product_id === productId);
// //   } catch (err) {
// //     return [];
// //   }
// // }

// // export default async function ProductDetailPage({
// //   params,
// // }: {
// //   params: { id: string };
// // }) {
// //   const product = await getProduct(params.id);

// //   if (!product) {
// //     return <div className="p-6 text-red-500">Sản phẩm không tồn tại.</div>;
// //   }

// //   const reviews = await getProductReviews(product.id);

// //   return (
// //     <>
// //       <HeaderHome />
// //       <CheckoutProgress currentStep="detail" />

// //       <ProductDetailClient product={product} reviews={reviews} />
// //       <Footer></Footer>
// //     </>
// //   );
// // }

// import ProductDetailClient from "./ProductDetailPage";
// import HeaderHome from "../../components/Header";
// import Footer from "../../components/Footer";
// import CheckoutProgress from "../../components/CheckoutProgress";

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

// async function getProductReviews(productId: number) {
//   try {
//     const res = await fetch(`http://127.0.0.1:8000/api/review/${productId}`, {
//       cache: "no-store",
//     });
//     const data = await res.json();
//     return data.data; // Đã là mảng review đúng cho sản phẩm
//   } catch (err) {
//     return [];
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

//   const reviews = (await getProductReviews(product.id)) || []; // Đảm bảo luôn là mảng

//   return (
//     <>
//       <HeaderHome />
//       <CheckoutProgress currentStep="detail" />
//       {/* <ProductDetailClient product={product} reviews={reviews} /> */}
//       <ProductDetailClient product={product} reviews={reviews} />
//       <Footer />
//     </>
//   );
// }
import ProductDetailClient from "./ProductDetailPage";
import HeaderHome from "../../components/Header";
import Footer from "../../components/Footer";
import CheckoutProgress from "../../components/CheckoutProgress";

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
    const res = await fetch(`http://127.0.0.1:8000/api/review/${productId}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.data; // Đã là mảng review đúng cho sản phẩm
  } catch (err) {
    return [];
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const productRaw = await getProduct(params.id);

  if (!productRaw) {
    return <div className="p-6 text-red-500">Sản phẩm không tồn tại.</div>;
  }

  // Đảm bảo img và variant luôn là mảng
  const product = {
    ...productRaw,
    img: Array.isArray(productRaw.img) ? productRaw.img : [],
    variant: Array.isArray(productRaw.variant) ? productRaw.variant : [],
  };

  const reviews = (await getProductReviews(product.id)) || [];

  return (
    <>
      <HeaderHome />
      <CheckoutProgress currentStep="detail" />
      <ProductDetailClient product={product} reviews={reviews} />
      <Footer />
    </>
  );
}
