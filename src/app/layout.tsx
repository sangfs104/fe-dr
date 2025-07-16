"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { DreamToast } from "./components/ui/DreamToast";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import SimpleChatBot from "./components/SimpleChatBot";

import AbandonCartHelper from "./components/ui/AbandonCartHelper";
import ChatToggle from "./components/ui/ChatToggle";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <Provider store={store}>
            {children}
            <DreamToast />
            {/* <AbandonCartHelper /> */}
            {/* <SimpleChatBot /> */}
            <AbandonCartHelper />
            <ChatToggle />
          </Provider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
