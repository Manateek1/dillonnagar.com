import CaseStudyLayout from "@/components/projects/CaseStudyLayout";

export const metadata = {
  title: "ChudGames — Dillon Nagar",
};

export default function ChudGamesPage() {
  return (
    <CaseStudyLayout
      name="ChudGames"
      tagline="Browser game launcher and arcade suite with 10 playable games"
      status="live"
      stack={["React", "Vite", "TypeScript", "WebAudio API"]}
      liveUrl="https://chudgames.vercel.app"
      githubUrl="https://github.com/Manateek1/ChudGames"
      sections={[
        {
          title: "What it is",
          content:
            "ChudGames is a browser-based game launcher featuring 10 playable games built on a shared engine. It includes a neon-styled UI, daily challenges, local achievements, high score tracking, and full mobile/touch support.",
        },
        {
          title: "Role",
          content:
            "Founder and developer — sole engineer. Designed and built the shared game engine, launcher shell, and all 10 games.",
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
          title: "Games",
          content: [
            "Neon Dodger",
            "Asteroids Pulse",
            "Brick Breaker Blitz",
            "FortLite",
            "Void Survival",
            "Rhythm Tap",
            "Precision Runner",
            "Fusion 2048",
            "Memory Match",
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
