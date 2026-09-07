import { Resend } from "resend";
import type { ContactInput } from "@/lib/validation";

export const CONTACT_TO_EMAIL = "nanseyha4@gmail.com";
export const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM ?? "onboarding@resend.dev";

export function hasEmailIntegration(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char] as string,
  );
}

function buildHtml(input: ContactInput): string {
  const name = escapeHtml(input.name);
  const email = escapeHtml(input.email);
  const message = escapeHtml(input.message);

  return [
    `<!doctype html>`,
    `<html lang="en">`,
    `<body style="margin:0;padding:24px;background-color:#0a0a0c;font-family:Segoe UI,Arial,sans-serif;">`,
    `  <div style="max-width:560px;margin:0 auto;">`,
    `    <h2 style="margin:0 0 4px;color:#c9a15c;">New portfolio message</h2>`,
    `    <p style="margin:0 0 24px;color:#9b99a3;font-size:13px;">from nan-seyha-portfolio.vercel.app</p>`,
    `    <table style="width:100%;border-collapse:collapse;background-color:#121216;border:1px solid #26262b;border-radius:12px;overflow:hidden;font-size:14px;color:#f2f0ea;">`,
    `      <tr><td style="padding:14px 18px;color:#9b99a3;border-bottom:1px solid #26262b;">Name</td><td style="padding:14px 18px;border-bottom:1px solid #26262b;"><strong>${name}</strong></td></tr>`,
    `      <tr><td style="padding:14px 18px;color:#9b99a3;border-bottom:1px solid #26262b;">Email</td><td style="padding:14px 18px;border-bottom:1px solid #26262b;"><a href="mailto:${email}" style="color:#c9a15c;">${email}</a></td></tr>`,
    `      <tr><td style="padding:14px 18px;color:#9b99a3;vertical-align:top;">Message</td><td style="padding:14px 18px;line-height:1.6;white-space:pre-wrap;">${message}</td></tr>`,
    `    </table>`,
    `    <p style="margin:20px 0 0;color:#9b99a3;font-size:12px;">Reply to this email to respond directly to the visitor.</p>`,
    `  </div>`,
    `</body>`,
    `</html>`,
  ].join("\n");
}

export async function sendContactEmail(input: ContactInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return false;
  }

  const resend = new Resend(apiKey);
  const subject = `New portfolio message from ${input.name}`;
  const text = [
    `New message from your portfolio site (nan-seyha-portfolio.vercel.app)`,
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

  const { data, error } = await resend.emails.send({
    from: `Nan Seyha Portfolio <${CONTACT_FROM_EMAIL}>`,
    to: CONTACT_TO_EMAIL,
    replyTo: input.email,
    subject,
    text,
    html: buildHtml(input),
  });

  if (error) {
    console.error(
      `[contact] Resend failed to deliver message (from=${CONTACT_FROM_EMAIL}, to=${CONTACT_TO_EMAIL}). ` +
        "Check RESEND_API_KEY and that CONTACT_FROM is a verified sender.",
      { name: error.name, message: error.message },
    );
    return false;
  }

  console.info(
    "[contact] Email delivered via Resend id=%s from=%s to=%s",
    data?.id,
    CONTACT_FROM_EMAIL,
    CONTACT_TO_EMAIL,
  );
  return true;
}