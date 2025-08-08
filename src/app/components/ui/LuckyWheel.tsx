"use client";

import LuckyWheelClient from "./LuckyWheelClient";

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
