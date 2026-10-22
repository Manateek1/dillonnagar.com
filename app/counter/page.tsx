import type { Metadata } from "next";
import CounterApp from "./CounterApp";

export const metadata: Metadata = {
  title: "Milestone Clicker",
  description:
    "Interactive milestone clicker with synth audio and confetti celebrations at 100, 200, 1,000, and beyond.",
};

export default function CounterPage() {
  return <CounterApp />;
}
