// // // // "use client";
// // // // import { useEffect, useState } from "react";
// // // // import { Wheel } from "react-custom-roulette";
// // // // import PromotionCard from "./PromotionCard";
// // // // import { toast } from "react-hot-toast";

// // // // const getRandomIcon = () => {
// // // //   const icons = ["truck", "ticket", "percent"] as const;
// // // //   return icons[Math.floor(Math.random() * icons.length)];
// // // // };

// // // // export default function LuckyWheel() {
// // // //   const [coupons, setCoupons] = useState<any[]>([]);
// // // //   const [mustSpin, setMustSpin] = useState(false);
// // // //   const [prizeNumber, setPrizeNumber] = useState(0);
// // // //   const [showModal, setShowModal] = useState(false);

// // // //   useEffect(() => {
// // // //     fetch("http://127.0.0.1:8000/api/coupons")
// // // //       .then((res) => res.json())
// // // //       .then((data) => setCoupons(data))
// // // //       .catch((err) => console.error("Lỗi load coupons:", err));
// // // //   }, []);

// // // //   const validPromotions = coupons
// // // //     .map((coupon) => {
// // // //       const expiryDate = new Date(coupon.expiry_date);
// // // //       const now = new Date();
// // // //       const isExpired = expiryDate.getTime() < now.getTime();

// // // //       if (isExpired) return null;
// // // //       return {
// // // //         title: `GIẢM ${Number(coupon.discount_value).toLocaleString()}đ`,
// // // //         description: "Áp dụng theo điều kiện đơn hàng",
// // // //         code: coupon.code,
// // // //         expiry: expiryDate.toLocaleDateString("vi-VN"),
// // // //         expired: false,
// // // //         icon: getRandomIcon(),
// // // //       };
// // // //     })
// // // //     .filter(Boolean);

// // // //   const wheelPromos = [
// // // //     ...validPromotions,
// // // //     {
// // // //       title: "SAO MÀ TRÚNG ĐƯỢC HẸ HẸ HẸ 😄",
// // // //       description: "Bạn xui rồi, voucher đã hết hạn!",
// // // //       code: "NO-LUCK",
// // // //       expiry: "Đã hết hạn",
// // // //       expired: true,
// // // //       icon: "ticket",
// // // //     },
// // // //     {
// // // //       title: "XIN CHIA BUỒN",
// // // //       description: "Bạn xui rồi, voucher đã hết hạn!",
// // // //       code: "NO-LUCK",
// // // //       expiry: "Đã hết hạn",
// // // //       expired: true,
// // // //       icon: "ticket",
// // // //     },
// // // //   ];

// // // //   const wheelData = wheelPromos.map((promo) => ({
// // // //     option: promo.expired ? "XIN CHIA BUỒN" : promo.title,
// // // //   }));

// // // //   const handleSpinClick = () => {
// // // //     const newPrizeNumber = Math.floor(Math.random() * wheelPromos.length);
// // // //     setPrizeNumber(newPrizeNumber);
// // // //     setMustSpin(true);
// // // //   };

// // // //   const handleStopSpinning = () => {
// // // //     setMustSpin(false);
// // // //     const promo = wheelPromos[prizeNumber];
// // // //     if (promo.expired) {
// // // //       toast.error("Bạn xui rồi, voucher đã hết hạn!");
// // // //     } else {
// // // //       toast.success(`Chúc mừng! Bạn nhận được mã: ${promo.code}`);
// // // //       setShowModal(true);
// // // //     }
// // // //   };

// // // //   //   return (
// // // //   //     <div className="flex flex-col items-center py-4 px-3 max-w-xs mx-auto">
// // // //   //       <h2 className="text-lg font-semibold mb-3 text-orange-600 text-center">
// // // //   //         🎉 Vòng Quay May Mắn 🎉
// // // //   //       </h2>
// // // //   //       <div className="scale-[0.75] sm:scale-[0.85] transition-transform duration-300">
// // // //   //         <Wheel
// // // //   //           mustStartSpinning={mustSpin}
// // // //   //           prizeNumber={prizeNumber}
// // // //   //           data={wheelData}
// // // //   //           onStopSpinning={handleStopSpinning}
// // // //   //           backgroundColors={["#FF9800", "#FFEB3B", "#FF5722", "#BDBDBD"]}
// // // //   //           textColors={["#fff"]}
// // // //   //           outerBorderColor="#FFA726"
// // // //   //           outerBorderWidth={5}
// // // //   //           radiusLineColor="#FFF3E0"
// // // //   //           radiusLineWidth={1}
// // // //   //           fontSize={12}
// // // //   //           spinDuration={0.6}
// // // //   //         />
// // // //   //       </div>

// // // //   //       <button
// // // //   //         onClick={handleSpinClick}
// // // //   //         className="mt-4 px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium text-sm shadow-sm transition"
// // // //   //         disabled={mustSpin || wheelPromos.length === 0}
// // // //   //       >
// // // //   //         {mustSpin ? "Đang quay..." : "Quay ngay"}
// // // //   //       </button>

// // // //   //       {/* Modal hiện kết quả */}
// // // //   //       {showModal && (
// // // //   //         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
// // // //   //           <div className="bg-white rounded-xl p-4 max-w-sm w-full shadow-lg relative">
// // // //   //             <button
// // // //   //               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
// // // //   //               onClick={() => setShowModal(false)}
// // // //   //             >
// // // //   //               &times;
// // // //   //             </button>
// // // //   //             <h3 className="text-center font-semibold text-orange-600 mb-3 text-sm">
// // // //   //               🎊 Bạn đã trúng 🎊
// // // //   //             </h3>
// // // //   //             <PromotionCard promo={wheelPromos[prizeNumber]} />
// // // //   //           </div>
// // // //   //         </div>
// // // //   //       )}
// // // //   //     </div>
// // // //   //   );
// // // //   // }
// // // //   return (
// // // //     <div className="relative px-6 sm:px-40 py-8">
// // // //       {/* Hình nền */}
// // // //       <div
// // // //         className="absolute inset-0 -z-10 bg-cover bg-center opacity-20"
// // // //         style={{
// // // //           backgroundImage: `url('/img/MAYMAN.png')`, // Đổi thành đường dẫn hình nền của bạn
// // // //         }}
// // // //       />

// // // //       {/* Nội dung vòng quay */}
// // // //       <div className="flex flex-col items-center max-w-xs mx-auto">
// // // //         <h2 className="text-lg font-semibold mb-3 text-orange-600 text-center">
// // // //           🎉 Vòng Quay May Mắn 🎉
// // // //         </h2>
// // // //         <div className="scale-[0.75] sm:scale-[0.85] transition-transform duration-300">
// // // //           <Wheel
// // // //             mustStartSpinning={mustSpin}
// // // //             prizeNumber={prizeNumber}
// // // //             data={wheelData}
// // // //             onStopSpinning={handleStopSpinning}
// // // //             backgroundColors={["#FF9800", "#FFEB3B", "#FF5722", "#BDBDBD"]}
// // // //             textColors={["#fff"]}
// // // //             outerBorderColor="#FFA726"
// // // //             outerBorderWidth={5}
// // // //             radiusLineColor="#FFF3E0"
// // // //             radiusLineWidth={1}
// // // //             fontSize={12}
// // // //             spinDuration={0.6}
// // // //           />
// // // //         </div>

// // // //         <button
// // // //           onClick={handleSpinClick}
// // // //           className="mt-4 px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium text-sm shadow-sm transition"
// // // //           disabled={mustSpin || wheelPromos.length === 0}
// // // //         >
// // // //           {mustSpin ? "Đang quay..." : "Quay ngay"}
// // // //         </button>
// // // //       </div>

