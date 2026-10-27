type AboutSegment =
  | { kind: "text"; text: string }
  | { kind: "internal-link"; text: string; href: string }
  | { kind: "external-link"; text: string; href: string };

type AboutContent = {
  subtitle: string;
  asideLabel: string;
  hobbies: readonly string[];
  paragraphs: readonly (readonly AboutSegment[])[];
};

export const aboutContent = {
  subtitle: "A little about what I’m working on and what I’m into outside school.",
  asideLabel: "Outside school",
  hobbies: ["Swim team", "Hiking", "Golf", "Running"],
  paragraphs: [
    [
      {
        kind: "text",
        text: "I’m a student at Acalanes High School in Lafayette. I’m interested in markets, data, and software, and most of what I build starts with a question I want to understand for myself.",
      },
    ],
    [
      {
        kind: "external-link",
        text: "Capital in Code",
        href: "https://capitalincode.com",
      },
      {
        kind: "text",
        text: " is where I share the market questions I’ve been exploring. So far, that includes comparing SPY’s overnight and regular-session returns and building CycleQuant, a Bitcoin paper-trading experiment. I try to be upfront about the methods and what the results can and can’t show.",
      },
    ],
    [
      { kind: "text", text: "I started " },
      {
        kind: "internal-link",
        text: "RentMax AI",
        href: "/projects/rentmax-ai",
      },
      {
        kind: "text",
        text: " after getting interested in rental properties and wanting an easier way to compare rent estimates, expenses, and returns. I’ve also built other projects, including ",
      },
      {
        kind: "internal-link",
        text: "VisualCover",
        href: "/projects/visualcover",
      },
      { kind: "text", text: " and " },
      {
        kind: "internal-link",
        text: "LarpChat AI",
        href: "/projects/larpchat-ai",
      },
      { kind: "text", text: "." },
    ],
    [
      {
        kind: "text",
        text: "At Acalanes, I help with logistics and outreach for AcaBots, started Acalanes Data Science Club, and founded Voices United, an English conversation program for young learners. My Summer 2026 internship at Clarus Wealth Group in Houston gave me a closer look at private wealth management.",
      },
    ],
  ],
} satisfies AboutContent;
