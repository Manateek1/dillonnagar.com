export type ResearchTopic = {
  code: string;
  label: string;
  question: string;
  context: string;
  href: string;
  action: string;
};

export const researchTopics: ResearchTopic[] = [
  {
    code: "CIC-001",
    label: "SPY session returns",
    question: "How did SPY's overnight and regular-session returns differ historically?",
    context: "A historical study that explains its methods, results, and limits.",
    href: "https://capitalincode.com/projects/cic-001-overnight-effect",
    action: "Read the research",
  },
  {
    code: "CIC-002",
    label: "Bitcoin paper trading",
    question: "What can a Bitcoin paper-trading experiment teach about testing a strategy?",
    context: "An educational experiment, with no claim of profitable performance.",
    href: "https://capitalincode.com/projects/cic-002-cyclequant",
    action: "View the experiment",
  },
  {
    code: "RENTMAX",
    label: "Rental-property returns",
    question: "How do rent and expenses affect a property's cash flow and return?",
    context: "A practical analysis tool for rental-property decisions.",
    href: "https://rentmaxai.com",
    action: "Open RentMax AI",
  },
];
