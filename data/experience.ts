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
    period: "July 2025 – Present",
    type: "professional",
    bullets: [
      "Architected and built a live rental property analytics SaaS platform as sole engineer",
      "Integrated OpenAI for property valuation insights and Stripe for subscription billing",
      "Deployed on Vercel with PostgreSQL backend; manages real-time market data pipelines",
    ],
    skills: ["Next.js", "Python", "PostgreSQL", "Stripe", "OpenAI", "Vercel"],
  },
  {
    title: "Private Wealth Management Intern",
    org: "Clarus Group",
    period: "May 2026 – June 2026",
    type: "professional",
    bullets: [
      "Supported wealth management advisors with client portfolio analysis and research",
      "Prepared financial summaries and market reports for client review meetings",
      "Gained exposure to high-net-worth client relationship management",
    ],
    skills: ["Financial Analysis", "Portfolio Research", "Client Relations"],
  },
  {
    title: "Internet Marketing & Operations Assistant",
    org: "Lakewood Ace Hardware",
    period: "Sept 2025 – Present",
    type: "professional",
    bullets: [
      "Manages digital marketing channels including social media and email campaigns",
      "Optimizes product listings and supports e-commerce operations",
      "Coordinates inventory and operational workflows for retail location",
    ],
    skills: ["Digital Marketing", "E-commerce", "Operations"],
  },
  {
    title: "Operations Assistant",
    org: "Acalanes Union High School District",
    period: "Aug 2024 – Present",
    type: "professional",
    bullets: [
      "Supports district operations with administrative and logistical coordination",
      "Assists with data management and internal communications",
    ],
    skills: ["Operations", "Administration"],
  },
];

export const leadership: ExperienceItem[] = [
  {
    title: "Treasurer & Director of Fundraising",
    org: "Acalanes Robotics / FRC Team 7686",
    period: "2024 – Present",
    type: "leadership",
    bullets: [
      "Manages team budget and financial tracking for a competitive robotics program",
      "Submitted a formal $3,000 sponsorship proposal to the Rotary Club of Lafayette",
      "Coordinates fundraising strategy and sponsor outreach to fund competition costs",
    ],
    skills: ["Budgeting", "Fundraising", "Sponsorship"],
  },
  {
    title: "Founder & Organizer",
    org: "Voices United",
    period: "2024 – Present",
    type: "leadership",
    bullets: [
      "Founded a community organization focused on student civic engagement",
      "Organizes events and initiatives that connect students with local community issues",
    ],
  },
];
