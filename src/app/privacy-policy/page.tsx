import type { Metadata } from "next";
import { legalConfig } from "@/data/legal-config";
export const metadata: Metadata = { title: "Privacy Policy", robots: { index: true } };
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <h1 className="font-display text-4xl">Privacy Policy</h1>
      <div className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-northline-steel">{legalConfig.privacyPolicy}</div>
    </div>
  );
}
