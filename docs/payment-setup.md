# Payment setup

1. Create a Stripe account.
2. Add test secret and publishable keys for demo mode.
3. Configure webhook endpoint `/api/webhooks/stripe` for `checkout.session.completed`.
4. Verify signature with `STRIPE_WEBHOOK_SECRET`.
5. Enable live mode only after product, shipping, tax, email, and policy checks pass.

Card data is never collected through ordinary form inputs.
