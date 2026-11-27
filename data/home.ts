type HomeHighlight = {
  id?: string;
  title: string;
  label?: string;
  href: string;
  description: string;
};

export const homeIntroduction =
  "I study financial markets with data and build software that helps people work through financial decisions.";

export const homeHighlights: readonly HomeHighlight[] = [
  {
    id: "research",
    title: "Capital in Code",
    href: "/projects/capital-in-code",
    description:
      "I used historical SPY data to compare overnight and regular-session returns. I also built CycleQuant, a system that evaluates signals and reconciles simulated Bitcoin orders in an Alpaca paper account.",
  },
  {
    title: "RentMax AI",
    href: "/projects/rentmax-ai",
    description:
      "I built a rental-property analysis tool for landlords. Start with an address, estimate rent, and adjust vacancy, expenses, and financing to see how each assumption changes cash flow and returns.",
  },
  {
    id: "experience",
    title: "Clarus Wealth Group",
    label: "Private Wealth Management Internship",
    href: "/experience#clarus-wealth-group",
    description:
      "I built Excel projections for retirement and trust distributions and helped prepare and present client-facing financial analysis during my internship in Houston.",
  },
];
