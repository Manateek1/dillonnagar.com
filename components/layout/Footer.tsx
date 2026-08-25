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
    <footer className="site-footer">
      <div className="footer-signal" aria-hidden="true"><i /></div>
      <div className="footer-inner">
        <div className="footer-brand">
          <span>DN</span>
          <p>© {new Date().getFullYear()} Dillon Nagar</p>
        </div>
        <div className="footer-links">
          <a
            href="https://github.com/Manateek1"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/dillonnagar"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/dillonnagar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.tiktok.com/@dillonnagar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <TiktokIcon />
          </a>
          <a href="mailto:dillon.nagar@gmail.com">
            Email
          </a>
          <Link href="/contact">Contact</Link>
        </div>
        <p className="footer-note">Built to be explored.</p>
      </div>
    </footer>
  );
}
