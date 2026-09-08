"use client";

import type { SVGProps } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRightIcon,
  BotIcon,
  CodeIcon,
  CursorIcon,
  DatabaseIcon,
  PaletteIcon,
  PencilIcon,
} from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { SectionHeading } from "@/components/section";
import { chunk } from "@/lib/chunk";
import { EASE } from "@/lib/motion";

type ServiceIcon = (props: SVGProps<SVGSVGElement>) => React.ReactElement;

type Track = {
  code: string;
  title: string;
  lead: string;
  startIndex: number;
  services: Array<{
    icon: ServiceIcon;
    title: string;
    description: string;
    tags: string[];
  }>;
};

const TRACKS: Track[] = [
  {
    code: "Track 01 — Design",
    title: "UX / UI Design",
    lead: "Research, structure, and visual systems that make products feel obvious to use.",
    startIndex: 1,
    services: [
      {
        icon: PencilIcon,
        title: "Product & UX strategy",
        description: "Discovery, user flows, and architecture that turn a rough idea into a clear product.",
        tags: ["Discovery", "User research", "Wireframes"],
      },
      {
        icon: PaletteIcon,
        title: "Interface & visual design",
        description: "Clean, modern interfaces and design systems that hold together as you scale.",
        tags: ["Design systems", "Figma", "Motion design"],
      },
      {
        icon: CursorIcon,
        title: "Prototyping & testing",
        description: "Clickable, animated prototypes validated with real users before a line of code.",
        tags: ["Prototypes", "Usability testing", "Iteration"],
      },
    ],
  },
  {
    code: "Track 02 — Engineering",
    title: "Full-Stack Development",
    lead: "Fast, accessible frontends wired to dependable backends — shipped and maintained.",
    startIndex: 4,
    services: [
      {
        icon: CodeIcon,
        title: "Frontend engineering",
        description: "Reactive, animated, accessible interfaces built with React and Next.js.",
        tags: ["React", "Next.js", "Tailwind CSS"],
      },
      {
        icon: DatabaseIcon,
        title: "Backend & APIs",
        description: "Robust REST APIs, databases, and auth that hold up under real traffic.",
        tags: ["Node.js", "PostgreSQL", "Prisma"],
      },
      {
        icon: BotIcon,
        title: "AI tooling & automation",
        description: "Custom AI workflows and integrations that quietly save hours every week.",
        tags: ["OpenAI", "Automation", "Support"],
      },
    ],
  },
];

const PROCESS = [
  { title: "Discover", description: "Goals, constraints, and scope clarified up front." },
  { title: "Design", description: "Wireframes through to polished UI, iterated with feedback." },
  { title: "Develop", description: "Clean full-stack builds, tested as they grow." },
  { title: "Ship", description: "Deploy, monitor, and support beyond launch." },
];

