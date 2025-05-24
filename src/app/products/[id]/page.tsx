// import Image from "next/image";

// type Params = {
//   params: {
//     id: string;
//   };
// };

// async function getProduct(id: string) {
//   const res = await fetch(`http://127.0.0.1:8000/product/${id}`);
//   const json = await res.json();
//   return json.data;
// }

// export default async function ProductDetailPage({ params }: Params) {
//   const product = await getProduct(params.id);

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold">{product.name}</h1>
//       <p className="text-gray-600 mb-4">{product.description}</p>

//       {/* Ảnh sản phẩm */}
//       <div className="flex gap-4 overflow-x-auto mb-4">
//         {product.img.map((image: any) => (
//           <Image
//             key={image.id}
//             src={`/img/${image.name}`}
//             alt={product.name}
//             width={150}
//             height={150}
//             className="rounded"
//           />
//         ))}
//       </div>

//       {/* Biến thể sản phẩm */}
//       <h2 className="text-xl font-semibold">Tất cả biến thể:</h2>
//       <div className="grid gap-3 mt-2">
//         {product.variant.map((v: any) => (
//           <div key={v.id} className="border p-2 rounded bg-gray-50">
//             <p>
//               <span className="font-medium">Size:</span> {v.size} |{" "}
//               <span className="font-medium">Màu:</span> {v.color}
//             </p>
//             <p>
//               <span className="font-medium">Giá:</span>{" "}
//               {v.sale_price ? (
//                 <>
//                   <span className="line-through text-red-500">
//                     {v.price.toLocaleString()}đ
//                   </span>{" "}
//                   <span className="text-green-600 font-semibold">
//                     {v.sale_price.toLocaleString()}đ
//                   </span>
//                 </>
//               ) : (
//                 <span>{v.price.toLocaleString()}đ</span>
//               )}
//             </p>
//             <p>
//               <span className="font-medium">Tồn kho:</span> {v.stock_quantity} |{" "}
//               <span className="font-medium">Trạng thái:</span> {v.status}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// // app/products/[id]/page.tsx

// import { notFound } from "next/navigation";
// import ProductDetailPageClient from "./ProductDetailPageClient";

// type Params = {
//   params: { id: string };
// };

// async function getProduct(id: string) {
//   const res = await fetch(`http://127.0.0.1:8000/product/${id}`);
//   if (!res.ok) return null;
//   const json = await res.json();
//   return json.data;
// }

// export default async function ProductDetailPage({ params }: Params) {
//   const product = await getProduct(params.id);

//   if (!product) return notFound();

//   return <ProductDetailPageClient product={product} />;
// }

// import ProductDetailClient from "./ProductDetailClient"; // tạo file mới bên dưới

// type Params = {
//   params: {
//     id: string;
//   };
// };

// async function getProduct(id: string) {
//   const res = await fetch(`http://127.0.0.1:8000/product/${id}`, {
//     cache: "no-store", // không cache nếu dùng dữ liệu động
//   });
//   const json = await res.json();
//   return json.data;
// }

// export default async function ProductDetailPage({ params }: Params) {
//   const product = await getProduct(params.id);

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <ProductDetailClient product={product} />
//     </div>
//   );
// }
// app/products/[id]/page.tsx

import ProductDetail from "./ProductDetail";
async function getProduct(id: string) {
  const res = await fetch(`http://127.0.0.1:8000/product/${id}`, {
    cache: "no-store", // tránh cache khi phát triển
  });
  const data = await res.json();
  return data.data;
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  return (
    <main className="p-4">
      <ProductDetail product={product} />
    </main>
  );
}
