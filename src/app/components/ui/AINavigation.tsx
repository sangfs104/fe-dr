import React, { useEffect, useState, useCallback, useRef } from "react";

// Định nghĩa types
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
}

// Extend Window interface để hỗ trợ webkitSpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

// Component Particle Effect
const Particle: React.FC<ParticleProps> = ({ x, y, delay }) => (
  <div
    className="absolute w-1 h-1 bg-blue-400 rounded-full animate-bounce"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      animationDelay: `${delay}ms`,
      animationDuration: "2s",
    }}
  />
);

// Component Avatar 3D
const Avatar3D: React.FC<Avatar3DProps> = ({
  isActive,
  isSpeaking,
  mousePosition,
}) => {
  const [isBlinking, setIsBlinking] = useState<boolean>(false);
  const [particles, setParticles] = useState<ParticleData[]>([]);

  // Tạo particles khi active
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

  // Hoạt ảnh chớp mắt
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Tính toán hướng nhìn dựa trên vị trí chuột
  const getEyePosition = (): EyePosition => {
    if (!mousePosition) return { x: 0, y: 0 };

    const maxMove = 3;
    const x = (mousePosition.x - 50) * 0.1;
    const y = (mousePosition.y - 50) * 0.1;

    return {
      x: Math.max(-maxMove, Math.min(maxMove, x)),
      y: Math.max(-maxMove, Math.min(maxMove, y)),
    };
  };

  const eyePos = getEyePosition();

  return (
    <div className="relative w-32 h-32">
      {/* Particles bay xung quanh */}
      {particles.map((particle: ParticleData) => (
        <Particle
          key={particle.id}
          x={particle.x}
          y={particle.y}
          delay={particle.delay}
        />
      ))}

      {/* Hiệu ứng ánh sáng khi active */}
      {isActive && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-30 animate-pulse" />
      )}

      {/* Khuôn mặt chính */}
      <div className="relative w-full h-full bg-gradient-to-b from-pink-200 to-pink-300 rounded-full shadow-lg border-4 border-white overflow-hidden">
        {/* Tóc */}
        <div className="absolute -top-2 -left-2 -right-2 h-16 bg-gradient-to-b from-amber-800 to-amber-700 rounded-t-full" />

        {/* Mắt trái */}
        <div className="absolute left-6 top-8 w-4 h-6 bg-white rounded-full shadow-inner">
          {!isBlinking && (
            <div
              className="absolute w-3 h-3 bg-gradient-to-b from-blue-600 to-blue-800 rounded-full top-1 left-0.5 transition-transform duration-100"
              style={{
                transform: `translate(${eyePos.x}px, ${eyePos.y}px)`,
              }}
            >
              <div className="absolute w-1 h-1 bg-white rounded-full top-1 left-1" />
            </div>
          )}
          {isBlinking && (
            <div className="absolute inset-0 bg-pink-300 rounded-full" />
          )}
        </div>

        {/* Mắt phải */}
        <div className="absolute right-6 top-8 w-4 h-6 bg-white rounded-full shadow-inner">
          {!isBlinking && (
            <div
              className="absolute w-3 h-3 bg-gradient-to-b from-blue-600 to-blue-800 rounded-full top-1 left-0.5 transition-transform duration-100"
              style={{
                transform: `translate(${eyePos.x}px, ${eyePos.y}px)`,
              }}
            >
              <div className="absolute w-1 h-1 bg-white rounded-full top-1 left-1" />
            </div>
          )}
          {isBlinking && (
            <div className="absolute inset-0 bg-pink-300 rounded-full" />
          )}
        </div>

        {/* Mũi */}
        <div className="absolute left-1/2 top-12 transform -translate-x-1/2 w-2 h-3 bg-pink-400 rounded-full shadow-sm" />

        {/* Má hồng */}
        <div className="absolute left-2 top-14 w-6 h-4 bg-pink-400 rounded-full opacity-50" />
        <div className="absolute right-2 top-14 w-6 h-4 bg-pink-400 rounded-full opacity-50" />

        {/* Miệng */}
        <div className="absolute left-1/2 top-16 transform -translate-x-1/2">
          {isSpeaking ? (
            <div className="w-6 h-4 bg-red-400 rounded-full animate-pulse border-2 border-red-600" />
          ) : (
            <div className="w-4 h-2 bg-red-400 rounded-full border border-red-500" />
          )}
        </div>

        {/* Cằm */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-pink-400 rounded-full opacity-30" />
      </div>

      {/* Viền phát sáng khi active */}
      {isActive && (
        <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping" />
      )}
    </div>
  );
};

