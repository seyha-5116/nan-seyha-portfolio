"use client";

import { useActionState, useState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { SubmitButton } from "@/components/submit-button";
import type { ContactFormState } from "@/lib/types";

const INITIAL_STATE: ContactFormState = {};

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, INITIAL_STATE);
  const [fieldErrors, setFieldErrors] = useState<NonNullable<ContactFormState["fieldErrors"]>>({});

  if (state.success) {
    return (
      <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/[0.07] p-8">
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-emerald-300">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Message sent
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Thanks for reaching out — I&apos;ll get back to you as soon as I can, usually within a day.
        </p>
      </div>
    );
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const errors: NonNullable<ContactFormState["fieldErrors"]> = {};
    if (name.length < 2) {
      errors.name = ["Name must be at least 2 characters."];
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = ["Please enter a valid email address."];
    }
    if (message.length < 10) {
      errors.message = ["Message must be at least 10 characters."];
    }

    if (Object.keys(errors).length > 0) {
      event.preventDefault();
      setFieldErrors(errors);
    }
  };

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="relative rounded-2xl border border-line bg-surface p-6 sm:p-8"
      noValidate
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 border-0 p-0 opacity-0"
      />

      <div className="space-y-6">
        <Field
          label="Name"
          name="name"
          autoComplete="name"
          error={fieldErrors.name?.[0] ?? state.fieldErrors?.name?.[0]}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          error={fieldErrors.email?.[0] ?? state.fieldErrors?.email?.[0]}
        />
        <Field
          label="Message"
          name="message"
          as="textarea"
          rows={6}
          error={fieldErrors.message?.[0] ?? state.fieldErrors?.message?.[0]}
        />
      </div>

      {state.error ? (
        <p
          role="alert"
          className="mt-6 rounded-lg border border-red-400/30 bg-red-500/[0.08] px-4 py-3 font-mono text-xs text-red-300"
        >
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
  const baseClasses = error
    ? "w-full rounded-lg border border-red-400/40 bg-ink/40 px-4 py-3 font-sans text-sm text-text placeholder:text-muted/60 transition-colors focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/15"
    : "w-full rounded-lg border border-line-strong bg-ink/40 px-4 py-3 font-sans text-sm text-text placeholder:text-muted/60 transition-colors focus:border-brass focus:outline-none focus:ring-2 focus:ring-brass/15";

  return (
    <div>
      <label
        htmlFor={id}
        className={`mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] ${
          error ? "text-red-300" : "text-muted"
        }`}
      >
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
        <p id={`${id}-error`} className="mt-2 font-mono text-xs text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}