# Image sourcing

Every catalog image must match the exact product, size, capacity, finish, and package contents.

Priority:

1. Original Northline photography
2. Licensed supplier media
3. Approved manufacturer media
4. Authorized distributor media
5. Commissioned photography

Do not copy retailer or competitor images.

If an exact usable image is unavailable:

- Show “Exact product image required”
- Set `imageVerificationStatus: "missing"`
- Keep `productionReady: false`
- Block live checkout

## Current catalog imagery status

All 26 initial products include studio-style product photographs stored at:

`public/products/[product-slug]/main.webp`

These images:

- Use clean white professional backgrounds
- Are matched to each product title and package concept
- Contain no competitor branding or retailer watermarks
- Remain `imageVerificationStatus: "pending"` until matched to physical inventory
- Do **not** alone make a product `productionReady`

Before live purchase launch, replace or confirm each image against the exact received SKU, size, capacity, finish, and piece count.
