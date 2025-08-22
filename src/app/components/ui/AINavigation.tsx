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
  size: number;
  hue: number;
  depth: number;
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
  size: number;
  hue: number;
  depth: number;
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
   Custom CSS: Animations, 3D Layers, Glassmorphism
========================= */

const enhancedStyles = `
@keyframes particleDrift {
  0% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.8; }
  50% { transform: translate3d(-10px, -15px, 0) scale(1.2); opacity: 0.4; }
  100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.8; }
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.35), 0 0 60px rgba(168,85,247,0.25); }
  50% { box-shadow: 0 0 35px rgba(99,102,241,0.6), 0 0 90px rgba(168,85,247,0.45); }
}
@keyframes softFloat {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
}
@keyframes ringRotate {
  0% { transform: rotate(0deg) translateZ(0); }
  100% { transform: rotate(360deg) translateZ(0); }
}
@keyframes equalizer {
  0% { height: 10%; }
  50% { height: 85%; }
  100% { height: 10%; }
}
.glass {
  backdrop-filter: blur(14px) saturate(1.3);
  -webkit-backdrop-filter: blur(14px) saturate(1.3);
  background: radial-gradient(1200px 600px at 80% -20%, rgba(168,85,247,0.15), transparent 55%),
              radial-gradient(1000px 500px at -20% 100%, rgba(59,130,246,0.12), transparent 50%),
              linear-gradient(135deg, rgba(17,24,39,0.6), rgba(0,0,0,0.6));
  border: 1px solid rgba(255,255,255,0.08);
}
.depth-shadow {
  filter: drop-shadow(0 8px 18px rgba(0,0,0,0.35));
}
.particle {
  animation: particleDrift 3.6s ease-in-out infinite;
  will-change: transform, opacity;
}
.pulse-glow {
  animation: pulseGlow 3.2s ease-in-out infinite;
}
.soft-float {
  animation: softFloat 6s ease-in-out infinite;
}
.ring {
  animation: ringRotate 14s linear infinite;
  transform-origin: center center;
}
.equalizer-bar {
  animation: equalizer 1.2s ease-in-out infinite;
}

@media (max-width: 480px) {
  .hide-mobile { display: none !important; }
}
`;

/* =========================
   Particle Component (Depth + Hue)
========================= */

const Particle: React.FC<ParticleProps> = ({
  x,
  y,
  delay,
  size,
  hue,
  depth,
}) => (
  <div
    className="absolute rounded-full particle"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      background: `radial-gradient(circle at 30% 30%, hsla(${hue},90%,65%,0.9), hsla(${hue},90%,55%,0.35) 60%, transparent 70%)`,
      zIndex: Math.floor(depth),
      filter: `blur(${Math.max(0, 4 - depth)}px)`,
      animationDelay: `${delay}ms`,
    }}
  />
);

/* =========================
   Avatar “5D” (Parallax + Glow + Eye tracking)
========================= */

