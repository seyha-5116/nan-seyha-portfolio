"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { SubmitButton } from "@/components/submit-button";
import type { ContactFormState } from "@/lib/types";

const INITIAL_STATE: ContactFormState = {};

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, INITIAL_STATE);

  if (state.success) {
    return (
      <div className="border border-brass p-8">
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-brass">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brass" />
          Message sent
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Thanks for reaching out — I&apos;ll get back to you as soon as I can.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="border border-line p-6 sm:p-8" noValidate>
      <div className="space-y-6">
        <Field
          label="Name"
          name="name"
          autoComplete="name"
          error={state.fieldErrors?.name?.[0]}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          error={state.fieldErrors?.email?.[0]}
        />
        <Field
          label="Message"
          name="message"
          as="textarea"
          rows={6}
          error={state.fieldErrors?.message?.[0]}
        />
      </div>

      {state.error ? (
        <p role="alert" className="mt-6 border border-line-strong px-3 py-2 font-mono text-xs text-brass">
          {state.error}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  as,
  rows,
  autoComplete,
  error,
}: {
  label: string;
  name: string;
  type?: "text" | "email";
  as?: "input" | "textarea";
  rows?: number;
  autoComplete?: string;
  error?: string;
}) {
  const id = `contact-${name}`;
  const baseClasses =
    "w-full border border-line-strong bg-transparent px-3.5 py-3 font-mono text-sm text-text placeholder:text-muted transition-colors focus:border-brass focus:outline-none";

  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          placeholder="Tell me about your project…"
          className={`${baseClasses} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          placeholder={type === "email" ? "you@example.com" : "Your name"}
          className={baseClasses}
        />
      )}
      {error ? (
        <p id={`${id}-error`} className="mt-2 font-mono text-xs text-brass">
          {error}
        </p>
      ) : null}
    </div>
  );
}