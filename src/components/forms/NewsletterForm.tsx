"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      setStatus("error");
      setMessage("Please acknowledge the privacy policy before subscribing.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Subscription failed");
      setStatus("success");
      setMessage(data.message ?? "Check your inbox to confirm (double opt-in ready).");
      setEmail("");
      setConsent(false);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 max-w-xl space-y-4">
      <div>
        <label htmlFor="newsletter-email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-sm border border-border-alloy bg-parchment px-3 py-3 text-sm focus-ring"
          autoComplete="email"
        />
      </div>
      <label className="flex items-start gap-2 text-sm text-northline-steel">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1"
        />
        <span>
          I agree to receive catalog and product-guide updates and have read the{" "}
          <Link href="/privacy-policy" className="text-tempered-blue underline focus-ring">
            privacy policy
          </Link>
          .
        </span>
      </label>
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Submitting…" : "Subscribe"}
      </Button>
      {message && (
        <p
          role="status"
          className={`text-sm ${status === "error" ? "text-furnace-clay" : "text-tempered-blue"}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
