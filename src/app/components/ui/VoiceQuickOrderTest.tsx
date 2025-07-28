// // // "use client";

// // // import { useState, useRef, useEffect } from "react";
// // // import { Bot, Mic, Send } from "lucide-react";
// // // import { motion } from "framer-motion";

// // // // Định nghĩa kiểu dữ liệu
// // // interface OrderInfo {
// // //   product: string;
// // //   quantity: number;
// // //   size: string;
// // //   address: string;
// // // }

// // // interface OrderResult {
// // //   message: string;
// // //   payment_url?: string;
// // // }

// // // type Step = "idle" | "listening" | "parsing" | "confirming" | "done";

// // // export default function VoiceQuickOrderFlexible() {
// // //   const [voiceText, setVoiceText] = useState<string>("");
// // //   const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
// // //   const [orderResult, setOrderResult] = useState<OrderResult | null>(null);
// // //   const [step, setStep] = useState<Step>("idle");
// // //   const [paymentMethod, setPaymentMethod] = useState<1 | 2>(1);
// // //   const recognitionRef = useRef<SpeechRecognition | null>(null);
// // //   const [showWidget, setShowWidget] = useState<boolean>(false);
// // //   const [aiSpeechText, setAiSpeechText] = useState<string>(""); // 👈 subtitle AI nói

// // //   useEffect(() => {
// // //     if (showWidget && step === "idle") {
// // //       speak("Xin chào! Bạn muốn đặt món gì hôm nay?");
// // //     }
// // //   }, [showWidget, step]);

// // //   const speak = (text: string, callback?: () => void) => {
// // //     if ("speechSynthesis" in window) {
// // //       const utter = new SpeechSynthesisUtterance(text);
// // //       utter.lang = "vi-VN";
// // //       setAiSpeechText(text); // 👈 subtitle hiển thị
// // //       utter.onend = () => {
// // //         setAiSpeechText(""); // 👈 ẩn sau khi nói xong
// // //         callback && callback();
// // //       };
// // //       window.speechSynthesis.speak(utter);
// // //     }
// // //   };

// // //   const waitForVoiceConfirm = (): Promise<"yes" | "no"> => {
// // //     return new Promise((resolve) => {
// // //       const recognition = new (window as any).webkitSpeechRecognition();
// // //       recognition.lang = "vi-VN";
// // //       recognition.start();

// // //       recognition.onresult = (event: SpeechRecognitionEvent) => {
// // //         const response = event.results[0][0].transcript.toLowerCase();
// // //         if (response.includes("đồng ý") || response.includes("ok")) {
// // //           resolve("yes");
// // //         } else {
// // //           resolve("no");
// // //         }
// // //       };

// // //       recognition.onerror = () => resolve("no");
// // //     });
// // //   };

// // //   const waitForVoicePaymentMethod = (): Promise<1 | 2> => {
// // //     return new Promise((resolve) => {
// // //       const recognition = new (window as any).webkitSpeechRecognition();
// // //       recognition.lang = "vi-VN";
// // //       recognition.start();

// // //       recognition.onresult = (event: SpeechRecognitionEvent) => {
// // //         const response = event.results[0][0].transcript.toLowerCase();
// // //         if (response.includes("tiền mặt")) {
// // //           resolve(1);
// // //         } else if (response.includes("chuyển khoản")) {
// // //           resolve(2);
// // //         } else {
// // //           resolve(1);
// // //         }
// // //       };

// // //       recognition.onerror = () => resolve(1);
// // //     });
// // //   };

// // //   const startVoice = () => {
// // //     if (!("webkitSpeechRecognition" in window)) {
// // //       alert("Trình duyệt không hỗ trợ voice!");
// // //       return;
// // //     }

// // //     setStep("listening");
// // //     const recognition = new (window as any).webkitSpeechRecognition();
// // //     recognition.lang = "vi-VN";

// // //     recognition.onresult = (event: SpeechRecognitionEvent) => {
// // //       const text = event.results[0][0].transcript;
// // //       setVoiceText(text);
// // //       parseOrder(text);
// // //     };

// // //     recognition.start();
// // //     recognitionRef.current = recognition;
// // //   };

