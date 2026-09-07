"use client";

import { motion, useReducedMotion } from "motion/react";
import { TechIcon } from "@/components/tech-icons";

const ITEMS = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "PostgreSQL",
  "Prisma",
  "Python",
  "Tailwind CSS",
  "Docker",
  "OpenAI API",
  "Git",
  "REST APIs",
];

export function Ticker() {
  const reduce = useReducedMotion();
  const doubled = [...ITEMS, ...ITEMS];

  const renderItem = (item: string, index: number) => (
    <span
      key={`${index}-${item}`}
      className="mx-7 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted"
    >
      <TechIcon tech={item} size={15} className="opacity-80" />
      {item}
    </span>
  );

  return (
    <div
      aria-hidden="true"
      className="relative z-10 overflow-hidden border-t border-line"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}
    >
      {reduce ? (
        <div className="flex flex-wrap justify-center gap-x-0 py-3">
          {ITEMS.map(renderItem)}
        </div>
      ) : (
        <motion.div
          className="flex w-max py-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        >
          {doubled.map(renderItem)}
        </motion.div>
      )}
    </div>
  );
}