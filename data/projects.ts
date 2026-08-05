export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  role: string;
  stack: string[];
  status: "live" | "prototype" | "in-development" | "in-progress";
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
    tagline: "Desktop privacy screen curtain for Windows and macOS",
    description:
      "A desktop app that covers all connected monitors with a PIN-protected curtain while background programs keep running. Designed for leaving automation, downloads, and servers running while the screen is hidden from view.",
    role: "Founder and developer — sole engineer",
    stack: ["Tauri", "Rust", "TypeScript", "GitHub Actions"],
    status: "live",
    githubUrl: "https://github.com/Manateek1/VisualCover",
    featured: true,
    caseStudy: "/projects/visualcover",
  },
  {
    slug: "larpchat-ai",
    name: "LarpChat AI",
    tagline: "Tier-based AI chat and image platform with full auth and rate limiting",
    description:
      "A full-stack AI web app with guest, free, and plus tiers. Supports chat and image generation, Supabase auth, IP-based guest limits, daily usage tracking, and structured server-side logging.",
    role: "Founder and developer — sole engineer",
    stack: ["React", "TypeScript", "Express", "Supabase", "OpenAI API", "Vercel"],
    status: "live",
    liveUrl: "https://larpchatai.vercel.app",
    githubUrl: "https://github.com/Manateek1/larpchatai",
    featured: false,
    caseStudy: "/projects/larpchat-ai",
  },
  {
    slug: "chudgames",
    name: "ChudGames",
    tagline: "Browser game launcher with 10 playable games",
    description:
      "A web game launcher and arcade suite featuring 10 playable games built on a shared engine. Includes Neon Dodger, Asteroids Pulse, FortLite, Pong, and more — with daily challenges, achievements, and mobile support.",
    role: "Founder and developer — sole engineer",
    stack: ["React", "Vite", "TypeScript", "WebAudio API"],
    status: "live",
    liveUrl: "https://chudgames.vercel.app",
    githubUrl: "https://github.com/Manateek1/ChudGames",
    featured: false,
    caseStudy: "/projects/chudgames",
  },
  {
    slug: "capital-in-code",
    name: "Capital in Code",
    tagline: "A portfolio of coding and investing experiments",
    description:
      "A public portfolio of quantitative research projects exploring market questions with code, financial data, models, and written analysis. First project: CIC-001, The Overnight Effect.",
    role: "Founder and researcher",
    stack: ["Python", "Data Analysis", "Financial Modeling"],
    status: "in-development",
    githubUrl: "https://github.com/Manateek1/Capital-in-Code",
    featured: false,
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
