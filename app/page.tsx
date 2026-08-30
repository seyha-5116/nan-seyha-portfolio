import type { Metadata } from "next";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Ticker } from "@/components/ticker";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Hero />
      <Ticker />
      <About />
      <Skills />
      <Projects projects={projects} />
      <Contact />
    </>
  );
}