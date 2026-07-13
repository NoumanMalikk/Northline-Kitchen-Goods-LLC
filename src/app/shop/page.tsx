import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/product/CatalogBrowser";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop Kitchen Goods",
  description: "Browse the full Northline Kitchen Goods catalog.",
};

export default function Page() {
  return (
    <CatalogBrowser
      products={products}
      title="Shop kitchen goods"
      description="Cookware, bakeware, prep tools, utensils, cutlery, and flatware organized around the cooking process."
    />
  );
}