// // //   const parseOrder = async (text: string) => {
// // //     setStep("parsing");
// // //     const token = localStorage.getItem("token");

// // //     const res = await fetch("http://localhost:8000/api/voice-order/parse", {
// // //       method: "POST",
// // //       headers: {
// // //         "Content-Type": "application/json",
// // //         Authorization: `Bearer ${token}`,
// // //       },
// // //       body: JSON.stringify({ text }),
// // //     });

// // //     const data: OrderInfo = await res.json();
// // //     setOrderInfo(data);
// // //     setStep("confirming");

// // //     const confirmText = `Bạn muốn mua ${data.quantity} ${data.product} size ${data.size}, giao về ${data.address}. Nói "Đồng ý" để xác nhận, hoặc "không" để hủy.`;

// // //     speak(confirmText, async () => {
// // //       const result = await waitForVoiceConfirm();
// // //       if (result === "yes") {
// // //         speak(
// // //           'Chọn phương thức thanh toán: "thanh toán bằng tiền mặt" hoặc "chuyển khoản".',
// // //           async () => {
// // //             const method = await waitForVoicePaymentMethod();
// // //             setPaymentMethod(method);
// // //             speak("Xác nhận đặt hàng...");
// // //             await handleQuickOrder(data, method);
// // //           }
// // //         );
// // //       } else {
// // //         speak("Đã huỷ đơn hàng. Vui lòng thử lại.");
// // //         setOrderInfo(null);
// // //         setStep("idle");
// // //       }
// // //     });
// // //   };

// // //   const handleQuickOrder = async (orderData: OrderInfo, method: 1 | 2) => {
// // //     const token = localStorage.getItem("token");
// // //     const payload = {
// // //       ...orderData,
// // //       payment_id: method,
// // //     };

// // //     const res = await fetch("http://localhost:8000/api/voice-order/quick", {
// // //       method: "POST",
// // //       headers: {
// // //         "Content-Type": "application/json",
// // //         Authorization: `Bearer ${token}`,
// // //       },
// // //       body: JSON.stringify(payload),
// // //     });

// // //     const data: OrderResult = await res.json();
// // //     setOrderResult(data);
// // //     setStep("done");

// // //     if (method === 2 && data.payment_url) {
// // //       speak("Đang chuyển đến trang thanh toán VNPAY...");
// // //       window.location.href = data.payment_url;
// // //     } else {
// // //       speak(data.message || "Đặt hàng thành công.");
// // //     }
// // //   };

// // //   return (
// // //     <motion.div
// // //       drag
// // //       dragConstraints={{ left: 0, top: 0, right: 500, bottom: 800 }}
// // //       className="fixed bottom-20 right-4 z-50"
// // //     >
// // //       {!showWidget && (
// // //         <div className="relative flex flex-col items-center group">
// // //           {/* Đám mây lời nhắn chớp từ từ */}
// // //           <motion.div
// // //             initial={{ opacity: 0 }}
// // //             animate={{ opacity: [0, 1, 0] }}
// // //             transition={{
// // //               duration: 3,
// // //               repeat: Infinity,
// // //               ease: "easeInOut",
// // //             }}
// // //             className="mb-3 px-4 py-1 bg-white text-purple-600 text-sm font-semibold rounded-full border border-purple-300 shadow-md backdrop-blur-md"
// // //           >
// // //             🛒 Mua hàng nhanh - nhấn tui đi!
// // //           </motion.div>

// // //           {/* Nút tròn AI */}
// // //           <motion.button
// // //             whileHover={{ scale: 1.08 }}
// // //             whileTap={{ scale: 0.95 }}
// // //             onClick={() => setShowWidget(true)}
// // //             className="rounded-full p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white shadow-2xl transition-all duration-300"
// // //           >
// // //             <motion.div
// // //               animate={{
// // //                 scale: [1, 1.05, 1],
// // //                 boxShadow: [
// // //                   "0 0 0px rgba(255, 255, 255, 0.6)",
// // //                   "0 0 20px rgba(255, 255, 255, 0.9)",
// // //                   "0 0 0px rgba(255, 255, 255, 0.6)",
// // //                 ],
// // //               }}
// // //               transition={{
// // //                 duration: 4,
// // //                 repeat: Infinity,
// // //                 ease: "easeInOut",
// // //               }}
// // //             >
// // //               <Bot size={24} />
// // //             </motion.div>
// // //           </motion.button>
// // //         </div>
// // //       )}

