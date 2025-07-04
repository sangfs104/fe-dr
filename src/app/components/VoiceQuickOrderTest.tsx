// // // // // // "use client";
// // // // // // import { useState, useRef } from "react";

// // // // // // export default function VoiceQuickOrderTest() {
// // // // // //   const [voiceText, setVoiceText] = useState("");
// // // // // //   const [orderInfo, setOrderInfo] = useState<any>(null);
// // // // // //   const [orderResult, setOrderResult] = useState<any>(null);
// // // // // //   const [step, setStep] = useState<"voice" | "done">("voice");
// // // // // //   const [paymentMethod, setPaymentMethod] = useState<1 | 2>(1); // 1: COD, 2: VNPAY
// // // // // //   const recognitionRef = useRef<any>(null);

// // // // // //   // Voice to text
// // // // // //   const startVoice = () => {
// // // // // //     if (!("webkitSpeechRecognition" in window)) {
// // // // // //       alert("Trình duyệt không hỗ trợ voice!");
// // // // // //       return;
// // // // // //     }
// // // // // //     const recognition = new (window as any).webkitSpeechRecognition();
// // // // // //     recognition.lang = "vi-VN";
// // // // // //     recognition.onresult = (event: any) => {
// // // // // //       const text = event.results[0][0].transcript;
// // // // // //       setVoiceText(text);
// // // // // //     };
// // // // // //     recognition.start();
// // // // // //     recognitionRef.current = recognition;
// // // // // //   };

// // // // // //   // Text to speech
// // // // // //   const speak = (text: string) => {
// // // // // //     if ("speechSynthesis" in window) {
// // // // // //       const utter = new window.SpeechSynthesisUtterance(text);
// // // // // //       utter.lang = "vi-VN";
// // // // // //       window.speechSynthesis.speak(utter);
// // // // // //     }
// // // // // //   };

// // // // // //   // Gửi text lên API để phân tích
// // // // // //   const handleParse = async () => {
// // // // // //     if (!voiceText.trim()) return;
// // // // // //     const token = localStorage.getItem("token");
// // // // // //     const res = await fetch("http://localhost:8000/api/voice-order/parse", {
// // // // // //       method: "POST",
// // // // // //       headers: {
// // // // // //         "Content-Type": "application/json",
// // // // // //         Authorization: `Bearer ${token}`,
// // // // // //       },
// // // // // //       body: JSON.stringify({ text: voiceText }),
// // // // // //     });
// // // // // //     const data = await res.json();
// // // // // //     setOrderInfo(data);
// // // // // //     speak(
// // // // // //       `Bạn muốn mua ${data.quantity} ${data.product} size ${data.size}, giao về ${data.address}. Chọn phương thức thanh toán để xác nhận.`
// // // // // //     );
// // // // // //   };

// // // // // //   // Gửi dữ liệu lên API để tạo đơn hàng
// // // // // //   const handleQuickOrder = async () => {
// // // // // //     if (!orderInfo) return;
// // // // // //     const token = localStorage.getItem("token");
// // // // // //     const payload = {
// // // // // //       ...orderInfo,
// // // // // //       payment_id: paymentMethod,
// // // // // //     };
// // // // // //     const res = await fetch("http://localhost:8000/api/voice-order/quick", {
// // // // // //       method: "POST",
// // // // // //       headers: {
// // // // // //         "Content-Type": "application/json",
// // // // // //         Authorization: `Bearer ${token}`,
// // // // // //       },
// // // // // //       body: JSON.stringify(payload),
// // // // // //     });
// // // // // //     const data = await res.json();
// // // // // //     setOrderResult(data);
// // // // // //     setStep("done");

// // // // // //     if (paymentMethod === 2 && data.payment_url) {
// // // // // //       speak("Đang chuyển đến trang thanh toán VNPAY...");
// // // // // //       window.location.href = data.payment_url;
// // // // // //     } else {
// // // // // //       speak(data.message || "Đặt hàng thành công.");
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div
// // // // // //       style={{
// // // // // //         maxWidth: 500,
// // // // // //         margin: "40px auto",
// // // // // //         padding: 24,
// // // // // //         border: "1px solid #eee",
// // // // // //         borderRadius: 8,
// // // // // //       }}
// // // // // //     >
// // // // // //       <h2>Voice Quick Order</h2>
// // // // // //       {step === "voice" && (
// // // // // //         <>
// // // // // //           <button onClick={startVoice} style={{ marginBottom: 12 }}>
// // // // // //             🎤 Nhấn để nói đặt hàng
// // // // // //           </button>
// // // // // //           <div>
// // // // // //             <textarea
// // // // // //               rows={3}
// // // // // //               style={{ width: "100%" }}
// // // // // //               value={voiceText}
// // // // // //               onChange={(e) => setVoiceText(e.target.value)}
// // // // // //               placeholder="Hoặc nhập nội dung đặt hàng..."
// // // // // //             />
// // // // // //           </div>
// // // // // //           <button onClick={handleParse} style={{ marginTop: 8 }}>
// // // // // //             Phân tích nội dung
// // // // // //           </button>

