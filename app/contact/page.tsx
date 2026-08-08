import SectionHeader from "@/components/ui/SectionHeader";

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <SectionHeader title="Contact" subtitle="Get in touch." />

      <div className="flex flex-wrap gap-6 text-sm">
        <a href="mailto:dillon.nagar@gmail.com" className="text-white/50 hover:text-white transition-colors">
          dillon.nagar@gmail.com ↗
        </a>
        <a href="https://linkedin.com/in/dillonnagar" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
          LinkedIn ↗
        </a>
        <a href="https://github.com/Manateek1" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
          GitHub ↗
        </a>
      </div>
    </div>
  );
}
