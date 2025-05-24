"use client";
import React, { useState } from "react";
import "../css/register.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterPage = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const checkPasswordStrength = () => {
    const tests = [
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[!@#\$%\^\&*\)\(+=._-]/.test(password),
    ];
    return tests.filter(Boolean).length;
  };

  const passed = checkPasswordStrength();

  return (
    <div className="container">
      <div className="form-container">
        <h2>Đăng ký</h2>
        <p>Đăng ký tài khoản rinh ngay quà khủng</p>
        <form>
          <label>Họ tên</label>
          <input type="text" placeholder="Họ tên" />

          <label>Email</label>
          <input type="email" placeholder="example@example.com" />

          <label>Số điện thoại</label>
          <input type="text" placeholder="0123456789" className="phone-input" />

          <label>Mật khẩu</label>
          <div className="password-field">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="password-input"
              placeholder="*********"
              value={password}
              onChange={handlePasswordChange}
            />
            <span className="eye-icon" onClick={togglePassword}>
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
            <span
              className="bar"
              style={{ backgroundColor: passed >= 1 ? "#4caf50" : "#ddd" }}
            ></span>
            <span
              className="bar"
              style={{ backgroundColor: passed >= 2 ? "#4caf50" : "#ddd" }}
            ></span>
            <span
              className="bar"
              style={{ backgroundColor: passed >= 3 ? "#4caf50" : "#ddd" }}
            ></span>
            <span
              className="bar"
              style={{ backgroundColor: passed >= 4 ? "#4caf50" : "#ddd" }}
            ></span>
          </div>

          {/* <div className="verify">
            <input type="text" placeholder="Nhập mã xác nhận" />
            <button type="button">Gửi mã</button>
          </div> */}

          <button type="submit" className="register-btn">
            Đăng ký
          </button>
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
        <img src="/img/bosuutap.webp" alt="Shopping Illustration" />
      </div>
    </div>
  );
};

export default RegisterPage;
