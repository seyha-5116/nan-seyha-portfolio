import { NextRequest, NextResponse } from "next/server";
import { persistContactMessage } from "@/lib/contact";
import { contactSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Validation failed.",
        fieldErrors: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const stored = await persistContactMessage(result.data);
  if (!stored) {
    return NextResponse.json({ success: false, error: "Could not persist message." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}