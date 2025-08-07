// // app/components/ui/ProductTabsWrapper.tsx
// "use client";

// import { useSearchParams } from "next/navigation";
// import { Suspense } from "react";
// import dynamic from "next/dynamic";

// const ProductTabs = dynamic(() => import("../ui/"), {
//   ssr: true,
//   loading: () => <div>Đang tải sản phẩm...</div>,
// });

// export default function ProductTabsWrapper() {
//   const searchParams = useSearchParams();
//   const typeParam = searchParams.get("type");
//   const type = typeParam === "new" ? "new" : "hot";

//   return (
//     <Suspense fallback={<div>Đang tải...</div>}>
//       <ProductTabs type={type} />
//     </Suspense>
//   );
// }
