"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useCartStore } from "@/stores";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { getCartSubtotal, getLineTotal } from "@/lib/cart-math";
import { ProductImage } from "@/components/product/ProductImage";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem } = useCartStore();
  const subtotal = getCartSubtotal(items);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Cart">
      <button type="button" className="absolute inset-0 bg-foundry-ink/50" aria-label="Close cart" onClick={closeCart} />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-parchment shadow-2xl">
        <div className="flex items-center justify-between border-b border-border-alloy px-4 py-4">
          <h2 className="font-display text-lg">Cart</h2>
          <button type="button" className="rounded-sm p-2 focus-ring" aria-label="Close cart" onClick={closeCart}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <p className="text-sm text-northline-steel">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => {
                const product = getProductById(item.productId);
                if (!product) return null;
                return (
                  <li key={`${item.productId}-${item.sku}`} className="flex gap-3 border-b border-border-alloy pb-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-border-alloy bg-clean-white">
                      <ProductImage product={product} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{product.title}</p>
                      <p className="spec-mono text-[11px] text-graphite">{product.sku}</p>
                      <p className="text-xs text-northline-steel">{product.sizeLabel}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <label className="sr-only" htmlFor={`qty-${item.sku}`}>Quantity</label>
                        <input
                          id={`qty-${item.sku}`}
                          type="number"
                          min={1}
                          max={99}
                          value={item.quantity}
                          className="w-16 rounded-sm border border-border-alloy bg-clean-white px-2 py-1 text-sm"
                          onChange={(e) =>
                            updateQuantity(item.productId, item.sku, Number(e.target.value))
                          }
                        />
                        <button
                          type="button"
                          className="text-xs text-furnace-clay underline focus-ring"
                          onClick={() => removeItem(item.productId, item.sku)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-semibold">
                      {formatPrice(getLineTotal(product.demoPrice, item.quantity))}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-border-alloy bg-clean-white px-4 py-4">
          <div className="mb-3 flex justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-semibold">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex gap-2">
            <Link
              href="/cart"
              onClick={closeCart}
              className="flex-1 rounded-sm border border-foundry-ink px-3 py-3 text-center text-sm font-semibold focus-ring"
            >
              View cart
            </Link>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="flex-1 rounded-sm bg-foundry-ink px-3 py-3 text-center text-sm font-semibold text-clean-white focus-ring"
            >
              Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
