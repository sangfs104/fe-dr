"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";

const RegisterForm = () => {
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        setTimeout(() => router.push("/login"), 1000);
      } else {
        setMessage(data.message || "Đăng ký thất bại");
      }
    } catch {
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
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]"
    >
      {(["name", "email", "phone"] as Array<keyof typeof formData>).map(
        (field) => (
          <div key={field} className="relative">
            <input
              id={field}
              name={field}
              type={field === "email" ? "email" : "text"}
              placeholder=" "
              value={formData[field]}
              onChange={handleChange}
              required
              className="peer w-full px-4 pt-6 pb-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <label
              htmlFor={field}
              className="absolute left-3 top-2 text-gray-500 text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm transition-all"
            >
              {field === "name"
                ? "Họ tên"
                : field === "email"
                ? "Email"
                : "Số điện thoại"}
            </label>
          </div>
        )
      )}

      {/* Password with floating label */}
      <div className="relative">
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder=" "
          value={formData.password}
          onChange={handleChange}
          required
          className="peer w-full px-4 pt-6 pb-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-purple-300"
        />
        <label
          htmlFor="password"
          className="absolute left-3 top-2 text-gray-500 text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm transition-all"
        >
          Mật khẩu
        </label>
        <span
          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {/* Password strength */}
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

      {/* Submit + OAuth */}
      <div className="col-span-full">
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700 transition"
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
          <a href="/login" className="text-purple-600 ">
            Đăng nhập
          </a>
        </p>

        <div className="my-4 text-center text-gray-400 text-sm">Hoặc</div>

        <button
          type="button"
          className="flex items-center justify-center gap-3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition w-full"
        >
          <Image
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            width={20}
            height={20}
          />
          Đăng ký bằng Google
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
