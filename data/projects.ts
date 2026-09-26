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
    slug: "capital-in-code",
    name: "Capital in Code",
    tagline: "Code-based market research with clear methods and limits",
    description:
      "A public portfolio of investing and quantitative research projects. CIC-001 studies historical SPY overnight and regular-hours returns; CIC-002, CycleQuant, is a Bitcoin paper-trading experiment. The work is educational research, not evidence of a profitable strategy.",
    role: "Founder, researcher, and developer",
    stack: ["Python", "FastAPI", "Quantitative Research"],
    status: "live",
    liveUrl: "https://capitalincode.com",
    githubUrl: "https://github.com/Manateek1/Capital-in-Code",
    featured: true,
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
    slug: "nexus-forge",
    name: "Nexus Forge",
    tagline: "Private Windows desktop workspace for local language models",
    description:
      "An Electron desktop app for chatting with models that run on your own PC through Ollama. It discovers local models, sends prompts only to the local Ollama server, and builds a Windows installer without bundling model weights or chat data.",
    role: "Founder and developer",
    stack: ["Electron", "React", "Vite", "Ollama", "Windows"],
    status: "prototype",
    githubUrl: "https://github.com/Manateek1/NexusForge",
    featured: false,
  },
  {
    slug: "larpchat-ai",
    name: "LarpChat AI",
    tagline: "Live AI chat and image-generation demo",
    description:
      "A live AI chat and image-generation demo, currently in active development.",
    role: "Founder and developer",
    stack: [],
    status: "live",
    liveUrl: "https://larpchatai.vercel.app",
    featured: false,
    caseStudy: "/projects/larpchat-ai",
  },
  {
    slug: "chudgames",
    name: "ChudGames",
    tagline: "Browser arcade built on a shared game engine",
    description:
      "A browser game launcher and arcade built on a shared engine, with original games, daily challenges, and local achievements.",
    role: "Founder and developer — sole engineer",
    stack: ["React", "Vite", "TypeScript", "WebAudio API"],
    status: "live",
    liveUrl: "https://chudgames.vercel.app",
    githubUrl: "https://github.com/Manateek1/ChudGames",
    featured: false,
    caseStudy: "/projects/chudgames",
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
