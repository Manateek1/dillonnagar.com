import SectionHeader from "@/components/ui/SectionHeader";
import Link from "next/link";

export const metadata = {
  title: "About — Dillon Nagar",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <SectionHeader title="About" />

      <div className="space-y-6 text-white/65 text-sm leading-relaxed mb-12">
        <p>
          I&apos;m a student developer at Acalanes High School (expected graduation May 2028, GPA 4.29)
          building software at the intersection of financial analysis, AI-assisted workflows, and
          practical operations.
        </p>
        <p>
          My work started with a real problem: landlords and property investors lack accessible
          tools for real-time rental market analysis. That led me to build{" "}
          <Link href="/projects/rentmax-ai" className="text-blue-400 hover:text-blue-300 transition-colors">
            RentMax AI
          </Link>
          , a live SaaS platform that combines market data pipelines with AI-driven pricing insights.
          I designed it, built the full stack, and deployed it — sole engineer.
        </p>
        <p>
          Before that I built{" "}
          <Link href="/projects/visualcover" className="text-blue-400 hover:text-blue-300 transition-colors">
            VisualCover
          </Link>
          , a cross-platform Electron desktop app that generates tailored cover letters using the
          OpenAI API, distributed as installable binaries on GitHub.
        </p>
        <p>
          Outside of building, I serve as Treasurer and Director of Fundraising for Acalanes
          Robotics (FRC Team 7686), where I manage the team budget and submitted a formal
          sponsorship proposal to the Rotary Club of Lafayette. I also founded Voices United, a
          student civic engagement organization.
        </p>
        <p>
          I&apos;m interested in how software intersects with finance and operations — building tools
          that make real processes faster, smarter, or more accessible.
        </p>
      </div>

      <div className="border border-white/10 bg-white/[0.03] rounded-xl p-6 space-y-5">
        <div>
          <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-2">Education</p>
          <p className="text-sm text-white/80">Acalanes High School</p>
          <p className="text-xs text-white/40 mt-0.5">Expected May 2028 · GPA 4.29</p>
        </div>
        <div>
          <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-2">Coursework</p>
          <ul className="text-sm text-white/60 space-y-1">
            <li>AP Computer Science Principles</li>
            <li>AP Statistics (UC Scout)</li>
            <li>USF Wall Street Academy</li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-2">Contact</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <a href="mailto:dillon.nagar@gmail.com" className="text-white/50 hover:text-white transition-colors">
              dillon.nagar@gmail.com
            </a>
            <a href="https://linkedin.com/in/dillonnagar" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
              LinkedIn ↗
            </a>
            <a href="https://github.com/Manateek1" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
