"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { VisualMode } from "@/components/effects/ExperienceShell";

type Props = {
  open: boolean;
  terminalOpen: boolean;
  visualMode: VisualMode;
  reducedMotion: boolean;
  onClose: () => void;
  onTerminalChange: (open: boolean) => void;
  onVisualModeChange: (mode: VisualMode) => void;
  onReducedMotionChange: (value: boolean) => void;
};

type Command = {
  id: string;
  group: "Navigation" | "Actions" | "Visual mode";
  label: string;
  meta?: string;
  run: () => void;
};

const externalLinks = {
  github: "https://github.com/Manateek1",
  linkedin: "https://linkedin.com/in/dillonnagar",
};

export default function CommandPalette({
  open,
  terminalOpen,
  visualMode,
  reducedMotion,
  onClose,
  onTerminalChange,
  onVisualModeChange,
  onReducedMotionChange,
}: Props) {
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "Signal terminal ready. Type ‘help’.",
  ]);

  const navigate = useCallback((href: string) => {
    router.push(href);
    onClose();
  }, [onClose, router]);

  const commands = useMemo<Command[]>(
    () => [
      { id: "home", group: "Navigation", label: "Home", meta: "01", run: () => navigate("/") },
      { id: "projects", group: "Navigation", label: "Projects", meta: "02", run: () => navigate("/projects") },
      { id: "experience", group: "Navigation", label: "Experience", meta: "03", run: () => navigate("/experience") },
      { id: "about", group: "Navigation", label: "About", meta: "04", run: () => navigate("/about") },
      { id: "contact", group: "Navigation", label: "Contact", meta: "05", run: () => navigate("/contact") },
      { id: "email", group: "Actions", label: "Email Dillon", meta: "↗", run: () => { window.location.href = "mailto:dillon.nagar@gmail.com"; onClose(); } },
      { id: "github", group: "Actions", label: "Open GitHub", meta: "↗", run: () => { window.open(externalLinks.github, "_blank", "noopener,noreferrer"); onClose(); } },
      { id: "linkedin", group: "Actions", label: "Open LinkedIn", meta: "↗", run: () => { window.open(externalLinks.linkedin, "_blank", "noopener,noreferrer"); onClose(); } },
      { id: "signal", group: "Visual mode", label: "Signal mode", meta: visualMode === "signal" ? "ACTIVE" : undefined, run: () => onVisualModeChange("signal") },
      { id: "mono", group: "Visual mode", label: "Monochrome mode", meta: visualMode === "mono" ? "ACTIVE" : undefined, run: () => onVisualModeChange("mono") },
      { id: "motion", group: "Visual mode", label: "Reduce motion", meta: reducedMotion ? "ON" : "OFF", run: () => onReducedMotionChange(!reducedMotion) },
    ],
    [navigate, onClose, onReducedMotionChange, onVisualModeChange, reducedMotion, visualMode],
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return commands;
    return commands.filter((command) => `${command.group} ${command.label}`.toLowerCase().includes(normalized));
  }, [commands, query]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => (terminalOpen ? terminalRef.current : searchRef.current)?.focus(), 30);
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open, terminalOpen]);

  if (!open) return null;

  const runTerminal = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const raw = terminalInput.trim();
    const command = raw.toLowerCase();
    if (!raw) return;

    if (command === "clear") {
      setTerminalLines([]);
      setTerminalInput("");
      return;
    }

    if (command === "exit") {
      onClose();
      return;
    }

    const responses: Record<string, string> = {
      help: "help · projects · experience · about · contact · theme · clear · exit",
      theme: `Visual mode is ${visualMode}. Run this again from the palette to switch.`,
      projects: "Opening project index…",
      experience: "Opening experience map…",
      about: "Opening about…",
      contact: "Opening contact…",
    };

    setTerminalLines((lines) => [...lines, `> ${raw}`, responses[command] ?? `Unknown command: ${raw}. Try “help”.`]);
    setTerminalInput("");

    if (["projects", "experience", "about", "contact"].includes(command)) {
      window.setTimeout(() => navigate(`/${command}`), 240);
    }
  };

  const groups: Command["group"][] = ["Navigation", "Actions", "Visual mode"];

  return (
    <div className="command-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section
        className="command-plane"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            onClose();
            return;
          }
          if (terminalOpen) return;
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setSelectedIndex((index) => (index + 1) % Math.max(filtered.length, 1));
          }
          if (event.key === "ArrowUp") {
            event.preventDefault();
            setSelectedIndex((index) => (index - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
          }
          if (event.key === "Enter" && filtered[selectedIndex]) {
            event.preventDefault();
            filtered[selectedIndex].run();
          }
        }}
      >
        <div className="command-search-row">
          <span className="command-wave" aria-hidden="true">⌁</span>
          <input
            ref={searchRef}
            value={query}
            onChange={(event) => {
              const value = event.target.value;
              setQuery(value);
              setSelectedIndex(0);
              if (value.trim().toLowerCase() === "terminal") onTerminalChange(true);
            }}
            placeholder="Type a command…"
            aria-label="Search commands"
          />
          <button type="button" onClick={onClose} aria-label="Close command palette">×</button>
        </div>

        {!terminalOpen ? (
          <div className="command-results">
            {groups.map((group) => {
              const groupCommands = filtered.filter((command) => command.group === group);
              if (!groupCommands.length) return null;
              return (
                <div className="command-group" key={group}>
                  <p>{group}</p>
                  {groupCommands.map((command) => {
                    const index = filtered.indexOf(command);
                    return (
                      <button
                        type="button"
                        key={command.id}
                        className={index === selectedIndex ? "is-selected" : ""}
                        onMouseEnter={() => setSelectedIndex(index)}
                        onClick={command.run}
                      >
                        <span className="command-node" aria-hidden="true" />
                        <span>{command.label}</span>
                        <small>{command.meta ?? "↵"}</small>
                      </button>
                    );
                  })}
                </div>
              );
            })}
            {!filtered.length && <p className="command-empty">No command found. Type “terminal” for the command line.</p>}
            <button type="button" className="terminal-hint" onClick={() => onTerminalChange(true)}>
              Type <span>“terminal”</span> to access the command line
            </button>
          </div>
        ) : (
          <div className="terminal-pane">
            <div className="terminal-header">
              <span>DN / TERMINAL</span>
              <button type="button" onClick={() => onTerminalChange(false)}>Return to palette</button>
            </div>
            <div className="terminal-output" aria-live="polite">
              {terminalLines.map((line, index) => <p key={`${line}-${index}`}>{line}</p>)}
            </div>
            <form onSubmit={runTerminal}>
              <label htmlFor="terminal-input">&gt;_</label>
              <input
                id="terminal-input"
                ref={terminalRef}
                value={terminalInput}
                onChange={(event) => setTerminalInput(event.target.value)}
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal command"
              />
              <button type="submit" aria-label="Run command">Run <span aria-hidden="true">↵</span></button>
            </form>
          </div>
        )}

        <div className="command-footer" aria-hidden="true">
          <span>↑↓ Navigate</span><span>↵ Select</span><span>esc Close</span>
        </div>
      </section>
    </div>
  );
}
