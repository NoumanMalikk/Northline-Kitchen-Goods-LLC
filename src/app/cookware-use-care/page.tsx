import type { Metadata } from "next";
export const metadata: Metadata = { title: "Cookware Use and Care" };
export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <h1 className="font-display text-4xl">Cookware Use and Care</h1>
      <div className="prose mt-6 max-w-none space-y-4 text-northline-steel"><ul>
<li>Pre-use inspection</li>
<li>Matching burner size</li>
<li>Handle positioning and lid handling</li>
<li>Cleaning and drying from verified instructions</li>
<li>Carbon-steel seasoning only when documented</li>
<li>Storage and thermal-shock caution when supported by manufacturer guidance</li>
</ul>
<p>Universal temperature limits are not provided.</p></div>
    </div>
  );
}
