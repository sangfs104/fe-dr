import BannerCarousel from "./components/ui/BannerCarousel";
import HeaderHome from "./components/ui/Header";
import ProductTabs from "./components/ui/ProductTabs";
import ServiceHighlights from "./components/ui/ServiceHighlights";
import HeroSlider from "./components/ui/HeroSlider";
import Footer from "./components/ui/Footer";
import FlashSaleList from "./components/ui/FlashSaleList";
import CategoryProduct from "./components/ui/CategoryProduct";
import ShopArticle from "./components/ui/ShopArticle";
import VoiceQuickOrderTest from "./components/ui/VoiceQuickOrderTest";
import AIRecommendedProducts from "./components/ui/AIRecommendedProducts";
import PostList from "./components/post/PostList";

interface ProductPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductPage({ searchParams }: ProductPageProps) {
  // Await searchParams before accessing its properties
  const resolvedSearchParams = await searchParams;

  // Xử lý safely searchParams
  const rawType = Array.isArray(resolvedSearchParams?.type)
    ? resolvedSearchParams?.type[0]
    : resolvedSearchParams?.type;

  const type = rawType === "new" ? "new" : "hot";

  return (
    <>
      <HeaderHome />
      <BannerCarousel />
      <ServiceHighlights />
      <FlashSaleList />
      <CategoryProduct />
      <AIRecommendedProducts />
      <ProductTabs type={type} />
      <VoiceQuickOrderTest />
      <HeroSlider />
      <ShopArticle />
      <PostList limit={3} showMore={true} />
      <Footer />
    </>
  );
}
