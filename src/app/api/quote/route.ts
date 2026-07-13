import { z } from "zod";
import { newSubmissionReference } from "@/lib/orders";

const schema = z.object({
  name: z.string().min(1),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(1),
  zip: z.string().min(3),
  product: z.string().optional(),
  sku: z.string().optional(),
  size: z.string().optional(),
  finish: z.string().optional(),
  quantity: z.number().int().min(1).max(10000),
  intendedUse: z.string().optional(),
  deliveryWindow: z.string().optional(),
  details: z.string().optional(),
  consent: z.literal(true),
  privacy: z.literal(true),
});

export async function POST(req: Request) {
  try {
    schema.parse(await req.json());
    const reference = newSubmissionReference("QTE");
    return Response.json({
      reference,
      message: `Quote request received. Reference ${reference}.`,
    });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Invalid quote request" },
      { status: 400 },
    );
  }
}
