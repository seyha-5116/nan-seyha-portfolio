"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <div className="mt-8 flex items-center gap-4">
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center gap-2 bg-brass px-6 font-mono text-sm text-ink transition-colors hover:bg-brass-bright disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
      {pending ? (
        <span className="font-mono text-xs text-muted" aria-hidden="true">
          {"// transmitting…"}
        </span>
      ) : null}
    </div>
  );
}