export type Skill = {
  name: string;
  proofProject?: string;
  proofSlug?: string;
};

export type SkillCategory = {
  category: string;
  skills: Skill[];
};

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "JavaScript", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
      { name: "TypeScript", proofProject: "LarpChat AI", proofSlug: "larpchat-ai" },
      { name: "Rust", proofProject: "VisualCover", proofSlug: "visualcover" },
      { name: "Python" },
      { name: "HTML/CSS" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
      { name: "Vite", proofProject: "ChudGames", proofSlug: "chudgames" },
      { name: "Next.js", proofProject: "DropSplit AI" },
      { name: "Tailwind CSS", proofProject: "DropSplit AI" },
      { name: "Recharts", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
    ],
  },
  {
    category: "Backend & APIs",
    skills: [
      { name: "Supabase", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
      { name: "Vercel Functions", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
      { name: "Express", proofProject: "LarpChat AI", proofSlug: "larpchat-ai" },
      { name: "REST APIs", proofProject: "LarpChat AI", proofSlug: "larpchat-ai" },
    ],
  },
  {
    category: "Payments",
    skills: [
      { name: "Stripe", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
    ],
  },
  {
    category: "AI",
    skills: [
      { name: "OpenAI API", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
      { name: "Model Tier Routing", proofProject: "LarpChat AI", proofSlug: "larpchat-ai" },
      { name: "Prompt Injection Defense", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
    ],
  },
  {
    category: "Desktop & Games",
    skills: [
      { name: "Tauri", proofProject: "VisualCover", proofSlug: "visualcover" },
      { name: "Canvas / WebAudio", proofProject: "ChudGames", proofSlug: "chudgames" },
    ],
  },
  {
    category: "Security",
    skills: [
      { name: "Row Level Security", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
      { name: "Rate Limiting", proofProject: "LarpChat AI", proofSlug: "larpchat-ai" },
      { name: "Argon2id Hashing", proofProject: "VisualCover", proofSlug: "visualcover" },
    ],
  },
  {
    category: "Testing & Deployment",
    skills: [
      { name: "Playwright", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
      { name: "Vitest", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
      { name: "GitHub Actions", proofProject: "VisualCover", proofSlug: "visualcover" },
      { name: "Vercel", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
      { name: "Sentry", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
    ],
  },
  {
    category: "Finance & Operations",
    skills: [
      { name: "Financial Analysis", proofProject: "Clarus Wealth Group" },
      { name: "Budgeting", proofProject: "Acalanes Robotics" },
      { name: "Digital Marketing", proofProject: "Lakewood Ace Hardware" },
    ],
  },
];
