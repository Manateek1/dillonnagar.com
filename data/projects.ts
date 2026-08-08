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
    stack: ["React", "Vite", "Supabase", "Stripe", "OpenAI", "Sentry", "Vercel"],
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
    tagline: "Independent quantitative research at the intersection of markets and code",
    description:
      "An independent research portfolio that explores investing questions with code, financial data, charts, and plain-language analysis. CIC-001, The Overnight Effect, examines where SPY's historical adjusted growth occurred.",
    role: "Founder and researcher",
    stack: ["Python", "Quantitative Research", "Financial Modeling"],
    status: "live",
    liveUrl: "https://capitalincode.vercel.app",
    githubUrl: "https://github.com/Manateek1/Capital-in-Code",
    featured: false,
  },
  {
    slug: "dropsplit-ai",
    name: "DropSplit AI",
    tagline: "AI swim coaching platform for middle and high school swimmers",
    description:
      "A chat-first AI swim coach that generates weekly training plans, explains sets, recommends event focus, logs swim times from natural language, and charts progress over time. MVP stage.",
    role: "Founder and developer",
    stack: ["Next.js", "TypeScript", "Supabase", "OpenAI", "Stripe", "Tailwind CSS"],
    status: "in-development",
    githubUrl: "https://github.com/Manateek1/DropSplitAI",
    featured: false,
  },
  {
    slug: "altofi",
    name: "AltoFi",
    tagline: "Frontend concept for a financial technology product",
    description:
      "A frontend-only React and Vite framework for a fintech concept — design system, marketing pages, and a dashboard preview. Deliberately handles no money, accounts, or sensitive data. Prototype stage.",
    role: "Founder and developer",
    stack: ["React", "Vite", "TypeScript"],
    status: "prototype",
    githubUrl: "https://github.com/Manateek1/Altofi",
    featured: false,
  },
];
