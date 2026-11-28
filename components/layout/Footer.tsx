import ArrowIcon from "@/components/ui/ArrowIcon";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-copyright">© {new Date().getFullYear()}</p>
        <a href="/resume.pdf" download="Dillon-Nagar-Resume.pdf" className="footer-resume">
          Resume (PDF) <ArrowIcon className="rotate-90" size={15} />
        </a>
      </div>
    </footer>
  );
}
