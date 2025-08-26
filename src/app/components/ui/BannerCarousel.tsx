"use client";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import {
  useKeenSlider,
  KeenSliderInstance,
  KeenSliderPlugin,
} from "keen-slider/react";

type Banner = {
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  layout: "left" | "center" | "right";
};

const bannersVi: Banner[] = [
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

const bannersEn: Banner[] = [
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

const Autoplay = (delay: number): KeenSliderPlugin => (slider) => {
  let timeout: ReturnType<typeof setTimeout>;
  let mouseOver = false;

  function clearNextTimeout() {
    clearTimeout(timeout);
  }

  function nextTimeout() {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, delay);
  }

  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
    });
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false;
      nextTimeout();
    });
    nextTimeout();
  });

  slider.on("dragStarted", clearNextTimeout);
  slider.on("animationEnded", nextTimeout);
  slider.on("updated", nextTimeout);
};

interface BannerCarouselProps {
  language?: "vi" | "en";
}

export default function BannerCarousel({
  language = "vi",
}: BannerCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderInstance = useRef<KeenSliderInstance | null>(null);
  const banners = language === "vi" ? bannersVi : bannersEn;

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: { perView: 1 },
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel);
      },
      created(s) {
        sliderInstance.current = s;
      },
    },
    [Autoplay(5000)]
  );

  const contentAlignment: Record<Banner["layout"], string> = {
    left: "items-start text-left",
    center: "items-center text-center",
    right: "items-end text-right",
  };

  return (
    <div
      ref={sliderRef}
      className="keen-slider h-[70vh] sm:h-[80vh] relative overflow-hidden"
    >
      {banners.map((banner, idx) => (
        <div
          key={idx}
          className="keen-slider__slide relative"
          aria-hidden={currentSlide !== idx}
          style={{ pointerEvents: currentSlide === idx ? "auto" : "none" }}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover"
              priority={idx === 0}
            />
          </div>

          {/* AnimatePresence cho từng banner */}
          <AnimatePresence mode="wait">
            {currentSlide === idx && (
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className={`absolute inset-0 bg-black/40 flex flex-col justify-center ${
                  contentAlignment[banner.layout]
                } px-4 sm:px-10 md:px-20 lg:px-32 xl:px-40 gap-3 sm:gap-4`}
              >
                <motion.h2
                  className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.8 }}
                >
                  {banner.title}
                </motion.h2>

                <motion.p
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-white max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {banner.subtitle}
                </motion.p>

                <motion.button
                  className="bg-white text-black px-6 sm:px-12 md:px-16 py-2 sm:py-3 rounded-md font-medium text-sm sm:text-base hover:bg-purple-600 hover:text-white transition"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {banner.cta}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
