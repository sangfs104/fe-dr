// // "use client";

// // import { useState, useRef, useEffect } from "react";
// // import { Bot, Mic, Send } from "lucide-react";
// // import { motion } from "framer-motion";

// // // Định nghĩa kiểu dữ liệu
// // interface OrderInfo {
// //   product: string;
// //   quantity: number;
// //   size: string;
// //   address: string;
// // }

// // interface OrderResult {
// //   message: string;
// //   payment_url?: string;
// // }

// // type Step = "idle" | "listening" | "parsing" | "confirming" | "done";

// // export default function VoiceQuickOrderFlexible() {
// //   const [voiceText, setVoiceText] = useState<string>("");
// //   const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
// //   const [orderResult, setOrderResult] = useState<OrderResult | null>(null);
// //   const [step, setStep] = useState<Step>("idle");
// //   const [paymentMethod, setPaymentMethod] = useState<1 | 2>(1);
// //   const recognitionRef = useRef<SpeechRecognition | null>(null);
// //   const [showWidget, setShowWidget] = useState<boolean>(false);
// //   const [aiSpeechText, setAiSpeechText] = useState<string>(""); // 👈 subtitle AI nói

// //   useEffect(() => {
// //     if (showWidget && step === "idle") {
// //       speak("Xin chào! Bạn muốn đặt món gì hôm nay?");
// //     }
// //   }, [showWidget, step]);

// //   const speak = (text: string, callback?: () => void) => {
// //     if ("speechSynthesis" in window) {
// //       const utter = new SpeechSynthesisUtterance(text);
// //       utter.lang = "vi-VN";
// //       setAiSpeechText(text); // 👈 subtitle hiển thị
// //       utter.onend = () => {
// //         setAiSpeechText(""); // 👈 ẩn sau khi nói xong
// //         callback && callback();
// //       };
// //       window.speechSynthesis.speak(utter);
// //     }
// //   };

// //   const waitForVoiceConfirm = (): Promise<"yes" | "no"> => {
// //     return new Promise((resolve) => {
// //       const recognition = new (window as any).webkitSpeechRecognition();
// //       recognition.lang = "vi-VN";
// //       recognition.start();

// //       recognition.onresult = (event: SpeechRecognitionEvent) => {
// //         const response = event.results[0][0].transcript.toLowerCase();
// //         if (response.includes("đồng ý") || response.includes("ok")) {
// //           resolve("yes");
// //         } else {
// //           resolve("no");
// //         }
// //       };

// //       recognition.onerror = () => resolve("no");
// //     });
// //   };

// //   const waitForVoicePaymentMethod = (): Promise<1 | 2> => {
// //     return new Promise((resolve) => {
// //       const recognition = new (window as any).webkitSpeechRecognition();
// //       recognition.lang = "vi-VN";
// //       recognition.start();

// //       recognition.onresult = (event: SpeechRecognitionEvent) => {
// //         const response = event.results[0][0].transcript.toLowerCase();
// //         if (response.includes("tiền mặt")) {
// //           resolve(1);
// //         } else if (response.includes("chuyển khoản")) {
// //           resolve(2);
// //         } else {
// //           resolve(1);
// //         }
// //       };

// //       recognition.onerror = () => resolve(1);
// //     });
// //   };

// //   const startVoice = () => {
// //     if (!("webkitSpeechRecognition" in window)) {
// //       alert("Trình duyệt không hỗ trợ voice!");
// //       return;
// //     }

// //     setStep("listening");
// //     const recognition = new (window as any).webkitSpeechRecognition();
// //     recognition.lang = "vi-VN";

// //     recognition.onresult = (event: SpeechRecognitionEvent) => {
// //       const text = event.results[0][0].transcript;
// //       setVoiceText(text);
// //       parseOrder(text);
// //     };

// //     recognition.start();
// //     recognitionRef.current = recognition;
// //   };

// //   const parseOrder = async (text: string) => {
// //     setStep("parsing");
// //     const token = localStorage.getItem("token");

