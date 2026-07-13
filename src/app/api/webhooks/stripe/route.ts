import { getOrderByReference, updateOrder } from "@/lib/orders";
import { getStripe, isStripeConfigured } from "@/lib/stripe";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { storeConfig } from "@/data/store-config";

export async function POST(req: Request) {
  if (!isStripeConfigured()) {
    return Response.json({ error: "Stripe is not configured." }, { status: 503 });
  }

  const stripe = getStripe();
  const signature = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!signature || !secret) {
    return Response.json({ error: "Webhook not configured." }, { status: 400 });
  }

  const payload = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, secret);
  } catch {
    return Response.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const reference = session.metadata?.orderReference;
    if (reference) {
      const existing = getOrderByReference(reference);
      if (existing && existing.paymentStatus !== "paid") {
        const updated = updateOrder(reference, {
          paymentStatus: "paid",
          fulfilmentStatus: "Payment confirmed",
          paymentProviderReference: session.id,
          webhookConfirmed: true,
        });
        if (updated && storeConfig.storeMode !== "demo" && !updated.confirmationEmailSent) {
          await sendOrderConfirmationEmail(updated);
          updateOrder(reference, { confirmationEmailSent: true });
        }
      }
    }
  }

  return Response.json({ received: true });
}