// // // // // //           {orderInfo && (
// // // // // //             <div style={{ marginTop: 16, background: "#f8f8f8", padding: 12 }}>
// // // // // //               <div>
// // // // // //                 <b>Thông tin đơn hàng:</b>
// // // // // //                 <div>
// // // // // //                   Sản phẩm: {orderInfo.product} <br />
// // // // // //                   Số lượng: {orderInfo.quantity} <br />
// // // // // //                   Size: {orderInfo.size} <br />
// // // // // //                   Địa chỉ: {orderInfo.address}
// // // // // //                 </div>

// // // // // //                 <div style={{ marginTop: 12 }}>
// // // // // //                   <label>
// // // // // //                     Phương thức thanh toán:{" "}
// // // // // //                     <select
// // // // // //                       value={paymentMethod}
// // // // // //                       onChange={(e) =>
// // // // // //                         setPaymentMethod(parseInt(e.target.value) as 1 | 2)
// // // // // //                       }
// // // // // //                     >
// // // // // //                       <option value={1}>Thanh toán khi nhận hàng (COD)</option>
// // // // // //                       <option value={2}>Thanh toán qua VNPAY</option>
// // // // // //                     </select>
// // // // // //                   </label>
// // // // // //                 </div>

// // // // // //                 <button onClick={handleQuickOrder} style={{ marginTop: 12 }}>
// // // // // //                   Xác nhận đặt hàng
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </>
// // // // // //       )}

// // // // // //       {step === "done" && orderResult && paymentMethod === 1 && (
// // // // // //         <div style={{ marginTop: 16 }}>
// // // // // //           <b>Kết quả:</b>
// // // // // //           <div style={{ marginTop: 8 }}>{orderResult.message}</div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // }
// // // // // "use client";
// // // // // import { useState, useRef } from "react";

// // // // // export default function VoiceQuickOrderFlexible() {
// // // // //   const [voiceText, setVoiceText] = useState("");
// // // // //   const [orderInfo, setOrderInfo] = useState<any>(null);
// // // // //   const [orderResult, setOrderResult] = useState<any>(null);
// // // // //   const [step, setStep] = useState<"idle" | "listening" | "parsing" | "done">(
// // // // //     "idle"
// // // // //   );
// // // // //   const [paymentMethod] = useState<1 | 2>(1); // mặc định COD
// // // // //   const recognitionRef = useRef<any>(null);

// // // // //   const speak = (text: string, callback?: () => void) => {
// // // // //     if ("speechSynthesis" in window) {
// // // // //       const utter = new SpeechSynthesisUtterance(text);
// // // // //       utter.lang = "vi-VN";
// // // // //       utter.onend = () => callback && callback();
// // // // //       window.speechSynthesis.speak(utter);
// // // // //     }
// // // // //   };

// // // // //   const waitForVoiceConfirm = () => {
// // // // //     return new Promise<"yes" | "no">((resolve) => {
// // // // //       const recognition = new (window as any).webkitSpeechRecognition();
// // // // //       recognition.lang = "vi-VN";
// // // // //       recognition.start();

// // // // //       recognition.onresult = (event: any) => {
// // // // //         const response = event.results[0][0].transcript.toLowerCase();
// // // // //         if (
// // // // //           response.includes("đồng ý") ||
// // // // //           response.includes("oke") ||
// // // // //           response.includes("ok")
// // // // //         ) {
// // // // //           resolve("yes");
// // // // //         } else {
// // // // //           resolve("no");
// // // // //         }
// // // // //       };

// // // // //       recognition.onerror = () => resolve("no");
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
// // // // //     recognition.onresult = (event: any) => {
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

// // // // //     const data = await res.json();
// // // // //     setOrderInfo(data);

// // // // //     const confirmText = `Bạn muốn mua ${data.quantity} ${data.product} size ${data.size}, giao về ${data.address}. Nếu đúng hãy nói: Đồng ý.`;

// // // // //     speak(confirmText, async () => {
// // // // //       const result = await waitForVoiceConfirm();
// // // // //       if (result === "yes") {
// // // // //         speak("Đang xác nhận đơn hàng...");
// // // // //         await handleQuickOrder(data);
// // // // //       } else {
// // // // //         speak("Đã huỷ đơn hàng. Vui lòng thử lại.");
// // // // //         setOrderInfo(null);
// // // // //         setStep("idle");
// // // // //       }
// // // // //     });
// // // // //   };

