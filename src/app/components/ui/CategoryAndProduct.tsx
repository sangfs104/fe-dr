// "use client";

// import { useEffect, useState } from "react";
// import { Shirt, ShoppingBag, Tags, Package, MoveDiagonal } from "lucide-react";
// import ProductCard from "../ui/ProductList";
// import Image from "next/image";

// // Hàm icon theo tên danh mục
// const getCategoryIcon = (name: string) => {
//   const lower = name.toLowerCase();

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

// export default function CategoryAndProduct() {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);

//   // Fetch danh mục
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch("http://127.0.0.1:8000/category");
//         const json = await res.json();
//         const data = Array.isArray(json.data) ? json.data : [];
//         setCategories(data.filter((c: any) => c.status === 1));
//       } catch (error) {
//         console.error("Lỗi khi fetch danh mục:", error);
//         setCategories([]);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch sản phẩm
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("http://127.0.0.1:8000/api/product");
//         const json = await res.json();
//         const productList = Array.isArray(json.data)
//           ? json.data
//           : Array.isArray(json.data?.data)
//           ? json.data.data
//           : [];
//         setProducts(productList);
//       } catch (error) {
//         console.error("Lỗi khi fetch sản phẩm:", error);
//         setProducts([]);
//       }
//     };
//     fetchProducts();
//   }, []);

//   return (
//     <div className="px-6 md:px-20 lg:px-40 py-6">
//       {/* Danh mục */}
//       <h2 className="text-2xl font-bold mb-4">Danh mục</h2>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
//         {categories.map((category: any) => (
//           <div
//             key={category.id}
//             className="bg-gray-50 rounded-xl p-5 hover:shadow-lg transition-all duration-200 flex items-center"
//           >
//             <Image
//               src={`/img/${category.image_url}`}
//               alt={category.name}
//               className="w-16 h-16 object-cover rounded mr-4"
//             />
//             <div className="flex flex-col items-start">
//               <h3 className="text-base font-semibold text-black">
//                 {category.name}
//               </h3>
//               <p className="text-sm text-gray-500">
//                 {category.product?.length ?? 0} sản phẩm
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Sản phẩm */}
//       <h2 className="text-2xl font-bold mb-4">Sản phẩm</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((product: any) => (
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
"use client";

import { useEffect, useState } from "react";
import { Shirt, ShoppingBag, Tags, Package, MoveDiagonal } from "lucide-react";
import ProductCard from "../ui/ProductList";
import Image from "next/image";

// ---------------------- Type Definitions ----------------------
export type ImageType = {
  id: number;
  product_id: number;
  name: string;
};

export type ProductVariant = {
  id: number;
  product_id: number;
  img_id: number;
  size: string;
  color: string;
  stock_quantity: number;
  price: number;
  sale_price: string | null; // CHỈNH LẠI KIỂU string nếu ProductCard dùng string
  status: string;
};

export type Category = {
  id: number;
  name: string;
  image_url: string;
  status: number;
  product?: unknown[];
};

export type Product = {
  id: number;
  name: string;
  description: string;
  status: string;
  category_id: number;
  img: ImageType[];
  variant: ProductVariant[]; // KHỚP TÊN
  category: Category;
  hot: boolean;
};

// ---------------------- Helper Function ----------------------
const getCategoryIcon = (name: string) => {
  const lower = name.toLowerCase();
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

// ---------------------- Main Component ----------------------
export default function CategoryAndProduct() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch danh mục
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/category");
        const json = await res.json();
        const data = Array.isArray(json.data) ? json.data : [];
        setCategories(data.filter((c: Category) => c.status === 1));
      } catch (error) {
        console.error("Lỗi khi fetch danh mục:", error);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Fetch sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/product");
        const json = await res.json();
        const productList = Array.isArray(json.data)
          ? json.data
          : Array.isArray(json.data?.data)
          ? json.data.data
          : [];
        setProducts(productList);
      } catch (error) {
        console.error("Lỗi khi fetch sản phẩm:", error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="px-6 md:px-20 lg:px-40 py-6">
      {/* Danh mục */}
      <h2 className="text-2xl font-bold mb-4">Danh mục</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-gray-50 rounded-xl p-5 hover:shadow-lg transition-all duration-200 flex items-center"
          >
            <div className="mr-4">{getCategoryIcon(category.name)}</div>
            <Image
              src={`/img/${category.image_url}`}
              alt={category.name}
              className="w-16 h-16 object-cover rounded mr-4"
              width={64}
              height={64}
            />
            <div className="flex flex-col items-start">
              <h3 className="text-base font-semibold text-black">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500">
                {category.product?.length ?? 0} sản phẩm
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Sản phẩm */}
      <h2 className="text-2xl font-bold mb-4">Sản phẩm</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          Không có sản phẩm phù hợp.
        </div>
      )}
    </div>
  );
}
