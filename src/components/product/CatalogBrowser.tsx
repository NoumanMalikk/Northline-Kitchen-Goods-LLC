"use client";

import { useMemo, useState, useEffect } from "react";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";

type SortKey =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "diameter-asc"
  | "capacity-asc"
  | "length-asc"
  | "pieces-asc";

type ViewMode = "editorial" | "technical" | "list";

function parseNum(value: string | number | null | undefined) {
  if (value === null || value === undefined) return Number.POSITIVE_INFINITY;
  const m = String(value).match(/(\d+(\.\d+)?)/);
  return m ? Number(m[1]) : Number.POSITIVE_INFINITY;
}

export function CatalogBrowser({
  products,
  title,
  description,
}: {
  products: Product[];
  title: string;
  description?: string;
}) {
  const [sort, setSort] = useState<SortKey>("featured");
  const [view, setView] = useState<ViewMode>(() => {
    if (typeof window === "undefined") return "editorial";
    const saved = localStorage.getItem("northline-catalog-view") as ViewMode | null;
    return saved ?? "editorial";
  });
  const [category, setCategory] = useState("all");
  const [process, setProcess] = useState("all");
  const [material, setMaterial] = useState("all");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("northline-catalog-view", view);
  }, [view]);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).sort(),
    [products],
  );
  const processes = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.processStages))).sort(),
    [products],
  );
  const materials = useMemo(
    () =>
      Array.from(
        new Set(products.flatMap((p) => p.materials.map((m) => m.split(" - ")[0].trim()))),
      ).sort(),
    [products],
  );

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (process !== "all") list = list.filter((p) => p.processStages.includes(process as never));
    if (material !== "all")
      list = list.filter((p) => p.materials.some((m) => m.toLowerCase().includes(material.toLowerCase())));
    if (priceMin) list = list.filter((p) => p.demoPrice >= Number(priceMin));
    if (priceMax) list = list.filter((p) => p.demoPrice <= Number(priceMax));

    list.sort((a, b) => {
      switch (sort) {
        case "newest":
          return Number(b.newArrival) - Number(a.newArrival);
        case "price-asc":
          return a.demoPrice - b.demoPrice;
        case "price-desc":
          return b.demoPrice - a.demoPrice;
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "diameter-asc":
          return parseNum(a.diameter) - parseNum(b.diameter);
        case "capacity-asc":
          return parseNum(a.capacity) - parseNum(b.capacity);
        case "length-asc":
          return parseNum(a.totalLength) - parseNum(b.totalLength);
        case "pieces-asc":
          return a.packageContents.length - b.packageContents.length;
        default:
          return Number(b.featured) - Number(a.featured);
      }
    });
    return list;
  }, [products, category, process, material, priceMin, priceMax, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-8">
        <h1 className="font-display text-4xl text-foundry-ink">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-northline-steel">{description}</p>}
        <p className="mt-2 text-sm text-graphite">{filtered.length} products</p>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="rounded-sm border border-border-alloy bg-clean-white px-3 py-2 text-sm lg:hidden focus-ring"
          onClick={() => setFiltersOpen((o) => !o)}
        >
          Filters
        </button>
        <label className="text-sm">
          Sort{" "}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="ml-1 rounded-sm border border-border-alloy bg-clean-white px-2 py-2"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest catalog additions</option>
            <option value="price-asc">Price low to high</option>
            <option value="price-desc">Price high to low</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="diameter-asc">Diameter low to high</option>
            <option value="capacity-asc">Capacity low to high</option>
            <option value="length-asc">Total length low to high</option>
            <option value="pieces-asc">Piece count low to high</option>
          </select>
        </label>
        <div className="ml-auto flex gap-1" role="group" aria-label="Catalog view">
          {(["editorial", "technical", "list"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              className={cn(
                "rounded-sm border px-3 py-2 text-xs capitalize focus-ring",
                view === mode ? "border-foundry-ink bg-foundry-ink text-clean-white" : "border-border-alloy bg-clean-white",
              )}
              onClick={() => setView(mode)}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className={cn("space-y-4", filtersOpen ? "block" : "hidden lg:block")}>
          <FilterSelect label="Category" value={category} onChange={setCategory} options={categories} />
          <FilterSelect label="Cooking process" value={process} onChange={setProcess} options={processes} />
          <FilterSelect label="Material" value={material} onChange={setMaterial} options={materials} />
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-tempered-blue">Price range</p>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="w-full rounded-sm border border-border-alloy bg-clean-white px-2 py-2 text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="w-full rounded-sm border border-border-alloy bg-clean-white px-2 py-2 text-sm"
              />
            </div>
          </div>
          <p className="text-xs text-graphite">
            Compatibility filters appear only when product values are verified.
          </p>
        </aside>

        {view === "list" ? (
          <ul className="divide-y divide-border-alloy border border-border-alloy bg-clean-white">
            {filtered.map((product) => (
              <li key={product.id} className="flex flex-wrap items-center gap-4 p-4">
                <div className="min-w-0 flex-1">
                  <a href={`/products/${product.slug}`} className="font-medium focus-ring">
                    {product.title}
                  </a>
                  <p className="spec-mono text-xs text-graphite">
                    {product.sku} · {product.sizeLabel}
                  </p>
                </div>
                <p className="font-display">${product.demoPrice.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div
            className={cn(
              "grid gap-4",
              view === "technical" ? "sm:grid-cols-2 xl:grid-cols-3" : "sm:grid-cols-2 xl:grid-cols-3",
            )}
          >
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block text-sm">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-tempered-blue">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-border-alloy bg-clean-white px-2 py-2 capitalize"
      >
        <option value="all">All</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
