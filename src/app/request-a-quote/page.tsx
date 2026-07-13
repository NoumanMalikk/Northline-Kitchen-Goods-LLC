import type { Metadata } from "next";
import { Suspense } from "react";
import { QuotePage } from "@/components/forms/QuotePage";

export const metadata: Metadata = { title: "Request a Quote" };

export default function Page() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-4 py-16">Loading quote form…</div>}>
      <QuotePage />
    </Suspense>
  );
}
