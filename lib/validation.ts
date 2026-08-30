import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name must be 80 characters or fewer."),
  email: z.email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message must be 5000 characters or fewer."),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function parseContactForm(formData: FormData) {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
  const result = contactSchema.safeParse(raw);
  if (!result.success) {
    const flat = result.error.flatten().fieldErrors;
    return {
      success: false as const,
      data: null,
      fieldErrors: { name: flat.name, email: flat.email, message: flat.message },
    };
  }
  return { success: true as const, data: result.data, fieldErrors: null };
}