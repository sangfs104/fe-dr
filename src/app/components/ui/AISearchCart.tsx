"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const IMAGE_BASE_URL = "http://localhost:8000/img/";

export default function AISearchCard() {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSearch = async () => {
    if (!image) return toast.error("Vui lòng chọn ảnh!");

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/api/image-search",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResults(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi tìm kiếm hình ảnh");
    } finally {
      setLoading(false);
    }
  };

  const groupedResults = results.reduce((acc, item) => {
    const pid = item.product_id;
    if (!acc[pid]) {
      acc[pid] = {
        product_id: pid,
        product_name: item.product_name,
        images: [],
        score: item.score,
        price: item.price || Math.floor(Math.random() * 500000 + 100000),
      };
    }
    acc[pid].images.push(item.image_path);
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="p-4 w-full max-w-2xl mx-auto font-sans">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
        Tìm sản phẩm bằng hình ảnh
      </h2>

      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-3 justify-center">
          <label className="cursor-pointer border border-dashed border-gray-400 px-4 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition">
            Chọn ảnh
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <button
            onClick={handleSearch}
            className="bg-gray-800 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-700 transition"
          >
            Tìm kiếm
          </button>
        </div>

        {previewUrl && (
          <div className="mt-4 text-center">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-28 h-28 object-cover rounded border inline-block"
            />
          </div>
        )}
      </div>

      {loading && (
        <p className="text-center text-sm text-gray-500">Đang xử lý...</p>
      )}

      {!loading && results.length === 0 && image && (
        <p className="text-center text-sm text-gray-400">
          Không tìm thấy sản phẩm tương tự.
        </p>
      )}

      {Object.values(groupedResults).length > 0 && (
        <div className="space-y-5">
          <h3 className="text-sm font-medium text-gray-700">
            Kết quả tương đồng
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.values(groupedResults).map((item: any, idx: number) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-lg p-3 bg-white hover:shadow-sm transition"
              >
                <img
                  src={`${IMAGE_BASE_URL}${item.images[0]}`}
                  alt={item.product_name}
                  className="w-full h-40 object-cover rounded mb-2"
                />

                <div className="flex gap-1 overflow-x-auto pb-1">
                  {item.images.map((img: string, i: number) => (
                    <img
                      key={i}
                      src={`${IMAGE_BASE_URL}${img}`}
                      alt={`thumb-${i}`}
                      className="w-8 h-8 object-cover rounded border"
                    />
                  ))}
                </div>

                <div className="mt-2 text-sm text-gray-700 space-y-1">
                  <p className="line-clamp-1">{item.product_name}</p>
                  <p className="font-semibold text-gray-900">
                    {item.price.toLocaleString()} ₫
                  </p>
                  <p className="text-xs text-gray-400">
                    Độ tương đồng: {item.score?.toFixed(3)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
