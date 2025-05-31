// app/products/page.tsx (hoặc tương đương)
import BannerCarousel from "./components/BannerCarousel";
import HeaderHome from "./components/Header";
import ProductTabs from "./components/ProductTabs";
import ServiceHighlights from "./components/ServiceHighlights";
import PromotionList from "./components/PromotionList";
import HeroSlider from "./components/HeroSlider";
import Footer from "./components/Footer";
import CategoryList from "./components/CategoryList";
import FlashSale from "./components/FlashSale";
export default async function ProductPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const type = (searchParams?.type as "hot" | "new") || "hot";

  return (
    <>
      <HeaderHome />
      <BannerCarousel></BannerCarousel>
      <ServiceHighlights></ServiceHighlights>
      <FlashSale></FlashSale>
      <ProductTabs type={type} />
      <PromotionList />
      <HeroSlider></HeroSlider>
      <CategoryList />
      <Footer></Footer>
    </>
  );
}
