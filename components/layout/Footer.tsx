import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/8 mt-24">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/30 text-xs">
          © {new Date().getFullYear()} Dillon Nagar
        </p>
        <div className="flex items-center gap-6 text-xs text-white/30">
          <a
            href="https://github.com/Manateek1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/60 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/dillonnagar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/60 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:dillon.nagar@gmail.com"
            className="hover:text-white/60 transition-colors"
          >
            Email
          </a>
          <Link href="/contact" className="hover:text-white/60 transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
