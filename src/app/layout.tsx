// // // // "use client";

// // // // import "./globals.css";
// // // // import { Provider } from "react-redux";
// // // // import { store } from "../store/store";
// // // // import { DreamToast } from "./components/ui/DreamToast";
// // // // import { GoogleOAuthProvider } from "@react-oauth/google";
// // // // // import SimpleChatBot from "./components/SimpleChatBot";

// // // // // import AbandonCartHelper from "./components/ui/AbandonCartHelper";
// // // // import ChatToggle from "./components/ui/ChatToggle";

// // // // export default function RootLayout({
// // // //   children,
// // // // }: {
// // // //   children: React.ReactNode;
// // // // }) {
// // // //   return (
// // // //     <html lang="en">
// // // //       <body>
// // // //         <GoogleOAuthProvider
// // // //           clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
// // // //         >
// // // //           <Provider store={store}>
// // // //             {children}
// // // //             <DreamToast />
// // // //             {/* <AbandonCartHelper /> */}
// // // //             {/* <SimpleChatBot /> */}
// // // //             {/* <AbandonCartHelper /> */}
// // // //             <ChatToggle />
// // // //           </Provider>
// // // //         </GoogleOAuthProvider>
// // // //       </body>
// // // //     </html>
// // // //   );
// // // // }

// // // "use client";

// // // import "./globals.css";
// // // import { Provider } from "react-redux";
// // // import { store } from "../store/store";
// // // import { DreamToast } from "./components/ui/DreamToast";
// // // import { GoogleOAuthProvider } from "@react-oauth/google";
// // // import Header from "./components/ui/Header";
// // // import CartModal from "./components/ui/CartModal";
// // // import { useState } from "react";
// // // import ChatToggle from "./components/ui/ChatToggle";
// // // import Footer from "./components/ui/Footer";
// // // import VoiceQuickOrderTest from "./components/ui/VoiceQuickOrderTest";
// // // export default function RootLayout({
// // //   children,
// // // }: {
// // //   children: React.ReactNode;
// // // }) {
// // //   const [showCartModal, setShowCartModal] = useState(false);

// // //   return (
// // //     <html lang="en">
// // //       <body>
// // //         <GoogleOAuthProvider
// // //           clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
// // //         >
// // //           <Provider store={store}>
// // //             <Header />
// // //             {children}
// // //             <DreamToast />

// // //             <ChatToggle />
// // //           </Provider>
// // //           {showCartModal && (
// // //             <div style={{ zIndex: 9999, position: "fixed", inset: 0 }}>
// // //               <CartModal onClose={() => setShowCartModal(false)} />
// // //             </div>
// // //           )}
// // //           <VoiceQuickOrderTest />
// // //           <Footer />
// // //         </GoogleOAuthProvider>
// // //       </body>
// // //     </html>
// // //   );
// // // }
// // "use client";

// // import "./globals.css";
// // import { Provider } from "react-redux";
// // import { store } from "../store/store";
// // import { DreamToast } from "./components/ui/DreamToast";
// // import { GoogleOAuthProvider } from "@react-oauth/google";
// // import Header from "./components/ui/Header";
// // import CartModal from "./components/ui/CartModal";
// // import { useState } from "react";
// // import ChatToggle from "./components/ui/ChatToggle";
// // import Footer from "./components/ui/Footer";
// // import VoiceQuickOrderTest from "./components/ui/VoiceQuickOrderTest";

// // // ✅ Thêm metadata để đổi title
// // export const metadata = {
// //   title: "Dreams - Thời trang định nghĩa phong cách",
// //   description: "Nơi xu hướng gặp gỡ sự chân thực.",
// // };

// // export default function RootLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   const [showCartModal, setShowCartModal] = useState(false);

// //   return (
// //     <html lang="vi">
// //       <body>
// //         <GoogleOAuthProvider
// //           clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
// //         >
// //           <Provider store={store}>
// //             <Header />
// //             {children}
// //             <DreamToast />
// //             <ChatToggle />
// //           </Provider>

// //           {showCartModal && (
// //             <div style={{ zIndex: 9999, position: "fixed", inset: 0 }}>
// //               <CartModal onClose={() => setShowCartModal(false)} />
// //             </div>
// //           )}

// //           <VoiceQuickOrderTest />
// //           <Footer />
// //         </GoogleOAuthProvider>
// //       </body>
// //     </html>
// //   );
// // }
// "use client";

// import Head from "next/head";
// import "./globals.css";
// import { Provider } from "react-redux";
// import { store } from "../store/store";
// import { DreamToast } from "./components/ui/DreamToast";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import Header from "./components/ui/Header";
// import CartModal from "./components/ui/CartModal";
// import { useState } from "react";
// import ChatToggle from "./components/ui/ChatToggle";
// import Footer from "./components/ui/Footer";
// import VoiceQuickOrderTest from "./components/ui/VoiceQuickOrderTest";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [showCartModal, setShowCartModal] = useState(false);

//   return (
//     <html lang="vi">
//       <Head>
//         <title>Dreams - Thời trang định nghĩa phong cách</title>
//         <meta name="description" content="Nơi xu hướng gặp gỡ sự chân thực." />
//       </Head>
//       <body>
//         <GoogleOAuthProvider
//           clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
//         >
//           <Provider store={store}>
//             <Header />
//             {children}
//             <DreamToast />
//             <ChatToggle />
//           </Provider>

//           {showCartModal && (
//             <div style={{ zIndex: 9999, position: "fixed", inset: 0 }}>
//               <CartModal onClose={() => setShowCartModal(false)} />
//             </div>
//           )}

//           <VoiceQuickOrderTest />
//           <Footer />
//         </GoogleOAuthProvider>
//       </body>
//     </html>
//   );
// }
import "./globals.css";
import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Dreams - Thời trang định nghĩa phong cách",
  description: "Nơi xu hướng gặp gỡ sự chân thực.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
