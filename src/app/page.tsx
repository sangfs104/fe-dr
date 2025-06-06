import BannerCarousel from "./components/BannerCarousel";
import HeaderHome from "./components/Header";
import ProductTabs from "./components/ProductTabs";
import ServiceHighlights from "./components/ServiceHighlights";
import PromotionList from "./components/PromotionList";
import HeroSlider from "./components/HeroSlider";
import Footer from "./components/Footer";
import CategoryList from "./components/CategoryList";
import FlashSaleList from "./components/FlashSaleList";

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
      <CategoryList />
      <FlashSaleList />
      <ProductTabs type={type} />
      <PromotionList />
      <HeroSlider />
      <ServiceHighlights />
      <Footer />
    </>
  );
}
