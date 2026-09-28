import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ExperienceShell from "@/components/effects/ExperienceShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Dillon Nagar",
    template: "%s — Dillon Nagar",
  },
  description:
    "Dillon Nagar studies financial markets through data and builds practical tools for research and analysis.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <div className="site-grid" aria-hidden="true" />
        <div className="site-noise" aria-hidden="true" />
        <ExperienceShell />
        <Navbar />
        <main className="site-main flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
