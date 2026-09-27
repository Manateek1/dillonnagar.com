export type ExperienceItem = {
  title: string;
  org: string;
  period: string;
  type: "professional" | "leadership";
  bullets: string[];
  skills?: string[];
};

export const experience: ExperienceItem[] = [
  {
    title: "Founder & Developer",
    org: "RentMax AI",
    period: "2024 – Present",
    type: "professional",
    bullets: [
      "Architected and built a live rental property analytics SaaS platform as sole engineer",
      "Implemented rent estimation, cash flow analysis, cap rate, and cash-on-cash return calculations with AI explanations",
      "Integrated Stripe for subscription billing and Supabase for auth and data with Row Level Security",
      "Deployed on Vercel with Sentry for error monitoring; manages ongoing production stability",
    ],
    skills: ["React", "Vite", "TypeScript", "Supabase", "Stripe", "Sentry", "Vercel"],
  },
  {
    title: "Private Wealth Management Intern",
    org: "Clarus Wealth Group",
    period: "Summer 2026",
    type: "professional",
    bullets: [
      "Completed a private wealth management internship at a firm in Houston",
      "Gained exposure to commercial real estate, estate planning, trusts, and retirement planning",
      "Supported competitor analysis and prepared materials for client review sessions",
      "Participated in pro bono financial planning sessions and advisor-client meetings",
    ],
    skills: ["Financial Analysis", "Estate Planning", "Portfolio Research"],
  },
  {
    title: "Digital Marketing & Operations",
    org: "Ace Hardware",
    period: "Current",
    type: "professional",
    bullets: [
      "Supports digital operations through social media content, customer-review responses, paid search, and online listings",
      "Assists with marketing planning and related store operations",
    ],
    skills: ["Digital Marketing", "Social Media", "E-commerce"],
  },
  {
    title: "Athletic Assistant",
    org: "Acalanes Union High School District",
    period: "Since 2024",
    type: "professional",
    bullets: [
      "Supports game and school-event logistics, including announcements, scoreboard and shot-clock operation, and event setup",
      "Helps with entrances, equipment, and event setup and breakdown",
    ],
    skills: ["Event Operations", "Logistics"],
  },
];

export const leadership: ExperienceItem[] = [
  {
    title: "Logistics Lead",
    org: "Acalanes High School Robotics · 24689 - Acabots",
    period: "2025 – Present",
    type: "leadership",
    bullets: [
      "Coordinates partnerships, operations, outreach, and social media for the team",
      "Supports mentor connections, company visits, and team logistics",
      "Mentors younger students and contributes to mechanical design and prototyping",
    ],
    skills: ["Partnerships", "Operations", "Outreach", "Social Media", "Mentorship"],
  },
  {
    title: "Founder & President",
    org: "Acalanes Data Science Club",
    period: "Aug 2026 – Present",
    type: "leadership",
    bullets: [
      "Founded a beginner-friendly, project-driven club focused on data, AI, and code",
      "Introduces members to a question-to-insight workflow through small projects",
    ],
    skills: ["Data Science", "Project Leadership"],
  },
  {
    title: "Founder & Organizer",
    org: "Voices United",
    period: "2025 – Present",
    type: "leadership",
    bullets: [
      "Founded a beginner-friendly English conversation and tutoring program for young English learners",
      "Organizes in-person and online sessions and prepares conversation activities",
      "Coordinates with local organizers and supports volunteer participation",
    ],
  },
];
