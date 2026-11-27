type CaseStudySection = {
  title: string;
  content: string | readonly string[];
};

type CaseStudyImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export type ProjectCaseStudy = {
  sections: readonly CaseStudySection[];
  images?: readonly CaseStudyImage[];
};

export const caseStudies = {
  capitalInCode: {
    images: [
      {
        src: "/screenshots/capital-in-code-spy-returns.png",
        width: 1969,
        height: 1167,
        alt: "On a log scale, one dollar held overnight and one dollar invested continuously both grew much more than one dollar held during regular trading hours in the historical SPY sample.",
        caption: "Growth of $1 in SPY by trading session, 1994–2025. Chart from The Overnight Effect.",
      },
    ],
    sections: [
      {
        title: "The Overnight Effect",
        content:
          "I used split- and dividend-adjusted SPY prices from 1994 through 2025 to separate close-to-next-open returns from open-to-close returns. I compared both with buy and hold over the same dates and measured volatility, Sharpe ratios, and drawdowns. The results describe how returns accumulated in that historical sample.",
      },
      {
        title: "CycleQuant",
        content:
          "I built a FastAPI service to test a Bitcoin signal in an Alpaca paper account. The service evaluates the signal on a schedule, records its decisions, and reconciles submitted paper orders against broker records. A read-only mirror shows the account state without exposing trading controls.",
      },
      {
        title: "The Yield Curve’s Warning Window",
        content:
          "I tested whether sustained inversions of the 10-year and 3-month Treasury yield spread appeared before U.S. recessions. The study documents the warning rule, the recession starts it covered, and the two historical false alarms. The sample contains four recession starts, which is too small to estimate a reliable forecast probability.",
      },
    ],
  },
  rentmaxAI: {
    sections: [
      {
        title: "The problem",
        content:
          "Landlords often have to pull rent estimates, financing, and operating expenses from different places before deciding whether a property is worth a closer look. I wanted to make those assumptions visible and easy to change in one report.",
      },
      {
        title: "From address to comparison",
        content: [
          "Look up a property by address and review a low, middle, and high rent estimate before choosing the rent assumption to model.",
          "Enter the purchase price, down payment, loan terms, and recurring costs such as vacancy, taxes, insurance, maintenance, and management.",
          "Review monthly cash flow, net operating income, cap rate, and cash-on-cash return. Change one assumption, then compare the results with another scenario or property.",
          "Save reports to an account, generate a plain-language summary of the numbers, or export the report as a PDF or CSV.",
        ],
      },
      {
        title: "How I built it",
        content:
          "I designed the workflow and built the React and Vite frontend, the analysis endpoints on Vercel Functions, and the account and report storage in Supabase. The app pulls rental and housing data into editable assumptions. It uses the same inputs and results for the charts, reports, and OpenAI-generated explanations.",
      },
      {
        title: "Accounts and billing",
        content:
          "Saved reports are tied to each account through Supabase Row Level Security. I integrated Stripe subscriptions and use Sentry to track production errors so I can see when an analysis or report fails.",
      },
    ],
  },
  chudGames: {
    images: [
      {
        src: "/screenshots/chudgames-apex-run.webp",
        width: 1196,
        height: 673,
        alt: "A red car driving through hills on the Solstice Pass circuit.",
        caption: "Apex Run, a time trial with a locally saved personal-best ghost.",
      },
      {
        src: "/screenshots/chudgames-buildblox.webp",
        width: 1194,
        height: 711,
        alt: "A block-built path and house surrounded by pink trees in a mountain valley.",
        caption: "BuildBlox, a block-building sandbox with browser-local world saves.",
      },
    ],
    sections: [
      {
        title: "Apex Run",
        content:
          "Players pick a car and circuit, complete the sectors in order, and race their own best lap. The game runs physics separately from rendering and uses Web Audio to generate engine and tire sounds. It supports keyboard, gamepad, and touch controls.",
      },
      {
        title: "BuildBlox",
        content:
          "Players explore and edit worlds generated from a seed. Separate workers handle world updates and block mesh generation. IndexedDB stores player state and terrain edits so players can return to the same world on the same browser.",
      },
      {
        title: "Shared launcher and engine",
        content:
          "I built a registry so each game can supply its own thumbnail, controls, and rules while reusing a common player for tutorials, pause, restart, and mobile input. Shared engine modules handle input and audio. The launcher stores scores, achievements, and settings in the browser and runs as a static site.",
      },
    ],
  },
  macCleaner: {
    sections: [
      {
        title: "Scan and review",
        content:
          "Run a read-only scan of a folder or use Smart Scan to review accessible local storage. Mac Cleaner groups byte-identical duplicates, flags large or old files, and explains familiar cache categories. The review shows file names, paths, sizes, and reasons for each finding.",
      },
      {
        title: "Choose what to move",
        content:
          "Items start unselected. You can preview files, filter results, and choose individual items before confirming a move to Trash. The app checks that selected files still match the scan and keeps protected locations out of cleanup.",
      },
      {
        title: "How I built it",
        content:
          "I built the interface in SwiftUI and separated scanning from cleanup so the review can stay read-only. Duplicate detection uses SHA-256 to group exact copies. Space Lens shows which scanned folders account for the most space and lets you drill into them.",
      },
    ],
  },
  visualCover: {
    sections: [
      {
        title: "How it works",
        content:
          "VisualCover places a borderless curtain over every connected monitor while the desktop session stays signed in. A 4–12 digit PIN removes the cover. The operating system session stays unlocked so downloads, local servers, and scheduled jobs can keep running.",
      },
      {
        title: "Desktop controls",
        content: [
          "Use a tray menu to start or remove the cover and configure the clock, date, and background.",
          "Enable launch at sign-in or optional idle activation on Windows.",
          "Turn on an optional emergency shortcut to remove the curtain.",
          "Use compatibility mode to keep the cover from taking focus away from background automation.",
        ],
      },
      {
        title: "Implementation and releases",
        content:
          "I built the desktop app with Tauri, Rust, and TypeScript. Rust manages the native monitor windows and tray controls, and stores the PIN locally as an Argon2id hash. GitHub Actions builds the Windows installer and macOS packages, with releases for both Apple silicon and Intel Macs.",
      },
    ],
  },
  larpChatAI: {
    sections: [
      {
        title: "The demo",
        content:
          "I built a browser demo for chat and image generation. It gives people two ways to try generative models from the same interface and lets me test how the experience behaves for guests and signed-in users.",
      },
      {
        title: "How it works",
        content:
          "React handles the interface. The API checks which models a session can use and applies usage limits before sending the request. Supabase handles sign-in.",
      },
    ],
  },
} satisfies Record<string, ProjectCaseStudy>;
