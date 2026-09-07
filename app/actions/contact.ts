"use server";

import { persistContactMessage } from "@/lib/contact";
import type { ContactFormState } from "@/lib/types";
import { isHoneypotFilled, parseContactForm } from "@/lib/validation";
import { CONTACT_LINKS } from "@/lib/site";

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  if (isHoneypotFilled(formData.get("website"))) {
    return { success: true };
  }

  const parsed = parseContactForm(formData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the highlighted fields below.",
      fieldErrors: parsed.fieldErrors,
    };
  }

  const stored = await persistContactMessage(parsed.data);
  if (!stored.ok) {
    if (stored.offline) {
      const email = CONTACT_LINKS.find((l) => l.id === "email");
      const telegram = CONTACT_LINKS.find((l) => l.id === "telegram");
      return {
        success: false,
        error: `Messaging is unavailable right now. Reach me directly at ${
          email?.value ?? "nanseyha4@gmail.com"
        } or ${telegram?.value ?? "@nanseyha"} on Telegram instead.`,
      };
    }
    return {
      success: false,
      error:
        "Something went wrong sending your message — please email me directly at nanseyha4@gmail.com.",
    };
  }

  return {
    success: true,
    sentAt: new Date().toISOString(),
    name: parsed.data.name,
    message: parsed.data.message,
  };
}