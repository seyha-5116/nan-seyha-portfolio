import { Resend } from "resend";
import type { ContactInput } from "@/lib/validation";

const TO_EMAIL = "nanseyha4@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM ?? "onboarding@resend.dev";

export const CONTACT_FROM_EMAIL = FROM_EMAIL;

export async function sendContactEmail(input: ContactInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return false;
  }

  const resend = new Resend(apiKey);
  const subject = `New portfolio message from ${input.name}`;
  const text = [
    `New message from your portfolio site (nanseyha.dev)`,
    ``,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    ``,
    `Message:`,
    input.message,
    ``,
    `—`,
    `Reply to this email to respond directly to the visitor.`,
  ].join("\n");

  const { error } = await resend.emails.send({
    from: `Nan Seyha Portfolio <${FROM_EMAIL}>`,
    to: TO_EMAIL,
    replyTo: input.email,
    subject,
    text,
  });

  if (error) {
    console.error(
      "[contact] Resend failed to deliver message. Check RESEND_API_KEY and that CONTACT_FROM is a verified sender.",
      error,
    );
    return false;
  }

  return true;
}