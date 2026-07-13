import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProductBySlug, getRelatedProducts } from "@/data/products";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductCard } from "@/components/product/ProductCard";
import { storeConfig } from "@/data/store-config";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.seoTitle,
    description: product.seoDescription,
    openGraph: { title: product.seoTitle, description: product.seoDescription },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product);

  const jsonLd =
    product.productionReady && storeConfig.storeMode === "live"
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          sku: product.sku,
          description: product.seoDescription,
          offers: {
            "@type": "Offer",
            priceCurrency: product.currency,
            price: product.demoPrice,
            availability: "https://schema.org/InStock",
          },
        }
      : {
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          sku: product.sku,
          description: product.seoDescription,
        };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} />
      <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-6">
        <h2 className="mb-6 font-display text-2xl">Related tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
