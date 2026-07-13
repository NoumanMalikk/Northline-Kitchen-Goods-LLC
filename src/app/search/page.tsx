import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPage } from "@/components/search/SearchPage";

export const metadata: Metadata = { title: "Search" };

export default function Page() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16">Searching…</div>}>
      <SearchPage />
    </Suspense>
  );
}
