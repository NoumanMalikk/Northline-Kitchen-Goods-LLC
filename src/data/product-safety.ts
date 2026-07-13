import type { Product } from "@/types/product";

export function requiresSafetyDocumentation(product: Product): boolean {
  return product.sharpItem || product.sku === "NKG-PRP-018";
}

export function isSafetyReady(product: Product): boolean {
  if (!requiresSafetyDocumentation(product)) {
    return product.safetyVerificationStatus === "verified";
  }
  return (
    product.safetyVerificationStatus === "verified" &&
    product.warnings.length > 0 &&
    Boolean(product.careInstructions) &&
    product.careInstructions !== "Pending supplier documentation" &&
    product.careInstructions !== "Verification required"
  );
}

export function canPurchaseProduct(
  product: Product,
  storeMode: "demo" | "live",
): { allowed: boolean; reason?: string } {
  if (storeMode === "demo") {
    return {
      allowed: true,
      reason: "Demonstration mode  - incomplete products may be explored but are labeled as demo.",
    };
  }

  if (!product.productionReady) {
    return { allowed: false, reason: "Product is not marked production ready." };
  }
  if (product.imageVerificationStatus !== "verified") {
    return { allowed: false, reason: "Exact product image is not verified." };
  }
  if (product.specificationVerificationStatus !== "verified") {
    return { allowed: false, reason: "Specifications are not verified." };
  }
  if (!isSafetyReady(product)) {
    return { allowed: false, reason: "Required safety documentation is incomplete." };
  }
  return { allowed: true };
}

export const safetyTopics = [
  {
    id: "sharp-edges",
    title: "Sharp edges",
    body: "Knives, shears, mandolines, and some scrapers present blade hazards. Review product warnings before use.",
  },
  {
    id: "mandoline",
    title: "Mandoline hazards",
    body: "Always use the supplied hand guard. Do not operate without safety accessories. Store with blades secured according to verified manufacturer instructions.",
  },
  {
    id: "hot-handles",
    title: "Hot handles and lids",
    body: "Handles and lids can become hot during cooking. Use appropriate protection and review steam hazards when removing lids.",
  },
  {
    id: "heavy-items",
    title: "Heavy-item handling",
    body: "Large cookware and multi-piece systems can be heavy when filled. Lift with stable footing and confirmed handle integrity.",
  },
  {
    id: "food-contact",
    title: "Food-contact documentation",
    body: "Food-contact status is published only when supplier or manufacturing documentation is verified for the exact SKU.",
  },
  {
    id: "recalls",
    title: "Recall status",
    body: "Recall monitoring must be maintained from manufacturer notices. No recall status is invented for catalog display.",
  },
];
