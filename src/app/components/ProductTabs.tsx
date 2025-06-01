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
  type?: "hot" | "new" | "sale";
}) {
  const products =
    type === "new" ? await getNewProducts() : await getHotProducts();

  return (
    <div className="px-24 py-8">
      {/* Tabs */}
      <div className="flex justify-center space-x-12 mb-8">
        <Link
          href="?type=hot"
          scroll={false}
          className={`pb-2 text-lg font-medium transition-all ${
            type === "hot"
              ? "text-black border-b-2 border-black"
              : "text-gray-500 hover:text-black"
          }`}
        >
          Sản phẩm nổi bật
        </Link>
        <Link
          href="?type=new"
          scroll={false}
          className={`pb-2 text-lg font-medium transition-all ${
            type === "new"
              ? "text-black border-b-2 border-black"
              : "text-gray-500 hover:text-black"
          }`}
        >
          Mới ra mắt
        </Link>
        <Link
          href="?type=sale"
          scroll={false}
          className={`pb-2 text-lg font-medium transition-all ${
            type === "sale"
              ? "text-black border-b-2 border-black"
              : "text-gray-500 hover:text-black"
          }`}
        >
          Ưu đãi hiện có
        </Link>
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
