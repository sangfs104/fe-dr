"use client";
import { useState } from "react";
import Image from "next/image";
import "../css/login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.status === 200) {
        localStorage.setItem("user", JSON.stringify(data.data));
        setMessage("Đăng nhập thành công!");

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        setMessage(data.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      console.error(err);
      setMessage("Lỗi kết nối đến server");
    }
  };

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForgotMessage("");

    try {
      const res = await fetch("http://localhost:8000/api/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();

      if (res.ok && data.status === 200) {
        setForgotMessage("✅ " + data.message);
      } else {
        setForgotMessage("❌ " + (data.message || "Có lỗi xảy ra"));
      }
    } catch (err) {
      console.error(err);
      setForgotMessage("❌ Lỗi kết nối đến server");
    }
  };

  return (
    <div className="container">
      <div className="image-section">
        <Image
          src="/img/dir.webp"
          alt="shopping illustration"
          width={400}
          height={400}
        />
      </div>
      <div className="login-section">
        <h2>Đăng nhập</h2>
        <p className="sub">Đăng nhập tài khoản mua sắm nhiều ưu đãi</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Mật khẩu</label>
          <div className="password-field">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="password-input"
              placeholder="*********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="eye-icon" onClick={togglePassword}>
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                }`}
              ></i>
            </span>
          </div>

          <div className="forgot">
            <a href="#" onClick={() => setShowForgotModal(true)}>
              Quên mật khẩu?
            </a>
          </div>

          <button type="submit" className="login-btn">
            Đăng nhập
          </button>

          {message && <p>{message}</p>}
        </form>

        <p className="register">
          Bạn chưa có tài khoản? <a href="/register">Đăng ký</a>
        </p>

        <div className="divider">Hoặc</div>

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
      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Khôi phục mật khẩu</h3>
            <form onSubmit={handleForgotPassword}>
              <label htmlFor="forgot-email">Nhập email</label>
              <input
                type="email"
                id="forgot-email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
              <button type="submit">Gửi yêu cầu</button>
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(false);
                  setForgotEmail("");
                  setForgotMessage("");
                }}
              >
                Đóng
              </button>
            </form>
            {forgotMessage && <p>{forgotMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
