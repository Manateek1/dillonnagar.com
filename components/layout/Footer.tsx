import Link from "next/link";

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.32 5.56a5.13 5.13 0 0 1-3.77-1.8V15.7a6.78 6.78 0 1 1-5.87-6.73v3.4a3.44 3.44 0 1 0 2.48 3.3V0h3.4a5.13 5.13 0 0 0 3.77 3.77v1.79Z" />
    </svg>
  );
}

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
            href="https://www.instagram.com/dillonnagar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/60 transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.tiktok.com/@dillonnagar"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/60 transition-colors"
            aria-label="TikTok"
          >
            <TiktokIcon />
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
