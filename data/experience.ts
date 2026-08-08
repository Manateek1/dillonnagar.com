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
    title: "Internet Marketing & Operations",
    org: "Lakewood Ace Hardware",
    period: "Sept 2025 – Present",
    type: "professional",
    bullets: [
      "Creates and manages social media content and digital marketing for a local hardware store",
      "Writes customer-facing responses and handles community-oriented online communications",
      "Supports e-commerce operations and inventory coordination",
    ],
    skills: ["Digital Marketing", "Social Media", "E-commerce"],
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
      "Manages team budget and financial tracking for a competitive FIRST Robotics program",
      "Submitted a formal $3,000+ sponsorship proposal to the Rotary Club of Lafayette",
      "Leads sponsor outreach to companies including Almond, SparkFun, and Markforged",
      "Targeting at least $5,000 in sponsorship for the 2026–2027 season",
    ],
    skills: ["Budgeting", "Fundraising", "Sponsorship Outreach"],
  },
  {
    title: "Founder & Organizer",
    org: "Voices United",
    period: "2025 – Present",
    type: "leadership",
    bullets: [
      "Founded a beginner-friendly English conversation and ESL practice program for young non-native speakers",
      "Organizes library-based sessions and one-on-one conversation practice",
      "Coordinates with local organizers to schedule participants and grow the program",
    ],
  },
];
