import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderSuccessPage } from "@/components/checkout/OrderSuccessPage";

export const metadata: Metadata = {
  title: "Order Confirmation",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-4 py-16">Verifying payment…</div>}>
      <OrderSuccessPage />
    </Suspense>
  );
}
