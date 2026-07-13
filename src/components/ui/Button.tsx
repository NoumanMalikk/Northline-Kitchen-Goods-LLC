import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tempered-blue disabled:opacity-50 disabled:pointer-events-none min-h-11";

const variants = {
  primary: "bg-foundry-ink text-clean-white hover:bg-northline-steel",
  secondary:
    "border border-foundry-ink bg-transparent text-foundry-ink hover:bg-foundry-ink hover:text-clean-white",
  ghost: "text-foundry-ink hover:bg-warm-tin/60",
  accent: "bg-furnace-clay text-clean-white hover:brightness-95",
  technical: "bg-tempered-blue text-clean-white hover:brightness-95",
} as const;

type Variant = keyof typeof variants;

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

export function ButtonLink({
  className,
  variant = "primary",
  href,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; variant?: Variant }) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)} {...props} />
  );
}
