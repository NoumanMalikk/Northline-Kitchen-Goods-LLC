import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  variant = "horizontal",
  className,
  priority = false,
  theme = "dark",
}: {
  variant?: "horizontal" | "stacked" | "monogram" | "stamp";
  className?: string;
  priority?: boolean;
  theme?: "dark" | "light";
}) {
  const sources = {
    horizontal: {
      src:
        theme === "light"
          ? "/brand/logo-horizontal-light.svg"
          : "/brand/logo-horizontal.svg",
      width: 200,
      height: 35,
    },
    stacked: { src: "/brand/logo-stacked.svg", width: 140, height: 84 },
    monogram: {
      src: theme === "light" ? "/brand/logo-monogram-light.svg" : "/brand/logo-monogram.svg",
      width: 40,
      height: 40,
    },
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
        className="h-auto w-auto max-h-10 sm:max-h-11"
      />
    </Link>
  );
}