// // // // //   const handleQuickOrder = async (orderData: any) => {
// // // // //     const token = localStorage.getItem("token");
// // // // //     const payload = {
// // // // //       ...orderData,
// // // // //       payment_id: paymentMethod,
// // // // //     };

// // // // //     const res = await fetch("http://localhost:8000/api/voice-order/quick", {
// // // // //       method: "POST",
// // // // //       headers: {
// // // // //         "Content-Type": "application/json",
// // // // //         Authorization: `Bearer ${token}`,
// // // // //       },
// // // // //       body: JSON.stringify(payload),
// // // // //     });

// // // // //     const data = await res.json();
// // // // //     setOrderResult(data);
// // // // //     setStep("done");

// // // // //     if (paymentMethod === 2 && data.payment_url) {
// // // // //       speak("Đang chuyển đến trang thanh toán VNPAY...");
// // // // //       window.location.href = data.payment_url;
// // // // //     } else {
// // // // //       speak(data.message || "Đặt hàng thành công.");
// // // // //     }
// // // // //   };

// // // // //   const handleSubmitManual = () => {
// // // // //     if (voiceText.trim()) {
// // // // //       parseOrder(voiceText);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div
// // // // //       style={{
// // // // //         maxWidth: 500,
// // // // //         margin: "40px auto",
// // // // //         padding: 24,
// // // // //         border: "1px solid #eee",
// // // // //         borderRadius: 8,
// // // // //       }}
// // // // //     >
// // // // //       <h2>🛍 Đặt hàng bằng giọng nói hoặc nhập tay</h2>

// // // // //       {step === "idle" && (
// // // // //         <>
// // // // //           <button onClick={startVoice} style={{ marginBottom: 12 }}>
// // // // //             🎤 Nhấn để nói nội dung đặt hàng
// // // // //           </button>

// // // // //           <textarea
// // // // //             rows={3}
// // // // //             style={{ width: "100%" }}
// // // // //             placeholder="Hoặc nhập nội dung đặt hàng ở đây..."
// // // // //             value={voiceText}
// // // // //             onChange={(e) => setVoiceText(e.target.value)}
// // // // //           />

// // // // //           <button
// // // // //             onClick={handleSubmitManual}
// // // // //             style={{ marginTop: 12 }}
// // // // //             disabled={!voiceText.trim()}
// // // // //           >
// // // // //             📤 Gửi nội dung để phân tích
// // // // //           </button>
// // // // //         </>
// // // // //       )}

// // // // //       {step === "listening" && <p>🎧 Đang nghe giọng nói...</p>}
// // // // //       {step === "parsing" && <p>🔎 Đang phân tích đơn hàng...</p>}

// // // // //       {step === "done" && orderResult && (
// // // // //         <div style={{ marginTop: 20 }}>
// // // // //           <b>✅ Kết quả:</b>
// // // // //           <div style={{ marginTop: 8 }}>{orderResult.message}</div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // "use client";
// // // // import { useState, useRef } from "react";

// // // // export default function VoiceQuickOrderFlexible() {
// // // //   const [voiceText, setVoiceText] = useState("");
// // // //   const [orderInfo, setOrderInfo] = useState<any>(null);
// // // //   const [orderResult, setOrderResult] = useState<any>(null);
// // // //   const [step, setStep] = useState<
// // // //     "idle" | "listening" | "parsing" | "confirming" | "done"
// // // //   >("idle");
// // // //   const [paymentMethod, setPaymentMethod] = useState<1 | 2>(1); // 1: COD, 2: VNPAY
// // // //   const recognitionRef = useRef<any>(null);

// // // //   const speak = (text: string, callback?: () => void) => {
// // // //     if ("speechSynthesis" in window) {
// // // //       const utter = new SpeechSynthesisUtterance(text);
// // // //       utter.lang = "vi-VN";
// // // //       utter.onend = () => callback && callback();
// // // //       window.speechSynthesis.speak(utter);
// // // //     }
// // // //   };

// // // //   const waitForVoiceConfirm = () => {
// // // //     return new Promise<"yes" | "no">((resolve) => {
// // // //       const recognition = new (window as any).webkitSpeechRecognition();
// // // //       recognition.lang = "vi-VN";
// // // //       recognition.start();

// // // //       recognition.onresult = (event: any) => {
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

// // // //   const startVoice = () => {
// // // //     if (!("webkitSpeechRecognition" in window)) {
// // // //       alert("Trình duyệt không hỗ trợ voice!");
// // // //       return;
// // // //     }
// // // //     setStep("listening");
// // // //     const recognition = new (window as any).webkitSpeechRecognition();
// // // //     recognition.lang = "vi-VN";
// // // //     recognition.onresult = (event: any) => {
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

