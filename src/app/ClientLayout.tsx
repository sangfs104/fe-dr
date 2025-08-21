// "use client";

// import { Provider } from "react-redux";
// import { store } from "../store/store";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import Header from "./components/ui/Header";
// import CartModal from "./components/ui/CartModal";
// import { useState } from "react";
// import Footer from "./components/ui/Footer";
// import VoiceQuickOrderTest from "./components/ui/VoiceQuickOrderTest";
// import ChatToggle from "./components/ui/ChatToggle";
// import ChatBoxStylistAI from "./components/ui/ChatBot";

// export default function ClientLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [showCartModal, setShowCartModal] = useState(false);
//   const [showChatBot, setShowChatBot] = useState(false);

//   return (
//     <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
//       <Provider store={store}>
//         <div className="min-h-screen flex flex-col">
//           <Header />
//           <main className="flex-1">{children}</main>{" "}
//           {/* Main content always visible */}
//           <ChatToggle onOpen={() => setShowChatBot(true)} />{" "}
//           {/* Always visible */}
//           {showCartModal && (
//             <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
//               <CartModal onClose={() => setShowCartModal(false)} />
//             </div>
//           )}
//           {!showChatBot && <VoiceQuickOrderTest />}
//           {showChatBot && (
//             <ChatBoxStylistAI
//               onClose={() => setShowChatBot(false)}
//               apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/stylist/analyze`}
//             />
//           )}
//           <Footer />
//         </div>
//       </Provider>
//     </GoogleOAuthProvider>
//   );
// }
"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./components/ui/Header";
import CartModal from "./components/ui/CartModal";
import { useState, useEffect } from "react";
import Footer from "./components/ui/Footer";
import VoiceQuickOrderTest from "./components/ui/VoiceQuickOrderTest";
import ChatToggle from "./components/ui/ChatToggle";
import ChatBoxStylistAI from "./components/ui/ChatBot";

// Voice Assistant Component
function VoiceAssistant() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "vi-VN";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[
        event.results.length - 1
      ][0].transcript.toLowerCase();
      if (transcript.includes("hey sang")) {
        if (transcript.includes("giỏ hàng")) {
          window.location.href = "/cart";
        } else if (transcript.includes("vòng quay")) {
          window.location.href = "/lucky";
        } else if (transcript.includes("giới thiệu")) {
          const msg = new window.SpeechSynthesisUtterance(
            "Chào bạn! Đây là cửa hàng DREAMS, nơi bạn có thể mua sắm thời trang, tham gia vòng quay may mắn và nhận nhiều ưu đãi hấp dẫn."
          );
          msg.lang = "vi-VN";
          window.speechSynthesis.speak(msg);
        }
      }
    };

    recognition.onerror = () => {
      recognition.stop();
      setTimeout(() => recognition.start(), 1000);
    };

    recognition.onend = () => {
      setTimeout(() => recognition.start(), 1000);
    };

    recognition.start();

    return () => recognition.stop();
  }, []);

  return null;
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showCartModal, setShowCartModal] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <Provider store={store}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <ChatToggle onOpen={() => setShowChatBot(true)} />
          {showCartModal && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
              <CartModal onClose={() => setShowCartModal(false)} />
            </div>
          )}
          {!showChatBot && <VoiceQuickOrderTest />}
          <VoiceAssistant /> {/* Thêm voice assistant ở đây */}
          {showChatBot && (
            <ChatBoxStylistAI
              onClose={() => setShowChatBot(false)}
              apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/stylist/analyze`}
            />
          )}
          <Footer />
        </div>
      </Provider>
    </GoogleOAuthProvider>
  );
}
