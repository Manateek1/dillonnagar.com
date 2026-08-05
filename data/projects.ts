export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  role: string;
  stack: string[];
  status: "live" | "prototype" | "in-progress";
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  image?: string;
  caseStudy?: string;
};

export const projects: Project[] = [
  {
    slug: "rentmax-ai",
    name: "RentMax AI",
    tagline: "Rental property analysis platform with AI-driven insights",
    description:
      "A live SaaS platform that helps landlords and property investors analyze rent ranges, cash flow, cap rate, and returns — with AI explanations and exportable reports.",
    role: "Founder and developer — sole engineer across frontend, backend, and infrastructure",
    stack: ["React", "Vite", "TypeScript", "Supabase", "Stripe", "Sentry", "Vercel"],
    status: "live",
    liveUrl: "https://rentmaxai.com",
    featured: true,
    caseStudy: "/projects/rentmax-ai",
  },
  {
    slug: "visualcover",
    name: "VisualCover",
    tagline: "Desktop app for generating AI-tailored cover letters",
    description:
      "A cross-platform desktop application that generates tailored cover letters using AI, with a clean UI and PDF export. Built with Electron and released on GitHub.",
    role: "Founder and developer — sole engineer",
    stack: ["Electron", "JavaScript", "HTML/CSS", "OpenAI API"],
    status: "live",
    githubUrl: "https://github.com/Manateek1/VisualCover",
    featured: true,
    caseStudy: "/projects/visualcover",
  },
  {
    slug: "dropsplit-ai",
    name: "DropSplit AI",
    tagline: "AI-assisted expense splitting for groups",
    description:
      "A Next.js MVP for intelligent group expense splitting. Prototype stage — core scaffold complete.",
    role: "Founder and developer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "prototype",
    featured: false,
  },
  {
    slug: "altofi",
    name: "AltoFi",
    tagline: "Personal finance dashboard for young adults",
    description:
      "A prototype personal finance dashboard focused on budgeting and financial literacy for students and young adults.",
    role: "Founder and developer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "prototype",
    featured: false,
  },
];
