"use client";

import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-[1120px] flex-1 flex-col items-center justify-center px-4 pb-24 pt-40 text-center sm:px-6 sm:pt-48">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brass">
        Something went wrong
      </p>
      <h1 className="fluid-h2 mt-6 font-display font-bold text-text">
        Unexpected <span className="text-brass">error</span>
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
        The page hit an unexpected issue while loading. You can try again or head back home.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-brass px-7 font-sans text-sm font-medium text-ink transition-colors hover:bg-brass-bright"
        >
          <ArrowLeftIcon className="text-base transition-transform group-hover:-translate-x-1" />
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-7 font-sans text-sm text-text transition-colors hover:border-brass hover:text-brass"
        >
          Back home
          <ArrowRightIcon className="text-base" />
        </Link>
      </div>
    </div>
  );
}