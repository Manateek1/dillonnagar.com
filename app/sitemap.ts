import type { MetadataRoute } from "next";
import { projectCaseStudyPath, projects } from "@/data/projects";
import { siteUrl } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudies = projects.flatMap(({ slug, caseStudy }) =>
    caseStudy ? [projectCaseStudyPath(slug)] : [],
  );
  const paths = ["/", "/about", "/projects", ...caseStudies, "/experience", "/contact"];

  return paths.map((path) => ({ url: new URL(path, siteUrl).href }));
}
