// // // // // "use client";

// // // // // import { useState, useRef, useEffect } from "react";
// // // // // import { Bot, Mic, Send } from "lucide-react";
// // // // // import { motion } from "framer-motion";

// // // // // // Định nghĩa kiểu dữ liệu
// // // // // interface OrderInfo {
// // // // //   product: string;
// // // // //   quantity: number;
// // // // //   size: string;
// // // // //   address: string;
// // // // // }

// // // // // interface OrderResult {
// // // // //   message: string;
// // // // //   payment_url?: string;
// // // // // }

// // // // // type Step = "idle" | "listening" | "parsing" | "confirming" | "done";

// // // // // export default function VoiceQuickOrderFlexible() {
// // // // //   const [voiceText, setVoiceText] = useState<string>("");
// // // // //   const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
// // // // //   const [orderResult, setOrderResult] = useState<OrderResult | null>(null);
// // // // //   const [step, setStep] = useState<Step>("idle");
// // // // //   const [paymentMethod, setPaymentMethod] = useState<1 | 2>(1);
// // // // //   const recognitionRef = useRef<SpeechRecognition | null>(null);
// // // // //   const [showWidget, setShowWidget] = useState<boolean>(false);
// // // // //   const [aiSpeechText, setAiSpeechText] = useState<string>(""); // 👈 subtitle AI nói

// // // // //   useEffect(() => {
// // // // //     if (showWidget && step === "idle") {
// // // // //       speak("Xin chào! Bạn muốn đặt món gì hôm nay?");
// // // // //     }
// // // // //   }, [showWidget, step]);

// // // // //   const speak = (text: string, callback?: () => void) => {
// // // // //     if ("speechSynthesis" in window) {
// // // // //       const utter = new SpeechSynthesisUtterance(text);
// // // // //       utter.lang = "vi-VN";
// // // // //       setAiSpeechText(text); // 👈 subtitle hiển thị
// // // // //       utter.onend = () => {
// // // // //         setAiSpeechText(""); // 👈 ẩn sau khi nói xong
// // // // //         callback && callback();
// // // // //       };
// // // // //       window.speechSynthesis.speak(utter);
// // // // //     }
// // // // //   };

// // // // //   const waitForVoiceConfirm = (): Promise<"yes" | "no"> => {
// // // // //     return new Promise((resolve) => {
// // // // //       const recognition = new (window as any).webkitSpeechRecognition();
// // // // //       recognition.lang = "vi-VN";
// // // // //       recognition.start();

// // // // //       recognition.onresult = (event: SpeechRecognitionEvent) => {
// // // // //         const response = event.results[0][0].transcript.toLowerCase();
// // // // //         if (response.includes("đồng ý") || response.includes("ok")) {
// // // // //           resolve("yes");
// // // // //         } else {
// // // // //           resolve("no");
// // // // //         }
// // // // //       };

// // // // //       recognition.onerror = () => resolve("no");
// // // // //     });
// // // // //   };

// // // // //   const waitForVoicePaymentMethod = (): Promise<1 | 2> => {
// // // // //     return new Promise((resolve) => {
// // // // //       const recognition = new (window as any).webkitSpeechRecognition();
// // // // //       recognition.lang = "vi-VN";
// // // // //       recognition.start();

// // // // //       recognition.onresult = (event: SpeechRecognitionEvent) => {
// // // // //         const response = event.results[0][0].transcript.toLowerCase();
// // // // //         if (response.includes("tiền mặt")) {
// // // // //           resolve(1);
// // // // //         } else if (response.includes("chuyển khoản")) {
// // // // //           resolve(2);
// // // // //         } else {
// // // // //           resolve(1);
// // // // //         }
// // // // //       };

// // // // //       recognition.onerror = () => resolve(1);
// // // // //     });
// // // // //   };

// // // // //   const startVoice = () => {
// // // // //     if (!("webkitSpeechRecognition" in window)) {
// // // // //       alert("Trình duyệt không hỗ trợ voice!");
// // // // //       return;
// // // // //     }

// // // // //     setStep("listening");
// // // // //     const recognition = new (window as any).webkitSpeechRecognition();
// // // // //     recognition.lang = "vi-VN";

// // // // //     recognition.onresult = (event: SpeechRecognitionEvent) => {
// // // // //       const text = event.results[0][0].transcript;
// // // // //       setVoiceText(text);
// // // // //       parseOrder(text);
// // // // //     };

// // // // //     recognition.start();
// // // // //     recognitionRef.current = recognition;
// // // // //   };

// // // // //   const parseOrder = async (text: string) => {
// // // // //     setStep("parsing");
// // // // //     const token = localStorage.getItem("token");

// // // // //     const res = await fetch("http://localhost:8000/api/voice-order/parse", {
// // // // //       method: "POST",
// // // // //       headers: {
// // // // //         "Content-Type": "application/json",
// // // // //         Authorization: `Bearer ${token}`,
// // // // //       },
// // // // //       body: JSON.stringify({ text }),
// // // // //     });

// // // // //     const data: OrderInfo = await res.json();
// // // // //     setOrderInfo(data);
// // // // //     setStep("confirming");

// // // // //     const confirmText = `Bạn muốn mua ${data.quantity} ${data.product} size ${data.size}, giao về ${data.address}. Nói "Đồng ý" để xác nhận, hoặc "không" để hủy.`;

// // // // //     speak(confirmText, async () => {
// // // // //       const result = await waitForVoiceConfirm();
// // // // //       if (result === "yes") {
// // // // //         speak(
// // // // //           'Chọn phương thức thanh toán: "thanh toán bằng tiền mặt" hoặc "chuyển khoản".',
// // // // //           async () => {
// // // // //             const method = await waitForVoicePaymentMethod();
// // // // //             setPaymentMethod(method);
// // // // //             speak("Xác nhận đặt hàng...");
// // // // //             await handleQuickOrder(data, method);
// // // // //           }
// // // // //         );
// // // // //       } else {
// // // // //         speak("Đã huỷ đơn hàng. Vui lòng thử lại.");
// // // // //         setOrderInfo(null);
// // // // //         setStep("idle");
// // // // //       }
// // // // //     });
// // // // //   };

// // // // //   const handleQuickOrder = async (orderData: OrderInfo, method: 1 | 2) => {
// // // // //     const token = localStorage.getItem("token");
// // // // //     const payload = {
// // // // //       ...orderData,
// // // // //       payment_id: method,
// // // // //     };

// // // // //     const res = await fetch("http://localhost:8000/api/voice-order/quick", {
// // // // //       method: "POST",
// // // // //       headers: {
// // // // //         "Content-Type": "application/json",
// // // // //         Authorization: `Bearer ${token}`,
// // // // //       },
// // // // //       body: JSON.stringify(payload),
// // // // //     });

// // // // //     const data: OrderResult = await res.json();
// // // // //     setOrderResult(data);
// // // // //     setStep("done");

// // // // //     if (method === 2 && data.payment_url) {
// // // // //       speak("Đang chuyển đến trang thanh toán VNPAY...");
// // // // //       window.location.href = data.payment_url;
// // // // //     } else {
// // // // //       speak(data.message || "Đặt hàng thành công.");
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <motion.div
// // // // //       drag
// // // // //       dragConstraints={{ left: 0, top: 0, right: 500, bottom: 800 }}
// // // // //       className="fixed bottom-20 right-4 z-50"
// // // // //     >
// // // // //       {!showWidget && (
// // // // //         <div className="relative flex flex-col items-center group">
// // // // //           {/* Đám mây lời nhắn chớp từ từ */}
// // // // //           <motion.div
// // // // //             initial={{ opacity: 0 }}
// // // // //             animate={{ opacity: [0, 1, 0] }}
// // // // //             transition={{
// // // // //               duration: 3,
// // // // //               repeat: Infinity,
// // // // //               ease: "easeInOut",
// // // // //             }}
// // // // //             className="mb-3 px-4 py-1 bg-white text-purple-600 text-sm font-semibold rounded-full border border-purple-300 shadow-md backdrop-blur-md"
// // // // //           >
// // // // //             🛒 Mua hàng nhanh - nhấn tui đi!
// // // // //           </motion.div>

// // // // //           {/* Nút tròn AI */}
// // // // //           <motion.button
// // // // //             whileHover={{ scale: 1.08 }}
// // // // //             whileTap={{ scale: 0.95 }}
// // // // //             onClick={() => setShowWidget(true)}
// // // // //             className="rounded-full p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white shadow-2xl transition-all duration-300"
// // // // //           >
// // // // //             <motion.div
// // // // //               animate={{
// // // // //                 scale: [1, 1.05, 1],
// // // // //                 boxShadow: [
// // // // //                   "0 0 0px rgba(255, 255, 255, 0.6)",
// // // // //                   "0 0 20px rgba(255, 255, 255, 0.9)",
// // // // //                   "0 0 0px rgba(255, 255, 255, 0.6)",
// // // // //                 ],
// // // // //               }}
// // // // //               transition={{
// // // // //                 duration: 4,
// // // // //                 repeat: Infinity,
// // // // //                 ease: "easeInOut",
// // // // //               }}
// // // // //             >
// // // // //               <Bot size={24} />
// // // // //             </motion.div>
// // // // //           </motion.button>
// // // // //         </div>
// // // // //       )}

// // // // //       {showWidget && (
// // // // //         <motion.div
// // // // //           initial={{ opacity: 0, scale: 0.95 }}
// // // // //           animate={{ opacity: 1, scale: 1 }}
// // // // //           exit={{ opacity: 0, scale: 0.95 }}
// // // // //           className="bg-white shadow-2xl rounded-2xl w-80 p-4"
// // // // //         >
// // // // //           <div className="flex justify-between items-center mb-4">
// // // // //             <h3 className="text-lg font-bold">🤖 DREAMS</h3>
// // // // //             <button
// // // // //               onClick={() => setShowWidget(false)}
// // // // //               className="text-gray-400 hover:text-gray-600"
// // // // //             >
// // // // //               ✕
// // // // //             </button>
// // // // //           </div>

// // // // //           <textarea
// // // // //             className="w-full rounded-md border border-gray-300 p-2 text-sm mb-2"
// // // // //             rows={3}
// // // // //             placeholder="Nói hoặc nhập nội dung đặt hàng..."
// // // // //             value={voiceText}
// // // // //             onChange={(e) => setVoiceText(e.target.value)}
// // // // //           />

