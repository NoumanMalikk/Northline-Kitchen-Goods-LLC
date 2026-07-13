"use client";

import Link from "next/link";
import { useCompareStore } from "@/stores";
import { getProductById } from "@/data/products";
import { displaySpec, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ProductImage } from "@/components/product/ProductImage";

export function ComparePage() {
  const { productIds, remove, clear } = useCompareStore();
  const products = productIds.map(getProductById).filter(Boolean);

  const fields = [
    { key: "sizeLabel", label: "Size" },
    { key: "diameter", label: "Diameter" },
    { key: "capacity", label: "Capacity" },
    { key: "totalLength", label: "Total length" },
    { key: "weight", label: "Weight" },
    { key: "materials", label: "Material" },
    { key: "construction", label: "Construction" },
    { key: "interiorFinish", label: "Interior finish" },
    { key: "lidIncluded", label: "Lid included" },
    { key: "stovetopCompatibility", label: "Stovetop" },
    { key: "inductionCompatibility", label: "Induction" },
    { key: "ovenSafeTemperature", label: "Oven" },
    { key: "dishwasherSafe", label: "Dishwasher" },
    { key: "seasoningRequired", label: "Seasoning" },
    { key: "knifeBladeLength", label: "Blade length" },
    { key: "knifeHardness", label: "Hardness" },
    { key: "knifeEdgeAngle", label: "Edge angle" },
    { key: "flatwarePieceCount", label: "Piece count" },
    { key: "packageContents", label: "Package contents" },
  ] as const;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="font-display text-4xl">Compare</h1>
          <p className="mt-2 text-northline-steel">Compare up to four products. Missing values are never invented.</p>
        </div>
        {products.length > 0 && <Button variant="secondary" onClick={clear}>Clear</Button>}
      </div>

      {products.length === 0 ? (
        <div className="border border-dashed border-border-alloy p-10 text-center">
          <p>No products selected for comparison.</p>
          <Link href="/shop" className="mt-4 inline-block text-tempered-blue underline focus-ring">Browse catalog</Link>
        </div>
      ) : (
        <div className="overflow-x-auto border border-border-alloy bg-clean-white">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-border-alloy">
                <th className="p-4 text-left">Attribute</th>
                {products.map((p) =>
                  p ? (
                    <th key={p.id} className="min-w-52 p-4 text-left align-top">
                      <div className="relative mb-3 h-28 w-28 border border-border-alloy bg-parchment">
                        <ProductImage product={p} />
                      </div>
                      <Link href={`/products/${p.slug}`} className="font-display text-base focus-ring">{p.title}</Link>
                      <p className="spec-mono mt-1 text-xs text-graphite">{p.sku}</p>
                      <p className="mt-2 font-semibold">{formatPrice(p.demoPrice)}</p>
                      <button type="button" className="mt-2 text-xs text-furnace-clay underline focus-ring" onClick={() => remove(p.id)}>Remove</button>
                    </th>
                  ) : null,
                )}
              </tr>
            </thead>
            <tbody>
              {fields.map((field) => (
                <tr key={field.key} className="border-b border-border-alloy">
                  <th className="bg-parchment p-3 text-left font-medium">{field.label}</th>
                  {products.map((p) => {
                    if (!p) return null;
                    const raw = p[field.key as keyof typeof p];
                    const value = Array.isArray(raw) ? raw.join("; ") : displaySpec(raw);
                    return (
                      <td key={p.id + field.key} className="p-3 align-top text-northline-steel">
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
