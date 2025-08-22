"use client";

import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface VoiceAIProps {
  onCommand: (command: string) => void;
}

export default function VoiceAI({ onCommand }: VoiceAIProps) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setError("Trình duyệt của bạn không hỗ trợ nhận diện giọng nói.");
      return;
    }
    if (!isMicrophoneAvailable) {
      setError("Không tìm thấy micro. Vui lòng kiểm tra thiết bị của bạn.");
      return;
    }

    if (isActive) {
      SpeechRecognition.startListening({
        continuous: true,
        language: "vi-VN",
      }).catch((err: Error) => {
        setError("Lỗi khi khởi động nhận diện giọng nói: " + err.message);
      });
    }

    return () => {
      SpeechRecognition.stopListening();
    };
  }, [browserSupportsSpeechRecognition, isMicrophoneAvailable, isActive]);

  useEffect(() => {
    if (!isActive || error) return;

    const cmd = transcript.toLowerCase();
    if (cmd.includes("hey sang")) {
      const command = cmd.replace("hey sang", "").trim();
      if (command) {
        onCommand(command);
        resetTranscript();
      }
    } else if (
      cmd.includes("thôi sang nghỉ đi") ||
      cmd.includes("thoi sang nghi di")
    ) {
      setIsActive(false);
      SpeechRecognition.stopListening();
      resetTranscript();
    }
  }, [transcript, onCommand, resetTranscript, isActive, error]);

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className="bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg flex items-center space-x-2">
        {error ? (
          <span className="text-red-400">{error}</span>
        ) : isActive && listening ? (
          <span>Đang lắng nghe &apos;Hey Sang&apos;...</span>
        ) : (
          <span>AI Giọng Nói Không Hoạt Động</span>
        )}
        {!isActive && !error && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-colors"
            onClick={() => {
              setIsActive(true);
              setError(null);
            }}
          >
            Kích hoạt lại
          </button>
        )}
      </div>
    </div>
  );
}