// // // // //           <div className="flex gap-2">
// // // // //             <button
// // // // //               onClick={startVoice}
// // // // //               className="flex-1 flex items-center justify-center gap-1 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
// // // // //             >
// // // // //               <Mic size={16} /> Nói
// // // // //             </button>
// // // // //             <button
// // // // //               onClick={() => parseOrder(voiceText)}
// // // // //               disabled={!voiceText.trim()}
// // // // //               className="flex-1 flex items-center justify-center gap-1 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
// // // // //             >
// // // // //               <Send size={16} /> Gửi
// // // // //             </button>
// // // // //           </div>

// // // // //           {step === "listening" && (
// // // // //             <p className="text-xs text-blue-500 mt-2">
// // // // //               🎧 Đang nghe giọng nói...
// // // // //             </p>
// // // // //           )}
// // // // //           {step === "parsing" && (
// // // // //             <p className="text-xs text-gray-500 mt-2">
// // // // //               🔎 Đang phân tích đơn hàng...
// // // // //             </p>
// // // // //           )}
// // // // //           {step === "done" && orderResult && (
// // // // //             <div className="mt-2 text-sm text-green-600">
// // // // //               ✅ {orderResult.message}
// // // // //             </div>
// // // // //           )}

// // // // //           {/* 👇 Subtitle AI đang nói */}
// // // // //           {aiSpeechText && (
// // // // //             <div className="mt-4 px-3 py-2 rounded-md bg-yellow-100 text-yellow-800 text-sm border border-yellow-300 animate-pulse">
// // // // //               🤖 <strong>AI:</strong> {aiSpeechText}
// // // // //             </div>
// // // // //           )}
// // // // //         </motion.div>
// // // // //       )}
// // // // //     </motion.div>
// // // // //   );
// // // // // }

// // // // "use client";

// // // // import { useState, useRef, useEffect } from "react";
// // // // import { Bot, Mic, Send } from "lucide-react";
// // // // import { motion } from "framer-motion";

// // // // // 👇 Fix lỗi no-explicit-any

// // // // declare global {
// // // //   interface Window {
// // // //     webkitSpeechRecognition: any;
// // // //   }

// // // //   interface SpeechRecognitionEvent extends Event {
// // // //     results: SpeechRecognitionResultList;
// // // //   }
// // // // }
// // // // // Định nghĩa kiểu dữ liệu
// // // // interface OrderInfo {
// // // //   product: string;
// // // //   quantity: number;
// // // //   size: string;
// // // //   address: string;
// // // // }

// // // // interface OrderResult {
// // // //   message: string;
// // // //   payment_url?: string;
// // // // }

// // // // type Step = "idle" | "listening" | "parsing" | "confirming" | "done";

// // // // export default function VoiceQuickOrderFlexible() {
// // // //   const [voiceText, setVoiceText] = useState<string>("");
// // // //   const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
// // // //   const [orderResult, setOrderResult] = useState<OrderResult | null>(null);
// // // //   const [step, setStep] = useState<Step>("idle");
// // // //   const [paymentMethod, setPaymentMethod] = useState<1 | 2>(1);
// // // //   const recognitionRef = useRef<SpeechRecognition | null>(null);
// // // //   const [showWidget, setShowWidget] = useState<boolean>(false);
// // // //   const [aiSpeechText, setAiSpeechText] = useState<string>(""); // 👈 subtitle AI nói

// // // //   useEffect(() => {
// // // //     if (showWidget && step === "idle") {
// // // //       speak("Xin chào! Bạn muốn đặt món gì hôm nay?");
// // // //     }
// // // //   }, [showWidget, step]);

// // // //   const speak = (text: string, callback?: () => void) => {
// // // //     if ("speechSynthesis" in window) {
// // // //       const utter = new SpeechSynthesisUtterance(text);
// // // //       utter.lang = "vi-VN";
// // // //       setAiSpeechText(text);
// // // //       utter.onend = () => {
// // // //         setAiSpeechText("");
// // // //         if (callback) callback();
// // // //       };
// // // //       window.speechSynthesis.speak(utter);
// // // //     }
// // // //   };

// // // //   const waitForVoiceConfirm = (): Promise<"yes" | "no"> => {
// // // //     return new Promise((resolve) => {
// // // //       const recognition = new window.webkitSpeechRecognition();
// // // //       recognition.lang = "vi-VN";
// // // //       recognition.start();

// // // //       recognition.onresult = (event: SpeechRecognitionEvent) => {
// // // //         const response = event.results[0][0].transcript.toLowerCase();
// // // //         if (response.includes("đồng ý") || response.includes("ok")) {
// // // //           resolve("yes");
// // // //         } else {
// // // //           resolve("no");
// // // //         }
// // // //       };

// // // //       recognition.onerror = () => resolve("no");
// // // //     });
// // // //   };

// // // //   const waitForVoicePaymentMethod = (): Promise<1 | 2> => {
// // // //     return new Promise((resolve) => {
// // // //       const recognition = new window.webkitSpeechRecognition();
// // // //       recognition.lang = "vi-VN";
// // // //       recognition.start();

// // // //       recognition.onresult = (event: SpeechRecognitionEvent) => {
// // // //         const response = event.results[0][0].transcript.toLowerCase();
// // // //         if (response.includes("tiền mặt")) {
// // // //           resolve(1);
// // // //         } else if (response.includes("chuyển khoản")) {
// // // //           resolve(2);
// // // //         } else {
// // // //           resolve(1);
// // // //         }
// // // //       };

// // // //       recognition.onerror = () => resolve(1);
// // // //     });
// // // //   };

// // // //   const startVoice = () => {
// // // //     if (!("webkitSpeechRecognition" in window)) {
// // // //       alert("Trình duyệt không hỗ trợ voice!");
// // // //       return;
// // // //     }

// // // //     setStep("listening");
// // // //     const recognition = new window.webkitSpeechRecognition();
// // // //     recognition.lang = "vi-VN";

// // // //     recognition.onresult = (event: SpeechRecognitionEvent) => {
// // // //       const text = event.results[0][0].transcript;
// // // //       setVoiceText(text);
// // // //       parseOrder(text);
// // // //     };

// // // //     recognition.start();
// // // //     recognitionRef.current = recognition;
// // // //   };

// // // //   const parseOrder = async (text: string) => {
// // // //     setStep("parsing");
// // // //     const token = localStorage.getItem("token");

// // // //     const res = await fetch("http://localhost:8000/api/voice-order/parse", {
// // // //       method: "POST",
// // // //       headers: {
// // // //         "Content-Type": "application/json",
// // // //         Authorization: `Bearer ${token}`,
// // // //       },
// // // //       body: JSON.stringify({ text }),
// // // //     });

// // // //     const data: OrderInfo = await res.json();
// // // //     setOrderInfo(data);
// // // //     setStep("confirming");

// // // //     const confirmText = `Bạn muốn mua ${data.quantity} ${data.product} size ${data.size}, giao về ${data.address}. Nói "Đồng ý" để xác nhận, hoặc "không" để hủy.`;

// // // //     speak(confirmText, async () => {
// // // //       const result = await waitForVoiceConfirm();
// // // //       if (result === "yes") {
// // // //         speak(
// // // //           'Chọn phương thức thanh toán: "thanh toán bằng tiền mặt" hoặc "chuyển khoản".',
// // // //           async () => {
// // // //             const method = await waitForVoicePaymentMethod();
// // // //             setPaymentMethod(method);
// // // //             speak("Xác nhận đặt hàng...");
// // // //             await handleQuickOrder(data, method);
// // // //           }
// // // //         );
// // // //       } else {
// // // //         speak("Đã huỷ đơn hàng. Vui lòng thử lại.");
// // // //         setOrderInfo(null);
// // // //         setStep("idle");
// // // //       }
// // // //     });
// // // //   };

// // // //   const handleQuickOrder = async (orderData: OrderInfo, method: 1 | 2) => {
// // // //     const token = localStorage.getItem("token");
// // // //     const payload = {
// // // //       ...orderData,
// // // //       payment_id: method,
// // // //     };

// // // //     const res = await fetch("http://localhost:8000/api/voice-order/quick", {
// // // //       method: "POST",
// // // //       headers: {
// // // //         "Content-Type": "application/json",
// // // //         Authorization: `Bearer ${token}`,
// // // //       },
// // // //       body: JSON.stringify(payload),
// // // //     });

// // // //     const data: OrderResult = await res.json();
// // // //     setOrderResult(data);
// // // //     setStep("done");

// // // //     if (method === 2 && data.payment_url) {
// // // //       speak("Đang chuyển đến trang thanh toán VNPAY...");
// // // //       window.location.href = data.payment_url;
// // // //     } else {
// // // //       speak(data.message || "Đặt hàng thành công.");
// // // //     }
// // // //   };

// // // //   return (
// // // //     <motion.div
// // // //       drag
// // // //       dragConstraints={{ left: 0, top: 0, right: 500, bottom: 800 }}
// // // //       className="fixed bottom-20 right-4 z-50"
// // // //     >
// // // //       {!showWidget && (
// // // //         <div className="relative flex flex-col items-center group">
// // // //           <motion.div
// // // //             initial={{ opacity: 0 }}
// // // //             animate={{ opacity: [0, 1, 0] }}
// // // //             transition={{
// // // //               duration: 3,
// // // //               repeat: Infinity,
// // // //               ease: "easeInOut",
// // // //             }}
// // // //             className="mb-3 px-4 py-1 bg-white text-purple-600 text-sm font-semibold rounded-full border border-purple-300 shadow-md backdrop-blur-md"
// // // //           >
// // // //             🛒 Mua hàng nhanh - nhấn tui đi!
// // // //           </motion.div>

// // // //           <motion.button
// // // //             whileHover={{ scale: 1.08 }}
// // // //             whileTap={{ scale: 0.95 }}
// // // //             onClick={() => setShowWidget(true)}
// // // //             className="rounded-full p-4 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white shadow-2xl transition-all duration-300"
// // // //           >
// // // //             <motion.div
// // // //               animate={{
// // // //                 scale: [1, 1.05, 1],
// // // //                 boxShadow: [
// // // //                   "0 0 0px rgba(255, 255, 255, 0.6)",
// // // //                   "0 0 20px rgba(255, 255, 255, 0.9)",
// // // //                   "0 0 0px rgba(255, 255, 255, 0.6)",
// // // //                 ],
// // // //               }}
// // // //               transition={{
// // // //                 duration: 4,
// // // //                 repeat: Infinity,
// // // //                 ease: "easeInOut",
// // // //               }}
// // // //             >
// // // //               <Bot size={24} />
// // // //             </motion.div>
// // // //           </motion.button>
// // // //         </div>
// // // //       )}

