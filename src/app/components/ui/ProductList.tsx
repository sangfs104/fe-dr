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
// // import { Product } from "../../types/Product";

// // export default function ProductCard({ product }: { product: Product }) {
// //   const dispatch = useAppDispatch();
// //   const router = useRouter();

// //   // Ưu tiên sử dụng mảng images từ API trước, nếu không có thì fallback sang /img/{name}
// //   const imageList =
// //     product.images && product.images.length > 0
// //       ? product.images
// //       : product.img.map((i) => `/img/${i.name}`);

// //   const [mainImage, setMainImage] = useState<string | undefined>(
// //     imageList?.[0]
// //   );
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

// //     dispatch(
// //       addToCart({
// //         productId: product.id,
// //         variantId: selectedVariant.id,
// //         name: product.name,
// //         img: mainImage ?? "", // ảnh đang chọn
// //         price: priceToUse,
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
// //       img: mainImage ?? "",
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

// //   return (
// //     <>
// //       <div className="border rounded-lg mt-10 shadow-sm p-4 group bg-white hover:shadow-md transition duration-200">
// //         <div className="relative">
// //           <Link href={`/products/${product.id}`} className="block relative">
// //             {/* Badge giảm giá */}
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

// //         {/* Thumbnail - hiển thị 2 ảnh đầu tiên từ imageList */}
// //         <div className="flex gap-2 mt-2">
// //           {imageList?.slice(0, 2).map((imgUrl, idx) => (
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
// //           product={{ ...product, images: imageList }} // Đảm bảo images là string[]
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
// import { Product } from "../../types/Product";

// export default function ProductCard({ product }: { product: Product }) {
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   // Ưu tiên sử dụng mảng images từ API trước, nếu không có thì fallback sang /img/{name}
//   const imageList =
//     product.images && product.images.length > 0
//       ? product.images
//       : product.img.map((i) => `/img/${i.name}`);

//   const [mainImage, setMainImage] = useState<string | undefined>(
//     imageList?.[0]
//   );
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

//     // dispatch(
//     //   addToCart({
//     //     productId: product.id,
//     //     variantId: selectedVariant.id,
//     //     name: product.name,
//     //     img: mainImage ?? "", // ảnh đang chọn
//     //     price: priceToUse,
//     //     size: selectedVariant.size,
//     //     quantity: 1,
//     //     variantList: product.variant,
//     //   })
//     // );
//     dispatch(
//       addToCart({
//         productId: product.id,
//         variantId: selectedVariant.id,
//         name: `${product.name} - Size ${selectedVariant.size}`,
//         img: product.images?.[0] || "/img/no-image.jpg",
//         price: priceToUse,
//         sale_price: selectedVariant.sale_price, // Add this line
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
//       img: mainImage ?? "",
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

//   return (
//     <>
//       <div className="border rounded-lg mt-10 shadow-sm p-4 group bg-white hover:shadow-md transition duration-200">
//         <div className="relative">
//           <Link href={`/products/${product.id}`} className="block relative">
//             {/* Badge giảm giá */}
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
//               onClick={handleAddToCart}
//               aria-label="Add to cart"
//             >
//               <FontAwesomeIcon icon={faCartShopping} />
//             </button>

//             <button
//               className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
//               onClick={() => setShowModal(true)}
//               aria-label="View details"
//             >
//               <FontAwesomeIcon icon={faEye} />
//             </button>

//             <button
//               className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
//               onClick={handleAddToWishlist}
//               aria-label="Add to wishlist"
//             >
//               <FontAwesomeIcon icon={faHeart} />
//             </button>
//           </div>
//         </div>

//         {/* Thumbnail - hiển thị 2 ảnh đầu tiên từ imageList */}
//         <div className="flex gap-2 mt-2">
//           {imageList?.slice(0, 2).map((imgUrl, idx) => (
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
//         </div>
//       </div>

