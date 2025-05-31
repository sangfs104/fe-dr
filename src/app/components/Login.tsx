"use client";
import { useState } from "react";
import Image from "next/image";
import "../css/login.css";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="container">
      <div className="image-section">
        <Image
          src="/img/loginae.png"
          alt="shopping illustration"
          width={400}
          height={400}
        />
      </div>
      <div className="login-section">
        <h2>ĐĂNG NHẬP</h2>
        <p className="sub">Đăng nhập tài khoản mua sắm nhiều ưu đãi</p>

        <form>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="example@example.com"
            required
          />

          <label>Mật khẩu</label>
          <div className="password-field">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="password-input"
              placeholder="*********"
            />
            <span className="eye-icon" onClick={togglePassword}>
              <i
                id="eye-icon"
                className={`fa-solid ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </span>
          </div>

          <div className="forgot">
            <a href="#">Quên mật khẩu?</a>
          </div>

          <button type="submit" className="login-btn">
            ĐĂNG NHẬP
          </button>
        </form>

        <p className="register">
          Bạn chưa có tài khoản? <a href="#">Đăng ký</a>
        </p>

        <div className="divider"> ĐĂNG NHẬP</div>

        <button className="google-btn">
          <div className="google-icon-wrapper">
            <Image
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              width={20}
              height={20}
            />
          </div>
          <span className="google-text">Đăng nhập bằng Google</span>
        </button>
      </div>
    </div>
  );
}
