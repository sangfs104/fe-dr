
// import "./globals.css";
// import type { Metadata } from "next";
// import ClientLayout from "./ClientLayout";

// export const metadata: Metadata = {
//   title: "DREAMS",
//   description: "Nơi xu hướng gặp gỡ sự chân thực.",
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="vi">
//       <body>
//         <ClientLayout>{children}</ClientLayout>
//       </body>
//     </html>
//   );
// }
import "./globals.css";
import type { Metadata } from "next";
import ClientLayout from "./ClientLayout";
import { AuthProvider } from "../context/AuthContext";

export const metadata: Metadata = {
  title: "DREAMS",
  description: "Nơi xu hướng gặp gỡ sự chân thực.",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <AuthProvider> {/* Bọc AuthProvider ở đây */}
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}