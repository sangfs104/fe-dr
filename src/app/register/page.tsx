"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import HeaderHome from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Đăng ký thành công!");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        setMessage(data.message || "Đăng ký thất bại");
      }
    } catch (err) {
      console.error(err);
      setMessage("Lỗi kết nối tới server");
    }
  };

  const passed = [
    /[A-Z]/.test(formData.password),
    /[a-z]/.test(formData.password),
    /[0-9]/.test(formData.password),
    /[!@#\$%\^&*\)\(+=._-]/.test(formData.password),
  ].filter(Boolean).length;

  return (
    <div>
      <HeaderHome />
      <main className="min-h-[calc(100vh-200px)] flex justify-center items-center bg-gray-100 px-4">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-4xl p-8 animate-fade-in-up">
          <h2 className="text-2xl font-semibold text-purple-600 mb-1">
            Đăng ký
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Đăng ký tài khoản rinh ngay quà khủng
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label
                className="block font-semibold text-sm mb-1"
                htmlFor="name"
              >
                Họ tên
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Họ tên"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                className="block font-semibold text-sm mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="example@example.com"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                className="block font-semibold text-sm mb-1"
                htmlFor="phone"
              >
                Số điện thoại
              </label>
              <input
                id="phone"
                type="text"
                name="phone"
                placeholder="0123456789"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                className="block font-semibold text-sm mb-1"
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                  className="w-full px-4 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="col-span-full">
              <p className="text-xs text-gray-500 mb-1">
                (Mật khẩu cần có chữ hoa, thường, số và ký tự đặc biệt)
              </p>
              <p
                className={`text-sm font-medium ${
                  passed < 4 ? "text-red-500" : "text-green-500"
                }`}
              >
                {passed < 4 ? "Mật khẩu yếu" : "Mật khẩu mạnh"}
              </p>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3, 4].map((bar) => (
                  <span
                    key={bar}
                    className={`flex-1 h-1 rounded-full ${
                      passed >= bar ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="col-span-full">
              <button
                type="submit"
                className="w-full py-2 mt-4 bg-purple-100 text-purple-700 font-semibold rounded-md hover:bg-purple-200 transition"
              >
                Đăng ký
              </button>
              {message && (
                <p className="mt-2 text-center text-sm text-red-500 font-medium">
                  {message}
                </p>
              )}
              <p className="mt-4 text-center text-sm">
                Đã có tài khoản?{" "}
                <a href="/login" className="text-purple-600 hover:underline">
                  Đăng nhập
                </a>
              </p>
              <div className="my-4 text-center text-gray-400 text-sm">Hoặc</div>
              <button
                type="button"
                className="flex items-center justify-center gap-3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition w-full"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Đăng nhập bằng Google
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
