"use client";

import type { PointerEvent as ReactPointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowUpRightIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { SectionHeading } from "@/components/section";
import type { ProjectSummary } from "@/lib/types";

export function Projects({ projects }: { projects: ProjectSummary[] }) {
  return (
    <section id="projects" className="scroll-mt-24">
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1120px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <SectionHeading index="03" label="Projects" />
        </Reveal>

        {projects.length > 0 ? (
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.08} className="h-full">
                <ProjectCard project={project} index={index} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <p className="py-16 text-center font-mono text-sm text-muted">
              NO PROJECTS PUBLISHED YET.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: ProjectSummary; index: number }) {
  const reduce = useReducedMotion();
  const live = project.status === "LIVE";

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 260, damping: 22 });
  const rotateY = useSpring(ry, { stiffness: 260, damping: 22 });
  const transform = useTransform([rotateX, rotateY], ([x, y]) => {
    const rxDeg = x as number;
    const ryDeg = y as number;
    return `perspective(900px) rotateX(${rxDeg}deg) rotateY(${ryDeg}deg)`;
  });

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rx.set(py * 7);
    ry.set(px * 7);
  };

  const resetTilt = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div className="group relative h-full">
      <motion.div
        className="h-full will-change-transform"
        style={reduce ? undefined : { transform }}
        {...(reduce ? {} : { onPointerMove, onPointerLeave: resetTilt })}
      >
        <div className="flex h-full flex-col bg-surface transition-colors duration-300">
          <FigVisual index={index} live={live} />
          <div className="flex flex-1 flex-col p-7">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-xs tracking-widest text-muted">
                CASE <span className="text-brass">{String(index + 1).padStart(2, "0")}</span>
              </span>
              {live ? (
                <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brass" />
                  Live
                </span>
              ) : (
                <span className="border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  In development
                </span>
              )}
            </div>

            <h3 className="mt-5 font-display text-xl text-text">{project.name}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.techTags.map((tag) => (
                <span
                  key={tag}
                  className="border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-7 flex items-center justify-between border-t border-line pt-4">
              {live && project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs tracking-widest text-brass"
                >
                  View live
                  <ArrowUpRightIcon className="text-sm transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              ) : (
                <span className="font-mono text-xs text-muted">Status: in active development</span>
              )}
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-muted transition-colors hover:text-brass"
                >
                  Source
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </motion.div>

      <Corners />
    </div>
  );
}

function FigVisual({ index, live }: { index: number; live: boolean }) {
  return (
    <div className="relative aspect-[16/7] overflow-hidden border-b border-line bg-surface-2">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(236,233,226,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(236,233,226,0.05) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
        <span className="relative block h-1.5 w-1.5 rounded-full bg-brass shadow-[0_0_14px_rgba(201,154,62,0.9)] transition-transform duration-300 group-hover:scale-[2.2]" />
      </div>
      <span className="absolute left-3 top-3 font-mono text-[10px] tracking-[0.25em] text-muted">
        SCHEMATIC // {String(index + 1).padStart(2, "0")}
      </span>
      <span className="absolute bottom-3 right-3 font-mono text-[10px] tracking-[0.25em] text-muted">
        {live ? "PWR://ON" : "PWR://IDLE"}
      </span>
    </div>
  );
}

function Corners() {
  const corner =
    "pointer-events-none absolute h-3 w-3 border-transparent transition-colors duration-300 group-hover:border-brass";
  return (
    <>
      <span aria-hidden="true" className={`-left-px -top-px border-l border-t ${corner}`} />
      <span aria-hidden="true" className={`-right-px -top-px border-r border-t ${corner}`} />
      <span aria-hidden="true" className={`-bottom-px -left-px border-b border-l ${corner}`} />
      <span aria-hidden="true" className={`-bottom-px -right-px border-b border-r ${corner}`} />
    </>
  );
}