import Image from "next/image";
import HeaderHome from "./components/header";
import HomePage from "./components/Homepage";
import "./css/headerhome.css";
import "./css/homepage.css";
export default function Home() {
  return (
    <main>
      <HeaderHome />
      <HomePage />
    </main>
  );
}
