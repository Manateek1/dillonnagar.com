"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <SectionHeader title="Contact" subtitle="Get in touch — I read every message." />

      <div className="flex flex-wrap gap-6 mb-12 text-sm">
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

      {status === "sent" ? (
        <div className="border border-green-500/20 bg-green-500/5 rounded-xl p-6 text-green-400 text-sm">
          Message sent — I&apos;ll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-white/30 mb-2">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/25 transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-white/30 mb-2">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/25 transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-mono text-white/30 mb-2">Message</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/25 transition-colors resize-none"
              placeholder="What's on your mind?"
            />
          </div>
          {status === "error" && (
            <p className="text-red-400 text-xs">Something went wrong. Email me directly at dillon.nagar@gmail.com.</p>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="px-5 py-2.5 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
        </form>
      )}
    </div>
  );
}
