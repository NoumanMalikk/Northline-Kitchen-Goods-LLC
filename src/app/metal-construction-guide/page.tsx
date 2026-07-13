import type { Metadata } from "next";
export const metadata: Metadata = { title: "Metal and Construction Guide" };
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <h1 className="font-display text-4xl">Metal and Construction Guide</h1>
      <div className="prose mt-6 max-w-none space-y-4 text-northline-steel"><p>This guide explains how Northline lists materials and construction fields. It does not claim that any one material is universally best.</p>
<ul>
<li><strong>Listed material</strong> means the verified material recorded for that SKU.</li>
<li><strong>Surface vs core</strong> may differ in layered construction; both require verification.</li>
<li><strong>Single-material vs layered</strong> construction is published only from manufacturing documentation.</li>
<li><strong>Interior and exterior finishes</strong> are separate fields and may differ.</li>
<li><strong>Base shape</strong> affects stability and burner contact; it is not inferred from photos.</li>
<li><strong>Handle attachment</strong>, lid material, and care documentation are product-specific.</li>
</ul>
<p>Unsupported health claims are never published.</p></div>
    </div>
  );
}
