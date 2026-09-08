import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionDivider } from "@/components/section-divider";
import { SectionHeading } from "@/components/section";
import { TechIcon } from "@/components/tech-icons";
import { chunk } from "@/lib/chunk";
import type { CaseStudy } from "@/lib/case-studies";

export function CaseStudyLayout({
  current,
  index,
  count,
  next,
}: {
  current: CaseStudy;
  index: number;
  count: number;
  next: CaseStudy;
}) {
  const live = current.status === "LIVE";

  return (
    <>
      <Hero current={current} index={index} count={count} live={live} />

      <OverviewSection current={current} />
      <ProblemSection current={current} />
      <ProcessSection current={current} />
      <TechnicalSection current={current} />
      <ChallengesSection current={current} />
      <ResultsSection current={current} />
      <ReflectionSection current={current} />

      <NextAndCtaSection next={next} count={count} />
    </>
  );
}

function Hero({
  current,
  index,
  count,
  live,
}: {
  current: CaseStudy;
  index: number;
  count: number;
  live: boolean;
}) {
  return (
    <section id="top" className="scroll-mt-24 pt-32 sm:pt-36">
      <div className="mx-auto w-full max-w-[1120px] px-4 sm:px-6">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-muted transition-colors hover:text-brass"
        >
          <ArrowLeftIcon className="text-sm" /> BACK TO PROJECTS
        </Link>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <span className="inline-flex h-8 items-center justify-center rounded-md border border-line-strong bg-surface-2 px-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brass">
            Case study — {String(index).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <span
            className={`inline-flex h-8 items-center rounded-full border border-line-strong px-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted`}
          >
            <span
              aria-hidden="true"
              className={`mr-2 h-1.5 w-1.5 rounded-full ${live ? "bg-[#4ade80]" : "bg-brass"}`}
            />
            {live ? "Live" : "In development"}
          </span>
        </div>

        <h1 className="fluid-case-title mt-6 font-display font-bold text-text">{current.name}</h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {current.oneLiner}
        </p>

        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          <MetaCell label="Role" value={current.role} />
          <MetaCell label="Timeline" value={current.timeline} />
          <MetaCell label="Team" value={current.team} />
        </div>

        {(current.liveUrl || current.repoUrl) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {current.liveUrl ? (
              <a
                href={current.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-brass px-7 font-sans text-sm font-medium text-ink transition-colors hover:bg-brass-bright"
              >
                View live
                <ArrowRightIcon className="text-base transition-transform group-hover:translate-x-1" />
              </a>
            ) : null}
            {current.repoUrl ? (
              <a
                href={current.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-7 font-sans text-sm text-text transition-colors hover:border-brass hover:text-brass"
              >
                Source code
              </a>
            ) : null}
          </div>
        )}
      </div>

      <div className="mx-auto mt-12 w-full max-w-[1120px] px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-line bg-surface-2">
          {current.image ? (
            <div className="relative aspect-[16/7] w-full">
              <Image
                src={current.image}
                alt={`${current.name} case study preview`}
                fill
                sizes="(min-width: 1024px) 1120px, 100vw"
                priority
                style={{ filter: "saturate(0.85)" }}
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"
              />
            </div>
          ) : (
            <div className="flex aspect-[16/7] w-full items-center justify-center bg-gradient-to-br from-surface-2 to-ink">
              <span className="font-mono text-3xl font-semibold text-line-strong">
                {current.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function MetaCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface px-5 py-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{label}</p>
      <p className="mt-1.5 text-sm font-medium text-text">{value}</p>
    </div>
  );
}

function OverviewSection({ current }: { current: CaseStudy }) {
  return (
    <section className="scroll-mt-24">
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1120px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <SectionHeading index="01" label="Overview" />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-14">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-muted">
              <p className="text-lg font-medium leading-snug text-text">{current.overview.context}</p>
              {current.overview.problem.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="rounded-xl border border-brass/25 bg-brass/[0.06] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                  Outcome
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text/90">
                  {current.overview.outcome}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <aside className="rounded-2xl border border-line bg-surface p-6 lg:sticky lg:top-24">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                Quick facts
              </p>
              <dl className="mt-5 space-y-5">
                <FactRow label="Stack">
                  <dd className="mt-2.5 flex flex-wrap gap-2">
                    {current.technical.stackTable.flatMap((col) => col.items).map((tag) => (
                      <TagChip key={tag} tag={tag} />
                    ))}
                  </dd>
                </FactRow>
                <FactRow label="Timeline" value={current.timeline} />
                <FactRow label="My role" value={current.role} />
                <FactRow label="Team size" value={current.team} />
              </dl>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FactRow({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{label}</dt>
      {value ? <dd className="mt-1 text-sm font-medium text-text">{value}</dd> : null}
      {children}
    </div>
  );
}

function TagChip({ tag }: { tag: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface-2 px-3 py-1 font-mono text-[11px] text-muted">
      <TechIcon tech={tag} size={12} />
      {tag}
    </span>
  );
}

function ProblemSection({ current }: { current: CaseStudy }) {
  return (
    <section className="scroll-mt-24">
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1120px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <SectionHeading index="02" label="Problem & goals" />
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Problem space
            </p>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
              {current.problemAndGoals.narrative.map((paragraph, i) => (
                <p key={paragraph} className={i === 0 ? "text-lg font-medium leading-snug text-text" : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Goals</p>
            <ol className="mt-4 space-y-3">
              {current.problemAndGoals.goals.map((goal, i) => (
                <li
                  key={goal}
                  className="flex gap-4 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong"
                >
                  <span className="font-mono text-xs leading-6 text-brass">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-6 text-text/90">{goal}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Constraints
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {current.problemAndGoals.constraints.map((constraint, i) => (
              <div
                key={constraint}
                className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                  Constraint {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{constraint}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProcessSection({ current }: { current: CaseStudy }) {
  return (
    <section className="scroll-mt-24">
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1120px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <SectionHeading index="03" label="Process & approach" />
        </Reveal>

        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">How it ran</p>
        </Reveal>

        <div className="relative mt-8">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[5px] h-px bg-line-strong hidden md:block"
          />
          <ol className="relative hidden grid-cols-4 gap-x-6 md:grid">
            {current.process.steps.map((step, i) => (
              <ProcessStepItem key={step.title} step={step} index={i} />
            ))}
          </ol>

          <div className="space-y-12 md:hidden">
            {chunk(current.process.steps, 2).map((row, rowIndex) => (
              <div key={rowIndex} className="relative">
                {row.length > 1 ? (
                  <div
                    aria-hidden="true"
                    className="absolute left-[calc(25%-6px)] top-[5px] h-px w-[calc(50%+12px)] bg-line-strong"
                  />
                ) : null}
                <ol className="grid grid-cols-2 gap-x-6">
                  {row.map((step, i) => (
                    <ProcessStepItem key={step.title} step={step} index={rowIndex * 2 + i} />
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>

        <Reveal className="mt-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Key decisions
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {current.process.decisions.map((decision, i) => (
              <div
                key={decision.title}
                className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-brass/40 sm:p-7"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                  Decision {String(i + 1).padStart(2, "0")}
                </p>
                <h4 className="mt-3 font-display text-[15px] font-semibold text-text">
                  {decision.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{decision.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProcessStepItem({
  step,
  index,
}: {
  step: { title: string; description: string };
  index: number;
}) {
  return (
    <li className="flex flex-col items-center text-center">
      <span
        aria-hidden="true"
        className="flex h-[11px] w-[11px] items-center justify-center rounded-full border border-brass bg-ink"
      >
        <span className="h-[4px] w-[4px] rounded-full bg-brass" />
      </span>
      <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.2em] text-brass">
        Step {String(index + 1).padStart(2, "0")}
      </p>
      <h4 className="mt-2 font-display text-lg font-semibold text-text">{step.title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
    </li>
  );
}

function TechnicalSection({ current }: { current: CaseStudy }) {
  const nodes = current.technical.architecture;

  return (
    <section className="scroll-mt-24">
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1120px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <SectionHeading index="04" label="Technical deep-dive" />
        </Reveal>

        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">System flow</p>
          <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center">
            {nodes.map((node, i) => (
              <Fragment key={node.layer}>
                <div className="flex-1 rounded-xl border border-line-strong bg-surface-2 px-4 py-3.5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-brass">
                    {node.layer}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">
                    {node.detail}
                  </p>
                </div>
                {i < nodes.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="flex-none self-center px-1 font-mono text-lg text-brass"
                  >
                    →
                  </span>
                ) : null}
              </Fragment>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Implementation details
          </p>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {current.technical.highlights.map((highlight, i) => (
              <div
                key={highlight.title}
                className="rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-brass/40"
              >
                <p className="font-mono text-[10px] text-brass">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h4 className="mt-3 font-display text-[15px] font-semibold text-text">
                  {highlight.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{highlight.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {current.technical.snippets.length > 0 ? (
          <div className="mt-14">
            {current.technical.snippets.map((snippet, i) => (
              <Reveal key={snippet.title} delay={i * 0.05} className="mt-6 first:mt-0">
                <CodeBlock title={snippet.title} code={snippet.code} />
              </Reveal>
            ))}
          </div>
        ) : null}

        <Reveal className="mt-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Stack</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {current.technical.stackTable.map((column) => (
              <div key={column.category} className="rounded-2xl border border-line bg-surface p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                  {column.category}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {column.items.map((tag) => (
                    <TagChip key={tag} tag={tag} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-ink">
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-brass/50" />
        </div>
        <span className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {title}
        </span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-text/80">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function ChallengesSection({ current }: { current: CaseStudy }) {
  return (
    <section className="scroll-mt-24">
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1120px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <SectionHeading index="05" label="Challenges & solutions" />
        </Reveal>

        <div className="space-y-6">
          {current.challenges.map((challenge, i) => (
            <Reveal key={challenge.title} delay={i * 0.05}>
              <div className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brass">
                  Challenge {String(i + 1).padStart(2, "0")}
                </p>
                <h4 className="mt-2 font-display text-lg font-semibold text-text">
                  {challenge.title}
                </h4>
                <dl className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                  <ChallengeFact label="Problem" body={challenge.problem} />
                  <ChallengeFact label="Reasoning" body={challenge.reasoning} />
                  <ChallengeFact label="Fix" body={challenge.fix} />
                  <ChallengeFact label="Result" accent body={challenge.result} />
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChallengeFact({
  label,
  body,
  accent = false,
}: {
  label: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <div className="border-t border-line pt-4">
      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{label}</dt>
      <dd className={`mt-2 text-sm leading-relaxed ${accent ? "text-brass" : "text-muted"}`}>
        {body}
      </dd>
    </div>
  );
}

function ResultsSection({ current }: { current: CaseStudy }) {
  return (
    <section className="scroll-mt-24">
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1120px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <SectionHeading index="06" label="Results & impact" />
        </Reveal>

        <Reveal>
          <ul className="space-y-4">
            {current.results.map((result, i) => (
              <li
                key={result}
                className="flex gap-4 rounded-xl border border-line bg-surface p-5 transition-colors hover:border-line-strong"
              >
                <span className="font-mono text-xs leading-6 text-brass">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-6 text-text/90 sm:text-base">{result}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function ReflectionSection({ current }: { current: CaseStudy }) {
  return (
    <section className="scroll-mt-24">
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1120px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <SectionHeading index="07" label="Reflection" />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                With hindsight
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {current.reflection.differently}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-2xl border border-brass/25 bg-brass/[0.06] p-6 sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                What I&apos;d reuse
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">{current.reflection.reuse}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function NextAndCtaSection({ next, count }: { next: CaseStudy; count: number }) {
  return (
    <section className="scroll-mt-24">
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1120px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <div className="grid gap-4 lg:grid-cols-2">
            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-col justify-between gap-10 rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-brass/40 sm:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brass">
                  Next case study
                </p>
                <span className="font-mono text-[11px] text-muted">
                  {String(next.index).padStart(2, "0")}
                  <span className="text-line-strong"> / </span>
                  {String(count).padStart(2, "0")}
                </span>
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-text transition-colors group-hover:text-brass">
                  {next.name}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                  {next.oneLiner}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs tracking-wide text-brass transition-colors group-hover:text-brass-bright">
                  Read case study
                  <ArrowRightIcon className="text-sm transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>

            <div className="flex flex-col justify-between gap-8 rounded-2xl border border-brass/25 bg-brass/[0.06] p-7 sm:p-8">
              <p className="font-mono text-xs leading-relaxed text-muted">
                <span className="text-brass">$</span> HAVE A PROJECT IN MIND? I TURN IDEAS INTO
                SHIPPED PRODUCTS.
              </p>
              <Link
                href="/#contact"
                className="group inline-flex h-11 w-fit items-center gap-2 rounded-full bg-brass px-6 font-sans text-sm font-medium text-ink transition-colors hover:bg-brass-bright"
              >
                Start a project
                <ArrowRightIcon className="text-base transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}