// //     const res = await fetch("http://localhost:8000/api/voice-order/parse", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${token}`,
// //       },
// //       body: JSON.stringify({ text }),
// //     });

// //     const data: OrderInfo = await res.json();
// //     setOrderInfo(data);
// //     setStep("confirming");

// //     const confirmText = `Bạn muốn mua ${data.quantity} ${data.product} size ${data.size}, giao về ${data.address}. Nói "Đồng ý" để xác nhận, hoặc "không" để hủy.`;

// //     speak(confirmText, async () => {
// //       const result = await waitForVoiceConfirm();
// //       if (result === "yes") {
// //         speak(
// //           'Chọn phương thức thanh toán: "thanh toán bằng tiền mặt" hoặc "chuyển khoản".',
// //           async () => {
// //             const method = await waitForVoicePaymentMethod();
// //             setPaymentMethod(method);
// //             speak("Xác nhận đặt hàng...");
// //             await handleQuickOrder(data, method);
// //           }
// //         );
// //       } else {
// //         speak("Đã huỷ đơn hàng. Vui lòng thử lại.");
// //         setOrderInfo(null);
// //         setStep("idle");
// //       }
// //     });
// //   };

// //   const handleQuickOrder = async (orderData: OrderInfo, method: 1 | 2) => {
// //     const token = localStorage.getItem("token");
// //     const payload = {
// //       ...orderData,
// //       payment_id: method,
// //     };

// //     const res = await fetch("http://localhost:8000/api/voice-order/quick", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${token}`,
// //       },
// //       body: JSON.stringify(payload),
// //     });

// //     const data: OrderResult = await res.json();
// //     setOrderResult(data);
// //     setStep("done");

// //     if (method === 2 && data.payment_url) {
// //       speak("Đang chuyển đến trang thanh toán VNPAY...");
// //       window.location.href = data.payment_url;
// //     } else {
// //       speak(data.message || "Đặt hàng thành công.");
// //     }
// //   };

// //   return (
// //     <motion.div
// //       drag
// //       dragConstraints={{ left: 0, top: 0, right: 500, bottom: 800 }}
// //       className="fixed bottom-20 right-4 z-50"
// //     >
// //       {!showWidget && (
// //         <div className="relative flex flex-col items-center group">
// //           {/* Đám mây lời nhắn chớp từ từ */}
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: [0, 1, 0] }}
// //             transition={{
// //               duration: 3,
// //               repeat: Infinity,
// //               ease: "easeInOut",
// //             }}
// //             className="mb-3 px-4 py-1 bg-white text-purple-600 text-sm font-semibold rounded-full border border-purple-300 shadow-md backdrop-blur-md"
// //           >
// //             🛒 Mua hàng nhanh - nhấn tui đi!
// //           </motion.div>

// //           {/* Nút tròn AI */}
// //           <motion.button
// //             whileHover={{ scale: 1.08 }}
// //             whileTap={{ scale: 0.95 }}
// //             onClick={() => setShowWidget(true)}
// //             className="rounded-full p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white shadow-2xl transition-all duration-300"
// //           >
// //             <motion.div
// //               animate={{
// //                 scale: [1, 1.05, 1],
// //                 boxShadow: [
// //                   "0 0 0px rgba(255, 255, 255, 0.6)",
// //                   "0 0 20px rgba(255, 255, 255, 0.9)",
// //                   "0 0 0px rgba(255, 255, 255, 0.6)",
// //                 ],
// //               }}
// //               transition={{
// //                 duration: 4,
// //                 repeat: Infinity,
// //                 ease: "easeInOut",
// //               }}
// //             >
// //               <Bot size={24} />
// //             </motion.div>
// //           </motion.button>
// //         </div>
// //       )}

// //       {showWidget && (
// //         <motion.div
// //           initial={{ opacity: 0, scale: 0.95 }}
// //           animate={{ opacity: 1, scale: 1 }}
// //           exit={{ opacity: 0, scale: 0.95 }}
// //           className="bg-white shadow-2xl rounded-2xl w-80 p-4"
// //         >
// //           <div className="flex justify-between items-center mb-4">
// //             <h3 className="text-lg font-bold">🤖 DREAMS</h3>
// //             <button
// //               onClick={() => setShowWidget(false)}
// //               className="text-gray-400 hover:text-gray-600"
// //             >
// //               ✕
// //             </button>
// //           </div>

