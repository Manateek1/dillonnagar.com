import type { Metadata } from "next";
import StudyApp from "@/components/test/StudyApp";

export const metadata: Metadata = {
  title: "El mapa · Spanish study",
  description: "Practice the Spanish-speaking world with an interactive map, country names and nationalities.",
  robots: { index: false, follow: false },
};

export default function TestPage() {
  return <StudyApp />;
}
