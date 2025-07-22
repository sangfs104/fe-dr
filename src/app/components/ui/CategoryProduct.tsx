// // // // import { Shirt, ShoppingBag, Tags, Package, MoveDiagonal } from "lucide-react";
// // // // import ProductCard from "./ProductList";

// // // // const getCategoryIcon = (name: string) => {
// // // //   const lower = name?.toLowerCase() || "";

// // // //   if (lower.includes("bomber") || lower.includes("áo khoác"))
// // // //     return <Shirt size={48} strokeWidth={1.5} />;
// // // //   if (lower.includes("áo thun")) return <Shirt size={48} strokeWidth={1.5} />;
// // // //   if (lower.includes("quần")) return <Package size={48} strokeWidth={1.5} />;
// // // //   if (lower.includes("hoodie"))
// // // //     return <MoveDiagonal size={48} strokeWidth={1.5} />;
// // // //   if (lower.includes("túi") || lower.includes("bag"))
// // // //     return <ShoppingBag size={48} strokeWidth={1.5} />;

// // // //   return <Tags size={48} strokeWidth={1.5} />;
// // // // };

// // // // export default async function CategoryProduct() {
// // // //   const [catRes, prodRes] = await Promise.all([
// // // //     fetch("http://127.0.0.1:8000/category", { cache: "no-store" }),
// // // //     fetch("http://127.0.0.1:8000/api/product", { cache: "no-store" }),
// // // //   ]);

// // // //   const catJson = await catRes.json();
// // // //   const prodJson = await prodRes.json();

// // // //   const categories = Array.isArray(catJson.data)
// // // //     ? catJson.data.filter((c) => c.status === 1)
// // // //     : [];

// // // //   const products = Array.isArray(prodJson.data)
// // // //     ? prodJson.data
// // // //     : Array.isArray(prodJson.data?.data)
// // // //     ? prodJson.data.data
// // // //     : [];

// // // //   return (
// // // //     <div className="px-6 md:px-20 lg:px-40 py-10 bg-white">
// // // //       <div className="flex flex-col lg:flex-row gap-10">
// // // //         {/* Bên trái: danh mục */}
// // // //         <div className="w-full lg:w-1/4">
// // // //           <div className="mb-4 relative">
// // // //             <h2 className="text-white bg-sky-600 px-4 py-2 text-sm font-bold uppercase inline-block">
// // // //               DANH MỤC SẢN PHẨM
// // // //             </h2>
// // // //             <div className="h-[2px] bg-sky-600 w-1/2 mt-1"></div>
// // // //           </div>

// // // //           <div className="grid grid-cols-2 gap-4">
// // // //             {categories.map((category) => (
// // // //               <div
// // // //                 key={category.id}
// // // //                 className="border rounded-md shadow-sm p-4 flex flex-col items-center hover:shadow-lg transition duration-200 bg-white"
// // // //               >
// // // //                 <div className="w-24 h-24 mb-3 overflow-hidden flex items-center justify-center">
// // // //                   {category.image_url ? (
// // // //                     <img
// // // //                       src={`/img/${category.image_url}`}
// // // //                       alt={category.name}
// // // //                       className="object-contain w-full h-full"
// // // //                     />
// // // //                   ) : (
// // // //                     <div className="w-12 h-12">
// // // //                       {getCategoryIcon(category.name)}
// // // //                     </div>
// // // //                   )}
// // // //                 </div>
// // // //                 <h3 className="text-sm font-semibold text-sky-600 text-center uppercase">
// // // //                   {category.name}
// // // //                 </h3>
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         </div>

// // // //         {/* Bên phải: sản phẩm */}
// // // //         {/* <div className="w-full lg:w-3/4">
// // // //           <h2 className="text-lg font-bold mb-4">SẢN PHẨM QUẦN KAKI</h2>
// // // //           {products.length > 0 ? (
// // // //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
// // // //               {products.map((product) => (
// // // //                 <ProductCard key={product.id} product={product} />
// // // //               ))}
// // // //             </div>
// // // //           ) : (
// // // //             <div className="text-center py-10 text-gray-500">
// // // //               Không có sản phẩm nào.
// // // //             </div>
// // // //           )}
// // // //         </div> */}
// // // //         <div className="w-full lg:w-3/4">
// // // //           <div className="-mb-5 relative">
// // // //             <h2 className="text-white bg-sky-600 px-4 py-2 text-sm font-bold uppercase inline-block">
// // // //               SẢN PHẨM QUẦN KAKI
// // // //             </h2>
// // // //             <div className="h-[2px] bg-sky-600 w-1/2 mt-1"></div>
// // // //           </div>

