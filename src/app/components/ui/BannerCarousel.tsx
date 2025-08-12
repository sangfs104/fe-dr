// // "use client";
// // import Image from "next/image";
// // import "keen-slider/keen-slider.min.css";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { useState, useRef } from "react";
// // import {
// //   useKeenSlider,
// //   KeenSliderInstance,
// //   KeenSliderPlugin,
// // } from "keen-slider/react";

// // type Banner = {
// //   title: string;
// //   subtitle: string;
// //   image: string;
// //   cta: string;
// //   layout: "left" | "center" | "right";
// // };

// // const bannersVi: Banner[] = [
// //   {
// //     title: "Phong cách lên tiếng",
// //     subtitle: "Nâng tầm mỗi ngày với bộ sưu tập đặc trưng của chúng tôi.",
// //     image: "/img/banner1.webp",
// //     cta: "Khám phá ngay",
// //     layout: "left",
// //   },
// //   {
// //     title: "Đậm cá tính & Vượt thời gian",
// //     subtitle: "Được chế tác để định nghĩa phong cách thời trang của bạn.",
// //     image: "/img/banner2.webp",
// //     cta: "Tìm hiểu thêm",
// //     layout: "center",
// //   },
// //   {
// //     title: "Thời trang được tái định nghĩa",
// //     subtitle: "Nơi xu hướng gặp gỡ sự chân thực.",
// //     image: "/img/banner3.webp",
// //     cta: "Mua bộ sưu tập",
// //     layout: "right",
// //   },
// // ];

// // const bannersEn: Banner[] = [
// //   {
// //     title: "Style that Speaks",
// //     subtitle: "Elevate your everyday with our signature collection.",
// //     image: "/img/banner1.webp",
// //     cta: "Explore Now",
// //     layout: "left",
// //   },
// //   {
// //     title: "Bold & Timeless",
// //     subtitle: "Crafted to define your fashion identity.",
// //     image: "/img/banner2.webp",
// //     cta: "Discover More",
// //     layout: "center",
// //   },
// //   {
// //     title: "Fashion Redefined",
// //     subtitle: "Where trends meet authenticity.",
// //     image: "/img/banner3.webp",
// //     cta: "Shop Collection",
// //     layout: "right",
// //   },
// // ];

// // const Autoplay = (delay: number): KeenSliderPlugin => (slider) => {
// //   let timeout: ReturnType<typeof setTimeout>;
// //   let mouseOver = false;

// //   function clearNextTimeout() {
// //     clearTimeout(timeout);
// //   }

// //   function nextTimeout() {
// //     clearTimeout(timeout);
// //     if (mouseOver) return;
// //     timeout = setTimeout(() => {
// //       slider.next();
// //     }, delay);
// //   }

// //   slider.on("created", () => {
// //     slider.container.addEventListener("mouseover", () => {
// //       mouseOver = true;
// //       clearNextTimeout();
// //     });
// //     slider.container.addEventListener("mouseout", () => {
// //       mouseOver = false;
// //       nextTimeout();
// //     });
// //     nextTimeout();
// //   });

// //   slider.on("dragStarted", clearNextTimeout);
// //   slider.on("animationEnded", nextTimeout);
// //   slider.on("updated", nextTimeout);
// // };

// // interface BannerCarouselProps {
// //   language?: "vi" | "en";
// // }

// // export default function BannerCarousel({
// //   language = "vi",
// // }: BannerCarouselProps) {
// //   const [currentSlide, setCurrentSlide] = useState(0);
// //   const sliderInstance = useRef<KeenSliderInstance | null>(null);
// //   const banners = language === "vi" ? bannersVi : bannersEn;

// //   const [sliderRef] = useKeenSlider<HTMLDivElement>(
// //     {
// //       loop: true,
// //       slides: { perView: 1 },
// //       slideChanged(s) {
// //         setCurrentSlide(s.track.details.rel);
// //       },
// //       created(s) {
// //         sliderInstance.current = s;
// //       },
// //     },
// //     [Autoplay(5000)]
// //   );

