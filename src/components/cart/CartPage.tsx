"use client";

import Link from "next/link";
import { useCartStore, useWishlistStore } from "@/stores";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { getCartSubtotal, getLineTotal } from "@/lib/cart-math";
import { ProductImage } from "@/components/product/ProductImage";
import { storeConfig } from "@/data/store-config";

export function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const wishlist = useWishlistStore();
  const subtotal = getCartSubtotal(items);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 lg:px-6">
      <h1 className="font-display text-4xl">Cart</h1>
      {items.length === 0 ? (
        <div className="mt-8 border border-dashed border-border-alloy p-10 text-center">
          <p>Your cart is empty.</p>
          <Link href="/shop" className="mt-4 inline-block text-tempered-blue underline focus-ring">Continue shopping</Link>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          <ul className="space-y-4">
            {items.map((item) => {
              const product = getProductById(item.productId);
              if (!product) return null;
              return (
                <li key={`${item.productId}-${item.sku}`} className="flex flex-wrap gap-4 border border-border-alloy bg-clean-white p-4">
                  <div className="relative h-24 w-24 border border-border-alloy bg-parchment">
                    <ProductImage product={product} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link href={`/products/${product.slug}`} className="font-medium focus-ring">{product.title}</Link>
                    <p className="spec-mono text-xs text-graphite">{product.sku}</p>
                    <p className="text-xs">{product.sizeLabel} · {product.packageContents.length} piece(s)</p>
                    <p className="text-xs text-graphite">Shipping class: {product.shippingClass}</p>
                    {product.sharpItem && <p className="text-xs text-furnace-clay">Sharp-item handling applies</p>}
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <input
                        type="number"
                        min={1}
                        max={99}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.productId, item.sku, Number(e.target.value))}
                        className="w-20 rounded-sm border border-border-alloy px-2 py-1"
                        aria-label={`Quantity for ${product.title}`}
                      />
                      <button type="button" className="text-xs underline focus-ring" onClick={() => removeItem(item.productId, item.sku)}>Remove</button>
                      <button
                        type="button"
                        className="text-xs underline focus-ring"
                        onClick={() => {
                          wishlist.toggle({ productId: product.id, sku: product.sku });
                          removeItem(item.productId, item.sku);
                        }}
                      >
                        Move to wishlist
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-graphite">{formatPrice(product.demoPrice)} each</p>
                    <p className="font-semibold">{formatPrice(getLineTotal(product.demoPrice, item.quantity))}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="border border-border-alloy bg-clean-white p-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-display text-xl">{formatPrice(subtotal)}</span>
            </div>
            {storeConfig.storeMode === "demo" && (
              <p className="mt-2 text-xs text-graphite">Demonstration prices. Shipping and tax calculated at checkout.</p>
            )}
            <ButtonLinkSafe />
          </div>
        </div>
      )}
    </div>
  );
}

function ButtonLinkSafe() {
  return (
    <Link href="/checkout" className="mt-4 inline-flex min-h-11 items-center justify-center rounded-sm bg-foundry-ink px-5 text-sm font-semibold text-clean-white focus-ring">
      Proceed to checkout
    </Link>
  );
}