// // // //           {products.length > 0 ? (
// // // //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
// // // //               {products.map((product) => (
// // // //                 <ProductCard key={product.id} product={product} />
// // // //               ))}
// // // //             </div>
// // // //           ) : (
// // // //             <div className="text-center py-10 text-gray-500">
// // // //               Không có sản phẩm nào.
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // import { Shirt, ShoppingBag, Tags, Package, MoveDiagonal } from "lucide-react";
// // // import ProductCard from "./ProductList";

// // // const getCategoryIcon = (name: string) => {
// // //   const lower = name?.toLowerCase() || "";

// // //   if (lower.includes("bomber") || lower.includes("áo khoác"))
// // //     return <Shirt size={48} strokeWidth={1.5} />;
// // //   if (lower.includes("áo thun")) return <Shirt size={48} strokeWidth={1.5} />;
// // //   if (lower.includes("quần")) return <Package size={48} strokeWidth={1.5} />;
// // //   if (lower.includes("hoodie"))
// // //     return <MoveDiagonal size={48} strokeWidth={1.5} />;
// // //   if (lower.includes("túi") || lower.includes("bag"))
// // //     return <ShoppingBag size={48} strokeWidth={1.5} />;

// // //   return <Tags size={48} strokeWidth={1.5} />;
// // // };

// // // export default async function CategoryProduct() {
// // //   const [catRes, prodRes] = await Promise.all([
// // //     fetch("http://127.0.0.1:8000/category", { cache: "no-store" }),
// // //     fetch("http://127.0.0.1:8000/api/product", { cache: "no-store" }),
// // //   ]);

// // //   const catJson = await catRes.json();
// // //   const prodJson = await prodRes.json();

// // //   const categories = Array.isArray(catJson.data)
// // //     ? catJson.data.filter((c) => c.status === 1)
// // //     : [];

// // //   const products = Array.isArray(prodJson.data)
// // //     ? prodJson.data
// // //     : Array.isArray(prodJson.data?.data)
// // //     ? prodJson.data.data
// // //     : [];

// // //   return (
// // //     <div className="px-6 md:px-20 lg:px-40 py-10 bg-white">
// // //       <div className="flex flex-col lg:flex-row gap-10">
// // //         {/* Bên trái: danh mục */}
// // //         <div className="w-full lg:w-1/4">
// // //           {/* Hình ảnh banner */}

// // //           {/* Tiêu đề danh mục */}
// // //           <div className="mb-4 relative">
// // //             <h2 className="text-white bg-sky-600 px-4 py-2 text-sm font-bold uppercase inline-block">
// // //               DANH MỤC SẢN PHẨM
// // //             </h2>
// // //             <div className="h-[2px] bg-sky-600 w-1/2 mt-1"></div>
// // //           </div>

// // //           {/* Hiển thị 6 danh mục */}
// // //           <div className="grid grid-cols-2 gap-4">
// // //             {categories.slice(0, 6).map((category) => (
// // //               <div
// // //                 key={category.id}
// // //                 className="border rounded-md shadow-sm p-4 flex flex-col items-center hover:shadow-lg transition duration-200 bg-white"
// // //               >
// // //                 <div className="w-24 h-24 mb-3 overflow-hidden flex items-center justify-center">
// // //                   {category.image_url ? (
// // //                     <img
// // //                       src={`/img/${category.image_url}`}
// // //                       alt={category.name}
// // //                       className="object-contain w-full h-full"
// // //                     />
// // //                   ) : (
// // //                     <div className="w-12 h-12">
// // //                       {getCategoryIcon(category.name)}
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //                 <h3 className="text-sm font-semibold text-sky-600 text-center uppercase">
// // //                   {category.name}
// // //                 </h3>
// // //               </div>
// // //             ))}
// // //           </div>
// // //           <div className="mb-4 mt-6">
// // //             <img
// // //               src="/img/loginae.png"
// // //               alt="Danh mục"
// // //               className="w-full h-auto rounded-md object-cover"
// // //             />
// // //           </div>
// // //         </div>

// // //         {/* Bên phải: sản phẩm */}
// // //         <div className="w-full lg:w-3/4">
// // //           <div className="-mb-5 relative">
// // //             <h2 className="text-white bg-sky-600 px-4 py-2 text-sm font-bold uppercase inline-block">
// // //               SẢN PHẨM QUẦN KAKI
// // //             </h2>
// // //             <div className="h-[2px] bg-sky-600 w-1/2 mt-1"></div>
// // //           </div>

