type AboutSegment =
  | { kind: "text"; text: string }
  | { kind: "internal-link"; text: string; href: string }
  | { kind: "external-link"; text: string; href: string };

type AboutContent = {
  subtitle: string;
  paragraphs: readonly (readonly AboutSegment[])[];
};

export const aboutContent = {
  subtitle: "A little about what I’m curious about, what I’m building, and what I like outside school.",
  paragraphs: [
    [
      {
        kind: "text",
        text: "I’m a student at Acalanes High School in Lafayette, and I’m interested in markets, data, and software. Most of what I build starts with a question I want to understand for myself. Building something gives me a way to explore it beyond just reading about it.",
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
        text: " is where I share some of the market questions I’ve been exploring. That has included comparing SPY’s overnight and regular-session returns and building CycleQuant, a Bitcoin paper-trading experiment. I try to be upfront about my methods and what the results can and can’t show.",
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
        text: " after getting interested in rental properties and wanting an easier way to compare rent estimates, expenses, and returns. I’ve also built projects like ",
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
      { kind: "text", text: ". I like that each one gives me a different problem to work through." },
    ],
    [
      {
        kind: "text",
        text: "At Acalanes, I help with logistics and outreach for Aqabot (FTC 24689), started the Acalanes Data Science Club, and founded Voices United, an English conversation program for young learners. My summer internship at Clarus Wealth Group in Houston gave me a closer look at private wealth management.",
      },
    ],
    [
      {
        kind: "text",
        text: "Outside school, swimming takes up a good part of my week. I also like getting out for a hike or a run, and I play golf when I can. I’m still working on my golf game, but I like being outside and getting a break from the screen.",
      },
    ],
  ],
} satisfies AboutContent;
