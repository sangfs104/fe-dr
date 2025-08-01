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
  DollarSign,
  Truck,
  Calculator,
  CheckCircle,
  ArrowDown,
  Sparkles,
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
  order_id?: number;
  product_name?: string;
  quantity?: number;
  size?: string;
  unit_price?: string;
  subtotal?: string;
  shipping_fee?: string;
  total_amount?: string;
  address?: string;
  payment_method?: string;
  message: string;
  payment_url?: string;
  vnp_TxnRef?: string;
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
    parsing: " Đang phân tích đơn hàng...",
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
    unitPrice: "Đơn giá",
    subtotal: "Tạm tính",
    shippingFee: "Phí ship",
    totalAmount: "Tổng cộng",
    priceBreakdown: "Chi tiết giá",
    orderSummary: "Tóm tắt đơn hàng",
    newOrder: "Đặt hàng mới",
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
    parsing: " Analyzing order...",
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
    unitPrice: "Unit Price",
    subtotal: "Subtotal",
    shippingFee: "Shipping Fee",
    totalAmount: "Total Amount",
    priceBreakdown: "Price Breakdown",
    orderSummary: "Order Summary",
    newOrder: "New Order",
  },
};

type Language = keyof typeof translations;

// Language metadata for better UI
const languageOptions = [
  { code: "vi", flag: "🇻🇳", name: "Tiếng Việt", speechLang: "vi-VN" },
  { code: "en", flag: "🇺🇸", name: "English", speechLang: "en-US" },
];

