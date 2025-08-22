"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./components/ui/Header";
import CartModal from "./components/ui/CartModal";
import { useState } from "react";
import Footer from "./components/ui/Footer";
import VoiceQuickOrderTest from "./components/ui/VoiceQuickOrderTest";
import ChatToggle from "./components/ui/ChatToggle";
import ChatBoxStylistAI from "./components/ui/ChatBot";
import AINavigation from "./components/ui/AINavigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showCartModal, setShowCartModal] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [showAINavigation, setShowAINavigation] = useState(false);

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
          {!showChatBot && !showAINavigation && <VoiceQuickOrderTest />}
          {showChatBot && (
            <ChatBoxStylistAI
              onClose={() => setShowChatBot(false)}
              apiUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/stylist/analyze`}
            />
          )}
          {showAINavigation && <AINavigation />}
          <Footer />
          {/* Nút kích hoạt AINavigation */}
          {!showChatBot && !showAINavigation && (
            <button
              className="fixed bottom-4 right-4 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg transition-colors"
              onClick={() => setShowAINavigation(true)}
            >
              Mở AI Điều hướng
            </button>
          )}
          {/* Nút đóng AINavigation */}
          {showAINavigation && (
            <button
              className="fixed bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-lg transition-colors"
              onClick={() => setShowAINavigation(false)}
            >
              Đóng AI
            </button>
          )}
        </div>
      </Provider>
    </GoogleOAuthProvider>
  );
}
