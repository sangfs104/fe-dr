"use client";

import React, { useState } from "react";
import "../css/register.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
          window.location.href = "/login";
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
    /[!@#\$%\^\&*\)\(+=._-]/.test(formData.password),
  ].filter(Boolean).length;

  return (
    <div className="container">
      <div className="form-container">
        <h2>Đăng ký</h2>
        <p>Đăng ký tài khoản rinh ngay quà khủng</p>
        <form onSubmit={handleSubmit}>
          <label>Họ tên</label>
          <input
            type="text"
            name="name"
            placeholder="Họ tên"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Số điện thoại</label>
          <input
            type="text"
            name="phone"
            placeholder="0123456789"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>Mật khẩu</label>
          <div className="password-field">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              className="password-input"
              placeholder="*********"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <p className="note">
            (Mật khẩu chứa kí tự viết hoa, chữ thường, số và kí tự đặc biệt)
          </p>
          <p id="strength-text" className={passed < 4 ? "weak" : "strong"}>
            {passed < 4 ? "Mật khẩu yếu" : "Mật khẩu mạnh"}
          </p>

          <div className="strength-bars">
            {[1, 2, 3, 4].map((bar) => (
              <span
                key={bar}
                className="bar"
                style={{ backgroundColor: passed >= bar ? "#4caf50" : "#ddd" }}
              ></span>
            ))}
          </div>

          <div className="verify">
            <input type="text" placeholder="Nhập mã xác nhận" />
            <button type="button">Gửi mã</button>
          </div>

          <button type="submit" className="register-btn">
            Đăng ký
          </button>
          {message && <p>{message}</p>}

          <p className="login-link">
            Bạn đã có tài khoản? <a href="login">Đăng nhập</a>
          </p>
          <div className="divider">Hoặc</div>

          <button type="button" className="google-btn">
            <div className="google-icon-wrapper">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
              />
            </div>
            <span className="google-text">Đăng nhập bằng Google</span>
          </button>
        </form>
      </div>

      <div className="image-container">
        <img src="/img/newtrai.webp" alt="Shopping Illustration" />
      </div>
    </div>
  );
};

export default RegisterPage;
