// // "use client";
// // import React, { useState } from "react";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import {
// //   faChevronRight,
// //   faFilter,
// //   faBars,
// //   faGrip,
// //   faArrowDown19,
// //   faArrowDown91,
// // } from "@fortawesome/free-solid-svg-icons";
// // import "../css/shop.css";
// // const colors = [
// //   "#7f212d",
// //   "#67a55f",
// //   "#3430b2",
// //   "#ce8549",
// //   "#7f215d",
// //   "#a57e5f",
// //   "#7f212d",
// //   "#a57e5f",
// //   "#7f212d",
// //   "#a57e5f",
// //   "#7f212d",
// //   "#a57e5f",
// // ];

// // const sizes = ["S", "M", "L", "XL"];

// // export default function BreadcrumbFilter() {
// //   const [filterOpen, setFilterOpen] = useState(false);
// //   const [sortOpen, setSortOpen] = useState(false);
// //   const [activeTab, setActiveTab] = useState<"color" | "size" | "price">(
// //     "color"
// //   );
// //   const [selectedColors, setSelectedColors] = useState<string[]>([]);
// //   const [selectedSize, setSelectedSize] = useState<string | null>(null);
// //   const [priceRange, setPriceRange] = useState(0);

// //   function toggleFilter() {
// //     setFilterOpen(!filterOpen);
// //     if (!filterOpen) setSortOpen(false);
// //   }

// //   function toggleSort() {
// //     setSortOpen(!sortOpen);
// //     if (!sortOpen) setFilterOpen(false);
// //   }

// //   function selectColor(color: string) {
// //     if (selectedColors.includes(color)) {
// //       setSelectedColors(selectedColors.filter((c) => c !== color));
// //     } else {
// //       setSelectedColors([...selectedColors, color]);
// //     }
// //   }

// //   function selectSize(size: string) {
// //     setSelectedSize(size);
// //   }

// //   function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
// //     setPriceRange(parseInt(e.target.value));
// //   }

// //   // Ripple effect
// //   function createRipple(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
// //     const button = e.currentTarget;
// //     const circle = document.createElement("span");
// //     circle.className = "ripple";
// //     const rect = button.getBoundingClientRect();
// //     const size = Math.max(rect.width, rect.height);
// //     circle.style.width = circle.style.height = size + "px";
// //     circle.style.left = e.clientX - rect.left - size / 2 + "px";
// //     circle.style.top = e.clientY - rect.top - size / 2 + "px";
// //     button.appendChild(circle);
// //     setTimeout(() => {
// //       circle.remove();
// //     }, 600);
// //   }

// //   return (
// //     <>
// //       <div className="breadcrumb-container">
// //         <div className="breadcrumb-left">
// //           <div className="product-count">
// //             144 <span>Sản phẩm</span>
// //           </div>
// //           <div className="breadcrumbs">
// //             Trang chủ <FontAwesomeIcon icon={faChevronRight} /> Thời Trang Nữ{" "}
// //             <FontAwesomeIcon icon={faChevronRight} /> <span>Áo Nữ</span>
// //           </div>
// //         </div>
// //         <div className="breadcrumb-right">
// //           <FontAwesomeIcon
// //             icon={faFilter}
// //             id="filterBtn"
// //             onClick={toggleFilter}
// //             style={{ cursor: "pointer" }}
// //           />
// //           <FontAwesomeIcon
// //             icon={faBars}
// //             id="sortBtn"
// //             onClick={toggleSort}
// //             style={{ cursor: "pointer" }}
// //           />
// //           <FontAwesomeIcon icon={faGrip} />
// //         </div>

// //         {/* Filter modal */}
// //         <div className={`filter-modal ${filterOpen ? "show" : ""}`}>
// //           <h4>
// //             <p>Bộ lọc</p>
// //           </h4>

// //           <div className="filter-options">
// //             {(["color", "size", "price"] as const).map((tab) => (
// //               <button
// //                 key={tab}
// //                 className={`filter-tab ${activeTab === tab ? "active" : ""}`}
// //                 data-tab={tab}
// //                 onClick={() => setActiveTab(tab)}
// //               >
// //                 {tab === "color" ? "Màu" : tab === "size" ? "Kích Cỡ" : "Giá"}
// //               </button>
// //             ))}
// //           </div>

// //           {/* Tab content */}
// //           <div
// //             className={`filter-tab-content ${
// //               activeTab === "color" ? "active" : ""
// //             }`}
// //             id="filter-color"
// //           >
// //             <div className="color-boxes">
// //               {colors.map((color, i) => (
// //                 <div
// //                   key={i}
// //                   className={`color-item ${
// //                     selectedColors.includes(color) ? "selected" : ""
// //                   }`}
// //                   style={{ background: color, position: "relative" }}
// //                   onClick={(e) => {
// //                     createRipple(e);
// //                     selectColor(color);
// //                   }}
// //                 ></div>
// //               ))}
// //             </div>
// //           </div>

