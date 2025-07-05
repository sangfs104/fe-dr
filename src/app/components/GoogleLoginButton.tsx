"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";
import "../css/login.css"; // đường dẫn theo dự án

export default function GoogleLoginButton() {
  useEffect(() => {
    // Load Google Identity Services SDK
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      window.google.accounts.id.initialize({
        client_id:
          "618672128676-6dopq4dgv5p5qgl83mphuppi9vkrmd2k.apps.googleusercontent.com",
        callback: async (response: any) => {
          const idToken = response.credential;
          console.log("ID Token:", idToken);

          // Lưu ID token vào localStorage
          localStorage.setItem("id_token", idToken);

          try {
            const res = await fetch("http://localhost:8000/api/auth/google", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id_token: idToken,
              }),
            });

            if (!res.ok) throw new Error("Đăng nhập thất bại");

            const data = await res.json();

            toast.success("Đăng nhập thành công!");
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "/account";
          } catch (err) {
            console.error("Lỗi login:", err);
            toast.error("Đăng nhập thất bại");
          }
        },
      });

      // @ts-ignore
      window.google.accounts.id.renderButton(
        document.getElementById("googleButton"),
        {
          theme: "filled_blue",
          size: "large",
          width: "100%",
        }
      );
    };
  }, []);

  return (
    <div className="flex justify-center">
      <div
        id="googleButton"
        style={{
          maxWidth: "400px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      />
    </div>
  );
}
