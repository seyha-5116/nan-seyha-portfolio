"use client";

import { motion, useReducedMotion } from "motion/react";
import { chunk } from "@/lib/chunk";
import { EASE } from "@/lib/motion";
import type { Step } from "@/lib/types";

export function StepTimeline({ steps }: { steps: Step[] }) {
  return (
    <div>
      <DesktopRow steps={steps} className="hidden md:block" />
      <MobileGrid steps={steps} className="hidden sm:grid md:hidden" />
      <NarrowColumn steps={steps} className="sm:hidden" />
    </div>
  );
}

function DesktopRow({ steps, className }: { steps: Step[]; className?: string }) {
  const reduce = useReducedMotion();
  const count = steps.length;
  const left = `${100 / (2 * count)}%`;
  const width = `${(100 * (count - 1)) / count}%`;

  return (
    <div className={className}>
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute top-[5px] h-px bg-brass/30"
          style={{ left, width }}
        />
        {!reduce ? (
          <motion.span
            aria-hidden="true"
            className="absolute top-[5px] h-px origin-left bg-brass"
            style={{ left, width }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          />
        ) : null}
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
        >
          {steps.map((step, i) => (
            <StepNode key={step.index} step={step} index={i} reduce={reduce} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileGrid({ steps, className }: { steps: Step[]; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={`space-y-10 ${className}`}>
      {chunk(steps, 2).map((row, rowIndex) => (
        <div key={rowIndex} className="relative">
          {row.length > 1 ? (
            <>
              <div
                aria-hidden="true"
                className="absolute left-1/4 top-[5px] h-px w-1/2 bg-brass/30"
              />
              {!reduce ? (
                <motion.span
                  aria-hidden="true"
                  className="absolute left-1/4 top-[5px] h-px w-1/2 origin-left bg-brass"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1, ease: EASE, delay: 0.1 }}
                />
              ) : null}
            </>
          ) : null}
          <div className="grid grid-cols-2 gap-x-6">
            {row.map((step, i) => (
              <StepNode key={step.index} step={step} index={rowIndex * 2 + i} reduce={reduce} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function NarrowColumn({ steps, className }: { steps: Step[]; className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={`relative ${className}`}>
      <div aria-hidden="true" className="absolute bottom-[9px] left-[5px] top-[9px] w-px bg-brass/30" />
      {!reduce ? (
        <motion.span
          aria-hidden="true"
          className="absolute bottom-[9px] left-[5px] top-[9px] w-px origin-top bg-brass"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
        />
      ) : null}

      <ol className="space-y-10">
        {steps.map((step) => (
          <li key={step.index} className="relative flex gap-5 sm:gap-6">
            <StepNodeDot className="mt-1" />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brass">
                Step {step.index}
              </p>
              <h4 className="mt-2 font-display text-lg font-semibold text-text">{step.title}</h4>
              <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function StepNode({
  step,
  index,
  reduce,
}: {
  step: Step;
  index: number;
  reduce: boolean | null;
}) {
  const body = (
    <div className="flex flex-col items-center text-center">
      <StepNodeDot />
      <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.2em] text-brass">
        Step {step.index}
      </p>
      <h4 className="mt-2 font-display text-lg font-semibold text-text">{step.title}</h4>
      <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-muted">{step.description}</p>
    </div>
  );

  if (reduce) {
    return body;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.1 + index * 0.12 }}
    >
      {body}
    </motion.div>
  );
}

function StepNodeDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-[11px] w-[11px] flex-none items-center justify-center rounded-full border-[1.5px] border-brass bg-ink shadow-[0_0_12px_-2px_rgba(201,161,92,0.35)] ${className ?? ""}`}
    >
      <span className="h-[4px] w-[4px] rounded-full bg-brass" />
    </span>
  );
}
