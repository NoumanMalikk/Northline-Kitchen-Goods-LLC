import { z } from "zod";
import { getOrderByReference, getOrderBySession, updateOrder } from "@/lib/orders";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

const trackSchema = z.object({
  email: z.string().email(),
  reference: z.string().min(6),
});

const rateLimit = new Map<string, { count: number; reset: number }>();

function limited(key: string, max = 10, windowMs = 60_000) {
  const now = Date.now();
  const entry = rateLimit.get(key);
  if (!entry || entry.reset < now) {
    rateLimit.set(key, { count: 1, reset: now + windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > max;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");
  const orderRef = searchParams.get("order");
  const demo = searchParams.get("demo");

  if (sessionId && isStripeConfigured()) {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return Response.json({ error: "Payment not verified." }, { status: 400 });
    }
    const reference = session.metadata?.orderReference;
    let order = reference ? getOrderByReference(reference) : getOrderBySession(sessionId);
    if (order && !order.webhookConfirmed) {
      order =
        updateOrder(order.reference, {
          paymentStatus: "paid",
          fulfilmentStatus: "Payment confirmed",
          paymentProviderReference: sessionId,
          webhookConfirmed: true,
        }) ?? order;
    }
    if (!order) {
      return Response.json({ error: "Order not found for verified session." }, { status: 404 });
    }
    return Response.json({
      order: {
        reference: order.reference,
        email: order.customer.email,
        total: order.total,
        status: order.fulfilmentStatus,
        items: order.products.map((p) => ({
          title: p.title,
          sku: p.sku,
          quantity: p.quantity,
        })),
        sharpNotice: order.sharpNotice,
      },
    });
  }

  if (orderRef) {
    const order = getOrderByReference(orderRef);
    if (!order) {
      return Response.json({ error: "Order not found." }, { status: 404 });
    }
    // Demo path: only expose when explicitly demo and not claiming production payment
    if (demo === "1" && order.storeMode === "demo") {
      return Response.json({
        order: {
          reference: order.reference,
          email: order.customer.email,
          total: order.total,
          status: order.fulfilmentStatus,
          items: order.products.map((p) => ({
            title: p.title,
            sku: p.sku,
            quantity: p.quantity,
          })),
          sharpNotice: order.sharpNotice,
        },
      });
    }
    if (order.webhookConfirmed && order.paymentStatus === "paid") {
      return Response.json({
        order: {
          reference: order.reference,
          email: order.customer.email,
          total: order.total,
          status: order.fulfilmentStatus,
          items: order.products.map((p) => ({
            title: p.title,
            sku: p.sku,
            quantity: p.quantity,
          })),
          sharpNotice: order.sharpNotice,
        },
      });
    }
    return Response.json(
      { error: "Order payment has not been verified." },
      { status: 400 },
    );
  }

  return Response.json({ error: "Missing session_id or order reference." }, { status: 400 });
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  if (limited(`track:${ip}`)) {
    return Response.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  try {
    const body = trackSchema.parse(await req.json());
    const order = getOrderByReference(body.reference);
    if (!order || order.customer.email.toLowerCase() !== body.email.toLowerCase()) {
      return Response.json({ error: "No matching order found." }, { status: 404 });
    }
    return Response.json({
      order: {
        reference: order.reference,
        fulfilmentStatus: order.fulfilmentStatus,
        paymentStatus: order.paymentStatus,
        updatedAt: order.updatedAt,
      },
    });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Invalid request" },
      { status: 400 },
    );
  }
}
