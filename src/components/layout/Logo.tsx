import Link from "next/link";
import { cn } from "@/lib/utils";

function MonogramMark({
  className,
  theme = "dark",
}: {
  className?: string;
  theme?: "dark" | "light";
}) {
  const ink = theme === "light" ? "#FFFFFF" : "#1F292D";
  const line = theme === "light" ? "#AAB3B5" : "#416B78";

  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("h-9 w-9 shrink-0 sm:h-10 sm:w-10", className)}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="60" height="60" rx="4" fill={theme === "light" ? "none" : "#1F292D"} stroke={ink} strokeWidth="2" />
      <path
        d="M16 46 V16 H22 L36 38 V16 H42 V46 H36 L22 24 V46 Z"
        fill={theme === "light" ? "#FFFFFF" : "#F4F0E7"}
      />
      <path
        d="M45 18 L53 32 L45 46"
        fill="none"
        stroke="#B85F42"
        strokeWidth="2.8"
        strokeLinecap="square"
      />
      <line x1="14" y1="50" x2="50" y2="50" stroke={line} strokeWidth="2.5" />
      <line x1="50" y1="50" x2="54" y2="50" stroke="#B88A45" strokeWidth="2.5" />
    </svg>
  );
}

export function Logo({
  variant = "horizontal",
  className,
  theme = "dark",
  showWordmark = true,
}: {
  variant?: "horizontal" | "stacked" | "monogram" | "stamp";
  className?: string;
  priority?: boolean;
  theme?: "dark" | "light";
  showWordmark?: boolean;
}) {
  const ink = theme === "light" ? "text-clean-white" : "text-foundry-ink";
  const sub = theme === "light" ? "text-brushed-silver" : "text-northline-steel";
  const line = theme === "light" ? "bg-brushed-silver" : "bg-tempered-blue";

  if (variant === "monogram") {
    return (
      <Link
        href="/"
        className={cn("inline-flex items-center focus-ring", className)}
        aria-label="Northline Kitchen Goods home"
      >
        <MonogramMark theme={theme} />
      </Link>
    );
  }

  if (variant === "stacked") {
    return (
      <Link
        href="/"
        className={cn("inline-flex flex-col items-center gap-2 focus-ring", className)}
        aria-label="Northline Kitchen Goods home"
      >
        <MonogramMark theme={theme} />
        <span className={cn("text-center font-display text-lg font-bold tracking-[0.18em]", ink)}>
          NORTHLINE
        </span>
        <span className={cn("text-[10px] font-semibold tracking-[0.28em]", sub)}>
          KITCHEN GOODS
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-3 focus-ring", className)}
      aria-label="Northline Kitchen Goods home"
    >
      <MonogramMark theme={theme} />
      {showWordmark && (
        <span className="flex min-w-0 flex-col leading-none">
          <span className={cn("font-display text-base font-bold tracking-[0.16em] sm:text-lg", ink)}>
            NORTHLINE
          </span>
          <span className={cn("mt-1 h-0.5 w-full", line)} aria-hidden />
          <span className={cn("mt-1 text-[9px] font-semibold tracking-[0.24em] sm:text-[10px]", sub)}>
            KITCHEN GOODS
          </span>
        </span>
      )}
    </Link>
  );
}
