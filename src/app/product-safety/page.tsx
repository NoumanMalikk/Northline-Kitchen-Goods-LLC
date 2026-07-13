import type { Metadata } from "next";
import { safetyTopics } from "@/data/product-safety";
export const metadata: Metadata = { title: "Product Safety" };
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <h1 className="font-display text-4xl">Product Safety</h1>
      <p className="mt-4 text-northline-steel">Safety fields are tracked per product. Live purchase is blocked when required safety information is missing.</p>
      <div className="mt-8 space-y-6">
        {safetyTopics.map((t) => (
          <section key={t.id} className="border border-border-alloy bg-clean-white p-5">
            <h2 className="font-display text-xl">{t.title}</h2>
            <p className="mt-2 text-sm text-northline-steel">{t.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
