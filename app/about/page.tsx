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
          I&apos;m a student developer at Acalanes High School (Lafayette, CA — expected graduation
          May 2028) building software at the intersection of financial analysis, AI-assisted
          workflows, and practical operations.
        </p>
        <p>
          My work started with a real problem: landlords and property investors lack accessible
          tools for rental market analysis. That led me to build{" "}
          <Link href="/projects/rentmax-ai" className="text-blue-400 hover:text-blue-300 transition-colors">
            RentMax AI
          </Link>
          , a live SaaS platform that combines property analysis calculations with AI-generated
          explanations. I designed it, built the full stack, and handle ongoing production
          operations — sole engineer.
        </p>
        <p>
          I&apos;ve also built{" "}
          <Link href="/projects/visualcover" className="text-blue-400 hover:text-blue-300 transition-colors">
            VisualCover
          </Link>
          , a desktop privacy curtain for Windows and macOS written in Rust and TypeScript with
          Tauri, and{" "}
          <Link href="/projects/larpchat-ai" className="text-blue-400 hover:text-blue-300 transition-colors">
            LarpChat AI
          </Link>
          , a tier-based AI chat platform with server-side plan enforcement and rate limiting.
        </p>
        <p>
          Outside of software, I serve as Treasurer and Director of Fundraising for Acalanes
          Robotics (FRC Team 7686), where I manage the budget and lead sponsor outreach. I also
          founded Voices United, a beginner-friendly English conversation and ESL practice program
          for young non-native speakers in the Lafayette community.
        </p>
        <p>
          In Summer 2026 I completed a two-week private wealth management internship at Clarus
          Wealth Group in Houston, gaining exposure to commercial real estate, estate planning,
          and retirement planning.
        </p>
        <p>
          I&apos;m interested in how software, finance, and data intersect — building tools that make
          real processes faster, smarter, or more accessible.
        </p>
      </div>

      <div className="border border-white/10 bg-white/[0.03] rounded-xl p-6 space-y-5">
        <div>
          <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-2">Education</p>
          <p className="text-sm text-white/80">Acalanes High School · Lafayette, CA</p>
          <p className="text-xs text-white/40 mt-0.5">Expected May 2028 · GPA ~4.0 unweighted / 4.2 weighted</p>
        </div>
        <div>
          <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-2">Coursework</p>
          <ul className="text-sm text-white/60 space-y-1">
            <li>AP Computer Science Principles</li>
            <li>AP Computer Science A (upcoming)</li>
            <li>AP Statistics (UC Scout)</li>
            <li>USF Pre-College Finance Program</li>
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
