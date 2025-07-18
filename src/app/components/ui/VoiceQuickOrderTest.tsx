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
