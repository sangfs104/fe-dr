
"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { DreamToast } from "./components/DreamToast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AbandonCartHelper from "./components/AbandonCartHelper";
import ChatToggle from "./components/ChatToggle";


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
            <AbandonCartHelper />
        <ChatToggle />

          </Provider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
