"use client";

import React, { useEffect, useState } from "react";

interface FlashSaleWrapperProps {
  title: string;
  startTime: string;
  endTime: string;
  children: React.ReactNode;
}

export default function FlashSaleWrapper({
  title,
  startTime,
  endTime,
  children,
}: FlashSaleWrapperProps) {
  const [countdown, setCountdown] = useState<string | React.ReactNode>("");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const start = new Date(startTime);
      const end = new Date(endTime);

      if (now < start) {
        const diff = start.getTime() - now.getTime();
        setCountdown(
          <>
            <span className="mr-2 font-semibold">Bắt đầu sau:</span>
            <CountdownTimer ms={diff} />
          </>
        );
      } else if (now >= start && now <= end) {
        const diff = end.getTime() - now.getTime();
        setCountdown(
          <>
            <span className="mr-2 font-semibold">Kết thúc sau:</span>
            <CountdownTimer ms={diff} />
          </>
        );
      } else {
        setCountdown("Flash Sale đã kết thúc");
      }
    };

    updateCountdown();
    const timerId = setInterval(updateCountdown, 1000);
    return () => clearInterval(timerId);
  }, [startTime, endTime]);

  return (
    <div className="relative p-8 rounded-lg bg-gray-50 overflow-hidden select-none">
      {/* Viền lửa cháy */}
      <div
        className="absolute inset-0 rounded-lg border-8 border-transparent pointer-events-none shadow-[0_0_15px_5px_rgba(255,69,0,0.8),0_0_30px_10px_rgba(255,140,0,0.6)]"
        style={{
          borderImageSlice: 1,
          borderStyle: "solid",
          borderImageSource:
            "linear-gradient(270deg, #ff2400, #ff8c00, #ffd700, #ff8c00, #ff2400)",
          animation:
            "flameMove 4s ease-in-out infinite, flicker 2s ease-in-out infinite",
          background:
            "linear-gradient(270deg, #ff2400, #ff8c00, #ffd700, #ff8c00, #ff2400)",
          backgroundSize: "200% 200%",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
          boxShadow: "0 0 15px 5px rgba(255, 100, 0, 0.7)",
        }}
      ></div>

      {/* Tiêu đề */}
      <h2 className="relative text-4xl font-extrabold text-red-600 mb-2 drop-shadow-xl animate-pulse">
        {title}
      </h2>

      {/* Đồng hồ đếm ngược */}
      <div className="relative text-xl font-semibold text-red-800 mb-6 min-h-[32px]">
        {countdown}
      </div>

      {/* Nội dung */}
      <div className="relative">{children}</div>

      {/* Tailwind animation keyframes */}
      <style>{`
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
          0%, 100% {
            opacity: 1;
            filter: drop-shadow(0 0 4px #ff4d4d);
          }
          50% {
            opacity: 0.85;
            filter: drop-shadow(0 0 8px #ff6600);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            text-shadow: 0 0 15px #ff4d4d, 0 0 30px #ff8c00;
          }
          50% {
            opacity: 0.85;
            text-shadow: 0 0 25px #ff6b00, 0 0 50px #ffd700;
          }
        }

        @keyframes flashNum {
          0%, 100% {
            opacity: 1;
            text-shadow: 0 0 8px #ff2400, 0 0 20px #ff8c00;
          }
          50% {
            opacity: 0.7;
            text-shadow: 0 0 20px #ff4500, 0 0 40px #ffb347;
          }
        }
      `}</style>
    </div>
  );
}

function CountdownTimer({ ms }: { ms: number }) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="inline-flex space-x-1 font-mono font-bold">
      <AnimatedNumber num={hours} />
      <span className="text-red-700 select-none">:</span>
      <AnimatedNumber num={minutes} />
      <span className="text-red-700 select-none">:</span>
      <AnimatedNumber num={seconds} />
    </div>
  );
}

function AnimatedNumber({ num }: { num: number }) {
  const str = num.toString().padStart(2, "0");
  return (
    <span className="inline-block px-2 rounded-md bg-red-700 text-white animate-flashNum">
      {str}
    </span>
  );
}