// // // //       {/* Modal kết quả */}
// // // //       {showModal && (
// // // //         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
// // // //           <div className="bg-white rounded-xl p-4 max-w-sm w-full shadow-lg relative">
// // // //             <button
// // // //               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
// // // //               onClick={() => setShowModal(false)}
// // // //             >
// // // //               &times;
// // // //             </button>
// // // //             <h3 className="text-center font-semibold text-orange-600 mb-3 text-sm">
// // // //               🎊 Bạn đã trúng 🎊
// // // //             </h3>
// // // //             <PromotionCard promo={wheelPromos[prizeNumber]} />
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";
// // // import { useEffect, useState } from "react";
// // // import { Wheel } from "react-custom-roulette";
// // // import PromotionCard from "./PromotionCard";
// // // import { toast } from "react-hot-toast";

// // // const getRandomIcon = () => {
// // //   const icons = ["truck", "ticket", "percent"] as const;
// // //   return icons[Math.floor(Math.random() * icons.length)];
// // // };

// // // export default function LuckyWheel() {
// // //   const [coupons, setCoupons] = useState<any[]>([]);
// // //   const [mustSpin, setMustSpin] = useState(false);
// // //   const [prizeNumber, setPrizeNumber] = useState(0);
// // //   const [showModal, setShowModal] = useState(false);

// // //   useEffect(() => {
// // //     fetch("http://127.0.0.1:8000/api/coupons")
// // //       .then((res) => res.json())
// // //       .then((data) => setCoupons(data))
// // //       .catch((err) => console.error("Lỗi load coupons:", err));
// // //   }, []);

// // //   const validPromotions = coupons
// // //     .map((coupon) => {
// // //       const expiryDate = new Date(coupon.expiry_date);
// // //       const now = new Date();
// // //       const isExpired = expiryDate.getTime() < now.getTime();

// // //       if (isExpired) return null;
// // //       return {
// // //         title: `GIẢM ${Number(coupon.discount_value).toLocaleString()}đ`,
// // //         description: "Áp dụng theo điều kiện đơn hàng",
// // //         code: coupon.code,
// // //         expiry: expiryDate.toLocaleDateString("vi-VN"),
// // //         expired: false,
// // //         icon: getRandomIcon(),
// // //       };
// // //     })
// // //     .filter(Boolean);

// // //   const wheelPromos = [
// // //     ...validPromotions,
// // //     {
// // //       title: "SAO MÀ TRÚNG ĐƯỢC HẸ HẸ HẸ 😄",
// // //       description: "Bạn xui rồi, voucher đã hết hạn!",
// // //       code: "NO-LUCK",
// // //       expiry: "Đã hết hạn",
// // //       expired: true,
// // //       icon: "ticket",
// // //     },
// // //     {
// // //       title: "XIN CHIA BUỒN",
// // //       description: "Bạn xui rồi, voucher đã hết hạn!",
// // //       code: "NO-LUCK",
// // //       expiry: "Đã hết hạn",
// // //       expired: true,
// // //       icon: "ticket",
// // //     },
// // //   ];

// // //   const wheelData = wheelPromos.map((promo) => ({
// // //     option: promo.expired ? "XIN CHIA BUỒN" : promo.title,
// // //   }));

// // //   const handleSpinClick = () => {
// // //     const newPrizeNumber = Math.floor(Math.random() * wheelPromos.length);
// // //     setPrizeNumber(newPrizeNumber);
// // //     setMustSpin(true);
// // //   };

// // //   const handleStopSpinning = () => {
// // //     setMustSpin(false);
// // //     const promo = wheelPromos[prizeNumber];
// // //     if (promo.expired) {
// // //       toast.error("Bạn xui rồi, voucher đã hết hạn!");
// // //     } else {
// // //       toast.success(`Chúc mừng! Bạn nhận được mã: ${promo.code}`);
// // //       setShowModal(true);
// // //     }
// // //   };

