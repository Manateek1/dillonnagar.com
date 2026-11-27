type Skill = {
  name: string;
  evidence: string;
  href: string;
};

export const skills: readonly Skill[] = [
  { name: "JavaScript", evidence: "RentMax AI analysis app", href: "/projects/rentmax-ai" },
  { name: "TypeScript", evidence: "ChudGames game engine", href: "/projects/chudgames" },
  { name: "Python", evidence: "Capital in Code research scripts", href: "/projects/capital-in-code" },
  { name: "React", evidence: "ChudGames launcher and game shell", href: "/projects/chudgames" },
  { name: "FastAPI", evidence: "CycleQuant paper-trading service", href: "/projects/capital-in-code" },
  { name: "Supabase", evidence: "RentMax AI accounts and saved reports", href: "/projects/rentmax-ai" },
  { name: "Git and GitHub", evidence: "VisualCover release workflow", href: "/projects/visualcover" },
  { name: "Excel", evidence: "Clarus Wealth Group retirement projections", href: "/experience#clarus-wealth-group" },
  { name: "Financial modeling", evidence: "RentMax AI rental underwriting", href: "/projects/rentmax-ai" },
  { name: "Investment analysis", evidence: "Capital in Code SPY return study", href: "/projects/capital-in-code" },
  { name: "SwiftUI", evidence: "Mac Cleaner scan and review interface", href: "/projects/mac-cleaner" },
];
