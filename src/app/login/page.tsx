// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { toast } from "react-hot-toast";
// import { DreamToast } from "../components/ui/DreamToast";
// import { motion, AnimatePresence } from "framer-motion";
// import GoogleLoginButton from "../components/ui/GoogleLoginButton";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showForgotModal, setShowForgotModal] = useState(false);
//   const [forgotEmail, setForgotEmail] = useState("");
//   const [forgotMessage, setForgotMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [loadingGoogle, setLoadingGoogle] = useState(false);
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const togglePassword = () => setShowPassword((prev) => !prev);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Reset lỗi cũ
//     setEmailError("");
//     setPasswordError("");

//     let hasError = false;

//     if (!email.trim()) {
//       setEmailError("Vui lòng nhập email");
//       hasError = true;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       setEmailError("Email không hợp lệ");
//       hasError = true;
//     }

//     if (!password) {
//       setPasswordError("Vui lòng nhập mật khẩu");
//       hasError = true;
//     } else if (password.length < 6) {
//       setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
//       hasError = true;
//     }

//     if (hasError) return;

//     setLoading(true);

//     try {
//       const res = await fetch(`https://dreams-admin.io.vn/api/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok && data.status === 200) {
//         localStorage.setItem("token", data.access_token);
//         localStorage.setItem("user", JSON.stringify(data.user));
//         toast.success("✅ Đăng nhập thành công!");
//         setTimeout(() => router.push("/"), 1500);
//       } else {
//         toast.error("❌ " + (data.message || "Đăng nhập thất bại"));
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       toast.error("❌ Lỗi kết nối đến server");
//     } finally {
//       setLoading(false);
//     }
//   };
"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { DreamToast } from "../components/ui/DreamToast";
import { motion, AnimatePresence } from "framer-motion";
import GoogleLoginButton from "../components/ui/GoogleLoginButton";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext"; // Thêm import này

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth(); // Sử dụng setUser từ Context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset lỗi cũ
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    if (!email.trim()) {
      setEmailError("Vui lòng nhập email");
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email không hợp lệ");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Vui lòng nhập mật khẩu");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Mật khẩu phải có ít nhất 6 ký tự");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);

    try {
      const res = await fetch(`https://dreams-admin.io.vn/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.status === 200) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user); // Cập nhật user trong Context
        toast.success("✅ Đăng nhập thành công!");
        setTimeout(() => router.push("/"), 1500);
      } else {
        toast.error("❌ " + (data.message || "Đăng nhập thất bại"));
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("❌ Lỗi kết nối đến server");
    } finally {
      setLoading(false);
    }
  };
  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForgotMessage("");

    if (!forgotEmail || !/\S+@\S+\.\S+/.test(forgotEmail)) {
      setForgotMessage("❌ Vui lòng nhập email hợp lệ");
      return;
    }

    try {
      const res = await fetch(`https://dreams-admin.io.vn/api/forgotPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();

      setForgotMessage(
        res.ok && data.status === 200
          ? "✅ " + data.message
          : "❌ " + (data.message || "Có lỗi xảy ra")
      );
    } catch (err) {
      console.error("Forgot password error:", err);
      setForgotMessage("❌ Lỗi kết nối đến server");
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#f9f9fb]">
      <main className="flex-grow flex justify-center items-center px-2 pt-2 pb-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col-reverse md:flex-row bg-white shadow-md rounded-xl overflow-hidden max-w-5xl w-full"
        >
          <div className="border-4 border-white rounded-lg overflow-hidden">
            <Image
              src="/img/BANNERREAM.png"
              alt="Login Banner"
              width={500}
              height={500}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          <div className="flex-1 p-6 sm:p-10 min-h-[300px] flex flex-col justify-center">
            <h2 className="login-bounce text-3xl font-bold text-orange-500 mb-4">
              Đăng nhập
            </h2>
            <p className="text-gray-500 mb-6">
              Đăng nhập tài khoản mua sắm nhiều ưu đãi
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                  emailError ? "border-red-500" : "border-gray-300"
                }`}
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}

              <label
                htmlFor="password"
                className="mt-4 text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full p-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}

                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={togglePassword}
                >
                  <i
                    className={`fa-solid ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  />
                </span>
              </div>

              <div className="mt-2 text-sm text-left">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-purple-600"
                >
                  Quên mật khẩu?
                </button>
              </div>
              <button
                type="submit"
                className="mt-6 bg-[#FF5722] text-white font-semibold py-3 rounded-lg hover:bg-[#e34b47] transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={loading || loadingGoogle} // 👈 Vô hiệu hóa nếu đang xử lý bất kỳ đăng nhập nào
              >
                {loading || loadingGoogle ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    <span>
                      {loading
                        ? "Đang đăng nhập..."
                        : "Đang đăng nhập bằng Google..."}
                    </span>
                  </>
                ) : (
                  "Đăng nhập"
                )}
              </button>
            </form>

            <p className="mt-4 text-sm text-center">
              Bạn chưa có tài khoản?{" "}
              <a href="/register" className="text-purple-600 font-semibold">
                Đăng ký
              </a>
            </p>

            <div className="relative mt-4 mb-5 text-center text-gray-400 text-sm">
              <div className="absolute left-0 top-1/2 w-2/5 h-px bg-gray-300"></div>
              <span className="px-2 bg-white z-10">Hoặc</span>
              <div className="absolute right-0 top-1/2 w-2/5 h-px bg-gray-300"></div>
            </div>

            <div className="block !important">
              {" "}
              {/* hoặc dùng className tùy chỉnh */}
              <GoogleLoginButton setLoading={setLoadingGoogle} />
            </div>
          </div>
        </motion.div>
      </main>

      <AnimatePresence>
        {showForgotModal && (
          <motion.div
            key="forgot-modal"
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-6 w-11/12 max-w-md shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-4">Khôi phục mật khẩu</h3>
              <form onSubmit={handleForgotPassword}>
                <label htmlFor="forgot-email" className="block text-sm mb-1">
                  Nhập email
                </label>
                <input
                  type="email"
                  id="forgot-email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                  className="w-full p-2 mb-3 border border-gray-300 rounded"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotModal(false);
                      setForgotEmail("");
                      setForgotMessage("");
                    }}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Đóng
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                  >
                    Gửi yêu cầu
                  </button>
                </div>
              </form>
              {forgotMessage && <p className="mt-3 text-sm">{forgotMessage}</p>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <DreamToast />
    </div>
  );
}
