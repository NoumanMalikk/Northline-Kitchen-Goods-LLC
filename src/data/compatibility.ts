import { products } from "./products";
import type { Product } from "@/types/product";

export const cooktopTypes = [
  { id: "gas", label: "Gas" },
  { id: "electric-coil", label: "Electric coil" },
  { id: "smooth-electric", label: "Smooth electric" },
  { id: "induction", label: "Induction" },
  { id: "oven", label: "Oven" },
  { id: "broiler", label: "Broiler" },
] as const;

export function getCompatibilityStatus(
  product: Product,
  cooktop: (typeof cooktopTypes)[number]["id"],
): string {
  switch (cooktop) {
    case "induction":
      return String(product.inductionCompatibility ?? "Verification required");
    case "oven":
      return product.ovenSafeTemperature
        ? String(product.ovenSafeTemperature)
        : "Verification required";
    case "broiler":
      return String(product.broilerCompatibility ?? "Verification required");
    case "gas":
    case "electric-coil":
    case "smooth-electric":
      if (Array.isArray(product.stovetopCompatibility)) {
        return product.stovetopCompatibility.join(", ");
      }
      return String(product.stovetopCompatibility ?? "Verification required");
    default:
      return "Verification required";
  }
}

export function buildCompatibilityMatrix() {
  return products
    .filter((p) => p.category === "Cookware" || p.category === "Specialty Cookware")
    .map((product) => ({
      id: product.id,
      title: product.title,
      sku: product.sku,
      slug: product.slug,
      values: Object.fromEntries(
        cooktopTypes.map((type) => [type.id, getCompatibilityStatus(product, type.id)]),
      ),
    }));
}

export const materialLibrary = [
  {
    id: "stainless-steel",
    name: "Stainless steel",
    composition: "Verification required for each SKU",
    surfaceFinish: "Pending product-specific documentation",
    maintenance: "Follow verified care instructions for the exact product",
    compatibility: "Do not assume induction or dishwasher status without verification",
    typicalWeight: "Pending physical product inspection",
    productSkus: [] as string[],
  },
  {
    id: "carbon-steel",
    name: "Carbon steel",
    composition: "Verification required for each SKU",
    surfaceFinish: "Pending product-specific documentation",
    maintenance: "Seasoning requirements must be verified per product",
    compatibility: "Cooktop compatibility must be verified per product",
    typicalWeight: "Pending physical product inspection",
    productSkus: ["NKG-CWK-008", "NKG-CWK-009"],
  },
  {
    id: "aluminum",
    name: "Aluminum",
    composition: "Verification required for each SKU",
    surfaceFinish: "Pending product-specific documentation",
    maintenance: "Follow verified care instructions for the exact product",
    compatibility: "Do not assume cooktop compatibility without verification",
    typicalWeight: "Pending physical product inspection",
    productSkus: [] as string[],
  },
  {
    id: "cast-iron",
    name: "Cast iron",
    composition: "Verification required for each SKU",
    surfaceFinish: "Pending product-specific documentation",
    maintenance: "Seasoning and care must be verified per product",
    compatibility: "Cooktop and oven details must be verified per product",
    typicalWeight: "Pending physical product inspection",
    productSkus: [] as string[],
  },
  {
    id: "mixed-metal",
    name: "Mixed-metal construction",
    composition: "Layer count and core materials require verification",
    surfaceFinish: "Interior and exterior finishes require verification",
    maintenance: "Follow verified care instructions for the exact product",
    compatibility: "Compatibility cannot be inferred from appearance",
    typicalWeight: "Pending physical product inspection",
    productSkus: [] as string[],
  },
];
