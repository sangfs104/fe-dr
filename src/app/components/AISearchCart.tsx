"use client";

import React, { useState } from "react";
import axios from "axios";

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
    if (!image) return alert("Vui lòng chọn ảnh!");

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
      alert("Lỗi khi tìm kiếm hình ảnh");
      console.error(err);
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
      };
    }
    acc[pid].images.push(item.image_path);
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="p-4 w-full max-w-2xl mx-auto font-sans">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
         Tìm sản phẩm bằng hình ảnh
      </h2>

      <div className="bg-white border rounded-lg p-4 shadow mb-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-dashed border-gray-400 p-2 rounded w-full md:w-auto"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            Tìm kiếm
          </button>
        </div>

        {previewUrl && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500 mb-1">Ảnh đã chọn:</p>
            <img
              src={previewUrl}
              alt="Preview"
              className="w-32 h-32 object-cover rounded border shadow inline-block"
            />
          </div>
        )}
      </div>

      {loading && (
        <p className="text-center text-blue-500 text-lg animate-pulse">
          ⏳ Đang xử lý...
        </p>
      )}

      {!loading && results.length === 0 && image && (
        <p className="text-center text-gray-500">
          Không tìm thấy sản phẩm tương tự.
        </p>
      )}

      {Object.values(groupedResults).length > 0 && (
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700">
             Kết quả tương đồng
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.values(groupedResults).map((item: any, idx: number) => (
              <div
                key={idx}
                className="border rounded-lg shadow-sm p-3 hover:shadow-md transition"
              >
                <img
                  src={`${IMAGE_BASE_URL}${item.images[0]}`}
                  alt={item.product_name}
                  className="w-full h-40 object-cover rounded mb-2"
                />

                <div className="flex gap-2 overflow-x-auto pb-1">
                  {item.images.map((img: string, i: number) => (
                    <img
                      key={i}
                      src={`${IMAGE_BASE_URL}${img}`}
                      alt={`thumb-${i}`}
                      className="w-12 h-12 object-cover rounded border hover:border-blue-500"
                    />
                  ))}
                </div>

                <div className="mt-2 text-sm">
                  <p className="text-gray-500">Sản phẩm:</p>
                  <p className="font-semibold">{item.product_name}</p>
                  <p className="text-gray-600">
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
