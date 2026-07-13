import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  variant = "horizontal",
  className,
  priority = false,
}: {
  variant?: "horizontal" | "stacked" | "monogram" | "stamp";
  className?: string;
  priority?: boolean;
}) {
  const sources = {
    horizontal: { src: "/brand/logo-horizontal.svg", width: 220, height: 33 },
    stacked: { src: "/brand/logo-stacked.svg", width: 160, height: 68 },
    monogram: { src: "/brand/logo-monogram.svg", width: 40, height: 40 },
    stamp: { src: "/brand/logo-stamp.svg", width: 280, height: 37 },
  } as const;
  const s = sources[variant];
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center focus-ring", className)}
      aria-label="Northline Kitchen Goods home"
    >
      <Image
        src={s.src}
        alt="Northline Kitchen Goods"
        width={s.width}
        height={s.height}
        priority={priority}
        className="h-auto w-auto"
      />
    </Link>
  );
}
