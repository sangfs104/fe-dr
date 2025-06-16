import HeaderHome from "../components/Header";

// import PromotionList from "./components/PromotionList";

import Footer from "../components/Footer";

import LuckyWheel from "../components/LuckyWheel";
export default function ProductPage({}: { searchParams: { type?: string } }) {
  return (
    <>
      <HeaderHome />

      <LuckyWheel />

      <Footer />
    </>
  );
}
