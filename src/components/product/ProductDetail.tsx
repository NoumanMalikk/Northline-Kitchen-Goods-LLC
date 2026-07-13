"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/types/product";
import { formatPrice, displaySpec } from "@/lib/utils";
import { ProductImage } from "@/components/product/ProductImage";
import { Button } from "@/components/ui/Button";
import { useCartStore, useCompareStore, useWishlistStore } from "@/stores";
import { storeConfig } from "@/data/store-config";
import { canPurchaseProduct } from "@/data/product-safety";

const sections = [
  "overview",
  "dimensions",
  "materials",
  "handles",
  "cooktop",
  "oven",
  "package",
  "care",
  "safety",
  "shipping",
  "verification",
] as const;

export function ProductDetail({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const wishlist = useWishlistStore();
  const compare = useCompareStore();
  const purchase = canPurchaseProduct(product, storeConfig.storeMode);
  const liveBlocked = storeConfig.storeMode === "live" && !purchase.allowed;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <nav className="mb-6 text-sm text-graphite" aria-label="Breadcrumb">
        <Link href="/shop" className="hover:text-foundry-ink focus-ring">Shop</Link>
        <span className="mx-2">/</span>
        <Link href={`/collections/${product.category === "Bake and Roast" ? "bake-roast" : product.category.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-foundry-ink focus-ring">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span>{product.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="relative aspect-square border border-border-alloy bg-clean-white p-6">
            <ProductImage product={product} priority />
          </div>
          {product.imageVerificationStatus === "pending" && (
            <p className="text-xs text-graphite">
              Studio catalog image matched to this product title. Confirm against physical inventory before live launch.
            </p>
          )}
          {product.imageVerificationStatus === "missing" && (
            <p className="text-xs text-graphite">
              Exact product photography required. Placeholder shown until licensed imagery is verified.
            </p>
          )}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-tempered-blue">
            {product.category} · {product.subcategory}
          </p>
          <h1 className="mt-2 font-display text-3xl sm:text-4xl">{product.title}</h1>
          <p className="spec-mono mt-2 text-sm text-graphite">
            SKU {product.sku}
            {product.supplierSku ? ` · Supplier ${product.supplierSku}` : ""}
          </p>
          <p className="mt-4 text-sm capitalize text-northline-steel">
            Process: {product.processStages.join(" → ")}
          </p>
          {product.techniques.length > 0 && (
            <p className="mt-1 text-sm capitalize text-northline-steel">
              Techniques: {product.techniques.join(", ")}
            </p>
          )}

          <p className="mt-6 font-display text-3xl">{formatPrice(product.demoPrice)}</p>

          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <Spec label="Size" value={product.sizeLabel} />
            <Spec label="Capacity" value={displaySpec(product.capacity)} />
            <Spec label="Diameter" value={displaySpec(product.diameter)} />
            <Spec label="Total length" value={displaySpec(product.totalLength)} />
            <Spec label="Material" value={product.materialLabel} />
            <Spec label="Construction" value={displaySpec(product.construction)} />
            <Spec label="Lid included" value={displaySpec(product.lidIncluded)} />
            <Spec label="Piece count" value={String(product.packageContents.length)} />
          </dl>

          {product.sharpItem && (
            <div className="mt-4 border border-furnace-clay/40 bg-furnace-clay/10 p-3 text-sm text-foundry-ink">
              Sharp-item notice: review safety information before purchase and use.
            </div>
          )}

          {liveBlocked && (
            <div className="mt-4 border border-tempered-blue/40 bg-tempered-blue/10 p-3 text-sm">
              Live purchase blocked: {purchase.reason}
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <label className="text-sm">
              Qty{" "}
              <input
                type="number"
                min={1}
                max={99}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="ml-1 w-20 rounded-sm border border-border-alloy px-2 py-2"
              />
            </label>
            <Button
              disabled={liveBlocked}
              onClick={() => addItem({ productId: product.id, sku: product.sku, quantity: qty })}
            >
              Add to Cart
            </Button>
            <Button
              variant="secondary"
              onClick={() => wishlist.toggle({ productId: product.id, sku: product.sku })}
            >
              Wishlist
            </Button>
            <Button
              variant="ghost"
              onClick={() => compare.add(product.id)}
              disabled={compare.has(product.id)}
            >
              Compare
            </Button>
            <Link href={`/request-a-quote?sku=${product.sku}`} className="text-sm font-semibold text-tempered-blue underline focus-ring">
              Request a quote
            </Link>
          </div>

          <div className="mt-4 text-xs text-graphite">
            Production status: {product.productionReady ? "Ready" : "Not production ready"} · Image:{" "}
            {product.imageVerificationStatus} · Specs: {product.specificationVerificationStatus} · Safety:{" "}
            {product.safetyVerificationStatus}
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-4 lg:grid-cols-[220px_1fr]">
        <nav className="space-y-1 text-sm" aria-label="Product information">
          {sections.map((s) => (
            <a key={s} href={`#${s}`} className="block rounded-sm px-2 py-2 capitalize hover:bg-warm-tin/40 focus-ring">
              {s.replace("-", " ")}
            </a>
          ))}
        </nav>
        <div className="space-y-8">
          <Section id="overview" title="Product Overview">
            <p>{product.shortDescription}</p>
            <p className="mt-2">Unknown fields display as verification required until confirmed.</p>
          </Section>
          <Section id="dimensions" title="Dimensions">
            <DimensionDiagram product={product} />
          </Section>
          <Section id="materials" title="Materials and Construction">
            <ul className="space-y-1">
              <li>Materials: {product.materials.join(", ")}</li>
              <li>Metal grade: {displaySpec(product.metalGrade)}</li>
              <li>Construction: {displaySpec(product.construction)}</li>
              <li>Layer count: {displaySpec(product.layerCount)}</li>
              <li>Interior finish: {displaySpec(product.interiorFinish)}</li>
              <li>Exterior finish: {displaySpec(product.exteriorFinish)}</li>
            </ul>
          </Section>
          <Section id="handles" title="Handle, Rim and Lid">
            <p>Handle length: {displaySpec(product.handleLength)}</p>
            <p>Lid included: {displaySpec(product.lidIncluded)}</p>
            <p className="mt-2 text-graphite">Detailed rim and handle construction pending verification.</p>
          </Section>
          <Section id="cooktop" title="Cooktop Compatibility">
            <p>Stovetop: {displaySpec(product.stovetopCompatibility)}</p>
            <p>Induction: {displaySpec(product.inductionCompatibility)}</p>
          </Section>
          <Section id="oven" title="Oven and Heat Information">
            <p>Oven-safe temperature: {displaySpec(product.ovenSafeTemperature)}</p>
            <p>Broiler: {displaySpec(product.broilerCompatibility)}</p>
          </Section>
          <Section id="package" title="Package Contents">
            <ul className="list-disc space-y-1 pl-5">
              {product.packageContents.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Section>
          <Section id="care" title="Use and Care">
            <p>{displaySpec(product.careInstructions)}</p>
            <p>Seasoning required: {displaySpec(product.seasoningRequired)}</p>
            <p>Dishwasher: {displaySpec(product.dishwasherSafe)}</p>
            <Link href="/cookware-use-care" className="mt-2 inline-block text-tempered-blue underline focus-ring">
              Cookware use and care guide
            </Link>
          </Section>
          <Section id="safety" title="Safety">
            {product.warnings.length ? (
              <ul className="list-disc space-y-1 pl-5">
                {product.warnings.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            ) : (
              <p>No product-specific warnings recorded yet. Review general product safety guidance.</p>
            )}
            <p className="mt-2">Food-contact documentation: {displaySpec(product.foodContactDocumentation)}</p>
            <Link href="/product-safety" className="mt-2 inline-block text-tempered-blue underline focus-ring">
              Product safety
            </Link>
          </Section>
          <Section id="shipping" title="Shipping Information">
            <p>Shipping class: {product.shippingClass}</p>
            <p>Sharp item: {product.sharpItem ? "Yes" : "No"}</p>
            <p>Fragile lid: {product.fragileLid ? "Yes" : "No"}</p>
            <p>Package weight: {displaySpec(product.packageWeight)}</p>
          </Section>
          <Section id="verification" title="Product Verification">
            <ul className="space-y-1">
              <li>Image verification: {product.imageVerificationStatus}</li>
              <li>Specification verification: {product.specificationVerificationStatus}</li>
              <li>Safety verification: {product.safetyVerificationStatus}</li>
              <li>Production ready: {product.productionReady ? "Yes" : "No"}</li>
              <li>Country of origin: {displaySpec(product.countryOfOrigin)}</li>
              <li>Manufacturer: {displaySpec(product.manufacturer)}</li>
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-border-alloy bg-clean-white p-3">
      <dt className="text-[11px] uppercase tracking-wider text-tempered-blue">{label}</dt>
      <dd className="spec-mono mt-1 text-sm">{value}</dd>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border border-border-alloy bg-clean-white p-5">
      <h2 className="font-display text-xl">{title}</h2>
      <div className="mt-3 text-sm text-northline-steel">{children}</div>
    </section>
  );
}

