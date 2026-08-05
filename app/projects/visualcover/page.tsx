import CaseStudyLayout from "@/components/projects/CaseStudyLayout";

export const metadata = {
  title: "VisualCover — Dillon Nagar",
};

export default function VisualCoverPage() {
  return (
    <CaseStudyLayout
      name="VisualCover"
      tagline="Desktop privacy screen curtain for Windows 11 and macOS"
      status="live"
      stack={["Tauri", "Rust", "TypeScript", "GitHub Actions"]}
      githubUrl="https://github.com/Manateek1/VisualCover"
      sections={[
        {
          title: "What it does",
          content:
            "VisualCover places a full-screen, always-on-top curtain over every connected monitor while Windows or macOS stays signed in and background programs keep running. A 4–12 digit PIN removes the cover. It is a casual-access barrier — not a security boundary — designed for hiding the desktop from a passerby while leaving automation, downloads, and servers untouched.",
        },
        {
          title: "Role",
          content:
            "Founder and developer — sole engineer. Designed the product, built the Tauri app in Rust and TypeScript, set up GitHub Actions CI for Windows and macOS builds, and released installable binaries on GitHub.",
        },
        {
          title: "Tech Stack",
          content: [
            "Tauri — cross-platform desktop framework (Rust backend + TypeScript frontend)",
            "Rust — native window management, PIN hashing (Argon2id), tray menu, idle detection",
            "TypeScript / Node.js — frontend UI and configuration screens",
            "GitHub Actions — CI pipeline that builds the Windows NSIS installer and macOS app on push to main",
            "NSIS — Windows installer packaging",
          ],
        },
        {
          title: "Features",
          content: [
            "Covers all detected monitors with borderless, always-on-top windows",
            "Configurable clock, date, and solid or gradient background",
            "PIN stored as an Argon2id hash — the raw PIN is never saved",
            "Launch at sign-in, cover-after-launch, and optional Windows idle activation",
            "System tray menu for quick access",
            "Emergency unlock shortcut (Ctrl+Alt+Shift+U) — disabled by default",
            "Background apps (Plex, Python, Chrome, Playwright, scheduled tasks) continue running while covered",
            "Compatibility mode prevents the cover from stealing focus from automation",
          ],
        },
        {
          title: "Background Automation",
          content:
            "VisualCover is designed to leave background automation running while the screen is hidden. Tested with GoodMorningBot — a Windows automation that generates images with Fooocus and sends them via WhatsApp Web using Playwright — confirming that DOM/CDP-based browser automation continues while the cover is active.",
        },
        {
          title: "Release Engineering",
          content: [
            "Windows: GitHub Actions builds the NSIS installer on windows-latest, runs all frontend and Rust gates, and uploads as a workflow artifact",
            "Releases: pushing a version tag (e.g. v0.2.0) triggers the Release workflow, creates a public GitHub Release, and attaches the installer",
            "macOS: DMG and .app distributed via GitHub Releases for Apple Silicon and Intel",
            "Versions synchronized across package.json, Cargo.toml, and Tauri config — CI asserts this before releasing",
          ],
        },
        {
          title: "Security Boundary",
          content:
            "VisualCover explicitly is not a security product. It cannot defend against Task Manager, Ctrl+Alt+Delete, user switching, UAC prompts, elevated software, or process termination. It is a visual curtain intended to hide the desktop from casual passersby — not authentication, encryption, or an endpoint-security tool.",
        },
        {
          title: "Current Status",
          content:
            "v0.2.0 released on GitHub. Supports 64-bit Windows 11 and macOS (Apple Silicon and Intel). Available as a direct download from GitHub Releases.",
        },
      ]}
    />
  );
}
