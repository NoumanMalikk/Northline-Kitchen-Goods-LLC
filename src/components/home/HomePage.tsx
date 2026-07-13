import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { getFeaturedProducts, products } from "@/data/products";
import { cookingMotions } from "@/data/techniques";
import { materialLibrary } from "@/data/compatibility";
import { processStages } from "@/data/process-stages";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { TechniqueMatchPreview } from "@/components/home/TechniqueMatchPreview";
import { KitchenFlowPreview } from "@/components/home/KitchenFlowPreview";

const vesselIndex = [
  {
    name: "Fry pan",
    diameter: "10 in",
    capacity: "Verification required",
    wall: "Low wall",
    technique: "Sear / saute",
    href: "/products/northline-low-wall-fry-pan-10-inch",
    image: "/products/northline-low-wall-fry-pan-10-inch/main.webp",
  },
  {
    name: "Deep skillet",
    diameter: "12 in",
    capacity: "Verification required",
    wall: "Deep wall",
    technique: "One-pan",
    href: "/products/northline-deep-skillet-with-lid-12-inch",
    image: "/products/northline-deep-skillet-with-lid-12-inch/main.webp",
  },
  {
    name: "Saucier",
    diameter: "Verification required",
    capacity: "3 qt",
    wall: "Rounded",
    technique: "Reduce / whisk",
    href: "/products/northline-rounded-saucier-with-lid-3-quart",
    image: "/products/northline-rounded-saucier-with-lid-3-quart/main.webp",
  },
  {
    name: "Saucepan",
    diameter: "Verification required",
    capacity: "2 qt",
    wall: "Straight + dual spout",
    technique: "Simmer / pour",
    href: "/products/northline-dual-spout-saucepan-with-lid-2-quart",
    image: "/products/northline-dual-spout-saucepan-with-lid-2-quart/main.webp",
  },
  {
    name: "Saute pan",
    diameter: "Verification required",
    capacity: "5 qt",
    wall: "Straight wide",
    technique: "Saute / braise",
    href: "/products/northline-wide-saute-pan-with-lid-5-quart",
    image: "/products/northline-wide-saute-pan-with-lid-5-quart/main.webp",
  },
  {
    name: "Stockpot",
    diameter: "Verification required",
    capacity: "8 qt",
    wall: "Tall",
    technique: "Boil / drain",
    href: "/products/northline-stockpot-pasta-insert-lid-8-quart",
    image: "/products/northline-stockpot-pasta-insert-lid-8-quart/main.webp",
  },
  {
    name: "Braiser",
    diameter: "Verification required",
    capacity: "6 qt",
    wall: "Low wide",
    technique: "Braise / roast",
    href: "/products/northline-low-braiser-with-lid-6-quart",
    image: "/products/northline-low-braiser-with-lid-6-quart/main.webp",
  },
  {
    name: "Wok",
    diameter: "12.5 in",
    capacity: "Verification required",
    wall: "Curved",
    technique: "Stir-fry",
    href: "/products/northline-curved-carbon-steel-wok-12-5-inch",
    image: "/products/northline-curved-carbon-steel-wok-12-5-inch/main.webp",
  },
  {
    name: "Griddle",
    diameter: "18 x 10 in",
    capacity: "N/A",
    wall: "Flat reversible",
    technique: "Griddle",
    href: "/products/northline-reversible-carbon-steel-griddle-18x10",
    image: "/products/northline-reversible-carbon-steel-griddle-18x10/main.webp",
  },
];

const heroSkus = [
  "NKG-PRP-015",
  "NKG-CUT-024",
  "NKG-CWK-003",
  "NKG-UTN-020",
  "NKG-PRP-016",
  "NKG-UTN-021",
  "NKG-FLT-026",
];

const edgeDetails = [
  "Flared rim",
  "Straight wall",
  "Rounded saucier wall",
  "Helper handle",
  "Loop handle",
  "Hollow or solid handle",
  "Riveted or welded handle",
  "Pour spout",
  "Rolled edge",
];

