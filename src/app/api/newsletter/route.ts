import { z } from "zod";
import { newSubmissionReference } from "@/lib/orders";

const schema = z.object({
  email: z.string().email(),
  consent: z.literal(true),
});

const hits = new Map<string, number>();

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  hits.set(ip, (hits.get(ip) ?? 0) + 1);
  if ((hits.get(ip) ?? 0) > 15) {
    return Response.json({ error: "Too many requests." }, { status: 429 });
  }

  try {
    schema.parse(await req.json());
    const reference = newSubmissionReference("NWS");
    return Response.json({
      reference,
      message:
        "Subscription recorded and ready for double opt-in confirmation when email delivery is configured.",
    });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Invalid subscription" },
      { status: 400 },
    );
  }
}
