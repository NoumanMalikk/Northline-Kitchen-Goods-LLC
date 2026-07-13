"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useUiStore } from "@/stores";
import { searchProducts } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "@/components/product/ProductImage";

const RECENT_KEY = "northline-recent-searches";

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUiStore();
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
    } catch {
      return [];
    }
  });
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchProducts(query).slice(0, 8), [query]);

  useEffect(() => {
    if (!searchOpen) return;
    inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, Math.max(results.length - 1, 0)));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, results.length, setSearchOpen]);

  function saveRecent(q: string) {
    const next = [q, ...recent.filter((r) => r !== q)].slice(0, 6);
    setRecent(next);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  }

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Search">
      <button type="button" className="absolute inset-0 bg-foundry-ink/50" aria-label="Close search" onClick={() => setSearchOpen(false)} />
      <div className="relative mx-auto mt-16 w-full max-w-2xl px-4">
        <div className="overflow-hidden rounded-sm border border-border-alloy bg-clean-white shadow-2xl">
          <div className="flex items-center gap-2 border-b border-border-alloy px-4">
            <Search className="h-5 w-5 text-northline-steel" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              placeholder="Search by title, SKU, process, material, size…"
              className="w-full bg-transparent py-4 text-sm outline-none"
              aria-autocomplete="list"
              aria-controls="search-results"
            />
            <button type="button" className="rounded-sm p-2 focus-ring" aria-label="Close search" onClick={() => setSearchOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <div id="search-results" className="max-h-[60vh] overflow-y-auto p-2" role="listbox" aria-live="polite">
            {!query && recent.length > 0 && (
              <div className="px-2 py-2">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-tempered-blue">Recent</p>
                <ul className="flex flex-wrap gap-2">
                  {recent.map((r) => (
                    <li key={r}>
                      <button
                        type="button"
                        className="rounded-sm border border-border-alloy px-2 py-1 text-xs focus-ring"
                        onClick={() => setQuery(r)}
                      >
                        {r}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {query && results.length === 0 && (
              <p className="px-3 py-6 text-sm text-northline-steel">No products matched “{query}”.</p>
            )}

            <ul>
              {results.map((product, i) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.slug}`}
                    role="option"
                    aria-selected={i === active}
                    className={`flex items-center gap-3 rounded-sm px-2 py-2 focus-ring ${i === active ? "bg-parchment" : "hover:bg-parchment"}`}
                    onClick={() => {
                      saveRecent(query);
                      setSearchOpen(false);
                    }}
                  >
                    <div className="relative h-14 w-14 overflow-hidden border border-border-alloy bg-parchment">
                      <ProductImage product={product} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{product.title}</p>
                      <p className="text-xs text-northline-steel">
                        {product.sizeLabel} · {product.materialLabel}
                      </p>
                      <p className="text-[11px] capitalize text-tempered-blue">
                        {product.processStages.join(" · ")}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">{formatPrice(product.demoPrice)}</p>
                  </Link>
                </li>
              ))}
            </ul>

            {query && (
              <Link
                href={`/search?q=${encodeURIComponent(query)}`}
                className="mt-2 block px-3 py-3 text-sm font-semibold text-tempered-blue focus-ring"
                onClick={() => {
                  saveRecent(query);
                  setSearchOpen(false);
                }}
              >
                View all results for “{query}”
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
