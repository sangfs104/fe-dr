"use client";
import { useEffect, useState } from "react";
import { Wheel } from "react-custom-roulette";
import PromotionCard from "./PromotionCard";
import { toast } from "react-hot-toast";
import Image from "next/image";
const getRandomIcon = () => {
  const icons = ["truck", "ticket", "percent"] as const;
  return icons[Math.floor(Math.random() * icons.length)];
};
interface Coupon {
  discount_value: number;
  code: string;
  expiry_date: string;
}

export default function LuckyWheel() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

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
        <Image
          src="/img/2025.png"
          alt="Lucky Wheel Background"
          width={1920}
          height={1080}
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
                <Image
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

// "use client";
// import { useEffect, useState, useRef } from "react";
// import { Wheel } from "react-custom-roulette";
// import PromotionCard from "./PromotionCard";
// import { toast } from "react-hot-toast";
// import Image from "next/image";

// const getRandomIcon = () => {
//   const icons = ["truck", "ticket", "percent"] as const;
//   return icons[Math.floor(Math.random() * icons.length)];
// };

// interface Coupon {
//   discount_value: number;
//   code: string;
//   expiry_date: string;
// }

// export default function LuckyWheel() {
//   const [coupons, setCoupons] = useState<Coupon[]>([]);
//   const [mustSpin, setMustSpin] = useState(false);
//   const [prizeNumber, setPrizeNumber] = useState(0);
//   const [showModal, setShowModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [particles, setParticles] = useState<
//     Array<{ id: number; x: number; y: number; delay: number }>
//   >([]);
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [audioEnabled, setAudioEnabled] = useState(true);
//   const [spinCount, setSpinCount] = useState(0);

//   const audioContextRef = useRef<AudioContext | null>(null);
//   const spinSoundRef = useRef<AudioBuffer | null>(null);
//   const winSoundRef = useRef<AudioBuffer | null>(null);
//   const loseSoundRef = useRef<AudioBuffer | null>(null);

//   // Initialize audio context and create sounds
//   useEffect(() => {
//     const initAudio = async () => {
//       try {
//         audioContextRef.current = new (window.AudioContext ||
//           (window as any).webkitAudioContext)();

//         // Create spin sound (ascending tone)
//         const spinBuffer = audioContextRef.current.createBuffer(
//           1,
//           audioContextRef.current.sampleRate * 2,
//           audioContextRef.current.sampleRate
//         );
//         const spinData = spinBuffer.getChannelData(0);
//         for (let i = 0; i < spinData.length; i++) {
//           const frequency = 200 + (i / spinData.length) * 400;
//           spinData[i] =
//             Math.sin(
//               (2 * Math.PI * frequency * i) / audioContextRef.current.sampleRate
//             ) *
//             0.3 *
//             Math.exp((-i / spinData.length) * 3);
//         }
//         spinSoundRef.current = spinBuffer;

//         // Create win sound (celebratory chord)
//         const winBuffer = audioContextRef.current.createBuffer(
//           1,
//           audioContextRef.current.sampleRate * 1.5,
//           audioContextRef.current.sampleRate
//         );
//         const winData = winBuffer.getChannelData(0);
//         for (let i = 0; i < winData.length; i++) {
//           const t = i / audioContextRef.current.sampleRate;
//           winData[i] =
//             (Math.sin(2 * Math.PI * 523.25 * t) + // C5
//             Math.sin(2 * Math.PI * 659.25 * t) + // E5
//               Math.sin(2 * Math.PI * 783.99 * t)) * // G5
//             0.2 *
//             Math.exp(-t * 2);
//         }
//         winSoundRef.current = winBuffer;

//         // Create lose sound (descending tone)
//         const loseBuffer = audioContextRef.current.createBuffer(
//           1,
//           audioContextRef.current.sampleRate * 1,
//           audioContextRef.current.sampleRate
//         );
//         const loseData = loseBuffer.getChannelData(0);
//         for (let i = 0; i < loseData.length; i++) {
//           const frequency = 400 - (i / loseData.length) * 200;
//           loseData[i] =
//             Math.sin(
//               (2 * Math.PI * frequency * i) / audioContextRef.current.sampleRate
//             ) *
//             0.3 *
//             Math.exp((-i / loseData.length) * 2);
//         }
//         loseSoundRef.current = loseBuffer;
//       } catch (error) {
//         console.log("Audio not supported:", error);
//         setAudioEnabled(false);
//       }
//     };

//     initAudio();
//   }, []);

//   const playSound = (buffer: AudioBuffer | null) => {
//     if (!audioEnabled || !audioContextRef.current || !buffer) return;

//     try {
//       const source = audioContextRef.current.createBufferSource();
//       source.buffer = buffer;
//       source.connect(audioContextRef.current.destination);
//       source.start();
//     } catch (error) {
//       console.log("Error playing sound:", error);
//     }
//   };

//   // Load coupons from API
//   useEffect(() => {
//     setIsLoading(true);
//     fetch("http://127.0.0.1:8000/api/coupons")
//       .then((res) => res.json())
//       .then((data) => {
//         setCoupons(data);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.error("Lỗi load coupons:", err);
//         setIsLoading(false);
//         toast.error("Không thể tải dữ liệu coupon!");
//       });
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

//   const generateParticles = () => {
//     const newParticles = [];
//     for (let i = 0; i < 30; i++) {
//       newParticles.push({
//         id: i,
//         x: Math.random() * window.innerWidth,
//         y: Math.random() * window.innerHeight,
//         delay: Math.random() * 2000,
//       });
//     }
//     setParticles(newParticles);

//     // Clear particles after animation
//     setTimeout(() => setParticles([]), 3000);
//   };

//   const generateConfetti = () => {
//     setShowConfetti(true);
//     setTimeout(() => setShowConfetti(false), 4000);
//   };

//   const handleSpinClick = () => {
//     if (audioContextRef.current?.state === "suspended") {
//       audioContextRef.current.resume();
//     }

//     const newPrizeNumber = Math.floor(Math.random() * wheelPromos.length);
//     setPrizeNumber(newPrizeNumber);
//     setMustSpin(true);
//     setSpinCount((prev) => prev + 1);

//     playSound(spinSoundRef.current);
//     generateParticles();

//     // Add screen shake effect
//     document.body.style.animation = "shake 0.5s ease-in-out";
//     setTimeout(() => {
//       document.body.style.animation = "";
//     }, 500);
//   };

//   const handleStopSpinning = () => {
//     setMustSpin(false);
//     const promo = wheelPromos[prizeNumber];

//     setTimeout(() => {
//       if (promo.expired) {
//         playSound(loseSoundRef.current);
//         toast.error("Bạn xui rồi, voucher đã hết hạn!", {
//           duration: 4000,
//           icon: "😢",
//           style: {
//             background: "#fee2e2",
//             color: "#dc2626",
//             border: "1px solid #fecaca",
//           },
//         });
//       } else {
//         playSound(winSoundRef.current);
//         generateConfetti();
//         toast.success(`Chúc mừng! Bạn nhận được ${promo.title}!`, {
//           duration: 5000,
//           icon: "🎉",
//           style: {
//             background: "#dcfce7",
//             color: "#166534",
//             border: "1px solid #bbf7d0",
//           },
//         });
//         setTimeout(() => setShowModal(true), 1000);
//       }
//     }, 800);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
//         {/* Loading background animations */}
//         <div className="absolute inset-0">
//           <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-300/30 rounded-full blur-xl animate-pulse"></div>
//           <div className="absolute bottom-20 right-20 w-48 h-48 bg-pink-300/20 rounded-full blur-2xl animate-bounce"></div>
//           <div className="absolute top-1/2 left-10 w-24 h-24 bg-purple-300/25 rounded-full blur-lg animate-ping"></div>
//         </div>

//         <div className="text-center relative z-10">
//           <div className="relative mb-6">
//             <div className="w-24 h-24 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
//             <div className="absolute top-2 left-2 w-20 h-20 border-4 border-transparent border-t-yellow-400 rounded-full animate-spin"></div>
//             <div className="absolute top-4 left-4 w-16 h-16 border-4 border-transparent border-t-pink-400 rounded-full animate-spin"></div>
//           </div>
//           <h2 className="text-3xl font-bold text-white mb-3 animate-pulse">
//             🎰 Đang tải vòng quay...
//           </h2>
//           <p className="text-white/90 text-lg">
//             Chuẩn bị những phần quà tuyệt vời!
//           </p>
//           <div className="mt-4 flex justify-center space-x-1">
//             {[...Array(3)].map((_, i) => (
//               <div
//                 key={i}
//                 className="w-3 h-3 bg-white rounded-full animate-bounce"
//                 style={{ animationDelay: `${i * 0.2}s` }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen overflow-hidden">
//       {/* Enhanced background with original image */}
//       <div className="absolute inset-0 -z-10">
//         <Image
//           src="/img/2025.png"
//           alt="Lucky Wheel Background"
//           width={1920}
//           height={1080}
//           className="w-full h-full object-cover"
//         />
//         {/* Overlay for better contrast */}
//         <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>
//       </div>

//       {/* Animated background elements */}
//       <div className="absolute inset-0 -z-5">
//         <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl animate-pulse"></div>
//         <div className="absolute top-1/2 right-20 w-48 h-48 bg-pink-400/10 rounded-full blur-2xl animate-bounce"></div>
//         <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-orange-400/15 rounded-full blur-lg animate-pulse delay-1000"></div>
//         <div className="absolute top-1/4 right-1/3 w-16 h-16 bg-purple-400/20 rounded-full blur-md animate-ping"></div>
//       </div>

//       {/* Floating particles during spin */}
//       {particles.map((particle) => (
//         <div
//           key={particle.id}
//           className="absolute w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce opacity-80 pointer-events-none z-20"
//           style={{
//             left: particle.x,
//             top: particle.y,
//             animationDelay: `${particle.delay}ms`,
//             animationDuration: "2s",
//           }}
//         />
//       ))}

//       {/* Confetti effect */}
//       {showConfetti && (
//         <div className="fixed inset-0 pointer-events-none z-30">
//           {[...Array(50)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute text-2xl animate-bounce"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 3}s`,
//                 animationDuration: `${2 + Math.random() * 2}s`,
//               }}
//             >
//               {
//                 ["🎉", "🎊", "✨", "🌟", "💫", "🎈", "🏆"][
//                   Math.floor(Math.random() * 7)
//                 ]
//               }
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="relative px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 py-8 min-h-screen flex flex-col justify-center">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h2 className="text-3xl md:text-5xl font-extrabold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 animate-pulse drop-shadow-2xl tracking-wide">
//             🎰 VÒNG QUAY MAY MẮN 🎰
//           </h2>
//           <p className="text-white text-lg font-medium drop-shadow-lg mb-4">
//             Quay để nhận ngay voucher giảm giá khủng!
//           </p>

//           {/* Stats */}
//           <div className="flex justify-center gap-4 mb-4">
//             <div className="bg-white/10 backdrop-blur-lg rounded-lg px-4 py-2 border border-white/20">
//               <div className="text-lg font-bold text-yellow-400">
//                 {validPromotions.length}
//               </div>
//               <div className="text-white/80 text-xs">Voucher</div>
//             </div>
//             <div className="bg-white/10 backdrop-blur-lg rounded-lg px-4 py-2 border border-white/20">
//               <div className="text-lg font-bold text-pink-400">{spinCount}</div>
//               <div className="text-white/80 text-xs">Lượt quay</div>
//             </div>
//           </div>

//           {/* Audio toggle */}
//           <button
//             onClick={() => setAudioEnabled(!audioEnabled)}
//             className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
//               audioEnabled
//                 ? "bg-green-500/80 hover:bg-green-600/80 text-white"
//                 : "bg-gray-500/80 hover:bg-gray-600/80 text-white"
//             } backdrop-blur-sm border border-white/20`}
//           >
//             {audioEnabled ? "🔊 Âm thanh" : "🔇 Tắt tiếng"}
//           </button>
//         </div>

//         {/* Wheel container */}
//         <div className="flex flex-col items-center w-full max-w-lg mx-auto">
//           <div className="relative">
//             {/* Glow effect around wheel */}
//             <div className="absolute -inset-6 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 rounded-full blur-xl animate-pulse"></div>

//             {/* Wheel wrapper with enhanced styling */}
//             <div className="relative bg-white/5 backdrop-blur-lg rounded-full p-6 border-2 border-white/30 shadow-2xl">
//               <div className="scale-[0.9] sm:scale-100 transition-transform duration-300">
//                 <Wheel
//                   mustStartSpinning={mustSpin}
//                   prizeNumber={prizeNumber}
//                   data={wheelData}
//                   onStopSpinning={handleStopSpinning}
//                   backgroundColors={[
//                     "#FF6B35",
//                     "#F7931E",
//                     "#FFD23F",
//                     "#06FFA5",
//                     "#4ECDC4",
//                     "#45B7D1",
//                     "#96CEB4",
//                     "#FFEAA7",
//                   ]}
//                   textColors={["#fff"]}
//                   outerBorderColor="#ffffff"
//                   outerBorderWidth={8}
//                   radiusLineColor="#ffffff"
//                   radiusLineWidth={3}
//                   fontSize={13}
//                   spinDuration={1.2}
//                   textDistance={65}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Enhanced spin button */}
//           <button
//             onClick={handleSpinClick}
//             className={`mt-6 px-8 py-3 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 transform ${
//               mustSpin || wheelPromos.length === 0
//                 ? "bg-gray-500/80 cursor-not-allowed scale-95 text-white/70"
//                 : "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 hover:scale-110 hover:shadow-orange-400/50 active:scale-95 text-white"
//             } backdrop-blur-sm border-2 border-white/30`}
//             disabled={mustSpin || wheelPromos.length === 0}
//           >
//             {mustSpin ? (
//               <span className="flex items-center gap-2">
//                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                 Đang quay...
//               </span>
//             ) : (
//               "🎯 QUAY NGAY!"
//             )}
//           </button>

//           {/* Encouragement text */}
//           {!mustSpin && (
//             <p className="mt-4 text-white/80 text-sm text-center animate-pulse">
//               Nhấn nút để bắt đầu cuộc phiêu lưu may mắn! ✨
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Enhanced Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center z-50 px-4">
//           <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-[90%] max-w-md overflow-hidden border-2 border-orange-200">
//             {/* Modal background effects */}
//             <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-yellow-50/50 to-pink-100/50 blur-sm"></div>
//             <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl"></div>
//             <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-pink-300/20 rounded-full blur-lg"></div>

//             <button
//               className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center bg-gray-100/80 hover:bg-gray-200/80 rounded-full text-gray-600 hover:text-gray-800 text-lg transition-all duration-200 backdrop-blur-sm"
//               onClick={closeModal}
//             >
//               ×
//             </button>

//             <div className="relative z-10 px-6 py-8 text-center">
//               {/* Celebration icon */}
//               <div className="flex justify-center mb-4">
//                 <div className="relative">
//                   <Image
//                     src="/img/favicon.jpg"
//                     alt="Celebrate"
//                     width={64}
//                     height={64}
//                     className="w-16 h-16 animate-bounce rounded-full border-4 border-orange-200"
//                   />
//                   <div className="absolute -top-2 -right-2 text-2xl animate-spin">
//                     ✨
//                   </div>
//                 </div>
//               </div>

//               <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600 mb-3 animate-pulse">
//                 🎊 Chúc mừng bạn! 🎊
//               </h3>

//               <p className="text-gray-700 mb-5 text-base">
//                 Bạn đã trúng thưởng một phần quà đặc biệt:
//               </p>

//               <div className="mb-6">
//                 <PromotionCard promo={wheelPromos[prizeNumber]} />
//               </div>

//               <button
//                 onClick={closeModal}
//                 className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
//               >
//                 🎁 Nhận quà ngay!
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add shake animation styles */}
//       <style jsx global>{`
//         @keyframes shake {
//           0%,
//           100% {
//             transform: translateX(0);
//           }
//           10%,
//           30%,
//           50%,
//           70%,
//           90% {
//             transform: translateX(-2px);
//           }
//           20%,
//           40%,
//           60%,
//           80% {
//             transform: translateX(2px);
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
