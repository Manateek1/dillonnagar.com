"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import ArrowIcon from "@/components/ui/ArrowIcon";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
];

const mobileNavLinks = [...navLinks, { href: "/contact", label: "Contact" }];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) =>
    pathname === href || (href === "/projects" && pathname.startsWith("/projects/"));

  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          menuButtonRef.current?.focus();
        }
      }}
    >
      <nav className="site-nav" aria-label="Primary navigation">
        <Link href="/" className="brand-link" aria-label="Dillon Nagar home">
          Dillon Nagar
        </Link>

        <div className="desktop-nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isActive(link.href) ? "is-active" : ""}
              aria-current={isActive(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <Link href="/contact" className="nav-contact">
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

      {menuOpen ? (
        <div
          className="mobile-nav-panel"
          id="mobile-navigation"
        >
          <nav aria-label="Mobile navigation">
            {mobileNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={isActive(link.href) ? "is-active" : ""}
                aria-current={isActive(link.href) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                <span>{link.label}</span>
                <ArrowIcon direction="up-right" size={16} />
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
