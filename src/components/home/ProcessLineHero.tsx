import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { products } from "@/data/products";

const processLine = [
  { sku: "NKG-PRP-015", stage: "Prepare" },
  { sku: "NKG-CUT-024", stage: "Cut" },
  { sku: "NKG-CWK-003", stage: "Heat" },
  { sku: "NKG-UTN-020", stage: "Turn" },
  { sku: "NKG-PRP-017", stage: "Drain" },
  { sku: "NKG-FLT-026", stage: "Serve" },
] as const;

export function ProcessLineHero() {
  const items = processLine
    .map((entry) => {
      const product = products.find((p) => p.sku === entry.sku);
      if (!product) return null;
      return { ...entry, product };
    })
    .filter(Boolean) as Array<{
    sku: string;
    stage: string;
    product: (typeof products)[number];
  }>;

  return (
    <section className="relative overflow-hidden border-b border-border-alloy">
      <div
        className="absolute inset-0 bg-[linear-gradient(160deg,#F4F0E7_0%,#EDE8DC_42%,#D7D4CC_100%)]"
        aria-hidden
      />
      <div className="absolute inset-0 metal-grid opacity-[0.28]" aria-hidden />
      <div
        className="absolute -right-24 top-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(65,107,120,0.14),transparent_68%)]"
        aria-hidden
      />
      <div
        className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(184,95,66,0.1),transparent_70%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:pb-20 lg:pt-16">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-2xl lg:text-left">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-tempered-blue sm:text-sm">
            Northline Kitchen Goods
          </p>
          <div className="mx-auto mt-3 h-px w-24 bg-brass-marker lg:mx-0" aria-hidden />
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-northline-steel">
            Metal kitchen goods from prep to plate
          </p>
          <h1 className="mt-4 font-display text-[2.4rem] leading-[1.05] tracking-tight text-foundry-ink sm:text-5xl lg:text-[3.75rem]">
            Every tool has a place in the process.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-northline-steel sm:text-lg lg:mx-0">
            Explore cookware, preparation tools, utensils, cutlery and flatware organized around how food moves through the kitchen.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <ButtonLink href="/shop">Shop Kitchen Goods</ButtonLink>
            <ButtonLink href="/process/prepare" variant="secondary">
              Follow the Cooking Process
            </ButtonLink>
          </div>
          <p className="mt-5 text-xs text-graphite">
            Materials, dimensions, compatibility and safety details must match verified product records.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-16">
          <div className="pointer-events-none absolute inset-x-0 top-[42%] hidden h-px bg-gradient-to-r from-transparent via-tempered-blue/70 to-transparent sm:block" aria-hidden />
          <div className="pointer-events-none absolute inset-x-[8%] top-[42%] hidden h-px bg-brass-marker/50 sm:block" aria-hidden />

          <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
            {items.map((item, index) => (
              <li key={item.sku} className="relative">
                <Link
                  href={`/products/${item.product.slug}`}
                  className="group flex flex-col items-center text-center focus-ring"
                >
                  <span className="spec-mono mb-3 text-[10px] tracking-[0.18em] text-brass-marker">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="relative mb-4 aspect-square w-full max-w-[9.5rem] transition-transform duration-500 group-hover:-translate-y-1">
                    <Image
                      src={item.product.imageGallery[0]?.src ?? ""}
                      alt={item.product.title}
                      fill
                      priority={index < 2}
                      sizes="(max-width:1024px) 40vw, 150px"
                      className="object-contain drop-shadow-[0_12px_24px_rgba(31,41,45,0.12)]"
                    />
                  </div>
                  <span className="relative z-10 mb-2 hidden h-2.5 w-2.5 rounded-full border border-foundry-ink bg-clean-white sm:block" aria-hidden />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-tempered-blue">
                    {item.stage}
                  </span>
                  <span className="mt-1 line-clamp-2 max-w-[9.5rem] text-xs text-northline-steel">
                    {item.product.title.replace(/^Northline\s+/, "")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
