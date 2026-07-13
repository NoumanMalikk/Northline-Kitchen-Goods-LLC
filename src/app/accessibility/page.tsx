import type { Metadata } from "next";
import { legalConfig } from "@/data/legal-config";
export const metadata: Metadata = { title: "Accessibility" };
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <h1 className="font-display text-4xl">Accessibility</h1>
      <div className="prose mt-6 whitespace-pre-wrap text-northline-steel">{legalConfig.accessibilityStatement}</div>
    </div>
  );
}
