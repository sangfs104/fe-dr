// // // "use client";

// // // import ProductModal from "./ProductModal";
// // // import Image from "next/image";
// // // import Link from "next/link";
// // // import { useState } from "react";
// // // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // // import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// // // import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
// // // import toast from "react-hot-toast";

// // // import { addToCart } from "@/store/cartSlice";
// // // import { addToWishlistAPI, fetchWishlist } from "@/store/wishlistSlice";
// // // import { useAppDispatch } from "@/store/hooks";
// // // import { useRouter } from "next/navigation";

// // // interface ProductImage {
// // //   id: number;
// // //   product_id: number;
// // //   name: string;
// // //   color?: string;
// // // }

// // // interface ProductVariant {
// // //   id: number;
// // //   product_id: number;
// // //   img_id: number;
// // //   size: string;
// // //   color?: string;
// // //   price: number;
// // //   sale_price: string | null;
// // //   stock_quantity: number;
// // //   status: string;
// // // }

// // // interface Product {
// // //   id: number;
// // //   name: string;
// // //   description: string;
// // //   status: string;
// // //   img: ProductImage[];
// // //   images?: string[];
// // //   variant: ProductVariant[];
// // //   category_id: number;
// // //   category?: {
// // //     id: number;
// // //     name: string;
// // //   };
// // // }

// // // export default function ProductCard({ product }: { product: Product }) {
// // //   const dispatch = useAppDispatch();
// // //   const router = useRouter();

// // //   // Ưu tiên sử dụng mảng images từ API trước, nếu không có thì fallback sang /img/{name}
// // //   const imageList =
// // //     product.images && product.images.length > 0
// // //       ? product.images
// // //       : product.img.map((i) => `/img/${i.name}`);

// // //   const [mainImage, setMainImage] = useState<string | undefined>(
// // //     imageList?.[0]
// // //   );

// // //   const selectedVariant = product.variant?.[0];
// // //   const [showModal, setShowModal] = useState(false);

// // //   const handleImageHover = (imgUrl: string) => {
// // //     setMainImage(imgUrl);
// // //   };

// // //   const handleAddToCart = () => {
// // //     if (!selectedVariant) return;

// // //     const priceToUse =
// // //       selectedVariant.sale_price && Number(selectedVariant.sale_price) > 0
// // //         ? Number(selectedVariant.sale_price)
// // //         : selectedVariant.price;

// // //     dispatch(
// // //       addToCart({
// // //         productId: product.id,
// // //         variantId: selectedVariant.id,
// // //         name: product.name,
// // //         img: mainImage ?? "", // ảnh đang chọn
// // //         price: priceToUse,
// // //         size: selectedVariant.size,
// // //         quantity: 1,
// // //         variantList: product.variant,
// // //       })
// // //     );

// // //     toast.success("Đã thêm vào giỏ hàng");
// // //   };

// // //   const handleAddToWishlist = async () => {
// // //     const token =
// // //       typeof window !== "undefined" ? localStorage.getItem("token") : null;
// // //     if (!token) {
// // //       toast.error("Bạn cần đăng nhập để thêm vào wishlist!");
// // //       router.push("/login");
// // //       return;
// // //     }
// // //     if (!selectedVariant) return;

// // //     const wishlistItem = {
// // //       productId: product.id,
// // //       variantId: selectedVariant.id,
// // //       name: product.name,
// // //       img: mainImage ?? "",
// // //       price:
// // //         selectedVariant.sale_price && Number(selectedVariant.sale_price) > 0
// // //           ? Number(selectedVariant.sale_price)
// // //           : selectedVariant.price,
// // //       size: selectedVariant.size,
// // //     };

// // //     const result = await dispatch(addToWishlistAPI(wishlistItem));
// // //     if (addToWishlistAPI.fulfilled.match(result)) {
// // //       toast.success("Đã thêm vào wishlist 💖");
// // //       await dispatch(fetchWishlist());
// // //     } else {
// // //       toast.error((result.payload as string) || "Có lỗi khi thêm vào wishlist");
// // //     }
// // //   };

