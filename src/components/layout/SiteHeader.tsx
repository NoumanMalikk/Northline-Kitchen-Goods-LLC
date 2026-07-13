"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Heart,
  Home,
  Menu,
  Search,
  ShoppingBag,
  Columns2,
  X,
  Phone,
} from "lucide-react";
import { Logo } from "./Logo";
import { primaryNav, megaMenus, customerInfoLinks, legalLinks } from "@/data/navigation";
import { storeConfig } from "@/data/store-config";
import { useCartStore, useCompareStore, useUiStore, useWishlistStore } from "@/stores";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const { openCart, itemCount } = useCartStore();
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const compareCount = useCompareStore((s) => s.productIds.length);
  const { mobileMenuOpen, setMobileMenuOpen, setSearchOpen } = useUiStore();
  const count = itemCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMega(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setMobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border-alloy bg-parchment/95 shadow-sm backdrop-blur"
          : "bg-parchment/80 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:gap-4 lg:px-6">
        <button
          type="button"
          className="rounded-sm p-2 lg:hidden focus-ring"
          aria-label="Open menu"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>

        <Logo priority className="shrink-0" />

        <Link
          href="/"
          className={cn(
            "inline-flex items-center gap-1.5 rounded-sm px-2.5 py-2 text-sm font-semibold focus-ring",
            pathname === "/"
              ? "bg-foundry-ink text-clean-white"
              : "text-foundry-ink hover:bg-warm-tin/50 hover:text-tempered-blue",
          )}
        >
          <Home className="h-4 w-4" aria-hidden />
          Home
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex" aria-label="Primary">
          {primaryNav
            .filter((item) => item.href !== "/")
            .map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.mega && setOpenMega(item.mega)}
              onMouseLeave={() => setOpenMega(null)}
            >
              <Link
                href={item.href}
                className="rounded-sm px-2.5 py-2 text-sm font-medium text-foundry-ink hover:text-tempered-blue focus-ring"
                aria-expanded={item.mega ? openMega === item.mega : undefined}
                onFocus={() => item.mega && setOpenMega(item.mega)}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            className="rounded-sm p-2 focus-ring"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </button>
          <Link href="/wishlist" className="relative rounded-sm p-2 focus-ring" aria-label="Wishlist">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-furnace-clay px-1 text-[10px] text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/compare" className="relative rounded-sm p-2 focus-ring" aria-label="Compare">
            <Columns2 className="h-5 w-5" />
            {compareCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-tempered-blue px-1 text-[10px] text-white">
                {compareCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="relative rounded-sm p-2 focus-ring"
            aria-label="Cart"
            onClick={openCart}
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-foundry-ink px-1 text-[10px] text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {openMega && megaMenus[openMega as keyof typeof megaMenus] && (
        <div
          ref={megaRef}
          className="absolute inset-x-0 top-full hidden border-b border-border-alloy bg-clean-white shadow-lg xl:block"
          onMouseEnter={() => setOpenMega(openMega)}
          onMouseLeave={() => setOpenMega(null)}
        >
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-4 font-display text-lg text-foundry-ink">
                {megaMenus[openMega as keyof typeof megaMenus].title}
              </p>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {megaMenus[openMega as keyof typeof megaMenus].columns.map((col) => (
                  <li key={col.href}>
                    <Link
                      href={col.href}
                      className="block rounded-sm border border-transparent px-3 py-2 text-sm hover:border-border-alloy hover:bg-parchment focus-ring"
                      onClick={() => setOpenMega(null)}
                    >
                      {col.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex min-w-56 flex-col justify-between border-l border-border-alloy pl-8">
              <p className="text-sm text-northline-steel">
                Materials, dimensions, and compatibility are shown from verified product records only.
              </p>
              <Link
                href={megaMenus[openMega as keyof typeof megaMenus].featured.href}
                className="mt-4 text-sm font-semibold text-tempered-blue underline-offset-4 hover:underline focus-ring"
                onClick={() => setOpenMega(null)}
              >
                {megaMenus[openMega as keyof typeof megaMenus].featured.label}
              </Link>
            </div>
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile menu">
          <button
            type="button"
            className="absolute inset-0 bg-foundry-ink/50"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(100%,24rem)] flex-col bg-parchment shadow-xl">
            <div className="flex items-center justify-between border-b border-border-alloy px-4 py-3">
              <Logo variant="monogram" />
              <button
                type="button"
                className="rounded-sm p-2 focus-ring"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <Link
                href="/"
                className="mb-3 flex min-h-11 w-full items-center gap-2 rounded-sm bg-foundry-ink px-3 py-3 text-sm font-semibold text-clean-white focus-ring"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="h-4 w-4" aria-hidden />
                Home
              </Link>
              <button
                type="button"
                className="mb-4 flex w-full items-center gap-2 rounded-sm border border-border-alloy bg-clean-white px-3 py-3 text-left text-sm focus-ring"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
              >
                <Search className="h-4 w-4" /> Search products
              </button>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-tempered-blue">
                Shop by process
              </p>
              <ul className="mb-6 grid grid-cols-2 gap-2">
                {megaMenus.process.columns.map((p) => (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      className="block rounded-sm bg-clean-white px-3 py-2 text-sm focus-ring"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-tempered-blue">
                Categories
              </p>
              <ul className="mb-6 space-y-1">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-sm px-2 py-2.5 text-sm font-medium focus-ring"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mb-6 flex gap-2">
                <Link href="/wishlist" className="flex-1 rounded-sm border border-border-alloy px-3 py-2 text-center text-sm focus-ring" onClick={() => setMobileMenuOpen(false)}>Wishlist</Link>
                <Link href="/compare" className="flex-1 rounded-sm border border-border-alloy px-3 py-2 text-center text-sm focus-ring" onClick={() => setMobileMenuOpen(false)}>Compare</Link>
                <Link href="/cart" className="flex-1 rounded-sm border border-border-alloy px-3 py-2 text-center text-sm focus-ring" onClick={() => setMobileMenuOpen(false)}>Cart</Link>
              </div>
              <a href={`tel:${storeConfig.phoneE164}`} className="mb-4 flex items-center gap-2 text-sm focus-ring">
                <Phone className="h-4 w-4" /> {storeConfig.phoneDisplay}
              </a>
              <ul className="space-y-1 border-t border-border-alloy pt-4">
                {customerInfoLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="block py-2 text-sm text-northline-steel focus-ring" onClick={() => setMobileMenuOpen(false)}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 space-y-1 border-t border-border-alloy pt-4">
                {legalLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="block py-2 text-xs text-graphite focus-ring" onClick={() => setMobileMenuOpen(false)}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
