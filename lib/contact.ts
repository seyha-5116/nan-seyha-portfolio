import { sendContactEmail } from "@/lib/email";
import { getPrisma } from "./prisma";
import type { ContactInput } from "./validation";

export type PersistResult =
  | { ok: true }
  | { ok: false; offline: boolean };

async function storeMessageBestEffort(input: ContactInput): Promise<void> {
  const db = getPrisma();
  if (!db) {
    return;
  }
  try {
    await db.contactMessage.create({ data: input });
  } catch (error) {
    console.error("[contact] Failed to persist backup copy of message.", error);
  }
}

export async function persistContactMessage(input: ContactInput): Promise<PersistResult> {
  const hasEmailKey = Boolean(process.env.RESEND_API_KEY);

  // The only accepted definition of success is an email confirmed delivered by
  // the provider. Never report success for a stored-but-undelivered message.
  if (hasEmailKey) {
    const delivered = await sendContactEmail(input);
    await storeMessageBestEffort(input);
    return delivered ? { ok: true } : { ok: false, offline: false };
  }

  // No email provider configured – keep a backup copy if a DB exists, but
  // report the channel unavailable so the UI never fakes a success.
  await storeMessageBestEffort(input);
  return { ok: false, offline: true };
}