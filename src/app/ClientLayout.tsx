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
// import ChatBoxStylistAI from "./components/ui/ChatBot"; // Assuming this is the chat component

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
import { useState } from "react";
import Footer from "./components/ui/Footer";
import VoiceQuickOrderFlexible from "./components/ui/VoiceQuickOrderTest"; // Import component mới
import ChatBoxStylistAI from "./components/ui/ChatBot"; // Assuming this is the chat component
import AIAssistantButton from "./components/ui/AIAssistantButton"; // Import component AI

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showCartModal, setShowCartModal] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [showVoiceOrder, setShowVoiceOrder] = useState(false); // State để kiểm soát VoiceQuickOrderFlexible

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <Provider store={store}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>{" "}
          {/* Main content always visible */}
          {/* Sử dụng AIAssistantButton để mở Chat hoặc Voice Order */}
          <AIAssistantButton
            onOpenChat={() => setShowChatBot(true)}
            onOpenVoiceOrder={() => setShowVoiceOrder(true)}
          />
          {showCartModal && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
              <CartModal onClose={() => setShowCartModal(false)} />
            </div>
          )}
          {showVoiceOrder && <VoiceQuickOrderFlexible />}{" "}
          {/* Thay VoiceQuickOrderTest bằng VoiceQuickOrderFlexible */}
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