function DimensionDiagram({ product }: { product: Product }) {
  return (
    <div className="overflow-x-auto">
      <svg viewBox="0 0 420 220" className="h-auto w-full max-w-lg text-foundry-ink" role="img" aria-label="Dimension diagram">
        <rect x="80" y="60" width="180" height="90" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="80" y1="170" x2="260" y2="170" stroke="#B88A45" strokeWidth="1.5" />
        <text x="170" y="190" textAnchor="middle" className="fill-current" fontSize="11">
          Diameter / width: {displaySpec(product.diameter ?? product.width)}
        </text>
        <line x1="50" y1="60" x2="50" y2="150" stroke="#416B78" strokeWidth="1.5" />
        <text x="20" y="110" transform="rotate(-90 20 110)" fontSize="11">
          Height: {displaySpec(product.height)}
        </text>
        <text x="280" y="80" fontSize="11">Capacity: {displaySpec(product.capacity)}</text>
        <text x="280" y="100" fontSize="11">Base Ø: {displaySpec(product.baseDiameter)}</text>
        <text x="280" y="120" fontSize="11">Handle: {displaySpec(product.handleLength)}</text>
        <text x="280" y="140" fontSize="11">Total L: {displaySpec(product.totalLength)}</text>
      </svg>
      <p className="mt-2 text-xs text-graphite">Measurements are never inferred from photographs.</p>
    </div>
  );
}
