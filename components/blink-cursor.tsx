"use client";

import { motion, useReducedMotion } from "motion/react";

export function BlinkCursor() {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span aria-hidden="true" className="inline-block h-3.5 w-[2px] bg-brass" />;
  }

  return (
    <motion.span
      aria-hidden="true"
      className="inline-block h-3.5 w-[2px] bg-brass"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1.1, times: [0, 0.5, 1], repeat: Infinity, ease: "linear" }}
    />
  );
}