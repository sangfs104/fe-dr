// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Wheel } from "react-custom-roulette";
// import toast from "react-hot-toast";

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

// type Voucher = {
//   code: string;
//   discount: number;
//   discount_type: string; // "percent" hoặc "amount"
//   expiry_date: string;
// };

// const LuckyWheelClient = () => {
//   const [mustSpin, setMustSpin] = useState(false);
//   const [prizeIndex, setPrizeIndex] = useState(0);
//   const spinningRef = useRef(false);

//   const [voucher, setVoucher] = useState<Voucher | null>(null);
//   const [showVoucherBox, setShowVoucherBox] = useState(false);

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

//   const handleSpinClick = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Vui lòng đăng nhập để quay thưởng");
//       return;
//     }

//     if (spinningRef.current) return;

//     try {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/random-voucher`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const json = await res.json();
//       let randomIndex: number;

//       if (json.status === 200 && json.voucher) {
//         // ✅ Backend đã random trúng → chọn ô "Voucher"
//         const voucherIndices = data
//           .map((d, i) => (d.option === "Voucher" ? i : null))
//           .filter((i) => i !== null) as number[];

//         randomIndex =
//           voucherIndices[Math.floor(Math.random() * voucherIndices.length)];

//         setVoucher(json.voucher);
//       } else {
//         // ❌ Backend random không trúng → chọn ô "Không trúng"
//         const loseIndices = data
//           .map((d, i) => (d.option === "Không trúng" ? i : null))
//           .filter((i) => i !== null) as number[];

//         randomIndex =
//           loseIndices[Math.floor(Math.random() * loseIndices.length)];

//         setVoucher(null);
//       }

//       setPrizeIndex(randomIndex);
//       setMustSpin(true);
//       spinningRef.current = true;
//       spinningSound.current?.play().catch(console.warn);
//     } catch (err) {
//       console.error(err);
//       toast.error("Có lỗi xảy ra khi quay!");
//     }
//   };

//   const handleStopSpinning = () => {
//     setMustSpin(false);
//     spinningRef.current = false;
//     spinningSound.current?.pause();

//     if (winSound.current) winSound.current.currentTime = 0;
//     if (loseSound.current) loseSound.current.currentTime = 0;

//     if (voucher) {
//       const existingVouchers = JSON.parse(
//         localStorage.getItem("vouchers") || "[]"
//       );
//       const newVoucher = { ...voucher, date: new Date().toISOString() };
//       localStorage.setItem(
//         "vouchers",
//         JSON.stringify([...existingVouchers, newVoucher])
//       );

//       winSound.current?.play().catch(console.warn);
//       setShowVoucherBox(true);
//     } else {
//       loseSound.current?.play().catch(console.warn);
//       setShowVoucherBox(true);
//     }
//   };

//   const handleCopy = () => {
//     if (voucher) {
//       navigator.clipboard.writeText(voucher.code);
//       toast.success("Đã sao chép mã!");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center gap-6 py-10">
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

//       {showVoucherBox && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
//           <div className="p-6 rounded-2xl shadow-lg bg-white border border-gray-200 text-center w-[420px] animate-[fadeIn_0.3s_ease]">
//             {voucher ? (
//               <>
//                 <h3 className="text-xl font-bold mb-4 text-center text-neutral-900">
//                   <span className="text-orange-500">Gift Voucher</span>
//                 </h3>

//                 <div className="relative w-full mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-amber-400/70 overflow-hidden">
//                   <div className="h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300" />

//                   <div className="px-6 py-6">
//                     <div className="text-center space-y-0.5">
//                       <p className="text-sm tracking-[0.2em] text-orange-500 font-semibold">
//                         VOUCHER
//                       </p>
//                       <p className="text-[13px] text-neutral-500">
//                         Ưu đãi dành riêng cho bạn
//                       </p>
//                     </div>

//                     {/* Code voucher */}
//                     <div className="mt-5">
//                       <p className="text-xs uppercase text-neutral-500 mb-1">
//                         Mã giảm giá
//                       </p>
//                       <div className="flex items-center gap-3 justify-center">
//                         <span className="inline-block font-mono text-2xl font-bold tracking-[0.25em] text-orange-500 bg-neutral-50 rounded-lg px-6 py-3 ring-1 ring-neutral-200">
//                           {voucher.code}
//                         </span>
//                         <button
//                           onClick={handleCopy}
//                           className="shrink-0 px-4 py-3 rounded-lg text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 transition"
//                         >
//                           Sao chép
//                         </button>
//                       </div>
//                     </div>

