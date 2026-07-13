import { products } from "./products";

export const imageCredits = products.map((product) => ({
  productId: product.id,
  sku: product.sku,
  exactSize: product.sizeLabel,
  exactCapacity: product.capacity === null ? "Not applicable" : String(product.capacity),
  exactFinish: "Studio visual  - physical finish pending verification",
  exactPieceCount: product.packageContents.length,
  exactPackageContents: product.packageContents,
  sourceOrganization: "Northline development product photography set",
  sourceUrlOrReference: `/products/${product.slug}/main.webp`,
  permissionBasis: "Original studio-style catalog imagery created for Northline Kitchen Goods LLC storefront development",
  dateObtained: "2026-07-13",
  dateVerified: null as string | null,
  verifiedBy: null as string | null,
  productionStatus: "pending-physical-match" as const,
  notes:
    "Clean white-background product visual matched to catalog title and package concept. Replace with verified photography of actual inventory SKUs before marking imageVerificationStatus verified and productionReady true.",
}));
