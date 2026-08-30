import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@/components/icons";
import { getProjectBySlug, getProjects } from "@/lib/projects";

export const dynamicParams = false;

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
    <div className="mx-auto w-full max-w-[1120px] px-4 pb-24 pt-32 sm:px-6 sm:pb-32">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-muted transition-colors hover:text-brass"
      >
        <ArrowLeftIcon className="text-sm" /> BACK TO PROJECTS
      </Link>

      <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs tracking-widest text-muted">
        <span className="text-brass">CASE STUDY</span>
        <span aria-hidden="true" className="h-px w-8 bg-line" />
        <span>{live ? "STATUS — LIVE" : "STATUS — IN DEVELOPMENT"}</span>
      </div>

      <h1 className="fluid-hero mt-6 font-display font-bold text-text">{project.name}</h1>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
        {project.description}
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {project.techTags.map((tag) => (
          <span
            key={tag}
            className="border border-line px-2.5 py-1 font-mono text-xs text-muted"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-12 items-center gap-2 bg-brass px-6 font-mono text-sm text-ink transition-colors hover:bg-brass-bright"
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
            className="inline-flex h-12 items-center gap-2 border border-line-strong px-6 font-mono text-sm text-text transition-colors hover:border-brass hover:text-brass"
          >
            SOURCE CODE
          </a>
        ) : null}
        {!project.liveUrl && !project.repoUrl ? (
          <p className="font-mono text-xs leading-relaxed text-muted">
            STATUS: IN ACTIVE DEVELOPMENT — DETAILS TO BE PUBLISHED WHEN IT SHIPS.
          </p>
        ) : null}
      </div>
    </div>
  );
}