//                     {/* Thông tin chi tiết */}
//                     <div className="mt-6 grid grid-cols-2 gap-4 text-[14px]">
//                       <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
//                         <p className="text-neutral-500 mb-0.5">Giảm</p>
//                         <p className="font-semibold text-neutral-900">
//                           {voucher.discount_type === "percent"
//                             ? `${voucher.discount}%`
//                             : new Intl.NumberFormat("vi-VN", {
//                                 style: "currency",
//                                 currency: "VND",
//                               }).format(voucher.discount)}
//                         </p>
//                       </div>
//                       <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
//                         <p className="text-neutral-500 mb-0.5">Hạn dùng</p>
//                         <p className="font-semibold text-neutral-900">
//                           {new Date(voucher.expiry_date).toLocaleDateString(
//                             "vi-VN"
//                           )}
//                         </p>
//                       </div>
//                     </div>

//                     <p className="mt-5 text-[12px] text-neutral-500 text-center">
//                       Áp dụng tại trang thanh toán.
//                     </p>
//                   </div>

//                   <div className="h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300" />
//                 </div>
//               </>
//             ) : (
//               <>
//                 <h3 className="text-lg font-bold text-red-600 mb-2">
//                   😢 Chúc bạn may mắn lần sau!
//                 </h3>
//                 <p className="text-gray-600">Lượt này hơi đen quay lại nhé.</p>
//               </>
//             )}

//             <button
//               onClick={() => setShowVoucherBox(false)}
//               className="mt-5 px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md"
//             >
//               Đóng
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LuckyWheelClient;
"use client";

import { useEffect, useRef, useState } from "react";
import { Wheel } from "react-custom-roulette";
import toast from "react-hot-toast";
import { DreamToast } from "./DreamToast";

const data = [
  {
    option: "Voucher 50000",
    display: "Voucher 50.000đ",
    style: {
      backgroundColor: "#f87171",
      fontWeight: "bold",
      whiteSpace: "pre-line",
    },
  },
  {
    option: "Không trúng",
    display: "Không trúng",
    image: { uri: "/img/sad1.png", sizeMultiplier: 0.5 },
    style: { backgroundColor: "#34d399", fontWeight: "bold" },
    textDistance: 120,
  },
  {
    option: "Voucher 100000",
    display: "Voucher\n100.000đ",
    style: {
      backgroundColor: "#60a5fa",
      fontWeight: "bold",
      whiteSpace: "pre-line",
    },
  },
  {
    option: "Không trúng",
    display: "Không trúng",
    image: { uri: "/img/sad1.png", sizeMultiplier: 0.5 },
    style: { backgroundColor: "#fbbf24", fontWeight: "bold" },
    textDistance: 120,
  },
  {
    option: "Voucher 150000",
    display: "Voucher\n150.000đ",
    style: {
      backgroundColor: "#a78bfa",
      fontWeight: "bold",
      whiteSpace: "pre-line",
    },
  },
  {
    option: "Không trúng",
    display: "Không trúng",
    image: { uri: "/img/sad1.png", sizeMultiplier: 0.5 },
    style: { backgroundColor: "#f472b6", fontWeight: "bold" },
    textDistance: 120,
  },
];

type Voucher = {
  code: string;
  discount: number;
  discount_type: string;
  expiry_date: string;
};

