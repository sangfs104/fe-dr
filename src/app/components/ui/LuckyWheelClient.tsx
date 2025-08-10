// components/LuckyWheelClient.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Wheel } from "react-custom-roulette";
import toast from "react-hot-toast";

// Dữ liệu vòng quay
const data = [
  {
    option: "Voucher",
    style: { backgroundColor: "#f87171", fontSize: 16, fontWeight: "bold" },
    textDistance: 0, // gần tâm
  },
  {
    option: "Không trúng",
    style: { backgroundColor: "#34d399", fontSize: 16, fontWeight: "bold" },
    image: { uri: "/img/sad1.png", sizeMultiplier: 0.4 }, // to hơn chút
    textDistance: 0,
  },
  {
    option: "Voucher",
    style: { backgroundColor: "#60a5fa", fontSize: 16, fontWeight: "bold" },
    textDistance: 0,
  },
  {
    option: "Không trúng",
    style: { backgroundColor: "#fbbf24", fontSize: 16, fontWeight: "bold" },
    image: { uri: "/img/sad1.png", sizeMultiplier: 0.4 },
    textDistance: 0,
  },
  {
    option: "Voucher",
    style: { backgroundColor: "#a78bfa", fontSize: 16, fontWeight: "bold" },
    textDistance: 0,
  },
  {
    option: "Không trúng",
    style: { backgroundColor: "#f472b6", fontSize: 16, fontWeight: "bold" },
    image: { uri: "/img/sad1.png", sizeMultiplier: 0.4 },
    textDistance: 0,
  },
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
      toast.success(`Chúc mừng! Bạn nhận được voucher`);
      winSound.current?.play().catch(console.warn);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative flex items-center justify-center w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeIndex}
          data={data}
          outerBorderColor="#ccc"
          outerBorderWidth={2}
          radiusLineColor="#fff"
          radiusLineWidth={2}
          fontSize={12}
          spinDuration={1.2} // quay nhanh hơn
          onStopSpinning={handleStopSpinning}
          perpendicularText={true}
        />

        <button
          onClick={handleSpinClick}
          style={{ zIndex: 10 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
      w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#FF9731]
      flex items-center justify-center 
      text-white text-lg md:text-xl font-extrabold uppercase tracking-wide
      shadow-lg active:scale-95
      transition-transform duration-200
      border-4 border-white"
        >
          <span className="[text-shadow:_1px_1px_3px_rgba(0,0,0,0.6)]">
            Quay
            <br />
            Ngay
          </span>
        </button>
      </div>
    </div>
  );
};

export default LuckyWheelClient;