// // // //       {showWidget && (
// // // //         <motion.div
// // // //           initial={{ opacity: 0, scale: 0.95 }}
// // // //           animate={{ opacity: 1, scale: 1 }}
// // // //           exit={{ opacity: 0, scale: 0.95 }}
// // // //           className="bg-white shadow-2xl rounded-2xl w-80 p-4"
// // // //         >
// // // //           <div className="flex justify-between items-center mb-4">
// // // //             <h3 className="text-lg font-bold">🤖 DREAMS</h3>
// // // //             <button
// // // //               onClick={() => setShowWidget(false)}
// // // //               className="text-gray-400 hover:text-gray-600"
// // // //             >
// // // //               ✕
// // // //             </button>
// // // //           </div>

// // // //           <textarea
// // // //             className="w-full rounded-md border border-gray-300 p-2 text-sm mb-2"
// // // //             rows={3}
// // // //             placeholder="Nói hoặc nhập nội dung đặt hàng..."
// // // //             value={voiceText}
// // // //             onChange={(e) => setVoiceText(e.target.value)}
// // // //           />

// // // //           <div className="flex gap-2">
// // // //             <button
// // // //               onClick={startVoice}
// // // //               className="flex-1 flex items-center justify-center gap-1 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
// // // //             >
// // // //               <Mic size={16} /> Nói
// // // //             </button>
// // // //             <button
// // // //               onClick={() => parseOrder(voiceText)}
// // // //               disabled={!voiceText.trim()}
// // // //               className="flex-1 flex items-center justify-center gap-1 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
// // // //             >
// // // //               <Send size={16} /> Gửi
// // // //             </button>
// // // //           </div>

// // // //           {step === "listening" && (
// // // //             <p className="text-xs text-blue-500 mt-2">
// // // //               🎧 Đang nghe giọng nói...
// // // //             </p>
// // // //           )}
// // // //           {step === "parsing" && (
// // // //             <p className="text-xs text-gray-500 mt-2">
// // // //               🔎 Đang phân tích đơn hàng...
// // // //             </p>
// // // //           )}
// // // //           {step === "done" && orderResult && (
// // // //             <div className="mt-2 text-sm text-green-600">
// // // //               ✅ {orderResult.message}
// // // //             </div>
// // // //           )}

// // // //           {/* 👇 Hiển thị orderInfo */}
// // // //           {orderInfo && (
// // // //             <div className="mt-2 text-sm text-gray-700">
// // // //               🛒 Sản phẩm: {orderInfo.product} - Số lượng: {orderInfo.quantity}{" "}
// // // //               - Size: {orderInfo.size}
// // // //               <br />
// // // //               📍 Giao đến: {orderInfo.address}
// // // //             </div>
// // // //           )}

// // // //           {/* 👇 Hiển thị payment method */}
// // // //           {step === "confirming" && (
// // // //             <p className="text-xs text-purple-600 mt-1">
// // // //               💳 Phương thức thanh toán:{" "}
// // // //               {paymentMethod === 1 ? "Tiền mặt" : "Chuyển khoản"}
// // // //             </p>
// // // //           )}

// // // //           {/* 👇 Subtitle AI đang nói */}
// // // //           {aiSpeechText && (
// // // //             <div className="mt-4 px-3 py-2 rounded-md bg-yellow-100 text-yellow-800 text-sm border border-yellow-300 animate-pulse">
// // // //               🤖 <strong>AI:</strong> {aiSpeechText}
// // // //             </div>
// // // //           )}
// // // //         </motion.div>
// // // //       )}
// // // //     </motion.div>
// // // //   );
// // // // }

// // "use client";

// // import { useState, useRef, useEffect } from "react";
// // import { Bot, Mic, Send } from "lucide-react";
// // import { motion } from "framer-motion";

// // // TypeScript interfaces for Speech Recognition
// // interface SpeechRecognition extends EventTarget {
// //   continuous: boolean;
// //   interimResults: boolean;
// //   lang: string;
// //   start(): void;
// //   stop(): void;
// //   abort(): void;
// //   onresult:
// //     | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void)
// //     | null;
// //   onerror:
// //     | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void)
// //     | null;
// //   onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
// //   onend: ((this: SpeechRecognition, ev: Event) => void) | null;
// // }

// // interface SpeechRecognitionStatic {
// //   new (): SpeechRecognition;
// // }

// // interface SpeechRecognitionEvent extends Event {
// //   readonly resultIndex: number;
// //   readonly results: SpeechRecognitionResultList;
// // }

// // interface SpeechRecognitionErrorEvent extends Event {
// //   readonly error: string;
// //   readonly message: string;
// // }

// // interface SpeechRecognitionResultList {
// //   readonly length: number;
// //   item(index: number): SpeechRecognitionResult;
// //   [index: number]: SpeechRecognitionResult;
// // }

// // interface SpeechRecognitionResult {
// //   readonly length: number;
// //   readonly isFinal: boolean;
// //   item(index: number): SpeechRecognitionAlternative;
// //   [index: number]: SpeechRecognitionAlternative;
// // }

// // interface SpeechRecognitionAlternative {
// //   readonly transcript: string;
// //   readonly confidence: number;
// // }

// // declare global {
// //   interface Window {
// //     webkitSpeechRecognition: SpeechRecognitionStatic;
// //     SpeechRecognition: SpeechRecognitionStatic;
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
// //   const [aiSpeechText, setAiSpeechText] = useState<string>(""); // subtitle AI nói

// //   useEffect(() => {
// //     if (showWidget && step === "idle") {
// //       speak("Xin chào! Bạn muốn đặt món gì hôm nay?");
// //     }
// //   }, [showWidget, step]);

// //   const speak = (text: string, callback?: () => void): void => {
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
// //       const SpeechRecognitionConstructor =
// //         window.webkitSpeechRecognition || window.SpeechRecognition;
// //       if (!SpeechRecognitionConstructor) {
// //         resolve("no");
// //         return;
// //       }

// //       const recognition = new SpeechRecognitionConstructor();
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
// //       const SpeechRecognitionConstructor =
// //         window.webkitSpeechRecognition || window.SpeechRecognition;
// //       if (!SpeechRecognitionConstructor) {
// //         resolve(1);
// //         return;
// //       }

// //       const recognition = new SpeechRecognitionConstructor();
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

// //   const startVoice = (): void => {
// //     const SpeechRecognitionConstructor =
// //       window.webkitSpeechRecognition || window.SpeechRecognition;
// //     if (!SpeechRecognitionConstructor) {
// //       alert("Trình duyệt không hỗ trợ voice!");
// //       return;
// //     }

// //     setStep("listening");
// //     const recognition = new SpeechRecognitionConstructor();
// //     recognition.lang = "vi-VN";

// //     recognition.onresult = (event: SpeechRecognitionEvent) => {
// //       const text = event.results[0][0].transcript;
// //       setVoiceText(text);
// //       parseOrder(text);
// //     };

// //     recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
// //       console.error("Speech recognition error:", event.error);
// //       setStep("idle");
// //     };

// //     recognition.start();
// //     recognitionRef.current = recognition;
// //   };

// //   const parseOrder = async (text: string): Promise<void> => {
// //     setStep("parsing");
// //     const token = localStorage.getItem("token");

// //     try {
// //       const res = await fetch("http://localhost:8000/api/voice-order/parse", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           ...(token && { Authorization: `Bearer ${token}` }),
// //         },
// //         body: JSON.stringify({ text }),
// //       });

// //       if (!res.ok) {
// //         throw new Error(`HTTP error! status: ${res.status}`);
// //       }

// //       const data: OrderInfo = await res.json();
// //       setOrderInfo(data);
// //       setStep("confirming");

// //       const confirmText = `Bạn muốn mua ${data.quantity} ${data.product} size ${data.size}, giao về ${data.address}. Nói "Đồng ý" để xác nhận, hoặc "không" để hủy.`;

// //       speak(confirmText, async () => {
// //         const result = await waitForVoiceConfirm();
// //         if (result === "yes") {
// //           speak(
// //             'Chọn phương thức thanh toán: "thanh toán bằng tiền mặt" hoặc "chuyển khoản".',
// //             async () => {
// //               const method = await waitForVoicePaymentMethod();
// //               setPaymentMethod(method);
// //               speak("Xác nhận đặt hàng...");
// //               await handleQuickOrder(data, method);
// //             }
// //           );
// //         } else {
// //           speak("Đã huỷ đơn hàng. Vui lòng thử lại.");
// //           setOrderInfo(null);
// //           setStep("idle");
// //         }
// //       });
// //     } catch (error) {
// //       console.error("Error parsing order:", error);
// //       speak("Có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại.");
// //       setStep("idle");
// //     }
// //   };

// //   const handleQuickOrder = async (
// //     orderData: OrderInfo,
// //     method: 1 | 2
// //   ): Promise<void> => {
// //     const token = localStorage.getItem("token");
// //     const payload = {
// //       ...orderData,
// //       payment_id: method,
// //     };

// //     try {
// //       const res = await fetch("http://localhost:8000/api/voice-order/quick", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           ...(token && { Authorization: `Bearer ${token}` }),
// //         },
// //         body: JSON.stringify(payload),
// //       });

// //       if (!res.ok) {
// //         throw new Error(`HTTP error! status: ${res.status}`);
// //       }

// //       const data: OrderResult = await res.json();
// //       setOrderResult(data);
// //       setStep("done");

// //       if (method === 2 && data.payment_url) {
// //         speak("Đang chuyển đến trang thanh toán VNPAY...");
// //         window.location.href = data.payment_url;
// //       } else {
// //         speak(data.message || "Đặt hàng thành công.");
// //       }
// //     } catch (error) {
// //       console.error("Error processing order:", error);
// //       speak("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.");
// //       setStep("idle");
// //     }
// //   };

// //   const handleTextChange = (
// //     e: React.ChangeEvent<HTMLTextAreaElement>
// //   ): void => {
// //     setVoiceText(e.target.value);
// //   };