// // //   const discountPercent =
// // //     selectedVariant?.sale_price &&
// // //     Number(selectedVariant.sale_price) > 0 &&
// // //     selectedVariant.price > Number(selectedVariant.sale_price)
// // //       ? Math.round(
// // //           ((selectedVariant.price - Number(selectedVariant.sale_price)) /
// // //             selectedVariant.price) *
// // //             100
// // //         )
// // //       : 0;

// // //   return (
// // //     <>
// // //       <div className="border rounded-lg mt-10 shadow-sm p-4 group bg-white hover:shadow-md transition duration-200">
// // //         <div className="relative">
// // //           <Link href={`/products/${product.id}`} className="block relative">
// // //             {/* Badge giảm giá */}
// // //             {discountPercent > 0 && (
// // //               <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow z-10">
// // //                 -{discountPercent}%
// // //               </div>
// // //             )}

// // //             {mainImage ? (
// // //               <Image
// // //                 src={mainImage}
// // //                 alt={product.name}
// // //                 width={500}
// // //                 height={600}
// // //                 className="w-full h-64 object-cover rounded"
// // //               />
// // //             ) : (
// // //               <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400 rounded">
// // //                 No Image
// // //               </div>
// // //             )}
// // //           </Link>

// // //           <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
// // //             <button
// // //               className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
// // //               disabled={!selectedVariant}
// // //               onClick={handleAddToCart}
// // //               aria-label="Add to cart"
// // //             >
// // //               <FontAwesomeIcon icon={faCartShopping} />
// // //             </button>

// // //             <button
// // //               className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
// // //               onClick={() => setShowModal(true)}
// // //               aria-label="View details"
// // //             >
// // //               <FontAwesomeIcon icon={faEye} />
// // //             </button>

// // //             <button
// // //               className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
// // //               onClick={handleAddToWishlist}
// // //               aria-label="Add to wishlist"
// // //             >
// // //               <FontAwesomeIcon icon={faHeart} />
// // //             </button>
// // //           </div>
// // //         </div>

// // //         {/* Thumbnail - hiển thị 2 ảnh đầu tiên từ imageList */}
// // //         <div className="flex gap-2 mt-2">
// // //           {imageList?.slice(0, 2).map((imgUrl, idx) => (
// // //             <div
// // //               key={idx}
// // //               className={`w-10 h-10 rounded border cursor-pointer ${
// // //                 imgUrl === mainImage ? "border-blue-500" : "border-gray-300"
// // //               }`}
// // //               onMouseEnter={() => handleImageHover(imgUrl)}
// // //             >
// // //               <Image
// // //                 src={imgUrl}
// // //                 alt={`thumb-${idx}`}
// // //                 width={40}
// // //                 height={40}
// // //                 className="w-full h-full object-cover rounded"
// // //               />
// // //             </div>
// // //           ))}
// // //         </div>

// // //         <div className="mt-3">
// // //           <h3 className="text-sm text-gray-500">
// // //             {product.category?.name || `Category ID: ${product.category_id}`}
// // //           </h3>
// // //           <h2 className="text-lg font-semibold">{product.name}</h2>

// // //           <div className="mt-1 text-base font-medium">
// // //             {selectedVariant?.sale_price &&
// // //             Number(selectedVariant.sale_price) > 0 ? (
// // //               <>
// // //                 <span className="text-red-500 font-semibold">
// // //                   {Number(selectedVariant.sale_price).toLocaleString("vi-VN")} ₫
// // //                 </span>
// // //                 <span className="ml-2 text-gray-500 line-through text-sm">
// // //                   {selectedVariant.price.toLocaleString("vi-VN")} ₫
// // //                 </span>
// // //               </>
// // //             ) : (
// // //               <>{selectedVariant?.price?.toLocaleString("vi-VN") || "—"} ₫</>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {showModal && (
// // //         <ProductModal product={product} onClose={() => setShowModal(false)} />
// // //       )}
// // //     </>
// // //   );
// // // }
// // "use client";

