"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { searchProducts } from "@/data/products";
import { CatalogBrowser } from "@/components/product/CatalogBrowser";

export function SearchPage() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const results = useMemo(() => searchProducts(q), [q]);

  return (
    <CatalogBrowser
      products={results}
      title={q ? `Search: ${q}` : "Search"}
      description={q ? `${results.length} products matched your query.` : "Enter a query from the search overlay or ?q= parameter."}
    />
  );
}
