import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/case-study-layout";
import { caseStudies, getCaseStudy, getNextCaseStudy } from "@/lib/case-studies";

export const dynamicParams = true;

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const current = getCaseStudy(slug);
  if (!current) return {};
  return {
    title: `${current.name} — Case study`,
    description: current.oneLiner,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${current.name} — Case study`,
      description: current.oneLiner,
      url: `/projects/${slug}`,
      type: "article",
      images: current.image
        ? [{ url: current.image, alt: `${current.name} case study preview` }]
        : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const current = getCaseStudy(slug);
  if (!current) notFound();

  const next = getNextCaseStudy(slug);

  return (
    <CaseStudyLayout
      current={current}
      index={current.index}
      count={caseStudies.length}
      next={next}
    />
  );
}