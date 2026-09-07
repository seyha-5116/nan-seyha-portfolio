import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.project.upsert({
    where: { slug: "pixtoprompt" },
    update: {},
    create: {
      slug: "pixtoprompt",
      name: "PixToPrompt",
      description:
        "A tool that converts images into detailed, production-ready prompts — turning a visual reference into precise, structured instructions for AI image generation.",
      techTags: ["Next.js", "TypeScript", "Tailwind CSS", "OpenAI API"],
      status: "LIVE",
      liveUrl: "https://pixtoprompt-5116.ai.studio",
      image: "/projects/pixtoprompt.png",
      order: 1,
    },
  });

  await prisma.project.upsert({
    where: { slug: "cambodia-explorer" },
    update: {},
    create: {
      slug: "cambodia-explorer",
      name: "Cambodia Explorer",
      description:
        "A comprehensive travel platform for discovering Cambodia — explore ancient temples, tropical islands, authentic food, tours, verified local travel companies, an interactive map, and smart AI-powered itineraries.",
      techTags: ["React", "Tailwind CSS", "JavaScript"],
      status: "LIVE",
      liveUrl: "https://cambodia-explorer.vercel.app",
      image: "/projects/cambodia-explorer.png",
      order: 2,
    },
  });

  await prisma.project.upsert({
    where: { slug: "led-events" },
    update: {},
    create: {
      slug: "led-events",
      name: "LED Events",
      description:
        "The most reliable event production system in Cambodia — premium concert, festival, and corporate event production with full service offerings.",
      techTags: ["React", "Tailwind CSS", "JavaScript"],
      status: "LIVE",
      liveUrl: "https://led-events-cambodia.vercel.app",
      image: "/projects/led-events.png",
      order: 3,
    },
  });

  await prisma.project.upsert({
    where: { slug: "ministry-of-mines-and-energy" },
    update: {},
    create: {
      slug: "ministry-of-mines-and-energy",
      name: "Ministry of Mines & Energy",
      description:
        "An official bilingual portal (Khmer/English) of Cambodia's Ministry of Mines and Energy — mineral resources, geological data, and the nation's sustainable energy transition roadmap.",
      techTags: ["React", "Tailwind CSS", "JavaScript"],
      status: "LIVE",
      liveUrl: "https://ministry-of-mines-and-energy.vercel.app",
      image: "/projects/ministry-of-mines-and-energy.png",
      order: 4,
    },
  });

  console.log("Seeded projects.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());