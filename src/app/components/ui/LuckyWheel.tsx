// pages/lucky/page.jsx
"use client";

import dynamic from "next/dynamic";

// Import động LuckyWheelClient với SSR bị vô hiệu hóa
const LuckyWheelClient = dynamic(() => import("./LuckyWheelClient"), {
  ssr: false, // Vô hiệu hóa server-side rendering cho component này
});

export default function LuckyWheelPage() {
  return (
    <main className="flex flex-col items-center bg-white mt-8 mb-20 px-4">
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
