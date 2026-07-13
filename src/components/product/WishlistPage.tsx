"use client";

import Link from "next/link";
import { useWishlistStore, useCartStore, useCompareStore } from "@/stores";
import { getProductById } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";

export function WishlistPage() {
  const { items, clear, remove } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);
  const compare = useCompareStore();
  const products = items.map((i) => getProductById(i.productId)).filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl">Wishlist</h1>
          <p className="mt-2 text-northline-steel">Saved locally in your browser. No account required.</p>
        </div>
        {items.length > 0 && (
          <Button variant="secondary" onClick={() => { if (confirm("Clear wishlist?")) clear(); }}>
            Clear all
          </Button>
        )}
      </div>
      {products.length === 0 ? (
        <div className="border border-dashed border-border-alloy p-10 text-center">
          <p className="text-northline-steel">Your wishlist is empty.</p>
          <Link href="/shop" className="mt-4 inline-block text-tempered-blue underline focus-ring">Browse products</Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) =>
            product ? (
              <div key={product.id} className="space-y-2">
                <ProductCard product={product} />
                <div className="flex flex-wrap gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => addItem({ productId: product.id, sku: product.sku, quantity: 1 })}
                  >
                    Move to cart
                  </Button>
                  <Button variant="ghost" onClick={() => compare.add(product.id)}>Compare</Button>
                  <Button variant="ghost" onClick={() => remove(product.id)}>Remove</Button>
                  <Link href="/kitchen-flow-builder" className="text-xs text-tempered-blue underline focus-ring">Add to kitchen flow</Link>
                </div>
              </div>
            ) : null,
          )}
        </div>
      )}
    </div>
  );
}
