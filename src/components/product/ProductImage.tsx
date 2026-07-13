import Image from "next/image";
import type { Product } from "@/types/product";

export function ProductImage({
  product,
  className = "",
  priority = false,
}: {
  product: Product;
  className?: string;
  priority?: boolean;
}) {
  const img = product.imageGallery[0];
  const hasImage =
    Boolean(img?.src) &&
    img.kind !== "placeholder" &&
    product.imageVerificationStatus !== "missing";

  if (!hasImage || !img) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-border-alloy bg-parchment text-center ${className}`}
        role="img"
        aria-label={`Exact product image required for ${product.title}`}
      >
        <div className="h-16 w-24 border border-northline-steel/40 bg-gradient-to-br from-warm-tin to-brushed-silver/40" />
        <p className="px-4 text-xs font-medium text-northline-steel">Exact product image required</p>
        <p className="spec-mono px-4 text-[10px] text-graphite">{product.sku}</p>
      </div>
    );
  }

  return (
    <Image
      src={img.src}
      alt={img.alt}
      fill
      priority={priority}
      sizes="(max-width:768px) 50vw, 25vw"
      className={`object-contain ${className}`}
    />
  );
}
