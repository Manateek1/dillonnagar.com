import CaseStudyLayout from "@/components/projects/CaseStudyLayout";

export const metadata = {
  title: "VisualCover — Dillon Nagar",
};

export default function VisualCoverPage() {
  return (
    <CaseStudyLayout
      name="VisualCover"
      tagline="Desktop app for generating tailored AI cover letters"
      status="live"
      stack={["Electron", "JavaScript", "HTML/CSS", "OpenAI API"]}
      githubUrl="https://github.com/Manateek1/VisualCover"
      sections={[
        {
          title: "Problem",
          content:
            "Writing tailored cover letters for each job application is time-consuming and repetitive. Generic templates don't account for the specific job description, company, or the applicant's unique experience.",
        },
        {
          title: "Solution",
          content:
            "VisualCover is a cross-platform desktop application that generates tailored cover letters using AI. Users paste a job description and their resume summary, and the app produces a formatted, position-specific cover letter they can export as a PDF.",
        },
        {
          title: "Role",
          content:
            "Founder and developer — sole engineer. Designed the UI, built the Electron wrapper, integrated the OpenAI API, and managed the release engineering pipeline for distributing installable binaries on GitHub.",
        },
        {
          title: "Tech Stack",
          content: [
            "Electron — cross-platform desktop app wrapper (macOS, Windows, Linux)",
            "JavaScript — application logic and UI scripting",
            "HTML/CSS — interface layout and styling",
            "OpenAI API — cover letter generation from structured prompts",
          ],
        },
        {
          title: "Key Features",
          content: [
            "Paste job description and resume summary to generate a tailored cover letter",
            "Editable output before export",
            "PDF export built into the app",
            "Clean, minimal desktop UI — no account required",
            "Runs fully offline after API key setup (no data stored externally)",
          ],
        },
        {
          title: "Security Boundary",
          content:
            "The OpenAI API key is stored locally on the user's machine and is never transmitted to any server other than OpenAI directly. No user data, resume content, or generated letters are stored or logged. The app makes direct API calls from the desktop process.",
        },
        {
          title: "Release Engineering",
          content:
            "Packaged using electron-builder to produce distributable binaries for macOS and Windows. Releases are published on GitHub with platform-specific installers. Users can download and install without building from source.",
        },
      ]}
    />
  );
}
