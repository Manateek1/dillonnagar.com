export type ExperienceItem = {
  id: string;
  title: string;
  org: string;
  period: string;
  bullets: readonly string[];
};

export const experience: readonly ExperienceItem[] = [
  {
    id: "clarus-wealth-group",
    title: "Private Wealth Management Intern",
    org: "Clarus Wealth Group",
    period: "May – June 2026",
    bullets: [
      "Built Excel projections for retirement and trust-disbursement scenarios and helped prepare and present financial analysis for clients.",
      "Reviewed the firm’s website and competitors, then recommended improvements to content, navigation, and usability.",
      "Observed advisor-client meetings and participated in pro bono financial planning sessions in Houston.",
    ],
  },
  {
    id: "rentmax-ai",
    title: "Founder & Developer",
    org: "RentMax AI",
    period: "2025 – Present",
    bullets: [
      "Founded and operate a rental-property analysis platform for landlords and investors.",
      "Built the platform independently and manage subscriptions, user accounts, and reliability.",
    ],
  },
  {
    id: "ace-hardware",
    title: "Digital Marketing & Operations",
    org: "Ace Hardware",
    period: "Current",
    bullets: [
      "Work the register and help customers at my family’s Ace Hardware store.",
      "Help with paid search ads, social media, customer reviews, and online listings.",
    ],
  },
  {
    id: "athletic-assistant",
    title: "Athletic Assistant",
    org: "Acalanes Union High School District",
    period: "Since 2024",
    bullets: [
      "Support athletic events through game announcements, scoreboard and shot-clock operation, venue access, and equipment setup and breakdown.",
    ],
  },
];

export const leadership: readonly ExperienceItem[] = [
  {
    id: "acabots",
    title: "Logistics Lead",
    org: "Acabots",
    period: "2025 – Present",
    bullets: [
      "Help with robot programming and coordinate partnerships, logistics, and outreach for FTC Team 24689.",
      "Help organize company visits and mentor connections, mentor younger teammates, and contribute to mechanical prototypes.",
    ],
  },
  {
    id: "data-science-club",
    title: "Founder & President",
    org: "Acalanes Data Science Club",
    period: "Aug 2026 – Present",
    bullets: [
      "Founded a beginner-friendly club where students learn data science and AI through hands-on projects.",
      "Hosted Acalanes Data Fest, the club’s student hackathon held at BRIDGEGOOD in Oakland on November 21, 2026.",
    ],
  },
  {
    id: "voices-united",
    title: "Founder & Organizer",
    org: "Voices United",
    period: "2025 – Present",
    bullets: [
      "Founded a beginner-friendly English conversation and tutoring program for young English learners.",
      "Organize sessions, prepare conversation activities, and coordinate with local organizers and volunteers.",
    ],
  },
];
