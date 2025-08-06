"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCart } from "@/store/cartSlice";

type Order = {
  id: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: string;
  createdAt: string;
};

export default function PaymentResultPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [result, setResult] = useState<{
    message: string;
    order?: Order;
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

    if (router.isReady) {
      fetchResult();
    }
  }, [router.isReady]);

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  if (!result) return <div>Đang xử lý...</div>;

  return (
    <div>
      <h2>Kết quả thanh toán</h2>
      <p>{result.message}</p>
      {result.order && <pre>{JSON.stringify(result.order, null, 2)}</pre>}
    </div>
  );
}
