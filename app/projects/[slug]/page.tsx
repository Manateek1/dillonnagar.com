import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyLayout from "@/components/projects/CaseStudyLayout";
import { projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.flatMap(({ slug, caseStudy }) => caseStudy ? [{ slug }] : []);
}

function projectWithCaseStudy(slug: string) {
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project?.caseStudy) notFound();

  return { project, caseStudy: project.caseStudy };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { project } = projectWithCaseStudy(slug);

  return {
    title: project.name,
    description: project.description,
    icons: project.icon ? { icon: { url: project.icon, type: "image/svg+xml", sizes: "any" } } : undefined,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const { project, caseStudy } = projectWithCaseStudy(slug);

  return <CaseStudyLayout project={project} caseStudy={caseStudy} />;
}
