export const legalConfig = {
  privacyPolicy: `[BUSINESS REVIEW REQUIRED: insert approved policy]

Northline Kitchen Goods LLC respects customer privacy. This page will publish the approved privacy policy covering data collected through contact forms, checkout, order tracking, and newsletter signup. Until business review is complete, treat this text as a placeholder only.`,
  termsConditions: `[BUSINESS REVIEW REQUIRED: insert approved policy]

These terms will govern use of the Northline Kitchen Goods LLC website and online purchases. Final commercial terms, liability language, and purchase conditions require business and legal review before production launch.`,
  shippingPolicy: `[BUSINESS REVIEW REQUIRED: insert approved policy]

Shipping methods, timelines, carrier selection, sharp-item packing rules, and destination restrictions must be approved before live fulfillment. Demonstration shipping rates shown in the storefront are not live carrier quotes.`,
  returnRefundPolicy: `[BUSINESS REVIEW REQUIRED: insert approved policy]

Return windows, refund methods, restocking rules, and sharp-item return conditions must be approved before production launch. Do not treat placeholder language as an active return offer.`,
  accessibilityStatement: `Northline Kitchen Goods LLC aims to make this website usable in accordance with WCAG 2.2 AA guidance. If you encounter an accessibility barrier, contact us by phone at +1 (505) 689-4064 so we can improve the experience.

[BUSINESS REVIEW REQUIRED: insert approved policy for formal accessibility commitments and response process.]`,
  placeholdersRemaining: true,
  launchBlockedWhilePlaceholdersRemain: true,
};

export function hasLegalPlaceholders() {
  return (
    legalConfig.privacyPolicy.includes("[BUSINESS REVIEW REQUIRED") ||
    legalConfig.termsConditions.includes("[BUSINESS REVIEW REQUIRED") ||
    legalConfig.shippingPolicy.includes("[BUSINESS REVIEW REQUIRED") ||
    legalConfig.returnRefundPolicy.includes("[BUSINESS REVIEW REQUIRED")
  );
}
