"use client";

import { useState } from "react";
import ChatBox from "./ChatBot";
import { MessageCircle } from "lucide-react";

export default function ChatToggle() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full shadow-md flex items-center justify-center cursor-pointer z-50"
      >
        <MessageCircle size={24} />
      </div>
      {open && <ChatBox onClose={() => setOpen(false)} />}
    </>
  );
}
