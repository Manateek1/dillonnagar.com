import CaseStudyLayout from "@/components/projects/CaseStudyLayout";

export const metadata = {
  title: "ChudGames",
};

export default function ChudGamesPage() {
  return (
    <CaseStudyLayout
      name="ChudGames"
      tagline="Browser arcade built on a shared game engine"
      status="live"
      stack={["React", "Vite", "TypeScript", "WebAudio API"]}
      liveUrl="https://chudgames.vercel.app"
      githubUrl="https://github.com/Manateek1/ChudGames"
      sections={[
        {
          title: "What it is",
          content:
            "ChudGames is a browser-based game launcher and arcade with a collection of games, including Apex Run and FortLite. It includes a neon UI, daily challenges, local achievements, high-score tracking, and desktop and mobile input.",
        },
        {
          title: "Role",
          content:
            "Founder and developer — sole engineer. Designed and built the shared game engine, launcher shell, and its games.",
        },
        {
          title: "Tech Stack",
          content: [
            "React + TypeScript — launcher UI and game shell",
            "Vite — fast dev server and production bundler",
            "WebAudio API — procedural SFX and lightweight synth music",
            "localStorage — high scores, achievements, settings, and progress persistence",
          ],
        },
        {
          title: "Selected Games",
          content: [
            "Apex Run",
            "Neon Dodger",
            "Asteroids Pulse",
            "FortLite",
            "Pong Neon (single player + two-player duel)",
          ],
        },
        {
          title: "Shared Engine",
          content: [
            "InputManager: low-latency keyboard and virtual touch input",
            "AudioManager: WebAudio SFX and synth music",
            "ParticleSystem: quality-scaled particle bursts",
            "FPS meter: rolling-average frame rate display",
            "Math utilities: deterministic random and collision helpers",
            "Daily challenge picker: fixed-seed daily game selection",
            "Achievement system: local unlock rules and persistence",
          ],
        },
        {
          title: "Architecture",
          content:
            "Each game is a self-contained React component that implements a shared GameComponentProps interface. The central registry (games/registry.ts) holds all metadata, thumbnails, and tutorial copy. Games are loaded inside a shared GamePlayer shell that handles pause, restart, quit, FPS display, and mobile controls — no duplicated boilerplate per game.",
        },
        {
          title: "Current Status",
          content:
            "Live at chudgames.vercel.app. No server required — fully static, deployed on Vercel.",
        },
      ]}
    />
  );
}
