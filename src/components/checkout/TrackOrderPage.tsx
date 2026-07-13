"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function TrackOrderPage() {
  const [email, setEmail] = useState("");
  const [reference, setReference] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [order, setOrder] = useState<{
    reference: string;
    fulfilmentStatus: string;
    paymentStatus: string;
    updatedAt?: string;
  } | null>(null);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, reference }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unable to find order");
      setOrder(data.order);
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Lookup failed");
      setOrder(null);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16 lg:px-6">
      <h1 className="font-display text-4xl">Track order</h1>
      <p className="mt-3 text-northline-steel">
        Enter your order reference and the email used at checkout. Lookups are rate limited. Carrier tracking numbers are never fabricated.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 border border-border-alloy bg-clean-white p-6">
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Order reference</span>
          <input required value={reference} onChange={(e) => setReference(e.target.value)} className="w-full rounded-sm border border-border-alloy px-3 py-2" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Email</span>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-sm border border-border-alloy px-3 py-2" />
        </label>
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Looking up…" : "Track order"}
        </Button>
        {error && <p className="text-sm text-furnace-clay" role="alert">{error}</p>}
      </form>
      {order && (
        <div className="mt-6 border border-border-alloy bg-clean-white p-6">
          <p className="spec-mono text-sm">{order.reference}</p>
          <p className="mt-2 text-sm">Payment: {order.paymentStatus}</p>
          <p className="text-sm">Fulfilment: {order.fulfilmentStatus}</p>
          {order.updatedAt && <p className="mt-2 text-xs text-graphite">Updated {order.updatedAt}</p>}
        </div>
      )}
    </div>
  );
}
