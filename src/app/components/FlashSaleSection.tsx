// // // import { Flame } from "lucide-react";

// // // export default function FlashSaleTitleBanner({
// // //   title,
// // //   start,
// // //   end,
// // // }: {
// // //   title: string;
// // //   start: string;
// // //   end: string;
// // // }) {
// // //   return (
// // //     <div className="relative p-1 rounded-xl bg-[linear-gradient(45deg,#ff0000,#ff6600,#ffcc00,#ff6600,#ff0000)] bg-[length:400%_400%] animate-borderFire shadow-xl">
// // //       <div className="relative bg-[#b91c1c] text-white py-5 px-6 rounded-xl overflow-hidden flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
// // //         {/* Nội dung tiêu đề */}
// // //         <div className="flex items-center gap-3 z-10">
// // //           <Flame className="w-8 h-8 text-yellow-400 animate-bounce" />
// // //           <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wider drop-shadow-lg">
// // //             {title}
// // //           </h2>
// // //         </div>

// // //         {/* Thời gian */}
// // //         <p className="text-sm text-yellow-100 z-10">
// // //           🕒 Từ {new Date(start).toLocaleString()} đến{" "}
// // //           {new Date(end).toLocaleString()}
// // //         </p>

// // //         {/* Hiệu ứng ánh sáng overlay */}
// // //         <div className="absolute inset-0 bg-white opacity-10 blur-md animate-glow" />
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // "use client";

// // import { useEffect, useState } from "react";
// // import { Flame } from "lucide-react";

// // export default function FlashSaleTitleBanner({
// //   title,
// //   start,
// //   end,
// // }: {
// //   title: string;
// //   start: string;
// //   end: string;
// // }) {
// //   const [timeLeft, setTimeLeft] = useState<string>("");

// //   useEffect(() => {
// //     const countdown = () => {
// //       const now = new Date().getTime();
// //       const endTime = new Date(end).getTime();
// //       const distance = endTime - now;

// //       if (distance < 0) {
// //         setTimeLeft("Đã kết thúc");
// //         return;
// //       }

// //       const hours = Math.floor(
// //         (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
// //       );
// //       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
// //       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

// //       setTimeLeft(
// //         `${hours.toString().padStart(2, "0")}:${minutes
// //           .toString()
// //           .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
// //       );
// //     };

// //     countdown();
// //     const interval = setInterval(countdown, 1000);
// //     return () => clearInterval(interval);
// //   }, [end]);

// //   return (
// //     <div className="relative p-1 rounded-xl overflow-hidden border-4 border-red-600 shadow-xl">
// //       {/* Chữ chạy vòng quanh khung */}
// //       <div className="absolute inset-0 pointer-events-none z-0 animate-marquee whitespace-nowrap text-red-500 text-sm font-bold uppercase tracking-widest">
// //         🔥 FLASH SALE 🔥 GIẢM SỐC 🔥 DEAL NÓNG 🔥 HÀNG GIỚI HẠN 🔥 MUA NGAY 🔥
// //         FLASH SALE 🔥 GIẢM SỐC 🔥 DEAL NÓNG 🔥 HÀNG GIỚI HẠN 🔥
// //       </div>

// //       {/* Nội dung tiêu đề */}
// //       <div className="relative bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white py-5 px-6 rounded-lg z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
// //         <div className="flex items-center gap-3">
// //           <Flame className="w-8 h-8 text-yellow-400 animate-bounce" />
// //           <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide drop-shadow-lg">
// //             {title}
// //           </h2>
// //         </div>

// //         <div className="text-right">
// //           <p className="text-yellow-100 text-sm">
// //             🕒 Từ {new Date(start).toLocaleString()}
// //           </p>
// //           <p className="text-white text-lg font-semibold">
// //             ⏳ Kết thúc sau: <span className="text-yellow-300">{timeLeft}</span>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import React from "react";

// interface FlashSaleWrapperProps {
//   title: string;
//   children: React.ReactNode;
// }

// export default function FlashSaleWrapper({
//   title,
//   children,
// }: FlashSaleWrapperProps) {
//   return (
//     <div className="relative p-6 rounded-lg bg-gray-50 overflow-hidden">
//       {/* Hiệu ứng lửa cháy chạy vòng quanh */}
//       <div className="absolute inset-0 rounded-lg border-4 border-transparent animate-flame-border pointer-events-none"></div>

//       {/* Tiêu đề */}
//       <h2 className="relative text-3xl font-extrabold text-red-600 mb-6 select-none drop-shadow-lg">
//         {title}
//       </h2>

