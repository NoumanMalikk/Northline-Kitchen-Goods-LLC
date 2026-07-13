import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { processStages } from "@/data/process-stages";

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/shop",
    "/search",
    "/about",
    "/contact",
    "/faq",
    "/wishlist",
    "/compare",
    "/technique-match",
    "/kitchen-flow-builder",
    "/stack-profile",
    "/request-a-quote",
    "/metal-construction-guide",
    "/cookware-compatibility",
    "/measurement-guide",
    "/knife-use-care",
    "/cookware-use-care",
    "/product-safety",
    "/shipping-policy",
    "/return-refund-policy",
    "/privacy-policy",
    "/terms-conditions",
    "/accessibility",
    "/collections/cookware",
    "/collections/fry-pans-skillets",
    "/collections/saucepans-sauciers",
    "/collections/saute-pans-braisers",
    "/collections/stockpots-inserts",
    "/collections/woks-griddles",
    "/collections/bake-roast",
    "/collections/prep-tools",
    "/collections/utensils",
    "/collections/cutlery",
    "/collections/flatware",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${site}${path}`,
      lastModified: new Date(),
    })),
    ...processStages.map((p) => ({
      url: `${site}${p.href}`,
      lastModified: new Date(),
    })),
    ...products.map((p) => ({
      url: `${site}/products/${p.slug}`,
      lastModified: new Date(),
    })),
  ];
}
