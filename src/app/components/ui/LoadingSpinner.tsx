"use client";
import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/60 backdrop-blur-sm">
      <motion.div
        className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />
    </div>
  );
}