// //   const contentAlignment: Record<Banner["layout"], string> = {
// //     left: "items-start text-left",
// //     center: "items-center text-center",
// //     right: "items-end text-right",
// //   };

// //   return (
// //     <div
// //       ref={sliderRef}
// //       className="keen-slider h-[70vh] sm:h-[80vh] relative overflow-hidden"
// //     >
// //       {banners.map((banner, idx) => (
// //         <div
// //           key={idx}
// //           className="keen-slider__slide relative"
// //           aria-hidden={currentSlide !== idx}
// //           style={{ pointerEvents: currentSlide === idx ? "auto" : "none" }}
// //         >
// //           {/* Background Image */}
// //           <div className="absolute inset-0">
// //             <Image
// //               src={banner.image}
// //               alt={banner.title}
// //               fill
// //               className="object-cover"
// //               priority={idx === 0}
// //             />
// //           </div>

// //           {/* AnimatePresence cho từng banner */}
// //           <AnimatePresence mode="wait">
// //             {currentSlide === idx && (
// //               <motion.div
// //                 key={currentSlide}
// //                 initial={{ opacity: 0 }}
// //                 animate={{ opacity: 1 }}
// //                 exit={{ opacity: 0 }}
// //                 transition={{ duration: 0.6 }}
// //                 className={`absolute inset-0 bg-black/40 flex flex-col justify-center ${
// //                   contentAlignment[banner.layout]
// //                 } px-4 sm:px-10 md:px-20 lg:px-32 xl:px-40 gap-3 sm:gap-4`}
// //               >
// //                 <motion.h2
// //                   className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
// //                   initial={{ opacity: 0, x: -50 }}
// //                   animate={{ opacity: 1, x: 0 }}
// //                   exit={{ opacity: 0, x: 50 }}
// //                   transition={{ duration: 0.8 }}
// //                 >
// //                   {banner.title}
// //                 </motion.h2>

// //                 <motion.p
// //                   className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-xl"
// //                   initial={{ opacity: 0, y: 20 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   exit={{ opacity: 0, y: 20 }}
// //                   transition={{ duration: 0.8, delay: 0.2 }}
// //                 >
// //                   {banner.subtitle}
// //                 </motion.p>

// //                 <motion.button
// //                   className="bg-white text-black px-6 sm:px-12 md:px-16 py-2 sm:py-3 rounded-md font-medium text-sm sm:text-base hover:bg-purple-600 hover:text-white transition"
// //                   initial={{ opacity: 0, scale: 0.9 }}
// //                   animate={{ opacity: 1, scale: 1 }}
// //                   exit={{ opacity: 0, scale: 0.9 }}
// //                   transition={{ duration: 0.6, delay: 0.4 }}
// //                 >
// //                   {banner.cta}
// //                 </motion.button>
// //               </motion.div>
// //             )}
// //           </AnimatePresence>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// "use client";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useRef, useEffect } from "react";

// type Banner = {
//   title: string;
//   subtitle: string;
//   image: string;
//   cta: string;
//   layout: "left" | "center" | "right";
//   theme: "light" | "dark" | "gradient";
// };

// const bannersVi: Banner[] = [
//   {
//     title: "Phong cách lên tiếng",
//     subtitle: "Nâng tầm mỗi ngày với bộ sưu tập đặc trưng của chúng tôi.",
//     image:
//       "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop",
//     cta: "Khám phá ngay",
//     layout: "left",
//     theme: "dark",
//   },
//   {
//     title: "Đậm cá tính & Vượt thời gian",
//     subtitle: "Được chế tác để định nghĩa phong cách thời trang của bạn.",
//     image:
//       "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=1080&fit=crop",
//     cta: "Tìm hiểu thêm",
//     layout: "center",
//     theme: "gradient",
//   },
//   {
//     title: "Thời trang được tái định nghĩa",
//     subtitle: "Nơi xu hướng gặp gỡ sự chân thực.",
//     image:
//       "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=1920&h=1080&fit=crop",
//     cta: "Mua bộ sưu tập",
//     layout: "right",
//     theme: "light",
//   },
// ];

