"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import throttle from "lodash.throttle";

/* =========================
   Types
========================= */

interface ParticleProps {
  x: number;
  y: number;
  delay: number;
}

interface MousePosition {
  x: number;
  y: number;
}

interface EyePosition {
  x: number;
  y: number;
}

interface ParticleData {
  id: number;
  x: number;
  y: number;
  delay: number;
}

interface Avatar3DProps {
  isActive: boolean;
  isSpeaking: boolean;
  mousePosition: MousePosition;
}

interface AINavigationProps {
  onNavigate?: (path: string) => void;
  onClose?: () => void;
}

/* =========================
   Web Speech API Types
========================= */

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: { transcript: string; confidence: number };
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

type SpeechRecognitionConstructor = new () => SpeechRecognition;

/** Safely get SpeechRecognition constructor (supports webkit) */
function getSpeechRecognitionCtor(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const w = window as {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

/* =========================
   Custom CSS for Particle Animation
========================= */

const particleAnimation = `
@keyframes particleFloat {
  0% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(-10px); opacity: 0.5; }
  100% { transform: translateY(0); opacity: 1; }
}
.particle-float {
  animation: particleFloat 2s infinite;
}
`;

/* =========================
   Particle Component
========================= */

const Particle: React.FC<ParticleProps> = ({ x, y, delay }) => (
  <div
    className="absolute w-1 h-1 bg-blue-400 rounded-full particle-float"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      animationDelay: `${delay}ms`,
    }}
  />
);

/* =========================
   Avatar 3D Component
========================= */

const Avatar3D: React.FC<Avatar3DProps> = ({
  isActive,
  isSpeaking,
  mousePosition,
}) => {
  const [isBlinking, setIsBlinking] = useState<boolean>(false);
  const [particles, setParticles] = useState<ParticleData[]>([]);

  useEffect(() => {
    if (isActive) {
      const newParticles: ParticleData[] = Array.from(
        { length: 8 },
        (_, i) => ({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: i * 200,
        })
      );
      setParticles(newParticles);
    } else {
      setParticles([]);
    }
  }, [isActive]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      const timeout = setTimeout(() => setIsBlinking(false), 150);
      return () => clearTimeout(timeout);
    }, 3000);
    return () => clearInterval(blinkInterval);
  }, []);

  const getEyePosition = useCallback((): EyePosition => {
    if (!mousePosition) return { x: 0, y: 0 };
    const maxMove = 3;
    const x = (mousePosition.x - 50) * 0.1;
    const y = (mousePosition.y - 50) * 0.1;
    return {
      x: Math.max(-maxMove, Math.min(maxMove, x)),
      y: Math.max(-maxMove, Math.min(maxMove, y)),
    };
  }, [mousePosition]);

  const eyePos = getEyePosition();

  return (
    <div className="relative w-32 h-32">
      <style>{particleAnimation}</style>
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          x={particle.x}
          y={particle.y}
          delay={particle.delay}
        />
      ))}
      {isActive && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-30 animate-pulse" />
      )}
      <div className="relative w-full h-full bg-gradient-to-b from-pink-200 to-pink-300 rounded-full shadow-lg border-4 border-white overflow-hidden">
        <div className="absolute -top-2 -left-2 -right-2 h-16 bg-gradient-to-b from-amber-800 to-amber-700 rounded-t-full" />
        {/* Left Eye */}
        <div className="absolute left-6 top-8 w-4 h-6 bg-white rounded-full shadow-inner">
          {!isBlinking && (
            <div
              className="absolute w-3 h-3 bg-gradient-to-b from-blue-600 to-blue-800 rounded-full top-1 left-0.5 transition-transform duration-100"
              style={{ transform: `translate(${eyePos.x}px, ${eyePos.y}px)` }}
            >
              <div className="absolute w-1 h-1 bg-white rounded-full top-1 left-1" />
            </div>
          )}
          {isBlinking && (
            <div className="absolute inset-0 bg-pink-300 rounded-full" />
          )}
        </div>
        {/* Right Eye */}
        <div className="absolute right-6 top-8 w-4 h-6 bg-white rounded-full shadow-inner">
          {!isBlinking && (
            <div
              className="absolute w-3 h-3 bg-gradient-to-b from-blue-600 to-blue-800 rounded-full top-1 left-0.5 transition-transform duration-100"
              style={{ transform: `translate(${eyePos.x}px, ${eyePos.y}px)` }}
            >
              <div className="absolute w-1 h-1 bg-white rounded-full top-1 left-1" />
            </div>
          )}
          {isBlinking && (
            <div className="absolute inset-0 bg-pink-300 rounded-full" />
          )}
        </div>
        <div className="absolute left-1/2 top-12 -translate-x-1/2 w-2 h-3 bg-pink-400 rounded-full shadow-sm" />
        <div className="absolute left-2 top-14 w-6 h-4 bg-pink-400 rounded-full opacity-50" />
        <div className="absolute right-2 top-14 w-6 h-4 bg-pink-400 rounded-full opacity-50" />
        <div className="absolute left-1/2 top-16 -translate-x-1/2">
          {isSpeaking ? (
            <div className="w-6 h-4 bg-red-400 rounded-full animate-pulse border-2 border-red-600" />
          ) : (
            <div className="w-4 h-2 bg-red-400 rounded-full border border-red-500" />
          )}
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-2 bg-pink-400 rounded-full opacity-30" />
      </div>
      {isActive && (
        <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping" />
      )}
    </div>
  );
};

