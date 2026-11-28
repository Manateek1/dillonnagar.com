type SkillGroup = {
  topic: string;
  skills: readonly string[];
  onHomepage?: boolean;
  example?: { label: string; href: string };
};

export const skillGroups: readonly SkillGroup[] = [
  {
    topic: "Web development",
    onHomepage: true,
    skills: [
      "JavaScript", "TypeScript", "React", "Next.js", "HTML", "CSS", "Vite", "Tailwind CSS",
      "Responsive layout", "Keyboard-accessible interfaces", "UI prototyping",
    ],
    example: { label: "Browse my projects", href: "/projects" },
  },
  {
    topic: "Data science",
    onHomepage: true,
    skills: [
      "Python", "pandas", "Data cleaning", "Exploratory data analysis", "Data visualization",
      "Time series analysis", "CSV processing", "Research documentation", "Recharts",
    ],
    example: { label: "Capital in Code", href: "/projects/capital-in-code" },
  },
  {
    topic: "Finance & investing",
    onHomepage: true,
    skills: [
      "Excel", "DCF modeling", "Equity research", "Fixed-income research", "Investment analysis",
      "Retirement projections", "Trust-disbursement modeling", "Client-facing financial analysis",
      "Historical returns analysis", "Backtesting", "Volatility analysis", "Sharpe ratios",
      "Drawdown analysis", "Yield-curve analysis", "Paper trading", "Order reconciliation",
    ],
    example: { label: "Market research", href: "/projects/capital-in-code" },
  },
  {
    topic: "Desktop development",
    onHomepage: true,
    skills: [
      "Swift", "SwiftUI", "Rust", "Tauri", "Electron", "macOS development", "Windows development",
      "Multi-monitor window management", "System tray controls", "File scanning",
      "Duplicate-file detection", "SHA-256 hashing", "Desktop packaging",
    ],
    example: { label: "VisualCover", href: "/projects/visualcover" },
  },
  {
    topic: "Leadership & outreach",
    onHomepage: true,
    skills: [
      "Event planning", "Sponsorship outreach", "Public speaking", "Partnership development",
      "Hackathon organization", "Judge and mentor coordination", "Sponsorship proposals",
      "Club leadership", "Student workshop planning", "Team outreach",
    ],
    example: { label: "Acalanes Data Science Club", href: "/experience#data-science-club" },
  },
  {
    topic: "Robotics & engineering",
    onHomepage: true,
    skills: [
      "Robot programming", "Mechanical prototyping", "Team logistics", "FTC event support",
      "Mentoring younger teammates", "Engineering outreach",
    ],
    example: { label: "Acabots", href: "/experience#acabots" },
  },
  {
    topic: "Backend & databases",
    skills: [
      "REST APIs", "FastAPI", "Node.js", "Express", "Supabase", "PostgreSQL", "Vercel Functions",
      "Authentication", "API usage limits", "Row-level security", "Stripe billing",
      "Subscription management", "Alpaca API integration",
    ],
    example: { label: "RentMax AI", href: "/projects/rentmax-ai" },
  },
  {
    topic: "Generative AI & agents",
    skills: [
      "OpenAI API", "Prompt design", "LLM API integration", "AI-generated report summaries",
      "AI chat interfaces", "Image generation", "Ollama", "Local LLMs",
      "Model Context Protocol (MCP)", "AI agent workflow testing", "Tool failure simulation",
      "JSON-RPC",
    ],
    example: { label: "Toolstorm", href: "https://github.com/Manateek1/toolstorm" },
  },
  {
    topic: "Testing & deployment",
    skills: [
      "Git", "GitHub", "GitHub Actions", "Vercel", "Sentry", "Playwright", "Vitest",
      "React Testing Library", "ESLint", "Browser testing", "CI/CD", "Production debugging",
    ],
  },
  {
    topic: "Real estate analysis",
    skills: [
      "Rental-property underwriting", "Rent estimation", "Comparable property analysis",
      "Cash-flow modeling", "Net operating income", "Cap rates", "Cash-on-cash returns",
      "Financing and vacancy scenarios", "PDF and CSV report exports",
    ],
    example: { label: "RentMax AI case study", href: "/projects/rentmax-ai" },
  },
  {
    topic: "Browser games & 3D",
    skills: [
      "Three.js", "Browser game development", "Web Audio API", "Web Workers", "IndexedDB",
      "Procedural world generation", "Mesh generation", "Game physics", "3D rendering",
      "Keyboard, gamepad, and touch controls", "Save systems",
    ],
    example: { label: "ChudGames", href: "/projects/chudgames" },
  },
  {
    topic: "Marketing & operations",
    skills: [
      "Digital marketing", "Paid search advertising", "Social media content", "Online listings",
      "Customer review management", "Retail customer service", "Point-of-sale operations",
      "Website and competitor audits", "Game announcements", "Scoreboard and shot-clock operation",
      "Venue access coordination", "Event equipment setup",
    ],
    example: { label: "Ace Hardware", href: "/experience#ace-hardware" },
  },
  {
    topic: "Teaching & community service",
    skills: [
      "English conversation tutoring", "Lesson and activity planning", "Volunteer coordination",
      "Library partnerships", "Resident activity support", "Technology assistance",
      "Website maintenance", "Administrative support",
    ],
    example: { label: "Voices United", href: "/experience#voices-united" },
  },
  {
    topic: "Writing, music & athletics",
    skills: [
      "Letter-to-the-editor writing", "Research writing", "Financial presentations",
      "Clarinet performance", "Concert band", "Competitive swimming",
    ],
    example: { label: "Lamorinda Weekly editorial", href: "/#editorial" },
  },
];