// // // //     const data = await res.json();
// // // //     setOrderInfo(data);
// // // //     setStep("confirming");

// // // //     const confirmText = `Bạn muốn mua ${data.quantity} ${data.product} size ${data.size}, giao về ${data.address}. Nói \"Đồng ý\" để xác nhận, hoặc \"không\" để hủy.`;

// // // //     speak(confirmText, async () => {
// // // //       const result = await waitForVoiceConfirm();
// // // //       if (result === "yes") {
// // // //         speak('Chọn phương thức thanh toán: "COD" hoặc "VNPAY".', async () => {
// // // //           const method = await waitForVoiceConfirm();
// // // //           setPaymentMethod(method === "yes" ? 1 : 2); // tạm coi "yes" là COD, "no" là VNPAY
// // // //           speak("Xác nhận đặt hàng...");
// // // //           await handleQuickOrder(data, method === "yes" ? 1 : 2);
// // // //         });
// // // //       } else {
// // // //         speak("Đã huỷ đơn hàng. Vui lòng thử lại.");
// // // //         setOrderInfo(null);
// // // //         setStep("idle");
// // // //       }
// // // //     });
// // // //   };

// // // //   const handleQuickOrder = async (orderData: any, method: 1 | 2) => {
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

// // // //     const data = await res.json();
// // // //     setOrderResult(data);
// // // //     setStep("done");

// // // //     if (method === 2 && data.payment_url) {
// // // //       speak("Đang chuyển đến trang thanh toán VNPAY...");
// // // //       window.location.href = data.payment_url;
// // // //     } else {
// // // //       speak(data.message || "Đặt hàng thành công.");
// // // //     }
// // // //   };

// // // //   const handleSubmitManual = () => {
// // // //     if (voiceText.trim()) {
// // // //       parseOrder(voiceText);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         maxWidth: 500,
// // // //         margin: "40px auto",
// // // //         padding: 24,
// // // //         border: "1px solid #eee",
// // // //         borderRadius: 8,
// // // //       }}
// // // //     >
// // // //       <h2>🏣 Đặt hàng bằng giọng nói hoặc nhập tay</h2>

// // // //       {step === "idle" && (
// // // //         <>
// // // //           <button onClick={startVoice} style={{ marginBottom: 12 }}>
// // // //             🎤 Nhấn để nói nội dung đặt hàng
// // // //           </button>

// // // //           <textarea
// // // //             rows={3}
// // // //             style={{ width: "100%" }}
// // // //             placeholder="Hoặc nhập nội dung đặt hàng ở đây..."
// // // //             value={voiceText}
// // // //             onChange={(e) => setVoiceText(e.target.value)}
// // // //           />

// // // //           <button
// // // //             onClick={handleSubmitManual}
// // // //             style={{ marginTop: 12 }}
// // // //             disabled={!voiceText.trim()}
// // // //           >
// // // //             📤 Gửi nội dung để phân tích
// // // //           </button>
// // // //         </>
// // // //       )}

// // // //       {step === "listening" && <p>🎧 Đang nghe giọng nói...</p>}
// // // //       {step === "parsing" && <p>🔎 Đang phân tích đơn hàng...</p>}

// // // //       {step === "done" && orderResult && (
// // // //         <div style={{ marginTop: 20 }}>
// // // //           <b>✅ Kết quả:</b>
// // // //           <div style={{ marginTop: 8 }}>{orderResult.message}</div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // // "use client";
// // // // import { useState, useRef } from "react";

// // // // export default function VoiceQuickOrderFlexible() {
// // // //   const [voiceText, setVoiceText] = useState("");
// // // //   const [orderInfo, setOrderInfo] = useState<any>(null);
// // // //   const [orderResult, setOrderResult] = useState<any>(null);
// // // //   const [step, setStep] = useState<
// // // //     "idle" | "listening" | "parsing" | "confirming" | "done"
// // // //   >("idle");
// // // //   const [paymentMethod, setPaymentMethod] = useState<1 | 2>(1); // 1: COD, 2: VNPAY
// // // //   const recognitionRef = useRef<any>(null);

// // // //   const speak = (text: string, callback?: () => void) => {
// // // //     if ("speechSynthesis" in window) {
// // // //       const utter = new SpeechSynthesisUtterance(text);
// // // //       utter.lang = "vi-VN";
// // // //       utter.onend = () => callback && callback();
// // // //       window.speechSynthesis.speak(utter);
// // // //     }
// // // //   };

