"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function OrderSuccessPage() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const demoRef = params.get("order");
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const [order, setOrder] = useState<{
    reference: string;
    email?: string;
    total?: number;
    status?: string;
    items?: { title: string; sku: string; quantity: number }[];
    sharpNotice?: boolean;
  } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const qs = sessionId
          ? `session_id=${encodeURIComponent(sessionId)}`
          : demoRef
            ? `order=${encodeURIComponent(demoRef)}`
            : "";
        if (!qs) {
          setState("error");
          return;
        }
        const res = await fetch(`/api/orders?${qs}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Unable to verify order");
        setOrder(data.order);
        setState("ok");
      } catch {
        setState("error");
      }
    }
    load();
  }, [sessionId, demoRef]);

  if (state === "loading") {
    return <div className="mx-auto max-w-3xl px-4 py-16">Verifying payment…</div>;
  }

  if (state === "error" || !order) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <h1 className="font-display text-3xl">Order not verified</h1>
        <p className="mt-4 text-northline-steel">
          Success is only shown for verified payments. If you completed checkout, use order tracking with your email and order reference.
        </p>
        <Link href="/track-order" className="mt-4 inline-block text-tempered-blue underline focus-ring">Track order</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="border border-tempered-blue/30 bg-tempered-blue/10 p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-tempered-blue">Payment confirmed</p>
        <h1 className="mt-2 font-display text-4xl">Thank you for your order</h1>
        <p className="spec-mono mt-4 text-sm">Reference {order.reference}</p>
        {order.email && <p className="mt-2 text-sm">Confirmation details for {order.email}</p>}
        {order.items && (
          <ul className="mt-6 space-y-2 text-sm">
            {order.items.map((item) => (
              <li key={item.sku}>{item.title} · {item.sku} · qty {item.quantity}</li>
            ))}
          </ul>
        )}
        {typeof order.total === "number" && (
          <p className="mt-4 font-display text-xl">Total ${order.total.toFixed(2)}</p>
        )}
        {order.sharpNotice && (
          <p className="mt-4 text-sm text-furnace-clay">
            This order includes sharp tools. Review knife and mandoline safety guidance before use.
          </p>
        )}
        <p className="mt-4 text-sm text-northline-steel">
          Track fulfillment from the order tracking page using your order reference and email.
        </p>
        <div className="mt-6 flex gap-4">
          <Link href="/track-order" className="text-tempered-blue underline focus-ring">Track order</Link>
          <Link href="/knife-use-care" className="text-tempered-blue underline focus-ring">Knife care</Link>
          <Link href="/cookware-use-care" className="text-tempered-blue underline focus-ring">Cookware care</Link>
        </div>
      </div>
    </div>
  );
}