// // import ProductModal from "./ProductModal";
// // import Image from "next/image";
// // import Link from "next/link";
// // import { useState } from "react";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// // import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
// // import toast from "react-hot-toast";

// // import { addToCart } from "@/store/cartSlice";
// // import { addToWishlistAPI, fetchWishlist } from "@/store/wishlistSlice";
// // import { useAppDispatch } from "@/store/hooks";
// // import { useRouter } from "next/navigation";
// // import { Product } from "../../types/Product"; // Nhập cả ProductCardProps

// // export default function ProductCard({ product }: { product: Product }) {
// //   const dispatch = useAppDispatch();
// //   const router = useRouter();

// //   // Ưu tiên sử dụng mảng images từ API trước, nếu không có thì fallback sang /img/{name}
// //   const imageList =
// //     product.images && product.images.length > 0
// //       ? product.images
// //       : product.img.map((i) => `/img/${i.name}`);

// //   const [mainImage, setMainImage] = useState<string>(imageList[0]);
// //   const selectedVariant = product.variant?.[0];
// //   const [showModal, setShowModal] = useState(false);

// //   const handleImageHover = (imgUrl: string) => {
// //     setMainImage(imgUrl);
// //   };

// //   const handleAddToCart = () => {
// //     if (!selectedVariant) return;

// //     const priceToUse =
// //       selectedVariant.sale_price && Number(selectedVariant.sale_price) > 0
// //         ? Number(selectedVariant.sale_price)
// //         : selectedVariant.price;

// //     // dispatch(
// //     //   addToCart({
// //     //     productId: product.id,
// //     //     variantId: selectedVariant.id,
// //     //     name: product.name,
// //     //     img: mainImage,
// //     //     price: priceToUse,
// //     //     size: selectedVariant.size,
// //     //     quantity: 1,
// //     //     variantList: product.variant,
// //     //   })
// //     // );
// //     dispatch(
// //       addToCart({
// //         productId: product.id,
// //         variantId: selectedVariant.id,
// //         name: `${product.name} - Size ${selectedVariant.size}`,
// //         img: product.images?.[0] || "/img/no-image.jpg",
// //         price: priceToUse,
// //         sale_price: selectedVariant.sale_price, // Add this line
// //         size: selectedVariant.size,
// //         quantity: 1,
// //         variantList: product.variant,
// //       })
// //     );
// //     toast.success("Đã thêm vào giỏ hàng");
// //   };

// //   const handleAddToWishlist = async () => {
// //     const token =
// //       typeof window !== "undefined" ? localStorage.getItem("token") : null;
// //     if (!token) {
// //       toast.error("Bạn cần đăng nhập để thêm vào wishlist!");
// //       router.push("/login");
// //       return;
// //     }
// //     if (!selectedVariant) return;

// //     const wishlistItem = {
// //       productId: product.id,
// //       variantId: selectedVariant.id,
// //       name: product.name,
// //       img: mainImage,
// //       price:
// //         selectedVariant.sale_price && Number(selectedVariant.sale_price) > 0
// //           ? Number(selectedVariant.sale_price)
// //           : selectedVariant.price,
// //       size: selectedVariant.size,
// //     };

// //     const result = await dispatch(addToWishlistAPI(wishlistItem));
// //     if (addToWishlistAPI.fulfilled.match(result)) {
// //       toast.success("Đã thêm vào wishlist 💖");
// //       await dispatch(fetchWishlist());
// //     } else {
// //       toast.error((result.payload as string) || "Có lỗi khi thêm vào wishlist");
// //     }
// //   };

// //   const discountPercent =
// //     selectedVariant?.sale_price &&
// //     Number(selectedVariant.sale_price) > 0 &&
// //     selectedVariant.price > Number(selectedVariant.sale_price)
// //       ? Math.round(
// //           ((selectedVariant.price - Number(selectedVariant.sale_price)) /
// //             selectedVariant.price) *
// //             100
// //         )
// //       : 0;

// //   // Đảm bảo category luôn tồn tại khi truyền vào ProductModal
// //   const safeProduct = {
// //     ...product,
// //     images: imageList,
// //     category: product.category || {
// //       id: product.category_id,
// //       name: `Category ${product.category_id}`,
// //     }, // Giá trị mặc định
// //   };