// // // //   const waitForVoiceConfirm = () => {
// // // //     return new Promise<"yes" | "no">((resolve) => {
// // // //       const recognition = new (window as any).webkitSpeechRecognition();
// // // //       recognition.lang = "vi-VN";
// // // //       recognition.start();

// // // //       recognition.onresult = (event: any) => {
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

// // // //   const waitForVoicePaymentMethod = () => {
// // // //     return new Promise<1 | 2>((resolve) => {
// // // //       const recognition = new (window as any).webkitSpeechRecognition();
// // // //       recognition.lang = "vi-VN";
// // // //       recognition.start();

// // // //       recognition.onresult = (event: any) => {
// // // //         const response = event.results[0][0].transcript.toLowerCase();
// // // //         if (response.includes("tiền mặt")) {
// // // //           resolve(1); // COD
// // // //         } else if (response.includes("chuyển khoản")) {
// // // //           resolve(2); // VNPAY
// // // //         } else {
// // // //           resolve(1); // default to COD
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
// // // //     const recognition = new (window as any).webkitSpeechRecognition();
// // // //     recognition.lang = "vi-VN";
// // // //     recognition.onresult = (event: any) => {
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

// // // //     const data = await res.json();
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

// // // //   const handleQuickOrder = async (orderData: any, method: 1 | 2) => {
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

// // // //     const data = await res.json();
// // // //     setOrderResult(data);
// // // //     setStep("done");

// // // //     if (method === 2 && data.payment_url) {
// // // //       speak("Đang chuyển đến trang thanh toán VNPAY...");
// // // //       window.location.href = data.payment_url;
// // // //     } else {
// // // //       speak(data.message || "Đặt hàng thành công.");
// // // //     }
// // // //   };

// // // //   const handleSubmitManual = () => {
// // // //     if (voiceText.trim()) {
// // // //       parseOrder(voiceText);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div
// // // //       style={{
// // // //         maxWidth: 500,
// // // //         margin: "40px auto",
// // // //         padding: 24,
// // // //         border: "1px solid #eee",
// // // //         borderRadius: 8,
// // // //       }}
// // // //     >
// // // //       <h2>🏣 Đặt hàng bằng giọng nói hoặc nhập tay</h2>

// // // //       {step === "idle" && (
// // // //         <>
// // // //           <button onClick={startVoice} style={{ marginBottom: 12 }}>
// // // //             🎤 Nhấn để nói nội dung đặt hàng
// // // //           </button>

// // // //           <textarea
// // // //             rows={3}
// // // //             style={{ width: "100%" }}
// // // //             placeholder="Hoặc nhập nội dung đặt hàng ở đây..."
// // // //             value={voiceText}
// // // //             onChange={(e) => setVoiceText(e.target.value)}
// // // //           />

// // // //           <button
// // // //             onClick={handleSubmitManual}
// // // //             style={{ marginTop: 12 }}
// // // //             disabled={!voiceText.trim()}
// // // //           >
// // // //             📤 Gửi nội dung để phân tích
// // // //           </button>
// // // //         </>
// // // //       )}

// // // //       {step === "listening" && <p>🎧 Đang nghe giọng nói...</p>}
// // // //       {step === "parsing" && <p>🔎 Đang phân tích đơn hàng...</p>}

// // // //       {step === "done" && orderResult && (
// // // //         <div style={{ marginTop: 20 }}>
// // // //           <b>✅ Kết quả:</b>
// // // //           <div style={{ marginTop: 8 }}>{orderResult.message}</div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }

// // // "use client";
// // // import { useState, useRef } from "react";
// // // import { Bot, Mic, SendHorizonal, Loader2, CheckCircle2 } from "lucide-react";
// // // import Image from "next/image";

// // // export default function VoiceQuickOrderFlexible() {
// // //   const [voiceText, setVoiceText] = useState("");
// // //   const [orderInfo, setOrderInfo] = useState<any>(null);
// // //   const [orderResult, setOrderResult] = useState<any>(null);
// // //   const [step, setStep] = useState<
// // //     "idle" | "listening" | "parsing" | "confirming" | "done"
// // //   >("idle");
// // //   const [paymentMethod, setPaymentMethod] = useState<1 | 2>(1); // 1: COD, 2: VNPAY
// // //   const recognitionRef = useRef<any>(null);

// // //   const speak = (text: string, callback?: () => void) => {
// // //     if ("speechSynthesis" in window) {
// // //       const utter = new SpeechSynthesisUtterance(text);
// // //       utter.lang = "vi-VN";
// // //       utter.onend = () => callback && callback();
// // //       window.speechSynthesis.speak(utter);
// // //     }
// // //   };