// //           <textarea
// //             className="w-full rounded-md border border-gray-300 p-2 text-sm mb-2"
// //             rows={3}
// //             placeholder="Nói hoặc nhập nội dung đặt hàng..."
// //             value={voiceText}
// //             onChange={(e) => setVoiceText(e.target.value)}
// //           />

// //           <div className="flex gap-2">
// //             <button
// //               onClick={startVoice}
// //               className="flex-1 flex items-center justify-center gap-1 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
// //             >
// //               <Mic size={16} /> Nói
// //             </button>
// //             <button
// //               onClick={() => parseOrder(voiceText)}
// //               disabled={!voiceText.trim()}
// //               className="flex-1 flex items-center justify-center gap-1 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
// //             >
// //               <Send size={16} /> Gửi
// //             </button>
// //           </div>

// //           {step === "listening" && (
// //             <p className="text-xs text-blue-500 mt-2">
// //               🎧 Đang nghe giọng nói...
// //             </p>
// //           )}
// //           {step === "parsing" && (
// //             <p className="text-xs text-gray-500 mt-2">
// //               🔎 Đang phân tích đơn hàng...
// //             </p>
// //           )}
// //           {step === "done" && orderResult && (
// //             <div className="mt-2 text-sm text-green-600">
// //               ✅ {orderResult.message}
// //             </div>
// //           )}

// //           {/* 👇 Subtitle AI đang nói */}
// //           {aiSpeechText && (
// //             <div className="mt-4 px-3 py-2 rounded-md bg-yellow-100 text-yellow-800 text-sm border border-yellow-300 animate-pulse">
// //               🤖 <strong>AI:</strong> {aiSpeechText}
// //             </div>
// //           )}
// //         </motion.div>
// //       )}
// //     </motion.div>
// //   );
// // }

// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Bot, Mic, Send } from "lucide-react";
// import { motion } from "framer-motion";

// // 👇 Fix lỗi no-explicit-any

// declare global {
//   interface Window {
//     webkitSpeechRecognition: any;
//   }

//   interface SpeechRecognitionEvent extends Event {
//     results: SpeechRecognitionResultList;
//   }
// }
// // Định nghĩa kiểu dữ liệu
// interface OrderInfo {
//   product: string;
//   quantity: number;
//   size: string;
//   address: string;
// }

// interface OrderResult {
//   message: string;
//   payment_url?: string;
// }

// type Step = "idle" | "listening" | "parsing" | "confirming" | "done";

// export default function VoiceQuickOrderFlexible() {
//   const [voiceText, setVoiceText] = useState<string>("");
//   const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
//   const [orderResult, setOrderResult] = useState<OrderResult | null>(null);
//   const [step, setStep] = useState<Step>("idle");
//   const [paymentMethod, setPaymentMethod] = useState<1 | 2>(1);
//   const recognitionRef = useRef<SpeechRecognition | null>(null);
//   const [showWidget, setShowWidget] = useState<boolean>(false);
//   const [aiSpeechText, setAiSpeechText] = useState<string>(""); // 👈 subtitle AI nói

//   useEffect(() => {
//     if (showWidget && step === "idle") {
//       speak("Xin chào! Bạn muốn đặt món gì hôm nay?");
//     }
//   }, [showWidget, step]);

//   const speak = (text: string, callback?: () => void) => {
//     if ("speechSynthesis" in window) {
//       const utter = new SpeechSynthesisUtterance(text);
//       utter.lang = "vi-VN";
//       setAiSpeechText(text);
//       utter.onend = () => {
//         setAiSpeechText("");
//         if (callback) callback();
//       };
//       window.speechSynthesis.speak(utter);
//     }
//   };

