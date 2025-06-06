"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function PaymentResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<{
    message: string;
    order?: any;
  } | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const response = await axios.get(
          `http://localhost:8000/api/payment/vnpay/return?${urlParams.toString()}`
        );
        setResult(response.data);
      } catch (error) {
        console.error("Error fetching payment result:", error);
      }
    };

    fetchResult();
  }, [router.isReady]);

  if (!result) return <div>Đang xử lý...</div>;

  return (
    <div>
      <h2>Kết quả thanh toán</h2>
      <p>{result.message}</p>
      {result.order && <pre>{JSON.stringify(result.order, null, 2)}</pre>}
    </div>
  );
}
