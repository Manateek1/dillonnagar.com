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
      { name: "Python", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
      { name: "HTML/CSS" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "Next.js", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
      { name: "React", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
      { name: "Tailwind CSS", proofProject: "DropSplit AI" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
      { name: "REST APIs", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "PostgreSQL", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
    ],
  },
  {
    category: "Payments",
    skills: [
      { name: "Stripe", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
    ],
  },
  {
    category: "AI / ML",
    skills: [
      { name: "OpenAI API", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
      { name: "Prompt Engineering", proofProject: "VisualCover", proofSlug: "visualcover" },
    ],
  },
  {
    category: "Desktop",
    skills: [
      { name: "Electron", proofProject: "VisualCover", proofSlug: "visualcover" },
    ],
  },
  {
    category: "Deployment",
    skills: [
      { name: "Vercel", proofProject: "RentMax AI", proofSlug: "rentmax-ai" },
      { name: "GitHub Actions" },
      { name: "Git" },
    ],
  },
  {
    category: "Finance & Operations",
    skills: [
      { name: "Financial Analysis", proofProject: "Clarus Group" },
      { name: "Budgeting", proofProject: "Acalanes Robotics" },
      { name: "Digital Marketing", proofProject: "Lakewood Ace Hardware" },
    ],
  },
];
