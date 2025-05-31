import HeaderHome from "../components/Header";
import Footer from "../components/Footer";
import MainContent from "../components/Blog";
export default async function ProductPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const type = (searchParams?.type as "hot" | "new") || "hot";
  return (
    <>
      <HeaderHome />
      <MainContent />
      <Footer></Footer>
    </>
  );
}
