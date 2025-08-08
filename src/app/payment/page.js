// app/search/page.js
import { Suspense } from "react";
import PaymentPage from "./PaymentPage";

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentPage />
    </Suspense>
  );
}
