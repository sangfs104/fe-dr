"use client";

import ProductCard from "../components/ProductList";
import BreadcrumbFilter from "../components/Sort";
import HeaderHome from "../components/Header";
import Footer from "../components/Footer";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [sortDirection, setSortDirection] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [priceRange, setPriceRange] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      let baseUrl = "http://127.0.0.1:8000/api/products";
      let url = baseUrl;

      if (selectedSize && priceRange > 0) {
        url = `${baseUrl}/filter-size-price?size=${selectedSize}&price=${priceRange}`;
      } else if (selectedSize) {
        url = `${baseUrl}/filter-size?size=${selectedSize}`;
      } else if (priceRange > 0) {
        url = `${baseUrl}/price/${priceRange}`;
      } else if (sortDirection) {
        url = `${baseUrl}/sort?price=2000000&sort=${sortDirection}`;
      }

      try {
        const res = await fetch(url);
        const json = await res.json();
        if (json.status === 200) {
          setProducts(json.data);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Lỗi khi fetch sản phẩm:", error);
        setProducts([]);
      }
    }

    fetchProducts();
  }, [sortDirection, selectedSize, priceRange]);

  return (
    <>
      <HeaderHome />
      <BreadcrumbFilter
        onSortChange={setSortDirection}
        onSizeChange={setSelectedSize}
        onPriceChange={setPriceRange}
        currentPrice={priceRange}
      />
      <div className="px-24 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {products.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            Không có sản phẩm phù hợp.
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
