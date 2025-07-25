"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCart } from "@/store/cartSlice";

// Kiểu dữ liệu cho đơn hàng
type OrderType = {
  id: number;
  user_id: number;
  shipping_id: number | null;
  discount_id?: number | null;
  payment_id: number | null;
  coupon_id: number | null;
  address_id: number | null;
  status: string;
  total_price: number;
  vnp_TxnRef: string | null;
  order_code: string | null;
  shipping_fee: number;
  created_at: string;
  updated_at: string;
};

export default function PaymentResultPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [result, setResult] = useState<{
    message: string;
    order?: OrderType;
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
