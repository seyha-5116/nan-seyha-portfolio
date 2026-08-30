"use server";

import { persistContactMessage } from "@/lib/contact";
import type { ContactFormState } from "@/lib/types";
import { parseContactForm } from "@/lib/validation";

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = parseContactForm(formData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please fix the highlighted fields below.",
      fieldErrors: parsed.fieldErrors,
    };
  }

  const stored = await persistContactMessage(parsed.data);
  if (!stored) {
    return {
      success: false,
      error: "Something went wrong saving your message. Please try again or email me directly.",
    };
  }

  return { success: true };
}