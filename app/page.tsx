import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ExperienceSnapshot from "@/components/home/ExperienceSnapshot";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ExperienceSnapshot />
      <section className="border-t border-white/8">
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">Let&apos;s build something together.</p>
          <div className="flex items-center gap-6 text-sm">
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
      </section>
    </>
  );
}
