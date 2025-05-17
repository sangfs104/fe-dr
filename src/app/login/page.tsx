"use client";

import { useState } from "react";
import "../css/login.css";
import "boxicons/css/boxicons.min.css";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const apiUrl = "http://localhost:4000/users";

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...registerData,
          phone: "",
          role: "user",
          remember_token: "",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        setIsRegister(false);
      } else {
        alert("Đăng ký thất bại!");
      }
    } catch (error) {
      alert("Lỗi hệ thống!");
      console.error(error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(apiUrl);
      const users = await res.json();
      const user = users.find(
        (u: any) =>
          u.email === loginData.email && u.password === loginData.password
      );
      if (user) {
        alert(`Đăng nhập thành công. Xin chào ${user.name}`);
      } else {
        alert("Email hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      alert("Lỗi hệ thống!");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="background"></div>
      <div className="container">
        <div className="item">
          <h2 className="logo">
            <i className="bx bxl-xing"></i>DREAMS
          </h2>
          <div className="text-item">
            <h2>
              Chào mừng <br />
              <span> trở lại! </span>
            </h2>
            <p>
              Truy cập tài khoản của bạn và tiếp tục hành trình cùng chúng tôi.
            </p>
            <div className="social-icon">
              <a href="#">
                <i className="bx bxl-facebook"></i>
              </a>
              <a href="#">
                <i className="bx bxl-twitter"></i>
              </a>
              <a href="#">
                <i className="bx bxl-youtube"></i>
              </a>
              <a href="#">
                <i className="bx bxl-instagram"></i>
              </a>
              <a href="#">
                <i className="bx bxl-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <div className={`login-section ${isRegister ? "active" : ""}`}>
          <div className="form-box login">
            <form onSubmit={handleLogin}>
              <h2>Sign In</h2>
              <div className="input-box">
                <span className="icon">
                  <i className="bx bxs-envelope"></i>
                </span>
                <input
                  type="email"
                  required
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
                <label>Email</label>
              </div>
              <div className="input-box">
                <span className="icon">
                  <i className="bx bxs-lock-alt"></i>
                </span>
                <input
                  type="password"
                  required
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
                <label>Password</label>
              </div>
              <div className="remember-password">
                <label>
                  <input type="checkbox" />
                  Remember Me
                </label>
                <a href="#">Forget Password</a>
              </div>
              <button className="btn" type="submit">
                Login In
              </button>
              <div className="create-account">
                <p>
                  Create A New Account?{" "}
                  <a
                    href="#"
                    className="register-link"
                    onClick={() => setIsRegister(true)}
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </form>
          </div>

          <div className="form-box register">
            <form onSubmit={handleRegister}>
              <h2>Sign Up</h2>
              <div className="input-box">
                <span className="icon">
                  <i className="bx bxs-user"></i>
                </span>
                <input
                  type="text"
                  required
                  value={registerData.name}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, name: e.target.value })
                  }
                />
                <label>Username</label>
              </div>
              <div className="input-box">
                <span className="icon">
                  <i className="bx bxs-envelope"></i>
                </span>
                <input
                  type="email"
                  required
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                />
                <label>Email</label>
              </div>
              <div className="input-box">
                <span className="icon">
                  <i className="bx bxs-lock-alt"></i>
                </span>
                <input
                  type="password"
                  required
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                />
                <label>Password</label>
              </div>
              <div className="remember-password">
                <label>
                  <input type="checkbox" />I agree with this statement
                </label>
              </div>
              <button className="btn" type="submit">
                Login In
              </button>
              <div className="create-account">
                <p>
                  Already Have An Account?{" "}
                  <a
                    href="#"
                    className="login-link"
                    onClick={() => setIsRegister(false)}
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
