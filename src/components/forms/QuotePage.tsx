"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import { Button } from "@/components/ui/Button";

export function QuotePage() {
  const params = useSearchParams();
  const initialSku = params.get("sku") ?? "";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    zip: "",
    product: products.find((p) => p.sku === initialSku)?.title ?? "",
    sku: initialSku,
    size: "",
    finish: "",
    quantity: 1,
    intendedUse: "",
    deliveryWindow: "",
    details: "",
    consent: false,
    privacy: false,
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.consent || !form.privacy) {
      setStatus("error");
      setMessage("Contact consent and privacy acknowledgment are required.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unable to submit quote");
      setStatus("success");
      setMessage(`Quote request received. Reference ${data.reference}. This does not promise wholesale pricing, approval, availability, delivery date, or response time.`);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Failed");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <h1 className="font-display text-4xl">Request a quote</h1>
      <p className="mt-3 text-northline-steel">
        For larger quantities, business purchases, multi-product orders, shipping review, or configured replacement-part requests. Card information is never requested here.
      </p>
      <form onSubmit={onSubmit} className="mt-8 grid gap-4 border border-border-alloy bg-clean-white p-6 sm:grid-cols-2">
        <Field label="Contact name"><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-sm border border-border-alloy px-3 py-2" /></Field>
        <Field label="Company (optional)"><input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full rounded-sm border border-border-alloy px-3 py-2" /></Field>
        <Field label="Email"><input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-sm border border-border-alloy px-3 py-2" /></Field>
        <Field label="Phone"><input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-sm border border-border-alloy px-3 py-2" /></Field>
        <Field label="Shipping ZIP"><input required value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} className="w-full rounded-sm border border-border-alloy px-3 py-2" /></Field>
        <Field label="Quantity"><input type="number" min={1} required value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} className="w-full rounded-sm border border-border-alloy px-3 py-2" /></Field>
        <Field label="Product">
          <select
            value={form.sku}
            onChange={(e) => {
              const p = products.find((x) => x.sku === e.target.value);
              setForm({ ...form, sku: e.target.value, product: p?.title ?? "", size: p?.sizeLabel ?? "" });
            }}
            className="w-full rounded-sm border border-border-alloy px-3 py-2"
          >
            <option value="">Select product</option>
            {products.map((p) => <option key={p.sku} value={p.sku}>{p.title}</option>)}
          </select>
        </Field>
        <Field label="SKU"><input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} className="w-full rounded-sm border border-border-alloy px-3 py-2" /></Field>
        <Field label="Size"><input value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} className="w-full rounded-sm border border-border-alloy px-3 py-2" /></Field>
        <Field label="Finish"><input value={form.finish} onChange={(e) => setForm({ ...form, finish: e.target.value })} className="w-full rounded-sm border border-border-alloy px-3 py-2" /></Field>
        <Field label="Intended use (optional)"><input value={form.intendedUse} onChange={(e) => setForm({ ...form, intendedUse: e.target.value })} className="w-full rounded-sm border border-border-alloy px-3 py-2" /></Field>
        <Field label="Requested delivery window (optional)"><input value={form.deliveryWindow} onChange={(e) => setForm({ ...form, deliveryWindow: e.target.value })} className="w-full rounded-sm border border-border-alloy px-3 py-2" /></Field>
        <label className="sm:col-span-2 text-sm">
          <span className="mb-1 block font-medium">Additional details</span>
          <textarea rows={4} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} className="w-full rounded-sm border border-border-alloy px-3 py-2" />
        </label>
        <label className="flex items-start gap-2 text-sm sm:col-span-2">
          <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1" />
          <span>I consent to be contacted about this quote request.</span>
        </label>
        <label className="flex items-start gap-2 text-sm sm:col-span-2">
          <input type="checkbox" checked={form.privacy} onChange={(e) => setForm({ ...form, privacy: e.target.checked })} className="mt-1" />
          <span>
            I acknowledge the <Link href="/privacy-policy" className="text-tempered-blue underline">privacy policy</Link>.
          </span>
        </label>
        <div className="sm:col-span-2">
          <Button type="submit" disabled={status === "loading"}>{status === "loading" ? "Submitting…" : "Submit quote request"}</Button>
          {message && <p role="status" className={`mt-3 text-sm ${status === "error" ? "text-furnace-clay" : "text-tempered-blue"}`}>{message}</p>}
        </div>
      </form>
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
