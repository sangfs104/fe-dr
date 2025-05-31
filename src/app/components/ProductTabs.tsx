import ProductCard from "./ProductList";

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
  type?: "hot" | "new" | "sale";
}) {
  const products =
    type === "new" ? await getNewProducts() : await getHotProducts();

  return (
    <div className="px-6 py-8">
      {/* Tabs */}
      <div className="flex justify-center space-x-12 mb-8 ">
        <a
          href="?type=hot"
          className={`pb-2 text-lg font-medium transition-all ${
            type === "hot"
              ? "text-black border-b-2 border-black"
              : "text-gray-500 hover:text-black"
          }`}
        >
          Best seller
        </a>
        <a
          href="?type=new"
          className={`pb-2 text-lg font-medium transition-all ${
            type === "new"
              ? "text-black border-b-2 border-black"
              : "text-gray-500 hover:text-black"
          }`}
        >
          New arrivals
        </a>
        <a
          href="?type=sale"
          className={`pb-2 text-lg font-medium transition-all ${
            type === "sale"
              ? "text-black border-b-2 border-black"
              : "text-gray-500 hover:text-black"
          }`}
        >
          On Sale
        </a>
      </div>
      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 animate-fadeIn">
        {products.map((product: any) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
