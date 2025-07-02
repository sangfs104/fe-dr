'"use client";';
import BannerCarousel from "./components/BannerCarousel";
import HeaderHome from "./components/Header";
import ProductTabs from "./components/ProductTabs";
import ServiceHighlights from "./components/ServiceHighlights";
// import PromotionList from "./components/PromotionList";
import HeroSlider from "./components/HeroSlider";
import Footer from "./components/Footer";
// import CategoryList from "./components/CategoryList";
// import Sanpham from "./components/Sanpham";
import FlashSaleList from "./components/FlashSaleList";
import CategoryProduct from "./components/CategoryProduct";
import ShopArticle from "./components/ShopArticle";
import VoiceQuickOrderTest from "./components/VoiceQuickOrderTest";

// import CategoryAndProduct from "./components/CategoryAndProduct";
// import ProductWithCategoryPage from "./components/ProductWithCategoryPage";
// ...existing code...
// ...existing code...
// import LuckyWheel from "./components/LuckyWheel";
export default function ProductPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const type = (searchParams?.type as "hot" | "new" | "sale") || "hot";

  return (
    <>
      <HeaderHome />
      <BannerCarousel />
      <ServiceHighlights />
      <FlashSaleList />
      <CategoryProduct></CategoryProduct>
      {/* <CategoryList /> */}
      {/* <Sanpham></Sanpham>   */}
      {/* <CategoryAndProduct /> */}
      {/* <FlashSaleList /> */}

      <ProductTabs type={type} />
      {/* <LuckyWheel /> */}
      {/* <ProductWithCategoryPage /> */}
      {/* <PromotionList /> */}
      <VoiceQuickOrderTest />
      <HeroSlider />
      <ShopArticle />
      <Footer />
    </>
  );
}
