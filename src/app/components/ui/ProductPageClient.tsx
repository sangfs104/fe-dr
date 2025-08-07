// import React, { useEffect, useState } from "react";
// import ProductCard from "../../components/ui/ProductCard";
// import BreadcrumbFilter from "./Sort";
// import HeaderHome from "./Header";
// import Footer from "./Footer";

// export default function ProductPageClient() {
//   const [products, setProducts] = useState([]);

//   // Load sản phẩm ban đầu
//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/products")
//       .then((res) => res.json())
//       .then((json) => setProducts(json.data.data))
//       .catch((err) => console.error("Lỗi khi lấy sản phẩm:", err));
//   }, []);

//   return (
//     <>
//       <HeaderHome />
//       <BreadcrumbFilter onFilter={setProducts} />
//       <div className="px-24 py-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }
