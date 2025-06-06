// "use client";

// import { Flame, Clock } from "lucide-react";

// interface FlashSaleHeaderProps {
//   name: string;
//   timeLeft: string;
// }

// export default function FlashSaleHeader({
//   name,
//   timeLeft,
// }: FlashSaleHeaderProps) {
//   return (
//     <div
//       className="relative mb-10 p-6 rounded-3xl bg-[#FF5722] text-white shadow-2xl overflow-hidden border border-orange-300/50 transition-all duration-700 hover:scale-[1.03]"
//       style={{
//         animation: "fadeInUp 0.7s ease-out",
//       }}
//     >
//       {/* Background glow layers */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#FF8A50] via-[#FF7043] to-[#FF5722] opacity-40 blur-xl animate-pulse z-0" />
//       <div className="absolute -top-6 -left-6 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl animate-ping z-0" />
//       <div className="absolute bottom-0 right-0 w-20 h-20 bg-yellow-300 opacity-10 rounded-full blur-xl animate-pulse delay-150 z-0" />

//       {/* Fire particles effect */}
//       <div className="absolute top-3 left-4 z-10 flex flex-col items-center space-y-1 animate-bounce">
//         <div className="w-4 h-4 bg-white rounded-full animate-ping opacity-70" />
//         <div className="w-3 h-3 bg-yellow-300 rounded-full animate-bounce delay-100" />
//         <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-200" />
//       </div>

//       {/* Main Content */}
//       <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//         <h2
//           className="text-4xl font-extrabold tracking-wider flex items-center gap-3 drop-shadow-[0_1px_5px_rgba(255,255,255,0.7)]"
//           style={{
//             animation: "glowText 2s ease-in-out infinite alternate",
//             textShadow: "0 0 12px #fff, 0 0 24px #ff5722",
//           }}
//         >
//           <Flame className="text-yellow-100 w-8 h-8 animate-pulse" />
//           <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-200 to-white">
//             {name.toUpperCase()}
//           </span>
//         </h2>

//         <div
//           className="flex items-center gap-2 px-5 py-2 bg-white/10 border border-white/30 rounded-full backdrop-blur-xl shadow-lg transition-all hover:scale-105"
//           style={{
//             animation: "glowPulse 2s ease-in-out infinite alternate",
//             boxShadow: "0 0 10px #FF5722",
//           }}
//         >
//           <Clock size={20} className="text-white animate-pulse" />
//           <span className="text-sm font-semibold tracking-wider text-white">
//             <span className="font-bold text-yellow-200">{timeLeft}</span>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { Flame, Clock } from "lucide-react";

interface FlashSaleHeaderProps {
  name: string;
  timeLeft: string;
}

export default function FlashSaleHeader({
  name,
  timeLeft,
}: FlashSaleHeaderProps) {
  return (
    <div
      className="relative mb-10 p-6 rounded-3xl bg-[#FF5722] text-white shadow-2xl overflow-hidden border border-orange-300/50 transition-all duration-700 hover:scale-[1.03]"
      style={{
        animation: "fadeInUp 0.7s ease-out",
      }}
    >
      {/* Background glow layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF8A50] via-[#FF7043] to-[#FF5722] opacity-40 blur-xl animate-pulse z-0" />
      <div className="absolute -top-6 -left-6 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl animate-ping z-0" />
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-yellow-300 opacity-10 rounded-full blur-xl animate-pulse delay-150 z-0" />

      {/* Fire particles effect */}
      <div className="absolute top-3 left-4 z-10 flex flex-col items-center space-y-1 animate-bounce">
        <div className="w-4 h-4 bg-white rounded-full animate-ping opacity-70" />
        <div className="w-3 h-3 bg-yellow-300 rounded-full animate-bounce delay-100" />
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-200" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-4xl font-extrabold tracking-wide flex items-center gap-3 text-white">
          <Flame className="text-yellow-300 w-7 h-7 animate-pulse" />
          <span className="text-white drop-shadow-sm">
            {name.toUpperCase()}
          </span>
        </h2>

        <div className="flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full backdrop-blur-md shadow-md">
          <Clock size={18} className="text-white/80" />
          <span className="text-sm font-semibold tracking-wider text-white/90">
            Còn <span className="text-yellow-300 font-bold">{timeLeft}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// @tailwind base;
// @tailwind components;
// @tailwind utilities;
// @keyframes loading-bar {
//   0% {
//     transform: translateX(-100%);
//   }
//   100% {
//     transform: translateX(300%);
//   }
// }

// .animate-loading-bar {
//   animation: loading-bar 1.2s infinite linear;
// }
// @layer utilities {
//   @keyframes marquee {
//     0% {
//       transform: translateX(100%);
//     }
//     100% {
//       transform: translateX(-100%);
//     }
//   }

//   .animate-marquee {
//     animation: marquee 15s linear infinite;
//   }
// }
// @keyframes fadeInUp {
//   0% {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   100% {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }

// @keyframes glowText {
//   0% {
//     text-shadow: 0 0 8px #fff, 0 0 16px #ff9800;
//   }
//   100% {
//     text-shadow: 0 0 12px #fff, 0 0 24px #ff5722;
//   }
// }

// @keyframes glowPulse {
//   0% {
//     box-shadow: 0 0 5px #FF5722;
//   }
//   100% {
//     box-shadow: 0 0 15px #FF5722;
//   }
// }
// .fire-border {
//   border-radius: 1.5rem; /* rounded-3xl */
//   background: conic-gradient(
//     from 0deg,
//     #ff5722,
//     #ff7043,
//     #ff8a50,
//     #ff5722
//   );
//   filter: blur(6px);
//   opacity: 0.6;
//   animation: spinFire 2s linear infinite;
//   z-index: 0;
// }

// @keyframes spinFire {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }
