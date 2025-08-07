// "use client";
// import { useState, useEffect } from "react";
// import ProductCard from "../components/ProductList";

// export default function ProductPage() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const url = "http://127.0.0.1:8000/api/product";

//       try {
//         const res = await fetch(url);
//         const json = await res.json();
//         console.log("API response:", json);

//         if (json.status === 200) {
//           const productList = Array.isArray(json.data)
//             ? json.data
//             : Array.isArray(json.data?.data)
//             ? json.data.data
//             : [];

//           setProducts(productList);
//         } else {
//           console.warn("Dữ liệu không hợp lệ:", json);
//           setProducts([]);
//         }
//       } catch (error) {
//         console.error("Lỗi khi fetch sản phẩm:", error);
//         setProducts([]);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="px-6 md:px-20 lg:px-40 py-6">
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>

//       {products.length === 0 && (
//         <div className="text-center py-10 text-gray-500">
//           Không có sản phẩm phù hợp.
//         </div>
//       )}
//     </div>
//   );
// }
