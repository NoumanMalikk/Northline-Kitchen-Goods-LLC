import type { Metadata } from "next";
import { storeConfig } from "@/data/store-config";

export const metadata: Metadata = { title: "About" };

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 lg:px-6">
      <h1 className="font-display text-4xl">About {storeConfig.brandName}</h1>
      <p className="mt-6 text-lg leading-relaxed text-northline-steel">
        Northline Kitchen Goods LLC is a Galva, Illinois-based business operating in the metal kitchen-goods category. The online catalog is designed to help customers review cookware, preparation tools, utensils, cutlery and flatware through clear product dimensions, package contents and compatibility information. Product materials, construction, performance information and availability must always be based on current verified product records.
      </p>
      <p className="mt-4 text-sm text-graphite">
        Phone: {storeConfig.phoneDisplay}. The registered mailing address is not presented as a public store, showroom, or factory.
      </p>
    </div>
  );
}
