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
//     <div>
//       {/* Danh mục */}
//       <div className="px-6 md:px-20 lg:px-40 py-10 bg-white">
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//           {categories.map((category) => (
//             <div
//               key={category.id}
//               className="bg-gray-50 rounded-xl p-5 hover:shadow-lg transition-all duration-200 flex items-center"
//             >
//               <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded mr-4 overflow-hidden">
//                 {category.image_url ? (
//                   <img
//                     src={`/img/${category.image_url}`}
//                     alt={category.name}
//                     className="object-cover w-full h-full"
//                   />
//                 ) : (
//                   getCategoryIcon(category.name)
//                 )}
//               </div>

//               <div className="flex flex-col items-start">
//                 <h3 className="text-base font-semibold text-black flex items-center gap-2">
//                   {category.name}
//                 </h3>
//                 <p className="text-sm text-gray-500">
//                   {category.product?.length ?? 0} sản phẩm
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Sản phẩm */}
//       <div className="px-6 md:px-20 lg:px-40 py-6">
//         {products.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-10 text-gray-500">
//             Không có sản phẩm nào.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { Shirt, ShoppingBag, Tags, Package, MoveDiagonal } from "lucide-react";
import ProductCard from "./ProductList";

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
    <div className="px-6 md:px-20 lg:px-40 py-10 bg-white">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Bên trái: danh mục */}
        <div className="w-full lg:w-1/4">
          <h2 className="text-lg font-bold mb-4">DANH MỤC SẢN PHẨM</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-gray-50 rounded-xl p-4 hover:shadow-lg transition-all duration-200 flex items-center"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded mr-3 overflow-hidden">
                  {category.image_url ? (
                    <img
                      src={`/img/${category.image_url}`}
                      alt={category.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    getCategoryIcon(category.name)
                  )}
                </div>

                <div className="flex flex-col">
                  <h3 className="text-sm font-semibold text-black">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {category.product?.length ?? 0} sản phẩm
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bên phải: sản phẩm */}
        <div className="w-full lg:w-3/4">
          <h2 className="text-lg font-bold mb-4">SẢN PHẨM QUẦN KAKI</h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
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
