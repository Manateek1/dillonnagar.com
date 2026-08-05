import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
      <p className="text-sm font-mono text-blue-500 mb-4">Available for internships & collaboration</p>
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white leading-tight mb-6">
        Dillon Nagar
      </h1>
      <p className="text-lg text-white/60 max-w-2xl leading-relaxed mb-8">
        Student developer building software at the intersection of financial analysis,
        AI-assisted workflows, and practical operations.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/projects"
          className="text-sm font-medium px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-400 transition-colors"
        >
          View Projects
        </Link>
        <a
          href="mailto:dillon.nagar@gmail.com"
          className="text-sm font-medium px-4 py-2 rounded border border-white/15 text-white/70 hover:border-white/30 hover:text-white transition-all"
        >
          Get in touch
        </a>
        <a
          href="https://github.com/Manateek1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white/40 hover:text-white/70 transition-colors"
        >
          github.com/Manateek1 ↗
        </a>
      </div>
    </section>
  );
}