// // //       {showWidget && (
// // //         <motion.div
// // //           initial={{ opacity: 0, scale: 0.95 }}
// // //           animate={{ opacity: 1, scale: 1 }}
// // //           exit={{ opacity: 0, scale: 0.95 }}
// // //           className="bg-white shadow-2xl rounded-2xl w-80 p-4"
// // //         >
// // //           <div className="flex justify-between items-center mb-4">
// // //             <h3 className="text-lg font-bold">🤖 DREAMS</h3>
// // //             <button
// // //               onClick={() => setShowWidget(false)}
// // //               className="text-gray-400 hover:text-gray-600"
// // //             >
// // //               ✕
// // //             </button>
// // //           </div>

// // //           <textarea
// // //             className="w-full rounded-md border border-gray-300 p-2 text-sm mb-2"
// // //             rows={3}
// // //             placeholder="Nói hoặc nhập nội dung đặt hàng..."
// // //             value={voiceText}
// // //             onChange={(e) => setVoiceText(e.target.value)}
// // //           />

// // //           <div className="flex gap-2">
// // //             <button
// // //               onClick={startVoice}
// // //               className="flex-1 flex items-center justify-center gap-1 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
// // //             >
// // //               <Mic size={16} /> Nói
// // //             </button>
// // //             <button
// // //               onClick={() => parseOrder(voiceText)}
// // //               disabled={!voiceText.trim()}
// // //               className="flex-1 flex items-center justify-center gap-1 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
// // //             >
// // //               <Send size={16} /> Gửi
// // //             </button>
// // //           </div>

// // //           {step === "listening" && (
// // //             <p className="text-xs text-blue-500 mt-2">
// // //               🎧 Đang nghe giọng nói...
// // //             </p>
// // //           )}
// // //           {step === "parsing" && (
// // //             <p className="text-xs text-gray-500 mt-2">
// // //               🔎 Đang phân tích đơn hàng...
// // //             </p>
// // //           )}
// // //           {step === "done" && orderResult && (
// // //             <div className="mt-2 text-sm text-green-600">
// // //               ✅ {orderResult.message}
// // //             </div>
// // //           )}

// // //           {/* 👇 Subtitle AI đang nói */}
// // //           {aiSpeechText && (
// // //             <div className="mt-4 px-3 py-2 rounded-md bg-yellow-100 text-yellow-800 text-sm border border-yellow-300 animate-pulse">
// // //               🤖 <strong>AI:</strong> {aiSpeechText}
// // //             </div>
// // //           )}
// // //         </motion.div>
// // //       )}
// // //     </motion.div>
// // //   );
// // // }

// // "use client";

// // import { useState, useRef, useEffect } from "react";
// // import { Bot, Mic, Send } from "lucide-react";
// // import { motion } from "framer-motion";

// // // 👇 Fix lỗi no-explicit-any

// // declare global {
// //   interface Window {
// //     webkitSpeechRecognition: any;
// //   }

// //   interface SpeechRecognitionEvent extends Event {
// //     results: SpeechRecognitionResultList;
// //   }
// // }
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
// //       setAiSpeechText(text);
// //       utter.onend = () => {
// //         setAiSpeechText("");
// //         if (callback) callback();
// //       };
// //       window.speechSynthesis.speak(utter);
// //     }
// //   };

// //   const waitForVoiceConfirm = (): Promise<"yes" | "no"> => {
// //     return new Promise((resolve) => {
// //       const recognition = new window.webkitSpeechRecognition();
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
// //       const recognition = new window.webkitSpeechRecognition();
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
// //     const recognition = new window.webkitSpeechRecognition();
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

// //           {/* 👇 Hiển thị orderInfo */}
// //           {orderInfo && (
// //             <div className="mt-2 text-sm text-gray-700">
// //               🛒 Sản phẩm: {orderInfo.product} - Số lượng: {orderInfo.quantity}{" "}
// //               - Size: {orderInfo.size}
// //               <br />
// //               📍 Giao đến: {orderInfo.address}
// //             </div>
// //           )}

// //           {/* 👇 Hiển thị payment method */}
// //           {step === "confirming" && (
// //             <p className="text-xs text-purple-600 mt-1">
// //               💳 Phương thức thanh toán:{" "}
// //               {paymentMethod === 1 ? "Tiền mặt" : "Chuyển khoản"}
// //             </p>
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

// // TypeScript interfaces for Speech Recognition
// interface SpeechRecognition extends EventTarget {
//   continuous: boolean;
//   interimResults: boolean;
//   lang: string;
//   start(): void;
//   stop(): void;
//   abort(): void;
//   onresult:
//     | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void)
//     | null;
//   onerror:
//     | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void)
//     | null;
//   onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
//   onend: ((this: SpeechRecognition, ev: Event) => void) | null;
// }

// interface SpeechRecognitionStatic {
//   new (): SpeechRecognition;
// }

// interface SpeechRecognitionEvent extends Event {
//   readonly resultIndex: number;
//   readonly results: SpeechRecognitionResultList;
// }

// interface SpeechRecognitionErrorEvent extends Event {
//   readonly error: string;
//   readonly message: string;
// }

// interface SpeechRecognitionResultList {
//   readonly length: number;
//   item(index: number): SpeechRecognitionResult;
//   [index: number]: SpeechRecognitionResult;
// }

// interface SpeechRecognitionResult {
//   readonly length: number;
//   readonly isFinal: boolean;
//   item(index: number): SpeechRecognitionAlternative;
//   [index: number]: SpeechRecognitionAlternative;
// }

// interface SpeechRecognitionAlternative {
//   readonly transcript: string;
//   readonly confidence: number;
// }

// declare global {
//   interface Window {
//     webkitSpeechRecognition: SpeechRecognitionStatic;
//     SpeechRecognition: SpeechRecognitionStatic;
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
//   const [aiSpeechText, setAiSpeechText] = useState<string>(""); // subtitle AI nói

//   useEffect(() => {
//     if (showWidget && step === "idle") {
//       speak("Xin chào! Bạn muốn đặt món gì hôm nay?");
//     }
//   }, [showWidget, step]);

//   const speak = (text: string, callback?: () => void): void => {
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
//       const SpeechRecognitionConstructor =
//         window.webkitSpeechRecognition || window.SpeechRecognition;
//       if (!SpeechRecognitionConstructor) {
//         resolve("no");
//         return;
//       }

//       const recognition = new SpeechRecognitionConstructor();
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
//       const SpeechRecognitionConstructor =
//         window.webkitSpeechRecognition || window.SpeechRecognition;
//       if (!SpeechRecognitionConstructor) {
//         resolve(1);
//         return;
//       }

//       const recognition = new SpeechRecognitionConstructor();
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

//   const startVoice = (): void => {
//     const SpeechRecognitionConstructor =
//       window.webkitSpeechRecognition || window.SpeechRecognition;
//     if (!SpeechRecognitionConstructor) {
//       alert("Trình duyệt không hỗ trợ voice!");
//       return;
//     }

//     setStep("listening");
//     const recognition = new SpeechRecognitionConstructor();
//     recognition.lang = "vi-VN";

//     recognition.onresult = (event: SpeechRecognitionEvent) => {
//       const text = event.results[0][0].transcript;
//       setVoiceText(text);
//       parseOrder(text);
//     };

//     recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
//       console.error("Speech recognition error:", event.error);
//       setStep("idle");
//     };

//     recognition.start();
//     recognitionRef.current = recognition;
//   };

//   const parseOrder = async (text: string): Promise<void> => {
//     setStep("parsing");
//     const token = localStorage.getItem("token");

//     try {
//       const res = await fetch("http://localhost:8000/api/voice-order/parse", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token && { Authorization: `Bearer ${token}` }),
//         },
//         body: JSON.stringify({ text }),
//       });

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data: OrderInfo = await res.json();
//       setOrderInfo(data);
//       setStep("confirming");

//       const confirmText = `Bạn muốn mua ${data.quantity} ${data.product} size ${data.size}, giao về ${data.address}. Nói "Đồng ý" để xác nhận, hoặc "không" để hủy.`;

