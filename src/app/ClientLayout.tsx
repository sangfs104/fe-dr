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
import { useState } from "react";
import Footer from "./components/ui/Footer";
import VoiceAI from "./components/ui/VoiceAI";
import ChatToggle from "./components/ui/ChatToggle";
import ChatBoxStylistAI from "./components/ui/ChatBot";
import { useRouter } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showCartModal, setShowCartModal] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const router = useRouter();

  // Hàm xử lý lệnh giọng nói
  const handleVoiceCommand = (command: string) => {
    const cmd = command.toLowerCase();
    if (cmd.includes("mở giỏ hàng") || cmd.includes("gio hang")) {
      setShowCartModal(true);
    } else if (cmd.includes("mở vòng quay") || cmd.includes("vong quay")) {
      router.push("/lucky");
    } else if (
      cmd.includes("giới thiệu cửa hàng") ||
      cmd.includes("gioi thieu cua hang")
    ) {
      alert(
        "Chào mừng bạn đến với cửa hàng của chúng tôi! Chúng tôi cung cấp đa dạng sản phẩm thời trang, từ quần áo hợp mốt đến phụ kiện sành điệu. Mua sắm ngay để nhận ưu đãi độc quyền!"
      );
    }
  };

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
          {!showChatBot && <VoiceAI onCommand={handleVoiceCommand} />}
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
