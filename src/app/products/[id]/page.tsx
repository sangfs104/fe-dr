import ProductDetailClient from "./ProductDetailPage";
import HeaderHome from "../../components/Header";
import Footer from "../../components/Footer";
import CheckoutProgress from "../../components/CheckoutProgress";
import ProductList1 from "../../components/ProductList1";

async function getProduct(id: string) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/product/${id}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.data;
  } catch (err) {
    return null;
  }
}

async function getProductReviews(productId: number) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/review/${productId}`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.data;
  } catch (err) {
    return [];
  }
}

async function getProductsByCategory(categoryId: number) {
  try {
    const res = await fetch(
      `http://127.0.0.1:8000/api/products-by-category?category_id=${categoryId}`,
      { cache: "no-store" }
    );
    const data = await res.json();
    // Đảm bảo trả về mảng sản phẩm
    return Array.isArray(data.data) ? data.data : [];
  } catch (err) {
    return [];
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const productRaw = await getProduct(params.id);

  if (!productRaw) {
    return <div className="p-6 text-red-500">Sản phẩm không tồn tại.</div>;
  }

  // Lấy category_id từ productRaw
  const categoryId = productRaw.category_id ?? productRaw.category?.id;

  const product = {
    ...productRaw,
    img: Array.isArray(productRaw.img) ? productRaw.img : [],
    variant: Array.isArray(productRaw.variant) ? productRaw.variant : [],
  };

  const reviews = (await getProductReviews(product.id)) || [];

  // Lấy tất cả sản phẩm cùng category_id (trừ sản phẩm hiện tại)
  const sameCategoryProducts = (await getProductsByCategory(categoryId)).filter(
    (p: any) => p.id !== product.id
  );

  return (
    <>
      <HeaderHome />
      <CheckoutProgress currentStep="detail" />
      <ProductDetailClient product={product} reviews={reviews} />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Sản phẩm cùng danh mục</h2>
        <ProductList1 products={sameCategoryProducts} />
      </div>
      <Footer />
    </>
  );
}
