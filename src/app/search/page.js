// app/search/page.js (Server Component)
import { Suspense } from "react";
import PaymentPage from "./PaymentPage";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Đang tải...</div>}>
      <PaymentPage />
    </Suspense>
  );
}
