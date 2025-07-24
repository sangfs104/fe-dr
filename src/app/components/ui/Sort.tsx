"use client";

import React, { useEffect, useState } from "react";
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

interface BreadcrumbFilterProps {
  onSortChange?: (sortOrder: "asc" | "desc") => void;
  onSizeChange?: (size: string | null) => void;
  onPriceChange?: (price: number) => void;
  currentPrice?: number;
}

export default function BreadcrumbFilter({
  onSortChange,
  onSizeChange,
  onPriceChange,
  currentPrice,
}: BreadcrumbFilterProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false); // 👈
  const [activeTab, setActiveTab] = useState<"color" | "size" | "price">("color");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number>(currentPrice ?? 0);
  const [categoryList, setCategoryList] = useState<any[]>([]); // 👈

  useEffect(() => {
    fetch("http://127.0.0.1:8000/category")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          setCategoryList(data.data.filter((c) => c.status === 1));
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy danh mục:", err);
      });
  }, []);

  function toggleFilter() {
    setFilterOpen(!filterOpen);
    if (!filterOpen) setSortOpen(false);
    setCategoryOpen(false);
  }

  function toggleSort() {
    setSortOpen(!sortOpen);
    if (!sortOpen) setFilterOpen(false);
    setCategoryOpen(false);
  }

  function toggleCategory() {
    setCategoryOpen(!categoryOpen);
    if (!categoryOpen) {
      setFilterOpen(false);
      setSortOpen(false);
    }
  }

  function selectSize(size: string) {
    setSelectedSize(size);
    onSizeChange?.(size);
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);
    setPriceRange(value);
    onPriceChange?.(value);
  }

  function createRipple(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
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

  function handleSort(sortOrder: "asc" | "desc") {
    onSortChange?.(sortOrder);
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
      <div className="border px-40 py-4 flex justify-between items-center bg-white relative">
        <div className="flex items-center gap-6">
          <div className="font-bold">Sản phẩm</div>
          <div className="text-gray-500 text-sm">
            Trang chủ <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>

        <div className="flex items-center gap-4 text-lg text-gray-700 cursor-pointer">
          <FontAwesomeIcon icon={faFilter} onClick={toggleFilter} />
          <FontAwesomeIcon icon={faBars} onClick={toggleSort} />
          <FontAwesomeIcon icon={faGrip} onClick={toggleCategory} />
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
                    activeTab === tab ? "border-black font-bold" : "border-gray-300"
                  }`}
                  onClick={() => setActiveTab(tab as "color" | "size" | "price")}
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
                      selectedSize === size ? "border-black font-bold" : "border-gray-300"
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
                onClick={() => setFilterOpen(false)}
              >
                Đóng
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

        {/* DANH MỤC sản phẩm */}
        {categoryOpen && (
          <div className="absolute top-16 right-0 w-64 bg-white border p-4 shadow-lg z-10 max-h-[300px] overflow-y-auto">
            <h4 className="text-base mb-3 font-medium">Danh mục sản phẩm</h4>
            {categoryList.length > 0 ? (
              <ul className="text-sm space-y-2">
                {categoryList.map((cat) => (
                  <li
                    key={cat.id}
                    className="cursor-pointer hover:font-semibold"
                    // Bạn có thể thêm logic khi click để lọc sản phẩm theo danh mục
                  >
                    {cat.name}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-sm text-gray-400">Không có danh mục nào.</div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
