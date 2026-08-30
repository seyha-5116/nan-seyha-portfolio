import { getPrisma } from "./prisma";
import type { ContactInput } from "./validation";

export async function persistContactMessage(input: ContactInput): Promise<boolean> {
  const db = getPrisma();
  if (!db) {
    console.warn("[contact] DATABASE_URL is not set. Message was accepted but not persisted.");
    return false;
  }
  try {
    await db.contactMessage.create({ data: input });
    return true;
  } catch (error) {
    console.error("[contact] Failed to persist message.", error);
    return false;
  }
}