// //   const handleParseClick = (): void => {
// //     if (voiceText.trim()) {
// //       parseOrder(voiceText);
// //     }
// //   };

// //   const handleCloseWidget = (): void => {
// //     setShowWidget(false);
// //     setStep("idle");
// //     setVoiceText("");
// //     setOrderInfo(null);
// //     setOrderResult(null);
// //     setAiSpeechText("");
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
// //               onClick={handleCloseWidget}
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
// //             onChange={handleTextChange}
// //           />

// //           <div className="flex gap-2">
// //             <button
// //               onClick={startVoice}
// //               className="flex-1 flex items-center justify-center gap-1 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
// //             >
// //               <Mic size={16} /> Nói
// //             </button>
// //             <button
// //               onClick={handleParseClick}
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

// //           {/* Hiển thị orderInfo */}
// //           {orderInfo && (
// //             <div className="mt-2 text-sm text-gray-700">
// //               🛒 Sản phẩm: {orderInfo.product} - Số lượng: {orderInfo.quantity}{" "}
// //               - Size: {orderInfo.size}
// //               <br />
// //               📍 Giao đến: {orderInfo.address}
// //             </div>
// //           )}

// //           {/* Hiển thị payment method */}
// //           {step === "confirming" && (
// //             <p className="text-xs text-purple-600 mt-1">
// //               💳 Phương thức thanh toán:{" "}
// //               {paymentMethod === 1 ? "Tiền mặt" : "Chuyển khoản"}
// //             </p>
// //           )}

// //           {/* Subtitle AI đang nói */}
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
// import {
//   Bot,
//   Mic,
//   Send,
//   X,
//   Globe,
//   Volume2,
//   VolumeX,
//   ShoppingBag,
//   MapPin,
//   Package,
//   CreditCard,
//   Clock,
// } from "lucide-react";

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

// // Multilingual support
// const translations = {
//   en: {
//     quickOrder: "Quick Order",
//     clickMe: "🛒 Quick order - click me!",
//     hello: "Hello! What would you like to order today?",
//     speakOrType: "Speak or type your order...",
//     speak: "Speak",
//     send: "Send",
//     listening: "🎧 Listening...",
//     parsing: "🔎 Analyzing order...",
//     confirming: "Confirming order...",
//     orderSuccess: "✅ Order successful!",
//     product: "Product",
//     quantity: "Quantity",
//     size: "Size",
//     deliverTo: "Deliver to",
//     paymentMethod: "Payment method",
//     cash: "Cash",
//     transfer: "Bank transfer",
//     agree: "agree",
//     ok: "ok",
//     yes: "yes",
//     cancel: "cancel",
//     no: "no",
//     confirmOrder:
//       "You want to buy {quantity} {product} size {size}, deliver to {address}. Say 'agree' to confirm, or 'cancel' to abort.",
//     choosePayment: "Choose payment method: 'cash' or 'bank transfer'.",
//     orderCanceled: "Order canceled. Please try again.",
//     errorProcessing: "Error processing order. Please try again.",
//     redirectingPayment: "Redirecting to VNPAY payment...",
//     mute: "Mute",
//     unmute: "Unmute",
//   },
//   vi: {
//     quickOrder: "Đặt hàng nhanh",
//     clickMe: "🛒 Mua hàng nhanh - nhấn tui đi!",
//     hello: "Xin chào! Bạn muốn đặt món gì hôm nay?",
//     speakOrType: "Nói hoặc nhập nội dung đặt hàng...",
//     speak: "Nói",
//     send: "Gửi",
//     listening: "🎧 Đang nghe giọng nói...",
//     parsing: "🔎 Đang phân tích đơn hàng...",
//     confirming: "Đang xác nhận đơn hàng...",
//     orderSuccess: "✅ Đặt hàng thành công!",
//     product: "Sản phẩm",
//     quantity: "Số lượng",
//     size: "Size",
//     deliverTo: "Giao đến",
//     paymentMethod: "Phương thức thanh toán",
//     cash: "Tiền mặt",
//     transfer: "Chuyển khoản",
//     agree: "đồng ý",
//     ok: "ok",
//     yes: "có",
//     cancel: "không",
//     no: "không",
//     confirmOrder:
//       "Bạn muốn mua {quantity} {product} size {size}, giao về {address}. Nói 'đồng ý' để xác nhận, hoặc 'không' để hủy.",
//     choosePayment:
//       "Chọn phương thức thanh toán: 'tiền mặt' hoặc 'chuyển khoản'.",
//     orderCanceled: "Đã huỷ đơn hàng. Vui lòng thử lại.",
//     errorProcessing: "Có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại.",
//     redirectingPayment: "Đang chuyển đến trang thanh toán VNPAY...",
//     mute: "Tắt tiếng",
//     unmute: "Bật tiếng",
//   },
//   zh: {
//     quickOrder: "快速下单",
//     clickMe: "🛒 快速购买 - 点击我！",
//     hello: "您好！今天想要订购什么？",
//     speakOrType: "说话或输入您的订单...",
//     speak: "说话",
//     send: "发送",
//     listening: "🎧 正在听取...",
//     parsing: "🔎 正在分析订单...",
//     confirming: "正在确认订单...",
//     orderSuccess: "✅ 订单成功！",
//     product: "产品",
//     quantity: "数量",
//     size: "尺寸",
//     deliverTo: "送达",
//     paymentMethod: "支付方式",
//     cash: "现金",
//     transfer: "银行转账",
//     agree: "同意",
//     ok: "好的",
//     yes: "是",
//     cancel: "取消",
//     no: "不",
//     confirmOrder:
//       "您想购买 {quantity} 个 {product} 尺寸 {size}，送到 {address}。说'同意'确认，或'取消'中止。",
//     choosePayment: "选择支付方式：'现金'或'银行转账'。",
//     orderCanceled: "订单已取消。请重试。",
//     errorProcessing: "处理订单时出错。请重试。",
//     redirectingPayment: "正在跳转到VNPAY支付...",
//     mute: "静音",
//     unmute: "取消静音",
//   },
//   es: {
//     quickOrder: "Pedido rápido",
//     clickMe: "🛒 Pedido rápido - ¡haz clic!",
//     hello: "¡Hola! ¿Qué te gustaría pedir hoy?",
//     speakOrType: "Habla o escribe tu pedido...",
//     speak: "Hablar",
//     send: "Enviar",
//     listening: "🎧 Escuchando...",
//     parsing: "🔎 Analizando pedido...",
//     confirming: "Confirmando pedido...",
//     orderSuccess: "✅ ¡Pedido exitoso!",
//     product: "Producto",
//     quantity: "Cantidad",
//     size: "Talla",
//     deliverTo: "Entregar a",
//     paymentMethod: "Método de pago",
//     cash: "Efectivo",
//     transfer: "Transferencia",
//     agree: "de acuerdo",
//     ok: "ok",
//     yes: "sí",
//     cancel: "cancelar",
//     no: "no",
//     confirmOrder:
//       "Quieres comprar {quantity} {product} talla {size}, entregar a {address}. Di 'de acuerdo' para confirmar, o 'cancelar' para abortar.",
//     choosePayment: "Elige método de pago: 'efectivo' o 'transferencia'.",
//     orderCanceled: "Pedido cancelado. Por favor intenta de nuevo.",
//     errorProcessing: "Error procesando pedido. Por favor intenta de nuevo.",
//     redirectingPayment: "Redirigiendo a pago VNPAY...",
//     mute: "Silenciar",
//     unmute: "Activar sonido",
//   },
// };

// type Language = keyof typeof translations;

// export default function VoiceQuickOrderFlexible() {
//   const [voiceText, setVoiceText] = useState<string>("");
//   const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
//   const [orderResult, setOrderResult] = useState<OrderResult | null>(null);
//   const [step, setStep] = useState<Step>("idle");
//   const [paymentMethod, setPaymentMethod] = useState<1 | 2>(1);
//   const [language, setLanguage] = useState<Language>("vi");
//   const [isMuted, setIsMuted] = useState<boolean>(false);
//   const recognitionRef = useRef<SpeechRecognition | null>(null);
//   const [showWidget, setShowWidget] = useState<boolean>(false);
//   const [aiSpeechText, setAiSpeechText] = useState<string>("");
//   const [isRecording, setIsRecording] = useState<boolean>(false);
//   const [pulseAnimation, setPulseAnimation] = useState<boolean>(true);

//   const t = translations[language];

//   useEffect(() => {
//     if (showWidget && step === "idle") {
//       speak(t.hello);
//     }
//   }, [showWidget, step, language]);

