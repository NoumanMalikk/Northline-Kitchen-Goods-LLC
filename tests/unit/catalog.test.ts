import { describe, expect, it } from "vitest";
import { products } from "@/data/products";
import {
  buildOrderReference,
  getCartSubtotal,
  getLineTotal,
  matchTechniqueProducts,
  validateCartItem,
} from "@/lib/cart-math";
import { calculateDemoShipping } from "@/data/shipping-classes";
import { canPurchaseProduct, isSafetyReady } from "@/data/product-safety";
import { formatPrice, isPendingValue } from "@/lib/utils";
import { hasLegalPlaceholders } from "@/data/legal-config";

describe("catalog", () => {
  it("contains exactly 26 products", () => {
    expect(products).toHaveLength(26);
  });

  it("keeps all products non-production-ready", () => {
    expect(products.every((p) => p.productionReady === false)).toBe(true);
  });

  it("includes distinct categories", () => {
    const categories = new Set(products.map((p) => p.category));
    expect(categories.has("Cookware")).toBe(true);
    expect(categories.has("Bake and Roast")).toBe(true);
    expect(categories.has("Prep Tools")).toBe(true);
    expect(categories.has("Utensils")).toBe(true);
    expect(categories.has("Cutlery")).toBe(true);
    expect(categories.has("Flatware")).toBe(true);
  });
});

describe("cart math", () => {
  it("calculates line totals", () => {
    expect(getLineTotal(84, 2)).toBe(168);
  });

  it("calculates cart subtotals from catalog prices", () => {
    const subtotal = getCartSubtotal([
      { productId: "nkg-001", sku: "NKG-CWK-001", quantity: 2 },
      { productId: "nkg-023", sku: "NKG-UTN-023", quantity: 1 },
    ]);
    expect(subtotal).toBe(84 * 2 + 34);
  });

  it("validates sku and quantity", () => {
    const ok = validateCartItem({ productId: "nkg-001", sku: "NKG-CWK-001", quantity: 1 });
    expect(ok.valid).toBe(true);
    const bad = validateCartItem({ productId: "nkg-001", sku: "WRONG", quantity: 1 });
    expect(bad.valid).toBe(false);
  });

  it("generates non-empty order references", () => {
    expect(buildOrderReference().startsWith("NKG-")).toBe(true);
  });
});

describe("shipping and safety", () => {
  it("labels demonstration shipping", () => {
    const shipping = calculateDemoShipping([{ productId: "nkg-001", quantity: 1 }]);
    expect(shipping.isDemonstration).toBe(true);
  });

  it("requires quote for shipping-review items", () => {
    const shipping = calculateDemoShipping([{ productId: "nkg-016", quantity: 1 }]);
    expect(shipping.requiresQuote).toBe(true);
  });

  it("blocks live purchase for incomplete products", () => {
    const product = products[0];
    const live = canPurchaseProduct(product, "live");
    expect(live.allowed).toBe(false);
  });

  it("marks sharp tools as not safety-ready initially", () => {
    const knife = products.find((p) => p.sku === "NKG-CUT-024")!;
    expect(knife.sharpItem).toBe(true);
    expect(isSafetyReady(knife)).toBe(false);
  });
});

describe("helpers", () => {
  it("formats prices", () => {
    expect(formatPrice(84)).toBe("$84.00");
  });

  it("detects pending values", () => {
    expect(isPendingValue("Verification required")).toBe(true);
  });

  it("detects legal placeholders", () => {
    expect(hasLegalPlaceholders()).toBe(true);
  });

  it("matches technique products", () => {
    const matched = matchTechniqueProducts(products, { technique: "sear" });
    expect(matched.length).toBeGreaterThan(0);
  });
});