// // //           {products.length > 0 ? (
// // //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
// // //               {products.map((product) => (
// // //                 <ProductCard key={product.id} product={product} />
// // //               ))}
// // //             </div>
// // //           ) : (
// // //             <div className="text-center py-10 text-gray-500">
// // //               Không có sản phẩm nào.
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import { Shirt, ShoppingBag, Tags, Package, MoveDiagonal } from "lucide-react";
// // import ProductCard from "./ProductList";

// // const getCategoryIcon = (name: string) => {
// //   const lower = name?.toLowerCase() || "";

// //   if (lower.includes("bomber") || lower.includes("áo khoác"))
// //     return <Shirt size={48} strokeWidth={1.5} />;
// //   if (lower.includes("áo thun")) return <Shirt size={48} strokeWidth={1.5} />;
// //   if (lower.includes("quần")) return <Package size={48} strokeWidth={1.5} />;
// //   if (lower.includes("hoodie"))
// //     return <MoveDiagonal size={48} strokeWidth={1.5} />;
// //   if (lower.includes("túi") || lower.includes("bag"))
// //     return <ShoppingBag size={48} strokeWidth={1.5} />;

// //   return <Tags size={48} strokeWidth={1.5} />;
// // };

// // export default async function CategoryProduct() {
// //   const [catRes, prodRes] = await Promise.all([
// //     fetch("http://127.0.0.1:8000/category", { cache: "no-store" }),
// //     fetch("http://127.0.0.1:8000/api/product", { cache: "no-store" }),
// //   ]);

// //   const catJson = await catRes.json();
// //   const prodJson = await prodRes.json();

// //   const categories = Array.isArray(catJson.data)
// //     ? catJson.data.filter((c) => c.status === 1)
// //     : [];

// //   const products = Array.isArray(prodJson.data)
// //     ? prodJson.data
// //     : Array.isArray(prodJson.data?.data)
// //     ? prodJson.data.data
// //     : [];

// //   return (
// //     <div className="px-6 md:px-20 lg:px-40 py-10 bg-white">
// //       <div className="flex flex-col lg:flex-row gap-10">
// //         {/* Bên trái: danh mục */}
// //         <div className="w-full lg:w-1/4">
// //           {/* Tiêu đề danh mục */}
// //           <div className="mb-4 relative">
// //             <h2 className="text-white bg-sky-600 px-4 py-2 text-sm font-bold uppercase inline-block">
// //               DANH MỤC SẢN PHẨM
// //             </h2>
// //             <div className="h-[2px] bg-sky-600 w-1/2 mt-1"></div>
// //           </div>

// //           {/* Hiển thị 6 danh mục */}
// //           <div className="grid grid-cols-2 gap-4">
// //             {categories.slice(0, 6).map((category) => (
// //               <div
// //                 key={category.id}
// //                 className="border rounded-md shadow-sm p-4 flex flex-col items-center hover:shadow-lg transition duration-200 bg-white"
// //               >
// //                 <div className="w-24 h-24 mb-3 overflow-hidden flex items-center justify-center">
// //                   {category.image_url ? (
// //                     <img
// //                       src={`/img/${category.image_url}`}
// //                       alt={category.name}
// //                       className="object-contain w-full h-full"
// //                     />
// //                   ) : (
// //                     <div className="w-12 h-12">
// //                       {getCategoryIcon(category.name)}
// //                     </div>
// //                   )}
// //                 </div>
// //                 <h3 className="text-sm font-semibold text-sky-600 text-center uppercase">
// //                   {category.name}
// //                 </h3>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Banner */}
// //           <div className="mb-4 mt-6">
// //             <img
// //               src="/img/loginae.png"
// //               alt="Danh mục"
// //               className="w-full h-auto rounded-md object-cover"
// //             />
// //           </div>
// //         </div>

// //         {/* Bên phải: sản phẩm */}
// //         <div className="w-full lg:w-3/4">
// //           <div className="mb-4 relative">
// //             <h2 className="text-white bg-sky-600 px-4 py-2 text-sm font-bold uppercase inline-block">
// //               SẢN PHẨM QUẦN KAKI
// //             </h2>
// //             <div className="h-[2px] bg-sky-600 w-1/2 mt-1"></div>
// //           </div>

