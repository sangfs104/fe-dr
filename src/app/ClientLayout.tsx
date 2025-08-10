"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import { DreamToast } from "./components/ui/DreamToast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./components/ui/Header";
import CartModal from "./components/ui/CartModal";
import { useState } from "react";
import ChatToggle from "./components/ui/ChatToggle";
import Footer from "./components/ui/Footer";
import VoiceQuickOrderTest from "./components/ui/VoiceQuickOrderTest";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showCartModal, setShowCartModal] = useState(false);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <Provider store={store}>
        <Header />
        {children}
        <DreamToast />
        <ChatToggle />
      </Provider>

      {showCartModal && (
        <div style={{ zIndex: 9999, position: "fixed", inset: 0 }}>
          <CartModal onClose={() => setShowCartModal(false)} />
        </div>
      )}

      <VoiceQuickOrderTest />
      <Footer />
    </GoogleOAuthProvider>
  );
}
