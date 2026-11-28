import type { Metadata } from "next";
import SectionHeader from "@/components/ui/SectionHeader";
import VocabularyDeck from "./VocabularyDeck";

export const metadata: Metadata = {
  title: "SAT vocabulary",
  description: "Practice recalling SAT vocabulary definitions with flashcards.",
  robots: { index: false },
};

export default function SatPage() {
  return (
    <div className="page-shell max-w-3xl">
      <SectionHeader
        title="SAT vocabulary"
        subtitle="Think of what the word means, then flip the card to check your answer."
      />
      <VocabularyDeck />
    </div>
  );
}