//       {showModal && (
//         <ProductModal
//           product={{
//             ...product,
//             images: imageList,
//             category: product.category || {
//               id: product.category_id,
//               name: `Category ${product.category_id}`,
//             }, // Giá trị mặc định cho category
//           }}
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
    toast.success("✨ Đã thêm vào giỏ hàng");
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
      toast.success("💖 Đã thêm vào wishlist");
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
        className="group relative overflow-hidden mt-10 transform transition-all duration-700 hover:-translate-y-4 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-pink-400/10 to-blue-400/10 rounded-3xl blur-xl group-hover:blur-lg transition-all duration-700 animate-pulse"></div>

        {/* Main card with glassmorphism */}
        <div className="relative backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-700 overflow-hidden">
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-20 blur-sm transition-all duration-700"></div>

          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-60 animate-bounce transition-all duration-1000 delay-${i *
                  100}`}
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${10 + i * 8}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Image section with advanced effects */}
          <div className="relative p-6 pb-4">
            <Link
              href={`/products/${product.id}`}
              className="block relative group/image"
            >
              {/* Discount badge with glow */}
              {discountPercent > 0 && (
                <div className="absolute -top-2 -left-2 z-20 transform rotate-12 group-hover:rotate-6 transition-all duration-500">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl border-2 border-white/50 backdrop-blur-sm animate-pulse">
                    <span className="drop-shadow-lg">-{discountPercent}%</span>
                  </div>
                </div>
              )}

              {/* Main image with morphing container */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 group-hover:rounded-3xl transition-all duration-700">
                {/* Loading shimmer */}
                {imageLoading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
                )}

                {mainImage ? (
                  <Image
                    src={mainImage}
                    alt={product.name}
                    width={500}
                    height={600}
                    className={`w-full h-72 object-cover transition-all duration-700 group-hover/image:scale-110 ${
                      imageLoading ? "opacity-0" : "opacity-100"
                    }`}
                    onLoadingComplete={() => setImageLoading(false)}
                  />
                ) : (
                  <div className="w-full h-72 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 rounded-2xl">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full animate-pulse"></div>
                      <span className="text-sm">No Image</span>
                    </div>
                  </div>
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-all duration-500"></div>
              </div>
            </Link>

            {/* Floating action buttons */}
            <div
              className={`absolute top-8 right-8 flex flex-col gap-3 transition-all duration-700 ${
                isHovered
                  ? "translate-x-0 opacity-100"
                  : "translate-x-16 opacity-0"
              }`}
            >
              <button
                className="group/btn relative bg-white/20 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/30 hover:bg-white/30 hover:shadow-2xl hover:scale-110 transition-all duration-300 disabled:opacity-50"
                disabled={!selectedVariant}
                onClick={handleAddToCart}
                aria-label="Add to cart"
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="w-5 h-5 text-gray-700 group-hover/btn:text-purple-600 transition-colors duration-300"
                />
                <div className="absolute inset-0 bg-purple-500/20 rounded-2xl scale-0 group-hover/btn:scale-100 transition-transform duration-300"></div>
              </button>

              <button
                className="group/btn relative bg-white/20 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/30 hover:bg-white/30 hover:shadow-2xl hover:scale-110 transition-all duration-300"
                onClick={() => setShowModal(true)}
                aria-label="View details"
              >
                <FontAwesomeIcon
                  icon={faEye}
                  className="w-5 h-5 text-gray-700 group-hover/btn:text-blue-600 transition-colors duration-300"
                />
                <div className="absolute inset-0 bg-blue-500/20 rounded-2xl scale-0 group-hover/btn:scale-100 transition-transform duration-300"></div>
              </button>

              <button
                className="group/btn relative bg-white/20 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/30 hover:bg-white/30 hover:shadow-2xl hover:scale-110 transition-all duration-300"
                onClick={handleAddToWishlist}
                aria-label="Add to wishlist"
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  className="w-5 h-5 text-gray-700 group-hover/btn:text-red-500 transition-colors duration-300"
                />
                <div className="absolute inset-0 bg-red-500/20 rounded-2xl scale-0 group-hover/btn:scale-100 transition-transform duration-300"></div>
              </button>
            </div>
          </div>

          {/* Thumbnail gallery with smooth animations */}
          <div className="px-6 mb-4">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
              {imageList?.slice(0, 4).map((imgUrl, idx) => (
                <div
                  key={idx}
                  className={`relative flex-shrink-0 w-14 h-14 rounded-xl cursor-pointer overflow-hidden border-2 transition-all duration-300 hover:scale-110 ${
                    imgUrl === mainImage
                      ? "border-purple-400 shadow-lg shadow-purple-400/50"
                      : "border-white/30 hover:border-purple-300"
                  }`}
                  onMouseEnter={() => handleImageHover(imgUrl)}
                  style={{
                    animationDelay: `${idx * 100}ms`,
                  }}
                >
                  <Image
                    src={imgUrl}
                    alt={`thumb-${idx}`}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  {imgUrl === mainImage && (
                    <div className="absolute inset-0 bg-purple-500/20 animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Product info with enhanced typography */}
          <div className="px-6 pb-6 relative">
            {/* Category with badge style */}
            <div className="inline-flex items-center mb-3">
              <span className="px-3 py-1 text-xs font-medium text-purple-600 bg-purple-100/50 backdrop-blur-sm rounded-full border border-purple-200/50">
                {product.category?.name ||
                  `Category ID: ${product.category_id}`}
              </span>
            </div>

            {/* Product name with gradient text */}
            <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4 line-clamp-2 group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-500">
              {product.name}
            </h2>

            {/* Price with advanced styling */}
            <div className="flex items-center gap-3">
              {selectedVariant?.sale_price &&
              Number(selectedVariant.sale_price) > 0 ? (
                <>
                  <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                    {Number(selectedVariant.sale_price).toLocaleString("vi-VN")}{" "}
                    ₫
                  </span>
                  <span className="text-sm text-gray-500 line-through bg-gray-100 px-2 py-1 rounded-lg">
                    {selectedVariant.price.toLocaleString("vi-VN")} ₫
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-800">
                  {selectedVariant?.price?.toLocaleString("vi-VN") || "—"} ₫
                </span>
              )}
            </div>

            {/* Animated bottom glow */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
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
              name: `Category ${product.category_id}`,
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
      `}</style>
    </>
  );
}
