# Product editing

Products live in `src/data/products.ts`.

To add or update a product:

1. Add a complete product object with every required field.
2. Use `null` for non-applicable fields.
3. Use verification placeholders for unknown values.
4. Map `processStages` and `techniques`.
5. Assign `shippingClass`, `sharpItem`, and `fragileLid`.
6. Add placeholder or verified images under `public/products/[slug]/`.
7. Update `src/data/image-credits.ts` records.
8. Keep `productionReady: false` until image, specification, and safety verification are complete.
9. Live checkout blocks incomplete products automatically.
