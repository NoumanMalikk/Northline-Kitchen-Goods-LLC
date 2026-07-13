export const storeConfig = {
  legalName: "Northline Kitchen Goods LLC",
  brandName: "Northline Kitchen Goods",
  ownerName: "Mason James Cavanagh",
  showOwnerNamePublicly: false,
  phoneDisplay: "+1 (505) 689-4064",
  phoneE164: "+15056894064",
  registeredAddress: {
    line1: "218 SW 6th St",
    city: "Galva",
    state: "IL",
    postalCode: "61434",
    country: "United States",
  },
  publicLocationLabel: "Galva, Illinois",
  showFullBusinessAddress: false,
  isPublicStorefront: false,
  isPublicFactory: false,
  localPickupEnabled: false,
  localDeliveryEnabled: false,
  sharpeningServiceEnabled: false,
  repairServiceEnabled: false,
  contactEmail: process.env.CONTACT_EMAIL ?? null,
  currency: "USD" as const,
  defaultCountry: "United States",
  storeMode: (process.env.NEXT_PUBLIC_STORE_MODE ?? "demo") as "demo" | "live",
  tagline: "Metal tools for the full cooking process.",
  brandConcept: "Follow the line from prep to plate.",
  social: {
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? null,
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK ?? null,
    pinterest: process.env.NEXT_PUBLIC_SOCIAL_PINTEREST ?? null,
  },
  announcementMessages: [
    "Cookware, tools, cutlery and flatware",
    "Dimensions and compatibility shown clearly",
    "Secure online checkout",
    "Exact specifications required before live purchase",
  ],
} as const;

export type StoreConfig = typeof storeConfig;

export function isDemoMode() {
  return storeConfig.storeMode !== "live";
}

export function isLiveMode() {
  return storeConfig.storeMode === "live";
}