// //   return (
// //     <>
// //       <div className="border rounded-lg mt-10 shadow-sm p-4 group bg-white hover:shadow-md transition duration-200">
// //         <div className="relative">
// //           <Link href={`/products/${product.id}`} className="block relative">
// //             {discountPercent > 0 && (
// //               <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow z-10">
// //                 -{discountPercent}%
// //               </div>
// //             )}

// //             {mainImage ? (
// //               <Image
// //                 src={mainImage}
// //                 alt={product.name}
// //                 width={500}
// //                 height={600}
// //                 className="w-full h-64 object-cover rounded"
// //               />
// //             ) : (
// //               <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400 rounded">
// //                 No Image
// //               </div>
// //             )}
// //           </Link>

// //           <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
// //             <button
// //               className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
// //               disabled={!selectedVariant}
// //               onClick={handleAddToCart}
// //               aria-label="Add to cart"
// //             >
// //               <FontAwesomeIcon icon={faCartShopping} />
// //             </button>

// //             <button
// //               className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
// //               onClick={() => setShowModal(true)}
// //               aria-label="View details"
// //             >
// //               <FontAwesomeIcon icon={faEye} />
// //             </button>

// //             <button
// //               className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
// //               onClick={handleAddToWishlist}
// //               aria-label="Add to wishlist"
// //             >
// //               <FontAwesomeIcon icon={faHeart} />
// //             </button>
// //           </div>
// //         </div>

// //         <div className="flex gap-2 mt-2">
// //           {imageList.slice(0, 2).map((imgUrl, idx) => (
// //             <div
// //               key={idx}
// //               className={`w-10 h-10 rounded border cursor-pointer ${
// //                 imgUrl === mainImage ? "border-blue-500" : "border-gray-300"
// //               }`}
// //               onMouseEnter={() => handleImageHover(imgUrl)}
// //             >
// //               <Image
// //                 src={imgUrl}
// //                 alt={`thumb-${idx}`}
// //                 width={40}
// //                 height={40}
// //                 className="w-full h-full object-cover rounded"
// //               />
// //             </div>
// //           ))}
// //         </div>

// //         <div className="mt-3">
// //           <h3 className="text-sm text-gray-500">
// //             {product.category?.name || `Category ID: ${product.category_id}`}
// //           </h3>
// //           <h2 className="text-lg font-semibold">{product.name}</h2>

// //           <div className="mt-1 text-base font-medium">
// //             {selectedVariant?.sale_price &&
// //             Number(selectedVariant.sale_price) > 0 ? (
// //               <>
// //                 <span className="text-red-500 font-semibold">
// //                   {Number(selectedVariant.sale_price).toLocaleString("vi-VN")} ₫
// //                 </span>
// //                 <span className="ml-2 text-gray-500 line-through text-sm">
// //                   {selectedVariant.price.toLocaleString("vi-VN")} ₫
// //                 </span>
// //               </>
// //             ) : (
// //               <>{selectedVariant?.price?.toLocaleString("vi-VN") || "—"} ₫</>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {showModal && (
// //         <ProductModal
// //           product={safeProduct} // Sử dụng safeProduct với images và category được đảm bảo
// //           onClose={() => setShowModal(false)}
// //         />
// //       )}
// //     </>
// //   );
// // }
// "use client";

// import ProductModal from "./ProductModal";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
// import toast from "react-hot-toast";
// import { addToCart } from "@/store/cartSlice";
// import { addToWishlistAPI, fetchWishlist } from "@/store/wishlistSlice";
// import { useAppDispatch } from "@/store/hooks";
// import { useRouter } from "next/navigation";
// import { Product } from "../../types/Product"; // Import Product type

// // Define the props interface for ProductCard
// interface ProductCardProps {
//   product: Product;
//   keyword?: string; // Optional, as it may not always be passed
//   onClick?: () => void; // Optional, for handling click events
// }

