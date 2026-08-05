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
      { name: "TypeScript", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
      { name: "JavaScript", proofProject: "VisualCover", proofSlug: "visualcover" },
      { name: "Python" },
      { name: "HTML/CSS", proofProject: "VisualCover", proofSlug: "visualcover" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
      { name: "Vite", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
      { name: "Next.js", proofProject: "DropSplit AI" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    category: "Backend & APIs",
    skills: [
      { name: "Supabase", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
      { name: "Vercel Functions", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
      { name: "REST APIs", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
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
      { name: "OpenAI API", proofProject: "VisualCover", proofSlug: "visualcover" },
      { name: "Prompt Engineering", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
    ],
  },
  {
    category: "Desktop",
    skills: [
      { name: "Electron", proofProject: "VisualCover", proofSlug: "visualcover" },
    ],
  },
  {
    category: "Monitoring & Deployment",
    skills: [
      { name: "Sentry", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
      { name: "Vercel", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
      { name: "Git / GitHub" },
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
