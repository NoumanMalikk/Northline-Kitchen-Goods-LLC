import type { Metadata } from "next";
import { WishlistPage } from "@/components/product/WishlistPage";
export const metadata: Metadata = { title: "Wishlist", robots: { index: false } };
export default function Page() { return <WishlistPage />; }