//   const waitForVoiceConfirm = (): Promise<"yes" | "no"> => {
//     return new Promise((resolve) => {
//       const recognition = new window.webkitSpeechRecognition();
//       recognition.lang = "vi-VN";
//       recognition.start();

//       recognition.onresult = (event: SpeechRecognitionEvent) => {
//         const response = event.results[0][0].transcript.toLowerCase();
//         if (response.includes("đồng ý") || response.includes("ok")) {
//           resolve("yes");
//         } else {
//           resolve("no");
//         }
//       };

//       recognition.onerror = () => resolve("no");
//     });
//   };

//   const waitForVoicePaymentMethod = (): Promise<1 | 2> => {
//     return new Promise((resolve) => {
//       const recognition = new window.webkitSpeechRecognition();
//       recognition.lang = "vi-VN";
//       recognition.start();

//       recognition.onresult = (event: SpeechRecognitionEvent) => {
//         const response = event.results[0][0].transcript.toLowerCase();
//         if (response.includes("tiền mặt")) {
//           resolve(1);
//         } else if (response.includes("chuyển khoản")) {
//           resolve(2);
//         } else {
//           resolve(1);
//         }
//       };

//       recognition.onerror = () => resolve(1);
//     });
//   };

//   const startVoice = () => {
//     if (!("webkitSpeechRecognition" in window)) {
//       alert("Trình duyệt không hỗ trợ voice!");
//       return;
//     }

//     setStep("listening");
//     const recognition = new window.webkitSpeechRecognition();
//     recognition.lang = "vi-VN";

//     recognition.onresult = (event: SpeechRecognitionEvent) => {
//       const text = event.results[0][0].transcript;
//       setVoiceText(text);
//       parseOrder(text);
//     };

//     recognition.start();
//     recognitionRef.current = recognition;
//   };

//   const parseOrder = async (text: string) => {
//     setStep("parsing");
//     const token = localStorage.getItem("token");

//     const res = await fetch("http://localhost:8000/api/voice-order/parse", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ text }),
//     });

//     const data: OrderInfo = await res.json();
//     setOrderInfo(data);
//     setStep("confirming");

//     const confirmText = `Bạn muốn mua ${data.quantity} ${data.product} size ${data.size}, giao về ${data.address}. Nói "Đồng ý" để xác nhận, hoặc "không" để hủy.`;

//     speak(confirmText, async () => {
//       const result = await waitForVoiceConfirm();
//       if (result === "yes") {
//         speak(
//           'Chọn phương thức thanh toán: "thanh toán bằng tiền mặt" hoặc "chuyển khoản".',
//           async () => {
//             const method = await waitForVoicePaymentMethod();
//             setPaymentMethod(method);
//             speak("Xác nhận đặt hàng...");
//             await handleQuickOrder(data, method);
//           }
//         );
//       } else {
//         speak("Đã huỷ đơn hàng. Vui lòng thử lại.");
//         setOrderInfo(null);
//         setStep("idle");
//       }
//     });
//   };

//   const handleQuickOrder = async (orderData: OrderInfo, method: 1 | 2) => {
//     const token = localStorage.getItem("token");
//     const payload = {
//       ...orderData,
//       payment_id: method,
//     };

//     const res = await fetch("http://localhost:8000/api/voice-order/quick", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     const data: OrderResult = await res.json();
//     setOrderResult(data);
//     setStep("done");

//     if (method === 2 && data.payment_url) {
//       speak("Đang chuyển đến trang thanh toán VNPAY...");
//       window.location.href = data.payment_url;
//     } else {
//       speak(data.message || "Đặt hàng thành công.");
//     }
//   };

//   return (
//     <motion.div
//       drag
//       dragConstraints={{ left: 0, top: 0, right: 500, bottom: 800 }}
//       className="fixed bottom-20 right-4 z-50"
//     >
//       {!showWidget && (
//         <div className="relative flex flex-col items-center group">
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: [0, 1, 0] }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//             className="mb-3 px-4 py-1 bg-white text-purple-600 text-sm font-semibold rounded-full border border-purple-300 shadow-md backdrop-blur-md"
//           >
//             🛒 Mua hàng nhanh - nhấn tui đi!
//           </motion.div>

