// "use client";
// import BannerCarousel from "./components/ui/BannerCarousel";
// import HeaderHome from "./components/ui/Header";
// import ProductTabs from "./components/ui/ProductTabs";
// import ServiceHighlights from "./components/ui/ServiceHighlights";
// import HeroSlider from "./components/ui/HeroSlider";
// import Footer from "./components/ui/Footer";
// import FlashSaleList from "./components/ui/FlashSaleList";
// import CategoryProduct from "./components/ui/CategoryProduct";
// import ShopArticle from "./components/ui/ShopArticle";
// import VoiceQuickOrderTest from "./components/ui/VoiceQuickOrderTest";
// import AIRecommendedProducts from "./components/ui/AIRecommendedProducts";

// export default function ProductPage({
//   searchParams,
// }: {
//   searchParams: { type?: string };
// }) {
//   const type = searchParams?.type === "new" ? "new" : "hot";
//   return (
//     <>
//       <HeaderHome />
//       <BannerCarousel />
//       <ServiceHighlights />
//       <FlashSaleList />
//       <CategoryProduct />
//       <AIRecommendedProducts />
//       <ProductTabs type={type} />
//       <VoiceQuickOrderTest />
//       <HeroSlider />
//       <ShopArticle />
//       <Footer />
//     </>
//   );
// }
// app/product/page.tsx hoặc tương tự

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

export default function ProductPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const type = searchParams?.type === "new" ? "new" : "hot";

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
