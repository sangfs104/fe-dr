"use client";
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
type ProductType = "hot" | "new";
interface ProductPageProps {
  searchParams: {
    type?: string;
  };
}
export default function ProductPage({ searchParams }: ProductPageProps) {
  const rawType = searchParams?.type;
  const type: ProductType = rawType === "new" ? "new" : "hot";

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
      <Footer />
    </>
  );
}
