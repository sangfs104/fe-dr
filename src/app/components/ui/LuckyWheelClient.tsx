// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Wheel } from "react-custom-roulette";
// import toast from "react-hot-toast";

// // Dữ liệu vòng quay
// const data = [
//   {
//     option: "Voucher",
//     style: { backgroundColor: "#f87171", fontWeight: "bold" },
//   },
//   {
//     option: "Không trúng",
//     image: { uri: "/img/sad1.png", sizeMultiplier: 0.5 },
//     style: { backgroundColor: "#34d399", fontWeight: "bold" },
//     textDistance: 120,
//   },
//   {
//     option: "Voucher",
//     style: { backgroundColor: "#60a5fa", fontWeight: "bold" },
//   },
//   {
//     option: "Không trúng",
//     image: { uri: "/img/sad1.png", sizeMultiplier: 0.5 },
//     style: { backgroundColor: "#fbbf24", fontWeight: "bold" },
//     textDistance: 120,
//   },
//   {
//     option: "Voucher",
//     style: { backgroundColor: "#a78bfa", fontWeight: "bold" },
//   },
//   {
//     option: "Không trúng",
//     image: { uri: "/img/sad1.png", sizeMultiplier: 0.5 },
//     style: { backgroundColor: "#f472b6", fontWeight: "bold" },
//     textDistance: 120,
//   },
// ];

// const LuckyWheelClient = () => {
//   const [mustSpin, setMustSpin] = useState(false);
//   const [prizeIndex, setPrizeIndex] = useState(0);
//   const spinningRef = useRef(false);

//   // Âm thanh (fix type)
//   const spinningSound = useRef<HTMLAudioElement | null>(null);
//   const winSound = useRef<HTMLAudioElement | null>(null);
//   const loseSound = useRef<HTMLAudioElement | null>(null);

//   useEffect(() => {
//     spinningSound.current = new Audio("/sounds/roulette-spin.mp3");
//     spinningSound.current.loop = true;

//     winSound.current = new Audio(
//       "https://www.myinstants.com/media/sounds/mlg-airhorn.mp3"
//     );
//     loseSound.current = new Audio(
//       "https://www.myinstants.com/media/sounds/sad-trombone.mp3"
//     );
//   }, []);

//   const handleSpinClick = () => {
//     if (spinningRef.current) return;

//     const randomIndex = Math.floor(Math.random() * data.length);
//     setPrizeIndex(randomIndex);
//     setMustSpin(true);
//     spinningRef.current = true;

//     spinningSound.current?.play().catch(console.warn);
//   };

//   const handleStopSpinning = () => {
//     setMustSpin(false);
//     spinningRef.current = false;
//     spinningSound.current?.pause();

//     const prize = data[prizeIndex].option;
//     if (prize === "Không trúng") {
//       toast.error("Chúc bạn may mắn lần sau");
//       loseSound.current?.play().catch(console.warn);
//     } else {
//       toast.success("Chúc mừng! Bạn nhận được voucher");
//       winSound.current?.play().catch(console.warn);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-6 py-10">
//       {/* Container vòng quay */}
//       <div
//         className="relative flex items-center justify-center border border-gray-300 rounded-full bg-white"
//         style={{ width: 350, height: 350 }}
//       >
//         <Wheel
//           mustStartSpinning={mustSpin}
//           prizeNumber={prizeIndex}
//           data={data}
//           outerBorderColor="#ccc"
//           outerBorderWidth={2}
//           radiusLineColor="#fff"
//           radiusLineWidth={2}
//           fontSize={16}
//           spinDuration={1.5}
//           onStopSpinning={handleStopSpinning}
//           perpendicularText
//         />

//         {/* Nút quay */}
//         <button
//           onClick={handleSpinClick}
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
//           w-28 h-28 rounded-full bg-[#FF9731]
//           flex items-center justify-center text-white text-lg font-bold
//           border-4 border-white shadow-lg hover:scale-105 active:scale-95
//           transition-transform duration-200 z-[999]"
//         >
//           Quay
//           <br />
//           Ngay
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LuckyWheelClient;

