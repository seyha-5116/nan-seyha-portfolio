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
      order: 1,
    },
  });

  await prisma.project.upsert({
    where: { slug: "next-project" },
    update: {},
    create: {
      slug: "next-project",
      name: "Next project",
      description:
        "An unreleased project currently in active development. This card will be updated with a live link the moment it ships.",
      techTags: ["TBA"],
      status: "IN_DEVELOPMENT",
      order: 2,
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