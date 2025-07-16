"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import HeaderHome from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleLoginButton from "../components/ui/GoogleLoginButton";
import { motion } from "framer-motion";

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
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = { name: "", email: "", phone: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Vui lòng nhập họ tên";
    } else if (!/^[\p{L}\s]+$/u.test(formData.name)) {
      newErrors.name = "Họ tên không hợp lệ";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^\d{10,11}$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Đăng ký thành công!");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        toast.error(data.message || "Đăng ký thất bại");
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi kết nối tới server");
    }
  };

  const passed = [
    /[A-Z]/.test(formData.password),
    /[a-z]/.test(formData.password),
    /[0-9]/.test(formData.password),
    /[!@#\$%\^&*\)\(+=._-]/.test(formData.password),
  ].filter(Boolean).length;

  return (
    <div className="flex flex-col p-4 min-h-screen bg-[#f9f9fb]">
      <HeaderHome />
      <main className="flex-grow p-4 flex justify-center items-center px-2 py-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col bg-white shadow-md rounded-xl overflow-hidden w-full max-w-[500px] sm:max-w-[600px] md:max-w-4xl max-h-screen"
        >
          {/* form content */}
          <div className="flex-grow p-4 sm:p-6 overflow-y-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-2 text-center sm:text-left">
              Đăng ký
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-4 text-center sm:text-left">
              Đăng ký tài khoản rinh ngay quà khủng
            </p>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {/* name */}
              <div className="col-span-1">
                <label
                  className="block text-xs sm:text-sm font-semibold mb-1"
                  htmlFor="name"
                >
                  Họ tên
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="Họ tên"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-300"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>

              {/* email */}
              <div className="col-span-1">
                <label
                  className="block text-xs sm:text-sm font-semibold mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  placeholder="example@example.com"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-300"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>

              {/* phone */}
              <div className="col-span-1">
                <label
                  className="block text-xs sm:text-sm font-semibold mb-1"
                  htmlFor="phone"
                >
                  Số điện thoại
                </label>
                <input
                  id="phone"
                  name="phone"
                  placeholder="0123456789"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-300"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>

              {/* password */}
              <div className="col-span-1">
                <label
                  className="block text-xs sm:text-sm font-semibold mb-1"
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
                    className="w-full px-4 py-2 border rounded-md pr-10 focus:ring-2 focus:ring-purple-300"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              {/* password strength */}
              <div className="col-span-full mt-2">
                <p className="text-xs text-gray-500 text-center sm:text-left">
                  (Mật khẩu cần có chữ hoa, thường, số và ký tự đặc biệt)
                </p>
                <p
                  className={`text-xs sm:text-sm font-medium ${
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

              {/* submit */}
              <div className="col-span-full mt-4">
                <button
                  type="submit"
                  className="w-full py-2 bg-[#FF5722] text-white font-semibold rounded-md hover:bg-[#e64a19] transition"
                >
                  Đăng ký
                </button>
                <p className="mt-3 text-center text-xs sm:text-sm">
                  Đã có tài khoản?{" "}
                  <a href="/login" className="text-purple-600 hover:underline">
                    Đăng nhập
                  </a>
                </p>
              </div>
            </form>
          </div>

          {/* google login */}
          <div className="p-4 border-t border-gray-200 text-center bg-white">
            <p className="text-xs sm:text-sm mb-2 text-gray-500">
              Hoặc đăng nhập bằng
            </p>
            <div className="flex justify-center">
              <GoogleLoginButton />
            </div>
          </div>
        </motion.div>
      </main>

      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </div>
  );
};

export default RegisterPage;
