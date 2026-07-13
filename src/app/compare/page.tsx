import type { Metadata } from "next";
import { ComparePage } from "@/components/compare/ComparePage";
export const metadata: Metadata = { title: "Compare Products" };
export default function Page() { return <ComparePage />; }