//           <motion.button
//             whileHover={{ scale: 1.08 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setShowWidget(true)}
//             className="rounded-full p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white shadow-2xl transition-all duration-300"
//           >
//             <motion.div
//               animate={{
//                 scale: [1, 1.05, 1],
//                 boxShadow: [
//                   "0 0 0px rgba(255, 255, 255, 0.6)",
//                   "0 0 20px rgba(255, 255, 255, 0.9)",
//                   "0 0 0px rgba(255, 255, 255, 0.6)",
//                 ],
//               }}
//               transition={{
//                 duration: 4,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             >
//               <Bot size={24} />
//             </motion.div>
//           </motion.button>
//         </div>
//       )}

//       {showWidget && (
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.95 }}
//           className="bg-white shadow-2xl rounded-2xl w-80 p-4"
//         >
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-bold">🤖 DREAMS</h3>
//             <button
//               onClick={() => setShowWidget(false)}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               ✕
//             </button>
//           </div>

//           <textarea
//             className="w-full rounded-md border border-gray-300 p-2 text-sm mb-2"
//             rows={3}
//             placeholder="Nói hoặc nhập nội dung đặt hàng..."
//             value={voiceText}
//             onChange={(e) => setVoiceText(e.target.value)}
//           />

//           <div className="flex gap-2">
//             <button
//               onClick={startVoice}
//               className="flex-1 flex items-center justify-center gap-1 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
//             >
//               <Mic size={16} /> Nói
//             </button>
//             <button
//               onClick={() => parseOrder(voiceText)}
//               disabled={!voiceText.trim()}
//               className="flex-1 flex items-center justify-center gap-1 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
//             >
//               <Send size={16} /> Gửi
//             </button>
//           </div>

//           {step === "listening" && (
//             <p className="text-xs text-blue-500 mt-2">
//               🎧 Đang nghe giọng nói...
//             </p>
//           )}
//           {step === "parsing" && (
//             <p className="text-xs text-gray-500 mt-2">
//               🔎 Đang phân tích đơn hàng...
//             </p>
//           )}
//           {step === "done" && orderResult && (
//             <div className="mt-2 text-sm text-green-600">
//               ✅ {orderResult.message}
//             </div>
//           )}

//           {/* 👇 Hiển thị orderInfo */}
//           {orderInfo && (
//             <div className="mt-2 text-sm text-gray-700">
//               🛒 Sản phẩm: {orderInfo.product} - Số lượng: {orderInfo.quantity}{" "}
//               - Size: {orderInfo.size}
//               <br />
//               📍 Giao đến: {orderInfo.address}
//             </div>
//           )}

//           {/* 👇 Hiển thị payment method */}
//           {step === "confirming" && (
//             <p className="text-xs text-purple-600 mt-1">
//               💳 Phương thức thanh toán:{" "}
//               {paymentMethod === 1 ? "Tiền mặt" : "Chuyển khoản"}
//             </p>
//           )}

//           {/* 👇 Subtitle AI đang nói */}
//           {aiSpeechText && (
//             <div className="mt-4 px-3 py-2 rounded-md bg-yellow-100 text-yellow-800 text-sm border border-yellow-300 animate-pulse">
//               🤖 <strong>AI:</strong> {aiSpeechText}
//             </div>
//           )}
//         </motion.div>
//       )}
//     </motion.div>
//   );
// }
"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Mic, Send } from "lucide-react";
import { motion } from "framer-motion";

// TypeScript interfaces for Speech Recognition
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void)
    | null;
  onerror:
    | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void)
    | null;
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
}

