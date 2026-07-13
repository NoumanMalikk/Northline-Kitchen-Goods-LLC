import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/product/CatalogBrowser";
import { getProcessStage } from "@/data/process-stages";
import { getProductBySku } from "@/data/products";
import { notFound } from "next/navigation";
import type { Product } from "@/types/product";

export const metadata: Metadata = {
  title: "Process: Roast",
  description: "Kitchen tools organized by cooking process stage.",
};

export default function Page() {
  const stage = getProcessStage("roast");
  if (!stage) notFound();
  const list: Product[] = (stage.productSkus.map(getProductBySku).filter(Boolean) as Product[]);
  return (
    <CatalogBrowser
      products={list}
      title={stage.title}
      description={stage.description}
    />
  );
}
