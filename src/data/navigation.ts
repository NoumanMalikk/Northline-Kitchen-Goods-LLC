import { categories } from "./categories";
import { processStages } from "./process-stages";

export const primaryNav = [
  { label: "Cookware", href: "/collections/cookware", mega: "cookware" },
  { label: "Bakeware", href: "/collections/bake-roast", mega: "bake" },
  { label: "Prep Tools", href: "/collections/prep-tools", mega: "prep" },
  { label: "Utensils", href: "/collections/utensils", mega: "utensils" },
  { label: "Cutlery", href: "/collections/cutlery", mega: "cutlery" },
  { label: "Flatware", href: "/collections/flatware", mega: "flatware" },
  { label: "Shop by Process", href: "/process/prepare", mega: "process" },
  { label: "Metal Library", href: "/metal-construction-guide", mega: null },
] as const;

export const customerInfoLinks = [
  { label: "Metal and Construction Guide", href: "/metal-construction-guide" },
  { label: "Cookware Compatibility", href: "/cookware-compatibility" },
  { label: "Measurement Guide", href: "/measurement-guide" },
  { label: "Knife Use and Care", href: "/knife-use-care" },
  { label: "Cookware Use and Care", href: "/cookware-use-care" },
  { label: "Product Safety", href: "/product-safety" },
  { label: "Shipping", href: "/shipping-policy" },
  { label: "Returns", href: "/return-refund-policy" },
  { label: "Track Order", href: "/track-order" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Return & Refund Policy", href: "/return-refund-policy" },
  { label: "Accessibility", href: "/accessibility" },
] as const;

export const megaMenus = {
  cookware: {
    title: "Cookware",
    columns: categories.find((c) => c.id === "cookware")?.subcategories ?? [],
    featured: { label: "Shop all cookware", href: "/collections/cookware" },
  },
  bake: {
    title: "Bake and Roast",
    columns: categories.find((c) => c.id === "bake-roast")?.subcategories ?? [],
    featured: { label: "Shop bake & roast", href: "/collections/bake-roast" },
  },
  prep: {
    title: "Prepare",
    columns: categories.find((c) => c.id === "prep-tools")?.subcategories ?? [],
    featured: { label: "Shop prep tools", href: "/collections/prep-tools" },
  },
  utensils: {
    title: "Move and Turn",
    columns: categories.find((c) => c.id === "utensils")?.subcategories ?? [],
    featured: { label: "Shop utensils", href: "/collections/utensils" },
  },
  cutlery: {
    title: "Cut",
    columns: categories.find((c) => c.id === "cutlery")?.subcategories ?? [],
    featured: { label: "Shop cutlery", href: "/collections/cutlery" },
  },
  flatware: {
    title: "Serve",
    columns: categories.find((c) => c.id === "flatware")?.subcategories ?? [],
    featured: { label: "Shop flatware", href: "/collections/flatware" },
  },
  process: {
    title: "Shop by Process",
    columns: processStages.map((p) => ({
      name: p.name,
      slug: p.slug,
      href: p.href,
    })),
    featured: { label: "Technique Match Lab", href: "/technique-match" },
  },
} as const;

export const footerProductLinks = categories.map((c) => ({
  label: c.name,
  href: c.href,
}));

export const footerProcessLinks = processStages.map((p) => ({
  label: p.name,
  href: p.href,
}));
