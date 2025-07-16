import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  description: string;
  status: string;
  img: any[];
  variant: any[];
  category: {
    id: number;
    name: string;
  };
}

export default function ProductList({ products }: { products: Product[] }) {
  if (!products || !Array.isArray(products)) return null;
  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