// export default function ProductCard({
//   product,
//   keyword,
//   onClick,
// }: ProductCardProps) {
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   // Prioritize images array from API, fallback to /img/{name}
//   const imageList =
//     product.images && product.images.length > 0
//       ? product.images
//       : product.img.map((i) => `/img/${i.name}`);

//   const [mainImage, setMainImage] = useState<string>(imageList[0]);
//   const selectedVariant = product.variant?.[0];
//   const [showModal, setShowModal] = useState(false);

//   const handleImageHover = (imgUrl: string) => {
//     setMainImage(imgUrl);
//   };

//   const handleAddToCart = () => {
//     if (!selectedVariant) return;

//     const priceToUse =
//       selectedVariant.sale_price && Number(selectedVariant.sale_price) > 0
//         ? Number(selectedVariant.sale_price)
//         : selectedVariant.price;

//     dispatch(
//       addToCart({
//         productId: product.id,
//         variantId: selectedVariant.id,
//         name: `${product.name} - Size ${selectedVariant.size}`,
//         img: product.images?.[0] || "/img/no-image.jpg",
//         price: priceToUse,
//         sale_price: selectedVariant.sale_price,
//         size: selectedVariant.size,
//         quantity: 1,
//         variantList: product.variant,
//       })
//     );
//     toast.success("Đã thêm vào giỏ hàng");
//   };

//   const handleAddToWishlist = async () => {
//     const token =
//       typeof window !== "undefined" ? localStorage.getItem("token") : null;
//     if (!token) {
//       toast.error("Bạn cần đăng nhập để thêm vào wishlist!");
//       router.push("/login");
//       return;
//     }
//     if (!selectedVariant) return;

//     const wishlistItem = {
//       productId: product.id,
//       variantId: selectedVariant.id,
//       name: product.name,
//       img: mainImage,
//       price:
//         selectedVariant.sale_price && Number(selectedVariant.sale_price) > 0
//           ? Number(selectedVariant.sale_price)
//           : selectedVariant.price,
//       size: selectedVariant.size,
//     };

//     const result = await dispatch(addToWishlistAPI(wishlistItem));
//     if (addToWishlistAPI.fulfilled.match(result)) {
//       toast.success("Đã thêm vào wishlist 💖");
//       await dispatch(fetchWishlist());
//     } else {
//       toast.error((result.payload as string) || "Có lỗi khi thêm vào wishlist");
//     }
//   };

//   const discountPercent =
//     selectedVariant?.sale_price &&
//     Number(selectedVariant.sale_price) > 0 &&
//     selectedVariant.price > Number(selectedVariant.sale_price)
//       ? Math.round(
//           ((selectedVariant.price - Number(selectedVariant.sale_price)) /
//             selectedVariant.price) *
//             100
//         )
//       : 0;

//   // Ensure category is always provided for ProductModal
//   const safeProduct = {
//     ...product,
//     images: imageList,
//     category: product.category || {
//       id: product.category_id,
//       name: `Category ${product.category_id}`,
//     },
//   };

//   return (
//     <>
//       <div
//         className="border rounded-lg mt-10 shadow-sm p-4 group bg-white hover:shadow-md transition duration-200"
//         onClick={onClick} // Add onClick handler here
//       >
//         <div className="relative">
//           <Link href={`/products/${product.id}`} className="block relative">
//             {discountPercent > 0 && (
//               <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow z-10">
//                 -{discountPercent}%
//               </div>
//             )}

//             {mainImage ? (
//               <Image
//                 src={mainImage}
//                 alt={product.name}
//                 width={500}
//                 height={600}
//                 className="w-full h-64 object-cover rounded"
//               />
//             ) : (
//               <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-400 rounded">
//                 No Image
//               </div>
//             )}
//           </Link>

//           <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
//             <button
//               className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
//               disabled={!selectedVariant}
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent triggering parent onClick
//                 handleAddToCart();
//               }}
//               aria-label="Add to cart"
//             >
//               <FontAwesomeIcon icon={faCartShopping} />
//             </button>

