import type { Metadata } from "next";
import { CompatibilityMatrix } from "@/components/product/CompatibilityMatrix";
export const metadata: Metadata = { title: "Cookware Compatibility" };
export default function Page() { return <CompatibilityMatrix />; }
