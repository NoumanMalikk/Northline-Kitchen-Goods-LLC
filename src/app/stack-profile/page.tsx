import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Stack Profile" };
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <h1 className="font-display text-4xl">Stack profile</h1>
      <p className="mt-4 text-northline-steel">
        Nesting profiles, handle direction, lid storage, stacked height, cabinet footprint, and hanging compatibility are published only after verification. Products are not claimed to stack securely unless tested.
      </p>
      <p className="mt-4 text-sm text-graphite">No verified stack measurements are available for the initial catalog yet.</p>
      <Link href="/shop" className="mt-6 inline-block text-tempered-blue underline focus-ring">Browse products</Link>
    </div>
  );
}