// //           {products.length > 0 ? (
// //             // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 -mt-10">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 -gap-y-4 -mt-10">
// //               {products.slice(0, 6).map((product) => (
// //                 <ProductCard key={product.id} product={product} />
// //               ))}
// //             </div>
// //           ) : (
// //             <div className="text-center py-10 text-gray-500">
// //               Không có sản phẩm nào.
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { Shirt, ShoppingBag, Tags, Package, MoveDiagonal } from "lucide-react";
// import ProductCard from "./ProductList";

// const getCategoryIcon = (name: string) => {
//   const lower = name?.toLowerCase() || "";

//   if (lower.includes("bomber") || lower.includes("áo khoác"))
//     return <Shirt size={48} strokeWidth={1.5} />;
//   if (lower.includes("áo thun")) return <Shirt size={48} strokeWidth={1.5} />;
//   if (lower.includes("quần")) return <Package size={48} strokeWidth={1.5} />;
//   if (lower.includes("hoodie"))
//     return <MoveDiagonal size={48} strokeWidth={1.5} />;
//   if (lower.includes("túi") || lower.includes("bag"))
//     return <ShoppingBag size={48} strokeWidth={1.5} />;

//   return <Tags size={48} strokeWidth={1.5} />;
// };

// export default async function CategoryProduct() {
//   const [catRes, prodRes] = await Promise.all([
//     fetch("http://127.0.0.1:8000/category", { cache: "no-store" }),
//     fetch("http://127.0.0.1:8000/api/product", { cache: "no-store" }),
//   ]);

//   const catJson = await catRes.json();
//   const prodJson = await prodRes.json();

//   const categories = Array.isArray(catJson.data)
//     ? catJson.data.filter((c) => c.status === 1)
//     : [];

//   const products = Array.isArray(prodJson.data)
//     ? prodJson.data
//     : Array.isArray(prodJson.data?.data)
//     ? prodJson.data.data
//     : [];

//   return (
//     // <div className="px-6 md:px-20 lg:px-40 py-10 bg-white">
//     <div className="px-40 py-20 pb-0 bg-white">
//       <div className="flex flex-col lg:flex-row gap-10">
//         {/* Bên trái: danh mục */}
//         <div className="w-full lg:w-1/4">
//           {/* Tiêu đề danh mục */}
//           <div className="mb-4 relative">
//             <h2 className="text-white bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] px-4 py-2 text-lg font-bold uppercase inline-block">
//               DANH MỤC
//             </h2>
//             <div className="h-[2px] bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] w-1/2 mt-1"></div>
//           </div>

//           {/* Hiển thị 6 danh mục */}
//           <div className="grid grid-cols-2 gap-4">
//             {categories.slice(0, 6).map((category) => (
//               <div
//                 key={category.id}
//                 className="border rounded-md shadow-sm p-4 flex flex-col items-center hover:shadow-lg transition duration-200 bg-white"
//               >
//                 <div className="w-24 h-24 mb-3 overflow-hidden flex items-center justify-center">
//                   {category.image_url ? (
//                     <img
//                       src={`/img/${category.image_url}`}
//                       alt={category.name}
//                       className="object-contain w-full h-full"
//                     />
//                   ) : (
//                     <div className="w-12 h-12">
//                       {getCategoryIcon(category.name)}
//                     </div>
//                   )}
//                 </div>
//                 <h3 className="text-sm font-semibold text-black text-center uppercase">
//                   {category.name}
//                 </h3>
//               </div>
//             ))}
//           </div>

//           {/* Banner */}
//           {/* <div className="mb-4 mt-6">
//             <img
//               src="/img/dinh.jpg"
//               alt="Danh mục"
//               className="w-full h-auto rounded-md object-cover"
//             />
//           </div> */}
//           {/* Banner Video */}
//           <div className="mb-4 mt-6">
//             <video
//               src="img/video1.mp4"
//               autoPlay
//               muted
//               loop
//               playsInline
//               className="w-full h-auto rounded-md object-cover"
//             />
//           </div>
//         </div>

//         {/* Bên phải: sản phẩm */}
//         <div className="w-full lg:w-3/4">
//           {/* <div className="mb-4 relative">
//             <h2 className="text-white bg-sky-600 px-4 py-2 text-sm font-bold uppercase inline-block">
//               SẢN PHẨM QUẦN KAKI
//             </h2>
//             <div className="h-[2px] bg-sky-600 w-1/2 mt-1"></div>
//           </div> */}
//           <div className="mb-4 flex items-center justify-between">
//             <div>
//               <h2 className="text-white bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] px-4 py-2 text-lg font-bold uppercase inline-block">
//                 SẢN PHẨM
//               </h2>