//             <button
//               className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent triggering parent onClick
//                 setShowModal(true);
//               }}
//               aria-label="View details"
//             >
//               <FontAwesomeIcon icon={faEye} />
//             </button>

//             <button
//               className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
//               onClick={(e) => {
//                 e.stopPropagation(); // Prevent triggering parent onClick
//                 handleAddToWishlist();
//               }}
//               aria-label="Add to wishlist"
//             >
//               <FontAwesomeIcon icon={faHeart} />
//             </button>
//           </div>
//         </div>

//         <div className="flex gap-2 mt-2">
//           {imageList.slice(0, 2).map((imgUrl, idx) => (
//             <div
//               key={idx}
//               className={`w-10 h-10 rounded border cursor-pointer ${
//                 imgUrl === mainImage ? "border-blue-500" : "border-gray-300"
//               }`}
//               onMouseEnter={() => handleImageHover(imgUrl)}
//             >
//               <Image
//                 src={imgUrl}
//                 alt={`thumb-${idx}`}
//                 width={40}
//                 height={40}
//                 className="w-full h-full object-cover rounded"
//               />
//             </div>
//           ))}
//         </div>

//         <div className="mt-3">
//           <h3 className="text-sm text-gray-500">
//             {product.category?.name || `Category ID: ${product.category_id}`}
//           </h3>
//           <h2 className="text-lg font-semibold">{product.name}</h2>

//           <div className="mt-1 text-base font-medium">
//             {selectedVariant?.sale_price &&
//             Number(selectedVariant.sale_price) > 0 ? (
//               <>
//                 <span className="text-red-500 font-semibold">
//                   {Number(selectedVariant.sale_price).toLocaleString("vi-VN")} ₫
//                 </span>
//                 <span className="ml-2 text-gray-500 line-through text-sm">
//                   {selectedVariant.price.toLocaleString("vi-VN")} ₫
//                 </span>
//               </>
//             ) : (
//               <>{selectedVariant?.price?.toLocaleString("vi-VN") || "—"} ₫</>
//             )}
//           </div>
//           {/* Optionally display keyword if provided */}
//           {keyword && (
//             <p className="text-sm text-orange-500 mt-1">Matches: {keyword}</p>
//           )}
//         </div>
//       </div>

//       {showModal && (
//         <ProductModal
//           product={safeProduct}
//           onClose={() => setShowModal(false)}
//         />
//       )}
//     </>
//   );
// }

"use client";

import ProductModal from "./ProductModal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import toast from "react-hot-toast";