//       speak(confirmText, async () => {
//         const result = await waitForVoiceConfirm();
//         if (result === "yes") {
//           speak(
//             'Chọn phương thức thanh toán: "thanh toán bằng tiền mặt" hoặc "chuyển khoản".',
//             async () => {
//               const method = await waitForVoicePaymentMethod();
//               setPaymentMethod(method);
//               speak("Xác nhận đặt hàng...");
//               await handleQuickOrder(data, method);
//             }
//           );
//         } else {
//           speak("Đã huỷ đơn hàng. Vui lòng thử lại.");
//           setOrderInfo(null);
//           setStep("idle");
//         }
//       });
//     } catch (error) {
//       console.error("Error parsing order:", error);
//       speak("Có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại.");
//       setStep("idle");
//     }
//   };

//   const handleQuickOrder = async (
//     orderData: OrderInfo,
//     method: 1 | 2
//   ): Promise<void> => {
//     const token = localStorage.getItem("token");
//     const payload = {
//       ...orderData,
//       payment_id: method,
//     };

//     try {
//       const res = await fetch("http://localhost:8000/api/voice-order/quick", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token && { Authorization: `Bearer ${token}` }),
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data: OrderResult = await res.json();
//       setOrderResult(data);
//       setStep("done");

//       if (method === 2 && data.payment_url) {
//         speak("Đang chuyển đến trang thanh toán VNPAY...");
//         window.location.href = data.payment_url;
//       } else {
//         speak(data.message || "Đặt hàng thành công.");
//       }
//     } catch (error) {
//       console.error("Error processing order:", error);
//       speak("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.");
//       setStep("idle");
//     }
//   };

//   const handleTextChange = (
//     e: React.ChangeEvent<HTMLTextAreaElement>
//   ): void => {
//     setVoiceText(e.target.value);
//   };

//   const handleParseClick = (): void => {
//     if (voiceText.trim()) {
//       parseOrder(voiceText);
//     }
//   };

//   const handleCloseWidget = (): void => {
//     setShowWidget(false);
//     setStep("idle");
//     setVoiceText("");
//     setOrderInfo(null);
//     setOrderResult(null);
//     setAiSpeechText("");
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
//               onClick={handleCloseWidget}
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
//             onChange={handleTextChange}
//           />

//           <div className="flex gap-2">
//             <button
//               onClick={startVoice}
//               className="flex-1 flex items-center justify-center gap-1 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
//             >
//               <Mic size={16} /> Nói
//             </button>
//             <button
//               onClick={handleParseClick}
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

//           {/* Hiển thị orderInfo */}
//           {orderInfo && (
//             <div className="mt-2 text-sm text-gray-700">
//               🛒 Sản phẩm: {orderInfo.product} - Số lượng: {orderInfo.quantity}{" "}
//               - Size: {orderInfo.size}
//               <br />
//               📍 Giao đến: {orderInfo.address}
//             </div>
//           )}

//           {/* Hiển thị payment method */}
//           {step === "confirming" && (
//             <p className="text-xs text-purple-600 mt-1">
//               💳 Phương thức thanh toán:{" "}
//               {paymentMethod === 1 ? "Tiền mặt" : "Chuyển khoản"}
//             </p>
//           )}

//           {/* Subtitle AI đang nói */}
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
import {
  Bot,
  Mic,
  Send,
  ShoppingCart,
  Check,
  X,
  Volume2,
  VolumeX,
} from "lucide-react";

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

