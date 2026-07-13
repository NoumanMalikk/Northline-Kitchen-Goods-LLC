"use client";

import { useState } from "react";
import Link from "next/link";
import { storeConfig } from "@/data/store-config";
import { Button } from "@/components/ui/Button";

const topics = [
  "Product question",
  "Material or construction question",
  "Cooktop compatibility",
  "Dimensions or capacity",
  "Knife or sharp-tool safety",
  "Existing order",
  "Shipping",
  "Returns",
  "Quote request",
  "Website support",
  "Other",
];

export function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    topic: topics[0],
    details: "",
    consent: false,
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.consent) {
      setStatus("error");
      setMessage("Please acknowledge the privacy policy.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unable to send");
      setStatus("success");
      setMessage(data.message ?? `Received. Reference ${data.reference}`);
      setForm({ name: "", email: "", phone: "", topic: topics[0], details: "", consent: false });
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Failed");
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 lg:px-6">
      <h1 className="font-display text-4xl">Contact</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="space-y-3 text-sm text-northline-steel">
          <p className="font-display text-xl text-foundry-ink">{storeConfig.legalName}</p>
          <p>
            Phone:{" "}
            <a href={`tel:${storeConfig.phoneE164}`} className="text-tempered-blue underline focus-ring">
              {storeConfig.phoneDisplay}
            </a>
          </p>
          <p>{storeConfig.publicLocationLabel}</p>
          {storeConfig.showFullBusinessAddress && (
            <p>
              {storeConfig.registeredAddress.line1}, {storeConfig.registeredAddress.city},{" "}
              {storeConfig.registeredAddress.state} {storeConfig.registeredAddress.postalCode}
            </p>
          )}
          {storeConfig.contactEmail ? (
            <p>
              Email:{" "}
              <a href={`mailto:${storeConfig.contactEmail}`} className="text-tempered-blue underline focus-ring">
                {storeConfig.contactEmail}
              </a>
            </p>
          ) : (
            <p className="text-graphite">Email will appear here after CONTACT_EMAIL is configured.</p>
          )}
          <p className="text-xs text-graphite">
            The registered address is not a public store, showroom, or factory. Store hours are not published. Local pickup is not enabled.
          </p>
          <Link href="/request-a-quote" className="inline-block text-tempered-blue underline focus-ring">
            Request a quote
          </Link>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 border border-border-alloy bg-clean-white p-6">
          <Field label="Name">
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-sm border border-border-alloy px-3 py-2" />
          </Field>
          <Field label="Email">
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-sm border border-border-alloy px-3 py-2" />
          </Field>
          <Field label="Phone">
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-sm border border-border-alloy px-3 py-2" />
          </Field>
          <Field label="Topic">
            <select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className="w-full rounded-sm border border-border-alloy px-3 py-2">
              {topics.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Details">
            <textarea required rows={5} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} className="w-full rounded-sm border border-border-alloy px-3 py-2" />
          </Field>
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1" />
            <span>
              I acknowledge the{" "}
              <Link href="/privacy-policy" className="text-tempered-blue underline">privacy policy</Link>.
            </span>
          </label>
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Send message"}
          </Button>
          {message && (
            <p role="status" className={`text-sm ${status === "error" ? "text-furnace-clay" : "text-tempered-blue"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
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
