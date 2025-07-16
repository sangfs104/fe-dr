// // // // // import ProductCard from "./ProductList";
// // // // // import Link from "next/link";

// // // // // async function getHotProducts() {
// // // // //   const res = await fetch("http://127.0.0.1:8000/hotProduct", {
// // // // //     next: { revalidate: 0 },
// // // // //   });
// // // // //   const json = await res.json();
// // // // //   return json.data;
// // // // // }

// // // // // async function getNewProducts() {
// // // // //   const res = await fetch("http://127.0.0.1:8000/viewProduct", {
// // // // //     next: { revalidate: 0 },
// // // // //   });
// // // // //   const json = await res.json();
// // // // //   return json.data;
// // // // // }

// // // // // export default async function ProductTabs({
// // // // //   type = "hot",
// // // // // }: {
// // // // //   type?: "hot" | "new" | "sale";
// // // // // }) {
// // // // //   const products =
// // // // //     type === "new" ? await getNewProducts() : await getHotProducts();

// // // // //   return (
// // // // //     <div className="px-40 py-8">
// // // // //       {/* Tabs */}
// // // // //       <div className="flex justify-center space-x-12 mb-8">
// // // // //         <Link
// // // // //           href="?type=hot"
// // // // //           scroll={false}
// // // // //           className={`pb-2 text-lg font-medium transition-all ${
// // // // //             type === "hot"
// // // // //               ? "text-black border-b-2 border-black"
// // // // //               : "text-gray-500 hover:text-black"
// // // // //           }`}
// // // // //         >
// // // // //           Sản phẩm nổi bật
// // // // //         </Link>
// // // // //         <Link
// // // // //           href="?type=new"
// // // // //           scroll={false}
// // // // //           className={`pb-2 text-lg font-medium transition-all ${
// // // // //             type === "new"
// // // // //               ? "text-black border-b-2 border-black"
// // // // //               : "text-gray-500 hover:text-black"
// // // // //           }`}
// // // // //         >
// // // // //           Mới ra mắt
// // // // //         </Link>
// // // // //       </div>

// // // // //       {/* Product grid */}
// // // // //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 animate-fadeIn">
// // // // //         {products.map((product: any) => (
// // // // //           <div key={product.id}>
// // // // //             <ProductCard product={product} />
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // import ProductCard from "./ProductList";
// // // // import Link from "next/link";

// // // // async function getHotProducts() {
// // // //   const res = await fetch("http://127.0.0.1:8000/hotProduct", {
// // // //     next: { revalidate: 0 },
// // // //   });
// // // //   const json = await res.json();
// // // //   return json.data;
// // // // }

// // // // async function getNewProducts() {
// // // //   const res = await fetch("http://127.0.0.1:8000/viewProduct", {
// // // //     next: { revalidate: 0 },
// // // //   });
// // // //   const json = await res.json();
// // // //   return json.data;
// // // // }

// // // // export default async function ProductTabs({
// // // //   type = "hot",
// // // // }: {
// // // //   type?: "hot" | "new" | "sale";
// // // // }) {
// // // //   const products =
// // // //     type === "new" ? await getNewProducts() : await getHotProducts();

// // // //   return (
// // // //     <div className="px-40 py-14 bg-gradient-to-b from-white via-gray-50 to-white">
// // // //       {/* Tabs đẹp hơn */}
// // // //       <div className="flex justify-center gap-10 mb-12">
// // // //         <Link
// // // //           href="?type=hot"
// // // //           scroll={false}
// // // //           className={`relative text-xl font-semibold transition-all duration-300 pb-2
// // // //             ${
// // // //               type === "hot"
// // // //                 ? "text-black after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-black after:rounded-full"
// // // //                 : "text-gray-400 hover:text-black"
// // // //             }`}
// // // //         >
// // // //           Sản phẩm nổi bật
// // // //         </Link>

// // // //         <Link
// // // //           href="?type=new"
// // // //           scroll={false}
// // // //           className={`relative text-xl font-semibold transition-all duration-300 pb-2
// // // //             ${
// // // //               type === "new"
// // // //                 ? "text-black after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-black after:rounded-full"
// // // //                 : "text-gray-400 hover:text-black"
// // // //             }`}
// // // //         >
// // // //           Mới ra mắt
// // // //         </Link>
// // // //       </div>

