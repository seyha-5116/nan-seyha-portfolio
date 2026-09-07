"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <div className="mt-8 flex items-center gap-4">
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brass px-7 font-sans text-sm font-medium text-ink transition-colors hover:bg-brass-bright disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
      {pending ? (
        <span className="font-mono text-xs text-muted" aria-hidden="true">
          Please wait…
        </span>
      ) : null}
    </div>
  );
}