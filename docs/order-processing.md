# Order processing

Orders are created server-side with non-guessable references. Payment confirmation requires Stripe webhook verification. Do not mark success from query parameters alone. Fulfilment statuses must match stored values only.
