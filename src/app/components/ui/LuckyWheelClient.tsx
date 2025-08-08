"use client";

import { useEffect, useRef, useState } from "react";
import { Wheel } from "react-custom-roulette";
import toast from "react-hot-toast";

// Dữ liệu vòng quay
const data = [
  { option: "Không trúng", style: { backgroundColor: "#f87171" } },
  { option: "Không trúng", style: { backgroundColor: "#34d399" } },
  { option: "Không trúng", style: { backgroundColor: "#f87171" } },
  { option: "Không trúng", style: { backgroundColor: "#60a5fa" } },
  { option: "Không trúng", style: { backgroundColor: "#f87171" } },
  { option: "Không trúng", style: { backgroundColor: "#fbbf24" } },
  { option: "Không trúng", style: { backgroundColor: "#f87171" } },
  { option: "Chúc mừng", style: { backgroundColor: "#a78bfa" } },
];

const LuckyWheelClient = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const spinningRef = useRef(false);

  // Âm thanh
  const spinningSound = useRef<HTMLAudioElement | null>(null);
  const winSound = useRef<HTMLAudioElement | null>(null);
  const loseSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    spinningSound.current = new Audio("/sounds/roulette-spin.mp3");
    spinningSound.current.loop = true;

    winSound.current = new Audio(
      "https://www.myinstants.com/media/sounds/mlg-airhorn.mp3"
    );
    loseSound.current = new Audio(
      "https://www.myinstants.com/media/sounds/sad-trombone.mp3"
    );
  }, []);

  const handleSpinClick = () => {
    if (spinningRef.current) return;

    const randomIndex = Math.floor(Math.random() * data.length);
    setPrizeIndex(randomIndex);
    setMustSpin(true);
    spinningRef.current = true;

    if (spinningSound.current) {
      spinningSound.current.currentTime = 0;
      spinningSound.current.play().catch(console.warn);
    }
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    spinningRef.current = false;

    if (spinningSound.current) {
      spinningSound.current.pause();
      spinningSound.current.currentTime = 0;
    }

    const prize = data[prizeIndex].option;
    if (prize === "Không trúng") {
      toast.error("Chúc bạn may mắn lần sau");
      loseSound.current?.play().catch(console.warn);
    } else {
      toast.success(`🎉 Chúc mừng! Bạn nhận được voucher`);
      winSound.current?.play().catch(console.warn);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Vòng quay có nút ở giữa */}
      <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeIndex}
          data={data}
          backgroundColors={["#ffffff", "#f3f4f6"]}
          textColors={["#000"]}
          onStopSpinning={handleStopSpinning}
          outerBorderColor="#000"
          radiusLineColor="#000"
          innerBorderColor="#000"
        />

        {/* Nút nằm chính giữa vòng quay */}
        <button
          onClick={handleSpinClick}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-[#FF9731] text-white rounded-full shadow hover:bg-[#e87e12] transition text-sm md:text-base"
        >
          Quay Ngay
        </button>
      </div>
    </div>
  );
};

export default LuckyWheelClient;
