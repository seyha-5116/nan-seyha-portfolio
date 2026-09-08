import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { TechIcon } from "@/components/tech-icons";
import { SectionDivider } from "@/components/section-divider";
import { SectionHeading } from "@/components/section";
import type { ProjectSummary } from "@/lib/types";

export function Projects({ projects }: { projects: ProjectSummary[] }) {
  return (
    <section id="projects" className="scroll-mt-24">
      <SectionDivider />
      <div className="mx-auto w-full max-w-[1120px] px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <SectionHeading index="04" label="Selected work" />
        </Reveal>

        {projects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.08} className="h-full">
                <ProjectCard project={project} index={index} count={projects.length} />
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

function ProjectCard({
  project,
  index,
  count,
}: {
  project: ProjectSummary;
  index: number;
  count: number;
}) {
  const live = project.status === "LIVE";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brass/40 hover:shadow-[0_24px_60px_-32px_rgba(201,161,92,0.3)]">
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`${project.name} case study`}
        className="block overflow-hidden"
      >
        <FigVisual index={index} live={live} image={project.image} name={project.name} count={count} />
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            <span className="text-brass">{String(index + 1).padStart(2, "0")}</span>
            {" / "}
            {String(count).padStart(2, "0")}
          </span>
          {live ? <LivePill /> : <DevPill />}
        </div>

        <h3 className="mt-4 font-display text-xl font-semibold">
          <Link
            href={`/projects/${project.slug}`}
            className="text-text transition-colors hover:text-brass"
          >
            {project.name}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.techTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface-2 px-3 py-1 font-mono text-[11px] text-muted transition-colors hover:border-brass hover:text-brass"
            >
              <TechIcon tech={tag} size={12} />
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-between gap-3 border-t border-line pt-5">
          <Link
            href={`/projects/${project.slug}`}
            className="group/cs inline-flex items-center gap-1.5 font-mono text-xs tracking-wide text-brass transition-colors hover:text-brass-bright"
          >
            Read case study
            <ArrowRightIcon className="text-sm transition-transform group-hover/cs:translate-x-1" />
          </Link>
          <div className="flex items-center gap-4">
            {live && project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs text-muted transition-colors hover:text-brass"
              >
                View live
                <ArrowUpRightIcon className="text-sm" />
              </a>
            ) : null}
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
    </article>
  );
}

function LivePill() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#4ade80]/25 bg-[#4ade80]/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[#4ade80]">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
      Live
    </span>
  );
}

function DevPill() {
  return (
    <span className="inline-flex items-center rounded-full border border-line-strong bg-surface-2 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
      In development
    </span>
  );
}

function FigVisual({
  index,
  live,
  image,
  name,
  count,
}: {
  index: number;
  live: boolean;
  image: string | null;
  name: string;
  count: number;
}) {
  return (
    <div className="relative aspect-[16/7] overflow-hidden bg-surface-2">
      {image ? (
        <>
          <Image
            src={image}
            alt={`${name} preview`}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            loading="lazy"
            style={{ filter: "saturate(0.85)" }}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent"
          />
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface-2 to-ink">
          <span className="font-mono text-2xl font-semibold text-line-strong">
            {name.slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}

      <span className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/10 bg-black/45 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
        Project {String(index + 1).padStart(2, "0")}
        <span className="mx-1.5 text-white/40">/</span>
        {String(count).padStart(2, "0")}
      </span>

      <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm">
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 rounded-full ${live ? "bg-[#4ade80]" : "bg-brass/60"}`}
        />
        <span className={live ? "text-[#4ade80]" : "text-brass"}>{live ? "Live" : "In dev"}</span>
      </span>
    </div>
  );
}