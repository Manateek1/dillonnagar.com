import { caseStudies, type ProjectCaseStudy } from "./project-case-studies";

export type ProjectStatus = "live" | "preview" | "prototype" | "in-development" | "in-progress";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  role: string;
  stack: readonly string[];
  themes?: readonly string[];
  status: ProjectStatus;
  icon?: string;
  liveUrl?: string;
  liveLabel?: string;
  githubUrl?: string;
  releaseUrl?: string;
  releaseNote?: string;
  caseStudy?: ProjectCaseStudy;
};

export const projectStatusLabel: Record<ProjectStatus, string> = {
  live: "Published",
  preview: "Developer preview",
  prototype: "Prototype",
  "in-development": "In development",
  "in-progress": "In progress",
};

export function projectCaseStudyPath(slug: string) {
  return `/projects/${slug}`;
}

export const projects: readonly Project[] = [
  {
    slug: "capital-in-code",
    name: "Capital in Code",
    tagline: "Independent market research with code and historical data",
    description:
      "I publish the methods and code behind my market research. I compared overnight and intraday SPY returns, built CycleQuant to track Bitcoin paper orders, and studied when Treasury yield-curve inversions preceded recessions.",
    role: "Founder, researcher, and developer",
    stack: ["Python", "pandas", "FastAPI", "Alpaca API"],
    themes: ["SPY research", "Historical returns", "Paper trading"],
    status: "live",
    liveUrl: "https://capitalincode.com",
    liveLabel: "Read the research",
    githubUrl: "https://github.com/Manateek1/Capital-in-Code",
    caseStudy: caseStudies.capitalInCode,
  },
  {
    slug: "rentmax-ai",
    name: "RentMax AI",
    tagline: "Rental-property analysis for landlords and investors",
    description:
      "Enter a property address to estimate rent, then adjust vacancy, expenses, and financing to see how each assumption affects monthly cash flow, cap rate, and cash-on-cash return. The app lets you save and compare scenarios and export reports as PDF or CSV.",
    role: "Founder and sole developer",
    stack: ["JavaScript", "React", "Vite", "Supabase", "Stripe", "OpenAI", "Sentry", "Vercel"],
    themes: ["Rent ranges", "Cash flow", "Property returns"],
    status: "live",
    liveUrl: "https://rentmaxai.com",
    liveLabel: "Try RentMax AI",
    caseStudy: caseStudies.rentmaxAI,
  },
  {
    slug: "chudgames",
    name: "ChudGames",
    icon: "/images/brands/chudgames.svg",
    tagline: "Browser arcade built on a shared game engine",
    description:
      "A browser arcade that includes the Apex Run time trial and the BuildBlox sandbox. I built a shared launcher, game controls, and audio tools so each game can focus on its own mechanics. The browser keeps high scores, achievements, and progress.",
    role: "Founder and sole developer",
    stack: ["React", "Vite", "TypeScript", "Web Audio", "IndexedDB"],
    status: "live",
    liveUrl: "https://chudgames.vercel.app",
    liveLabel: "Play ChudGames",
    githubUrl: "https://github.com/Manateek1/ChudGames",
    caseStudy: caseStudies.chudGames,
  },
  {
    slug: "mac-cleaner",
    name: "Mac Cleaner",
    tagline: "Native macOS utility for finding files worth reviewing",
    description:
      "A SwiftUI utility that finds duplicates, large and old files, and recognized caches on a Mac. Scans are read-only. Users review what each file is, select the items they want to remove, and confirm before anything moves to Trash.",
    role: "Founder and developer",
    stack: ["Swift", "SwiftUI", "macOS", "GitHub Actions"],
    themes: ["Native macOS", "Local file review", "Safety and privacy"],
    status: "preview",
    githubUrl: "https://github.com/Manateek1/MacCleaner",
    releaseUrl: "https://github.com/Manateek1/MacCleaner/releases/tag/v0.5.9-preview.1",
    releaseNote: "Version 0.5.9 requires Apple silicon and macOS Tahoe 26 or later. The developer preview uses ad-hoc signing.",
    caseStudy: caseStudies.macCleaner,
  },
  {
    slug: "visualcover",
    name: "VisualCover",
    tagline: "Desktop privacy curtain for Windows and macOS",
    description:
      "A desktop app that covers connected monitors while downloads, scheduled tasks, and other background programs keep running. A PIN removes the curtain. I built it for times when I want an active desktop session out of view.",
    role: "Founder and sole developer",
    stack: ["Tauri", "Rust", "TypeScript", "GitHub Actions"],
    themes: ["Privacy", "Desktop tools", "Automation"],
    status: "live",
    githubUrl: "https://github.com/Manateek1/VisualCover",
    caseStudy: caseStudies.visualCover,
  },
  {
    slug: "larpchat-ai",
    name: "LarpChat AI",
    tagline: "Browser demo for AI chat and image generation",
    description:
      "A demo for trying chat and image generation from one interface. I built the frontend and API that handle model selection, sign-in, and per-session usage limits.",
    role: "Founder and developer",
    stack: ["React", "TypeScript", "Express", "Supabase", "OpenAI"],
    status: "live",
    liveUrl: "https://larpchatai.vercel.app",
    liveLabel: "Open demo",
    caseStudy: caseStudies.larpChatAI,
  },
  {
    slug: "nexus-forge",
    name: "Nexus Forge",
    tagline: "Windows desktop chat for local language models",
    description:
      "An Electron app that discovers models already installed through Ollama and connects to the local Ollama server for chat. I built the desktop interface and Windows installer so users can choose a model they already have on their PC.",
    role: "Founder and developer",
    stack: ["Electron", "React", "Vite", "Ollama", "Windows"],
    status: "prototype",
    githubUrl: "https://github.com/Manateek1/NexusForge",
  },
  {
    slug: "dropsplit-ai",
    name: "DropSplit AI",
    tagline: "Swim coaching prototype for middle and high school swimmers",
    description:
      "A chat-first coaching app that suggests weekly swim sets, explains their purpose, and helps swimmers choose events to focus on. Swimmers can log times in plain language and see their progress over time.",
    role: "Founder and developer",
    stack: ["Next.js", "TypeScript", "Supabase", "OpenAI", "Stripe", "Tailwind CSS"],
    status: "in-development",
    githubUrl: "https://github.com/Manateek1/DropSplitAI",
  },
  {
    slug: "altofi",
    name: "AltoFi",
    tagline: "Frontend concept for a financial technology product",
    description:
      "A React and Vite prototype for exploring the design of a fintech product. I built reusable interface components, marketing pages, and a dashboard with sample data to test the layout and navigation.",
    role: "Founder and developer",
    stack: ["React", "Vite", "TypeScript"],
    status: "prototype",
    githubUrl: "https://github.com/Manateek1/Altofi",
  },
];
