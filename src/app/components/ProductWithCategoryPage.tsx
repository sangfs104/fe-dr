// // "use client";
// // import { useState } from "react";
// // import CategoryList from "./CategoryList";
// // import Sanpham from "./Sanpham";

// // export default function ProductWithCategoryPage() {
// //   // Nếu muốn lọc sản phẩm theo danh mục, bạn có thể truyền selectedCategory xuống Sanpham
// //   //   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

// //   return (
// //     <div className="flex gap-8 px-6 md:px-20 lg:px-40 py-6">
// //       {/* Left: Category List */}
// //       <div className="w-1/4 min-w-[220px]">
// //         <CategoryList />
// //       </div>
// //       {/* Right: Product List */}
// //       <div>
// //         <Sanpham
// //         // Nếu muốn lọc theo danh mục thì truyền prop selectedCategory={selectedCategory}
// //         />
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import { useState } from "react";
// import CategoryList from "./CategoryList";
// import Sanpham from "./Sanpham";

// export default function ProductWithCategoryPage() {
//   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

//   return (
//     <div className="flex gap-8 px-6 md:px-20 lg:px-40 py-6">
//       <div className="w-1/4 min-w-[220px]">
//         <CategoryList onSelectCategory={setSelectedCategory} />
//       </div>
//       <div className="w-3/4">
//         <Sanpham selectedCategoryId={selectedCategory} />
//       </div>
//     </div>
//   );
// }
// "use client";
// import { useState } from "react";
// import CategoryList from "./CategoryList";
// import Sanpham from "./Sanpham";

// export default function ProductWithCategoryPage() {
//   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

//   return (
//     <div className="flex gap-8 px-6 md:px-20 lg:px-40 py-6">
//       {/* Category Filter */}
//       <div className="w-1/4 min-w-[220px]">
//         <CategoryList onSelectCategory={setSelectedCategory} />
//       </div>

//       {/* Product Grid */}
//       <div className="w-3/4">
//         <Sanpham selectedCategoryId={selectedCategory} />
//       </div>
//     </div>
//   );
// }
