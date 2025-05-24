"use client";
import { useEffect, useRef, useState } from "react";
import "../css/banner.css";

const Banner = () => {
  const leftBannerRef = useRef(null);
  const rightTopBannerRef = useRef(null);
  const rightBottomBannerRef = useRef(null);

  const leftImages = [
    "img/banner.webp",
    "img/banner2.webp",
    "img/banner3.webp",
  ];
  const rightTopImages = ["img/banner4.webp", "img/banner3.webp"];
  const rightBottomImages = ["img/banner1.webp", "img/banner.webp"];

  const createImage = (src) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "slide-img enter";
    return img;
  };

  const slideImage = (container, newSrc) => {
    if (!container) return;
    const oldImg = container.querySelector("img");
    const newImg = createImage(newSrc);
    container.appendChild(newImg);

    requestAnimationFrame(() => {
      newImg.classList.remove("enter");
      if (oldImg) oldImg.classList.add("slide");
    });

    setTimeout(() => {
      if (oldImg) container.removeChild(oldImg);
    }, 600);
  };

  useEffect(() => {
    let leftIndex = 0,
      topIndex = 0,
      bottomIndex = 0;

    slideImage(leftBannerRef.current, leftImages[leftIndex]);
    slideImage(rightTopBannerRef.current, rightTopImages[topIndex]);
    slideImage(rightBottomBannerRef.current, rightBottomImages[bottomIndex]);

    const leftInterval = setInterval(() => {
      leftIndex = (leftIndex + 1) % leftImages.length;
      slideImage(leftBannerRef.current, leftImages[leftIndex]);
    }, 5000);

    const topInterval = setInterval(() => {
      topIndex = (topIndex + 1) % rightTopImages.length;
      slideImage(rightTopBannerRef.current, rightTopImages[topIndex]);
    }, 4000);

    const bottomInterval = setInterval(() => {
      bottomIndex = (bottomIndex + 1) % rightBottomImages.length;
      slideImage(rightBottomBannerRef.current, rightBottomImages[bottomIndex]);
    }, 3000);

    return () => {
      clearInterval(leftInterval);
      clearInterval(topInterval);
      clearInterval(bottomInterval);
    };
  }, []);

  return (
    <div className="container-banner">
      <div className="left-banner" ref={leftBannerRef}></div>
      <div className="right-banners">
        <div className="right-banner" ref={rightTopBannerRef}></div>
        <div className="right-banner" ref={rightBottomBannerRef}></div>
      </div>
    </div>
  );
};

export default Banner;
