"use client";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function GoogleLoginButton() {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { access_token } = tokenResponse;
        console.log("Google access_token", access_token);

        const res = await axios.post("http://localhost:8000/api/auth/google", {
          access_token, // gửi access_token thay vì code
        });

        toast.success("Đăng nhập thành công!");
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.location.href = "/account";
      } catch (error: any) {
        toast.error("Đăng nhập thất bại");
        console.error("Lỗi login:", error?.response?.data || error.message);
      }
    },
    onError: (errorResponse) => {
      console.error("Google Login error:", errorResponse);
      toast.error("Google Login thất bại");
    },
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      className="flex items-center justify-center gap-3 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition w-full"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="w-5 h-5"
      />
      <span>Đăng nhập bằng Google</span>
    </button>
  );
}