// // //   const waitForVoiceConfirm = () => {
// // //     return new Promise<"yes" | "no">((resolve) => {
// // //       const recognition = new (window as any).webkitSpeechRecognition();
// // //       recognition.lang = "vi-VN";
// // //       recognition.start();
// // //       recognition.onresult = (event: any) => {
// // //         const response = event.results[0][0].transcript.toLowerCase();
// // //         if (response.includes("đồng ý") || response.includes("ok"))
// // //           resolve("yes");
// // //         else resolve("no");
// // //       };
// // //       recognition.onerror = () => resolve("no");
// // //     });
// // //   };

// // //   const waitForVoicePaymentMethod = () => {
// // //     return new Promise<1 | 2>((resolve) => {
// // //       const recognition = new (window as any).webkitSpeechRecognition();
// // //       recognition.lang = "vi-VN";
// // //       recognition.start();
// // //       recognition.onresult = (event: any) => {
// // //         const response = event.results[0][0].transcript.toLowerCase();
// // //         if (response.includes("tiền mặt")) resolve(1);
// // //         else if (response.includes("chuyển khoản")) resolve(2);
// // //         else resolve(1);
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
// // //     recognition.onresult = (event: any) => {
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
// // //     const data = await res.json();
// // //     setOrderInfo(data);
// // //     setStep("confirming");

// // //     const confirmText = `Bạn muốn mua ${data.quantity} ${data.product} size ${data.size}, giao về ${data.address}. Nói \"Đồng ý\" để xác nhận.`;
// // //     speak(confirmText, async () => {
// // //       const result = await waitForVoiceConfirm();
// // //       if (result === "yes") {
// // //         speak(
// // //           "Chọn phương thức thanh toán: thanh toán bằng tiền mặt hoặc chuyển khoản.",
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

// // //   const handleQuickOrder = async (orderData: any, method: 1 | 2) => {
// // //     const token = localStorage.getItem("token");
// // //     const payload = { ...orderData, payment_id: method };
// // //     const res = await fetch("http://localhost:8000/api/voice-order/quick", {
// // //       method: "POST",
// // //       headers: {
// // //         "Content-Type": "application/json",
// // //         Authorization: `Bearer ${token}`,
// // //       },
// // //       body: JSON.stringify(payload),
// // //     });
// // //     const data = await res.json();
// // //     setOrderResult(data);
// // //     setStep("done");
// // //     if (method === 2 && data.payment_url) {
// // //       speak("Đang chuyển đến trang thanh toán VNPAY...");
// // //       window.location.href = data.payment_url;
// // //     } else {
// // //       speak(data.message || "Đặt hàng thành công.");
// // //     }
// // //   };

// // //   const handleSubmitManual = () => {
// // //     if (voiceText.trim()) parseOrder(voiceText);
// // //   };

// // //   return (
// // //     <div className="max-w-md mx-auto mt-10 p-6 bg-zinc-900 text-white rounded-2xl shadow-2xl border border-zinc-700">
// // //       <div className="flex items-center gap-3 mb-4">
// // //         <Image
// // //           src="/robot-ai.png"
// // //           alt="AI bot"
// // //           width={40}
// // //           height={40}
// // //           className="rounded-full"
// // //         />
// // //         <h2 className="text-xl font-semibold">
// // //           🤖 Trợ lý AI - Đặt hàng thông minh
// // //         </h2>
// // //       </div>

// // //       {step === "idle" && (
// // //         <>
// // //           <button
// // //             onClick={startVoice}
// // //             className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl mb-4"
// // //           >
// // //             <Mic size={18} /> Nhấn để nói đơn hàng
// // //           </button>
// // //           <textarea
// // //             rows={3}
// // //             className="w-full p-3 text-black rounded-xl"
// // //             placeholder="Hoặc nhập nội dung đơn hàng ở đây..."
// // //             value={voiceText}
// // //             onChange={(e) => setVoiceText(e.target.value)}
// // //           />
// // //           <button
// // //             onClick={handleSubmitManual}
// // //             className="w-full mt-3 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl"
// // //             disabled={!voiceText.trim()}
// // //           >
// // //             <SendHorizonal size={18} /> Gửi để phân tích
// // //           </button>
// // //         </>
// // //       )}

// // //       {step === "listening" && (
// // //         <p className="text-yellow-400 flex items-center gap-2 mt-4">
// // //           <Loader2 className="animate-spin" /> Đang nghe giọng nói...
// // //         </p>
// // //       )}
// // //       {step === "parsing" && (
// // //         <p className="text-blue-400 flex items-center gap-2 mt-4">
// // //           <Loader2 className="animate-spin" /> Phân tích nội dung đơn hàng...
// // //         </p>
// // //       )}
// // //       {step === "done" && orderResult && (
// // //         <div className="mt-6">
// // //           <div className="flex items-center gap-2 text-green-400 font-semibold">
// // //             <CheckCircle2 /> Đặt hàng thành công!
// // //           </div>
// // //           <p className="mt-2 text-sm text-zinc-300">{orderResult.message}</p>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }
// // "use client";
// // import { useState, useRef } from "react";

