"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/reveal";
import { TechIcon } from "@/components/tech-icons";
import { SectionDivider } from "@/components/section-divider";
import { SectionHeading } from "@/components/section";
import { EASE } from "@/lib/motion";

const SKILLS: Array<{ title: string; index: string; items: string[] }> = [
  {
    title: "Languages",
    index: "01",
    items: ["TypeScript", "JavaScript", "Python", "SQL", "HTML / CSS"],
  },
  {
    title: "Frameworks & tools",
    index: "02",
    items: [
      "Next.js",
      "React",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "Git",
      "Docker",
    ],
  },
  {
    title: "Workflow",
    index: "03",
    items: ["Agile / Kanban", "Code review", "CI / CD", "Testing & QA", "Serverless deploy"],
  },
];

type SkillPanel = (typeof SKILLS)[number];

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24">
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1120px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <SectionHeading index="02" label="Skills" />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {SKILLS.map((panel, panelIndex) => (
            <SkillCard key={panel.title} panel={panel} panelIndex={panelIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ panel, panelIndex }: { panel: SkillPanel; panelIndex: number }) {
  const reduce = useReducedMotion();
  const [pressed, setPressed] = useState(false);
  const releaseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (releaseTimer.current) clearTimeout(releaseTimer.current);
    },
    [],
  );

  const engage = () => {
    if (reduce) return;
    if (releaseTimer.current) clearTimeout(releaseTimer.current);
    setPressed(true);
  };

  const disengage = () => {
    if (reduce) return;
    if (releaseTimer.current) clearTimeout(releaseTimer.current);
    releaseTimer.current = setTimeout(() => setPressed(false), 600);
  };

  const touched = pressed;

  const card = (
    <div
      className={`group flex h-full flex-col rounded-2xl border bg-surface p-7 transition-colors ${
        touched ? "border-brass/40" : "border-line hover:border-brass/40"
      }`}
      onPointerDown={engage}
      onPointerUp={disengage}
      onPointerLeave={disengage}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line pb-5">
        <h3 className="font-display text-lg font-semibold text-text">{panel.title}</h3>
        <span className="font-mono text-[11px] text-brass">{panel.index}</span>
      </div>

      <div aria-hidden="true" className="mt-5">
        <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-line">
          <span
            className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brass to-brass-bright transition-all duration-500 ease-out ${
              pressed ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </div>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {panel.items.length} capabilities
        </p>
      </div>

      <ul className="mt-5 flex flex-wrap gap-2">
        {panel.items.map((skill, skillIndex) => (
          <SkillTag key={skill} delay={0.35 + panelIndex * 0.12 + skillIndex * 0.05}>
            {skill}
          </SkillTag>
        ))}
      </ul>
    </div>
  );

  if (reduce) {
    return card;
  }

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE, delay: panelIndex * 0.12 }}
    >
      {card}
    </motion.div>
  );
}

function SkillTag({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();

  const content = (
    <>
      <TechIcon tech={String(children)} size={13} />
      {children}
    </>
  );

  const className =
    "inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-2 px-3.5 py-1.5 font-mono text-xs text-text transition-colors hover:border-brass hover:text-brass";

  if (reduce) {
    return <li className={className}>{content}</li>;
  }

  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.32, ease: EASE, delay }}
      whileHover={{ y: -2 }}
      className={className}
    >
      {content}
    </motion.li>
  );
}