const LuckyWheelClient = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(0);
  const spinningRef = useRef(false);

  const [voucher, setVoucher] = useState<Voucher | null>(null);
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

    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user?.id) {
      toast.error("Không tìm thấy thông tin tài khoản");
      return;
    }

    // ✅ Giới hạn 2 lần quay
    const spins = getSpinCount(user.id);
    if (spins >= 2) {
      toast.error("Bạn đã hết lượt quay rồi 😢");
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
        setVoucher(json.voucher);

        const matchIndex = data.findIndex(
          (d) => d.option === `Voucher ${json.voucher.discount}`
        );

        randomIndex = matchIndex !== -1 ? matchIndex : 0;
      } else {
        const loseIndices = data
          .map((d, i) => (d.option === "Không trúng" ? i : null))
          .filter((i) => i !== null) as number[];

        randomIndex =
          loseIndices[Math.floor(Math.random() * loseIndices.length)];

        setVoucher(null);
      }

      // ✅ Sau khi bắt đầu quay thì +1 lượt
      increaseSpinCount(user.id);

      setPrizeIndex(randomIndex);
      setMustSpin(true);
      spinningRef.current = true;
      spinningSound.current?.play().catch(console.warn);
    } catch (err) {
      console.error("Lỗi khi quay vòng:", err);
      toast.error("Có lỗi xảy ra khi quay!");
    }
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    spinningRef.current = false;
    spinningSound.current?.pause();

    if (winSound.current) winSound.current.currentTime = 0;
    if (loseSound.current) loseSound.current.currentTime = 0;

    if (voucher) {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (user?.id) {
        const key = `vouchers_${user.id}`;
        const existingVouchers: (Voucher & {
          quantity?: number;
          date?: string;
        })[] = JSON.parse(localStorage.getItem(key) || "[]");

        // tìm voucher trùng
        const index = existingVouchers.findIndex(
          (v) => v.code === voucher.code
        );

        if (index !== -1) {
          // nếu có rồi thì tăng số lượng
          existingVouchers[index].quantity =
            (existingVouchers[index].quantity || 1) + 1;
        } else {
          // nếu chưa có thì thêm mới với quantity = 1
          const newVoucher: Voucher & { quantity: number; date: string } = {
            ...voucher,
            date: new Date().toISOString(),
            quantity: 1,
          };
          existingVouchers.push(newVoucher);
        }

        localStorage.setItem(key, JSON.stringify(existingVouchers));
      }

      winSound.current?.play().catch(console.warn);
      setShowVoucherBox(true);
    } else {
      loseSound.current?.play().catch(console.warn);
      setShowVoucherBox(true);
    }
  };

  const handleCopy = async () => {
    if (voucher) {
      try {
        await navigator.clipboard.writeText(voucher.code);
        toast.success("Đã sao chép mã!", {
          duration: 2000,
          position: "bottom-right",
        });
      } catch (err) {
        console.error("Clipboard error:", err);
        toast.error("Không thể sao chép mã!", {
          position: "top-right",
        });
      }
    }
  };

  const getSpinCount = (userId: string) => {
    const key = `spin_count_${userId}`;
    return parseInt(localStorage.getItem(key) || "0", 10);
  };

  const increaseSpinCount = (userId: string) => {
    const key = `spin_count_${userId}`;
    const current = getSpinCount(userId);
    localStorage.setItem(key, String(current + 1));
  };

  return (
    <div className="flex flex-col items-center gap-6 py-10">
      <DreamToast />
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
          <div className="p-6 rounded-2xl shadow-lg bg-white border border-gray-200 text-center w-[420px] animate-[fadeIn_0.3s_ease]">
            {voucher ? (
              <>
                <h3 className="text-xl font-bold mb-4 text-center text-neutral-900">
                  <span className="text-orange-500">Gift Voucher</span>
                </h3>

                <div className="relative w-full mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-amber-400/70 overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300" />

                  <div className="px-6 py-6">
                    <div className="text-center space-y-0.5">
                      <p className="text-sm tracking-[0.2em] text-orange-500 font-semibold">
                        VOUCHER
                      </p>
                      <p className="text-[13px] text-neutral-500">
                        Ưu đãi dành riêng cho bạn
                      </p>
                    </div>

                    <div className="mt-5">
                      <p className="text-xs uppercase text-neutral-500 mb-1">
                        Mã giảm giá
                      </p>
                      <div className="flex items-center gap-3 justify-center">
                        <span className="inline-block font-mono text-2xl font-bold tracking-[0.25em] text-orange-500 bg-neutral-50 rounded-lg px-6 py-3 ring-1 ring-neutral-200">
                          {voucher.code}
                        </span>
                        <button
                          onClick={handleCopy}
                          className="shrink-0 px-4 py-3 rounded-lg text-sm font-semibold bg-orange-500 text-white hover:bg-orange-600 transition"
                        >
                          Sao chép
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4 text-[14px]">
                      <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
                        <p className="text-neutral-500 mb-0.5">Giảm</p>
                        <p className="font-semibold text-neutral-900">
                          {voucher.discount_type === "percent"
                            ? `${voucher.discount}%`
                            : new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(voucher.discount)}
                        </p>
                      </div>
                      <div className="rounded-xl bg-neutral-50 border border-neutral-200 p-4">
                        <p className="text-neutral-500 mb-0.5">Hạn dùng</p>
                        <p className="font-semibold text-neutral-900">
                          {new Date(voucher.expiry_date).toLocaleDateString(
                            "vi-VN"
                          )}
                        </p>
                      </div>
                    </div>

                    <p className="mt-5 text-[12px] text-neutral-500 text-center">
                      Áp dụng tại trang thanh toán.
                    </p>
                  </div>

                  <div className="h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300" />
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold text-red-600 mb-2">
                  😢 Chúc bạn may mắn lần sau!
                </h3>
                <p className="text-gray-600">Lượt này hơi đen quay lại nhé.</p>
              </>
            )}

            <button
              onClick={() => setShowVoucherBox(false)}
              className="mt-5 px-5 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md"
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