// // export default function VoiceQuickOrderFlexible() {
// //   const [voiceText, setVoiceText] = useState("");
// //   const [orderInfo, setOrderInfo] = useState<any>(null);
// //   const [orderResult, setOrderResult] = useState<any>(null);
// //   const [step, setStep] = useState<
// //     "idle" | "listening" | "parsing" | "confirming" | "done"
// //   >("idle");
// //   const [paymentMethod, setPaymentMethod] = useState<1 | 2>(1); // 1: COD, 2: VNPAY
// //   const recognitionRef = useRef<any>(null);

// //   const speak = (text: string, callback?: () => void) => {
// //     if ("speechSynthesis" in window) {
// //       const utter = new SpeechSynthesisUtterance(text);
// //       utter.lang = "vi-VN";
// //       utter.onend = () => callback && callback();
// //       window.speechSynthesis.speak(utter);
// //     }
// //   };

// //   const waitForVoiceConfirm = () => {
// //     return new Promise<"yes" | "no">((resolve) => {
// //       const recognition = new (window as any).webkitSpeechRecognition();
// //       recognition.lang = "vi-VN";
// //       recognition.start();

// //       recognition.onresult = (event: any) => {
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

// //   const waitForVoicePaymentMethod = () => {
// //     return new Promise<1 | 2>((resolve) => {
// //       const recognition = new (window as any).webkitSpeechRecognition();
// //       recognition.lang = "vi-VN";
// //       recognition.start();

// //       recognition.onresult = (event: any) => {
// //         const response = event.results[0][0].transcript.toLowerCase();
// //         if (response.includes("tiền mặt")) {
// //           resolve(1); // COD
// //         } else if (response.includes("chuyển khoản")) {
// //           resolve(2); // VNPAY
// //         } else {
// //           resolve(1); // default to COD
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
// //     recognition.onresult = (event: any) => {
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

// //     const data = await res.json();
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

// //   const handleQuickOrder = async (orderData: any, method: 1 | 2) => {
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

// //     const data = await res.json();
// //     setOrderResult(data);
// //     setStep("done");

// //     if (method === 2 && data.payment_url) {
// //       speak("Đang chuyển đến trang thanh toán VNPAY...");
// //       window.location.href = data.payment_url;
// //     } else {
// //       speak(data.message || "Đặt hàng thành công.");
// //     }
// //   };

// //   const handleSubmitManual = () => {
// //     if (voiceText.trim()) {
// //       parseOrder(voiceText);
// //     }
// //   };

// //   return (
// //     <div
// //       style={{
// //         maxWidth: 500,
// //         margin: "40px auto",
// //         padding: 24,
// //         border: "1px solid #eee",
// //         borderRadius: 8,
// //       }}
// //     >
// //       <h2>🏣 Đặt hàng bằng giọng nói hoặc nhập tay</h2>

// //       {step === "idle" && (
// //         <>
// //           <button onClick={startVoice} style={{ marginBottom: 12 }}>
// //             🎤 Nhấn để nói nội dung đặt hàng
// //           </button>

// //           <textarea
// //             rows={3}
// //             style={{ width: "100%" }}
// //             placeholder="Hoặc nhập nội dung đặt hàng ở đây..."
// //             value={voiceText}
// //             onChange={(e) => setVoiceText(e.target.value)}
// //           />

// //           <button
// //             onClick={handleSubmitManual}
// //             style={{ marginTop: 12 }}
// //             disabled={!voiceText.trim()}
// //           >
// //             📤 Gửi nội dung để phân tích
// //           </button>
// //         </>
// //       )}

// //       {step === "listening" && <p>🎧 Đang nghe giọng nói...</p>}
// //       {step === "parsing" && <p>🔎 Đang phân tích đơn hàng...</p>}

// //       {step === "done" && orderResult && (
// //         <div style={{ marginTop: 20 }}>
// //           <b>✅ Kết quả:</b>
// //           <div style={{ marginTop: 8 }}>{orderResult.message}</div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Bot, Mic, Send } from "lucide-react";
// import { motion } from "framer-motion";

