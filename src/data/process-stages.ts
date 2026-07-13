import type { ProcessStage } from "@/types/product";

export interface ProcessStageInfo {
  id: ProcessStage;
  slug: string;
  name: string;
  title: string;
  description: string;
  href: string;
  productSkus: string[];
}

export const processStages: ProcessStageInfo[] = [
  {
    id: "prepare",
    slug: "prepare",
    name: "Prepare",
    title: "Prepare",
    description: "Mixing bowls, mandolines, bench scrapers, and prep shears.",
    href: "/process/prepare",
    productSkus: ["NKG-PRP-015", "NKG-PRP-016", "NKG-PRP-018", "NKG-PRP-019", "NKG-CUT-025"],
  },
  {
    id: "measure",
    slug: "measure",
    name: "Measure",
    title: "Measure",
    description: "Measured scrapers and precision measuring spoons.",
    href: "/process/measure",
    productSkus: ["NKG-PRP-019", "NKG-UTN-023"],
  },
  {
    id: "cut",
    slug: "cut",
    name: "Cut",
    title: "Cut",
    description: "Chef knives, shears, and slicing tools.",
    href: "/process/cut",
    productSkus: ["NKG-PRP-018", "NKG-CUT-024", "NKG-CUT-025"],
  },
  {
    id: "heat",
    slug: "heat",
    name: "Heat",
    title: "Heat",
    description: "Cookware vessels for sear, simmer, boil, braise, and stir-fry.",
    href: "/process/heat",
    productSkus: [
      "NKG-CWK-001",
      "NKG-CWK-002",
      "NKG-CWK-003",
      "NKG-CWK-004",
      "NKG-CWK-005",
      "NKG-CWK-006",
      "NKG-CWK-007",
      "NKG-CWK-008",
      "NKG-CWK-009",
      "NKG-CWK-010",
    ],
  },
  {
    id: "turn",
    slug: "turn",
    name: "Turn",
    title: "Turn",
    description: "Fry pans, griddles, turners, and tongs for lift-and-turn motion.",
    href: "/process/turn",
    productSkus: ["NKG-CWK-001", "NKG-CWK-002", "NKG-CWK-009", "NKG-UTN-020", "NKG-UTN-022"],
  },
  {
    id: "stir",
    slug: "stir",
    name: "Stir",
    title: "Stir",
    description: "Sauciers, sauté pans, woks, and sauce utensils.",
    href: "/process/stir",
    productSkus: ["NKG-CWK-003", "NKG-CWK-005", "NKG-CWK-008", "NKG-UTN-021"],
  },
  {
    id: "drain",
    slug: "drain",
    name: "Drain",
    title: "Drain",
    description: "Pasta inserts, colanders, and fine-mesh chinois sets.",
    href: "/process/drain",
    productSkus: ["NKG-CWK-006", "NKG-PRP-016", "NKG-PRP-017"],
  },
  {
    id: "roast",
    slug: "roast",
    name: "Roast",
    title: "Roast",
    description: "Braisers, roasting pans, sheet pans, and pizza crispers.",
    href: "/process/roast",
    productSkus: ["NKG-CWK-007", "NKG-BKE-011", "NKG-BKE-012", "NKG-BKE-013", "NKG-BKE-014"],
  },
  {
    id: "plate",
    slug: "plate",
    name: "Plate",
    title: "Plate",
    description: "Turners, serving utensils, and flatware for plating.",
    href: "/process/plate",
    productSkus: ["NKG-UTN-020", "NKG-UTN-021", "NKG-FLT-026"],
  },
  {
    id: "serve",
    slug: "serve",
    name: "Serve",
    title: "Serve",
    description: "Braisers, tongs, sauce utensils, and flatware.",
    href: "/process/serve",
    productSkus: ["NKG-CWK-007", "NKG-UTN-021", "NKG-UTN-022", "NKG-FLT-026"],
  },
  {
    id: "store",
    slug: "store",
    name: "Store",
    title: "Store",
    description:
      "Storage mapping appears only when nesting, hanging, or footprint data is verified.",
    href: "/process/store",
    productSkus: ["NKG-PRP-016"],
  },
  {
    id: "maintain",
    slug: "maintain",
    name: "Maintain",
    title: "Maintain",
    description:
      "Care guidance is product-specific and published only from verified documentation.",
    href: "/process/maintain",
    productSkus: [],
  },
];

export function getProcessStage(slug: string) {
  return processStages.find((p) => p.slug === slug);
}
