"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

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
  [Symbol.iterator](): IterableIterator<SpeechRecognitionResult>;
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

export default function AINavigation() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const speechSynth = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== "undefined") {
      speechSynth.current = new SpeechSynthesisUtterance();
      speechSynth.current.lang = "vi-VN";
      speechSynth.current.volume = 1;
      speechSynth.current.rate = 1;
      speechSynth.current.pitch = 1;

      speechSynth.current.onend = () => {
        setIsSpeaking(false);
      };
    }
  }, []);

  // Speak function
  const speak = useCallback(
    (text: string, callback?: () => void) => {
      if (speechSynth.current && !isSpeaking) {
        setIsSpeaking(true);
        speechSynth.current.text = text;
        window.speechSynthesis.speak(speechSynth.current);
        if (callback) {
          speechSynth.current.onend = () => {
            setIsSpeaking(false);
            callback();
          };
        }
      }
    },
    [isSpeaking]
  );

  // Navigate function
  const navigateTo = useCallback(
    (path: string, description: string) => {
      speak(description);
      setTimeout(() => {
        router.push(path);
        setTranscript(""); // Reset transcript for next command
      }, 2000);
    },
    [router, speak]
  );

  // Voice recognition function
  const askForCommand = useCallback(
    async (question: string): Promise<string> => {
      return new Promise((resolve) => {
        speak(question, () => {
          const SpeechRecognitionConstructor =
            window.webkitSpeechRecognition || window.SpeechRecognition;
          if (!SpeechRecognitionConstructor) {
            setError(
              "Trình duyệt không hỗ trợ nhận diện giọng nói. Vui lòng sử dụng Chrome hoặc Edge."
            );
            resolve("");
            return;
          }

          const recognition = new SpeechRecognitionConstructor();
          recognition.lang = "vi-VN";
          recognition.start();

          recognition.onresult = (event: SpeechRecognitionEvent) => {
            const text = event.results[0][0].transcript.trim().toLowerCase();
            resolve(text);
          };

          recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            setError(`Lỗi nhận diện giọng nói: ${event.error}`);
            resolve("");
          };

          recognition.onend = () => {
            setIsListening(false);
          };
        });
      });
    },
    [speak]
  );

  // Start voice navigation
  const startVoice = useCallback(async () => {
    setIsListening(true);
    setError(null);
    setTranscript("");

    const command = await askForCommand(
      "Bạn muốn đi đâu? Ví dụ: đi đến giỏ hàng, vòng quay may mắn, giới thiệu, hoặc tin tức."
    );

    if (!command) {
      speak("Không nhận diện được lệnh. Vui lòng thử lại.");
      setIsListening(false);
      return;
    }

    setTranscript(command);

    if (command.includes("đi đến giỏ hàng")) {
      navigateTo(
        "/cart",
        "Bạn đang được chuyển đến trang giỏ hàng, nơi bạn có thể xem và quản lý các sản phẩm đã chọn."
      );
    } else if (command.includes("vòng quay may mắn")) {
      navigateTo(
        "/lucky",
        "Bạn đang được chuyển đến trang vòng quay may mắn, nơi bạn có thể thử vận may để nhận quà tặng."
      );
    } else if (command.includes("giới thiệu")) {
      navigateTo(
        "/about",
        "Bạn đang được chuyển đến trang giới thiệu, nơi bạn có thể tìm hiểu thêm về chúng tôi."
      );
    } else if (command.includes("tin tức")) {
      navigateTo(
        "/blog",
        "Bạn đang được chuyển đến trang tin tức, nơi bạn có thể đọc các bài viết mới nhất."
      );
    } else {
      speak("Lệnh không hợp lệ. Vui lòng thử lại.");
      setIsListening(false);
    }
  }, [speak, navigateTo]);

  // On mount, greet and start listening
  useEffect(() => {
    speak(
      "Chào bạn! Bạn muốn đi đâu? Ví dụ: đi đến giỏ hàng, vòng quay may mắn, giới thiệu, hoặc tin tức."
    );
    return () => {
      if (speechSynth.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, [speak]);

  // 3D Button Component
  function InteractiveBox({
    position,
    color,
    text,
    onClick,
  }: {
    position: [number, number, number];
    color: string;
    text: string;
    onClick: () => void;
  }) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);

    useFrame(() => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.01;
      }
    });

    return (
      <Box
        args={[2, 1, 0.5]}
        position={position}
        ref={meshRef}
        scale={active ? 1.2 : 1}
        onClick={() => {
          setActive(!active);
          onClick();
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial color={hovered ? "hotpink" : color} />
        <Text
          position={[0, 0, 0.26]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      </Box>
    );
  }

  return (
    <div className="fixed bottom-20 left-4 z-50 w-80 h-80">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <InteractiveBox
          position={[0, 3, 0]}
          color="blue"
          text="Giỏ hàng"
          onClick={() =>
            navigateTo(
              "/cart",
              "Bạn đang được chuyển đến trang giỏ hàng, nơi bạn có thể xem và quản lý các sản phẩm đã chọn."
            )
          }
        />
        <InteractiveBox
          position={[0, 1.5, 0]}
          color="green"
          text="Vòng quay May mắn"
          onClick={() =>
            navigateTo(
              "/lucky",
              "Bạn đang được chuyển đến trang vòng quay may mắn, nơi bạn có thể thử vận may để nhận quà tặng."
            )
          }
        />
        <InteractiveBox
          position={[0, 0, 0]}
          color="yellow"
          text="Giới thiệu"
          onClick={() =>
            navigateTo(
              "/about",
              "Bạn đang được chuyển đến trang giới thiệu, nơi bạn có thể tìm hiểu thêm về chúng tôi."
            )
          }
        />
        <InteractiveBox
          position={[0, -1.5, 0]}
          color="purple"
          text="Tin tức"
          onClick={() =>
            navigateTo(
              "/blog",
              "Bạn đang được chuyển đến trang tin tức, nơi bạn có thể đọc các bài viết mới nhất."
            )
          }
        />
        <InteractiveBox
          position={[0, -3, 0]}
          color="indigo"
          text={isListening ? "Dừng nghe" : "Nghe giọng nói"}
          onClick={startVoice}
        />
      </Canvas>
      {isListening && (
        <div className="absolute bottom-0 text-white bg-gray-800 p-2 rounded">
          Đang nghe: {transcript || "Chưa có lệnh..."}
        </div>
      )}
      {error && (
        <div className="absolute bottom-10 text-red-500 bg-gray-800 p-2 rounded">
          Lỗi: {error}
        </div>
      )}
    </div>
  );
}
