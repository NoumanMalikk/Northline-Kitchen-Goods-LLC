"use client";

import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores";
import { Button } from "@/components/ui/Button";
import { ProductImage } from "@/components/product/ProductImage";
import type { Product } from "@/types/product";

const slots = [
  { id: "prep", label: "Prep vessel", match: (p: Product) => p.processStages.includes("prepare") || p.category === "Prep Tools" },
  { id: "cut", label: "Cutting tool", match: (p: Product) => p.processStages.includes("cut") || p.category === "Cutlery" },
  { id: "cook", label: "Cooking vessel", match: (p: Product) => p.category === "Cookware" || p.category === "Specialty Cookware" },
  { id: "turn", label: "Turning or stirring tool", match: (p: Product) => p.category === "Utensils" },
  { id: "drain", label: "Draining tool", match: (p: Product) => p.processStages.includes("drain") },
  { id: "serve", label: "Serving tool", match: (p: Product) => p.processStages.includes("serve") || p.category === "Flatware" },
] as const;

export function KitchenFlowBuilderPage() {
  const [selection, setSelection] = useState<Record<string, string>>({});
  const addItem = useCartStore((s) => s.addItem);

  const selectedProducts = useMemo(
    () =>
      slots
        .map((slot) => products.find((p) => p.id === selection[slot.id]))
        .filter(Boolean) as Product[],
    [selection],
  );

  const total = selectedProducts.reduce((sum, p) => sum + p.demoPrice, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <h1 className="font-display text-4xl">Kitchen flow builder</h1>
      <p className="mt-3 max-w-2xl text-northline-steel">
        Create a workflow from prep to serve. Each product is added separately — no fake bundle SKU or invented savings.
      </p>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {slots.map((slot) => {
          const options = products.filter(slot.match);
          const selected = products.find((p) => p.id === selection[slot.id]);
          return (
            <div key={slot.id} className="border border-border-alloy bg-clean-white p-4">
              <label className="block text-sm font-medium">
                {slot.label}
                <select
                  className="mt-2 w-full rounded-sm border border-border-alloy px-3 py-2"
                  value={selection[slot.id] ?? ""}
                  onChange={(e) => setSelection((s) => ({ ...s, [slot.id]: e.target.value }))}
                >
                  <option value="">Select…</option>
                  {options.map((p) => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </label>
              {selected && (
                <div className="mt-3 flex gap-3">
                  <div className="relative h-16 w-16 border border-border-alloy bg-parchment">
                    <ProductImage product={selected} />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">{selected.title}</p>
                    <p className="spec-mono text-xs">{selected.sizeLabel} · {displayCompat(selected)}</p>
                    <p className="mt-1 font-semibold">{formatPrice(selected.demoPrice)}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 border border-border-alloy bg-clean-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-graphite">{selectedProducts.length} tools selected</p>
            <p className="font-display text-2xl">Combined total {formatPrice(total)}</p>
            <p className="text-xs text-graphite">Sum of individual demo prices — not a discounted bundle.</p>
          </div>
          <Button
            disabled={selectedProducts.length === 0}
            onClick={() => {
              selectedProducts.forEach((p) => addItem({ productId: p.id, sku: p.sku, quantity: 1 }));
            }}
          >
            Add each product to cart
          </Button>
        </div>
      </div>
    </div>
  );
}

function displayCompat(p: Product) {
  return `Compatibility: ${String(p.inductionCompatibility)}`;
}
