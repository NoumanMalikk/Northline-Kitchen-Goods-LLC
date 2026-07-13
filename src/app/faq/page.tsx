import type { Metadata } from "next";
import { faqs } from "@/data/faq";

export const metadata: Metadata = { title: "FAQ" };

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <h1 className="font-display text-4xl">Frequently asked questions</h1>
      <div className="mt-10 space-y-6">
        {faqs.map((f) => (
          <details key={f.id} className="border border-border-alloy bg-clean-white p-5">
            <summary className="cursor-pointer font-display text-lg focus-ring">{f.question}</summary>
            <p className="mt-3 text-sm text-northline-steel">{f.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
