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
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { DreamToast } from "./components/DreamToast"; // nhớ chỉnh path đúng nhé
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {children}
          {/* <Toaster position="top-right" reverseOrder={false} /> */}
          <DreamToast />
        </Provider>
      </body>
    </html>
  );
}
