"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  const [openPath, setOpenPath] = useState<string | null>(null);
  const menuOpen = openPath === pathname;

  const openCommand = () => {
    setOpenPath(null);
    window.dispatchEvent(new CustomEvent("dn:open-command"));
  };

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Primary navigation">
        <Link href="/" className="brand-link" data-magnetic>
          <span className="brand-mark" aria-hidden="true">DN</span>
          <span>Dillon Nagar</span>
        </Link>

        <div className="desktop-nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "is-active" : ""}
              data-magnetic
            >
              <i aria-hidden="true" />
              {link.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <button type="button" className="command-trigger" onClick={openCommand} aria-label="Open command palette" data-magnetic>
            <span>⌘K</span>
          </button>
          <Link href="/contact" className="nav-contact" data-magnetic>
            Contact <ArrowIcon />
          </Link>
        </div>

        <button
          type="button"
          className="mobile-menu-trigger"
          onClick={() => setOpenPath(menuOpen ? null : pathname)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-nav-panel">
          <p>Navigate /</p>
          {mobileNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "is-active" : ""}
              onClick={() => setOpenPath(null)}
            >
              <span>{link.label}</span><ArrowIcon />
            </Link>
          ))}
          <button type="button" onClick={openCommand}><span>Command palette</span><kbd>⌘K</kbd></button>
        </div>
      )}
    </header>
  );
}
