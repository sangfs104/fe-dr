// "use client";

// import "./globals.css";
// import { Toaster } from "react-hot-toast";
// import { CartProvider } from "../context/CartContext";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <CartProvider>
//           {children}
//           <Toaster position="top-right" reverseOrder={false} />
//         </CartProvider>
//       </body>
//     </html>
//   );
// }
"use client";

import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { DreamToast } from "./components/DreamToast";
import { GoogleOAuthProvider } from "@react-oauth/google";

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
          </Provider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
