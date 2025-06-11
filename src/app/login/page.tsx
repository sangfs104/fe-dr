// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import HeaderHome from "../components/Header";
// import Footer from "../components/Footer";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [message, setMessage] = useState("");

//   const [showForgotModal, setShowForgotModal] = useState(false);
//   const [forgotEmail, setForgotEmail] = useState("");
//   const [forgotMessage, setForgotMessage] = useState("");

//   const togglePassword = () => setShowPassword((prev) => !prev);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setMessage("");

//     try {
//       const res = await fetch("http://localhost:8000/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok && data.status === 200) {
//         const token = data.access_token;
//         const user = data.user;

//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(user));

//         setMessage("✅ Đăng nhập thành công!");

//         setMessage("Đăng nhập thành công!");
//         setTimeout(() => {
//           window.location.href = "/";
//         }, 1000);
//       } else {
//         setMessage("❌ " + (data.message || "Đăng nhập thất bại"));
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Lỗi kết nối đến server");
//     }
//   };

//   const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setForgotMessage("");

//     try {
//       const res = await fetch("http://localhost:8000/api/forgotPassword", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: forgotEmail }),
//       });

//       const data = await res.json();

//       if (res.ok && data.status === 200) {
//         setForgotMessage("✅ " + data.message);
//       } else {
//         setForgotMessage("❌ " + (data.message || "Có lỗi xảy ra"));
//       }
//     } catch (err) {
//       console.error(err);
//       setForgotMessage("❌ Lỗi kết nối đến server");
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-[#f9f9fb]">
//       <HeaderHome />
//       <main className="flex-grow flex justify-center items-center px-24 py-16">
//         <div className="flex flex-col md:flex-row bg-white shadow-md rounded-xl overflow-hidden max-w-5xl w-full animate-fadeInUp">
//           {/* Left image */}
//           <div className="flex items-center justify-center flex-1 bg-gradient-to-b from-[#f8f8f9] to-white p-6">
//             <Image
//               src="/img/dir.webp"
//               alt="shopping illustration"
//               width={400}
//               height={400}
//               className="w-11/12 h-auto"
//             />
//           </div>

//           {/* Login form */}
//           <div className="flex-1 p-10">
//             <h2 className="text-xl font-semibold text-[#000000] mb-1">
//               Đăng nhập
//             </h2>

//             <p className="text-gray-500 mb-6">
//               Đăng nhập tài khoản mua sắm nhiều ưu đãi
//             </p>

//             <form onSubmit={handleSubmit} className="flex flex-col">
//               <label
//                 htmlFor="email"
//                 className="text-sm font-medium text-gray-700"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 placeholder="example@example.com"
//                 className="mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
//               />

//               <label
//                 htmlFor="password"
//                 className="mt-4 text-sm font-medium text-gray-700"
//               >
//                 Mật khẩu
//               </label>
//               <div className="relative mt-1">
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   placeholder="********"
//                   className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
//                 />
//                 <span
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
//                   onClick={togglePassword}
//                 >
//                   <i
//                     className={`fa-solid ${
//                       showPassword ? "fa-eye-slash" : "fa-eye"
//                     }`}
//                   ></i>
//                 </span>
//               </div>

//               <div className="mt-2 text-sm text-left">
//                 <a
//                   href="#"
//                   onClick={() => setShowForgotModal(true)}
//                   className="text-purple-600 hover:underline"
//                 >
//                   Quên mật khẩu?
//                 </a>
//               </div>

//               <button
//                 type="submit"
//                 className="mt-6 bg-[#FF5722] text-white font-semibold py-3 rounded-lg hover:bg-[#e34b47] transition"
//               >
//                 Đăng nhập
//               </button>

//               {message && <p className="mt-4 text-sm">{message}</p>}
//             </form>

//             <p className="mt-4 text-sm text-center">
//               Bạn chưa có tài khoản?{" "}
//               <a
//                 href="/register"
//                 className="text-purple-600 font-semibold hover:underline"
//               >
//                 Đăng ký
//               </a>
//             </p>

//             <div className="relative my-6 text-center text-gray-400 text-sm">
//               <div className="absolute left-0 top-1/2 w-2/5 h-px bg-gray-300"></div>
//               <span className="px-2 bg-white z-10">Hoặc</span>
//               <div className="absolute right-0 top-1/2 w-2/5 h-px bg-gray-300"></div>
//             </div>

//             <button className="flex items-center justify-center w-full h-11 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition">
//               <div className="bg-white p-2 rounded mr-3">
//                 <Image
//                   src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
//                   alt="Google"
//                   width={20}
//                   height={20}
//                 />
//               </div>
//               <span>Đăng nhập bằng Google</span>
//             </button>
//           </div>
//         </div>
//       </main>

//       {showForgotModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 w-11/12 max-w-md shadow-lg">
//             <h3 className="text-lg font-semibold mb-4">Khôi phục mật khẩu</h3>
//             <form onSubmit={handleForgotPassword}>
//               <label htmlFor="forgot-email" className="block text-sm mb-1">
//                 Nhập email
//               </label>
//               <input
//                 type="email"
//                 id="forgot-email"
//                 value={forgotEmail}
//                 onChange={(e) => setForgotEmail(e.target.value)}
//                 required
//                 className="w-full p-2 mb-3 border border-gray-300 rounded"
//               />
//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowForgotModal(false);
//                     setForgotEmail("");
//                     setForgotMessage("");
//                   }}
//                   className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//                 >
//                   Đóng
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
//                 >
//                   Gửi yêu cầu
//                 </button>
//               </div>
//             </form>
//             {forgotMessage && <p className="mt-3 text-sm">{forgotMessage}</p>}
//           </div>
//         </div>
//       )}
//       <Footer />
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import Image from "next/image";
import HeaderHome from "../components/Header";
import Footer from "../components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("❌ Email không hợp lệ");
      return;
    }

    if (!password || password.length < 6) {
      toast.error("❌ Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.status === 200) {
        const token = data.access_token;
        const user = data.user;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("✅ Đăng nhập thành công!");

        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        toast.error("❌ " + (data.message || "Đăng nhập thất bại"));
      }
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error("❌ Lỗi kết nối đến server");
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
      const res = await fetch("http://localhost:8000/api/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();

      if (res.ok && data.status === 200) {
        setForgotMessage("✅ " + data.message);
      } else {
        setForgotMessage("❌ " + (data.message || "Có lỗi xảy ra"));
      }
    } catch (err: any) {
      console.error("Forgot password error:", err);
      setForgotMessage("❌ Lỗi kết nối đến server");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f9f9fb]">
      <HeaderHome />
      <main className="flex-grow flex justify-center items-center px-24 py-16">
        <div className="flex flex-col md:flex-row bg-white shadow-md rounded-xl overflow-hidden max-w-5xl w-full animate-fadeInUp">
          {/* Left image */}
          <div className="flex items-center justify-center flex-1 bg-gradient-to-b from-[#f8f8f9] to-white p-6">
            <Image
              src="/img/dir.webp"
              alt="shopping illustration"
              width={400}
              height={400}
              className="w-11/12 h-auto"
            />
          </div>

          {/* Login form */}
          <div className="flex-1 p-10">
            <h2 className="text-xl font-semibold text-[#000000] mb-1">
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
                required
                placeholder="example@example.com"
                className="mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              />

              <label
                htmlFor="password"
                className="mt-4 text-sm font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="********"
                  className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={togglePassword}
                >
                  <i
                    className={`fa-solid ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </span>
              </div>

              <div className="mt-2 text-sm text-left">
                <a
                  href="#"
                  onClick={() => setShowForgotModal(true)}
                  className="text-purple-600 hover:underline"
                >
                  Quên mật khẩu?
                </a>
              </div>

              <button
                type="submit"
                className="mt-6 bg-[#FF5722] text-white font-semibold py-3 rounded-lg hover:bg-[#e34b47] transition"
              >
                Đăng nhập
              </button>
            </form>

            <p className="mt-4 text-sm text-center">
              Bạn chưa có tài khoản?{" "}
              <a
                href="/register"
                className="text-purple-600 font-semibold hover:underline"
              >
                Đăng ký
              </a>
            </p>

            <div className="relative my-6 text-center text-gray-400 text-sm">
              <div className="absolute left-0 top-1/2 w-2/5 h-px bg-gray-300"></div>
              <span className="px-2 bg-white z-10">Hoặc</span>
              <div className="absolute right-0 top-1/2 w-2/5 h-px bg-gray-300"></div>
            </div>

            <button className="flex items-center justify-center w-full h-11 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition">
              <div className="bg-white p-2 rounded mr-3">
                <Image
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                />
              </div>
              <span>Đăng nhập bằng Google</span>
            </button>
          </div>
        </div>
      </main>

      {/* Forgot password modal */}
      {showForgotModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md shadow-lg">
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
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </div>
  );
}
