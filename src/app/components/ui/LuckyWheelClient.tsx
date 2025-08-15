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
  const [showVoucherBox, setShowVoucherBox] = useState(false);

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
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Vui lòng đăng nhập để quay thưởng");
      return;
    }

    if (spinningRef.current) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/random-voucher`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const json = await res.json();
      let randomIndex: number;

      if (json.status === 200 && json.voucher) {
        const voucherIndices = data
          .map((d, i) => (d.option === "Voucher" ? i : null))
          .filter((i) => i !== null) as number[];
        randomIndex =
          voucherIndices[Math.floor(Math.random() * voucherIndices.length)];
        setVoucherCode(json.voucher.code);
      } else {
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

    // Reset thời gian phát nhạc về 0
    if (winSound.current) winSound.current.currentTime = 0;
    if (loseSound.current) loseSound.current.currentTime = 0;

    if (voucherCode) {
      const existingVouchers = JSON.parse(
        localStorage.getItem("vouchers") || "[]"
      );
      const newVoucher = { code: voucherCode, date: new Date().toISOString() };
      localStorage.setItem(
        "vouchers",
        JSON.stringify([...existingVouchers, newVoucher])
      );

      winSound.current?.play().catch(console.warn);
      setShowVoucherBox(true);
    } else {
      loseSound.current?.play().catch(console.warn);
      setShowVoucherBox(true); // vẫn hiện modal nhưng nội dung là thua
    }
  };

  const handleCopy = () => {
    if (voucherCode) {
      navigator.clipboard.writeText(voucherCode);
      toast.success("Đã sao chép mã!");
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

      {showVoucherBox && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
          <div className="p-5 rounded-xl shadow-lg bg-white border border-gray-200 text-center w-80 animate-[fadeIn_0.3s_ease]">
            {voucherCode ? (
              <>
                <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Bạn đã nhận được Voucher!
                </h3>

                {/* Phiếu mã giảm giá */}
                <div className="relative w-full">
                  {/* Răng cưa */}
                  <div className="absolute -left-2 top-0 bottom-0 flex flex-col justify-between">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <span
                        key={i}
                        className="w-3 h-3 bg-white border border-orange-500 rounded-full"
                      ></span>
                    ))}
                  </div>
                  <div className="absolute -right-2 top-0 bottom-0 flex flex-col justify-between">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <span
                        key={i}
                        className="w-3 h-3 bg-white border border-orange-500 rounded-full"
                      ></span>
                    ))}
                  </div>

                  {/* Nội dung phiếu */}
                  <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg shadow-lg border border-orange-500 flex items-center justify-between px-4 py-3">
                    <span className="font-mono font-bold text-lg">
                      {voucherCode}
                    </span>
                    <button
                      onClick={handleCopy}
                      className="bg-white text-orange-600 px-3 py-1 rounded-lg text-sm font-semibold hover:bg-gray-100"
                    >
                      Sao chép
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  Hãy dùng mã này khi thanh toán để nhận ưu đãi.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold text-red-600 mb-2">
                  😢 Chúc bạn may mắn lần sau!
                </h3>
                <p className="text-gray-600">
                  Bạn chưa trúng phần thưởng nào lần này.
                </p>
              </>
            )}

            <button
              onClick={() => setShowVoucherBox(false)}
              className="mt-4 px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LuckyWheelClient;
