// "use client";

// import React, { useEffect, useState } from "react";

// type Product = {
//   id: number;
//   name: string;
//   description: string;
//   status: string;
//   active: string;
//   view: number | null;
//   hot: string | null;
//   updated_at: string | null;
// };

// type Category = {
//   id: number;
//   name: string;
//   product: Product[];
// };

// export default function CategoryList() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch("http://127.0.0.1:8000/category");
//         const json = await res.json();
//         setCategories(json.data || []);
//       } catch (error) {
//         console.error("Lỗi khi tải danh mục:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   if (loading) return <div className="px-6 py-4">Đang tải...</div>;

//   return (
//     <div className="px-6 py-4 space-y-8">
//       {categories.map((category) => (
//         <div key={category.id}>
//           <h2 className="text-xl font-bold mb-2">{category.name}</h2>
//           <ul className="space-y-1">
//             {category.product.map((product) => (
//               <li key={product.id} className="border p-3 rounded-lg shadow-sm">
//                 <div className="font-medium">{product.name}</div>
//                 <p className="text-sm text-gray-600">{product.description}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// }
import React from "react";

async function getCategories() {
  const res = await fetch("http://127.0.0.1:8000/category", {
    next: { revalidate: 0 },
  });
  const json = await res.json();
  return json.data;
}

export default async function CategoryListTabs() {
  const categories = await getCategories();

  return (
    <div className="px-6 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Danh mục sản phẩm</h2>

      <div className="space-y-12">
        {categories.map((category: any) => (
          <div key={category.id}>
            <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {category.product.map((product: any) => (
                <div
                  key={product.id}
                  className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <div className="font-medium">{product.name}</div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="text-xs text-green-600 mt-2">
                    {product.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
