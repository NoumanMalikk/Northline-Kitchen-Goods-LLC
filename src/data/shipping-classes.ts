import type { ShippingClassId } from "@/types/product";
import { products } from "./products";

export interface ShippingClass {
  id: ShippingClassId;
  name: string;
  description: string;
  demoBaseRate: number;
  notes: string;
}

export const shippingClasses: ShippingClass[] = [
  {
    id: "small-tool",
    name: "Small Tool",
    description: "Compact utensils and measuring tools.",
    demoBaseRate: 8,
    notes: "Demonstration rate only.",
  },
  {
    id: "standard-parcel",
    name: "Standard Parcel",
    description: "Standard boxed kitchen goods.",
    demoBaseRate: 12,
    notes: "Demonstration rate only.",
  },
  {
    id: "heavy-cookware",
    name: "Heavy Cookware",
    description: "Heavier single cookware vessels.",
    demoBaseRate: 18,
    notes: "Demonstration rate only.",
  },
  {
    id: "multi-piece-set",
    name: "Multi-Piece Set",
    description: "Sets with multiple coordinated pieces.",
    demoBaseRate: 20,
    notes: "Demonstration rate only.",
  },
  {
    id: "sharp-item",
    name: "Sharp Item",
    description: "Knives, shears, and mandolines requiring careful packing.",
    demoBaseRate: 14,
    notes: "Demonstration rate only. Sharp-item handling applies.",
  },
  {
    id: "oversized-cookware",
    name: "Oversized Cookware",
    description: "Large footprint cookware such as griddles.",
    demoBaseRate: 24,
    notes: "Demonstration rate only.",
  },
  {
    id: "fragile-lid",
    name: "Fragile Lid",
    description: "Cookware shipped with lids that need protective packing.",
    demoBaseRate: 19,
    notes: "Demonstration rate only.",
  },
  {
    id: "multi-box",
    name: "Multi-Box",
    description: "Orders that may ship in more than one carton.",
    demoBaseRate: 28,
    notes: "Demonstration rate only.",
  },
  {
    id: "shipping-review-required",
    name: "Shipping Review Required",
    description: "Items that require a shipping quote before fulfillment.",
    demoBaseRate: 0,
    notes: "No automatic rate. Request a shipping quote.",
  },
];

export function getShippingClass(id: ShippingClassId) {
  return shippingClasses.find((c) => c.id === id);
}

export function calculateDemoShipping(
  items: { productId: string; quantity: number }[],
  destinationState?: string,
): {
  amount: number;
  label: string;
  isDemonstration: true;
  requiresQuote: boolean;
  classes: string[];
} {
  let amount = 0;
  let requiresQuote = false;
  const classes = new Set<string>();

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) continue;
    const shipping = getShippingClass(product.shippingClass);
    if (!shipping) continue;
    classes.add(shipping.name);
    if (shipping.id === "shipping-review-required") {
      requiresQuote = true;
      continue;
    }
    amount += shipping.demoBaseRate * item.quantity;
  }

  if (destinationState === "AK" || destinationState === "HI") {
    amount += 15;
  }

  return {
    amount: requiresQuote && amount === 0 ? 0 : amount,
    label: requiresQuote
      ? "Shipping review required"
      : "Estimated shipping",
    isDemonstration: true,
    requiresQuote,
    classes: Array.from(classes),
  };
}
