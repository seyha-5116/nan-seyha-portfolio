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
    image: "/projects/pixtoprompt.png",
  },
  {
    slug: "cambodia-explorer",
    name: "Cambodia Explorer",
    description:
      "A comprehensive travel platform for discovering Cambodia — explore ancient temples, tropical islands, authentic food, tours, verified local travel companies, an interactive map, and smart AI-powered itineraries.",
    techTags: ["React", "Tailwind CSS", "JavaScript"],
    status: "LIVE",
    liveUrl: "https://cambodia-explorer.vercel.app",
    repoUrl: null,
    image: "/projects/cambodia-explorer.png",
  },
  {
    slug: "led-events",
    name: "LED Events",
    description:
      "The most reliable event production system in Cambodia — premium concert, festival, and corporate event production with full service offerings.",
    techTags: ["React", "Tailwind CSS", "JavaScript"],
    status: "LIVE",
    liveUrl: "https://led-events-cambodia.vercel.app",
    repoUrl: null,
    image: "/projects/led-events.png",
  },
  {
    slug: "ministry-of-mines-and-energy",
    name: "Ministry of Mines & Energy",
    description:
      "An official bilingual portal (Khmer/English) of Cambodia's Ministry of Mines and Energy — mineral resources, geological data, and the nation's sustainable energy transition roadmap.",
    techTags: ["React", "Tailwind CSS", "JavaScript"],
    status: "LIVE",
    liveUrl: "https://ministry-of-mines-and-energy.vercel.app",
    repoUrl: null,
    image: "/projects/ministry-of-mines-and-energy.png",
  },
];