export default function VoiceQuickOrderFlexible() {
  const [voiceText, setVoiceText] = useState<string>("");
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null);
  const [step, setStep] = useState<Step>("idle");
  const [paymentMethod, setPaymentMethod] = useState<1 | 2 | null>(null);
  const [language, setLanguage] = useState<Language>("vi");
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [showWidget, setShowWidget] = useState<boolean>(false);
  const [aiSpeechText, setAiSpeechText] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [pulseAnimation, setPulseAnimation] = useState<boolean>(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState<boolean>(
    false
  );
  const [canScrollUp, setCanScrollUp] = useState<boolean>(false);
  const [canScrollDown, setCanScrollDown] = useState<boolean>(false);

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

  // Auto-scroll to bottom when new content appears
  useEffect(() => {
    if (
      scrollContainerRef.current &&
      (orderInfo || orderResult || step !== "idle")
    ) {
      const container = scrollContainerRef.current;
      const scrollToBottom = () => {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      };

      // Small delay to ensure content is rendered
      setTimeout(scrollToBottom, 100);
    }
  }, [orderInfo, orderResult, step, aiSpeechText]);

  // Check scroll position to show indicators
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const { scrollTop, scrollHeight, clientHeight } = container;

      setCanScrollUp(scrollTop > 50);
      setCanScrollDown(scrollTop < scrollHeight - clientHeight - 50);
      setShowScrollIndicator(scrollHeight > clientHeight);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      // Initial check
      setTimeout(checkScrollPosition, 100);

      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, [showWidget]);

  // Auto-scroll functions
  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

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

  const handleNewOrder = (): void => {
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
          {/* Floating message with modern gradient */}
          <div
            className={`mb-4 px-6 py-3 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 text-white text-sm font-bold rounded-full shadow-2xl transform transition-all duration-700 backdrop-blur-sm ${
              pulseAnimation ? "scale-105 shadow-purple-500/50" : "scale-100"
            }`}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 20px 40px rgba(102, 126, 234, 0.4)",
            }}
          >
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="animate-pulse" />
              {t.clickMe}
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent border-t-purple-500"></div>
          </div>

          {/* Main bot button with modern glassmorphism */}
          <button
            onClick={() => setShowWidget(true)}
            className={`relative rounded-full p-6 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 text-white shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 backdrop-blur-lg ${
              pulseAnimation ? "animate-pulse" : ""
            }`}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 25px 50px rgba(102, 126, 234, 0.4)",
            }}
          >
            <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping"></div>
            <Bot size={32} className="relative z-10" />

            {/* Modern floating particles */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce delay-75 shadow-lg"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-bounce delay-150 shadow-lg"></div>
            <div className="absolute top-1/2 -right-3 w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-bounce delay-300 shadow-lg"></div>
          </button>
        </div>
      )}

      {showWidget && (
        <div
          className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl w-96 max-h-[80vh] overflow-hidden transform transition-all duration-500 animate-in slide-in-from-bottom-8 border border-white/20"
          style={{
            boxShadow: "0 25px 80px rgba(102, 126, 234, 0.2)",
          }}
        >
          {/* Fixed Header with glassmorphism */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 p-6 text-white relative overflow-hidden sticky top-0 z-10">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
            <div className="relative z-10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{t.quickOrder}</h3>
                  <p className="text-xs opacity-90 flex items-center gap-1">
                    <Sparkles size={12} />
                    AI Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Language selector with modern styling */}
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="bg-white/20 backdrop-blur-sm text-white text-xs rounded-xl px-3 py-2 border border-white/30 outline-none cursor-pointer hover:bg-white/30 transition-all duration-300"
                >
                  {languageOptions.map((lang) => (
                    <option
                      key={lang.code}
                      value={lang.code}
                      className="text-black bg-white"
                    >
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>

                {/* Mute/Unmute button */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30"
                  title={isMuted ? t.unmute : t.mute}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                {/* Close button */}
                <button
                  onClick={handleCloseWidget}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modern wave decoration */}
            <div className="absolute bottom-0 left-0 right-0">
              <svg viewBox="0 0 400 20" className="w-full h-5">
                <defs>
                  <linearGradient
                    id="waveGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="rgba(255,255,255,0.2)" />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,10 Q100,0 200,10 T400,10 L400,20 L0,20 Z"
                  fill="url(#waveGradient)"
                />
              </svg>
            </div>
          </div>

          {/* Scrollable Content with scroll indicators */}
          <div className="relative">
            {/* Scroll Up Indicator */}
            {showScrollIndicator && canScrollUp && (
              <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none">
                <div className="bg-gradient-to-b from-white via-white/80 to-transparent h-8 flex items-center justify-center">
                  <button
                    onClick={scrollToTop}
                    className="pointer-events-auto bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
                  >
                    <ArrowDown
                      size={16}
                      className="text-purple-500 rotate-180"
                    />
                  </button>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div
              ref={scrollContainerRef}
              className="max-h-[calc(80vh-140px)] overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent scroll-smooth"
              onScroll={checkScrollPosition}
            >
              {/* Text input with modern styling */}
              <div className="relative">
                <textarea
                  className="w-full rounded-2xl border-2 border-purple-200/50 bg-white/80 backdrop-blur-sm p-4 text-sm resize-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 placeholder-gray-500"
                  rows={3}
                  placeholder={t.speakOrType}
                  value={voiceText}
                  onChange={handleTextChange}
                />
                {voiceText && (
                  <div className="absolute top-3 right-3 text-purple-500 animate-pulse">
                    <Package size={16} />
                  </div>
                )}
              </div>

              {/* Action buttons with modern gradients */}
              <div className="flex gap-3">
                <button
                  onClick={startVoice}
                  disabled={isRecording}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 backdrop-blur-sm ${
                    isRecording
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse shadow-red-500/50"
                      : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg shadow-purple-500/30"
                  }`}
                  style={{
                    boxShadow: isRecording
                      ? "0 0 30px rgba(239, 68, 68, 0.5)"
                      : "0 8px 25px rgba(139, 92, 246, 0.3)",
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
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 rounded-2xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95"
                  style={{
                    boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
                  }}
                >
                  <Send size={18} />
                  {t.send}
                </button>
              </div>

              {/* Status indicator with modern animations */}
              {step !== "idle" && (
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 backdrop-blur-sm animate-in slide-in-from-left-5">
                  <div className="flex-shrink-0">
                    {step === "listening" && (
                      <div className="relative">
                        <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-30"></div>
                      </div>
                    )}
                    {step === "parsing" && (
                      <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {step === "confirming" && (
                      <div className="w-4 h-4 bg-orange-500 rounded-full animate-bounce"></div>
                    )}
                    {step === "done" && (
                      <CheckCircle
                        size={16}
                        className="text-green-500 animate-in zoom-in-75"
                      />
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

              {/* Order info display with modern card design */}
              {orderInfo && (
                <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-5 border border-orange-200/50 backdrop-blur-sm space-y-4 animate-in slide-in-from-bottom-5">
                  <div className="flex items-center gap-3 text-orange-600 font-semibold">
                    <div className="p-2 bg-orange-100 rounded-full">
                      <ShoppingBag size={18} />
                    </div>
                    {t.orderDetails}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 p-3 bg-white/60 rounded-xl backdrop-blur-sm">
                      <Package size={14} className="text-gray-500" />
                      <div>
                        <span className="text-gray-600 block text-xs">
                          {t.product}:
                        </span>
                        <span className="font-semibold text-gray-800">
                          {orderInfo.product}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-white/60 rounded-xl backdrop-blur-sm">
                      <Clock size={14} className="text-gray-500" />
                      <div>
                        <span className="text-gray-600 block text-xs">
                          {t.quantity}:
                        </span>
                        <span className="font-semibold text-gray-800">
                          {orderInfo.quantity}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-white/60 rounded-xl backdrop-blur-sm">
                      <Package size={14} className="text-gray-500" />
                      <div>
                        <span className="text-gray-600 block text-xs">
                          {t.size}:
                        </span>
                        <span className="font-semibold text-gray-800">
                          {orderInfo.size}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-white/60 rounded-xl backdrop-blur-sm">
                      <CreditCard size={14} className="text-gray-500" />
                      <div>
                        <span className="text-gray-600 block text-xs">
                          {t.paymentMethod}:
                        </span>
                        <span className="font-semibold text-gray-800">
                          {paymentMethod === null ? (
                            <span className="text-orange-500 animate-pulse flex items-center gap-1">
                              <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
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
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-white/60 rounded-xl backdrop-blur-sm border-t border-orange-200">
                    <MapPin
                      size={16}
                      className="text-gray-500 mt-1 flex-shrink-0"
                    />
                    <div>
                      <span className="text-gray-600 text-sm block mb-1">
                        {t.deliverTo}:
                      </span>
                      <p className="font-semibold text-gray-800 text-sm">
                        {orderInfo.address}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Order result with detailed pricing */}
              {step === "done" && orderResult && (
                <div className="space-y-4 animate-in slide-in-from-bottom-8">
                  {/* Order Summary with modern design */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-200/50 backdrop-blur-sm">
                    <div className="flex items-center gap-3 text-green-600 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <CheckCircle size={18} className="text-white" />
                      </div>
                      <div>
                        <span className="font-bold text-lg">
                          {t.orderSummary}
                        </span>
                        <p className="text-xs text-green-500 opacity-80">
                          Order completed successfully
                        </p>
                      </div>
                    </div>

                    {/* Product Info Grid */}
                    {orderResult.product_name && (
                      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                        <div className="flex items-center gap-2 p-3 bg-white/70 rounded-xl backdrop-blur-sm">
                          <Package size={14} className="text-gray-500" />
                          <div>
                            <span className="text-gray-600 block text-xs">
                              {t.product}:
                            </span>
                            <span className="font-semibold text-gray-800">
                              {orderResult.product_name}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-3 bg-white/70 rounded-xl backdrop-blur-sm">
                          <Clock size={14} className="text-gray-500" />
                          <div>
                            <span className="text-gray-600 block text-xs">
                              {t.quantity}:
                            </span>
                            <span className="font-semibold text-gray-800">
                              {orderResult.quantity}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-3 bg-white/70 rounded-xl backdrop-blur-sm">
                          <Package size={14} className="text-gray-500" />
                          <div>
                            <span className="text-gray-600 block text-xs">
                              {t.size}:
                            </span>
                            <span className="font-semibold text-gray-800">
                              {orderResult.size}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-3 bg-white/70 rounded-xl backdrop-blur-sm">
                          <CreditCard size={14} className="text-gray-500" />
                          <div>
                            <span className="text-gray-600 block text-xs">
                              {t.paymentMethod}:
                            </span>
                            <span className="font-semibold text-gray-800">
                              {orderResult.payment_method}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Address */}
                    {orderResult.address && (
                      <div className="flex items-start gap-3 mb-4 p-4 bg-white/70 rounded-xl backdrop-blur-sm">
                        <MapPin
                          size={16}
                          className="text-gray-500 mt-1 flex-shrink-0"
                        />
                        <div>
                          <span className="text-gray-600 text-sm block mb-1">
                            {t.deliverTo}:
                          </span>
                          <p className="font-semibold text-gray-800 text-sm">
                            {orderResult.address}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Price Breakdown with modern cards */}
                    {(orderResult.unit_price ||
                      orderResult.subtotal ||
                      orderResult.shipping_fee ||
                      orderResult.total_amount) && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-green-600 font-bold mb-4">
                          <div className="p-2 bg-green-100 rounded-full">
                            <Calculator size={16} />
                          </div>
                          {t.priceBreakdown}
                        </div>

                        {/* Unit Price */}
                        {orderResult.unit_price && (
                          <div className="flex justify-between items-center p-3 bg-white/70 rounded-xl backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                              <DollarSign size={14} className="text-gray-500" />
                              <span className="text-gray-600 text-sm font-medium">
                                {t.unitPrice}:
                              </span>
                            </div>
                            <span className="font-bold text-gray-800 bg-gray-100 px-3 py-2 rounded-lg">
                              {orderResult.unit_price}
                            </span>
                          </div>
                        )}

                        {/* Subtotal */}
                        {orderResult.subtotal && (
                          <div className="flex justify-between items-center p-3 bg-white/70 rounded-xl backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                              <Package size={14} className="text-gray-500" />
                              <span className="text-gray-600 text-sm font-medium">
                                {t.subtotal}:
                              </span>
                            </div>
                            <span className="font-bold text-gray-800 bg-gray-100 px-3 py-2 rounded-lg">
                              {orderResult.subtotal}
                            </span>
                          </div>
                        )}

                        {/* Shipping Fee */}
                        {orderResult.shipping_fee && (
                          <div className="flex justify-between items-center p-3 bg-white/70 rounded-xl backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                              <Truck size={14} className="text-blue-500" />
                              <span className="text-gray-600 text-sm font-medium">
                                {t.shippingFee}:
                              </span>
                            </div>
                            <span className="font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                              {orderResult.shipping_fee}
                            </span>
                          </div>
                        )}

                        {/* Total Amount */}
                        {orderResult.total_amount && (
                          <div className="flex justify-between items-center p-4 border-2 border-green-300 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl mt-4 backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-green-500 rounded-full">
                                <Calculator size={16} className="text-white" />
                              </div>
                              <span className="font-bold text-green-700 text-lg">
                                {t.totalAmount}:
                              </span>
                            </div>
                            <span className="font-bold text-xl text-green-700 bg-white px-4 py-3 rounded-xl shadow-lg">
                              {orderResult.total_amount}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Order ID and Transaction Reference */}
                    {(orderResult.order_id || orderResult.vnp_TxnRef) && (
                      <div className="mt-4 pt-4 border-t border-green-200 space-y-3">
                        {orderResult.order_id && (
                          <div className="flex justify-between items-center p-3 bg-white/70 rounded-xl backdrop-blur-sm">
                            <span className="text-gray-500 text-sm font-medium">
                              Order ID:
                            </span>
                            <span className="font-mono bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-2 rounded-lg text-sm font-bold">
                              #{orderResult.order_id}
                            </span>
                          </div>
                        )}
                        {orderResult.vnp_TxnRef && (
                          <div className="flex justify-between items-center p-3 bg-white/70 rounded-xl backdrop-blur-sm">
                            <span className="text-gray-500 text-sm font-medium">
                              Transaction:
                            </span>
                            <span className="font-mono bg-gradient-to-r from-blue-100 to-indigo-100 px-3 py-2 rounded-lg text-sm font-bold">
                              {orderResult.vnp_TxnRef}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Success Message */}
                    <div className="mt-4 p-4 bg-white/80 rounded-xl border border-green-200 backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                          <Sparkles size={16} className="text-white" />
                        </div>
                        <p className="text-sm text-green-700 font-semibold">
                          {orderResult.message}
                        </p>
                      </div>
                    </div>

                    {/* New Order Button */}
                    <div className="mt-4 pt-4 border-t border-green-200">
                      <button
                        onClick={handleNewOrder}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                        style={{
                          boxShadow: "0 8px 25px rgba(139, 92, 246, 0.3)",
                        }}
                      >
                        <ShoppingBag size={18} />
                        {t.newOrder}
                      </button>
                    </div>
                  </div>

                  {/* Completion celebration effect */}
                  <div className="fixed inset-0 pointer-events-none z-30">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping"
                          style={{
                            left: `${Math.cos((i * 60 * Math.PI) / 180) *
                              40}px`,
                            top: `${Math.sin((i * 60 * Math.PI) / 180) * 40}px`,
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: "1s",
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* AI Speech subtitle with modern design */}
              {aiSpeechText && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200/50 backdrop-blur-sm animate-in slide-in-from-left-5">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                        <Bot size={18} className="text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-yellow-800 mb-1 flex items-center gap-2">
                        <Sparkles size={12} />
                        AI Assistant
                      </p>
                      <p className="text-sm text-yellow-700">{aiSpeechText}</p>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Scroll Down Indicator */}
            {showScrollIndicator && canScrollDown && (
              <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
                <div className="bg-gradient-to-t from-white via-white/80 to-transparent h-8 flex items-center justify-center">
                  <button
                    onClick={scrollToBottom}
                    className="pointer-events-auto bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
                  >
                    <ArrowDown size={16} className="text-purple-500" />
                  </button>
                </div>
              </div>
            )}

            {/* Progress indicator */}
            {showScrollIndicator && (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20">
                <div className="flex flex-col space-y-1">
                  <div
                    className={`w-1 h-4 rounded-full transition-all duration-300 ${
                      canScrollUp ? "bg-purple-300" : "bg-gray-200"
                    }`}
                  ></div>
                  <div
                    className={`w-1 h-4 rounded-full transition-all duration-300 ${
                      canScrollDown ? "bg-purple-300" : "bg-gray-200"
                    }`}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Smart Fixed Footer - only shows when needed */}
          {(step === "done" || (showScrollIndicator && canScrollDown)) && (
            <div className="sticky bottom-0 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-xl border-t border-gray-200/50 p-4">
              <div className="flex gap-3">
                {step === "done" ? (
                  <>
                    <button
                      onClick={handleNewOrder}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                      <ShoppingBag size={18} />
                      {t.newOrder}
                    </button>
                    <button
                      onClick={handleCloseWidget}
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                      <X size={18} className="text-gray-600" />
                    </button>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center gap-3 text-sm text-gray-500">
                    <ArrowDown size={16} className="animate-bounce" />
                    <span>Scroll để xem thêm nội dung</span>
                    <ArrowDown size={16} className="animate-bounce delay-150" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
