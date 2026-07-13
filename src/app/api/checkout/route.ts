import { z } from "zod";
import { canPurchaseProduct } from "@/data/product-safety";
import { storeConfig } from "@/data/store-config";
import { buildOrderReference, validateCartItem } from "@/lib/cart-math";
import { createOrder, type StoredOrder } from "@/lib/orders";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { hasLegalPlaceholders } from "@/data/legal-config";

const cartItemSchema = z.object({
  productId: z.string(),
  sku: z.string(),
  quantity: z.number().int().min(1).max(99),
  selectedFinish: z.string().optional(),
  selectedSize: z.string().optional(),
});

const checkoutSchema = z.object({
  items: z.array(cartItemSchema).min(1),
  customer: z.object({
    email: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phone: z.string().optional(),
    company: z.string().optional(),
    po: z.string().optional(),
    line1: z.string().min(1),
    line2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().min(1),
    billingSame: z.boolean(),
    billingLine1: z.string().optional(),
    billingCity: z.string().optional(),
    billingState: z.string().optional(),
    billingPostalCode: z.string().optional(),
    terms: z.boolean(),
    privacy: z.boolean(),
    sizesReviewed: z.boolean(),
    compatibilityReviewed: z.boolean().optional(),
    sharpReviewed: z.boolean().optional(),
    marketing: z.boolean().optional(),
  }),
  shipping: z.object({
    amount: z.number(),
    label: z.string(),
    isDemonstration: z.boolean(),
    requiresQuote: z.boolean(),
  }),
  subtotal: z.number(),
  tax: z.number(),
  total: z.number(),
});

export async function POST(req: Request) {
  try {
    const body = checkoutSchema.parse(await req.json());

    if (storeConfig.storeMode === "live" && hasLegalPlaceholders()) {
      return Response.json(
        { error: "Live checkout blocked until legal policies are approved." },
        { status: 400 },
      );
    }

    const lineItems = [];
    let sharpNotice = false;

    for (const item of body.items) {
      const validation = validateCartItem(item);
      if (!validation.valid || !validation.product) {
        return Response.json(
          { error: validation.errors.join(" ") || "Invalid cart item" },
          { status: 400 },
        );
      }
      const product = validation.product;
      const purchase = canPurchaseProduct(product, storeConfig.storeMode);
      if (storeConfig.storeMode === "live" && !purchase.allowed) {
        return Response.json({ error: purchase.reason }, { status: 400 });
      }
      if (product.demoPrice * item.quantity < 0) {
        return Response.json({ error: "Invalid price" }, { status: 400 });
      }
      if (product.sharpItem) sharpNotice = true;

      lineItems.push({
        productId: product.id,
        sku: product.sku,
        supplierSku: String(product.supplierSku),
        title: product.title,
        size: product.sizeLabel,
        capacity: product.capacity,
        finish: item.selectedFinish ?? product.colorways[0] ?? "Verification required",
        pieceCount: product.packageContents.length,
        packageContents: product.packageContents,
        quantity: item.quantity,
        unitPrice: product.demoPrice,
        lineTotal: product.demoPrice * item.quantity,
        shippingClass: product.shippingClass,
        packageWeight: product.packageWeight,
        packageDimensions: product.packageDimensions,
        safetyVerificationStatus: product.safetyVerificationStatus,
        sharpItem: product.sharpItem,
      });
    }

    if (body.shipping.requiresQuote) {
      return Response.json(
        { error: "One or more items require a shipping quote before checkout." },
        { status: 400 },
      );
    }

    const reference = buildOrderReference();
    const order: StoredOrder = {
      reference,
      paymentProviderReference: null,
      customer: {
        email: body.customer.email,
        firstName: body.customer.firstName,
        lastName: body.customer.lastName,
        phone: body.customer.phone ?? null,
        company: body.customer.company ?? null,
      },
      shippingAddress: {
        line1: body.customer.line1,
        line2: body.customer.line2 ?? null,
        city: body.customer.city,
        state: body.customer.state,
        postalCode: body.customer.postalCode,
        country: body.customer.country,
      },
      billingAddress: body.customer.billingSame
        ? {
            line1: body.customer.line1,
            line2: body.customer.line2 ?? null,
            city: body.customer.city,
            state: body.customer.state,
            postalCode: body.customer.postalCode,
            country: body.customer.country,
          }
        : {
            line1: body.customer.billingLine1 ?? "",
            line2: null,
            city: body.customer.billingCity ?? "",
            state: body.customer.billingState ?? "",
            postalCode: body.customer.billingPostalCode ?? "",
            country: body.customer.country,
          },
      products: lineItems,
      subtotal: body.subtotal,
      shipping: body.shipping.amount,
      shippingLabel: body.shipping.label,
      tax: body.tax,
      total: body.total,
      paymentStatus: "pending",
      fulfilmentStatus: "Order received",
      sharpNotice,
      storeMode: storeConfig.storeMode,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      webhookConfirmed: false,
    };

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    if (isStripeConfigured()) {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.create(
        {
          mode: "payment",
          customer_email: body.customer.email,
          line_items: lineItems.map((item) => ({
            quantity: item.quantity,
            price_data: {
              currency: "usd",
              unit_amount: Math.round(item.unitPrice * 100),
              product_data: {
                name: item.title,
                metadata: { sku: item.sku },
              },
            },
          })),
          shipping_options: [
            {
              shipping_rate_data: {
                type: "fixed_amount",
                fixed_amount: {
                  amount: Math.round(body.shipping.amount * 100),
                  currency: "usd",
                },
                display_name: body.shipping.label,
              },
            },
          ],
          success_url: `${siteUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${siteUrl}/checkout`,
          metadata: {
            orderReference: reference,
            storeMode: storeConfig.storeMode,
          },
          payment_intent_data: {
            metadata: { orderReference: reference },
          },
        },
        { idempotencyKey: `checkout-${reference}` },
      );

      order.paymentProviderReference = session.id;
      createOrder(order);

      return Response.json({ url: session.url, reference });
    }

    // Demo fallback without Stripe keys: create a pending demo order that still requires verification path
    order.paymentStatus = "demo_pending_verification";
    order.paymentProviderReference = `demo_${reference}`;
    order.webhookConfirmed = false;
    createOrder(order);

    return Response.json({
      demoSuccessUrl: `${siteUrl}/order/success?order=${encodeURIComponent(reference)}&demo=1`,
      reference,
      warning:
        "Stripe is not configured. Demo order created for UI testing only and is not a paid production order.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    return Response.json({ error: message }, { status: 400 });
  }
}
