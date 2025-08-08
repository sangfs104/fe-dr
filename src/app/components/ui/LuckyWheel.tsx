// pages/lucky/page.jsx
"use client";

import dynamic from "next/dynamic";

// Import động LuckyWheelClient với SSR bị vô hiệu hóa
const LuckyWheelClient = dynamic(() => import("./LuckyWheelClient"), {
  ssr: false, // Vô hiệu hóa server-side rendering cho component này
});

export default function LuckyWheelPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10 px-4">
      <div className="flex justify-center">
        <h1
          className="text-3xl md:text-4xl font-bold mb-8"
          style={{ color: "#FF9731" }}
        >
          Vòng Quay May Mắn
        </h1>
      </div>

      <LuckyWheelClient />
    </main>
  );
}
