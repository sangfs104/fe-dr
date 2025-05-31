// "use client";

// import "keen-slider/keen-slider.min.css";
// import { motion } from "framer-motion";
// import { useState, useEffect, useRef } from "react";
// import { useKeenSlider } from "keen-slider/react";

// const banners = [
//   {
//     title: "Style that Speaks",
//     subtitle: "Elevate your everyday with our signature collection.",
//     image: "/img/banner1.webp",
//     cta: "Explore Now",
//     layout: "left",
//   },
//   {
//     title: "Bold & Timeless",
//     subtitle: "Crafted to define your fashion identity.",
//     image: "/img/banner2.webp",
//     cta: "Discover More",
//     layout: "center",
//   },
//   {
//     title: "Fashion Redefined",
//     subtitle: "Where trends meet authenticity.",
//     image: "/img/banner3.webp",
//     cta: "Shop Collection",
//     layout: "right",
//   },
// ];

// export default function BannerCarousel() {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Ref để lưu instance slider, dùng để gọi .next()
//   const sliderInstance = useRef(null);

//   const [sliderRef] = useKeenSlider({
//     loop: true,
//     slides: { perView: 1 },
//     duration: 1000,
//     slideChanged(s) {
//       setCurrentSlide(s.track.details.rel);
//     },
//     created(s) {
//       // Khi slider được tạo, lưu instance vào ref
//       sliderInstance.current = s;
//     },
//   });

//   // Autoplay bằng setInterval gọi sliderInstance.current.next()
//   useEffect(() => {
//     if (!sliderInstance.current) return;

//     const interval = setInterval(() => {
//       sliderInstance.current.next();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [sliderInstance.current]); // dependency để chắc chắn có sliderInstance

//   const contentAlignment = {
//     left: "items-start text-left",
//     center: "items-center text-center",
//     right: "items-end text-right",
//   };

//   const variants = {
//     hidden: { opacity: 0, x: -50 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
//   };

//   return (
//     <div
//       ref={sliderRef}
//       className="keen-slider h-[80vh] relative overflow-hidden"
//     >
//       {banners.map((banner, idx) => (
//         <div
//           key={idx}
//           className="keen-slider__slide relative"
//           aria-hidden={currentSlide !== idx}
//           style={{ pointerEvents: currentSlide === idx ? "auto" : "none" }}
//         >
//           <img
//             src={banner.image}
//             alt={banner.title}
//             className="w-full h-full object-cover"
//           />

//           <div
//             className={`absolute inset-0 bg-black/40 flex flex-col justify-center ${
//               contentAlignment[banner.layout]
//             } px-6 gap-4`}
//           >
//             <motion.h2
//               className="text-4xl md:text-6xl font-bold text-white"
//               key={`title-${idx}-${currentSlide}`}
//               initial="hidden"
//               animate={currentSlide === idx ? "visible" : "hidden"}
//               variants={variants}
//             >
//               {banner.title}
//             </motion.h2>
//             <motion.p
//               className="text-lg md:text-xl text-white max-w-xl"
//               key={`subtitle-${idx}-${currentSlide}`}
//               initial={{ opacity: 0, y: 20 }}
//               animate={
//                 currentSlide === idx
//                   ? { opacity: 1, y: 0 }
//                   : { opacity: 0, y: 20 }
//               }
//               transition={{ duration: 0.8, delay: 0.3 }}
//             >
//               {banner.subtitle}
//             </motion.p>
//             <motion.button
//               className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-purple-600 hover:text-white transition"
//               key={`button-${idx}-${currentSlide}`}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={
//                 currentSlide === idx
//                   ? { opacity: 1, scale: 1 }
//                   : { opacity: 0, scale: 0.9 }
//               }
//               transition={{ duration: 0.5, delay: 0.5 }}
//             >
//               {banner.cta}
//             </motion.button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
"use client";

import "keen-slider/keen-slider.min.css";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";

const bannersVi = [
  {
    title: "Phong cách lên tiếng",
    subtitle: "Nâng tầm mỗi ngày với bộ sưu tập đặc trưng của chúng tôi.",
    image: "/img/banner1.webp",
    cta: "Khám phá ngay",
    layout: "left",
  },
  {
    title: "Đậm cá tính & Vượt thời gian",
    subtitle: "Được chế tác để định nghĩa phong cách thời trang của bạn.",
    image: "/img/banner2.webp",
    cta: "Tìm hiểu thêm",
    layout: "center",
  },
  {
    title: "Thời trang được tái định nghĩa",
    subtitle: "Nơi xu hướng gặp gỡ sự chân thực.",
    image: "/img/banner3.webp",
    cta: "Mua bộ sưu tập",
    layout: "right",
  },
];

const bannersEn = [
  {
    title: "Style that Speaks",
    subtitle: "Elevate your everyday with our signature collection.",
    image: "/img/banner1.webp",
    cta: "Explore Now",
    layout: "left",
  },
  {
    title: "Bold & Timeless",
    subtitle: "Crafted to define your fashion identity.",
    image: "/img/banner2.webp",
    cta: "Discover More",
    layout: "center",
  },
  {
    title: "Fashion Redefined",
    subtitle: "Where trends meet authenticity.",
    image: "/img/banner3.webp",
    cta: "Shop Collection",
    layout: "right",
  },
];

export default function BannerCarousel({ language = "vi" }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderInstance = useRef(null);

  const banners = language === "vi" ? bannersVi : bannersEn;

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
    duration: 1000,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    created(s) {
      sliderInstance.current = s;
    },
  });

  useEffect(() => {
    if (!sliderInstance.current) return;

    const interval = setInterval(() => {
      sliderInstance.current.next();
    }, 5000);

    return () => clearInterval(interval);
  }, [sliderInstance.current]);

  const contentAlignment = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  const variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <div
      ref={sliderRef}
      className="keen-slider h-[80vh] relative overflow-hidden"
    >
      {banners.map((banner, idx) => (
        <div
          key={idx}
          className="keen-slider__slide relative"
          aria-hidden={currentSlide !== idx}
          style={{ pointerEvents: currentSlide === idx ? "auto" : "none" }}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />

          <div
            className={`absolute inset-0 bg-black/40 flex flex-col justify-center ${
              contentAlignment[banner.layout]
            } px-6 gap-4`}
          >
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white"
              key={`title-${idx}-${currentSlide}`}
              initial="hidden"
              animate={currentSlide === idx ? "visible" : "hidden"}
              variants={variants}
            >
              {banner.title}
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-white max-w-xl"
              key={`subtitle-${idx}-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={
                currentSlide === idx
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {banner.subtitle}
            </motion.p>
            <motion.button
              className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-purple-600 hover:text-white transition"
              key={`button-${idx}-${currentSlide}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                currentSlide === idx
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {banner.cta}
            </motion.button>
          </div>
        </div>
      ))}
    </div>
  );
}
