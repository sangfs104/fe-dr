import BannerCarousel from "./components/BannerCarousel";
import HeaderHome from "./components/Header";
import ProductTabs from "./components/ProductTabs";
import ServiceHighlights from "./components/ServiceHighlights";
import PromotionList from "./components/PromotionList";
import HeroSlider from "./components/HeroSlider";
import Footer from "./components/Footer";
import CategoryList from "./components/CategoryList";
// import FlashSale from "./components/FlashSale";

// export default function ProductPage({
//   searchParams,
// }: {
//   searchParams: { type?: string };
// }) {
//   const type = (searchParams?.type as "hot" | "new" | "sale") || "hot";

//   return (
//     <>
//       <HeaderHome />
//       <BannerCarousel />
//       <ServiceHighlights />
//       <FlashSale />
//       {/* ✅ Pass type từ searchParams xuống ProductTabs như initialType */}
//       <ProductTabs initialType={type} />
//       <PromotionList />
//       <HeroSlider />
//       <CategoryList />
//       <Footer />
//     </>
//   );
// }
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

      <ProductTabs type={type} />
      <PromotionList />
      <HeroSlider />

      <ServiceHighlights />
      <Footer />
    </>
  );
}
