// "use client";

// import { useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Image from "next/image";

// const slides = [
//   { id: 1, src: "/img/banner1.webp", alt: "Front view" },
//   { id: 2, src: "/img/banner2.webp", alt: "Front centered view" },
//   { id: 3, src: "/img/banner3.webp", alt: "Back view" },
// ];

// export default function HeroSlider() {
//   const [current, setCurrent] = useState(0);
//   const prevSlide = () =>
//     setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
//   const nextSlide = () =>
//     setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     // <div className="px-4 sm:px-10 md:px-20 lg:px-40 w-full">
//     <div className="px-4 sm:px-10 md:px-20 lg:px-40 w-full py-12">
//       <div className="relative w-full overflow-hidden rounded-xl">
//         <div
//           className="flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
//           style={{ transform: `translateX(-${current * 100}%)` }}
//         >
//           {slides.map((slide) => (
//             <div
//               key={slide.id}
//               className="min-w-full flex justify-center items-center"
//             >
//               <Image
//                 src={slide.src}
//                 alt={slide.alt}
//                 width={1000}
//                 height={600}
//                 className="object-contain"
//                 priority
//               />
//             </div>
//           ))}
//         </div>

//         {/* Arrows */}
//         <button
//           onClick={prevSlide}
//           className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition"
//         >
//           <ChevronLeft size={24} />
//         </button>
//         <button
//           onClick={nextSlide}
//           className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition"
//         >
//           <ChevronRight size={24} />
//         </button>

//         {/* Overlay */}
//         <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-gradient-to-t from-black/50 via-transparent to-transparent text-center z-10 px-4">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide mb-2 drop-shadow-md">
//             XANH BÍCH NGỌC
//           </h2>
//           <p className="text-base sm:text-lg mb-4 drop-shadow">
//             Tươi mát, tinh tế & sang trọng!
//           </p>
//           <button className="bg-white text-black px-6 py-2 font-semibold rounded-full shadow hover:bg-gray-100 transition">
//             XEM NGAY
//           </button>
//         </div>

//         {/* Pagination */}
//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
//           {slides.map((_, index) => (
//             <div
//               key={index}
//               onClick={() => setCurrent(index)}
//               className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
//                 current === index ? "bg-white w-6" : "bg-white/60 w-3"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import Image from "next/image";
const slides = [
  { id: 1, src: "/img/banner1.webp", alt: "Front view", color: "#22c55e" },
  {
    id: 2,
    src: "/img/banner2.webp",
    alt: "Front centered view",
    color: "#3b82f6",
  },
  { id: 3, src: "/img/banner3.webp", alt: "Back view", color: "#8b5cf6" },
];

export default function Enhanced3DHeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="px-4 sm:px-10 md:px-20 lg:px-40 w-full py-12 relative">
      {/* Background Gradient Animation */}
      <div
        className="absolute inset-0 opacity-20 transition-all duration-1000 blur-3xl"
        style={{
          background: `radial-gradient(circle at center, ${slides[current].color}40, transparent 70%)`,
        }}
      />

      <div
        className="relative w-full overflow-hidden rounded-2xl shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* 3D Container */}
        <div
          className={`relative transition-transform duration-700 ease-[cubic-bezier(0.25, 0.46, 0.45, 0.94)] ${
            isHovered ? "transform rotate-y-2 rotate-x-1" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Slides Container */}
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] relative"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`min-w-full flex justify-center items-center relative transition-all duration-700 ${
                  index === current
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-70"
                }`}
                style={{
                  transform:
                    index === current ? "translateZ(0)" : "translateZ(-50px)",
                }}
              >
                <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden rounded-xl">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    width={1000} // Specify width
                    height={600} // Specify height
                    style={{
                      filter: "brightness(0.9) contrast(1.1) saturate(1.2)",
                    }}
                  />

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 group z-20 border border-white/20"
            style={{
              transform: isHovered
                ? "translateZ(20px) translateY(-50%)"
                : "translateY(-50%)",
            }}
          >
            <ChevronLeft
              size={24}
              className="group-hover:scale-110 transition-transform"
            />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-xl hover:bg-white hover:scale-110 transition-all duration-300 group z-20 border border-white/20"
            style={{
              transform: isHovered
                ? "translateZ(20px) translateY(-50%)"
                : "translateY(-50%)",
            }}
          >
            <ChevronRight
              size={24}
              className="group-hover:scale-110 transition-transform"
            />
          </button>

          {/* Enhanced Overlay with 3D Effects */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
            {/* Animated Background Shapes */}
            <div className="absolute inset-0">
              <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
              <div
                className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>

            {/* Glass Morphism Card */}
            <div
              className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl transform transition-all duration-700"
              style={{
                transform: isHovered
                  ? "translateZ(30px) scale(1.05)"
                  : "translateZ(0) scale(1)",
                background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
              }}
            >
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide mb-4 drop-shadow-lg animate-fade-in">
                  <span
                    className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-shimmer-text"
                    style={{ backgroundSize: "200% 100%" }}
                  >
                    XANH BÍCH NGỌC
                  </span>
                </h2>
                <p className="text-lg sm:text-xl mb-6 drop-shadow-md opacity-90 animate-fade-in-delay">
                  Tươi mát, tinh tế & sang trọng!
                </p>
                <button
                  className="bg-gradient-to-r from-white to-gray-100 text-gray-800 px-8 py-3 font-semibold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-white/20 backdrop-blur-sm transform hover:translateZ-10"
                  style={{
                    boxShadow:
                      "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)",
                  }}
                >
                  XEM NGAY
                </button>
              </div>
            </div>
          </div>

          {/* Play/Pause Control */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 z-20 border border-white/20"
            style={{
              transform: isHovered ? "translateZ(20px)" : "translateZ(0)",
            }}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          {/* Enhanced Pagination */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
            {slides.map((slide, index) => (
              <div
                key={index}
                onClick={() => setCurrent(index)}
                className={`relative cursor-pointer transition-all duration-500 group ${
                  current === index ? "scale-110" : "scale-100 hover:scale-105"
                }`}
                style={{
                  transform:
                    isHovered && current === index
                      ? "translateZ(10px)"
                      : "translateZ(0)",
                }}
              >
                <div
                  className={`h-2 rounded-full backdrop-blur-md border border-white/30 transition-all duration-500 ${
                    current === index
                      ? "bg-white w-12 shadow-lg"
                      : "bg-white/60 w-8 hover:bg-white/80"
                  }`}
                />
                {current === index && (
                  <div
                    className="absolute inset-0 rounded-full blur-md opacity-50"
                    style={{ backgroundColor: slide.color }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3D Border Effects */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-30" />
          <div className="absolute inset-0 rounded-2xl shadow-inner" />
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        @keyframes shimmer-text {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delay {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 0.9;
            transform: translateY(0);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-shimmer-text {
          animation: shimmer-text 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 1s ease-out 0.3s forwards;
          opacity: 0;
        }

        .rotate-y-2 {
          transform: rotateY(2deg);
        }

        .rotate-x-1 {
          transform: rotateX(1deg);
        }
      `}</style>
    </div>
  );
}
