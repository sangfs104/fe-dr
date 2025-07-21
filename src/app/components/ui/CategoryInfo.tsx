"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
type Category = {
  id: number;
  image_url: string;
  name: string;
};

export default function CategoryInfo() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/category")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Đang tải...</div>;

  return (
    <div>
      {categories.map((cat) => (
        <div
          key={cat.id}
          style={{ display: "flex", alignItems: "center", marginBottom: 16 }}
        >
          <img
            src={`/img/${cat.image_url}`}
            alt={cat.name}
            style={{
              width: 60,
              height: 60,
              objectFit: "cover",
              marginRight: 16,
            }}
          />
          <span style={{ fontWeight: "bold", fontSize: 18 }}>{cat.name}</span>
        </div>
      ))}
    </div>
  );
}