// // //   return (
// // //     <div className="relative px-6 sm:px-40 py-8 overflow-hidden">
// // //       {/* Hình nền rõ nét */}
// // //       <div className="absolute inset-0 -z-10">
// // //         <img
// // //           src="/img/2025.png" // 👉 đổi thành ảnh của bạn
// // //           alt="Lucky Wheel Background"
// // //           className="w-full h-full object-cover"
// // //         />
// // //       </div>

// // //       {/* Nội dung vòng quay */}
// // //       <div className="flex flex-col items-center max-w-xs mx-auto">
// // //         <h2 className="text-lg font-semibold mb-3 text-orange-600 text-center">
// // //           🎉 Vòng Quay May Mắn 🎉
// // //         </h2>

// // //         <div className="scale-[0.75] sm:scale-[0.85] transition-transform duration-300">
// // //           <Wheel
// // //             mustStartSpinning={mustSpin}
// // //             prizeNumber={prizeNumber}
// // //             data={wheelData}
// // //             onStopSpinning={handleStopSpinning}
// // //             backgroundColors={["#FF9800", "#FFEB3B", "#FF5722", "#BDBDBD"]}
// // //             textColors={["#fff"]}
// // //             outerBorderColor="#FFA726"
// // //             outerBorderWidth={5}
// // //             radiusLineColor="#FFF3E0"
// // //             radiusLineWidth={1}
// // //             fontSize={12}
// // //             spinDuration={0.6}
// // //           />
// // //         </div>

// // //         <button
// // //           onClick={handleSpinClick}
// // //           className="mt-4 px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium text-sm shadow-sm transition"
// // //           disabled={mustSpin || wheelPromos.length === 0}
// // //         >
// // //           {mustSpin ? "Đang quay..." : "Quay ngay"}
// // //         </button>
// // //       </div>

// // //       {/* Modal kết quả */}
// // //       {showModal && (
// // //         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
// // //           <div className="bg-white rounded-xl p-4 max-w-sm w-full shadow-lg relative">
// // //             <button
// // //               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
// // //               onClick={() => setShowModal(false)}
// // //             >
// // //               &times;
// // //             </button>
// // //             <h3 className="text-center font-semibold text-orange-600 mb-3 text-sm">
// // //               🎊 Bạn đã trúng 🎊
// // //             </h3>
// // //             <PromotionCard promo={wheelPromos[prizeNumber]} />
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }
// // "use client";
// // import { useEffect, useState } from "react";
// // import { Wheel } from "react-custom-roulette";
// // import PromotionCard from "./PromotionCard";
// // import { toast } from "react-hot-toast";

// // const getRandomIcon = () => {
// //   const icons = ["truck", "ticket", "percent"] as const;
// //   return icons[Math.floor(Math.random() * icons.length)];
// // };

// // export default function LuckyWheel() {
// //   const [coupons, setCoupons] = useState<any[]>([]);
// //   const [mustSpin, setMustSpin] = useState(false);
// //   const [prizeNumber, setPrizeNumber] = useState(0);
// //   const [showModal, setShowModal] = useState(false);

// //   useEffect(() => {
// //     fetch("http://127.0.0.1:8000/api/coupons")
// //       .then((res) => res.json())
// //       .then((data) => setCoupons(data))
// //       .catch((err) => console.error("Lỗi load coupons:", err));
// //   }, []);

// //   const validPromotions = coupons
// //     .map((coupon) => {
// //       const expiryDate = new Date(coupon.expiry_date);
// //       const now = new Date();
// //       const isExpired = expiryDate.getTime() < now.getTime();

// //       if (isExpired) return null;
// //       return {
// //         title: `GIẢM ${Number(coupon.discount_value).toLocaleString()}đ`,
// //         description: "Áp dụng theo điều kiện đơn hàng",
// //         code: coupon.code,
// //         expiry: expiryDate.toLocaleDateString("vi-VN"),
// //         expired: false,
// //         icon: getRandomIcon(),
// //       };
// //     })
// //     .filter(Boolean);

// //   const wheelPromos = [
// //     ...validPromotions,
// //     {
// //       title: "SAO MÀ TRÚNG ĐƯỢC HẸ HẸ HẸ 😄",
// //       description: "Bạn xui rồi, voucher đã hết hạn!",
// //       code: "NO-LUCK",
// //       expiry: "Đã hết hạn",
// //       expired: true,
// //       icon: "ticket",
// //     },
// //     {
// //       title: "XIN CHIA BUỒN",
// //       description: "Bạn xui rồi, voucher đã hết hạn!",
// //       code: "NO-LUCK",
// //       expiry: "Đã hết hạn",
// //       expired: true,
// //       icon: "ticket",
// //     },
// //   ];

// //   const wheelData = wheelPromos.map((promo) => ({
// //     option: promo.expired ? "XIN CHIA BUỒN" : promo.title,
// //   }));

// //   const handleSpinClick = () => {
// //     const newPrizeNumber = Math.floor(Math.random() * wheelPromos.length);
// //     setPrizeNumber(newPrizeNumber);
// //     setMustSpin(true);
// //   };

// //   const handleStopSpinning = () => {
// //     setMustSpin(false);
// //     const promo = wheelPromos[prizeNumber];
// //     if (promo.expired) {
// //       toast.error("Bạn xui rồi, voucher đã hết hạn!");
// //     } else {
// //       toast.success(`Chúc mừng! Bạn nhận được mã: ${promo.code}`);
// //       setShowModal(true);
// //     }
// //   };

// //   return (
// //     <div className="relative px-6 sm:px-40 py-8 overflow-hidden">
// //       {/* Hình nền rõ nét */}
// //       <div className="absolute inset-0 -z-10">
// //         <img
// //           src="/img/2025.png" // 👉 chỉnh theo hình nền của bạn
// //           alt="Lucky Wheel Background"
// //           className="w-full h-full object-cover"
// //         />
// //       </div>

// //       {/* Nội dung vòng quay */}
// //       <div className="flex flex-col items-center max-w-xs mx-auto">
// //         <h2 className="text-lg font-semibold mb-3 text-orange-600 text-center">
// //           🎉 Vòng Quay May Mắn 🎉
// //         </h2>

// //         <div className="scale-[0.75] sm:scale-[0.85] transition-transform duration-300">
// //           <Wheel
// //             mustStartSpinning={mustSpin}
// //             prizeNumber={prizeNumber}
// //             data={wheelData}
// //             onStopSpinning={handleStopSpinning}
// //             backgroundColors={["#FF9800", "#FFEB3B", "#FF5722", "#BDBDBD"]}
// //             textColors={["#fff"]}
// //             outerBorderColor="#FFA726"
// //             outerBorderWidth={5}
// //             radiusLineColor="#FFF3E0"
// //             radiusLineWidth={1}
// //             fontSize={12}
// //             spinDuration={0.6}
// //           />
// //         </div>

// //         <button
// //           onClick={handleSpinClick}
// //           className="mt-4 px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium text-sm shadow-sm transition"
// //           disabled={mustSpin || wheelPromos.length === 0}
// //         >
// //           {mustSpin ? "Đang quay..." : "Quay ngay"}
// //         </button>
// //       </div>

// //       {/* Modal trúng thưởng nâng cấp UI */}
// //       {showModal && (
// //         <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
// //           <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-orange-100">
// //             {/* Ánh sáng nền blur nhẹ */}
// //             <div className="absolute inset-0 bg-gradient-to-tr from-orange-100 via-yellow-50 to-white opacity-40 blur-lg z-0"></div>

// //             {/* Nút đóng */}
// //             <button
// //               className="absolute top-2 right-2 z-10 text-gray-400 hover:text-gray-600 text-xl transition"
// //               onClick={() => setShowModal(false)}
// //             >
// //               &times;
// //             </button>

// //             {/* Nội dung modal */}
// //             <div className="relative z-10 px-6 py-6 text-center">
// //               <div className="flex justify-center mb-3">
// //                 <img
// //                   src="/img/favicon.jpg" // 👉 hình pháo hoa động
// //                   alt="Celebrate"
// //                   className="w-14 h-14"
// //                 />
// //               </div>

// //               <h3 className="text-xl font-bold text-orange-600 mb-2 animate-pulse">
// //                 🎊 Chúc mừng bạn! 🎊
// //               </h3>

// //               <p className="text-sm text-gray-700 mb-4">
// //                 Bạn đã trúng thưởng một phần quà đặc biệt:
// //               </p>

// //               <PromotionCard promo={wheelPromos[prizeNumber]} />

// //               <button
// //                 onClick={() => setShowModal(false)}
// //                 className="mt-5 inline-block px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium shadow-md transition-all duration-200"
// //               >
// //                 Đóng lại
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// "use client";
// import { useEffect, useState } from "react";
// import { Wheel } from "react-custom-roulette";
// import PromotionCard from "./PromotionCard";
// import { toast } from "react-hot-toast";

// const getRandomIcon = () => {
//   const icons = ["truck", "ticket", "percent"] as const;
//   return icons[Math.floor(Math.random() * icons.length)];
// };

// export default function LuckyWheel() {
//   const [coupons, setCoupons] = useState<any[]>([]);
//   const [mustSpin, setMustSpin] = useState(false);
//   const [prizeNumber, setPrizeNumber] = useState(0);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/coupons")
//       .then((res) => res.json())
//       .then((data) => setCoupons(data))
//       .catch((err) => console.error("Lỗi load coupons:", err));
//   }, []);

//   const validPromotions = coupons
//     .map((coupon) => {
//       const expiryDate = new Date(coupon.expiry_date);
//       const now = new Date();
//       const isExpired = expiryDate.getTime() < now.getTime();

//       if (isExpired) return null;
//       return {
//         title: `GIẢM ${Number(coupon.discount_value).toLocaleString()}đ`,
//         description: "Áp dụng theo điều kiện đơn hàng",
//         code: coupon.code,
//         expiry: expiryDate.toLocaleDateString("vi-VN"),
//         expired: false,
//         icon: getRandomIcon(),
//       };
//     })
//     .filter(Boolean);

//   const wheelPromos = [
//     ...validPromotions,
//     {
//       title: "SAO MÀ TRÚNG ĐƯỢC HẸ HẸ HẸ 😄",
//       description: "Bạn xui rồi, voucher đã hết hạn!",
//       code: "NO-LUCK",
//       expiry: "Đã hết hạn",
//       expired: true,
//       icon: "ticket",
//     },
//     {
//       title: "XIN CHIA BUỒN",
//       description: "Bạn xui rồi, voucher đã hết hạn!",
//       code: "NO-LUCK",
//       expiry: "Đã hết hạn",
//       expired: true,
//       icon: "ticket",
//     },
//   ];

//   const wheelData = wheelPromos.map((promo) => ({
//     option: promo.expired ? "XIN CHIA BUỒN" : promo.title,
//   }));

//   const handleSpinClick = () => {
//     const newPrizeNumber = Math.floor(Math.random() * wheelPromos.length);
//     setPrizeNumber(newPrizeNumber);
//     setMustSpin(true);
//   };

//   const handleStopSpinning = () => {
//     setMustSpin(false);
//     const promo = wheelPromos[prizeNumber];

//     if (promo.expired) {
//       toast.error("Bạn xui rồi, voucher đã hết hạn!");
//     } else {
//       setShowModal(true); // 👉 show modal thôi, không toast
//     }
//   };

