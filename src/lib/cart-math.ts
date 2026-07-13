import type { CartItem, Product } from "@/types/product";
import { canPurchaseProduct } from "@/data/product-safety";
import { getProductById } from "@/data/products";
import { storeConfig } from "@/data/store-config";
import { calculateDemoShipping } from "@/data/shipping-classes";

export function formatDimension(value: string | number | null | undefined) {
  if (value === null || value === undefined) return "Verification required.";
  return String(value);
}

export function getLineTotal(price: number, quantity: number) {
  return Math.round(price * quantity * 100) / 100;
}

export function getCartSubtotal(
  items: CartItem[],
  resolveProduct: (id: string) => Product | undefined = getProductById,
) {
  return items.reduce((sum, item) => {
    const product = resolveProduct(item.productId);
    if (!product) return sum;
    return sum + getLineTotal(product.demoPrice, item.quantity);
  }, 0);
}

export function validateCartItem(item: CartItem): {
  valid: boolean;
  errors: string[];
  product?: Product;
} {
  const errors: string[] = [];
  const product = getProductById(item.productId);
  if (!product) {
    return { valid: false, errors: ["Product does not exist."] };
  }
  if (product.sku !== item.sku) {
    errors.push("SKU does not match product record.");
  }
  if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 99) {
    errors.push("Quantity must be an integer between 1 and 99.");
  }
  const purchase = canPurchaseProduct(product, storeConfig.storeMode);
  if (storeConfig.storeMode === "live" && !purchase.allowed) {
    errors.push(purchase.reason ?? "Product cannot be purchased in live mode.");
  }
  return { valid: errors.length === 0, errors, product };
}

export function validateCart(items: CartItem[]) {
  const results = items.map(validateCartItem);
  return {
    valid: results.every((r) => r.valid) && items.length > 0,
    results,
  };
}

export function buildOrderReference() {
  const rand = crypto.getRandomValues(new Uint8Array(8));
  const hex = Array.from(rand, (b) => b.toString(16).padStart(2, "0")).join("");
  return `NKG-${Date.now().toString(36).toUpperCase()}-${hex.slice(0, 10).toUpperCase()}`;
}

export function summarizeCheckout(items: CartItem[], state?: string) {
  const validation = validateCart(items);
  const subtotal = getCartSubtotal(items);
  const shipping = calculateDemoShipping(items, state);
  const taxRate = 0; // Tax calculated server-side via Stripe Tax when configured
  const tax = Math.round(subtotal * taxRate * 100) / 100;
  const total = Math.round((subtotal + shipping.amount + tax) * 100) / 100;
  return { validation, subtotal, shipping, tax, total, taxLabel: "Tax calculated at checkout" };
}

export function matchTechniqueProducts(
  allProducts: Product[],
  input: {
    technique?: string;
    portions?: number;
    cooktop?: string;
    handlePreference?: "long" | "side" | "either";
  },
) {
  let results = input.technique
    ? allProducts.filter((p) =>
        p.techniques.map(String).includes(input.technique!.toLowerCase()),
      )
    : allProducts.filter(
        (p) => p.category === "Cookware" || p.category === "Specialty Cookware",
      );

  if (input.portions && input.portions >= 6) {
    results = results.filter((p) => {
      const cap = String(p.capacity ?? "");
      const match = cap.match(/(\d+(\.\d+)?)/);
      return match ? Number(match[1]) >= 5 : true;
    });
  }

  if (input.handlePreference === "side") {
    results = results.filter((p) =>
      /braiser|stockpot|griddle/i.test(p.title + p.subcategory),
    );
  }
  if (input.handlePreference === "long") {
    results = results.filter((p) =>
      /fry|skillet|saucier|saucepan|sauté|saute|wok|butter/i.test(p.title),
    );
  }

  return results;
}
