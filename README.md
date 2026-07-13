# Northline Kitchen Goods LLC

Customer-facing e-commerce storefront for metal kitchen goods  - cookware, bakeware, prep tools, utensils, cutlery, and flatware  - organized around the cooking process.

## Brand

**Metal tools for the full cooking process.**

Follow the line from prep to plate.

## Stack

Next.js App Router, TypeScript, Tailwind CSS, Zustand, Zod, Stripe, Vitest, Playwright.

## Quick start

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Scripts

- `npm run dev`  - local development
- `npm run build`  - production build
- `npm run typecheck`  - TypeScript
- `npm run lint`  - ESLint
- `npm run test`  - unit tests
- `npm run test:e2e`  - Playwright
- `npm run qa`  - typecheck + lint + unit tests + build

## Important constraints

- Exactly 26 initial products, all `productionReady: false`
- No invented manufacturing, warranty, or safety claims
- Registered address is not a public store or factory
- Email displays only when `CONTACT_EMAIL` is set
- Live checkout blocks incomplete products

See `/docs` for setup, verification, and launch documentation.