/* =========================
   AINavigation Component
========================= */

const AINavigation: React.FC<AINavigationProps> = ({ onNavigate, onClose }) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 50,
    y: 50,
  });
  const [supportsSpeech, setSupportsSpeech] = useState<boolean>(false);
  const [lastInteractionTime, setLastInteractionTime] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [retryCount, setRetryCount] = useState<number>(0);
  const maxRetries = 3;

  const containerRef = useRef<HTMLDivElement>(null);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Throttle mouse movement updates
  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = ((e.clientX - centerX) / rect.width) * 100 + 50;
        const y = ((e.clientY - centerY) / rect.height) * 100 + 50;
        setMousePosition({
          x: Math.max(0, Math.min(100, x)),
          y: Math.max(0, Math.min(100, y)),
        });
      }
    }, 100),
    []
  );

  // Initialize mouse move listener
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      handleMouseMove.cancel();
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  // Check Speech API support
  useEffect(() => {
    const checkSpeechSupport = () => {
      const Ctor = getSpeechRecognitionCtor();
      if (
        Ctor &&
        typeof window !== "undefined" &&
        "speechSynthesis" in window
      ) {
        setSupportsSpeech(true);
        const recognition = new Ctor();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "vi-VN";

        recognition.onstart = () => {
          setIsListening(true);
          setErrorMessage("");
          setRetryCount(0);
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let interimTranscript = "";
          let finalTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const res = event.results[i];
            if (res.isFinal) {
              finalTranscript += res[0].transcript;
            } else {
              interimTranscript += res[0].transcript;
            }
          }
          if (finalTranscript) {
            setTranscript(finalTranscript);
            setLastInteractionTime(Date.now());
          } else if (interimTranscript) {
            setTranscript(interimTranscript);
          }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          setIsListening(false);
          if (event.error === "not-allowed") {
            setErrorMessage(
              "Microphone bị chặn. Vui lòng cấp quyền sử dụng microphone."
            );
          } else if (event.error === "network") {
            setErrorMessage("Lỗi mạng. Vui lòng kiểm tra kết nối.");
          } else if (event.error === "no-speech" && isActive) {
            if (retryCount < maxRetries) {
              setTimeout(() => {
                if (isActive && recognitionRef.current) {
                  try {
                    recognitionRef.current.start();
                    setRetryCount((prev) => prev + 1);
                  } catch (error) {
                    console.log("Auto restart error:", error);
                  }
                }
              }, 500);
            } else {
              setErrorMessage("Không nghe thấy giọng nói. Vui lòng thử lại.");
            }
          } else if (isActive) {
            setTimeout(() => {
              if (isActive && recognitionRef.current) {
                try {
                  recognitionRef.current.start();
                  setRetryCount((prev) => prev + 1);
                } catch (error) {
                  console.log("Auto restart error:", error);
                }
              }
            }, 500);
          }
        };

        recognition.onend = () => {
          setIsListening(false);
          if (isActive && retryCount < maxRetries) {
            setTimeout(() => {
              if (isActive && recognitionRef.current) {
                try {
                  recognitionRef.current.start();
                  setRetryCount((prev) => prev + 1);
                } catch (error) {
                  console.log("Auto restart error:", error);
                }
              }
            }, 200);
          }
        };

        recognitionRef.current = recognition;
      } else {
        setErrorMessage("Trình duyệt không hỗ trợ nhận diện giọng nói.");
      }
    };

    checkSpeechSupport();
  }, [isActive, retryCount]);

  // Text-to-speech function
  const speak = useCallback(
    (text: string, onEndCallback?: () => void) => {
      if (!supportsSpeech) return;

      if (speechSynthRef.current) {
        window.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "vi-VN";
      utterance.rate = 0.95;
      utterance.pitch = 1.1;
      utterance.volume = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        if (onEndCallback) onEndCallback();
      };

      speechSynthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [supportsSpeech]
  );

  // Navigation function
  const navigateTo = useCallback(
    (path: string, message: string) => {
      if (onNavigate) {
        onNavigate(path);
      } else {
        router.push(path);
      }
      speak(message, () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          if (isActive) {
            speak("Bạn muốn đi đâu tiếp theo?");
            setLastInteractionTime(Date.now());
          }
        }, 30000);
      });
      setTranscript("");
      setLastInteractionTime(Date.now());
    },
    [onNavigate, speak, isActive, router]
  );

  // Handle transcript changes
  useEffect(() => {
    if (!transcript || !isActive) return;

    const cmd = transcript.toLowerCase().trim();

    if (cmd.includes("đi đến giỏ hàng") || cmd.includes("giỏ hàng")) {
      navigateTo("/cart", "Đang chuyển đến giỏ hàng.");
    } else if (cmd.includes("vòng quay may mắn") || cmd.includes("may mắn")) {
      navigateTo("/lucky", "Đang mở vòng quay may mắn.");
    } else if (cmd.includes("giới thiệu") || cmd.includes("about")) {
      navigateTo("/about", "Đang chuyển đến trang giới thiệu.");
    } else if (cmd.includes("tin tức") || cmd.includes("blog")) {
      navigateTo("/blog", "Đang mở tin tức.");
    } else if (cmd.includes("trang chủ") || cmd.includes("home")) {
      navigateTo("/", "Đang về trang chủ.");
    } else if (
      cmd.includes("nghỉ đi") ||
      cmd.includes("nghi di") ||
      cmd.includes("dừng lại") ||
      cmd.includes("tạm biệt")
    ) {
      setIsActive(false);
      speak("Tạm biệt! Hẹn gặp lại sau.");
      setTranscript("");
      if (onClose) onClose();
    } else if (cmd.includes("xin chào") || cmd.includes("hello")) {
      speak("Xin chào! Tôi có thể giúp bạn điều hướng đi đâu?");
      setTranscript("");
      setLastInteractionTime(Date.now());
    } else {
      speak(
        "Xin lỗi, tôi chưa hiểu lệnh. Hãy nói rõ hơn, ví dụ: 'đi đến giỏ hàng' hoặc 'trang chủ'."
      );
      setTranscript("");
      setLastInteractionTime(Date.now());
    }
  }, [transcript, isActive, navigateTo, speak, onClose]);

  // Idle check timer
  useEffect(() => {
    const checkIdle = () => {
      if (isActive && Date.now() - lastInteractionTime > 30000 && !isSpeaking) {
        speak(
          "Bạn còn cần giúp đỡ gì không? Nói 'giỏ hàng', 'trang chủ' hoặc 'nghỉ đi' để tiếp tục."
        );
        setLastInteractionTime(Date.now());
      }
    };

    const interval = setInterval(checkIdle, 5000);
    return () => clearInterval(interval);
  }, [isActive, lastInteractionTime, speak, isSpeaking]);

  // Manage speech recognition
  useEffect(() => {
    if (!supportsSpeech || !recognitionRef.current) return;

    if (isActive) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.log("Recognition start error:", error);
        setErrorMessage("Không thể khởi động nhận diện giọng nói.");
      }
    } else {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log("Recognition stop error:", error);
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.log("Cleanup error:", error);
        }
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isActive, supportsSpeech]);

  const handleAvatarClick = () => {
    if (!isActive) {
      setIsActive(true);
      setLastInteractionTime(Date.now());
      speak(
        "Xin chào! Nói 'giỏ hàng', 'trang chủ' hoặc các lệnh khác để điều hướng."
      );
      setTranscript("");
      setErrorMessage("");
      setRetryCount(0);
    }
  };

  const handleStopListening = () => {
    setIsActive(false);
    speak("Tạm dừng nghe. Nhấn vào tôi để kích hoạt lại.");
    setTranscript("");
    setErrorMessage("");
    setRetryCount(0);
    if (onClose) onClose();
  };

  const handleQuickNavigate = (path: string, message: string) => {
    navigateTo(path, message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleAvatarClick();
    }
  };

  if (!supportsSpeech) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg max-w-64 z-50 shadow-xl">
        <div className="text-sm font-medium">Không hỗ trợ</div>
        <div className="text-xs">
          {errorMessage || "Trình duyệt không hỗ trợ nhận diện giọng nói."}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed bottom-20 right-4 z-50 animate-fade-in"
      role="region"
      aria-label="AI Navigation Assistant"
    >
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white rounded-2xl shadow-2xl p-6 flex flex-col items-center space-y-4 border border-gray-700 transform transition-all duration-300 hover:scale-105">
        <div
          className="cursor-pointer transform transition-all duration-300 hover:scale-110 outline-none"
          onClick={handleAvatarClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label={
            isActive ? "AI đang hoạt động" : "Kích hoạt AI điều hướng"
          }
        >
          <Avatar3D
            isActive={isActive}
            isSpeaking={isSpeaking}
            mousePosition={mousePosition}
          />
        </div>
        <div className="text-center">
          <div
            className={`text-sm font-medium ${
              isActive ? "text-green-400" : "text-gray-400"
            } transition-colors duration-300`}
            aria-live="polite"
          >
            {isActive
              ? isListening
                ? "Đang lắng nghe..."
                : "Đang chờ lệnh..."
              : "Nhấn vào tôi để kích hoạt"}
          </div>
          {transcript && (
            <div className="text-xs text-blue-300 mt-1 max-w-48 truncate animate-fade-in">
              &quot;{transcript}&quot;
            </div>
          )}
          {errorMessage && (
            <div className="text-xs text-red-300 mt-1 max-w-48 animate-fade-in">
              {errorMessage}
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          {isActive ? (
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
              onClick={handleStopListening}
              aria-label="Dừng AI điều hướng"
            >
              Dừng
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={handleAvatarClick}
              aria-label="Kích hoạt AI điều hướng"
            >
              Kích hoạt
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2 w-full">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-xs transition-colors duration-200 shadow-sm flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => handleQuickNavigate("/cart", "Đang mở giỏ hàng")}
            aria-label="Điều hướng đến giỏ hàng"
          >
            🛒 Giỏ hàng
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-xs transition-colors duration-200 shadow-sm flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-green-400"
            onClick={() => handleQuickNavigate("/lucky", "Vòng quay may mắn")}
            aria-label="Điều hướng đến vòng quay may mắn"
          >
            🎰 May mắn
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-md text-xs transition-colors duration-200 shadow-sm flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-yellow-400"
            onClick={() => handleQuickNavigate("/about", "Trang giới thiệu")}
            aria-label="Điều hướng đến trang giới thiệu"
          >
            ℹ️ Giới thiệu
          </button>
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-md text-xs transition-colors duration-200 shadow-sm flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-400"
            onClick={() => handleQuickNavigate("/blog", "Tin tức mới nhất")}
            aria-label="Điều hướng đến tin tức"
          >
            📰 Tin tức
          </button>
        </div>
        <div className="text-xs text-gray-400 text-center max-w-48">
          <div className="font-medium">Lệnh giọng nói:</div>
          <div>
            &quot;giỏ hàng&quot;, &quot;may mắn&quot;, &quot;giới thiệu&quot;
          </div>
          <div>
            &quot;tin tức&quot;, &quot;trang chủ&quot;, &quot;nghỉ đi&quot;
          </div>
        </div>
      </div>
    </div>
  );
};

export default AINavigation;
