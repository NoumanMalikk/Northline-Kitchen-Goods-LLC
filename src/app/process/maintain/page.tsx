import type { Metadata } from "next";
import { CatalogBrowser } from "@/components/product/CatalogBrowser";
import { getProcessStage } from "@/data/process-stages";
import { products } from "@/data/products";
import { notFound } from "next/navigation";
import type { Product } from "@/types/product";

export const metadata: Metadata = {
  title: "Process: Maintain",
  description: "Kitchen tools organized by cooking process stage.",
};

export default function Page() {
  const stage = getProcessStage("maintain");
  if (!stage) notFound();
  const list: Product[] = products;
  return (
    <CatalogBrowser
      products={list}
      title={stage.title}
      description={stage.description}
    />
  );
}