interface SpeechRecognitionStatic {
  new (): SpeechRecognition;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  readonly isFinal: boolean;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

declare global {
  interface Window {
    webkitSpeechRecognition: SpeechRecognitionStatic;
    SpeechRecognition: SpeechRecognitionStatic;
  }
}

// Định nghĩa kiểu dữ liệu
interface OrderInfo {
  product: string;
  quantity: number;
  size: string;
  address: string;
}

interface OrderResult {
  message: string;
  payment_url?: string;
}

type Step = "idle" | "listening" | "parsing" | "confirming" | "done";

export default function VoiceQuickOrderFlexible() {
  const [voiceText, setVoiceText] = useState<string>("");
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null);
  const [step, setStep] = useState<Step>("idle");
  const [paymentMethod, setPaymentMethod] = useState<1 | 2>(1);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [showWidget, setShowWidget] = useState<boolean>(false);
  const [aiSpeechText, setAiSpeechText] = useState<string>(""); // subtitle AI nói

  useEffect(() => {
    if (showWidget && step === "idle") {
      speak("Xin chào! Bạn muốn đặt món gì hôm nay?");
    }
  }, [showWidget, step]);

  const speak = (text: string, callback?: () => void): void => {
    if ("speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "vi-VN";
      setAiSpeechText(text);
      utter.onend = () => {
        setAiSpeechText("");
        if (callback) callback();
      };
      window.speechSynthesis.speak(utter);
    }
  };

