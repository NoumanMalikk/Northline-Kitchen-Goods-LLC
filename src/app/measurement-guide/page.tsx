import type { Metadata } from "next";
export const metadata: Metadata = { title: "Measurement Guide" };
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <h1 className="font-display text-4xl">Measurement Guide</h1>
      <div className="prose mt-6 max-w-none space-y-4 text-northline-steel"><ul>
<li>Pan diameter vs base diameter</li>
<li>Internal versus external dimensions</li>
<li>Capacity, wall height, handle length, total footprint</li>
<li>Oven-clearance and cabinet footprint considerations</li>
<li>Sheet-pan sizing, knife blade length, utensil total length</li>
<li>Flatware-piece dimensions</li>
<li>Inches and centimeters</li>
</ul>
<p>Measurements never guarantee cabinet or cooktop fit.</p></div>
    </div>
  );
}
