import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@/components/icons";
import { TechIcon } from "@/components/tech-icons";
import { getProjectBySlug, getProjects } from "@/lib/projects";

export const dynamicParams = true;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const live = project.status === "LIVE";

  return (
    <div className="mx-auto w-full max-w-[80%] px-4 pb-24 pt-32 sm:px-6 sm:pb-32">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-muted transition-colors hover:text-brass"
      >
        <ArrowLeftIcon className="text-sm" /> BACK TO PROJECTS
      </Link>

      <div className="mt-12 flex flex-wrap items-center gap-3">
        <span className="inline-flex h-8 items-center justify-center rounded-md border border-line-strong bg-surface-2 px-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brass">
          Case study
        </span>
        <span className="inline-flex h-8 items-center rounded-full border border-line-strong px-3.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
          <span
            aria-hidden="true"
            className={`mr-2 h-1.5 w-1.5 rounded-full ${live ? "bg-[#4ade80]" : "bg-brass"}`}
          />
          {live ? "Live" : "In development"}
        </span>
      </div>

      <h1 className="fluid-hero mt-6 font-display font-bold text-text">{project.name}</h1>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        {project.description}
      </p>

      <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface-2">
        {project.image ? (
          <div className="relative aspect-[16/7] w-full">
            <Image
              src={project.image}
              alt={`${project.name} preview`}
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
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
              {project.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {project.techTags.map((tag) => (
<span
            key={tag}
            className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-surface-2 px-3 py-1.5 font-mono text-xs text-muted"
          >
            <TechIcon tech={tag} />
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-brass px-7 font-sans text-sm font-medium text-ink transition-colors hover:bg-brass-bright"
          >
            VISIT LIVE PROJECT
            <ArrowUpRightIcon className="text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ) : null}
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-7 font-sans text-sm text-text transition-colors hover:border-brass hover:text-brass"
          >
            SOURCE CODE
          </a>
        ) : null}
        {!project.liveUrl && !project.repoUrl ? (
          <p className="font-mono text-xs leading-relaxed text-muted">
            IN ACTIVE DEVELOPMENT — DETAILS TO BE PUBLISHED WHEN IT SHIPS.
          </p>
        ) : null}
      </div>
    </div>
  );
}