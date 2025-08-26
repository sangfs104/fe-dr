"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./components/ui/Header";
import CartModal from "./components/ui/CartModal";
import { useState } from "react";
import Footer from "./components/ui/Footer";
import VoiceQuickOrderTest from "./components/ui/VoiceQuickOrderTest";
// import ChatToggle from "./components/ui/ChatToggle";
import ChatBoxStylistAI from "./components/ui/ChatBot";
// import dynamic from "next/dynamic";

// Tải AINavigation theo kiểu lazy để tối ưu hóa hiệu suất
// const AINavigation = dynamic(() => import("./components/ui/AINavigation"), {
//   ssr: false, // Tắt server-side rendering cho thành phần 3D
//   loading: () => <div>Đang tải AI Điều hướng...</div>,
// });

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showCartModal, setShowCartModal] = useState(false);
  const [showChatBot] = useState(false);

  // Kiểm tra Google Client ID
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!googleClientId) {
    console.error(
      "Google Client ID không được định nghĩa. Vui lòng thiết lập NEXT_PUBLIC_GOOGLE_CLIENT_ID trong biến môi trường."
    );
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId || ""}>
      <Provider store={store}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>

          {/* <ChatToggle onOpen={() => setShowChatBot(true)} /> */}
          {showCartModal && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
              <CartModal onClose={() => setShowCartModal(false)} />
            </div>
          )}
          {/* Chỉ hiển thị VoiceQuickOrderTest nếu không có ChatBot */}
          {!showChatBot && <VoiceQuickOrderTest />}
          <ChatBoxStylistAI />
          <Footer />
        </div>
      </Provider>
    </GoogleOAuthProvider>
  );
}
