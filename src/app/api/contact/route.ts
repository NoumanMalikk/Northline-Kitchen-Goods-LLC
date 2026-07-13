import { z } from "zod";
import { newSubmissionReference } from "@/lib/orders";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  topic: z.string().min(1),
  details: z.string().min(1).max(5000),
  consent: z.literal(true),
  website: z.string().optional(), // honeypot
});

const hits = new Map<string, number>();

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  hits.set(ip, (hits.get(ip) ?? 0) + 1);
  if ((hits.get(ip) ?? 0) > 20) {
    return Response.json({ error: "Too many requests." }, { status: 429 });
  }

  try {
    const body = schema.parse(await req.json());
    if (body.website) {
      return Response.json({ reference: newSubmissionReference("SPAM"), message: "Received." });
    }
    const reference = newSubmissionReference("CNT");
    // In production, deliver via configured email. Never invent a public inbox.
    return Response.json({
      reference,
      message: `Message received. Reference ${reference}.`,
    });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Invalid submission" },
      { status: 400 },
    );
  }
}
