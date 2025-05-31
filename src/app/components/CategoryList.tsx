import {
  Shirt,
  ShoppingBag,
  Tags,
  Flame,
  Package,
  MoveDiagonal,
  LayoutGrid,
} from "lucide-react";

async function getCategories() {
  const res = await fetch("http://127.0.0.1:8000/category", {
    next: { revalidate: 0 },
  });

  const json = await res.json();
  return json.data.slice(0, 5); // Lấy 5 danh mục đầu tiên
}

// Map icon theo tên danh mục
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

export default async function CategoryGrid() {
  const categories = await getCategories();

  return (
    <div className="px-6 py-10 bg-white">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {categories.map((category: any) => (
          <div
            key={category.id}
            className="bg-gray-50 rounded-xl p-5 text-center hover:shadow-lg transition-all duration-200"
          >
            <div className="h-24 flex items-center justify-center text-gray-700">
              {getCategoryIcon(category.name)}
            </div>
            <h3 className="mt-3 text-base font-semibold text-black">
              {category.name}
            </h3>
            <p className="text-sm text-gray-500">
              {category.product.length} sản phẩm
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