export function Services() {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="scroll-mt-24">
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1120px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <SectionHeading index="03" label="Services" />
        </Reveal>

        <Reveal>
          <h2 className="fluid-h2 max-w-2xl font-display font-bold text-text">
            Design &amp; build, <span className="text-brass">end to end</span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
            From the first wireframe to the final deploy — I cover both sides of the product stack
            as a UX/UI designer and a full-stack developer.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {TRACKS.map((track, trackIndex) => (
            <TrackCard key={track.startIndex} track={track} trackIndex={trackIndex} />
          ))}
        </div>

        <ProcessStrip reduce={reduce} />

        <Reveal className="mt-14">
          <div className="flex flex-col gap-5 rounded-2xl border border-brass/25 bg-brass/[0.06] p-6 sm:p-7 md:flex-row md:items-center md:justify-between">
            <p className="font-mono text-xs leading-relaxed text-muted">
              <span className="text-brass">$</span> HAVE A PROJECT IN MIND? I TURN IDEAS INTO
              SHIPPED PRODUCTS.
            </p>
            <a
              href="#contact"
              className="group inline-flex h-11 flex-none items-center justify-center gap-2 rounded-full bg-brass px-6 font-sans text-sm font-medium text-ink transition-colors hover:bg-brass-bright"
            >
              Start a project
              <ArrowRightIcon className="text-base transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TrackCard({ track, trackIndex }: { track: Track; trackIndex: number }) {
  const reduce = useReducedMotion();

  const card = (
    <div className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-brass/40 sm:p-8">
      <div className="border-b border-line pb-6">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brass">{track.code}</p>
          <span className="font-mono text-[11px] text-muted">
            0{track.startIndex}
            <span className="text-line-strong"> / </span>
            06
          </span>
        </div>
        <h3 className="mt-3 font-display text-xl font-semibold text-text">{track.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{track.lead}</p>
      </div>

      <ul className="mt-2 flex flex-col divide-y divide-line">
        {track.services.map((service, serviceIndex) => (
          <ServiceRow
            key={service.title}
            service={service}
            index={track.startIndex + serviceIndex}
            delay={0.2 + trackIndex * 0.12 + serviceIndex * 0.1}
            reduce={reduce}
          />
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
      transition={{ duration: 0.6, ease: EASE, delay: trackIndex * 0.12 }}
    >
      {card}
    </motion.div>
  );
}

function ServiceRow({
  service,
  index,
  delay,
  reduce,
}: {
  service: Track["services"][number];
  index: number;
  delay: number;
  reduce: boolean | null;
}) {
  const Icon = service.icon;

  const row = (
    <>
      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-line-strong bg-surface-2 text-text transition-colors duration-300 group-hover/service:border-brass group-hover/service:text-brass">
        <Icon className="text-lg" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-3">
          <span className="font-display text-[15px] font-semibold text-text">{service.title}</span>
          <span className="font-mono text-[10px] text-muted">{String(index).padStart(2, "0")}</span>
        </span>
        <span className="mt-1.5 block text-xs leading-relaxed text-muted">
          {service.description}
        </span>
        <span className="mt-3 flex flex-wrap gap-2">
          {service.tags.map((tag, tagIndex) => (
            <Tag key={tag} delay={delay + 0.15 + tagIndex * 0.06} reduce={reduce}>
              {tag}
            </Tag>
          ))}
        </span>
      </span>
      <ArrowRightIcon className="mt-1 flex-none text-base text-muted transition-all duration-300 group-hover/service:translate-x-1 group-hover/service:text-brass" />
    </>
  );

  if (reduce) {
    return (
      <li className="group/service flex gap-4 py-6">
        {row}
      </li>
    );
  }

  return (
    <motion.li
      className="group/service flex gap-4 py-6"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {row}
    </motion.li>
  );
}

function Tag({
  children,
  delay = 0,
  reduce,
}: {
  children: React.ReactNode;
  delay?: number;
  reduce: boolean | null;
}) {
  const className =
    "inline-flex items-center rounded-full border border-line-strong bg-surface-2 px-3 py-1 font-mono text-[11px] text-muted transition-colors hover:border-brass hover:text-brass";

  if (reduce) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.3, ease: EASE, delay }}
    >
      <span className={className}>{children}</span>
    </motion.span>
  );
}

function ProcessStrip({ reduce }: { reduce: boolean | null }) {
  return (
    <div className="mt-16">
      <Reveal>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">How I work</p>
      </Reveal>

      <div className="relative mt-8">
        <div className="relative hidden md:block">
          <div aria-hidden="true" className="absolute inset-x-0 top-[5px] h-px bg-line-strong" />
          {!reduce ? (
            <motion.span
              aria-hidden="true"
              className="absolute inset-x-0 top-[5px] h-px origin-left bg-gradient-to-r from-brass to-brass-bright"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.1, ease: EASE }}
            />
          ) : null}

          <ol className="grid grid-cols-4">
            {PROCESS.map((step, index) => (
              <ProcessStep key={step.title} step={step} index={index} reduce={reduce} />
            ))}
          </ol>
        </div>

        <div className="space-y-12 md:hidden">
          {chunk(PROCESS, 2).map((row, rowIndex) => (
            <div key={rowIndex} className="relative">
              <div
                aria-hidden="true"
                className="absolute left-[calc(25%-6px)] top-[5px] h-px w-[calc(50%+12px)] bg-line-strong"
              />
              {!reduce ? (
                <motion.span
                  aria-hidden="true"
                  className="absolute left-[calc(25%-6px)] top-[5px] h-px w-[calc(50%+12px)] origin-left bg-gradient-to-r from-brass to-brass-bright"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1, ease: EASE, delay: 0.1 + rowIndex * 0.15 }}
                />
              ) : null}
              <ol className="grid grid-cols-2 gap-x-6">
                {row.map((step, index) => (
                  <ProcessStep
                    key={step.title}
                    step={step}
                    index={rowIndex * 2 + index}
                    reduce={reduce}
                  />
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProcessStep({
  step,
  index,
  reduce,
}: {
  step: (typeof PROCESS)[number];
  index: number;
  reduce: boolean | null;
}) {
  const dot = (
    <span
      aria-hidden="true"
      className="flex h-[11px] w-[11px] items-center justify-center rounded-full border border-brass bg-ink"
    >
      <span className="h-[4px] w-[4px] rounded-full bg-brass" />
    </span>
  );

  const label = (
    <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.2em] text-brass">
      Step {String(index + 1).padStart(2, "0")}
    </p>
  );
  const title = (
    <h4 className="mt-2 font-display text-lg font-semibold text-text">{step.title}</h4>
  );
  const description = <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>;

  if (reduce) {
    return (
      <li className="flex flex-col items-center text-center">
        {dot}
        {label}
        {title}
        {description}
      </li>
    );
  }

  return (
    <motion.li
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.1 + index * 0.12 }}
    >
      {dot}
      {label}
      {title}
      {description}
    </motion.li>
  );
}