// const bannersEn: Banner[] = [
//   {
//     title: "Style that Speaks",
//     subtitle: "Elevate your everyday with our signature collection.",
//     image: "/img/banner1.webp",
//     cta: "Explore Now",
//     layout: "left",
//     theme: "dark",
//   },
//   {
//     title: "Bold & Timeless",
//     subtitle: "Crafted to define your fashion identity.",
//     image: "/img/banner2.webp",
//     cta: "Discover More",
//     layout: "center",
//     theme: "gradient",
//   },
//   {
//     title: "Fashion Redefined",
//     subtitle: "Where trends meet authenticity.",
//     image: "/img/banner3.webp",
//     cta: "Shop Collection",
//     layout: "right",
//     theme: "light",
//   },
// ];

// // Particle Component
// const ParticleSystem = () => {
//   const particles = Array.from({ length: 50 }, (_, i) => ({
//     id: i,
//     x: Math.random() * 100,
//     y: Math.random() * 100,
//     size: Math.random() * 4 + 1,
//     delay: Math.random() * 5,
//   }));

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {particles.map((particle) => (
//         <motion.div
//           key={particle.id}
//           className="absolute bg-white/20 rounded-full blur-sm"
//           style={{
//             left: `${particle.x}%`,
//             top: `${particle.y}%`,
//             width: `${particle.size}px`,
//             height: `${particle.size}px`,
//           }}
//           animate={{
//             y: [0, -100, 0],
//             opacity: [0, 0.6, 0],
//             scale: [0.5, 1, 0.5],
//           }}
//           transition={{
//             duration: 6 + Math.random() * 4,
//             repeat: Infinity,
//             delay: particle.delay,
//             ease: "easeInOut",
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// // Floating Orbs
// const FloatingOrbs = () => {
//   const orbs = Array.from({ length: 6 }, (_, i) => ({
//     id: i,
//     x: Math.random() * 80 + 10,
//     y: Math.random() * 80 + 10,
//     size: Math.random() * 200 + 100,
//     color: ["#FF6B35", "#FF8F00", "#FF5722", "#FF7043", "#FB8C00"][
//       Math.floor(Math.random() * 5)
//     ],
//   }));

//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       {orbs.map((orb) => (
//         <motion.div
//           key={orb.id}
//           className="absolute rounded-full blur-3xl opacity-20 mix-blend-multiply"
//           style={{
//             left: `${orb.x}%`,
//             top: `${orb.y}%`,
//             width: `${orb.size}px`,
//             height: `${orb.size}px`,
//             background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
//           }}
//           animate={{
//             x: [0, 100, -50, 0],
//             y: [0, -50, 100, 0],
//             scale: [1, 1.2, 0.8, 1],
//           }}
//           transition={{
//             duration: 15 + Math.random() * 10,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// interface BannerCarouselProps {
//   language?: "vi" | "en";
// }

// export default function BannerCarousel({
//   language = "vi",
// }: BannerCarouselProps) {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const banners = language === "vi" ? bannersVi : bannersEn;
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     if (isPlaying) {
//       intervalRef.current = setInterval(() => {
//         setCurrentSlide((prev) => (prev + 1) % banners.length);
//       }, 5000);
//     } else {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     }

//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current);
//     };
//   }, [isPlaying, banners.length]);

//   const contentAlignment: Record<Banner["layout"], string> = {
//     left: "items-start text-left",
//     center: "items-center text-center",
//     right: "items-end text-right",
//   };

//   const themeStyles = {
//     dark: "bg-gradient-to-br from-black/70 via-orange-900/50 to-red-900/70",
//     light:
//       "bg-gradient-to-br from-orange-100/30 via-amber-200/40 to-red-200/30",
//     gradient:
//       "bg-gradient-to-br from-orange-500/40 via-red-600/50 to-amber-500/40",
//   };

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % banners.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
//   };

//   return (
//     <div
//       className="relative h-[100vh] overflow-hidden bg-black"
//       onMouseEnter={() => setIsPlaying(false)}
//       onMouseLeave={() => setIsPlaying(true)}
//     >
//       {/* Background Images with Parallax Effect */}
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentSlide}
//           className="absolute inset-0"
//           initial={{ scale: 1.1, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           exit={{ scale: 0.95, opacity: 0 }}
//           transition={{ duration: 1.5, ease: "easeInOut" }}
//         >
//           <img
//             src={banners[currentSlide].image}
//             alt={banners[currentSlide].title}
//             className="w-full h-full object-cover"
//           />
//           <motion.div
//             className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5, duration: 1 }}
//           />
//         </motion.div>
//       </AnimatePresence>

//       {/* Floating Orbs */}
//       <FloatingOrbs />

//       {/* Particle System */}
//       <ParticleSystem />

//       {/* Animated Grid Overlay */}
//       <motion.div
//         className="absolute inset-0 opacity-10"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.1 }}
//         transition={{ duration: 2 }}
//         style={{
//           backgroundImage: `
//             linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
//           `,
//           backgroundSize: "50px 50px",
//         }}
//       />

//       {/* Main Content */}
//       <div className="relative z-10 h-full">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentSlide}
//             className={`h-full flex flex-col justify-center ${
//               contentAlignment[banners[currentSlide].layout]
//             } px-8 sm:px-16 lg:px-24 xl:px-32`}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             {/* Glassmorphism Container */}
//             <motion.div
//               className={`backdrop-blur-xl ${
//                 themeStyles[banners[currentSlide].theme]
//               } rounded-3xl p-8 sm:p-12 max-w-3xl border border-white/20 shadow-2xl`}
//               initial={{ y: 100, opacity: 0, scale: 0.8 }}
//               animate={{ y: 0, opacity: 1, scale: 1 }}
//               transition={{
//                 duration: 1,
//                 delay: 0.3,
//                 type: "spring",
//                 bounce: 0.4,
//               }}
//               whileHover={{ scale: 1.02, y: -10 }}
//             >
//               {/* Animated Title */}
//               <motion.h1
//                 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-red-400 to-amber-300 mb-6 leading-tight"
//                 initial={{ x: -100, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 1, delay: 0.5, type: "spring" }}
//                 whileHover={{
//                   backgroundImage:
//                     "linear-gradient(45deg, #FF6B35, #FF8F00, #FF5722, #FF7043)",
//                   transition: { duration: 0.5 },
//                 }}
//               >
//                 {banners[currentSlide].title.split(" ").map((word, i) => (
//                   <motion.span
//                     key={i}
//                     className="inline-block mr-4"
//                     initial={{ y: 50, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
//                     whileHover={{ y: -5, transition: { duration: 0.2 } }}
//                   >
//                     {word}
//                   </motion.span>
//                 ))}
//               </motion.h1>

//               {/* Animated Subtitle */}
//               <motion.p
//                 className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 font-light leading-relaxed"
//                 initial={{ x: 100, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 1, delay: 0.7 }}
//                 whileHover={{ x: 10, transition: { duration: 0.3 } }}
//               >
//                 {banners[currentSlide].subtitle}
//               </motion.p>

//               {/* Premium CTA Button */}
//               <motion.button
//                 className="group relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-600 to-orange-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl shadow-2xl border-2 border-white/20"
//                 initial={{ scale: 0, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{
//                   duration: 0.8,
//                   delay: 0.9,
//                   type: "spring",
//                   bounce: 0.5,
//                 }}
//                 whileHover={{
//                   scale: 1.05,
//                   boxShadow:
//                     "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 107, 53, 0.6)",
//                 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500"
//                   initial={{ x: "-100%" }}
//                   whileHover={{ x: "0%" }}
//                   transition={{ duration: 0.6 }}
//                 />
//                 <span className="relative z-10 flex items-center gap-3">
//                   {banners[currentSlide].cta}
//                   <motion.svg
//                     className="w-5 h-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     initial={{ x: 0 }}
//                     whileHover={{ x: 5 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M13 7l5 5m0 0l-5 5m5-5H6"
//                     />
//                   </motion.svg>
//                 </span>
//               </motion.button>
//             </motion.div>
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Navigation Controls */}
//       <div className="absolute top-1/2 left-6 transform -translate-y-1/2 z-20">
//         <motion.button
//           onClick={prevSlide}
//           className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
//           whileHover={{ scale: 1.1, x: -5 }}
//           whileTap={{ scale: 0.9 }}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M15 19l-7-7 7-7"
//             />
//           </svg>
//         </motion.button>
//       </div>

//       <div className="absolute top-1/2 right-6 transform -translate-y-1/2 z-20">
//         <motion.button
//           onClick={nextSlide}
//           className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
//           whileHover={{ scale: 1.1, x: 5 }}
//           whileTap={{ scale: 0.9 }}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9 5l7 7-7 7"
//             />
//           </svg>
//         </motion.button>
//       </div>

//       {/* Slide Indicators */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
//         {banners.map((_, i) => (
//           <motion.button
//             key={i}
//             onClick={() => setCurrentSlide(i)}
//             className={`h-3 rounded-full transition-all ${
//               i === currentSlide
//                 ? "w-12 bg-gradient-to-r from-orange-400 to-red-500"
//                 : "w-3 bg-white/40 hover:bg-white/60"
//             }`}
//             whileHover={{ scale: 1.2 }}
//             whileTap={{ scale: 0.9 }}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1 + i * 0.1 }}
//           />
//         ))}
//       </div>

//       {/* Play/Pause Button */}
//       <div className="absolute top-8 right-8 z-20">
//         <motion.button
//           onClick={() => setIsPlaying(!isPlaying)}
//           className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 1.2, type: "spring" }}
//         >
//           {isPlaying ? (
//             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
//             </svg>
//           ) : (
//             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M8 5v14l11-7z" />
//             </svg>
//           )}
//         </motion.button>
//       </div>

//       {/* Progress Bar */}
//       <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
//         <motion.div
//           className="h-full bg-gradient-to-r from-orange-400 via-red-500 to-amber-500"
//           initial={{ width: "0%" }}
//           animate={{ width: isPlaying ? "100%" : "0%" }}
//           transition={{
//             duration: 5,
//             repeat: isPlaying ? Infinity : 0,
//             ease: "linear",
//           }}
//           key={`${currentSlide}-${isPlaying}`}
//         />
//       </div>
//     </div>
//   );
// }
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

type Banner = {
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  layout: "left" | "center" | "right";
  theme: "light" | "dark" | "gradient";
};

const bannersVi: Banner[] = [
  {
    title: "Phong cách lên tiếng",
    subtitle: "Nâng tầm mỗi ngày với bộ sưu tập đặc trưng của chúng tôi.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop",
    cta: "Khám phá ngay",
    layout: "left",
    theme: "dark",
  },
  {
    title: "Đậm cá tính & Vượt thời gian",
    subtitle: "Được chế tác để định nghĩa phong cách thời trang của bạn.",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=1080&fit=crop",
    cta: "Tìm hiểu thêm",
    layout: "center",
    theme: "gradient",
  },
  {
    title: "Thời trang được tái định nghĩa",
    subtitle: "Nơi xu hướng gặp gỡ sự chân thực.",
    image:
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=1920&h=1080&fit=crop",
    cta: "Mua bộ sưu tập",
    layout: "right",
    theme: "light",
  },
];

const bannersEn: Banner[] = [
  {
    title: "Style that Speaks",
    subtitle: "Elevate your everyday with our signature collection.",
    image: "/img/banner1.webp",
    cta: "Explore Now",
    layout: "left",
    theme: "dark",
  },
  {
    title: "Bold & Timeless",
    subtitle: "Crafted to define your fashion identity.",
    image: "/img/banner2.webp",
    cta: "Discover More",
    layout: "center",
    theme: "gradient",
  },
  {
    title: "Fashion Redefined",
    subtitle: "Where trends meet authenticity.",
    image: "/img/banner3.webp",
    cta: "Shop Collection",
    layout: "right",
    theme: "light",
  },
];

// Particle Component
const ParticleSystem = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-white/20 rounded-full blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Floating Orbs
const FloatingOrbs = () => {
  const orbs = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.random() * 80 + 10,
    y: Math.random() * 80 + 10,
    size: Math.random() * 200 + 100,
    color: ["#FF6B35", "#FF8F00", "#FF5722", "#FF7043", "#FB8C00"][
      Math.floor(Math.random() * 5)
    ],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-3xl opacity-20 mix-blend-multiply"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

interface BannerCarouselProps {
  language?: "vi" | "en";
}

export default function BannerCarousel({
  language = "vi",
}: BannerCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const banners = language === "vi" ? bannersVi : bannersEn;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % banners.length);
      }, 5000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, banners.length]);

  const contentAlignment: Record<Banner["layout"], string> = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  const themeStyles = {
    dark: "bg-gradient-to-br from-black/70 via-orange-900/50 to-red-900/70",
    light:
      "bg-gradient-to-br from-orange-100/30 via-amber-200/40 to-red-200/30",
    gradient:
      "bg-gradient-to-br from-orange-500/40 via-red-600/50 to-amber-500/40",
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div
      className="relative h-[100vh] overflow-hidden bg-black"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background Images with Parallax Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <Image
            src={banners[currentSlide].image}
            alt={banners[currentSlide].title}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Floating Orbs */}
      <FloatingOrbs />

      {/* Particle System */}
      <ParticleSystem />

      {/* Animated Grid Overlay */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className={`h-full flex flex-col justify-center ${
              contentAlignment[banners[currentSlide].layout]
            } px-8 sm:px-16 lg:px-24 xl:px-32`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Glassmorphism Container */}
            <motion.div
              className={`backdrop-blur-xl ${
                themeStyles[banners[currentSlide].theme]
              } rounded-3xl p-8 sm:p-12 max-w-3xl border border-white/20 shadow-2xl`}
              initial={{ y: 100, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                delay: 0.3,
                type: "spring",
                bounce: 0.4,
              }}
              whileHover={{ scale: 1.02, y: -10 }}
            >
              {/* Animated Title */}
              <motion.h1
                className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-red-400 to-amber-300 mb-6 leading-tight"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, type: "spring" }}
                whileHover={{
                  backgroundImage:
                    "linear-gradient(45deg, #FF6B35, #FF8F00, #FF5722, #FF7043)",
                  transition: { duration: 0.5 },
                }}
              >
                {banners[currentSlide].title.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-4"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Animated Subtitle */}
              <motion.p
                className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 font-light leading-relaxed"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                whileHover={{ x: 10, transition: { duration: 0.3 } }}
              >
                {banners[currentSlide].subtitle}
              </motion.p>

              {/* Premium CTA Button */}
              <motion.button
                className="group relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-600 to-orange-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl shadow-2xl border-2 border-white/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.9,
                  type: "spring",
                  bounce: 0.5,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 107, 53, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 flex items-center gap-3">
                  {banners[currentSlide].cta}
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </motion.svg>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute top-1/2 left-6 transform -translate-y-1/2 z-20">
        <motion.button
          onClick={prevSlide}
          className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </motion.button>
      </div>

      <div className="absolute top-1/2 right-6 transform -translate-y-1/2 z-20">
        <motion.button
          onClick={nextSlide}
          className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </motion.button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {banners.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-3 rounded-full transition-all ${
              i === currentSlide
                ? "w-12 bg-gradient-to-r from-orange-400 to-red-500"
                : "w-3 bg-white/40 hover:bg-white/60"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.1 }}
          />
        ))}
      </div>

      {/* Play/Pause Button */}
      <div className="absolute top-8 right-8 z-20">
        <motion.button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </motion.button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
        <motion.div
          className="h-full bg-gradient-to-r from-orange-400 via-red-500 to-amber-500"
          initial={{ width: "0%" }}
          animate={{ width: isPlaying ? "100%" : "0%" }}
          transition={{
            duration: 5,
            repeat: isPlaying ? Infinity : 0,
            ease: "linear",
          }}
          key={`${currentSlide}-${isPlaying}`}
        />
      </div>
    </div>
  );
}
