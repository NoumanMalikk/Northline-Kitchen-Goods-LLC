import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function isPendingValue(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value !== "string") return false;
  return (
    value === "Verification required" ||
    value === "Pending supplier documentation" ||
    value === "Pending manufacturing specification" ||
    value === "Pending physical product inspection"
  );
}

export function displaySpec(value: unknown, fallback = "Verification required.") {
  if (value === null || value === undefined) return fallback;
  if (Array.isArray(value)) {
    if (value.length === 0) return fallback;
    return value.join(", ");
  }
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}
