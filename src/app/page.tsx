import { HomePage } from "@/components/home/HomePage";
import { storeConfig } from "@/data/store-config";

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: storeConfig.legalName,
        telephone: storeConfig.phoneDisplay,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Galva",
          addressRegion: "IL",
          addressCountry: "US",
        },
      },
      {
        "@type": "WebSite",
        name: storeConfig.brandName,
        description: storeConfig.tagline,
        potentialAction: {
          "@type": "SearchAction",
          target: "/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage />
    </>
  );
}
