"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";

type Props = {
  setLoading: (value: boolean) => void;
};

export default function GoogleLoginButton({ setLoading }: Props) {
  useEffect(() => {
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
          localStorage.setItem("id_token", idToken);

          setLoading(true); // 👉 show loading spinner

          try {
            const res = await fetch("http://localhost:8000/api/auth/google", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id_token: idToken }),
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
          } finally {
            setLoading(false); // 👉 hide loading spinner
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
  }, [setLoading]);

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
