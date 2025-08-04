// "use client";

// import "./globals.css";
// import { Provider } from "react-redux";
// import { store } from "../store/store";
// import { DreamToast } from "./components/ui/DreamToast";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// // import SimpleChatBot from "./components/SimpleChatBot";

// // import AbandonCartHelper from "./components/ui/AbandonCartHelper";
// import ChatToggle from "./components/ui/ChatToggle";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <GoogleOAuthProvider
//           clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
//         >
//           <Provider store={store}>
//             {children}
//             <DreamToast />
//             {/* <AbandonCartHelper /> */}
//             {/* <SimpleChatBot /> */}
//             {/* <AbandonCartHelper /> */}
//             <ChatToggle />
//           </Provider>
//         </GoogleOAuthProvider>
//       </body>
//     </html>
//   );
// }
"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { DreamToast } from "./components/ui/DreamToast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./components/ui/Header";
import CartModal from "./components/ui/CartModal";
import { useState } from "react";
import ChatToggle from "./components/ui/ChatToggle";
import Footer from "./components/ui/Footer";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showCartModal, setShowCartModal] = useState(false);

  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <Provider store={store}>
            <Header setShowCartModal={setShowCartModal} />
            {children}
            <DreamToast />
            <ChatToggle />
          </Provider>
          {/* CartModal nằm ngoài Provider, cuối cùng trong DOM để đảm bảo đè lên mọi thứ */}
          {showCartModal && (
            <div style={{ zIndex: 9999, position: "fixed", inset: 0 }}>
              <CartModal onClose={() => setShowCartModal(false)} />
            </div>
          )}
          <Footer />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
