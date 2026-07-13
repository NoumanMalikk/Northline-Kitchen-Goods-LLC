import type { StoredOrder } from "@/lib/orders";
import { storeConfig } from "@/data/store-config";

export async function sendOrderConfirmationEmail(order: StoredOrder) {
  if (storeConfig.storeMode === "demo") {
    return { skipped: true, reason: "Demo mode does not send production emails." };
  }
  if (!process.env.RESEND_API_KEY || !storeConfig.contactEmail) {
    return { skipped: true, reason: "Email provider or CONTACT_EMAIL not configured." };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  const items = order.products
    .map(
      (p) =>
        `<li>${p.title} (${p.sku}) — ${p.size} — qty ${p.quantity} — $${p.lineTotal.toFixed(2)}</li>`,
    )
    .join("");

  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "Northline Kitchen Goods <orders@northline.local>",
    to: order.customer.email,
    subject: `Order ${order.reference} confirmation`,
    html: `
      <div style="font-family:sans-serif;color:#1F292D">
        <img src="${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/brand/logo-horizontal.svg" alt="Northline Kitchen Goods" width="200" />
        <h1>Order confirmation</h1>
        <p>Hi ${order.customer.firstName},</p>
        <p>Reference: <strong>${order.reference}</strong></p>
        <ul>${items}</ul>
        <p>Subtotal: $${order.subtotal.toFixed(2)}<br/>
        Shipping: $${order.shipping.toFixed(2)} (${order.shippingLabel})<br/>
        Tax: $${order.tax.toFixed(2)}<br/>
        Total: $${order.total.toFixed(2)}</p>
        <p>Ship to: ${order.shippingAddress.line1}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}</p>
        <p>Support phone: ${storeConfig.phoneDisplay}</p>
        <p>Track your order at /track-order using your reference and email.</p>
        ${order.sharpNotice ? "<p>This order includes sharp tools. Review knife and product safety guidance before use.</p>" : ""}
      </div>
    `,
  });

  return { sent: true };
}