  const waitForVoiceConfirm = (): Promise<"yes" | "no"> => {
    return new Promise((resolve) => {
      const SpeechRecognitionConstructor =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      if (!SpeechRecognitionConstructor) {
        resolve("no");
        return;
      }

      const recognition = new SpeechRecognitionConstructor();
      recognition.lang = "vi-VN";
      recognition.start();

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const response = event.results[0][0].transcript.toLowerCase();
        if (response.includes("đồng ý") || response.includes("ok")) {
          resolve("yes");
        } else {
          resolve("no");
        }
      };

      recognition.onerror = () => resolve("no");
    });
  };

  const waitForVoicePaymentMethod = (): Promise<1 | 2> => {
    return new Promise((resolve) => {
      const SpeechRecognitionConstructor =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      if (!SpeechRecognitionConstructor) {
        resolve(1);
        return;
      }

      const recognition = new SpeechRecognitionConstructor();
      recognition.lang = "vi-VN";
      recognition.start();

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const response = event.results[0][0].transcript.toLowerCase();
        if (response.includes("tiền mặt")) {
          resolve(1);
        } else if (response.includes("chuyển khoản")) {
          resolve(2);
        } else {
          resolve(1);
        }
      };

      recognition.onerror = () => resolve(1);
    });
  };

  const startVoice = (): void => {
    const SpeechRecognitionConstructor =
      window.webkitSpeechRecognition || window.SpeechRecognition;
    if (!SpeechRecognitionConstructor) {
      alert("Trình duyệt không hỗ trợ voice!");
      return;
    }

    setStep("listening");
    const recognition = new SpeechRecognitionConstructor();
    recognition.lang = "vi-VN";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const text = event.results[0][0].transcript;
      setVoiceText(text);
      parseOrder(text);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setStep("idle");
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const parseOrder = async (text: string): Promise<void> => {
    setStep("parsing");
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8000/api/voice-order/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: OrderInfo = await res.json();
      setOrderInfo(data);
      setStep("confirming");

      const confirmText = `Bạn muốn mua ${data.quantity} ${data.product} size ${data.size}, giao về ${data.address}. Nói "Đồng ý" để xác nhận, hoặc "không" để hủy.`;

      speak(confirmText, async () => {
        const result = await waitForVoiceConfirm();
        if (result === "yes") {
          speak(
            'Chọn phương thức thanh toán: "thanh toán bằng tiền mặt" hoặc "chuyển khoản".',
            async () => {
              const method = await waitForVoicePaymentMethod();
              setPaymentMethod(method);
              speak("Xác nhận đặt hàng...");
              await handleQuickOrder(data, method);
            }
          );
        } else {
          speak("Đã huỷ đơn hàng. Vui lòng thử lại.");
          setOrderInfo(null);
          setStep("idle");
        }
      });
    } catch (error) {
      console.error("Error parsing order:", error);
      speak("Có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại.");
      setStep("idle");
    }
  };

  const handleQuickOrder = async (
    orderData: OrderInfo,
    method: 1 | 2
  ): Promise<void> => {
    const token = localStorage.getItem("token");
    const payload = {
      ...orderData,
      payment_id: method,
    };

    try {
      const res = await fetch("http://localhost:8000/api/voice-order/quick", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data: OrderResult = await res.json();
      setOrderResult(data);
      setStep("done");

      if (method === 2 && data.payment_url) {
        speak("Đang chuyển đến trang thanh toán VNPAY...");
        window.location.href = data.payment_url;
      } else {
        speak(data.message || "Đặt hàng thành công.");
      }
    } catch (error) {
      console.error("Error processing order:", error);
      speak("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.");
      setStep("idle");
    }
  };

  const handleTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setVoiceText(e.target.value);
  };

  const handleParseClick = (): void => {
    if (voiceText.trim()) {
      parseOrder(voiceText);
    }
  };

  const handleCloseWidget = (): void => {
    setShowWidget(false);
    setStep("idle");
    setVoiceText("");
    setOrderInfo(null);
    setOrderResult(null);
    setAiSpeechText("");
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, top: 0, right: 500, bottom: 800 }}
      className="fixed bottom-20 right-4 z-50"
    >
      {!showWidget && (
        <div className="relative flex flex-col items-center group">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mb-3 px-4 py-1 bg-white text-purple-600 text-sm font-semibold rounded-full border border-purple-300 shadow-md backdrop-blur-md"
          >
            🛒 Mua hàng nhanh - nhấn tui đi!
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowWidget(true)}
            className="rounded-full p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white shadow-2xl transition-all duration-300"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 0px rgba(255, 255, 255, 0.6)",
                  "0 0 20px rgba(255, 255, 255, 0.9)",
                  "0 0 0px rgba(255, 255, 255, 0.6)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Bot size={24} />
            </motion.div>
          </motion.button>
        </div>
      )}

      {showWidget && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white shadow-2xl rounded-2xl w-80 p-4"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">🤖 DREAMS</h3>
            <button
              onClick={handleCloseWidget}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <textarea
            className="w-full rounded-md border border-gray-300 p-2 text-sm mb-2"
            rows={3}
            placeholder="Nói hoặc nhập nội dung đặt hàng..."
            value={voiceText}
            onChange={handleTextChange}
          />

          <div className="flex gap-2">
            <button
              onClick={startVoice}
              className="flex-1 flex items-center justify-center gap-1 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              <Mic size={16} /> Nói
            </button>
            <button
              onClick={handleParseClick}
              disabled={!voiceText.trim()}
              className="flex-1 flex items-center justify-center gap-1 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              <Send size={16} /> Gửi
            </button>
          </div>

          {step === "listening" && (
            <p className="text-xs text-blue-500 mt-2">
              🎧 Đang nghe giọng nói...
            </p>
          )}
          {step === "parsing" && (
            <p className="text-xs text-gray-500 mt-2">
              🔎 Đang phân tích đơn hàng...
            </p>
          )}
          {step === "done" && orderResult && (
            <div className="mt-2 text-sm text-green-600">
              ✅ {orderResult.message}
            </div>
          )}

          {/* Hiển thị orderInfo */}
          {orderInfo && (
            <div className="mt-2 text-sm text-gray-700">
              🛒 Sản phẩm: {orderInfo.product} - Số lượng: {orderInfo.quantity}{" "}
              - Size: {orderInfo.size}
              <br />
              📍 Giao đến: {orderInfo.address}
            </div>
          )}

          {/* Hiển thị payment method */}
          {step === "confirming" && (
            <p className="text-xs text-purple-600 mt-1">
              💳 Phương thức thanh toán:{" "}
              {paymentMethod === 1 ? "Tiền mặt" : "Chuyển khoản"}
            </p>
          )}

          {/* Subtitle AI đang nói */}
          {aiSpeechText && (
            <div className="mt-4 px-3 py-2 rounded-md bg-yellow-100 text-yellow-800 text-sm border border-yellow-300 animate-pulse">
              🤖 <strong>AI:</strong> {aiSpeechText}
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
