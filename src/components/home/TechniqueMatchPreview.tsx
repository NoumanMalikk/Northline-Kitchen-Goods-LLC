import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export function TechniqueMatchPreview() {
  return (
    <div className="grid gap-8 border border-border-alloy bg-clean-white p-8 lg:grid-cols-2 lg:p-12">
      <div>
        <h2 className="font-display text-3xl">Technique match lab</h2>
        <p className="mt-3 text-northline-steel">
          Answer a few questions about technique, portions, cooktop, and handle preference. Recommendations are based on configured product shape and capacity.
        </p>
        <p className="mt-4 text-xs text-graphite">
          Recommendations are based on configured product shape and capacity. Review the complete specifications before purchase. This is not professional culinary advice.
        </p>
        <ButtonLink href="/technique-match" className="mt-6">
          Open technique match
        </ButtonLink>
      </div>
      <ol className="space-y-3 text-sm">
        {[
          "What are you cooking?",
          "What technique are you using?",
          "How many portions?",
          "What cooktop do you use?",
          "One long handle or two side handles?",
          "What storage space is available?",
        ].map((q, i) => (
          <li key={q} className="flex gap-3 border-b border-border-alloy pb-3">
            <span className="spec-mono text-tempered-blue">{String(i + 1).padStart(2, "0")}</span>
            <span>{q}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function KitchenFlowPreview() {
  const slots = ["Prep vessel", "Cutting tool", "Cooking vessel", "Turning tool", "Draining tool", "Serving tool"];
  return (
    <div className="border border-border-alloy bg-clean-white p-8 lg:p-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="font-display text-3xl">Kitchen flow builder</h2>
          <p className="mt-3 max-w-2xl text-northline-steel">
            Build a prep-to-serve workflow with exact catalog items. Each product adds separately to the cart — no fake bundle SKUs or invented savings.
          </p>
        </div>
        <ButtonLink href="/kitchen-flow-builder">Build a kitchen flow</ButtonLink>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {slots.map((slot, i) => (
          <div key={slot} className="border border-dashed border-border-alloy p-4 text-center">
            <p className="spec-mono text-[10px] text-brass-marker">{String(i + 1).padStart(2, "0")}</p>
            <p className="mt-2 text-sm font-medium">{slot}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-graphite">
        Or start from{" "}
        <Link href="/kitchen-flow-builder" className="text-tempered-blue underline focus-ring">
          the full builder
        </Link>
        .
      </p>
    </div>
  );
}
