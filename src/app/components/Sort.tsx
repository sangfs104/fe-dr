"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faFilter,
  faBars,
  faGrip,
  faArrowDown19,
  faArrowDown91,
} from "@fortawesome/free-solid-svg-icons";

const sizes = ["S", "M", "L", "XL"];

export default function BreadcrumbFilter({ onSortChange, onSizeChange, onPriceChange, currentPrice }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("color");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [priceRange, setPriceRange] = useState(currentPrice ?? 0);

  function toggleFilter() {
    setFilterOpen(!filterOpen);
    if (!filterOpen) setSortOpen(false);
  }

  function toggleSort() {
    setSortOpen(!sortOpen);
    if (!sortOpen) setFilterOpen(false);
  }

  function selectSize(size) {
    setSelectedSize(size);
  }

  function handlePriceChange(e) {
    setPriceRange(parseInt(e.target.value));
  }

  function createRipple(e) {
    const button = e.currentTarget;
    const circle = document.createElement("span");
    circle.className = "ripple";
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    circle.style.width = circle.style.height = size + "px";
    circle.style.left = e.clientX - rect.left - size / 2 + "px";
    circle.style.top = e.clientY - rect.top - size / 2 + "px";
    button.appendChild(circle);
    setTimeout(() => {
      circle.remove();
    }, 600);
  }

  function handleSort(sortOrder) {
    if (onSortChange) {
      onSortChange(sortOrder);
    }
  }

  function handleApplyFilters() {
    if (activeTab === "size" && selectedSize) {
      onSizeChange?.(selectedSize);
    }
    if (activeTab === "price" && priceRange > 0) {
      onPriceChange?.(priceRange);
    }
    setFilterOpen(false);
  }

  function handleClearFilters() {
    setSelectedColors([]);
    setSelectedSize(null);
    setPriceRange(0);
    onSizeChange?.(null);
    onPriceChange?.(0);
  }

  return (
    <>
      <div className="border px-24 py-4 flex justify-between items-center bg-white relative">
        <div className="flex items-center gap-6">
          <div className="font-bold">Sản phẩm</div>
          <div className="text-gray-500 text-sm">
            Trang chủ <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
        <div className="flex items-center gap-4 text-lg text-gray-700 cursor-pointer">
          <FontAwesomeIcon icon={faFilter} onClick={toggleFilter} />
          <FontAwesomeIcon icon={faBars} onClick={toggleSort} />
          <FontAwesomeIcon icon={faGrip} />
        </div>

        {/* Bộ lọc */}
        {filterOpen && (
          <div className="absolute top-16 right-[70px] w-72 bg-white border p-5 shadow-lg z-10">
            <h4 className="text-base mb-3 font-medium">Bộ lọc</h4>
            <div className="flex gap-2 mb-4">
              {["color", "size", "price"].map((tab) => (
                <button
                  key={tab}
                  className={`px-3 py-2 border cursor-pointer ${
                    activeTab === tab
                      ? "border-black font-bold"
                      : "border-gray-300"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "color" ? "Màu" : tab === "size" ? "Kích Cỡ" : "Giá"}
                </button>
              ))}
            </div>

            {activeTab === "size" && (
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <div
                    key={size}
                    className={`w-12 px-2 py-1 border text-center cursor-pointer ${
                      selectedSize === size
                        ? "border-black font-bold"
                        : "border-gray-300"
                    }`}
                    onClick={(e) => {
                      createRipple(e);
                      selectSize(size);
                    }}
                  >
                    {size}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "price" && (
              <div className="mt-5">
                <input
                  type="range"
                  min={0}
                  max={2000000}
                  step={10000}
                  value={priceRange}
                  onChange={handlePriceChange}
                  className="w-full"
                />
                <div className="flex justify-between text-sm mt-1">
                  <span>0đ</span>
                  <span>2,000,000đ</span>
                </div>
                <div className="text-center text-sm mt-2">
                  Giá dưới: {priceRange.toLocaleString("vi-VN")}₫
                </div>
              </div>
            )}

            <div className="flex justify-between mt-4 gap-2">
              <button
                className="w-[117px] h-[45px] text-sm bg-gray-100 border border-gray-300"
                onClick={handleClearFilters}
              >
                Xoá hết
              </button>
              <button
                className="w-[117px] h-[45px] text-sm bg-black text-white"
                onClick={handleApplyFilters}
              >
                Xem kết quả
              </button>
            </div>
          </div>
        )}

        {/* Sắp xếp */}
        {sortOpen && (
          <div className="absolute top-16 right-6 w-52 bg-white border p-4 shadow-lg z-10">
            <h4 className="text-base mb-3 font-medium">Sắp xếp theo</h4>
            <ul className="text-sm">
              <li
                className="py-2 border-b cursor-pointer hover:font-bold"
                onClick={() => handleSort("desc")}
              >
                <FontAwesomeIcon icon={faArrowDown19} className="mr-2" />
                Giá giảm dần
              </li>
              <li
                className="py-2 cursor-pointer hover:font-bold"
                onClick={() => handleSort("asc")}
              >
                <FontAwesomeIcon icon={faArrowDown91} className="mr-2" />
                Giá tăng dần
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3 px-24 py-4 border-b text-sm">
        <button className="border px-2 py-1 bg-white">GIÁ TỐT</button>
        <button className="border px-2 py-1 bg-white">Áo Thun Nữ</button>
        <button className="border px-2 py-1 bg-white">Áo Tank Top Nữ</button>
        <button className="border px-2 py-1 bg-white">Áo Sơ Mi Nữ</button>
      </div>
    </>
  );
}
