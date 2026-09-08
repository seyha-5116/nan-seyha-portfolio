import { NextRequest, NextResponse } from "next/server";
import { persistContactMessage } from "@/lib/contact";
import { contactSchema, isHoneypotFilled } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON payload." }, { status: 400 });
  }

  if (isHoneypotFilled(body.website)) {
    return NextResponse.json({ success: true });
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

  console.info("[contact] Received form submission.");

  const stored = await persistContactMessage(result.data);
  if (!stored.ok) {
    if (stored.offline) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Messaging is unavailable right now. Reach me directly at nanseyha4@gmail.com or @nanseyha on Telegram instead.",
        },
        { status: 503 },
      );
    }
    return NextResponse.json(
      {
        success: false,
        error:
          "Something went wrong sending your message — please email me directly at nanseyha4@gmail.com.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}