// // // //       {/* Lưới sản phẩm */}
// // // //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 animate-fadeIn">
// // // //         {products.map((product: any) => (
// // // //           <div
// // // //             key={product.id}
// // // //             className="hover:scale-[1.02] transition-transform duration-300"
// // // //           >
// // // //             <ProductCard product={product} />
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // import ProductCard from "./ProductList";
// // // import Link from "next/link";

// // // async function getHotProducts() {
// // //   const res = await fetch("http://127.0.0.1:8000/hotProduct", {
// // //     next: { revalidate: 0 },
// // //   });
// // //   const json = await res.json();
// // //   return json.data;
// // // }

// // // async function getNewProducts() {
// // //   const res = await fetch("http://127.0.0.1:8000/viewProduct", {
// // //     next: { revalidate: 0 },
// // //   });
// // //   const json = await res.json();
// // //   return json.data;
// // // }

// // // export default async function ProductTabs({
// // //   type = "hot",
// // // }: {
// // //   type?: "hot" | "new";
// // // }) {
// // //   const products =
// // //     type === "new" ? await getNewProducts() : await getHotProducts();

// // //   return (
// // //     <div className="px-40 py-14 bg-gradient-to-b from-white via-gray-50 to-white">
// // //       {/* Tabs nổi bật */}
// // //       <div className="flex justify-center gap-8 mb-12">
// // //         {[
// // //           { label: "Sản phẩm nổi bật", value: "hot" },
// // //           { label: "Mới ra mắt", value: "new" },
// // //         ].map((tab) => (
// // //           <Link
// // //             key={tab.value}
// // //             href={`?type=${tab.value}`}
// // //             scroll={false}
// // //             className={`relative px-6 py-2 text-xl font-bold transition-all duration-300 rounded-full group
// // //               ${
// // //                 type === tab.value
// // //                   ? "bg-gradient-to-r from-pink-500 to-yellow-500 text-white shadow-lg scale-105"
// // //                   : "bg-gray-100 text-gray-600 hover:text-black hover:shadow-md"
// // //               }
// // //             `}
// // //           >
// // //             <span className="relative z-10">{tab.label}</span>
// // //             {/* Hiệu ứng underline */}
// // //             <span
// // //               className={`absolute left-0 bottom-0 h-[3px] w-full rounded-full transition-all duration-500 ease-out
// // //                 ${
// // //                   type === tab.value
// // //                     ? "bg-white"
// // //                     : "bg-transparent group-hover:bg-black"
// // //                 }
// // //               `}
// // //             ></span>
// // //           </Link>
// // //         ))}
// // //       </div>

// // //       {/* Grid sản phẩm */}
// // //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 animate-fadeIn">
// // //         {products.map((product: any) => (
// // //           <div
// // //             key={product.id}
// // //             className="hover:scale-[1.03] transition-transform duration-300"
// // //           >
// // //             <ProductCard product={product} />
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import ProductCard from "./ProductList";
// // import Link from "next/link";

// // async function getHotProducts() {
// //   const res = await fetch("http://127.0.0.1:8000/hotProduct", {
// //     next: { revalidate: 0 },
// //   });
// //   const json = await res.json();
// //   return json.data;
// // }

// // async function getNewProducts() {
// //   const res = await fetch("http://127.0.0.1:8000/viewProduct", {
// //     next: { revalidate: 0 },
// //   });
// //   const json = await res.json();
// //   return json.data;
// // }

// // export default async function ProductTabs({
// //   type = "hot",
// // }: {
// //   type?: "hot" | "new";
// // }) {
// //   const products =
// //     type === "new" ? await getNewProducts() : await getHotProducts();

// //   return (
// //     <div className="px-40 py-20 bg-white">
// //       {/* Tabs style Shopee */}
// //       <div className="flex justify-center gap-6 mb-12">
// //         {[
// //           { label: "SẢN PHẨM NỔI BẬT", value: "hot" },
// //           { label: "MỚI RA MẮT", value: "new" },
// //         ].map((tab) => {
// //           const isActive = type === tab.value;
// //           return (
// //             <Link
// //               key={tab.value}
// //               href={`?type=${tab.value}`}
// //               scroll={false}
// //               className={`px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300
// //                 ${
// //                   isActive
// //                     ? "bg-[#ee4d2d] text-white shadow-md shadow-orange-300 scale-105"
// //                     : "border border-gray-300 text-gray-600 hover:text-[#ee4d2d] hover:border-[#ee4d2d]"
// //                 }
// //               `}
// //             >
// //               {tab.label}
// //             </Link>
// //           );
// //         })}
// //       </div>