export default function EnhancedVoiceOrderWidget() {
  const [voiceText, setVoiceText] = useState<string>("");
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null);
  const [step, setStep] = useState<Step>("idle");
  const [paymentMethod, setPaymentMethod] = useState<1 | 2>(1);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [showWidget, setShowWidget] = useState<boolean>(false);
  const [aiSpeechText, setAiSpeechText] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  useEffect(() => {
    if (showWidget && step === "idle") {
      speak("Xin chào! Bạn muốn đặt món gì hôm nay?");
    }
  }, [showWidget, step]);

  const speak = (text: string, callback?: () => void): void => {
    if ("speechSynthesis" in window && soundEnabled) {
      setIsSpeaking(true);
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "vi-VN";
      utter.rate = 0.9;
      utter.pitch = 1.1;
      setAiSpeechText(text);
      utter.onend = () => {
        setAiSpeechText("");
        setIsSpeaking(false);
        if (callback) callback();
      };
      window.speechSynthesis.speak(utter);
    } else {
      setAiSpeechText(text);
      setTimeout(() => {
        setAiSpeechText("");
        if (callback) callback();
      }, 2000);
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
      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const response = event.results[0][0].transcript.toLowerCase();
        setIsListening(false);
        if (
          response.includes("đồng ý") ||
          response.includes("ok") ||
          response.includes("được")
        ) {
          resolve("yes");
        } else {
          resolve("no");
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
        resolve("no");
      };

      recognition.onend = () => {
        setIsListening(false);
      };
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
      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const response = event.results[0][0].transcript.toLowerCase();
        setIsListening(false);
        if (response.includes("chuyển khoản") || response.includes("vnpay")) {
          resolve(2);
        } else {
          resolve(1);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
        resolve(1);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
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
    setIsListening(true);
    const recognition = new SpeechRecognitionConstructor();
    recognition.lang = "vi-VN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const text = event.results[0][0].transcript;
      setVoiceText(text);
      setIsListening(false);
      parseOrder(text);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      setStep("idle");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const parseOrder = async (text: string): Promise<void> => {
    setStep("parsing");

    // Simulate API call with demo data
    setTimeout(async () => {
      try {
        // Demo parsing logic
        const demoData: OrderInfo = {
          product: "Bánh mì thịt",
          quantity: 2,
          size: "L",
          address: "123 Nguyễn Văn Linh, Q7",
        };

        setOrderInfo(demoData);
        setStep("confirming");

        const confirmText = `Bạn muốn mua ${demoData.quantity} ${demoData.product} size ${demoData.size}, giao về ${demoData.address}. Nói "Đồng ý" để xác nhận, hoặc "không" để hủy.`;

        speak(confirmText, async () => {
          const result = await waitForVoiceConfirm();
          if (result === "yes") {
            speak(
              'Chọn phương thức thanh toán: "thanh toán bằng tiền mặt" hoặc "chuyển khoản".',
              async () => {
                const method = await waitForVoicePaymentMethod();
                setPaymentMethod(method);
                speak("Xác nhận đặt hàng...");
                await handleQuickOrder(demoData, method);
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
    }, 1500);
  };

  const handleQuickOrder = async (
    orderData: OrderInfo,
    method: 1 | 2
  ): Promise<void> => {
    // Simulate order processing
    setTimeout(() => {
      const demoResult: OrderResult = {
        message: "Đặt hàng thành công! Đơn hàng sẽ được giao trong 30 phút.",
        payment_url: method === 2 ? "https://vnpay.demo.com" : undefined,
      };

      setOrderResult(demoResult);
      setStep("done");

      if (method === 2 && demoResult.payment_url) {
        speak("Đặt hàng thành công! Chuyển đến trang thanh toán...");
      } else {
        speak(demoResult.message || "Đặt hàng thành công.");
      }
    }, 2000);
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
    setIsListening(false);
    setIsSpeaking(false);
  };

  const getStepIcon = () => {
    switch (step) {
      case "listening":
        return <Mic className="w-4 h-4 text-blue-500 animate-pulse" />;
      case "parsing":
        return <Bot className="w-4 h-4 text-purple-500 animate-spin" />;
      case "confirming":
        return (
          <ShoppingCart className="w-4 h-4 text-orange-500 animate-bounce" />
        );
      case "done":
        return <Check className="w-4 h-4 text-green-500" />;
      default:
        return <Bot className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStepText = () => {
    switch (step) {
      case "listening":
        return "Đang nghe...";
      case "parsing":
        return "Đang phân tích...";
      case "confirming":
        return "Chờ xác nhận...";
      case "done":
        return "Hoàn thành!";
      default:
        return "Sẵn sàng";
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!showWidget && (
        <div className="relative flex flex-col items-center group">
          {/* Welcome bubble */}
          <div className="mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
            <div className="relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-2xl shadow-xl backdrop-blur-sm">
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-600"></div>
              🛒 Đặt hàng bằng giọng nói - Nhấn để bắt đầu!
            </div>
          </div>

          {/* Main floating button */}
          <button
            onClick={() => setShowWidget(true)}
            className="relative group/btn"
          >
            {/* Animated rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse opacity-75"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-ping opacity-50"></div>

            {/* Main button */}
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-purple-500/25 flex items-center justify-center group-hover/btn:rotate-12">
              <Bot
                size={28}
                className="transform transition-transform duration-300 group-hover/btn:scale-110"
              />
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover/btn:opacity-30 blur-xl transition-opacity duration-300"></div>
          </button>
        </div>
      )}

      {showWidget && (
        <div className="w-96 bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20 overflow-hidden transition-all duration-500 animate-in slide-in-from-bottom-5 fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">DREAMS AI</h3>
                  <p className="text-xs opacity-90">Voice Shopping Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                <button
                  onClick={handleCloseWidget}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div className="px-4 py-3 bg-gray-50/80 border-b border-gray-200/50">
            <div className="flex items-center gap-2 text-sm">
              {getStepIcon()}
              <span className="font-medium text-gray-700">{getStepText()}</span>
              {isListening && (
                <div className="flex gap-1 ml-auto">
                  <div className="w-1 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                  <div
                    className="w-1 h-4 bg-blue-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-1 h-4 bg-blue-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 space-y-4">
            {/* Text input */}
            <div className="relative">
              <textarea
                className="w-full rounded-2xl border-2 border-gray-200 focus:border-purple-400 p-4 text-sm transition-all duration-200 resize-none bg-gray-50/50 focus:bg-white"
                rows={3}
                placeholder="Nói hoặc nhập nội dung đặt hàng... (VD: 'Tôi muốn 2 áo Bomber Overlock Jacket size M giao về 123 Nguyễn Trãi ')"
                value={voiceText}
                onChange={handleTextChange}
              />
              {voiceText && (
                <button
                  onClick={() => setVoiceText("")}
                  className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={startVoice}
                disabled={isListening || step === "parsing"}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-2xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-blue-500/25 font-medium"
              >
                <Mic size={18} className={isListening ? "animate-pulse" : ""} />
                {isListening ? "Đang nghe..." : "Bắt đầu nói"}
              </button>
              <button
                onClick={handleParseClick}
                disabled={!voiceText.trim() || step === "parsing"}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white p-3 rounded-2xl hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-green-500/25 font-medium"
              >
                <Send size={18} />
                Gửi đơn
              </button>
            </div>

            {/* Order info display */}
            {orderInfo && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-4 space-y-2 animate-in slide-in-from-top-2 fade-in">
                <div className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
                  <ShoppingCart size={16} />
                  Chi tiết đơn hàng
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">Sản phẩm:</span>
                    <div className="font-medium text-gray-800">
                      {orderInfo.product}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Số lượng:</span>
                    <div className="font-medium text-gray-800">
                      {orderInfo.quantity}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Size:</span>
                    <div className="font-medium text-gray-800">
                      {orderInfo.size}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Thanh toán:</span>
                    <div className="font-medium text-gray-800">
                      {paymentMethod === 1 ? "Tiền mặt" : "Chuyển khoản"}
                    </div>
                  </div>
                </div>
                <div className="col-span-2 pt-2 border-t border-blue-200">
                  <span className="text-gray-600">Địa chỉ giao:</span>
                  <div className="font-medium text-gray-800">
                    {orderInfo.address}
                  </div>
                </div>
              </div>
            )}

            {/* Success message */}
            {step === "done" && orderResult && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 animate-in slide-in-from-bottom-2 fade-in">
                <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                  <Check size={16} />
                  Đặt hàng thành công!
                </div>
                <p className="text-green-800 text-sm">{orderResult.message}</p>
              </div>
            )}

            {/* AI Speech display */}
            {aiSpeechText && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-4 animate-in slide-in-from-left-2 fade-in">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-orange-600 font-medium mb-1">
                      AI Assistant
                    </div>
                    <p className="text-orange-800 text-sm leading-relaxed">
                      {aiSpeechText}
                    </p>
                  </div>
                  {isSpeaking && (
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                      <div
                        className="w-1 h-4 bg-orange-500 rounded-full animate-pulse"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-1 h-2 bg-orange-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