"use client";

import { useEffect, useRef, useState } from "react";
import { Wheel } from "react-custom-roulette";
import toast from "react-hot-toast";

const data = [
  {
    option: "Voucher",
    style: { backgroundColor: "#f87171", fontWeight: "bold" },
  },
  {
    option: "Không trúng",
    image: { uri: "/img/sad1.png", sizeMultiplier: 0.5 },
    style: { backgroundColor: "#34d399", fontWeight: "bold" },
    textDistance: 120,
  },
  {
    option: "Voucher",
    style: { backgroundColor: "#60a5fa", fontWeight: "bold" },
  },
  {
    option: "Không trúng",
    image: { uri: "/img/sad1.png", sizeMultiplier: 0.5 },
    style: { backgroundColor: "#fbbf24", fontWeight: "bold" },
    textDistance: 120,
  },
  {
    option: "Voucher",
    style: { backgroundColor: "#a78bfa", fontWeight: "bold" },
  },
  {
    option: "Không trúng",
    image: { uri: "/img/sad1.png", sizeMultiplier: 0.5 },
    style: { backgroundColor: "#f472b6", fontWeight: "bold" },
    textDistance: 120,
  },
];

const LuckyWheelClient = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const spinningRef = useRef(false);
  const [voucherCode, setVoucherCode] = useState<string | null>(null);

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

  const handleSpinClick = async () => {
    if (spinningRef.current) return;

    try {
      // Gọi API BE lấy voucher
      const res = await fetch("http://localhost:8000/api/random-voucher");
      const json = await res.json();

      let randomIndex: number;

      if (json.status === 200 && json.voucher) {
        // Có voucher => chọn ô "Voucher" bất kỳ
        const voucherIndices = data
          .map((d, i) => (d.option === "Voucher" ? i : null))
          .filter((i) => i !== null) as number[];
        randomIndex =
          voucherIndices[Math.floor(Math.random() * voucherIndices.length)];
        setVoucherCode(json.voucher.code);
      } else {
        // Không có voucher => chọn ô "Không trúng"
        const loseIndices = data
          .map((d, i) => (d.option === "Không trúng" ? i : null))
          .filter((i) => i !== null) as number[];
        randomIndex =
          loseIndices[Math.floor(Math.random() * loseIndices.length)];
        setVoucherCode(null);
      }

      setPrizeIndex(randomIndex);
      setMustSpin(true);
      spinningRef.current = true;
      spinningSound.current?.play().catch(console.warn);
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi xảy ra khi quay!");
    }
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    spinningRef.current = false;
    spinningSound.current?.pause();

    if (voucherCode) {
      toast.success(`Chúc mừng! Bạn nhận được voucher: ${voucherCode}`);
      winSound.current?.play().catch(console.warn);
    } else {
      toast.error("Chúc bạn may mắn lần sau");
      loseSound.current?.play().catch(console.warn);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 py-10">
      <div
        className="relative flex items-center justify-center border border-gray-300 rounded-full bg-white"
        style={{ width: 350, height: 350 }}
      >
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeIndex}
          data={data}
          outerBorderColor="#ccc"
          outerBorderWidth={2}
          radiusLineColor="#fff"
          radiusLineWidth={2}
          fontSize={16}
          spinDuration={1.5}
          onStopSpinning={handleStopSpinning}
          perpendicularText
        />

        <button
          onClick={handleSpinClick}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-28 h-28 rounded-full bg-[#FF9731]
          flex items-center justify-center text-white text-lg font-bold
          border-4 border-white shadow-lg hover:scale-105 active:scale-95
          transition-transform duration-200 z-[999]"
        >
          Quay
          <br />
          Ngay
        </button>
      </div>
    </div>
  );
};

export default LuckyWheelClient;
