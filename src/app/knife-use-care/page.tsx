import type { Metadata } from "next";
export const metadata: Metadata = { title: "Knife Use and Care" };
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <h1 className="font-display text-4xl">Knife Use and Care</h1>
      <div className="prose mt-6 max-w-none space-y-4 text-northline-steel"><ul>
<li>Safe handling and appropriate cutting surfaces</li>
<li>Secure storage away from children</li>
<li>Cleaning and drying guidance from verified instructions</li>
<li>Sharpening and honing fields appear only when verified</li>
<li>Blade inspection and safe replacement</li>
</ul>
<p>Do not assume dishwasher safety, lifetime sharpness, rust resistance, or a specific edge angle unless verified for the exact knife.</p></div>
    </div>
  );
}
