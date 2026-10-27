import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link href="/" className="footer-name">Dillon Nagar</Link>
        <p className="footer-copyright">© {new Date().getFullYear()} Dillon Nagar</p>
        <nav className="footer-links" aria-label="Social links">
          <a href="https://linkedin.com/in/dillonnagar" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/Manateek1" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="mailto:dillon.nagar@gmail.com">Email</a>
        </nav>
      </div>
    </footer>
  );
}
