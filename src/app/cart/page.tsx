import type { Metadata } from "next";
import { CartPage } from "@/components/cart/CartPage";
export const metadata: Metadata = { title: "Cart", robots: { index: false, follow: false } };
export default function Page() { return <CartPage />; }
