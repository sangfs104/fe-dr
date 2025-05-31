// import ProductCard from "../components/ProductList";
// import BreadcrumbFilter from "../components/Sort";
// import HeaderHome from "../components/Header";
// async function getProducts() {
//   const res = await fetch("http://127.0.0.1:8000/product", {
//     next: { revalidate: 0 },
//   });
//   const json = await res.json();
//   return json.data.data;
// }

// export default async function ProductPage() {
//   const products = await getProducts();

//   return (
//     <>
//       <HeaderHome></HeaderHome>
//       <BreadcrumbFilter></BreadcrumbFilter>
//       <div className="px-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }
// import FlashSale from "../components/FlashSale";
import ProductCard from "../components/ProductList";
import BreadcrumbFilter from "../components/Sort";
import HeaderHome from "../components/Header";

async function getProducts() {
  const res = await fetch("http://127.0.0.1:8000/product", {
    next: { revalidate: 0 },
  });
  const json = await res.json();
  return json.data.data;
}

export default async function ProductPage() {
  const products = await getProducts();

  return (
    <>
      <HeaderHome />
      <BreadcrumbFilter />
      {/* Flash Sale Section */}
      {/* <FlashSale /> */}
      <div className="px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
