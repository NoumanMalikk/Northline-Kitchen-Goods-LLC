"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/stores";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { summarizeCheckout } from "@/lib/cart-math";
import { Button } from "@/components/ui/Button";
import { storeConfig } from "@/data/store-config";
import { hasLegalPlaceholders } from "@/data/legal-config";

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    company: "",
    po: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    billingSame: true,
    billingLine1: "",
    billingCity: "",
    billingState: "",
    billingPostalCode: "",
    terms: false,
    privacy: false,
    sizesReviewed: false,
    compatibilityReviewed: false,
    sharpReviewed: false,
    marketing: false,
  });

  const summary = useMemo(() => summarizeCheckout(items, form.state), [items, form.state]);
  const products = items.map((i) => ({ item: i, product: getProductById(i.productId) }));
  const hasSharp = products.some((p) => p.product?.sharpItem);
  const hasCookware = products.some(
    (p) => p.product?.category === "Cookware" || p.product?.category === "Specialty Cookware",
  );

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function createCheckout() {
    setError("");
    if (!form.terms || !form.privacy || !form.sizesReviewed) {
      setError("Please complete required acknowledgments.");
      return;
    }
    if (hasCookware && !form.compatibilityReviewed) {
      setError("Please confirm cookware compatibility was reviewed.");
      return;
    }
    if (hasSharp && !form.sharpReviewed) {
      setError("Please confirm sharp-tool safety information was reviewed.");
      return;
    }
    if (storeConfig.storeMode === "live" && hasLegalPlaceholders()) {
      setError("Live checkout is blocked until legal policies are approved.");
      return;
    }
    if (!summary.validation.valid) {
      setError(summary.validation.results.flatMap((r) => r.errors).join(" ") || "Cart validation failed.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer: form,
          shipping: summary.shipping,
          subtotal: summary.subtotal,
          tax: summary.tax,
          total: summary.total,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");
      if (data.url) {
        clearCart();
        window.location.href = data.url;
        return;
      }
      if (data.demoSuccessUrl) {
        clearCart();
        window.location.href = data.demoSuccessUrl;
        return;
      }
      throw new Error("No checkout URL returned");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="font-display text-3xl">Checkout</h1>
        <p className="mt-4">Your cart is empty.</p>
        <Link href="/shop" className="mt-4 inline-block text-tempered-blue underline">Shop kitchen goods</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
      <h1 className="font-display text-4xl">Checkout</h1>
      {storeConfig.storeMode === "demo" && (
        <p className="mt-2 rounded-sm border border-tempered-blue/30 bg-tempered-blue/10 px-3 py-2 text-sm">
          Demonstration checkout — Stripe test mode when configured. Incomplete products are labeled as demo.
        </p>
      )}

      <ol className="mt-6 flex flex-wrap gap-2 text-xs">
        {["Customer", "Shipping", "Validation", "Shipping method", "Billing", "Tax", "Payment", "Review", "Agreements"].map((label, i) => (
          <li key={label}>
            <button
              type="button"
              className={`rounded-sm px-2 py-1 focus-ring ${step === i + 1 ? "bg-foundry-ink text-clean-white" : "bg-warm-tin/50"}`}
              onClick={() => setStep((i + 1) as Step)}
            >
              {i + 1}. {label}
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4 border border-border-alloy bg-clean-white p-6">
          {step === 1 && (
            <fieldset className="space-y-3">
              <legend className="font-display text-xl">Customer information</legend>
              <Input label="Email" value={form.email} onChange={(v) => update("email", v)} type="email" required />
              <div className="grid gap-3 sm:grid-cols-2">
                <Input label="First name" value={form.firstName} onChange={(v) => update("firstName", v)} required />
                <Input label="Last name" value={form.lastName} onChange={(v) => update("lastName", v)} required />
              </div>
              <Input label="Phone" value={form.phone} onChange={(v) => update("phone", v)} />
              <Input label="Company (optional)" value={form.company} onChange={(v) => update("company", v)} />
              <Input label="PO reference (optional)" value={form.po} onChange={(v) => update("po", v)} />
            </fieldset>
          )}

          {step === 2 && (
            <fieldset className="space-y-3">
              <legend className="font-display text-xl">Shipping address</legend>
              <Input label="Address line 1" value={form.line1} onChange={(v) => update("line1", v)} required />
              <Input label="Address line 2" value={form.line2} onChange={(v) => update("line2", v)} />
              <div className="grid gap-3 sm:grid-cols-3">
                <Input label="City" value={form.city} onChange={(v) => update("city", v)} required />
                <Input label="State" value={form.state} onChange={(v) => update("state", v)} required />
                <Input label="ZIP" value={form.postalCode} onChange={(v) => update("postalCode", v)} required />
              </div>
              <Input label="Country" value={form.country} onChange={(v) => update("country", v)} required />
            </fieldset>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-display text-xl">Product validation</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {summary.validation.results.map((r, i) => (
                  <li key={i} className={r.valid ? "text-tempered-blue" : "text-furnace-clay"}>
                    {r.product?.sku ?? items[i]?.sku}: {r.valid ? "Validated against catalog" : r.errors.join("; ")}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="font-display text-xl">Shipping method</h2>
              <p className="mt-3 text-sm">{summary.shipping.label}</p>
              <p className="mt-1 font-semibold">{formatPrice(summary.shipping.amount)}</p>
              {summary.shipping.requiresQuote && (
                <p className="mt-2 text-sm text-furnace-clay">
                  One or more items require a shipping quote.{" "}
                  <Link href="/request-a-quote" className="underline">Request a quote</Link>
                </p>
              )}
              <p className="mt-2 text-xs text-graphite">Classes: {summary.shipping.classes.join(", ") || "n/a"}</p>
            </div>
          )}

          {step === 5 && (
            <fieldset className="space-y-3">
              <legend className="font-display text-xl">Billing address</legend>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.billingSame} onChange={(e) => update("billingSame", e.target.checked)} />
                Same as shipping
              </label>
              {!form.billingSame && (
                <>
                  <Input label="Billing line 1" value={form.billingLine1} onChange={(v) => update("billingLine1", v)} />
                  <Input label="Billing city" value={form.billingCity} onChange={(v) => update("billingCity", v)} />
                  <Input label="Billing state" value={form.billingState} onChange={(v) => update("billingState", v)} />
                  <Input label="Billing ZIP" value={form.billingPostalCode} onChange={(v) => update("billingPostalCode", v)} />
                </>
              )}
            </fieldset>
          )}

          {step === 6 && (
            <div>
              <h2 className="font-display text-xl">Tax</h2>
              <p className="mt-3 text-sm">Tax is calculated server-side. Client-side tax manipulation is not permitted.</p>
              <p className="mt-2 text-sm text-graphite">{summary.taxLabel}</p>
              <p className="mt-1 font-semibold">{formatPrice(summary.tax)}</p>
            </div>
          )}

          {step === 7 && (
            <div>
              <h2 className="font-display text-xl">Payment</h2>
              <p className="mt-3 text-sm">
                Payment is processed by Stripe Checkout. Card details are never collected through ordinary form inputs on this site.
              </p>
              <p className="mt-2 text-xs text-graphite">
                {storeConfig.storeMode === "demo"
                  ? "Stripe test mode is used during development when keys are configured."
                  : "Live mode requires verified products, shipping, tax, webhooks, and policies."}
              </p>
            </div>
          )}

          {step === 8 && (
            <div>
              <h2 className="font-display text-xl">Order review</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {products.map(({ item, product }) =>
                  product ? (
                    <li key={item.sku} className="border-b border-border-alloy pb-2">
                      <p className="font-medium">{product.title}</p>
                      <p className="spec-mono text-xs">{product.sku} · qty {item.quantity}</p>
                      <p>{product.sizeLabel} · {formatPrice(product.demoPrice * item.quantity)}</p>
                      {product.sharpItem && <p className="text-furnace-clay">Sharp-item notice</p>}
                    </li>
                  ) : null,
                )}
              </ul>
              <dl className="mt-4 space-y-1 text-sm">
                <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatPrice(summary.subtotal)}</dd></div>
                <div className="flex justify-between"><dt>Shipping</dt><dd>{formatPrice(summary.shipping.amount)}</dd></div>
                <div className="flex justify-between"><dt>Tax</dt><dd>{formatPrice(summary.tax)}</dd></div>
                <div className="flex justify-between font-display text-lg"><dt>Total</dt><dd>{formatPrice(summary.total)}</dd></div>
              </dl>
            </div>
          )}

          {step === 9 && (
            <fieldset className="space-y-3 text-sm">
              <legend className="font-display text-xl">Agreements</legend>
              <Check checked={form.terms} onChange={(v) => update("terms", v)} label="I acknowledge the Terms & Conditions." />
              <Check checked={form.privacy} onChange={(v) => update("privacy", v)} label="I acknowledge the Privacy Policy." />
              <Check checked={form.sizesReviewed} onChange={(v) => update("sizesReviewed", v)} label="I reviewed sizes and capacities." />
              {hasCookware && (
                <Check checked={form.compatibilityReviewed} onChange={(v) => update("compatibilityReviewed", v)} label="I reviewed cookware compatibility information." />
              )}
              {hasSharp && (
                <Check checked={form.sharpReviewed} onChange={(v) => update("sharpReviewed", v)} label="I reviewed sharp-tool safety information." />
              )}
              <Check checked={form.marketing} onChange={(v) => update("marketing", v)} label="Send me catalog updates (optional)." />
            </fieldset>
          )}

          {error && <p className="text-sm text-furnace-clay" role="alert">{error}</p>}

          <div className="flex gap-3 pt-4">
            {step > 1 && (
              <Button variant="secondary" type="button" onClick={() => setStep((s) => (s - 1) as Step)}>
                Back
              </Button>
            )}
            {step < 9 ? (
              <Button type="button" onClick={() => setStep((s) => (s + 1) as Step)}>
                Continue
              </Button>
            ) : (
              <Button type="button" disabled={loading} onClick={createCheckout}>
                {loading ? "Processing…" : "Pay securely with Stripe"}
              </Button>
            )}
          </div>
        </div>

        <aside className="h-fit border border-border-alloy bg-parchment p-5">
          <h2 className="font-display text-lg">Order summary</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {products.map(({ item, product }) =>
              product ? (
                <li key={item.sku} className="flex justify-between gap-2">
                  <span className="line-clamp-2">{product.title} × {item.quantity}</span>
                  <span>{formatPrice(product.demoPrice * item.quantity)}</span>
                </li>
              ) : null,
            )}
          </ul>
          <div className="mt-4 space-y-1 border-t border-border-alloy pt-4 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(summary.subtotal)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{formatPrice(summary.shipping.amount)}</span></div>
            <div className="flex justify-between font-semibold"><span>Total</span><span>{formatPrice(summary.total)}</span></div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium">{label}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-border-alloy px-3 py-2"
      />
    </label>
  );
}

function Check({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-start gap-2">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1" />
      <span>{label}</span>
    </label>
  );
}