//       {/* Nội dung con (danh sách sản phẩm) */}
//       <div className="relative">{children}</div>

//       {/* CSS custom cho hiệu ứng lửa */}
//       <style jsx>{`
//         @keyframes flameMove {
//           0% {
//             background-position: 0% 0%;
//           }
//           100% {
//             background-position: 200% 0%;
//           }
//         }

//         .animate-flame-border {
//           pointer-events: none;
//           border-image-slice: 1;
//           border-width: 4px;
//           border-style: solid;
//           border-image-source: linear-gradient(
//             270deg,
//             #ff4d4d,
//             #ff6600,
//             #ffcc00,
//             #ff6600,
//             #ff4d4d
//           );
//           animation: flameMove 3s linear infinite;
//           background: linear-gradient(
//             270deg,
//             #ff4d4d,
//             #ff6600,
//             #ffcc00,
//             #ff6600,
//             #ff4d4d
//           );
//           background-size: 400% 400%;
//           -webkit-mask: linear-gradient(#fff 0 0) content-box,
//             linear-gradient(#fff 0 0);
//           -webkit-mask-composite: destination-out;
//           mask-composite: exclude;
//         }
//       `}</style>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";

interface FlashSaleSectionProps {
  title: string;
  startTime: string;
  endTime: string;
  children: React.ReactNode;
}

export default function FlashSaleSection({
  title,
  startTime,
  endTime,
  children,
}: FlashSaleSectionProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date().getTime();
      const start = new Date(startTime).getTime();
      const end = new Date(endTime).getTime();

      if (now < start) setTimeLeft(start - now);
      else if (now >= start && now <= end) setTimeLeft(end - now);
      else setTimeLeft(0);
    };

    updateTimeLeft();
    const timer = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [startTime, endTime]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { hours, minutes, seconds };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <div
      className="relative p-6 rounded-lg bg-white shadow-lg overflow-hidden select-none border-4 border-red-500/80
      animate-flame-border
      "
    >
      {/* Tiêu đề */}
      <h2 className="text-3xl font-extrabold text-red-600 drop-shadow-md animate-pulse mb-4">
        {title}
      </h2>

      {/* Đồng hồ đếm ngược */}
      {timeLeft > 0 ? (
        <div className="flex space-x-2 mb-6 text-red-700 font-mono font-bold text-2xl">
          <TimeBlock label="Giờ" value={hours} />
          <TimeBlock label="Phút" value={minutes} />
          <TimeBlock label="Giây" value={seconds} />
        </div>
      ) : (
        <p className="text-red-700 font-semibold mb-6">
          Flash Sale đã kết thúc
        </p>
      )}

      {/* Nội dung: danh sách sản phẩm */}
      <div>{children}</div>

      {/* Custom animation via Tailwind keyframes */}
      <style jsx>{`
        @keyframes flameMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes flicker {
          0%,
          100% {
            opacity: 1;
            filter: drop-shadow(0 0 6px #ff4d4d);
          }
          50% {
            opacity: 0.8;
            filter: drop-shadow(0 0 12px #ff6600);
          }
        }
        .animate-flame-border {
          border-image-slice: 1;
          border-style: solid;
          border-image-source: linear-gradient(
            270deg,
            #ff2400,
            #ff8c00,
            #ffd700,
            #ff8c00,
            #ff2400
          );
          animation: flameMove 4s ease-in-out infinite,
            flicker 2.5s ease-in-out infinite;
          background: linear-gradient(
            270deg,
            #ff2400,
            #ff8c00,
            #ffd700,
            #ff8c00,
            #ff2400
          );
          background-size: 200% 200%;
          box-shadow: 0 0 15px 5px rgba(255, 69, 0, 0.7),
            0 0 30px 10px rgba(255, 140, 0, 0.5);
        }
      `}</style>
    </div>
  );
}

function TimeBlock({ label, value }: { label: string; value: number }) {
  const padded = value.toString().padStart(2, "0");

  return (
    <div
      className="flex flex-col items-center bg-red-100 rounded-md px-3 py-1 shadow-md
      animate-flashNum"
    >
      <span className="text-3xl text-red-700 font-extrabold">{padded}</span>
      <span className="text-xs text-red-600">{label}</span>

      <style jsx>{`
        @keyframes flashNum {
          0%,
          100% {
            opacity: 1;
            text-shadow: 0 0 6px #ff2400, 0 0 14px #ff8c00;
          }
          50% {
            opacity: 0.7;
            text-shadow: 0 0 18px #ff4500, 0 0 30px #ffb347;
          }
        }
        .animate-flashNum {
          animation: flashNum 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
