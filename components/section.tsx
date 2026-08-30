"use client";

import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

export function SectionHeading({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-10 flex items-center gap-4 sm:mb-14">
      <motion.span
        aria-hidden="true"
        className="inline-block h-px w-8 origin-left bg-brass"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: EASE }}
      />
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.12 }}
        className="font-mono text-xs uppercase tracking-[0.25em] text-muted"
      >
        <span className="text-brass">{index}</span> — {label}
      </motion.p>
      <motion.span
        aria-hidden="true"
        className="inline-block h-px flex-1 origin-left bg-line"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.24 }}
      />
    </div>
  );
}