import type { ProjectSummary } from "./types";

export const seedProjects: ProjectSummary[] = [
  {
    slug: "pixtoprompt",
    name: "PixToPrompt",
    description:
      "A tool that converts images into detailed, production-ready prompts — turning a visual reference into precise, structured instructions for AI image generation.",
    techTags: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI API"],
    status: "LIVE",
    liveUrl: "https://pixtoprompt-5116.ai.studio",
    repoUrl: null,
  },
  {
    slug: "next-project",
    name: "Next project",
    description:
      "An unreleased project currently in active development. This card will be updated with a live link the moment it ships.",
    techTags: ["TBA"],
    status: "IN_DEVELOPMENT",
    liveUrl: null,
    repoUrl: null,
  },
];