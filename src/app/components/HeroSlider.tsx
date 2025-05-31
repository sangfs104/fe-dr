"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    src: "/img/banner1.webp",
    alt: "Front view",
  },
  {
    id: 2,
    src: "/img/banner2.webp",
    alt: "Front centered view",
  },
  {
    id: 3,
    src: "/img/bannerduoi.webp",
    alt: "Back view",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // 5s

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className="relative w-full px-6 overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full flex justify-center items-center"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              width={1000}
              height={600}
              className="object-contain"
              priority
            />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gradient-to-t from-black/50 via-transparent to-transparent text-center z-10">
        <h2 className="text-4xl font-bold tracking-wide mb-2 drop-shadow-md">
          XANH BÍCH NGỌC
        </h2>
        <p className="text-lg mb-4 drop-shadow">
          Tươi mát, tinh tế & sang trọng!
        </p>
        <button className="bg-white text-black px-6 py-2 font-semibold rounded-full shadow hover:bg-gray-100 transition">
          XEM NGAY
        </button>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
              current === index ? "bg-white w-6" : "bg-white/60 w-3"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
