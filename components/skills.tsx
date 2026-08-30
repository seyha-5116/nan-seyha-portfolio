"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/reveal";
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

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24">
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1120px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <SectionHeading index="02" label="Skills" />
        </Reveal>

        <div className="grid gap-px border border-line bg-line md:grid-cols-3">
          {SKILLS.map((panel, panelIndex) => (
            <Reveal key={panel.title} delay={panelIndex * 0.1} className="bg-surface p-8">
              <p className="flex items-baseline justify-between border-b border-line pb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {panel.title}
                <span className="text-brass">{panel.index}</span>
              </p>

              <div aria-hidden="true" className="mt-4">
                <div className="relative h-px w-full bg-line">
                  <motion.span
                    className="absolute inset-0 origin-left bg-brass"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.2 + panelIndex * 0.1 }}
                  />
                </div>
                <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-muted">
                  {"// "}
                  {panel.items.length} MODULES — STANDING BY
                </p>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {panel.items.map((skill) => (
                  <SkillTag key={skill}>{skill}</SkillTag>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillTag({ children }: { children: string }) {
  return (
    <motion.li
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="border border-line-strong px-2.5 py-1 font-mono text-xs text-text transition-colors hover:border-brass hover:text-brass"
    >
      {children}
    </motion.li>
  );
}