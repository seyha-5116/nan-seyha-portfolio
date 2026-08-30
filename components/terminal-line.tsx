"use client";

import { BlinkCursor } from "@/components/blink-cursor";

export function TerminalLine() {
  return (
    <p className="mt-8 flex items-center gap-2 font-mono text-xs text-muted">
      <span className="text-brass">nan@seyha:~$</span>
      <span>status: building things that last</span>
      <BlinkCursor />
    </p>
  );
}