//               <div className="h-[2px] bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] w-1/2 mt-1"></div>
//             </div>

//             {/* Nút Xem thêm */}
//             {products.length > 6 && (
//               <a
//                 href="/products"
//                 className="text-black font-semibold hover:underline inline-flex items-center gap-1 text-sm"
//               >
//                 Xem thêm
//                 <svg
//                   className="w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M9 5l7 7-7 7"
//                   />
//                 </svg>
//               </a>
//             )}
//           </div>

//           {products.length > 0 ? (
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 -gap-y-4 -mt-10">
//                 {products.slice(0, 6).map((product) => (
//                   <ProductCard key={product.id} product={product} />
//                 ))}
//               </div>
//             </>
//           ) : (
//             <div className="text-center py-10 text-gray-500">
//               Không có sản phẩm nào.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { Shirt, ShoppingBag, Tags, Package, MoveDiagonal } from "lucide-react";
import ProductCard from "./ProductList";
import Image from "next/image";
import Link from "next/link";

const getCategoryIcon = (name: string) => {
  const lower = name?.toLowerCase() || "";

  if (lower.includes("bomber") || lower.includes("áo khoác"))
    return <Shirt size={48} strokeWidth={1.5} />;
  if (lower.includes("áo thun")) return <Shirt size={48} strokeWidth={1.5} />;
  if (lower.includes("quần")) return <Package size={48} strokeWidth={1.5} />;
  if (lower.includes("hoodie"))
    return <MoveDiagonal size={48} strokeWidth={1.5} />;
  if (lower.includes("túi") || lower.includes("bag"))
    return <ShoppingBag size={48} strokeWidth={1.5} />;

  return <Tags size={48} strokeWidth={1.5} />;
};

export default async function CategoryProduct() {
  const [catRes, prodRes] = await Promise.all([
    fetch("http://127.0.0.1:8000/category", { cache: "no-store" }),
    fetch("http://127.0.0.1:8000/api/product", { cache: "no-store" }),
  ]);

  const catJson = await catRes.json();
  const prodJson = await prodRes.json();

  const categories = Array.isArray(catJson.data)
    ? catJson.data.filter((c) => c.status === 1)
    : [];

  const products = Array.isArray(prodJson.data)
    ? prodJson.data
    : Array.isArray(prodJson.data?.data)
    ? prodJson.data.data
    : [];

  return (
    // <div className="px-4 sm:px-10 md:px-20 lg:px-40 py-10 bg-white">
    // <div className="px-4 sm:px-10 md:px-20 lg:px-40 py-12 bg-white mt-4">
    <div className="px-4 sm:px-10 md:px-20 lg:px-40 py-12 bg-white mt-4">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Bên trái: danh mục */}
        <div className="w-full lg:w-1/4">
          <div className="mb-4 relative">
            <h2 className="text-white bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] px-4 py-2 text-lg font-bold uppercase inline-block">
              DANH MỤC
            </h2>
            <div className="h-[2px] bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] w-1/2 mt-1"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {categories.slice(0, 6).map((category) => (
              <div
                key={category.id}
                className="border rounded-md shadow-sm p-4 flex flex-col items-center hover:shadow-lg transition duration-200 bg-white"
              >
                <div className="w-24 h-24 mb-3 overflow-hidden flex items-center justify-center">
                  {category.image_url ? (
                    <Image
                      width={96}
                      height={96}
                      src={`/img/${category.image_url}`}
                      alt={category.name}
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <div className="w-12 h-12">
                      {getCategoryIcon(category.name)}
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-black text-center uppercase">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>

          <div className="mb-4 mt-6">
            <video
              src="img/video1.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto rounded-md object-cover"
            />
          </div>
        </div>

        {/* Bên phải: sản phẩm */}
        <div className="w-full lg:w-3/4">
          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-white bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] px-4 py-2 text-lg font-bold uppercase inline-block">
                SẢN PHẨM
              </h2>
              <div className="h-[2px] bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] w-1/2 mt-1"></div>
            </div>

            {products.length > 6 && (
              <Link
                href="/products"
                className="text-black font-semibold hover:underline inline-flex items-center gap-1 text-sm"
              >
                Xem thêm
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            )}
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 -gap-y-4 -mt-10">
              {products.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-500">
              Không có sản phẩm nào.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