//   return (
//     <div className="relative px-6 sm:px-40 py-8 overflow-hidden">
//       {/* Hình nền */}
//       <div className="absolute inset-0 -z-10">
//         <img
//           src="/img/2025.png"
//           alt="Lucky Wheel Background"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Nội dung vòng quay */}
//       <div className="flex flex-col items-center max-w-xs mx-auto">
//         {/* <h2 className="text-lg font-semibold mb-3 text-orange-600 text-center">
//           🎉 VÒNG QUAY MAY MẮN 🎉
//         </h2> */}
//         {/* <h2 className="text-2xl font-extrabold mb-5 text-orange-500 text-center animate-pulse drop-shadow-md tracking-wide">
//           VÒNG QUAY MAY MẮN
//         </h2> */}
//         <h2 className="text-2xl font-extrabold mb-5 text-orange-600 text-center animate-pulse drop-shadow-md tracking-wide">
//           VÒNG QUAY MAY MẮN
//         </h2>

//         <div className="scale-[0.75] sm:scale-[0.85] transition-transform duration-300">
//           <Wheel
//             mustStartSpinning={mustSpin}
//             prizeNumber={prizeNumber}
//             data={wheelData}
//             onStopSpinning={handleStopSpinning}
//             backgroundColors={["#FF9800", "#FFEB3B", "#FF5722", "#BDBDBD"]}
//             textColors={["#fff"]}
//             outerBorderColor="#FFA726"
//             outerBorderWidth={5}
//             radiusLineColor="#FFF3E0"
//             radiusLineWidth={1}
//             fontSize={12}
//             spinDuration={0.6}
//           />
//         </div>

//         {/* <button
//           onClick={handleSpinClick}
//           className="mt-4 px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium text-sm shadow-sm transition"
//           disabled={mustSpin || wheelPromos.length === 0}
//         >
//           {mustSpin ? "Đang quay..." : "Quay ngay"}
//         </button> */}
//         <button
//           onClick={handleSpinClick}
//           className="-mt-1 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold text-base shadow-md transition duration-200 ease-in-out"
//           disabled={mustSpin || wheelPromos.length === 0}
//         >
//           {mustSpin ? "Đang quay..." : "🎯 Quay ngay"}
//         </button>
//       </div>

//       {/* Modal kết quả */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
//           <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border border-orange-100">
//             {/* Hiệu ứng nền mờ glow */}
//             <div className="absolute inset-0 bg-gradient-to-tr from-orange-100 via-yellow-50 to-white opacity-40 blur-lg z-0" />

//             {/* Nút đóng */}
//             <button
//               className="absolute top-2 right-2 z-10 text-gray-400 hover:text-gray-600 text-xl transition"
//               onClick={() => setShowModal(false)}
//             >
//               &times;
//             </button>

//             {/* Nội dung modal */}
//             <div className="relative z-10 px-6 py-6 text-center">
//               <div className="flex justify-center mb-3">
//                 <img
//                   src="/img/favicon.jpg"
//                   alt="Celebrate"
//                   className="w-14 h-14 animate-bounce"
//                 />
//               </div>

//               <h3 className="text-xl font-bold text-orange-600 mb-2 animate-pulse">
//                 🎊 Chúc mừng bạn! 🎊
//               </h3>

//               <p className="text-sm text-gray-700 mb-4">
//                 Bạn đã trúng thưởng một phần quà đặc biệt:
//               </p>

//               <PromotionCard promo={wheelPromos[prizeNumber]} />

//               <button
//                 onClick={() => setShowModal(false)}
//                 className="mt-5 inline-block px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium shadow-md transition-all duration-200"
//               >
//                 Đóng lại
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import PromotionCard from "./PromotionCard";
import { toast } from "react-hot-toast";

const getRandomIcon = () => {
  const icons = ["truck", "ticket", "percent"] as const;
  return icons[Math.floor(Math.random() * icons.length)];
};

