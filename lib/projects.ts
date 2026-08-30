import { getPrisma } from "./prisma";
import { seedProjects } from "./seed-projects";
import type { ProjectStatus, ProjectSummary } from "./types";

function toSummary(row: {
  slug: string;
  name: string;
  description: string;
  techTags: string[];
  status: string;
  liveUrl: string | null;
  repoUrl: string | null;
}): ProjectSummary {
  return {
    slug: row.slug,
    name: row.name,
    description: row.description,
    techTags: row.techTags,
    status: (row.status === "LIVE" ? "LIVE" : "IN_DEVELOPMENT") as ProjectStatus,
    liveUrl: row.liveUrl,
    repoUrl: row.repoUrl,
  };
}

export async function getProjects(): Promise<ProjectSummary[]> {
  const db = getPrisma();
  if (!db) return seedProjects;
  try {
    const rows = await db.project.findMany({ orderBy: { order: "asc" } });
    if (!rows.length) return seedProjects;
    return rows.map(toSummary);
  } catch (error) {
    console.warn("[projects] Database unreachable, falling back to seed data.", error);
    return seedProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectSummary | null> {
  const db = getPrisma();
  if (!db) return seedProjects.find((p) => p.slug === slug) ?? null;
  try {
    const row = await db.project.findUnique({ where: { slug } });
    if (!row) return null;
    return toSummary(row);
  } catch (error) {
    console.warn("[projects] Database unreachable, falling back to seed data.", error);
    return seedProjects.find((p) => p.slug === slug) ?? null;
  }
}