"use client";

import Link from "next/link";
import { Heart, Columns2 } from "lucide-react";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { useCartStore, useCompareStore, useWishlistStore } from "@/stores";
import { storeConfig } from "@/data/store-config";
import { canPurchaseProduct } from "@/data/product-safety";
import { ProductImage } from "@/components/product/ProductImage";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const wishlist = useWishlistStore();
  const compare = useCompareStore();
  const purchase = canPurchaseProduct(product, storeConfig.storeMode);
  const wished = wishlist.has(product.id);
  const compared = compare.has(product.id);

  const primaryAction =
    storeConfig.storeMode === "live" && !purchase.allowed
      ? { label: "View Specifications", href: `/products/${product.slug}` as string | null }
      : { label: "Add to Cart", href: null };

  return (
    <article className="group flex h-full flex-col border border-border-alloy bg-clean-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="relative block focus-ring">
        <div className="relative aspect-square overflow-hidden bg-parchment p-4">
          <ProductImage product={product} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-tempered-blue">
          {product.processStages[0] ?? product.category}
        </p>
        <h3 className="line-clamp-2 min-h-[2.75rem] font-display text-base leading-snug text-foundry-ink">
          <Link href={`/products/${product.slug}`} className="focus-ring" title={product.title}>
            {product.title}
          </Link>
        </h3>
        <p className="spec-mono text-xs text-northline-steel">{product.sizeLabel}</p>
        <p className="line-clamp-1 text-xs text-graphite">{product.materialLabel}</p>
        <p className="mt-auto font-display text-lg text-foundry-ink">
          {formatPrice(product.demoPrice)}
        </p>
        <p className="spec-mono text-[10px] text-graphite">
          Compatibility: verification required
        </p>

        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            className={cn(
              "rounded-sm border border-border-alloy p-2 focus-ring",
              wished && "border-furnace-clay text-furnace-clay",
            )}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            onClick={() => wishlist.toggle({ productId: product.id, sku: product.sku })}
          >
            <Heart className={cn("h-4 w-4", wished && "fill-current")} />
          </button>
          <button
            type="button"
            className={cn(
              "rounded-sm border border-border-alloy p-2 focus-ring",
              compared && "border-tempered-blue text-tempered-blue",
            )}
            aria-label={compared ? "Remove from compare" : "Add to compare"}
            disabled={!compared && compare.productIds.length >= 4}
            onClick={() => (compared ? compare.remove(product.id) : compare.add(product.id))}
          >
            <Columns2 className="h-4 w-4" />
          </button>
          {primaryAction.href ? (
            <Link
              href={primaryAction.href}
              className="ml-auto inline-flex min-h-11 flex-1 items-center justify-center rounded-sm bg-foundry-ink px-3 text-sm font-semibold text-clean-white focus-ring"
            >
              {primaryAction.label}
            </Link>
          ) : (
            <button
              type="button"
              className="ml-auto inline-flex min-h-11 flex-1 items-center justify-center rounded-sm bg-foundry-ink px-3 text-sm font-semibold text-clean-white focus-ring"
              onClick={() => addItem({ productId: product.id, sku: product.sku, quantity: 1 })}
            >
              {primaryAction.label}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