import { addToCart } from "@/store/cartSlice";
import { addToWishlistAPI, fetchWishlist } from "@/store/wishlistSlice";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { Product } from "../../types/Product";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Ưu tiên sử dụng mảng images từ API trước, nếu không có thì fallback sang /img/{name}
  const imageList =
    product.images && product.images.length > 0
      ? product.images
      : product.img.map((i) => `/img/${i.name}`);

  const [mainImage, setMainImage] = useState<string | undefined>(
    imageList?.[0]
  );
  const selectedVariant = product.variant?.[0];
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageHover = (imgUrl: string) => {
    setMainImage(imgUrl);
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const priceToUse =
      selectedVariant.sale_price && Number(selectedVariant.sale_price) > 0
        ? Number(selectedVariant.sale_price)
        : selectedVariant.price;

    dispatch(
      addToCart({
        productId: product.id,
        variantId: selectedVariant.id,
        name: `${product.name} - Size ${selectedVariant.size}`,
        img: product.images?.[0] || "/img/no-image.jpg",
        price: priceToUse,
        sale_price: selectedVariant.sale_price,
        size: selectedVariant.size,
        quantity: 1,
        variantList: product.variant,
      })
    );
    toast.success("🛒 Đã thêm vào giỏ hàng thành công!");
  };

  const handleAddToWishlist = async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      toast.error("🔐 Bạn cần đăng nhập để thêm vào wishlist!");
      router.push("/login");
      return;
    }
    if (!selectedVariant) return;

    const wishlistItem = {
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      img: mainImage ?? "",
      price:
        selectedVariant.sale_price && Number(selectedVariant.sale_price) > 0
          ? Number(selectedVariant.sale_price)
          : selectedVariant.price,
      size: selectedVariant.size,
    };

    const result = await dispatch(addToWishlistAPI(wishlistItem));
    if (addToWishlistAPI.fulfilled.match(result)) {
      toast.success("❤️ Đã thêm vào wishlist!");
      await dispatch(fetchWishlist());
    } else {
      toast.error(
        (result.payload as string) || "❌ Có lỗi khi thêm vào wishlist"
      );
    }
  };

  const discountPercent =
    selectedVariant?.sale_price &&
    Number(selectedVariant.sale_price) > 0 &&
    selectedVariant.price > Number(selectedVariant.sale_price)
      ? Math.round(
          ((selectedVariant.price - Number(selectedVariant.sale_price)) /
            selectedVariant.price) *
            100
        )
      : 0;

  return (
    <>
      <div
        className="group relative overflow-hidden mt-8 transform transition-all duration-700 hover:-translate-y-6 hover:scale-[1.02]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Shopee-style animated glow background */}
        <div className="absolute -inset-4 bg-gradient-to-br from-orange-400/20 via-red-400/20 to-pink-400/20 rounded-3xl blur-2xl group-hover:blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>

        {/* Floating sparkles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-gradient-to-r from-orange-400 to-yellow-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-all duration-1000`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Main card with enhanced Shopee styling */}
        <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 group-hover:shadow-2xl group-hover:shadow-orange-500/20 transition-all duration-700 overflow-hidden">
          {/* Shopee-style top gradient bar */}
          <div className="h-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

          {/* Image section */}
          <div className="relative p-4 pb-2">
            <Link
              href={`/products/${product.id}`}
              className="block relative group/image"
            >
              {/* Enhanced discount badge - Shopee style */}
              {discountPercent > 0 && (
                <div className="absolute -top-2 -left-2 z-20 transform group-hover:scale-110 transition-all duration-500">
                  <div className="relative">
                    {/* Badge glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-md opacity-60 animate-pulse"></div>
                    <div className="relative bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border-2 border-white transform -rotate-12 group-hover:-rotate-6 transition-transform duration-300">
                      <span className="drop-shadow-sm">
                        {discountPercent}% GIẢM
                      </span>
                      {/* Shopee corner fold effect */}
                      <div className="absolute -bottom-1 -right-1 w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-red-600"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Main image container with Shopee-style border */}
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-50 to-red-50 group-hover:rounded-2xl transition-all duration-700 border-2 border-transparent group-hover:border-orange-200">
                {/* Loading shimmer with orange theme */}
                {imageLoading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-100 via-orange-200 to-orange-100 animate-pulse"></div>
                )}

                {mainImage ? (
                  <Image
                    src={mainImage}
                    alt={product.name}
                    width={500}
                    height={600}
                    className={`w-full h-64 object-cover transition-all duration-700 group-hover/image:scale-110 ${
                      imageLoading ? "opacity-0" : "opacity-100"
                    }`}
                    onLoadingComplete={() => setImageLoading(false)}
                  />
                ) : (
                  <div className="w-full h-64 bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center text-gray-400 rounded-xl">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 bg-orange-200 rounded-full animate-pulse"></div>
                      <span className="text-sm">Không có hình ảnh</span>
                    </div>
                  </div>
                )}

                {/* Shopee-style image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-all duration-500"></div>

                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-xl border-2 border-orange-400/0 group-hover:border-orange-400/50 transition-all duration-500"></div>
              </div>
            </Link>

            {/* Enhanced floating action buttons - Shopee style */}
            <div
              className={`absolute top-6 right-6 flex flex-col gap-2 transition-all duration-500 ${
                isHovered
                  ? "translate-x-0 opacity-100"
                  : "translate-x-12 opacity-0"
              }`}
            >
              {/* Add to cart button */}
              <button
                className="group/btn relative bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedVariant}
                onClick={handleAddToCart}
                aria-label="Thêm vào giỏ hàng"
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="w-4 h-4 text-white drop-shadow-sm"
                />
                <div className="absolute inset-0 bg-white/20 rounded-xl scale-0 group-hover/btn:scale-100 transition-transform duration-200"></div>
              </button>

              {/* Quick view button */}
              <button
                className="group/btn relative bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-orange-200 hover:bg-orange-50 hover:border-orange-300 hover:shadow-xl hover:scale-110 transition-all duration-300"
                onClick={() => setShowModal(true)}
                aria-label="Xem nhanh"
              >
                <FontAwesomeIcon
                  icon={faEye}
                  className="w-4 h-4 text-orange-600 group-hover/btn:text-orange-700"
                />
              </button>

              {/* Wishlist button */}
              <button
                className="group/btn relative bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-pink-200 hover:bg-pink-50 hover:border-pink-300 hover:shadow-xl hover:scale-110 transition-all duration-300"
                onClick={handleAddToWishlist}
                aria-label="Thêm vào yêu thích"
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  className="w-4 h-4 text-pink-500 group-hover/btn:text-pink-600"
                />
              </button>
            </div>
          </div>

          {/* Enhanced thumbnail gallery */}
          <div className="px-4 mb-3">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {imageList?.slice(0, 5).map((imgUrl, idx) => (
                <div
                  key={idx}
                  className={`relative flex-shrink-0 w-12 h-12 rounded-lg cursor-pointer overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                    imgUrl === mainImage
                      ? "border-orange-400 shadow-md shadow-orange-400/30"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                  onMouseEnter={() => handleImageHover(imgUrl)}
                  style={{
                    animationDelay: `${idx * 50}ms`,
                  }}
                >
                  <Image
                    src={imgUrl}
                    alt={`thumb-${idx}`}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  {imgUrl === mainImage && (
                    <div className="absolute inset-0 bg-orange-500/20 border border-orange-400 rounded-lg"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced product info section */}
          <div className="px-4 pb-4 relative space-y-3">
            {/* Category badge - Shopee style */}
            <div className="inline-flex items-center">
              <span className="px-2 py-1 text-xs font-medium text-orange-700 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-md border border-orange-200">
                {product.category?.name || `Danh mục ${product.category_id}`}
              </span>
            </div>

            {/* Product name with enhanced typography */}
            <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-orange-700 transition-colors duration-300 leading-snug">
              {product.name}
            </h2>

            {/* Enhanced price section - Shopee style */}
            <div className="flex items-baseline gap-2 flex-wrap">
              {selectedVariant?.sale_price &&
              Number(selectedVariant.sale_price) > 0 ? (
                <>
                  {/* Sale price with gradient */}
                  <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    ₫
                    {Number(selectedVariant.sale_price).toLocaleString("vi-VN")}
                  </span>
                  {/* Original price */}
                  <span className="text-sm text-gray-500 line-through bg-gray-100 px-1.5 py-0.5 rounded">
                    ₫{selectedVariant.price.toLocaleString("vi-VN")}
                  </span>
                  {/* Savings amount */}
                  <span className="text-xs text-green-600 font-medium bg-green-50 px-1.5 py-0.5 rounded">
                    Tiết kiệm ₫
                    {(
                      selectedVariant.price - Number(selectedVariant.sale_price)
                    ).toLocaleString("vi-VN")}
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-gray-800">
                  ₫{selectedVariant?.price?.toLocaleString("vi-VN") || "—"}
                </span>
              )}
            </div>

            {/* Shopee-style bottom features */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Còn hàng</span>
              </div>

              <div className="flex items-center gap-1 text-xs text-orange-600">
                <span>⚡</span>
                <span>Giao nhanh</span>
              </div>
            </div>

            {/* Animated progress bar at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-100 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 w-0 group-hover:w-full transition-all duration-1000 ease-out"></div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <ProductModal
          product={{
            ...product,
            images: imageList,
            category: product.category || {
              id: product.category_id,
              name: `Danh mục ${product.category_id}`,
            },
          }}
          onClose={() => setShowModal(false)}
        />
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom animations */
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
}
