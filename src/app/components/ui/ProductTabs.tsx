import ProductCard from "./ProductList";
import Link from "next/link";
import type { Product } from "../../types/Product";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getHotProducts() {
  const res = await fetch(`${API_URL}/hotProduct`, {
    next: { revalidate: 0 },
  });
  const json = await res.json();
  return json.data;
}

async function getNewProducts() {
  const res = await fetch(`${API_URL}/viewProduct`, {
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
    <div className="px-4 sm:px-10 md:px-20 lg:px-40 py-12 bg-white">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 animate-fadeIn">
        {products.map((product: Product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