//   // Auto pulse animation
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setPulseAnimation((prev) => !prev);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const speak = (text: string, callback?: () => void): void => {
//     if ("speechSynthesis" in window && !isMuted) {
//       const utter = new SpeechSynthesisUtterance(text);
//       utter.lang =
//         language === "vi"
//           ? "vi-VN"
//           : language === "en"
//           ? "en-US"
//           : language === "zh"
//           ? "zh-CN"
//           : "es-ES";
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
//       recognition.lang =
//         language === "vi"
//           ? "vi-VN"
//           : language === "en"
//           ? "en-US"
//           : language === "zh"
//           ? "zh-CN"
//           : "es-ES";
//       recognition.start();

//       recognition.onresult = (event: SpeechRecognitionEvent) => {
//         const response = event.results[0][0].transcript.toLowerCase();
//         const yesWords = [t.agree, t.ok, t.yes].map((w) => w.toLowerCase());
//         const noWords = [t.cancel, t.no].map((w) => w.toLowerCase());

//         if (yesWords.some((word) => response.includes(word))) {
//           resolve("yes");
//         } else if (noWords.some((word) => response.includes(word))) {
//           resolve("no");
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
//       recognition.lang =
//         language === "vi"
//           ? "vi-VN"
//           : language === "en"
//           ? "en-US"
//           : language === "zh"
//           ? "zh-CN"
//           : "es-ES";
//       recognition.start();

//       recognition.onresult = (event: SpeechRecognitionEvent) => {
//         const response = event.results[0][0].transcript.toLowerCase();
//         if (response.includes(t.transfer.toLowerCase())) {
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
//       alert("Browser doesn't support voice recognition!");
//       return;
//     }

//     setStep("listening");
//     setIsRecording(true);
//     const recognition = new SpeechRecognitionConstructor();
//     recognition.lang =
//       language === "vi"
//         ? "vi-VN"
//         : language === "en"
//         ? "en-US"
//         : language === "zh"
//         ? "zh-CN"
//         : "es-ES";

//     recognition.onresult = (event: SpeechRecognitionEvent) => {
//       const text = event.results[0][0].transcript;
//       setVoiceText(text);
//       setIsRecording(false);
//       parseOrder(text);
//     };

//     recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
//       console.error("Speech recognition error:", event.error);
//       setStep("idle");
//       setIsRecording(false);
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

//       const confirmText = t.confirmOrder
//         .replace("{quantity}", data.quantity.toString())
//         .replace("{product}", data.product)
//         .replace("{size}", data.size)
//         .replace("{address}", data.address);

//       speak(confirmText, async () => {
//         const result = await waitForVoiceConfirm();
//         if (result === "yes") {
//           speak(t.choosePayment, async () => {
//             const method = await waitForVoicePaymentMethod();
//             setPaymentMethod(method);
//             speak(t.confirming);
//             await handleQuickOrder(data, method);
//           });
//         } else {
//           speak(t.orderCanceled);
//           setOrderInfo(null);
//           setStep("idle");
//         }
//       });
//     } catch (error) {
//       console.error("Error parsing order:", error);
//       speak(t.errorProcessing);
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
//         speak(t.redirectingPayment);
//         setTimeout(() => {
//           window.location.href = data.payment_url!;
//         }, 2000);
//       } else {
//         speak(data.message || t.orderSuccess);
//       }
//     } catch (error) {
//       console.error("Error processing order:", error);
//       speak(t.errorProcessing);
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
//     setIsRecording(false);
//     if (recognitionRef.current) {
//       recognitionRef.current.abort();
//     }
//   };

//   return (
//     <div className="fixed bottom-6 right-6 z-50">
//       {!showWidget && (
//         <div className="relative flex flex-col items-center group">
//           {/* Floating message */}
//           <div
//             className={`mb-4 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold rounded-full shadow-xl transform transition-all duration-700 ${
//               pulseAnimation ? "scale-105 shadow-2xl" : "scale-100"
//             }`}
//             style={{
//               background: "linear-gradient(135deg, #ff6b35, #f7931e, #ff8c42)",
//               boxShadow: "0 8px 32px rgba(255, 107, 53, 0.4)",
//             }}
//           >
//             {t.clickMe}
//             <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-orange-500"></div>
//           </div>

//           {/* Main bot button */}
//           <button
//             onClick={() => setShowWidget(true)}
//             className={`relative rounded-full p-5 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 ${
//               pulseAnimation ? "animate-pulse" : ""
//             }`}
//             style={{
//               background:
//                 "linear-gradient(135deg, #ff6b35, #f7931e, #ff8c42, #e94e77)",
//               boxShadow: "0 12px 40px rgba(255, 107, 53, 0.5)",
//             }}
//           >
//             <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping"></div>
//             <Bot size={28} className="relative z-10" />

//             {/* Floating particles */}
//             <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-75"></div>
//             <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-400 rounded-full animate-bounce delay-150"></div>
//           </button>
//         </div>
//       )}

//       {showWidget && (
//         <div
//           className="bg-white shadow-2xl rounded-3xl w-96 overflow-hidden transform transition-all duration-500 animate-in slide-in-from-bottom-8"
//           style={{
//             boxShadow: "0 25px 80px rgba(0, 0, 0, 0.15)",
//             backdropFilter: "blur(20px)",
//           }}
//         >
//           {/* Header */}
//           <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white relative overflow-hidden">
//             <div className="absolute inset-0 bg-black opacity-10"></div>
//             <div className="relative z-10 flex justify-between items-center">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-white bg-opacity-20 rounded-full">
//                   <ShoppingBag size={20} />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold">{t.quickOrder}</h3>
//                   <p className="text-xs opacity-90">AI Assistant</p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 {/* Language selector */}
//                 <select
//                   value={language}
//                   onChange={(e) => setLanguage(e.target.value as Language)}
//                   className="bg-white bg-opacity-20 text-white text-xs rounded-lg px-2 py-1 border-none outline-none"
//                 >
//                   <option value="vi" className="text-black">
//                     🇻🇳 VI
//                   </option>
//                   <option value="en" className="text-black">
//                     🇺🇸 EN
//                   </option>
//                   <option value="zh" className="text-black">
//                     🇨🇳 ZH
//                   </option>
//                   <option value="es" className="text-black">
//                     🇪🇸 ES
//                   </option>
//                 </select>

//                 {/* Mute/Unmute button */}
//                 <button
//                   onClick={() => setIsMuted(!isMuted)}
//                   className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
//                   title={isMuted ? t.unmute : t.mute}
//                 >
//                   {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
//                 </button>

//                 {/* Close button */}
//                 <button
//                   onClick={handleCloseWidget}
//                   className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//             </div>

//             {/* Decorative wave */}
//             <div className="absolute bottom-0 left-0 right-0">
//               <svg viewBox="0 0 400 20" className="w-full h-5">
//                 <path
//                   d="M0,10 Q100,0 200,10 T400,10 L400,20 L0,20 Z"
//                   fill="white"
//                   opacity="0.1"
//                 />
//               </svg>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="p-6 space-y-4">
//             {/* Text input */}
//             <div className="relative">
//               <textarea
//                 className="w-full rounded-2xl border-2 border-gray-200 p-4 text-sm resize-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300"
//                 rows={3}
//                 placeholder={t.speakOrType}
//                 value={voiceText}
//                 onChange={handleTextChange}
//               />
//               {voiceText && (
//                 <div className="absolute top-2 right-2 text-orange-500">
//                   <Package size={16} />
//                 </div>
//               )}
//             </div>

//             {/* Action buttons */}
//             <div className="flex gap-3">
//               <button
//                 onClick={startVoice}
//                 disabled={isRecording}
//                 className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
//                   isRecording
//                     ? "bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse"
//                     : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg"
//                 }`}
//                 style={{
//                   boxShadow: isRecording
//                     ? "0 0 30px rgba(239, 68, 68, 0.5)"
//                     : "0 8px 25px rgba(255, 107, 53, 0.3)",
//                 }}
//               >
//                 <Mic
//                   size={18}
//                   className={isRecording ? "animate-bounce" : ""}
//                 />
//                 {isRecording ? "Recording..." : t.speak}
//               </button>

//               <button
//                 onClick={handleParseClick}
//                 disabled={!voiceText.trim()}
//                 className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
//                 style={{
//                   boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
//                 }}
//               >
//                 <Send size={18} />
//                 {t.send}
//               </button>
//             </div>

//             {/* Status indicator */}
//             {step !== "idle" && (
//               <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
//                 <div className="flex-shrink-0">
//                   {step === "listening" && (
//                     <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
//                   )}
//                   {step === "parsing" && (
//                     <div className="w-3 h-3 bg-yellow-500 rounded-full animate-spin"></div>
//                   )}
//                   {step === "confirming" && (
//                     <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
//                   )}
//                   {step === "done" && (
//                     <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                   )}
//                 </div>
//                 <p className="text-sm text-gray-700 font-medium">
//                   {step === "listening" && t.listening}
//                   {step === "parsing" && t.parsing}
//                   {step === "confirming" && t.confirming}
//                   {step === "done" && t.orderSuccess}
//                 </p>
//               </div>
//             )}

//             {/* Order info display */}
//             {orderInfo && (
//               <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-200 space-y-3">
//                 <div className="flex items-center gap-2 text-orange-600 font-semibold">
//                   <ShoppingBag size={18} />
//                   Order Details
//                 </div>

//                 <div className="grid grid-cols-2 gap-3 text-sm">
//                   <div className="flex items-center gap-2">
//                     <Package size={14} className="text-gray-500" />
//                     <span className="text-gray-600">{t.product}:</span>
//                     <span className="font-semibold text-gray-800">
//                       {orderInfo.product}
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <Clock size={14} className="text-gray-500" />
//                     <span className="text-gray-600">{t.quantity}:</span>
//                     <span className="font-semibold text-gray-800">
//                       {orderInfo.quantity}
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <Package size={14} className="text-gray-500" />
//                     <span className="text-gray-600">{t.size}:</span>
//                     <span className="font-semibold text-gray-800">
//                       {orderInfo.size}
//                     </span>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <CreditCard size={14} className="text-gray-500" />
//                     <span className="text-gray-600">{t.paymentMethod}:</span>
//                     <span className="font-semibold text-gray-800">
//                       {paymentMethod === 1 ? t.cash : t.transfer}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-2 pt-2 border-t border-orange-200">
//                   <MapPin size={14} className="text-gray-500 mt-1" />
//                   <div>
//                     <span className="text-gray-600 text-sm">
//                       {t.deliverTo}:
//                     </span>
//                     <p className="font-semibold text-gray-800 text-sm">
//                       {orderInfo.address}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Order result */}
//             {step === "done" && orderResult && (
//               <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
//                 <div className="flex items-center gap-2 text-green-600">
//                   <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
//                     <span className="text-white text-xs">✓</span>
//                   </div>
//                   <span className="font-semibold">{orderResult.message}</span>
//                 </div>
//               </div>
//             )}

//             {/* AI Speech subtitle */}
//             {aiSpeechText && (
//               <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-4 border border-yellow-200 animate-pulse">
//                 <div className="flex items-center gap-3">
//                   <div className="flex-shrink-0">
//                     <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
//                       <Bot size={16} className="text-white" />
//                     </div>
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-sm font-semibold text-yellow-800 mb-1">
//                       AI Assistant
//                     </p>
//                     <p className="text-sm text-yellow-700">{aiSpeechText}</p>
//                   </div>
//                   <div className="flex space-x-1">
//                     <div className="w-1 h-1 bg-yellow-500 rounded-full animate-bounce"></div>
//                     <div className="w-1 h-1 bg-yellow-500 rounded-full animate-bounce delay-75"></div>
//                     <div className="w-1 h-1 bg-yellow-500 rounded-full animate-bounce delay-150"></div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bot,
  Mic,
  Send,
  X,
  Globe,
  Volume2,
  VolumeX,
  ShoppingBag,
  MapPin,
  Package,
  CreditCard,
  Clock,
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

// Comprehensive multilingual support
const translations = {
  // Vietnamese
  vi: {
    quickOrder: "Đặt hàng nhanh",
    clickMe: "🛒 Mua hàng nhanh - nhấn tui đi!",
    hello: "Xin chào! Bạn muốn đặt món gì hôm nay?",
    speakOrType: "Nói hoặc nhập nội dung đặt hàng...",
    speak: "Nói",
    send: "Gửi",
    listening: "🎧 Đang nghe giọng nói...",
    parsing: "🔎 Đang phân tích đơn hàng...",
    confirming: "Đang xác nhận đơn hàng...",
    orderSuccess: "✅ Đặt hàng thành công!",
    product: "Sản phẩm",
    quantity: "Số lượng",
    size: "Size",
    deliverTo: "Giao đến",
    paymentMethod: "Phương thức thanh toán",
    cash: "Tiền mặt",
    transfer: "Chuyển khoản",
    agree: "đồng ý",
    ok: "ok",
    yes: "có",
    cancel: "không",
    no: "không",
    confirmOrder:
      "Bạn muốn mua {quantity} {product} size {size}, giao về {address}. Nói 'đồng ý' để xác nhận, hoặc 'không' để hủy.",
    choosePayment:
      "Chọn phương thức thanh toán: 'tiền mặt' hoặc 'chuyển khoản'.",
    orderCanceled: "Đã huỷ đơn hàng. Vui lòng thử lại.",
    errorProcessing: "Có lỗi xảy ra khi xử lý đơn hàng. Vui lòng thử lại.",
    redirectingPayment: "Đang chuyển đến trang thanh toán VNPAY...",
    mute: "Tắt tiếng",
    unmute: "Bật tiếng",
    orderDetails: "Chi tiết đơn hàng",
    waitingPayment: "Chờ chọn phương thức thanh toán...",
  },
  // English
  en: {
    quickOrder: "Quick Order",
    clickMe: "🛒 Quick order - click me!",
    hello: "Hello! What would you like to order today?",
    speakOrType: "Speak or type your order...",
    speak: "Speak",
    send: "Send",
    listening: "🎧 Listening...",
    parsing: "🔎 Analyzing order...",
    confirming: "Confirming order...",
    orderSuccess: "✅ Order successful!",
    product: "Product",
    quantity: "Quantity",
    size: "Size",
    deliverTo: "Deliver to",
    paymentMethod: "Payment method",
    cash: "Cash",
    transfer: "Bank transfer",
    agree: "agree",
    ok: "ok",
    yes: "yes",
    cancel: "cancel",
    no: "no",
    confirmOrder:
      "You want to buy {quantity} {product} size {size}, deliver to {address}. Say 'agree' to confirm, or 'cancel' to abort.",
    choosePayment: "Choose payment method: 'cash' or 'bank transfer'.",
    orderCanceled: "Order canceled. Please try again.",
    errorProcessing: "Error processing order. Please try again.",
    redirectingPayment: "Redirecting to VNPAY payment...",
    mute: "Mute",
    unmute: "Unmute",
    orderDetails: "Order Details",
    waitingPayment: "Waiting for payment method selection...",
  },
  // Chinese Simplified
  zh: {
    quickOrder: "快速下单",
    clickMe: "🛒 快速购买 - 点击我！",
    hello: "您好！今天想要订购什么？",
    speakOrType: "说话或输入您的订单...",
    speak: "说话",
    send: "发送",
    listening: "🎧 正在听取...",
    parsing: "🔎 正在分析订单...",
    confirming: "正在确认订单...",
    orderSuccess: "✅ 订单成功！",
    product: "产品",
    quantity: "数量",
    size: "尺寸",
    deliverTo: "送达",
    paymentMethod: "支付方式",
    cash: "现金",
    transfer: "银行转账",
    agree: "同意",
    ok: "好的",
    yes: "是",
    cancel: "取消",
    no: "不",
    confirmOrder:
      "您想购买 {quantity} 个 {product} 尺寸 {size}，送到 {address}。说'同意'确认，或'取消'中止。",
    choosePayment: "选择支付方式：'现金'或'银行转账'。",
    orderCanceled: "订单已取消。请重试。",
    errorProcessing: "处理订单时出错。请重试。",
    redirectingPayment: "正在跳转到VNPAY支付...",
    mute: "静音",
    unmute: "取消静音",
    orderDetails: "订单详情",
    waitingPayment: "等待选择支付方式...",
  },
  // Spanish
  es: {
    quickOrder: "Pedido rápido",
    clickMe: "🛒 Pedido rápido - ¡haz clic!",
    hello: "¡Hola! ¿Qué te gustaría pedir hoy?",
    speakOrType: "Habla o escribe tu pedido...",
    speak: "Hablar",
    send: "Enviar",
    listening: "🎧 Escuchando...",
    parsing: "🔎 Analizando pedido...",
    confirming: "Confirmando pedido...",
    orderSuccess: "✅ ¡Pedido exitoso!",
    product: "Producto",
    quantity: "Cantidad",
    size: "Talla",
    deliverTo: "Entregar a",
    paymentMethod: "Método de pago",
    cash: "Efectivo",
    transfer: "Transferencia",
    agree: "de acuerdo",
    ok: "ok",
    yes: "sí",
    cancel: "cancelar",
    no: "no",
    confirmOrder:
      "Quieres comprar {quantity} {product} talla {size}, entregar a {address}. Di 'de acuerdo' para confirmar, o 'cancelar' para abortar.",
    choosePayment: "Elige método de pago: 'efectivo' o 'transferencia'.",
    orderCanceled: "Pedido cancelado. Por favor intenta de nuevo.",
    errorProcessing: "Error procesando pedido. Por favor intenta de nuevo.",
    redirectingPayment: "Redirigiendo a pago VNPAY...",
    mute: "Silenciar",
    unmute: "Activar sonido",
    orderDetails: "Detalles del pedido",
    waitingPayment: "Esperando selección de método de pago...",
  },
  // French
  fr: {
    quickOrder: "Commande rapide",
    clickMe: "🛒 Commande rapide - cliquez-moi!",
    hello: "Bonjour! Que souhaitez-vous commander aujourd'hui?",
    speakOrType: "Parlez ou tapez votre commande...",
    speak: "Parler",
    send: "Envoyer",
    listening: "🎧 Écoute en cours...",
    parsing: "🔎 Analyse de la commande...",
    confirming: "Confirmation de la commande...",
    orderSuccess: "✅ Commande réussie!",
    product: "Produit",
    quantity: "Quantité",
    size: "Taille",
    deliverTo: "Livrer à",
    paymentMethod: "Méthode de paiement",
    cash: "Espèces",
    transfer: "Virement",
    agree: "d'accord",
    ok: "ok",
    yes: "oui",
    cancel: "annuler",
    no: "non",
    confirmOrder:
      "Vous voulez acheter {quantity} {product} taille {size}, livrer à {address}. Dites 'd'accord' pour confirmer, ou 'annuler' pour abandonner.",
    choosePayment: "Choisissez le mode de paiement: 'espèces' ou 'virement'.",
    orderCanceled: "Commande annulée. Veuillez réessayer.",
    errorProcessing:
      "Erreur lors du traitement de la commande. Veuillez réessayer.",
    redirectingPayment: "Redirection vers le paiement VNPAY...",
    mute: "Muet",
    unmute: "Activer le son",
    orderDetails: "Détails de la commande",
    waitingPayment: "En attente de sélection du mode de paiement...",
  },
  // German
  de: {
    quickOrder: "Schnellbestellung",
    clickMe: "🛒 Schnellbestellung - klick mich!",
    hello: "Hallo! Was möchten Sie heute bestellen?",
    speakOrType: "Sprechen oder tippen Sie Ihre Bestellung...",
    speak: "Sprechen",
    send: "Senden",
    listening: "🎧 Zuhören...",
    parsing: "🔎 Bestellung analysieren...",
    confirming: "Bestellung bestätigen...",
    orderSuccess: "✅ Bestellung erfolgreich!",
    product: "Produkt",
    quantity: "Menge",
    size: "Größe",
    deliverTo: "Liefern an",
    paymentMethod: "Zahlungsmethode",
    cash: "Bar",
    transfer: "Überweisung",
    agree: "einverstanden",
    ok: "ok",
    yes: "ja",
    cancel: "abbrechen",
    no: "nein",
    confirmOrder:
      "Sie möchten {quantity} {product} Größe {size} kaufen, liefern an {address}. Sagen Sie 'einverstanden' zum bestätigen, oder 'abbrechen' zum abbrechen.",
    choosePayment: "Wählen Sie die Zahlungsmethode: 'bar' oder 'überweisung'.",
    orderCanceled: "Bestellung storniert. Bitte versuchen Sie es erneut.",
    errorProcessing:
      "Fehler beim Verarbeiten der Bestellung. Bitte versuchen Sie es erneut.",
    redirectingPayment: "Weiterleitung zur VNPAY-Zahlung...",
    mute: "Stumm",
    unmute: "Ton aktivieren",
    orderDetails: "Bestelldetails",
    waitingPayment: "Warten auf Auswahl der Zahlungsmethode...",
  },
  // Japanese
  ja: {
    quickOrder: "クイック注文",
    clickMe: "🛒 クイック注文 - クリックして！",
    hello: "こんにちは！今日は何を注文しますか？",
    speakOrType: "音声入力またはテキスト入力で注文...",
    speak: "話す",
    send: "送信",
    listening: "🎧 聞いています...",
    parsing: "🔎 注文を分析中...",
    confirming: "注文を確認中...",
    orderSuccess: "✅ 注文成功！",
    product: "商品",
    quantity: "数量",
    size: "サイズ",
    deliverTo: "配送先",
    paymentMethod: "支払い方法",
    cash: "現金",
    transfer: "銀行振込",
    agree: "同意",
    ok: "オーケー",
    yes: "はい",
    cancel: "キャンセル",
    no: "いいえ",
    confirmOrder:
      "{quantity}個の{product}サイズ{size}を{address}に配送します。確認するには'同意'、キャンセルするには'キャンセル'と言ってください。",
    choosePayment: "支払い方法を選択してください：'現金'または'銀行振込'。",
    orderCanceled: "注文がキャンセルされました。もう一度お試しください。",
    errorProcessing:
      "注文処理中にエラーが発生しました。もう一度お試しください。",
    redirectingPayment: "VNPAY決済にリダイレクト中...",
    mute: "ミュート",
    unmute: "ミュート解除",
    orderDetails: "注文詳細",
    waitingPayment: "支払い方法の選択を待っています...",
  },
  // Korean
  ko: {
    quickOrder: "빠른 주문",
    clickMe: "🛒 빠른 주문 - 클릭하세요!",
    hello: "안녕하세요! 오늘 무엇을 주문하시겠습니까?",
    speakOrType: "음성 또는 텍스트로 주문하세요...",
    speak: "말하기",
    send: "전송",
    listening: "🎧 듣고 있습니다...",
    parsing: "🔎 주문 분석 중...",
    confirming: "주문 확인 중...",
    orderSuccess: "✅ 주문 성공!",
    product: "상품",
    quantity: "수량",
    size: "사이즈",
    deliverTo: "배송지",
    paymentMethod: "결제 방법",
    cash: "현금",
    transfer: "계좌이체",
    agree: "동의",
    ok: "확인",
    yes: "네",
    cancel: "취소",
    no: "아니오",
    confirmOrder:
      "{quantity}개의 {product} 사이즈 {size}를 {address}로 배송합니다. 확인하려면 '동의', 취소하려면 '취소'라고 말하세요.",
    choosePayment: "결제 방법을 선택하세요: '현금' 또는 '계좌이체'.",
    orderCanceled: "주문이 취소되었습니다. 다시 시도해주세요.",
    errorProcessing: "주문 처리 중 오류가 발생했습니다. 다시 시도해주세요.",
    redirectingPayment: "VNPAY 결제로 리다이렉션 중...",
    mute: "음소거",
    unmute: "음소거 해제",
    orderDetails: "주문 상세",
    waitingPayment: "결제 방법 선택을 기다리고 있습니다...",
  },
  // Portuguese
  pt: {
    quickOrder: "Pedido rápido",
    clickMe: "🛒 Pedido rápido - clique em mim!",
    hello: "Olá! O que gostaria de pedir hoje?",
    speakOrType: "Fale ou digite seu pedido...",
    speak: "Falar",
    send: "Enviar",
    listening: "🎧 Ouvindo...",
    parsing: "🔎 Analisando pedido...",
    confirming: "Confirmando pedido...",
    orderSuccess: "✅ Pedido realizado com sucesso!",
    product: "Produto",
    quantity: "Quantidade",
    size: "Tamanho",
    deliverTo: "Entregar em",
    paymentMethod: "Método de pagamento",
    cash: "Dinheiro",
    transfer: "Transferência",
    agree: "concordo",
    ok: "ok",
    yes: "sim",
    cancel: "cancelar",
    no: "não",
    confirmOrder:
      "Você quer comprar {quantity} {product} tamanho {size}, entregar em {address}. Diga 'concordo' para confirmar, ou 'cancelar' para abortar.",
    choosePayment:
      "Escolha o método de pagamento: 'dinheiro' ou 'transferência'.",
    orderCanceled: "Pedido cancelado. Tente novamente.",
    errorProcessing: "Erro ao processar pedido. Tente novamente.",
    redirectingPayment: "Redirecionando para pagamento VNPAY...",
    mute: "Silenciar",
    unmute: "Ativar som",
    orderDetails: "Detalhes do pedido",
    waitingPayment: "Aguardando seleção do método de pagamento...",
  },
  // Russian
  ru: {
    quickOrder: "Быстрый заказ",
    clickMe: "🛒 Быстрый заказ - нажми на меня!",
    hello: "Привет! Что бы вы хотели заказать сегодня?",
    speakOrType: "Говорите или вводите ваш заказ...",
    speak: "Говорить",
    send: "Отправить",
    listening: "🎧 Слушаю...",
    parsing: "🔎 Анализирую заказ...",
    confirming: "Подтверждаю заказ...",
    orderSuccess: "✅ Заказ успешен!",
    product: "Товар",
    quantity: "Количество",
    size: "Размер",
    deliverTo: "Доставить в",
    paymentMethod: "Способ оплаты",
    cash: "Наличные",
    transfer: "Перевод",
    agree: "согласен",
    ok: "хорошо",
    yes: "да",
    cancel: "отменить",
    no: "нет",
    confirmOrder:
      "Вы хотите купить {quantity} {product} размер {size}, доставить в {address}. Скажите 'согласен' для подтверждения, или 'отменить' для отмены.",
    choosePayment: "Выберите способ оплаты: 'наличные' или 'перевод'.",
    orderCanceled: "Заказ отменен. Попробуйте снова.",
    errorProcessing: "Ошибка при обработке заказа. Попробуйте снова.",
    redirectingPayment: "Перенаправление на оплату VNPAY...",
    mute: "Без звука",
    unmute: "Включить звук",
    orderDetails: "Детали заказа",
    waitingPayment: "Ожидание выбора способа оплаты...",
  },
  // Italian
  it: {
    quickOrder: "Ordine rapido",
    clickMe: "🛒 Ordine rapido - cliccami!",
    hello: "Ciao! Cosa vorresti ordinare oggi?",
    speakOrType: "Parla o digita il tuo ordine...",
    speak: "Parla",
    send: "Invia",
    listening: "🎧 Ascoltando...",
    parsing: "🔎 Analizzando ordine...",
    confirming: "Confermando ordine...",
    orderSuccess: "✅ Ordine riuscito!",
    product: "Prodotto",
    quantity: "Quantità",
    size: "Taglia",
    deliverTo: "Consegnare a",
    paymentMethod: "Metodo di pagamento",
    cash: "Contanti",
    transfer: "Bonifico",
    agree: "d'accordo",
    ok: "ok",
    yes: "sì",
    cancel: "annulla",
    no: "no",
    confirmOrder:
      "Vuoi comprare {quantity} {product} taglia {size}, consegnare a {address}. Dì 'd'accordo' per confermare, o 'annulla' per annullare.",
    choosePayment: "Scegli il metodo di pagamento: 'contanti' o 'bonifico'.",
    orderCanceled: "Ordine annullato. Riprova.",
    errorProcessing: "Errore nell'elaborazione dell'ordine. Riprova.",
    redirectingPayment: "Reindirizzamento al pagamento VNPAY...",
    mute: "Silenzia",
    unmute: "Attiva audio",
    orderDetails: "Dettagli ordine",
    waitingPayment: "In attesa della selezione del metodo di pagamento...",
  },
  // Dutch
  nl: {
    quickOrder: "Snelle bestelling",
    clickMe: "🛒 Snelle bestelling - klik op mij!",
    hello: "Hallo! Wat wilt u vandaag bestellen?",
    speakOrType: "Spreek of typ uw bestelling...",
    speak: "Spreken",
    send: "Verzenden",
    listening: "🎧 Luisteren...",
    parsing: "🔎 Bestelling analyseren...",
    confirming: "Bestelling bevestigen...",
    orderSuccess: "✅ Bestelling succesvol!",
    product: "Product",
    quantity: "Hoeveelheid",
    size: "Maat",
    deliverTo: "Bezorgen bij",
    paymentMethod: "Betaalmethode",
    cash: "Contant",
    transfer: "Overschrijving",
    agree: "akkoord",
    ok: "ok",
    yes: "ja",
    cancel: "annuleren",
    no: "nee",
    confirmOrder:
      "U wilt {quantity} {product} maat {size} kopen, bezorgen bij {address}. Zeg 'akkoord' om te bevestigen, of 'annuleren' om af te breken.",
    choosePayment: "Kies betaalmethode: 'contant' of 'overschrijving'.",
    orderCanceled: "Bestelling geannuleerd. Probeer opnieuw.",
    errorProcessing: "Fout bij verwerken bestelling. Probeer opnieuw.",
    redirectingPayment: "Doorverwijzen naar VNPAY betaling...",
    mute: "Dempen",
    unmute: "Geluid aanzetten",
    orderDetails: "Bestelgegevens",
    waitingPayment: "Wachten op selectie betaalmethode...",
  },
  // Arabic
  ar: {
    quickOrder: "طلب سريع",
    clickMe: "🛒 طلب سريع - اضغط علي!",
    hello: "مرحبا! ماذا تريد أن تطلب اليوم؟",
    speakOrType: "تحدث أو اكتب طلبك...",
    speak: "تحدث",
    send: "إرسال",
    listening: "🎧 الاستماع...",
    parsing: "🔎 تحليل الطلب...",
    confirming: "تأكيد الطلب...",
    orderSuccess: "✅ تم الطلب بنجاح!",
    product: "المنتج",
    quantity: "الكمية",
    size: "الحجم",
    deliverTo: "التوصيل إلى",
    paymentMethod: "طريقة الدفع",
    cash: "نقداً",
    transfer: "تحويل بنكي",
    agree: "موافق",
    ok: "حسناً",
    yes: "نعم",
    cancel: "إلغاء",
    no: "لا",
    confirmOrder:
      "تريد شراء {quantity} {product} حجم {size}، التوصيل إلى {address}. قل 'موافق' للتأكيد، أو 'إلغاء' للإلغاء.",
    choosePayment: "اختر طريقة الدفع: 'نقداً' أو 'تحويل بنكي'.",
    orderCanceled: "تم إلغاء الطلب. حاول مرة أخرى.",
    errorProcessing: "خطأ في معالجة الطلب. حاول مرة أخرى.",
    redirectingPayment: "إعادة توجيه إلى دفع VNPAY...",
    mute: "كتم الصوت",
    unmute: "تشغيل الصوت",
    orderDetails: "تفاصيل الطلب",
    waitingPayment: "في انتظار اختيار طريقة الدفع...",
  },
};

type Language = keyof typeof translations;

// Language metadata for better UI
const languageOptions = [
  { code: "vi", flag: "🇻🇳", name: "Tiếng Việt", speechLang: "vi-VN" },
  { code: "en", flag: "🇺🇸", name: "English", speechLang: "en-US" },
  { code: "zh", flag: "🇨🇳", name: "中文", speechLang: "zh-CN" },
  { code: "es", flag: "🇪🇸", name: "Español", speechLang: "es-ES" },
  { code: "fr", flag: "🇫🇷", name: "Français", speechLang: "fr-FR" },
  { code: "de", flag: "🇩🇪", name: "Deutsch", speechLang: "de-DE" },
  { code: "ja", flag: "🇯🇵", name: "日本語", speechLang: "ja-JP" },
  { code: "ko", flag: "🇰🇷", name: "한국어", speechLang: "ko-KR" },
  { code: "pt", flag: "🇧🇷", name: "Português", speechLang: "pt-BR" },
  { code: "ru", flag: "🇷🇺", name: "Русский", speechLang: "ru-RU" },
  { code: "it", flag: "🇮🇹", name: "Italiano", speechLang: "it-IT" },
  { code: "nl", flag: "🇳🇱", name: "Nederlands", speechLang: "nl-NL" },
  { code: "ar", flag: "🇸🇦", name: "العربية", speechLang: "ar-SA" },
];

export default function VoiceQuickOrderFlexible() {
  const [voiceText, setVoiceText] = useState<string>("");
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null);
  const [step, setStep] = useState<Step>("idle");
  const [paymentMethod, setPaymentMethod] = useState<1 | 2 | null>(null); // Changed to null initially
  const [language, setLanguage] = useState<Language>("vi");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [showWidget, setShowWidget] = useState<boolean>(false);
  const [aiSpeechText, setAiSpeechText] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [pulseAnimation, setPulseAnimation] = useState<boolean>(true);

  const t = translations[language];
  const currentLangOption = languageOptions.find(
    (lang) => lang.code === language
  );

  useEffect(() => {
    if (showWidget && step === "idle") {
      speak(t.hello);
    }
  }, [showWidget, step, language]);

  // Auto pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const speak = (text: string, callback?: () => void): void => {
    if ("speechSynthesis" in window && !isMuted) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = currentLangOption?.speechLang || "vi-VN";
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
      recognition.lang = currentLangOption?.speechLang || "vi-VN";
      recognition.start();

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const response = event.results[0][0].transcript.toLowerCase();
        const yesWords = [t.agree, t.ok, t.yes].map((w) => w.toLowerCase());
        const noWords = [t.cancel, t.no].map((w) => w.toLowerCase());

        if (yesWords.some((word) => response.includes(word))) {
          resolve("yes");
        } else if (noWords.some((word) => response.includes(word))) {
          resolve("no");
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
      recognition.lang = currentLangOption?.speechLang || "vi-VN";
      recognition.start();

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const response = event.results[0][0].transcript.toLowerCase();
        if (response.includes(t.transfer.toLowerCase())) {
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
      alert("Browser doesn't support voice recognition!");
      return;
    }

    setStep("listening");
    setIsRecording(true);
    const recognition = new SpeechRecognitionConstructor();
    recognition.lang = currentLangOption?.speechLang || "vi-VN";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const text = event.results[0][0].transcript;
      setVoiceText(text);
      setIsRecording(false);
      parseOrder(text);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setStep("idle");
      setIsRecording(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const parseOrder = async (text: string): Promise<void> => {
    setStep("parsing");
    // Reset payment method when parsing new order
    setPaymentMethod(null);
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

      const confirmText = t.confirmOrder
        .replace("{quantity}", data.quantity.toString())
        .replace("{product}", data.product)
        .replace("{size}", data.size)
        .replace("{address}", data.address);

      speak(confirmText, async () => {
        const result = await waitForVoiceConfirm();
        if (result === "yes") {
          speak(t.choosePayment, async () => {
            const method = await waitForVoicePaymentMethod();
            setPaymentMethod(method);
            speak(t.confirming);
            await handleQuickOrder(data, method);
          });
        } else {
          speak(t.orderCanceled);
          setOrderInfo(null);
          setPaymentMethod(null);
          setStep("idle");
        }
      });
    } catch (error) {
      console.error("Error parsing order:", error);
      speak(t.errorProcessing);
      setStep("idle");
      setPaymentMethod(null);
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
        speak(t.redirectingPayment);
        setTimeout(() => {
          window.location.href = data.payment_url!;
        }, 2000);
      } else {
        speak(data.message || t.orderSuccess);
      }
    } catch (error) {
      console.error("Error processing order:", error);
      speak(t.errorProcessing);
      setStep("idle");
      setPaymentMethod(null);
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
    setIsRecording(false);
    setPaymentMethod(null);
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!showWidget && (
        <div className="relative flex flex-col items-center group">
          {/* Floating message */}
          <div
            className={`mb-4 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold rounded-full shadow-xl transform transition-all duration-700 ${
              pulseAnimation ? "scale-105 shadow-2xl" : "scale-100"
            }`}
            style={{
              background: "linear-gradient(135deg, #ff6b35, #f7931e, #ff8c42)",
              boxShadow: "0 8px 32px rgba(255, 107, 53, 0.4)",
            }}
          >
            {t.clickMe}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-orange-500"></div>
          </div>

          {/* Main bot button */}
          <button
            onClick={() => setShowWidget(true)}
            className={`relative rounded-full p-5 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 ${
              pulseAnimation ? "animate-pulse" : ""
            }`}
            style={{
              background:
                "linear-gradient(135deg, #ff6b35, #f7931e, #ff8c42, #e94e77)",
              boxShadow: "0 12px 40px rgba(255, 107, 53, 0.5)",
            }}
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping"></div>
            <Bot size={28} className="relative z-10" />

            {/* Floating particles */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-75"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-400 rounded-full animate-bounce delay-150"></div>
          </button>
        </div>
      )}

      {showWidget && (
        <div
          className="bg-white shadow-2xl rounded-3xl w-96 overflow-hidden transform transition-all duration-500 animate-in slide-in-from-bottom-8"
          style={{
            boxShadow: "0 25px 80px rgba(0, 0, 0, 0.15)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-full">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{t.quickOrder}</h3>
                  <p className="text-xs opacity-90">AI Assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Enhanced Language selector */}
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="bg-white bg-opacity-20 text-white text-xs rounded-lg px-2 py-1 border-none outline-none cursor-pointer hover:bg-opacity-30 transition-all"
                  style={{ direction: language === "ar" ? "rtl" : "ltr" }}
                >
                  {languageOptions.map((lang) => (
                    <option
                      key={lang.code}
                      value={lang.code}
                      className="text-black"
                    >
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>

                {/* Mute/Unmute button */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                  title={isMuted ? t.unmute : t.mute}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                {/* Close button */}
                <button
                  onClick={handleCloseWidget}
                  className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Decorative wave */}
            <div className="absolute bottom-0 left-0 right-0">
              <svg viewBox="0 0 400 20" className="w-full h-5">
                <path
                  d="M0,10 Q100,0 200,10 T400,10 L400,20 L0,20 Z"
                  fill="white"
                  opacity="0.1"
                />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div
            className="p-6 space-y-4"
            style={{ direction: language === "ar" ? "rtl" : "ltr" }}
          >
            {/* Text input */}
            <div className="relative">
              <textarea
                className="w-full rounded-2xl border-2 border-gray-200 p-4 text-sm resize-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                rows={3}
                placeholder={t.speakOrType}
                value={voiceText}
                onChange={handleTextChange}
                style={{ direction: language === "ar" ? "rtl" : "ltr" }}
              />
              {voiceText && (
                <div
                  className={`absolute top-2 ${
                    language === "ar" ? "left-2" : "right-2"
                  } text-orange-500`}
                >
                  <Package size={16} />
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={startVoice}
                disabled={isRecording}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  isRecording
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse"
                    : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg"
                }`}
                style={{
                  boxShadow: isRecording
                    ? "0 0 30px rgba(239, 68, 68, 0.5)"
                    : "0 8px 25px rgba(255, 107, 53, 0.3)",
                }}
              >
                <Mic
                  size={18}
                  className={isRecording ? "animate-bounce" : ""}
                />
                {isRecording ? "Recording..." : t.speak}
              </button>

              <button
                onClick={handleParseClick}
                disabled={!voiceText.trim()}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
                style={{
                  boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
                }}
              >
                <Send size={18} />
                {t.send}
              </button>
            </div>

            {/* Status indicator */}
            {step !== "idle" && (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
                <div className="flex-shrink-0">
                  {step === "listening" && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  )}
                  {step === "parsing" && (
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-spin"></div>
                  )}
                  {step === "confirming" && (
                    <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></div>
                  )}
                  {step === "done" && (
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  )}
                </div>
                <p className="text-sm text-gray-700 font-medium">
                  {step === "listening" && t.listening}
                  {step === "parsing" && t.parsing}
                  {step === "confirming" && t.confirming}
                  {step === "done" && t.orderSuccess}
                </p>
              </div>
            )}

            {/* Order info display */}
            {orderInfo && (
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-200 space-y-3">
                <div className="flex items-center gap-2 text-orange-600 font-semibold">
                  <ShoppingBag size={18} />
                  {t.orderDetails}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Package size={14} className="text-gray-500" />
                    <span className="text-gray-600">{t.product}:</span>
                    <span className="font-semibold text-gray-800">
                      {orderInfo.product}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gray-500" />
                    <span className="text-gray-600">{t.quantity}:</span>
                    <span className="font-semibold text-gray-800">
                      {orderInfo.quantity}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Package size={14} className="text-gray-500" />
                    <span className="text-gray-600">{t.size}:</span>
                    <span className="font-semibold text-gray-800">
                      {orderInfo.size}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <CreditCard size={14} className="text-gray-500" />
                    <span className="text-gray-600">{t.paymentMethod}:</span>
                    <span className="font-semibold text-gray-800">
                      {paymentMethod === null ? (
                        <span className="text-orange-500 animate-pulse">
                          {t.waitingPayment}
                        </span>
                      ) : paymentMethod === 1 ? (
                        t.cash
                      ) : (
                        t.transfer
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-2 border-t border-orange-200">
                  <MapPin size={14} className="text-gray-500 mt-1" />
                  <div>
                    <span className="text-gray-600 text-sm">
                      {t.deliverTo}:
                    </span>
                    <p className="font-semibold text-gray-800 text-sm">
                      {orderInfo.address}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Order result */}
            {step === "done" && orderResult && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span className="font-semibold">{orderResult.message}</span>
                </div>
              </div>
            )}

            {/* AI Speech subtitle */}
            {aiSpeechText && (
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-4 border border-yellow-200 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-yellow-800 mb-1">
                      AI Assistant
                    </p>
                    <p className="text-sm text-yellow-700">{aiSpeechText}</p>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-yellow-500 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-yellow-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1 h-1 bg-yellow-500 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
