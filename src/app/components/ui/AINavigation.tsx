"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function AINavigation() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const navigateTo = (path: string) => {
    router.push(path);
    setIsListening(false);
    resetTranscript();
  };

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.log("Trình duyệt không hỗ trợ nhận diện giọng nói.");
      return;
    }

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
    };
  }, [isListening, browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (!listening) return;

    const cmd = transcript.toLowerCase().trim();
    if (cmd.includes("đi đến giỏ hàng")) {
      navigateTo("/cart");
    } else if (cmd.includes("vòng quay may mắn")) {
      navigateTo("/lucky");
    } else if (cmd.includes("giới thiệu")) {
      navigateTo("/about");
    } else if (cmd.includes("tin tức")) {
      navigateTo("/blog");
    }
  }, [transcript, listening, navigateTo]);

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      resetTranscript();
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-4 flex flex-col space-y-2">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          onClick={() => navigateTo("/cart")}
        >
          Đi đến Giỏ hàng
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
          onClick={() => navigateTo("/lucky")}
        >
          Vòng quay May mắn
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors"
          onClick={() => navigateTo("/about")}
        >
          Giới thiệu
        </button>
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-colors"
          onClick={() => navigateTo("/blog")}
        >
          Tin tức
        </button>
        <button
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md mt-2 transition-colors"
          onClick={toggleListening}
        >
          {isListening ? "Dừng nghe" : "Nghe giọng nói"}
        </button>
        {listening && (
          <span className="text-sm text-gray-300">
            Đang nghe: {transcript || "Chưa có lệnh..."}
          </span>
        )}
      </div>
    </div>
  );
}