// //           <div
// //             className={`filter-tab-content ${
// //               activeTab === "size" ? "active" : ""
// //             }`}
// //             id="filter-size"
// //           >
// //             <div className="size-boxes">
// //               {sizes.map((size) => (
// //                 <div
// //                   key={size}
// //                   className={`size-item ${
// //                     selectedSize === size ? "selected" : ""
// //                   }`}
// //                   onClick={(e) => {
// //                     createRipple(e);
// //                     selectSize(size);
// //                   }}
// //                 >
// //                   {size}
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //           <div
// //             className={`filter-tab-content ${
// //               activeTab === "price" ? "active" : ""
// //             }`}
// //             id="filter-price"
// //           >
// //             <div className="price-range">
// //               <input
// //                 type="range"
// //                 min={0}
// //                 max={2000000}
// //                 step={10000}
// //                 value={priceRange}
// //                 onChange={handlePriceChange}
// //               />
// //               <div className="price-labels">
// //                 <span>0đ</span>
// //                 <span>2,000,000đ</span>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="filter-actions">
// //             <button
// //               className="clear-btn"
// //               onClick={() => {
// //                 setSelectedColors([]);
// //                 setSelectedSize(null);
// //                 setPriceRange(0);
// //               }}
// //             >
// //               Xoá hết
// //             </button>
// //             <button className="apply-btn">Xem kết quả</button>
// //           </div>
// //         </div>

// //         {/* Sort dropdown */}
// //         <div
// //           className={`sort-dropdown ${sortOpen ? "show" : ""}`}
// //           id="sortDropdown"
// //         >
// //           <h4>
// //             <p>Sắp xếp theo</p>
// //           </h4>
// //           <ul>
// //             <li>
// //               <FontAwesomeIcon icon={faArrowDown19} />
// //               Giá giảm dần
// //             </li>
// //             <li>
// //               <FontAwesomeIcon icon={faArrowDown91} />
// //               Giá tăng dần
// //             </li>
// //           </ul>
// //         </div>
// //       </div>

// //       {/* Sub categories */}
// //       <div className="sub-categories">
// //         <button>GIÁ TỐT</button>
// //         <button>Áo Thun Nữ</button>
// //         <button>Áo Tank Top Nữ</button>
// //         <button>Áo Sơ Mi Nữ</button>
// //         <button>Áo Vest Nữ</button>
// //         <button>Áo Khoác Nữ</button>
// //         <button>Áo Nỉ Nữ</button>
// //         <button>Áo Len - Hoodie</button>
// //       </div>
// //     </>
// //   );
// // }
// "use client";
// import "../css/homepage.css";
// import "../css/shop.css";
// import React, { useEffect, useState } from "react";
// import ProductList from "../components/ProductList";
// import BreadcrumbFilter from "../components/shop";
// import { useRouter } from "next/navigation";
// import HomePage from "../components/Homepage";
// import HeaderHome from "../components/header";
// type Product = {
//   id: number;
//   name: string;
//   variant: string[];
//   img: string[];
// };

// export default function ProductPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const router = useRouter();

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch("http://localhost:4000/products");
//       const data = await res.json();
//       setProducts(data);
//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleViewDetail = (productId: number) => {
//     router.push(`/product/${productId}`);
//   };

//   const handleAddToCart = (
//     name: string,
//     variant: string,
//     price: number,
//     image: string
//   ) => {
//     console.log("Add to cart:", { name, variant, price, image });
//   };

//   return (
//     <div>
//       <HeaderHome></HeaderHome>
//       <BreadcrumbFilter></BreadcrumbFilter>
//       <ProductList
//         products={products}
//         onAddToCart={handleAddToCart}
//         onViewDetail={handleViewDetail}
//       />
//     </div>
//   );
// }
// app/products/page.tsx

// import ProductCard from "../components/ProductList";

// async function getProducts() {
//   const res = await fetch("http://127.0.0.1:8000/product", {
//     next: { revalidate: 0 }, // Sử dụng nếu bạn muốn fetch mỗi lần
//   });

//   const json = await res.json();
//   return json.data.data; // Truy cập mảng sản phẩm trong `data.data`
// }

// export default async function ProductPage() {
//   const products = await getProducts();

//   return (
//     <main className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {products.map((product: any) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </main>
//   );
// }
// app/product/page.tsx
// import ProductCard from "../components/ProductList";

// async function getProducts() {
//   const res = await fetch("http://127.0.0.1:8000/product", {
//     next: { revalidate: 0 },
//   });
//   const json = await res.json();
//   return json.data.data;
// }

// export default async function ProductPage() {
//   const products = await getProducts();

//   return (
//     <main className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//       {products.map((product: any) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </main>
//   );
// }
// import "../css/homepage.css";
// import ProductList from "../components/ProductList";

// async function getProducts() {
//   const res = await fetch("http://127.0.0.1:8000/product", {
//     next: { revalidate: 0 },
//   });
//   const json = await res.json();
//   return json.data.data;
// }

// export default async function ProductPage() {
//   const products = await getProducts();

//   return (
//     <main className="p-4">
//       <ProductList products={products} />
//     </main>
//   );
// }
import ProductCard from "../components/ProductList";
import BreadcrumbFilter from "../components/shop";
import HeaderHome from "../components/header";
async function getProducts() {
  const res = await fetch("http://127.0.0.1:8000/product", {
    next: { revalidate: 0 },
  });
  const json = await res.json();
  return json.data.data;
}

export default async function ProductPage() {
  const products = await getProducts();

  return (
    <>
      <HeaderHome></HeaderHome>
      <BreadcrumbFilter></BreadcrumbFilter>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
