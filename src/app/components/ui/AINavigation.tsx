"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

// Note: Ensure you have installed @react-three/fiber, @react-three/drei, and three in your project.
// npm install @react-three/fiber @react-three/drei three

export default function AINavigation() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const speechSynth = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== "undefined") {
      speechSynth.current = new SpeechSynthesisUtterance();
      speechSynth.current.lang = "vi-VN";
      speechSynth.current.volume = 1;
      speechSynth.current.rate = 1;
      speechSynth.current.pitch = 1;

      // Handle end of speech
      speechSynth.current.onend = () => {
        setIsSpeaking(false);
      };
    }
  }, []);

  // Speak function
  const speak = useCallback(
    (text: string) => {
      if (speechSynth.current && !isSpeaking) {
        setIsSpeaking(true);
        speechSynth.current.text = text;
        window.speechSynthesis.speak(speechSynth.current);
      }
    },
    [isSpeaking]
  );

  // Wrap navigateTo in useCallback
  const navigateTo = useCallback(
    (path: string, description: string) => {
      speak(description); // Speak about the page first
      setTimeout(() => {
        router.push(path);
        setIsListening(false);
        resetTranscript();
      }, 2000); // Delay navigation to allow speech to finish (adjust as needed)
    },
    [router, resetTranscript, speak]
  );

  // On mount, greet and ask user, start listening
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.log("Trình duyệt không hỗ trợ nhận diện giọng nói.");
      return;
    }

    // Initial greeting and question
    speak(
      "Chào bạn! Bạn muốn đi đâu? Ví dụ: đi đến giỏ hàng, vòng quay may mắn, giới thiệu, hoặc tin tức."
    );
    setIsListening(true); // Auto start listening after speaking

    if (isListening) {
      SpeechRecognition.startListening({
        continuous: true,
        language: "vi-VN",
      }).catch((err) => {
        console.log("Lỗi khi khởi động nhận diện giọng nói:", err.message);
      });
    }

    return () => {
      SpeechRecognition.stopListening();
      if (speechSynth.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isListening, browserSupportsSpeechRecognition, speak]);

  useEffect(() => {
    if (!listening) return;

    const cmd = transcript.toLowerCase().trim();
    if (cmd.includes("đi đến giỏ hàng")) {
      navigateTo(
        "/cart",
        "Bạn đang được chuyển đến trang giỏ hàng, nơi bạn có thể xem và quản lý các sản phẩm đã chọn."
      );
    } else if (cmd.includes("vòng quay may mắn")) {
      navigateTo(
        "/lucky",
        "Bạn đang được chuyển đến trang vòng quay may mắn, nơi bạn có thể thử vận may để nhận quà tặng."
      );
    } else if (cmd.includes("giới thiệu")) {
      navigateTo(
        "/about",
        "Bạn đang được chuyển đến trang giới thiệu, nơi bạn có thể tìm hiểu thêm về chúng tôi."
      );
    } else if (cmd.includes("tin tức")) {
      navigateTo(
        "/blog",
        "Bạn đang được chuyển đến trang tin tức, nơi bạn có thể đọc các bài viết mới nhất."
      );
    }
  }, [transcript, listening, navigateTo]);

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      resetTranscript();
      speak("Bắt đầu nghe lệnh của bạn.");
    } else {
      speak("Dừng nghe.");
    }
  };

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
        meshRef.current.rotation.y += 0.01; // Rotate for 3D effect
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
    <div className="fixed bottom-20 right-4 z-50 w-80 h-80">
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
          onClick={toggleListening}
        />
      </Canvas>
      {listening && (
        <div className="absolute bottom-0 text-white bg-gray-800 p-2 rounded">
          Đang nghe: {transcript || "Chưa có lệnh..."}
        </div>
      )}
    </div>
  );
}
