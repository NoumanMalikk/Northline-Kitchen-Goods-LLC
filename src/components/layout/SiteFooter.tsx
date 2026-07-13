import Link from "next/link";
import { Logo } from "./Logo";
import { storeConfig } from "@/data/store-config";
import {
  customerInfoLinks,
  footerProcessLinks,
  footerProductLinks,
  legalLinks,
} from "@/data/navigation";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const email = storeConfig.contactEmail;
  const social = storeConfig.social;

  return (
    <footer className="mt-20 border-t border-border-alloy bg-foundry-ink text-clean-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Logo variant="horizontal" theme="light" />
          <p className="mt-4 max-w-sm text-sm text-brushed-silver">{storeConfig.tagline}</p>
          <Link
            href="/"
            className="mt-4 inline-flex min-h-11 items-center rounded-sm border border-white/25 px-4 py-2 text-sm font-semibold text-clean-white hover:bg-white/10 focus-ring"
          >
            Home
          </Link>
          <p className="mt-3 text-sm text-brushed-silver">{storeConfig.publicLocationLabel}</p>
          {storeConfig.showFullBusinessAddress && (
            <p className="mt-1 text-sm text-brushed-silver">
              {storeConfig.registeredAddress.line1}, {storeConfig.registeredAddress.city},{" "}
              {storeConfig.registeredAddress.state} {storeConfig.registeredAddress.postalCode}
            </p>
          )}
          <p className="mt-3 text-sm">
            <a href={`tel:${storeConfig.phoneE164}`} className="hover:text-warm-tin focus-ring">
              {storeConfig.phoneDisplay}
            </a>
          </p>
          {email && (
            <p className="mt-1 text-sm">
              <a href={`mailto:${email}`} className="hover:text-warm-tin focus-ring">
                {email}
              </a>
            </p>
          )}
          <div className="mt-4 flex gap-3 text-sm text-brushed-silver">
            {social.instagram && (
              <a href={social.instagram} className="hover:text-clean-white focus-ring">
                Instagram
              </a>
            )}
            {social.facebook && (
              <a href={social.facebook} className="hover:text-clean-white focus-ring">
                Facebook
              </a>
            )}
            {social.pinterest && (
              <a href={social.pinterest} className="hover:text-clean-white focus-ring">
                Pinterest
              </a>
            )}
          </div>
        </div>

        <div>
          <h2 className="font-display text-sm tracking-wide">Products</h2>
          <ul className="mt-4 space-y-2 text-sm text-brushed-silver">
            {footerProductLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-clean-white focus-ring">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm tracking-wide">Cooking process</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-brushed-silver">
            {footerProcessLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-clean-white focus-ring">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm tracking-wide">Customer information</h2>
          <ul className="mt-4 space-y-2 text-sm text-brushed-silver">
            {customerInfoLinks.slice(0, 8).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-clean-white focus-ring">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-brushed-silver sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {year} {storeConfig.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-4">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-clean-white focus-ring">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
