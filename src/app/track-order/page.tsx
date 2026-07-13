import type { Metadata } from "next";
import { TrackOrderPage } from "@/components/checkout/TrackOrderPage";
export const metadata: Metadata = { title: "Track Order", robots: { index: false } };
export default function Page() { return <TrackOrderPage />; }
