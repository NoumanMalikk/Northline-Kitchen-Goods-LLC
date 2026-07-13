export type VerificationStatus =
  | "pending"
  | "verified"
  | "missing"
  | "incomplete";

export type ProcessStage =
  | "prepare"
  | "measure"
  | "cut"
  | "heat"
  | "turn"
  | "stir"
  | "drain"
  | "roast"
  | "plate"
  | "serve"
  | "store"
  | "maintain"
  | "mix"
  | "pour"
  | "braise"
  | "toss"
  | "lift"
  | "bake"
  | "cool"
  | "finish"
  | "slice"
  | "divide"
  | "portion";

export type Technique =
  | "sear"
  | "saute"
  | "pan-fry"
  | "shallow-fry"
  | "one-pan"
  | "reduce"
  | "whisk"
  | "simmer"
  | "sauce"
  | "shallow-braise"
  | "pan-roast"
  | "boil"
  | "steam"
  | "braise"
  | "roast"
  | "griddle"
  | "stir-fry"
  | "bake"
  | "slice"
  | "portion";

export type ShippingClassId =
  | "small-tool"
  | "standard-parcel"
  | "heavy-cookware"
  | "multi-piece-set"
  | "sharp-item"
  | "oversized-cookware"
  | "fragile-lid"
  | "multi-box"
  | "shipping-review-required";

export type ProductCategory =
  | "Cookware"
  | "Specialty Cookware"
  | "Bake and Roast"
  | "Prep Tools"
  | "Utensils"
  | "Measuring Tools"
  | "Cutlery"
  | "Flatware";

export type CompatibilityValue =
  | "Verification required"
  | "Pending supplier documentation"
  | "Pending manufacturing specification"
  | "Pending physical product inspection"
  | "Compatible"
  | "Not compatible"
  | "Not applicable"
  | null;

export type PendingText =
  | "Verification required"
  | "Pending supplier documentation"
  | "Pending manufacturing specification"
  | "Pending physical product inspection";

export interface PackageDimensions {
  length: number | PendingText | null;
  width: number | PendingText | null;
  height: number | PendingText | null;
  unit: "in" | "cm";
}

export interface ProductImage {
  src: string;
  alt: string;
  kind:
    | "main"
    | "top"
    | "side"
    | "bottom"
    | "handle"
    | "rim"
    | "lid"
    | "construction"
    | "dimensions"
    | "package"
    | "care"
    | "lifestyle"
    | "placeholder";
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  supplierSku: string | PendingText;
  title: string;
  category: ProductCategory;
  subcategory: string;
  processStages: ProcessStage[];
  techniques: Technique[];
  materials: string[];
  metalGrade: string | PendingText | null;
  construction: string | PendingText | null;
  layerCount: number | PendingText | null;
  interiorFinish: string | PendingText | null;
  exteriorFinish: string | PendingText | null;
  colorways: string[];
  diameter: string | number | null;
  capacity: string | number | null;
  width: string | number | null;
  height: string | number | null;
  depth: string | number | null;
  baseDiameter: string | number | null;
  handleLength: string | number | null;
  totalLength: string | number | null;
  weight: string | number | PendingText | null;
  packageDimensions: PackageDimensions | PendingText | null;
  packageWeight: string | number | PendingText | null;
  lidIncluded: boolean | null;
  packageContents: string[];
  stovetopCompatibility: CompatibilityValue | string[];
  inductionCompatibility: CompatibilityValue;
  ovenSafeTemperature: string | number | PendingText | null;
  broilerCompatibility: CompatibilityValue;
  dishwasherSafe: CompatibilityValue;
  foodContactDocumentation: PendingText | string | null;
  careInstructions: string | PendingText;
  seasoningRequired: boolean | PendingText | null;
  knifeBladeLength: string | number | null;
  knifeEdgeAngle: string | number | PendingText | null;
  knifeHardness: string | number | PendingText | null;
  flatwarePieceCount: number | null;
  countryOfOrigin: PendingText | null;
  manufacturer: PendingText | string | null;
  warnings: string[];
  demoPrice: number;
  currency: "USD";
  imageGallery: ProductImage[];
  imageSourceRecord: string;
  imageVerificationStatus: VerificationStatus;
  specificationVerificationStatus: VerificationStatus;
  safetyVerificationStatus: VerificationStatus;
  productionReady: boolean;
  featured: boolean;
  newArrival: boolean;
  relatedProductIds: string[];
  crossSellProductIds: string[];
  comparisonFields: string[];
  searchKeywords: string[];
  seoTitle: string;
  seoDescription: string;
  shippingClass: ShippingClassId;
  sharpItem: boolean;
  fragileLid: boolean;
  shortDescription: string;
  sizeLabel: string;
  materialLabel: string;
}

export interface CartItem {
  productId: string;
  sku: string;
  quantity: number;
  selectedFinish?: string;
  selectedSize?: string;
}

export interface WishlistItem {
  productId: string;
  sku: string;
  selectedFinish?: string;
  selectedSize?: string;
  addedAt: string;
}
