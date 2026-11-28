import { experience, leadership } from "@/data/experience";
import { researchTopics } from "@/data/research";

type HomeProject = {
  name: string;
  description: string;
  href: string;
  logo: string;
  caseStudy?: string;
};

export const capitalInCode = {
  name: "Capital in Code",
  description:
    "I publish independent market research that uses historical data and paper trading to test ideas. I share my methods, findings, and what the results can tell us.",
  href: "https://capitalincode.com",
  logo: "/images/brands/capital-in-code.webp",
} satisfies HomeProject;

export const homeProjects: readonly HomeProject[] = [
  {
    name: "RentMax AI",
    description:
      "I built RentMax AI to help landlords and investors estimate rent and see how expenses and financing affect a property’s cash flow and returns.",
    href: "https://www.rentmaxai.com/",
    logo: "/images/brands/rentmax-ai.webp",
    caseStudy: "/projects/rentmax-ai",
  },
  capitalInCode,
];

type HomeExperienceDetails = {
  id: string;
  summary: string;
  href: string;
  logo?: string;
  teamNumber?: string;
  event?: { name: string; href: string };
};

const experienceDetails: readonly HomeExperienceDetails[] = [
  {
    id: "clarus-wealth-group",
    summary: "I built Excel projections for retirement and trust scenarios and helped prepare financial analysis for clients.",
    href: "https://www.claruswealthgroup.com/",
    logo: "/images/brands/clarus-wealth-group.webp",
  },
  {
    id: "data-science-club",
    summary: "I started a club where students learn data science and AI by building projects together.",
    href: "https://ahsdata.com/",
    logo: "/images/brands/acalanes-data-science.webp",
    event: { name: "Acalanes Data Fest", href: "https://luma.com/npjpgzhy" },
  },
  {
    id: "voices-united",
    summary: "I started an English conversation program for young learners and organize sessions with local volunteers.",
    href: "https://www.voicesunitedproject.org/",
    logo: "/images/brands/voices-united.webp",
  },
  {
    id: "acabots",
    summary: "I help run outreach and partnerships, mentor younger teammates, and contribute to mechanical prototypes.",
    href: "https://ftc-events.firstinspires.org/team/24689",
    teamNumber: "24689",
  },
];

const rolesById = new Map([...experience, ...leadership].map((role) => [role.id, role]));

export const homeExperience = experienceDetails.flatMap((details) => {
  const role = rolesById.get(details.id);
  return role ? [{ ...role, ...details }] : [];
});

export const homeContent = {
  headline: "Market research and software",
  introduction:
    "I write software to explore how markets work and build tools that make financial decisions easier to understand.",
  about:
    "I’m from the San Francisco Bay Area. When I’m away from my computer, I like swimming, getting out for a hike, and playing clarinet in my school band.",
  featuredStudy: researchTopics[0],
  email: "dillon.nagar@gmail.com",
} as const;
