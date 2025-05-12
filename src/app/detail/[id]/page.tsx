// app/detail/[id]/page.tsx
import { notFound } from "next/navigation";

type Product = {
  id: string;
  name: string;
  description: string;
  created_day: string;
  img: number[];
  variant: number[];
};

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(
    `http://localhost:4000products/:id?_expand=category&_embed=images&_embed=variants
`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);
  if (!product) return notFound();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-600 mb-2">Ngày tạo: {product.created_day}</p>

      {/* Hiển thị ảnh */}
      <div className="flex flex-wrap gap-4 mb-4">
        {product.img.map((imgId, idx) => (
          <img
            key={idx}
            src={`/img/sp${imgId}.webp`}
            alt={`Product image ${imgId}`}
            className="w-40 h-40 object-cover rounded border"
          />
        ))}
      </div>

      {/* Thông tin thêm */}
      <div className="text-gray-800">
        <p>
          <strong>Mã sản phẩm:</strong> {product.id}
        </p>
        <p>
          <strong>Danh mục:</strong> {product.category}
        </p>
        <p>
          <strong>Mô tả:</strong> {product.description || "Chưa có mô tả."}
        </p>
        <p>
          <strong>Hot:</strong> {product.hot ? "🔥 Sản phẩm hot" : "Không"}
        </p>
        <p>
          <strong>Biến thể:</strong> {product.variant.join(", ") || "Không có"}
        </p>
      </div>
    </div>
  );
}
