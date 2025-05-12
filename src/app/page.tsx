import Image from "next/image";
import HeaderHome from "./components/header";
import BannerSection from "./components/BannerSection";
import "./css/headerhome.css";
import "./css/homepage.css";
export default function Home() {
  return (
    <main>
      <HeaderHome />
   <BannerSection />
    </main>
  );
}