export default function LuckyWheel() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/coupons")
      .then((res) => res.json())
      .then((data) => setCoupons(data))
      .catch((err) => console.error("Lỗi load coupons:", err));
  }, []);

  const validPromotions = coupons
    .map((coupon) => {
      const expiryDate = new Date(coupon.expiry_date);
      const now = new Date();
      const isExpired = expiryDate.getTime() < now.getTime();

      if (isExpired) return null;
      return {
        title: `GIẢM ${Number(coupon.discount_value).toLocaleString()}đ`,
        description: "Áp dụng theo điều kiện đơn hàng",
        code: coupon.code,
        expiry: expiryDate.toLocaleDateString("vi-VN"),
        expired: false,
        icon: getRandomIcon(),
      };
    })
    .filter(Boolean);

  const wheelPromos = [
    ...validPromotions,
    {
      title: "SAO MÀ TRÚNG ĐƯỢC HẸ HẸ HẸ 😄",
      description: "Bạn xui rồi, voucher đã hết hạn!",
      code: "NO-LUCK",
      expiry: "Đã hết hạn",
      expired: true,
      icon: "ticket",
    },
    {
      title: "XIN CHIA BUỒN",
      description: "Bạn xui rồi, voucher đã hết hạn!",
      code: "NO-LUCK",
      expiry: "Đã hết hạn",
      expired: true,
      icon: "ticket",
    },
  ];

  const wheelData = wheelPromos.map((promo) => ({
    option: promo.expired ? "XIN CHIA BUỒN" : promo.title,
  }));

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * wheelPromos.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    const promo = wheelPromos[prizeNumber];

    if (promo.expired) {
      toast.error("Bạn xui rồi, voucher đã hết hạn!");
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="relative px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 py-8 overflow-hidden">
      {/* Hình nền */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/img/2025.png"
          alt="Lucky Wheel Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Vòng quay */}
      <div className="flex flex-col items-center w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
        <h2 className="text-2xl font-extrabold mb-5 text-orange-600 text-center animate-pulse drop-shadow-md tracking-wide">
          VÒNG QUAY MAY MẮN
        </h2>

        <div className="scale-[0.85] sm:scale-100 transition-transform duration-300">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={wheelData}
            onStopSpinning={handleStopSpinning}
            backgroundColors={["#FF9800", "#FFEB3B", "#FF5722", "#BDBDBD"]}
            textColors={["#fff"]}
            outerBorderColor="#FFA726"
            outerBorderWidth={5}
            radiusLineColor="#FFF3E0"
            radiusLineWidth={1}
            fontSize={12}
            spinDuration={0.6}
          />
        </div>

        <button
          onClick={handleSpinClick}
          className="-mt-1 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold text-base shadow-md transition duration-200 ease-in-out"
          disabled={mustSpin || wheelPromos.length === 0}
        >
          {mustSpin ? "Đang quay..." : "🎯 Quay ngay"}
        </button>
      </div>

      {/* Modal kết quả */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50 px-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-sm overflow-hidden border border-orange-100">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-100 via-yellow-50 to-white opacity-40 blur-lg z-0" />
            <button
              className="absolute top-2 right-2 z-10 text-gray-400 hover:text-gray-600 text-xl transition"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>

            <div className="relative z-10 px-6 py-6 text-center">
              <div className="flex justify-center mb-3">
                <img
                  src="/img/favicon.jpg"
                  alt="Celebrate"
                  className="w-14 h-14 animate-bounce"
                />
              </div>

              <h3 className="text-xl font-bold text-orange-600 mb-2 animate-pulse">
                🎊 Chúc mừng bạn! 🎊
              </h3>

              <p className="text-sm text-gray-700 mb-4">
                Bạn đã trúng thưởng một phần quà đặc biệt:
              </p>

              <PromotionCard promo={wheelPromos[prizeNumber]} />

              <button
                onClick={() => setShowModal(false)}
                className="mt-5 inline-block px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium shadow-md transition-all duration-200"
              >
                Đóng lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