const Avatar3D: React.FC<Avatar3DProps> = ({
  isActive,
  isSpeaking,
  mousePosition,
}) => {
  const [isBlinking, setIsBlinking] = useState<boolean>(false);
  const [particles, setParticles] = useState<ParticleData[]>([]);

  useEffect(() => {
    const arr: ParticleData[] = Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 180,
      size: 4 + Math.random() * 10,
      hue: 200 + Math.random() * 120,
      depth: 1 + Math.random() * 3,
    }));
    setParticles(arr);
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      const t = setTimeout(() => setIsBlinking(false), 130);
      return () => clearTimeout(t);
    }, 3200);
    return () => clearInterval(blinkInterval);
  }, []);

  const getEyePosition = useCallback((): EyePosition => {
    const maxMove = 3.3;
    const x = (mousePosition.x - 50) * 0.12;
    const y = (mousePosition.y - 50) * 0.12;
    return {
      x: Math.max(-maxMove, Math.min(maxMove, x)),
      y: Math.max(-maxMove, Math.min(maxMove, y)),
    };
  }, [mousePosition]);

  const eyePos = getEyePosition();

  // Parallax based on mouse
  const tiltX = (mousePosition.y - 50) * -0.2;
  const tiltY = (mousePosition.x - 50) * 0.2;
  const depthTranslate = isActive ? 12 : 6;

  return (
    <div
      className="relative w-40 h-40 md:w-48 md:h-48 select-none"
      style={{
        perspective: "800px",
      }}
    >
      <style>{enhancedStyles}</style>

      {/* Depth Particles */}
      <div className="absolute inset-0 overflow-visible">
        {particles.map((p) => (
          <Particle
            key={p.id}
            x={p.x}
            y={p.y}
            delay={p.delay}
            size={p.size}
            hue={p.hue}
            depth={p.depth}
          />
        ))}
      </div>

      {/* Halo Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="ring hide-mobile"
          style={{
            width: "130%",
            height: "130%",
            borderRadius: "9999px",
            border: "1px dashed rgba(99,102,241,0.35)",
          }}
        />
        <div
          className="ring"
          style={{
            width: "95%",
            height: "95%",
            borderRadius: "9999px",
            border: "1px solid rgba(168,85,247,0.25)",
            animationDuration: "22s",
          }}
        />
      </div>

      {/* Avatar Core */}
      <div
        className={`relative w-full h-full rounded-[28px] depth-shadow pulse-glow soft-float`}
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(${depthTranslate}px)`,
          background:
            "radial-gradient(180px 160px at 70% 10%, rgba(236,72,153,0.35), transparent 60%), linear-gradient(160deg, rgba(59,130,246,0.35), rgba(99,102,241,0.35) 45%, rgba(168,85,247,0.4))",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "inset 0 1px 12px rgba(255,255,255,0.06), 0 10px 28px rgba(0,0,0,0.35)",
        }}
      >
        {/* Inner Glass Panel */}
        <div
          className="absolute inset-1 rounded-[24px] glass"
          style={{
            transform: "translateZ(12px)",
          }}
        />

        {/* Face Bubble */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "76%",
            height: "76%",
            transform: "translateZ(22px)",
            background:
              "radial-gradient(90px 70px at 65% 25%, rgba(255,255,255,0.65), rgba(255,255,255,0.15) 45%, rgba(236,72,153,0.15) 60%, rgba(0,0,0,0.1) 100%)",
            border: "1px solid rgba(255,255,255,0.15)",
            boxShadow:
              "inset 0 10px 30px rgba(255,255,255,0.25), 0 12px 24px rgba(0,0,0,0.25)",
            overflow: "hidden",
          }}
        >
          {/* Hair sheen */}
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: "85%",
              height: "42%",
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0) 60%)",
              filter: "blur(6px)",
            }}
          />
          {/* Eyes */}
          <div
            className="absolute left-[22%] top-[34%] w-[14%] h-[22%] bg-white rounded-full shadow-inner"
            style={{ transform: "translateZ(30px)" }}
          >
            {!isBlinking ? (
              <div
                className="absolute w-[70%] h-[70%] rounded-full"
                style={{
                  top: "15%",
                  left: "15%",
                  background:
                    "radial-gradient(circle at 35% 35%, #1e3a8a, #1e40af 70%)",
                  transform: `translate(${eyePos.x}px, ${eyePos.y}px)`,
                  transition: "transform 90ms ease-out",
                }}
              >
                <div
                  className="absolute w-[32%] h-[32%] bg-white/90 rounded-full"
                  style={{ top: "25%", left: "28%" }}
                />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-rose-200 to-rose-300 rounded-full" />
            )}
          </div>

          <div
            className="absolute right-[22%] top:[34%] top-[34%] w-[14%] h-[22%] bg-white rounded-full shadow-inner"
            style={{ transform: "translateZ(30px)" }}
          >
            {!isBlinking ? (
              <div
                className="absolute w-[70%] h-[70%] rounded-full"
                style={{
                  top: "15%",
                  left: "15%",
                  background:
                    "radial-gradient(circle at 35% 35%, #1e3a8a, #1e40af 70%)",
                  transform: `translate(${eyePos.x}px, ${eyePos.y}px)`,
                  transition: "transform 90ms ease-out",
                }}
              >
                <div
                  className="absolute w-[32%] h-[32%] bg-white/90 rounded-full"
                  style={{ top: "25%", left: "28%" }}
                />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-rose-200 to-rose-300 rounded-full" />
            )}
          </div>

          {/* Nose */}
          <div
            className="absolute left-1/2 top-[58%] -translate-x-1/2 rounded-full"
            style={{
              width: "7%",
              height: "8%",
              background: "linear-gradient(to bottom, #fda4af, #fb7185)",
              boxShadow: "0 1px 2px rgba(0,0,0,0.12)",
              transform: "translateZ(25px)",
            }}
          />
          {/* Cheeks */}
          <div
            className="absolute left-[18%] top-[60%] w-[18%] h-[10%] bg-rose-300/45 rounded-full"
            style={{ filter: "blur(0.5px)", transform: "translateZ(20px)" }}
          />
          <div
            className="absolute right-[18%] top-[60%] w-[18%] h-[10%] bg-rose-300/45 rounded-full"
            style={{ filter: "blur(0.5px)", transform: "translateZ(20px)" }}
          />
          {/* Mouth - speaking equalizer */}
          <div
            className="absolute left-1/2 top-[68%] -translate-x-1/2 flex items-end justify-center gap-0.5"
            style={{
              width: "22%",
              height: "14%",
              transform: "translateZ(26px)",
            }}
          >
            {isSpeaking ? (
              <>
                <div
                  className="w-1 bg-rose-500 rounded-sm equalizer-bar"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-1 bg-rose-400 rounded-sm equalizer-bar"
                  style={{ animationDelay: "120ms" }}
                />
                <div
                  className="w-1 bg-rose-500 rounded-sm equalizer-bar"
                  style={{ animationDelay: "240ms" }}
                />
                <div
                  className="w-1 bg-rose-400 rounded-sm equalizer-bar"
                  style={{ animationDelay: "360ms" }}
                />
                <div
                  className="w-1 bg-rose-500 rounded-sm equalizer-bar"
                  style={{ animationDelay: "480ms" }}
                />
              </>
            ) : (
              <div
                className="w-[40%] h-[28%] rounded-full"
                style={{
                  background: "linear-gradient(to bottom, #fb7185, #f43f5e)",
                  border: "1px solid rgba(239,68,68,0.6)",
                  boxShadow: "inset 0 1px 2px rgba(255,255,255,0.35)",
                }}
              />
            )}
          </div>
        </div>

        {/* Outer glow border when active */}
        {isActive && (
          <>
            <div
              className="absolute -inset-2 rounded-[32px]"
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(99,102,241,0.3), rgba(168,85,247,0.3), rgba(236,72,153,0.3), rgba(99,102,241,0.3))",
                filter: "blur(14px)",
                opacity: 0.85,
              }}
            />
            <div
              className="absolute -inset-[1px] rounded-[30px]"
              style={{ border: "1px solid rgba(255,255,255,0.16)" }}
            />
          </>
        )}
      </div>
    </div>
  );
};

/* =========================
   AINavigation Component (New UI)
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
    }, 80),
    []
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      handleMouseMove.cancel();
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  // Check Speech API support
  useEffect(() => {
    const Ctor = getSpeechRecognitionCtor();
    if (Ctor && typeof window !== "undefined" && "speechSynthesis" in window) {
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
          }, 220);
        }
      };

      recognitionRef.current = recognition;
    } else {
      setErrorMessage("Trình duyệt không hỗ trợ nhận diện giọng nói.");
    }
  }, [isActive, retryCount]);

  // Text-to-speech
  const speak = useCallback(
    (text: string, onEndCallback?: () => void) => {
      if (!supportsSpeech) return;
      if (speechSynthRef.current) {
        window.speechSynthesis.cancel();
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "vi-VN";
      utterance.rate = 0.95;
      utterance.pitch = 1.08;
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

  // Navigate
  const navigateTo = useCallback(
    (path: string, message: string) => {
      if (onNavigate) onNavigate(path);
      else router.push(path);

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
    [onNavigate, router, speak, isActive]
  );

  // Commands
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

  // Idle prompt
  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive && Date.now() - lastInteractionTime > 30000 && !isSpeaking) {
        speak(
          "Bạn còn cần giúp đỡ gì không? Nói 'giỏ hàng', 'trang chủ' hoặc 'nghỉ đi' để tiếp tục."
        );
        setLastInteractionTime(Date.now());
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isActive, lastInteractionTime, speak, isSpeaking]);

  // Manage recognition lifecycle
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
        } catch {}
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
      <div className="fixed bottom-4 right-4 z-50">
        <style>{enhancedStyles}</style>
        <div className="glass text-white rounded-2xl shadow-2xl p-4 border border-white/10 max-w-72">
          <div className="text-sm font-semibold">Không hỗ trợ</div>
          <div className="text-xs opacity-80">
            {errorMessage || "Trình duyệt không hỗ trợ nhận diện giọng nói."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-4 md:right-6 z-50"
      role="region"
      aria-label="AI Navigation Assistant"
    >
      <style>{enhancedStyles}</style>

      {/* Card Shell */}
      <div
        className="glass rounded-3xl p-4 md:p-6 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
        style={{
          width: "min(92vw, 380px)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex h-2.5 w-2.5 rounded-full"
              style={{
                background: isActive ? "#22c55e" : "#64748b",
                boxShadow: isActive ? "0 0 10px #22c55e" : "none",
              }}
            />
            <div className="text-sm text-white/90 font-semibold">
              {isActive
                ? isListening
                  ? "Đang lắng nghe..."
                  : "Đang chờ lệnh..."
                : "AI Điều hướng"}
            </div>
          </div>
          <div className="text-[10px] px-2 py-1 rounded-md border border-white/10 text-white/70">
            Real-time 3D UI
          </div>
        </div>

        {/* Avatar + Status */}
        <div className="flex items-center gap-4" aria-live="polite">
          <div
            className="cursor-pointer outline-none"
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

          <div className="flex-1 min-w-0">
            {!!transcript && (
              <div className="text-xs text-sky-300/90 mb-1 line-clamp-2">
                “{transcript}”
              </div>
            )}
            {!!errorMessage && (
              <div className="text-xs text-rose-300/90 mb-1">
                {errorMessage}
              </div>
            )}
            <div className="flex items-center gap-2">
              {isActive ? (
                <button
                  className="px-3 py-2 text-xs rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-colors shadow"
                  onClick={handleStopListening}
                  aria-label="Dừng AI điều hướng"
                >
                  Dừng
                </button>
              ) : (
                <button
                  className="px-3 py-2 text-xs rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow"
                  onClick={handleAvatarClick}
                  aria-label="Kích hoạt AI điều hướng"
                >
                  Kích hoạt
                </button>
              )}
              <button
                className="px-3 py-2 text-xs rounded-lg bg-slate-700/60 hover:bg-slate-700 text-white/90 transition-colors border border-white/10"
                onClick={() => handleQuickNavigate("/", "Đang về trang chủ.")}
              >
                Trang chủ
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            className="rounded-xl p-3 text-xs text-white/90 bg-gradient-to-br from-indigo-600/70 to-fuchsia-600/60 hover:from-indigo-600 hover:to-fuchsia-600 border border-white/10 transition-colors"
            onClick={() => handleQuickNavigate("/cart", "Đang mở giỏ hàng")}
            aria-label="Điều hướng đến giỏ hàng"
          >
            🛒 Giỏ hàng
          </button>
          <button
            className="rounded-xl p-3 text-xs text-white/90 bg-gradient-to-br from-emerald-600/70 to-teal-600/60 hover:from-emerald-600 hover:to-teal-600 border border-white/10 transition-colors"
            onClick={() => handleQuickNavigate("/lucky", "Vòng quay may mắn")}
            aria-label="Điều hướng đến vòng quay may mắn"
          >
            🎰 May mắn
          </button>
          <button
            className="rounded-xl p-3 text-xs text-white/90 bg-gradient-to-br from-amber-600/70 to-orange-600/60 hover:from-amber-600 hover:to-orange-600 border border-white/10 transition-colors"
            onClick={() => handleQuickNavigate("/about", "Trang giới thiệu")}
            aria-label="Điều hướng đến trang giới thiệu"
          >
            ℹ️ Giới thiệu
          </button>
          <button
            className="rounded-xl p-3 text-xs text-white/90 bg-gradient-to-br from-violet-600/70 to-purple-600/60 hover:from-violet-600 hover:to-purple-600 border border-white/10 transition-colors"
            onClick={() => handleQuickNavigate("/blog", "Tin tức mới nhất")}
            aria-label="Điều hướng đến tin tức"
          >
            📰 Tin tức
          </button>
        </div>

        {/* Hint */}
        <div className="mt-3 text-[11px] text-white/60">
          Lệnh: “giỏ hàng”, “may mắn”, “giới thiệu”, “tin tức”, “trang chủ”,
          “nghỉ đi”
        </div>
      </div>
    </div>
  );
};

export default AINavigation;