// //       {/* Grid sản phẩm */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 animate-fadeIn">
// //         {products.map((product: any) => (
// //           <div
// //             key={product.id}
// //             className="hover:scale-[1.03] transition-transform duration-300"
// //           >
// //             <ProductCard product={product} />
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// import ProductCard from "./ProductList";
// import Link from "next/link";

// async function getHotProducts() {
//   const res = await fetch("http://127.0.0.1:8000/hotProduct", {
//     next: { revalidate: 0 },
//   });
//   const json = await res.json();
//   return json.data;
// }

// async function getNewProducts() {
//   const res = await fetch("http://127.0.0.1:8000/viewProduct", {
//     next: { revalidate: 0 },
//   });
//   const json = await res.json();
//   return json.data;
// }

// export default async function ProductTabs({
//   type = "hot",
// }: {
//   type?: "hot" | "new";
// }) {
//   const products =
//     type === "new" ? await getNewProducts() : await getHotProducts();

//   return (
//     <div className="px-40 py-20 bg-white">
//       {/* Tabs style Shopee với gradient */}
//       <div className="flex justify-center gap-6 mb-12">
//         {[
//           { label: "SẢN PHẨM NỔI BẬT", value: "hot" },
//           { label: "MỚI RA MẮT", value: "new" },
//         ].map((tab) => {
//           const isActive = type === tab.value;
//           return (
//             <Link
//               key={tab.value}
//               href={`?type=${tab.value}`}
//               scroll={false}
//               className={`px-6 py-3 text-lg font-semibold rounded-full transition-all duration-300
//                 ${
//                   isActive
//                     ? "bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] text-white shadow-md shadow-orange-300 scale-105"
//                     : "border border-gray-300 text-gray-600 hover:text-[#FF5722] hover:border-[#FF5722]"
//                 }
//               `}
//             >
//               {tab.label}
//             </Link>
//           );
//         })}
//       </div>

//       {/* Grid sản phẩm */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 animate-fadeIn">
//         {products.map((product: any) => (
//           <div
//             key={product.id}
//             className="hover:scale-[1.03] transition-transform duration-300"
//           >
//             <ProductCard product={product} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import ProductCard from "./ProductList";
import Link from "next/link";

async function getHotProducts() {
  const res = await fetch("http://127.0.0.1:8000/hotProduct", {
    next: { revalidate: 0 },
  });
  const json = await res.json();
  return json.data;
}

async function getNewProducts() {
  const res = await fetch("http://127.0.0.1:8000/viewProduct", {
    next: { revalidate: 0 },
  });
  const json = await res.json();
  return json.data;
}

export default async function ProductTabs({
  type = "hot",
}: {
  type?: "hot" | "new";
}) {
  const products =
    type === "new" ? await getNewProducts() : await getHotProducts();

  return (
    // <div className="px-4 sm:px-10 md:px-20 lg:px-40 py-20 bg-white">
    // <div className="px-4 sm:px-10 md:px-20 lg:px-40 py-6 bg-white">
    <div className="px-4 sm:px-10 md:px-20 lg:px-40 py-12 bg-white">
      {/* Tabs style Shopee với gradient */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-2">
        {[
          { label: "SẢN PHẨM NỔI BẬT", value: "hot" },
          { label: "MỚI RA MẮT", value: "new" },
        ].map((tab) => {
          const isActive = type === tab.value;
          return (
            <Link
              key={tab.value}
              href={`?type=${tab.value}`}
              scroll={false}
              className={`px-6 py-3 text-base sm:text-lg font-semibold rounded-full transition-all duration-300
                ${
                  isActive
                    ? "bg-gradient-to-r from-[#FF8A50] via-[#FF7043] to-[#FF5722] text-white shadow-md shadow-orange-300 scale-105"
                    : "border border-gray-300 text-gray-600 hover:text-[#FF5722] hover:border-[#FF5722]"
                }
              `}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* Grid sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 animate-fadeIn">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="hover:scale-[1.03] transition-transform duration-300"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
