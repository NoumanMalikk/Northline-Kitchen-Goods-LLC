import { buildCompatibilityMatrix, cooktopTypes } from "@/data/compatibility";
import Link from "next/link";

export function CompatibilityMatrix() {
  const rows = buildCompatibilityMatrix();
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
      <h1 className="font-display text-4xl">Cookware compatibility</h1>
      <p className="mt-4 max-w-3xl text-northline-steel">
        Compatibility is generated from product records. Icons and “compatible” labels appear only when the underlying status is verified. Appearance alone is never used to infer induction support.
      </p>
      <div className="mt-8 overflow-x-auto border border-border-alloy bg-clean-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-border-alloy bg-parchment">
              <th className="p-3 text-left">Product</th>
              {cooktopTypes.map((t) => (
                <th key={t.id} className="p-3 text-left">{t.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-border-alloy">
                <th className="p-3 text-left font-medium">
                  <Link href={`/products/${row.slug}`} className="focus-ring hover:text-tempered-blue">
                    {row.title}
                  </Link>
                  <p className="spec-mono text-xs font-normal text-graphite">{row.sku}</p>
                </th>
                {cooktopTypes.map((t) => (
                  <td key={t.id} className="p-3 text-northline-steel">
                    {row.values[t.id]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
