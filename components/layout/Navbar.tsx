"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ArrowIcon from "@/components/ui/ArrowIcon";

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/#editorial", label: "Editorial" },
  { href: "/about", label: "About" },
];

const homeNavLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#editorial", label: "Editorial" },
  { href: "#about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isPortfolioIndex = pathname === "/projects" || pathname === "/experience";
  const hasPortfolioHeader = isHome || pathname === "/about" || pathname === "/skills";
  const links = isHome ? homeNavLinks : navLinks;
  const contactHref = isHome ? "#contact" : "/contact";
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isHome) return;

    const sections = Array.from(document.querySelectorAll<HTMLElement>(
      ".portfolio-home > section[id]",
    ));
    let frame = 0;
    let currentSection: string | undefined;

    function update() {
      const root = document.documentElement;
      const distance = root.scrollHeight - root.clientHeight;
      const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      const headerHeight = progressRef.current?.parentElement?.offsetHeight ?? 72;
      const section = sections.findLast((entry) => entry.getBoundingClientRect().top <= headerHeight + 36);

      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      if (section?.id !== currentSection) {
        currentSection = section?.id;
        setActiveSection(currentSection ?? "");
      }

      frame = 0;
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, [isHome]);

  if (isPortfolioIndex) {
    return (
      <header className="site-header home-site-header portfolio-return-header">
        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/" className="brand-link">Home</Link>
        </nav>
      </header>
    );
  }

  function currentFor(href: string): "page" | "location" | undefined {
    if (isHome) return href === `#${activeSection}` ? "location" : undefined;
    if (pathname === href || (href === "/projects" && pathname.startsWith("/projects/"))) return "page";
  }

  return (
    <header
      className={hasPortfolioHeader ? "site-header home-site-header" : "site-header"}
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      }}
    >
      <nav className="site-nav" aria-label="Primary navigation">
        <Link href={isHome ? "#home" : "/"} className="brand-link" aria-label="Home">
          Home
        </Link>

        <div className="desktop-nav-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={currentFor(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <Link href={contactHref} className="nav-contact" aria-current={isHome ? currentFor(contactHref) : undefined}>
            Contact <ArrowIcon direction="up-right" size={16} />
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="mobile-menu-trigger"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? (
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {menuOpen && !hasPortfolioHeader ? (
        <div
          className="mobile-nav-panel"
          id="mobile-navigation"
        >
          <nav aria-label="Mobile navigation">
            {[...links, { href: contactHref, label: "Contact" }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={currentFor(link.href)}
                onClick={() => setMenuOpen(false)}
              >
                <span>{link.label}</span>
                <ArrowIcon direction="up-right" size={16} />
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
      {isHome && <span ref={progressRef} className="home-scroll-progress" aria-hidden="true" />}
    </header>
  );
}
