"use client";

import { useMemo, useState } from "react";
import { products } from "@/data/products";
import { techniques } from "@/data/techniques";
import { matchTechniqueProducts } from "@/lib/cart-math";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";

export function TechniqueMatchPage() {
  const [cooking, setCooking] = useState("");
  const [technique, setTechnique] = useState("saute");
  const [portions, setPortions] = useState(4);
  const [cooktop, setCooktop] = useState("gas");
  const [handlePreference, setHandlePreference] = useState<"long" | "side" | "either">("either");
  const [storage, setStorage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const results = useMemo(() => {
    if (!submitted) return [];
    return matchTechniqueProducts(products, { technique, portions, cooktop, handlePreference });
  }, [submitted, technique, portions, cooktop, handlePreference]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <h1 className="font-display text-4xl">Technique match lab</h1>
      <p className="mt-3 max-w-2xl text-northline-steel">
        Recommendations are based on configured product shape and capacity. Review the complete specifications before purchase. This is not professional culinary advice.
      </p>

      <form
        className="mt-8 grid gap-4 border border-border-alloy bg-clean-white p-6 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <Field label="What are you cooking?">
          <input value={cooking} onChange={(e) => setCooking(e.target.value)} className="w-full rounded-sm border border-border-alloy px-3 py-2" />
        </Field>
        <Field label="Technique">
          <select value={technique} onChange={(e) => setTechnique(e.target.value)} className="w-full rounded-sm border border-border-alloy px-3 py-2 capitalize">
            {techniques.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Portions">
          <input type="number" min={1} max={20} value={portions} onChange={(e) => setPortions(Number(e.target.value))} className="w-full rounded-sm border border-border-alloy px-3 py-2" />
        </Field>
        <Field label="Cooktop">
          <select value={cooktop} onChange={(e) => setCooktop(e.target.value)} className="w-full rounded-sm border border-border-alloy px-3 py-2">
            <option value="gas">Gas</option>
            <option value="electric-coil">Electric coil</option>
            <option value="smooth-electric">Smooth electric</option>
            <option value="induction">Induction</option>
          </select>
        </Field>
        <Field label="Handle preference">
          <select value={handlePreference} onChange={(e) => setHandlePreference(e.target.value as "long" | "side" | "either")} className="w-full rounded-sm border border-border-alloy px-3 py-2">
            <option value="either">Either</option>
            <option value="long">One long handle</option>
            <option value="side">Two side handles</option>
          </select>
        </Field>
        <Field label="Storage space available">
          <input value={storage} onChange={(e) => setStorage(e.target.value)} placeholder="e.g. limited cabinet height" className="w-full rounded-sm border border-border-alloy px-3 py-2" />
        </Field>
        <div className="md:col-span-2">
          <Button type="submit">Match tools</Button>
        </div>
      </form>

      {submitted && (
        <div className="mt-10">
          <h2 className="font-display text-2xl">{results.length} matching tools</h2>
          <p className="mt-2 text-xs text-graphite">Cooktop compatibility icons are not shown unless verified on the product record.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium">{label}</span>
      {children}
    </label>
  );
}
