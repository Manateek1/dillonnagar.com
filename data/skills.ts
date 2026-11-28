type SkillGroup = {
  topic: string;
  skills: readonly string[];
};

export const skillGroups: readonly SkillGroup[] = [
  {
    topic: "Web & backend development",
    skills: [
      "JavaScript", "TypeScript", "React", "Next.js", "Vite", "Tailwind CSS",
      "REST APIs", "FastAPI", "Supabase", "PostgreSQL",
    ],
  },
  {
    topic: "Data science & AI",
    skills: [
      "Python", "pandas", "Data cleaning", "Exploratory data analysis",
      "Data visualization", "LLM API integration",
    ],
  },
  {
    topic: "Finance & investing",
    skills: [
      "Excel", "DCF modeling", "Equity and fixed-income research", "Investment analysis",
      "Rental property underwriting", "Historical returns analysis", "Backtesting",
    ],
  },
  {
    topic: "Desktop development & tooling",
    skills: ["Swift", "SwiftUI", "Electron", "Tauri", "Git", "GitHub Actions", "Vercel"],
  },
  {
    topic: "Leadership & outreach",
    skills: ["Event planning", "Sponsorship outreach", "Public speaking", "Digital marketing"],
  },
  {
    topic: "Robotics & engineering",
    skills: ["Robot programming", "Mechanical prototyping", "Team logistics"],
  },
];