export function HomePage() {
  const featured = getFeaturedProducts();
  const heroProducts = heroSkus
    .map((sku) => products.find((p) => p.sku === sku))
    .filter(Boolean);
  const cutPrep = products.filter((p) =>
    ["NKG-CUT-024", "NKG-CUT-025", "NKG-PRP-018", "NKG-PRP-019", "NKG-UTN-023", "NKG-PRP-015"].includes(p.sku),
  );
  const drainFinish = products.filter((p) =>
    ["NKG-CWK-006", "NKG-PRP-016", "NKG-PRP-017", "NKG-UTN-021"].includes(p.sku),
  );
  const flatware = products.find((p) => p.sku === "NKG-FLT-026");

  return (
    <>
      {/* Process-line hero */}
      <section className="relative overflow-hidden border-b border-border-alloy">
        <div className="absolute inset-0 metal-grid opacity-40" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2 lg:items-center lg:px-6 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-tempered-blue">
              Metal kitchen goods from prep to plate
            </p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-foundry-ink sm:text-5xl lg:text-6xl">
              Every tool has a place in the process.
            </h1>
            <p className="mt-5 max-w-xl text-base text-northline-steel sm:text-lg">
              Explore cookware, preparation tools, utensils, cutlery and flatware organized around how food moves through the kitchen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/shop">Shop Kitchen Goods</ButtonLink>
              <ButtonLink href="/process/prepare" variant="secondary">
                Follow the Cooking Process
              </ButtonLink>
            </div>
            <p className="mt-5 max-w-lg text-xs text-graphite">
              Materials, dimensions, compatibility and safety details must match verified product records.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-0 right-0 top-1/2 measurement-line" aria-hidden />
            <ol className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {heroProducts.map((product, i) =>
                product ? (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="group block border border-border-alloy bg-clean-white transition-transform duration-300 hover:-translate-y-1 focus-ring"
                    >
                      <div className="relative aspect-square bg-parchment p-3">
                        <Image
                          src={product.imageGallery[0]?.src ?? ""}
                          alt={product.title}
                          fill
                          sizes="160px"
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="border-t border-border-alloy p-3">
                        <p className="spec-mono text-[10px] text-brass-marker">{String(i + 1).padStart(2, "0")}</p>
                        <p className="mt-1 line-clamp-2 min-h-10 text-sm font-medium">{product.title}</p>
                        <p className="mt-1 text-[11px] capitalize text-tempered-blue">
                          {product.processStages.slice(0, 2).join(" / ")}
                        </p>
                      </div>
                    </Link>
                  </li>
                ) : null,
              )}
            </ol>
          </div>
        </div>
      </section>

      {/* Shop by cooking motion */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <div className="mb-8 max-w-2xl">
          <h2 className="font-display text-3xl text-foundry-ink">How does the tool move?</h2>
          <p className="mt-3 text-northline-steel">
            Navigate by cooking motion rather than warehouse categories.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cookingMotions.map((motion) => (
            <Link
              key={motion.id}
              href={motion.href}
              className="group overflow-hidden border border-border-alloy bg-clean-white transition-all duration-300 hover:-translate-y-0.5 hover:border-tempered-blue hover:shadow-md focus-ring"
            >
              <div className="relative aspect-[4/3] bg-parchment">
                <Image
                  src={motion.image}
                  alt={motion.imageAlt}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-clean-white to-transparent" aria-hidden />
              </div>
              <div className="border-t border-border-alloy p-5">
                <p className="spec-mono text-[10px] uppercase tracking-wider text-tempered-blue">Cooking motion</p>
                <h3 className="mt-1 font-display text-xl text-foundry-ink">{motion.title}</h3>
                <p className="mt-2 text-sm text-northline-steel">{motion.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Vessel silhouette index */}
      <section className="border-y border-border-alloy bg-clean-white">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
          <div className="mb-8 max-w-2xl">
            <h2 className="font-display text-3xl">Vessel silhouette index</h2>
            <p className="mt-3 text-northline-steel">
              Cookware shapes from the active catalog. Only verified dimensions are shown as confirmed values.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vesselIndex.map((v) => (
              <Link
                key={v.name}
                href={v.href}
                className="group flex gap-4 border border-border-alloy bg-parchment/40 p-3 transition-all duration-300 hover:border-tempered-blue hover:bg-parchment focus-ring"
              >
                <div className="relative h-24 w-28 shrink-0 overflow-hidden border border-border-alloy bg-clean-white">
                  <Image
                    src={v.image}
                    alt={`${v.name} catalog photograph`}
                    fill
                    sizes="112px"
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0 flex-1 self-center">
                  <p className="font-display text-lg text-foundry-ink">{v.name}</p>
                  <p className="spec-mono mt-1 text-xs text-northline-steel">
                    Dia. {v.diameter}
                  </p>
                  <p className="spec-mono text-xs text-northline-steel">
                    Cap. {v.capacity}
                  </p>
                  <p className="mt-2 text-xs text-graphite">
                    {v.wall} | {v.technique}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl">Featured kitchen tools</h2>
            <p className="mt-2 text-northline-steel">A balanced mix across cookware, prep, utensils, cutlery, and flatware.</p>
          </div>
          <ButtonLink href="/shop" variant="secondary" className="hidden sm:inline-flex">
            Shop all
          </ButtonLink>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Metal library */}
      <section className="border-y border-border-alloy bg-foundry-ink text-clean-white">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
          <h2 className="font-display text-3xl">Know what the tool is made from.</h2>
          <p className="mt-3 max-w-2xl text-brushed-silver">
            Material categories help orientation. Product-specific composition, finish, and compatibility are never invented.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {materialLibrary.map((m) => (
              <div key={m.id} className="border border-white/15 bg-white/5 p-5">
                <h3 className="font-display text-xl">{m.name}</h3>
                <dl className="mt-4 space-y-2 text-sm text-brushed-silver">
                  <div><dt className="text-xs uppercase tracking-wider text-warm-tin">Composition</dt><dd>{m.composition}</dd></div>
                  <div><dt className="text-xs uppercase tracking-wider text-warm-tin">Maintenance</dt><dd>{m.maintenance}</dd></div>
                  <div><dt className="text-xs uppercase tracking-wider text-warm-tin">Compatibility</dt><dd>{m.compatibility}</dd></div>
                </dl>
                {m.productSkus.length > 0 && (
                  <p className="spec-mono mt-3 text-xs text-brass-marker">{m.productSkus.join(" · ")}</p>
                )}
              </div>
            ))}
          </div>
          <ButtonLink href="/metal-construction-guide" variant="secondary" className="mt-8 border-clean-white text-clean-white hover:bg-clean-white hover:text-foundry-ink">
            Open metal & construction guide
          </ButtonLink>
        </div>
      </section>

      {/* Technique match */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <TechniqueMatchPreview />
      </section>

      {/* Edge, rim, handle */}
      <section className="border-y border-border-alloy bg-clean-white">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
          <h2 className="font-display text-3xl">Small details change how a tool works.</h2>
          <p className="mt-3 max-w-2xl text-northline-steel">
            Rim, wall, and handle geometry matter. Construction details appear only when verified for the exact product.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {edgeDetails.map((detail) => (
              <li key={detail} className="flex items-center gap-3 border border-border-alloy px-4 py-3">
                <span className="h-2 w-2 rounded-full bg-furnace-clay" aria-hidden />
                <span className="text-sm">{detail}</span>
                <span className="ml-auto text-[10px] uppercase tracking-wider text-graphite">Verify per SKU</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Kitchen flow builder */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <KitchenFlowPreview />
      </section>

      {/* Stack profile */}
      <section className="border-y border-border-alloy bg-parchment">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-3xl">Stack profile</h2>
              <p className="mt-3 text-northline-steel">
                Nesting, lid storage, cabinet footprint, and hanging compatibility are shown only after verification. Products are not claimed to stack securely unless tested.
              </p>
              <ButtonLink href="/stack-profile" className="mt-6">
                Review stack profiles
              </ButtonLink>
            </div>
            <div className="flex items-end justify-center gap-3 py-8" aria-hidden>
              {[72, 96, 120, 84].map((h, i) => (
                <div key={i} className="w-16 border border-foundry-ink bg-clean-white" style={{ height: h }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cut and prepare */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <h2 className="font-display text-3xl">Cut and prepare</h2>
        <p className="mt-3 max-w-2xl text-northline-steel">
          Knives, shears, mandolines, scrapers, and measuring tools with exact safety and dimension fields when verified.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cutPrep.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Drain, strain, finish */}
      <section className="border-y border-border-alloy bg-clean-white">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
          <h2 className="font-display text-3xl">Drain, strain, and finish</h2>
          <p className="mt-3 max-w-2xl text-northline-steel">
            Pasta inserts, colanders, chinois sets, and serving tools. Visual drainage cues are editorial, not performance claims.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {drainFinish.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Table line */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl">The final line from kitchen to table.</h2>
            <p className="mt-3 text-northline-steel">
              Flatware place-setting structure, piece names, and set counts  - without unverified restaurant-grade or dishwasher claims.
            </p>
            {flatware && (
              <ul className="mt-6 space-y-2 text-sm">
                {flatware.packageContents.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="text-brass-marker">•</span> {c}
                  </li>
                ))}
              </ul>
            )}
            <ButtonLink href="/collections/flatware" className="mt-6">
              Shop flatware
            </ButtonLink>
          </div>
          {flatware && <ProductCard product={flatware} />}
        </div>
      </section>

      {/* Spec band */}
      <section className="border-y border-border-alloy bg-tempered-blue text-clean-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-6">
          <div>
            <h2 className="font-display text-3xl">Measure the product, not the photograph.</h2>
            <p className="mt-3 max-w-2xl text-warm-tin">
              Review diameter, capacity, handle length, total footprint, package contents and compatibility before ordering.
            </p>
          </div>
          <ButtonLink href="/measurement-guide" variant="secondary" className="border-clean-white text-clean-white hover:bg-clean-white hover:text-tempered-blue">
            Open the Measurement Guide
          </ButtonLink>
        </div>
      </section>

      {/* How ordering works */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <h2 className="font-display text-3xl">How ordering works</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            "Choose the tool or cooking process",
            "Review verified dimensions and construction",
            "Select the exact size or finish",
            "Review shipping, tax and payment securely",
          ].map((step, i) => (
            <li key={step} className="border border-border-alloy bg-clean-white p-5">
              <p className="spec-mono text-brass-marker">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-3 font-display text-lg">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Process strip */}
      <section className="border-y border-border-alloy bg-clean-white">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {processStages.map((stage, i) => (
              <Link
                key={stage.slug}
                href={stage.href}
                className="flex min-w-28 shrink-0 flex-col border border-border-alloy px-3 py-3 text-center hover:border-tempered-blue focus-ring"
              >
                <span className="spec-mono text-[10px] text-brass-marker">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-1 text-sm font-medium">{stage.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <div className="border border-border-alloy bg-clean-white p-8 lg:p-12">
          <h2 className="font-display text-3xl">Receive catalog and product-guide updates.</h2>
          <p className="mt-3 max-w-xl text-northline-steel">
            No discount promises. Consent is never prechecked. See the privacy policy for how contact details are handled.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
