import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/product/CatalogBrowser";
import { products } from "@/data/products";
import { collectionFilters } from "@/data/categories";

const key = "saute-pans-braisers";
const meta = collectionFilters[key];

export const metadata: Metadata = {
  title: meta?.title ?? "saute-pans-braisers",
  description: meta?.description,
};

export default function Page() {
  const filter = collectionFilters[key];
  const list = products.filter((p) => filter.match(p.category, p.subcategory, p.sku));
  return (
    <CatalogBrowser
      products={list}
      title={filter.title}
      description={filter.description}
    />
  );
}