const AINavigation: React.FC<AINavigationProps> = ({ onNavigate }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 50,
    y: 50,
  });
  const [supportsSpeech, setSupportsSpeech] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Kiểm tra hỗ trợ Speech API
  useEffect(() => {
    const checkSpeechSupport = (): void => {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition && "speechSynthesis" in window) {
        setSupportsSpeech(true);

        // Tạo instance recognition
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "vi-VN";

        recognition.onstart = (): void => {
          setIsListening(true);
        };

        recognition.onresult = (event: SpeechRecognitionEvent): void => {
          let finalTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }
          if (finalTranscript) {
            setTranscript(finalTranscript);
          }
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent): void => {
          console.log("Speech recognition error:", event.error);
          setIsListening(false);
        };

        recognition.onend = (): void => {
          setIsListening(false);
          if (isActive) {
            // Tự động khởi động lại nếu vẫn đang active
            setTimeout(() => {
              if (isActive && recognitionRef.current) {
                try {
                  recognitionRef.current.start();
                } catch (error) {
                  console.log("Auto restart error:", error);
                }
              }
            }, 100);
          }
        };

        recognitionRef.current = recognition;
      }
    };

    checkSpeechSupport();
  }, [isActive]);

  // Theo dõi vị trí chuột
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
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
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Hàm text-to-speech
  const speak = useCallback(
    (text: string): void => {
      if (!supportsSpeech) return;

      if (speechSynthRef.current) {
        speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "vi-VN";
      utterance.rate = 0.9;
      utterance.pitch = 1.2;

      utterance.onstart = (): void => setIsSpeaking(true);
      utterance.onend = (): void => setIsSpeaking(false);

      speechSynthRef.current = utterance;
      speechSynthesis.speak(utterance);
    },
    [supportsSpeech]
  );

  const navigateTo = useCallback(
    (path: string, message: string): void => {
      if (onNavigate) {
        onNavigate(path);
      } else {
        // Fallback navigation
        window.location.href = path;
      }
      speak(message);
      setTranscript("");
    },
    [onNavigate, speak]
  );

  // Xử lý transcript thay đổi
  useEffect(() => {
    if (!transcript || !isListening) return;

    const cmd = transcript.toLowerCase().trim();

    if (cmd.includes("đi đến giỏ hàng") || cmd.includes("giỏ hàng")) {
      navigateTo("/cart", "Đang chuyển đến giỏ hàng");
    } else if (cmd.includes("vòng quay may mắn") || cmd.includes("may mắn")) {
      navigateTo("/lucky", "Đang mở vòng quay may mắn");
    } else if (cmd.includes("giới thiệu") || cmd.includes("about")) {
      navigateTo("/about", "Đang chuyển đến trang giới thiệu");
    } else if (cmd.includes("tin tức") || cmd.includes("blog")) {
      navigateTo("/blog", "Đang mở tin tức");
    } else if (cmd.includes("trang chủ") || cmd.includes("home")) {
      navigateTo("/", "Đang về trang chủ");
    } else if (
      cmd.includes("nghỉ đi") ||
      cmd.includes("nghi di") ||
      cmd.includes("dừng lại")
    ) {
      setIsActive(false);
      speak("Tạm biệt! Hẹn gặp lại sau.");
      setTranscript("");
    } else if (cmd.includes("xin chào") || cmd.includes("hello")) {
      speak("Xin chào! Tôi có thể giúp bạn điều hướng đi đâu?");
      setTranscript("");
    }
  }, [transcript, isListening, navigateTo, speak]);

  // Quản lý speech recognition
  useEffect(() => {
    if (!supportsSpeech || !recognitionRef.current) return;

    if (isActive) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.log("Recognition start error:", error);
      }
    } else {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log("Recognition stop error:", error);
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {
          // Ignore cleanup errors
          console.log("Cleanup error:", err);
        }
      }
    };
  }, [isActive, supportsSpeech]);

  const handleAvatarClick = (): void => {
    if (!isActive) {
      setIsActive(true);
      speak("Xin chào! Tôi đã sẵn sàng. Bạn muốn đi đâu?");
      setTranscript("");
    }
  };

  const handleStopListening = (): void => {
    setIsActive(false);
    speak("Tạm dừng nghe. Nhấn vào tôi để kích hoạt lại.");
    setTranscript("");
  };

  const handleQuickNavigate = (path: string, message: string): void => {
    navigateTo(path, message);
  };

  if (!supportsSpeech) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg max-w-64">
        <div className="text-sm font-medium">Không hỗ trợ</div>
        <div className="text-xs">
          Trình duyệt không hỗ trợ nhận diện giọng nói
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="fixed bottom-20 right-4 z-50">
      {/* Container chính */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white rounded-2xl shadow-2xl p-6 flex flex-col items-center space-y-4 border border-gray-700">
        {/* Avatar 3D */}
        <div
          className="cursor-pointer transform transition-all duration-300 hover:scale-105"
          onClick={handleAvatarClick}
        >
          <Avatar3D
            isActive={isActive}
            isSpeaking={isSpeaking}
            mousePosition={mousePosition}
          />
        </div>

        {/* Trạng thái */}
        <div className="text-center">
          <div
            className={`text-sm font-medium ${
              isActive ? "text-green-400" : "text-gray-400"
            }`}
          >
            {isActive ? "Đang lắng nghe..." : "Nhấn vào tôi để kích hoạt"}
          </div>
          {isListening && transcript && (
            <div className="text-xs text-blue-300 mt-1 max-w-48 truncate">
              &quot;{transcript}&quot;
            </div>
          )}
        </div>

        {/* Nút điều khiển */}
        <div className="flex space-x-2">
          {isActive ? (
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
              onClick={handleStopListening}
            >
              Dừng
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
              onClick={handleAvatarClick}
            >
              Kích hoạt
            </button>
          )}
        </div>

        {/* Nút điều hướng nhanh */}
        <div className="grid grid-cols-2 gap-2 w-full">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-xs transition-colors"
            onClick={() => handleQuickNavigate("/cart", "Đang mở giỏ hàng")}
          >
            🛒 Giỏ hàng
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-xs transition-colors"
            onClick={() => handleQuickNavigate("/lucky", "Vòng quay may mắn")}
          >
            🎰 May mắn
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-md text-xs transition-colors"
            onClick={() => handleQuickNavigate("/about", "Trang giới thiệu")}
          >
            ℹ️ Giới thiệu
          </button>
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-md text-xs transition-colors"
            onClick={() => handleQuickNavigate("/blog", "Tin tức mới nhất")}
          >
            📰 Tin tức
          </button>
        </div>

        {/* Hướng dẫn nhanh */}
        <div className="text-xs text-gray-400 text-center max-w-48">
          <div>Lệnh giọng nói:</div>
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