// export default function VoiceQuickOrderFlexible() {
//   const [voiceText, setVoiceText] = useState("");
//   const [orderInfo, setOrderInfo] = useState<any>(null);
//   const [orderResult, setOrderResult] = useState<any>(null);
//   const [step, setStep] = useState<
//     "idle" | "listening" | "parsing" | "confirming" | "done"
//   >("idle");
//   const [paymentMethod, setPaymentMethod] = useState<1 | 2>(1);
//   const recognitionRef = useRef<any>(null);
//   const [showWidget, setShowWidget] = useState(false);

//   useEffect(() => {
//     if (showWidget && step === "idle") {
//       speak("Xin chào! Bạn muốn đặt món gì hôm nay?");
//     }
//   }, [showWidget]);

//   const speak = (text: string, callback?: () => void) => {
//     if ("speechSynthesis" in window) {
//       const utter = new SpeechSynthesisUtterance(text);
//       utter.lang = "vi-VN";
//       utter.onend = () => callback && callback();
//       window.speechSynthesis.speak(utter);
//     }
//   };

//   const waitForVoiceConfirm = () => {
//     return new Promise<"yes" | "no">((resolve) => {
//       const recognition = new (window as any).webkitSpeechRecognition();
//       recognition.lang = "vi-VN";
//       recognition.start();

//       recognition.onresult = (event: any) => {
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

//   const waitForVoicePaymentMethod = () => {
//     return new Promise<1 | 2>((resolve) => {
//       const recognition = new (window as any).webkitSpeechRecognition();
//       recognition.lang = "vi-VN";
//       recognition.start();

//       recognition.onresult = (event: any) => {
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
//     const recognition = new (window as any).webkitSpeechRecognition();
//     recognition.lang = "vi-VN";
//     recognition.onresult = (event: any) => {
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

//     const data = await res.json();
//     setOrderInfo(data);
//     setStep("confirming");

//     const confirmText = `Bạn muốn mua ${data.quantity} ${data.product} size ${data.size}, giao về ${data.address}. Nói \"Đồng ý\" để xác nhận, hoặc \"không\" để hủy.`;

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

//   const handleQuickOrder = async (orderData: any, method: 1 | 2) => {
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

//     const data = await res.json();
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
//         <button
//           className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-4 shadow-lg text-white hover:scale-105 transition"
//           onClick={() => setShowWidget(true)}
//         >
//           <Bot size={24} />
//         </button>
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
//         </motion.div>
//       )}
//     </motion.div>
//   );
// }
"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Mic, Send } from "lucide-react";
import { motion } from "framer-motion";

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

  useEffect(() => {
    if (showWidget && step === "idle") {
      speak("Xin chào! Bạn muốn đặt món gì hôm nay?");
    }
  }, [showWidget, step]);

  const speak = (text: string, callback?: () => void) => {
    if ("speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "vi-VN";
      utter.onend = () => callback && callback();
      window.speechSynthesis.speak(utter);
    }
  };

  const waitForVoiceConfirm = (): Promise<"yes" | "no"> => {
    return new Promise((resolve) => {
      const recognition = new (window as any).webkitSpeechRecognition();
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
      const recognition = new (window as any).webkitSpeechRecognition();
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

  const startVoice = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Trình duyệt không hỗ trợ voice!");
      return;
    }

    setStep("listening");
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "vi-VN";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const text = event.results[0][0].transcript;
      setVoiceText(text);
      parseOrder(text);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const parseOrder = async (text: string) => {
    setStep("parsing");
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:8000/api/voice-order/parse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });

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
  };

  const handleQuickOrder = async (orderData: OrderInfo, method: 1 | 2) => {
    const token = localStorage.getItem("token");
    const payload = {
      ...orderData,
      payment_id: method,
    };

    const res = await fetch("http://localhost:8000/api/voice-order/quick", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data: OrderResult = await res.json();
    setOrderResult(data);
    setStep("done");

    if (method === 2 && data.payment_url) {
      speak("Đang chuyển đến trang thanh toán VNPAY...");
      window.location.href = data.payment_url;
    } else {
      speak(data.message || "Đặt hàng thành công.");
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, top: 0, right: 500, bottom: 800 }}
      className="fixed bottom-20 right-4 z-50"
    >
      {!showWidget && (
        <button
          className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-4 shadow-lg text-white hover:scale-105 transition"
          onClick={() => setShowWidget(true)}
        >
          <Bot size={24} />
        </button>
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
              onClick={() => setShowWidget(false)}
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
            onChange={(e) => setVoiceText(e.target.value)}
          />

          <div className="flex gap-2">
            <button
              onClick={startVoice}
              className="flex-1 flex items-center justify-center gap-1 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              <Mic size={16} /> Nói
            </button>
            <button
              onClick={() => parseOrder(voiceText)}
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
        </motion.div>
      )}
    </motion.div>
  );
}
