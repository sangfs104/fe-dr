"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface MenuItem {
  label: { vi: string; en: string };
  link: string;
}

interface DropdownMenuProps {
  label: string;
  items: MenuItem[];
  language: "vi" | "en";
}

export default function DropdownMenu({
  label,
  items,
  language,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.4,
        staggerChildren: 0.06,
      },
    },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="cursor-pointer text-sm font-medium hover:text-purple-600 transition duration-300 ease-in-out">
        {label}
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-0 top-full mt-3 w-60 backdrop-blur-md bg-white/70 border border-white/30 shadow-2xl rounded-2xl z-50 overflow-hidden"
          >
            {items.map((item, index) => (
              <motion.li key={index} variants={itemVariants} className="group">
                <a
                  href={item.link}
                  className="flex items-center justify-between px-5 py-3 text-sm text-gray-800 hover:bg-purple-50 hover:text-purple-700 transition duration-300"
                >
                  {item.label[language]}
                  <ChevronRight className="size-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition" />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
