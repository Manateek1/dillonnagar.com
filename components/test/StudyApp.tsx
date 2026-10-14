"use client";

import { useState } from "react";
import MapGame from "./MapGame";
import RecallQuiz from "./RecallQuiz";
import StudyGuide from "./StudyGuide";
import { panelClass } from "./study-utils";
import { useStudyProgress, type AttemptStatus } from "./useStudyProgress";

type Tab = "map" | "recall" | "guide";
const tabs: { id: Tab; label: string }[] = [{ id: "map", label: "Map game" }, { id: "recall", label: "Names & nationalities" }, { id: "guide", label: "Study guide" }];

export default function StudyApp() {
  const [active, setActive] = useState<Tab>("map");
  const [storageProblem, setStorageProblem] = useState(false);
  const { progress, recordAttempt } = useStudyProgress();
  const records = Object.values(progress);
  const correct = records.reduce((sum, record) => sum + record.correct, 0);
  const missed = records.reduce((sum, record) => sum + record.missed, 0);
  const assisted = records.reduce((sum, record) => sum + record.assisted, 0);
  const attempts = correct + missed + assisted;

  function onAttempt(key: string, status: AttemptStatus) { setStorageProblem(!recordAttempt(key, status)); }

  return <div className="relative bg-[#0a0a0a] text-[#ededed]">
    <div className="mx-auto w-full max-w-[1480px] px-5 pb-16 pt-9 sm:px-8 lg:px-12">
      <header><h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl" lang="es">El mapa</h1><p className="mt-2 text-base text-white/60 sm:text-lg">Spanish 4 · Geography practice</p></header>
      <div className="mt-6 flex gap-1 overflow-x-auto border-b border-white/15 sm:gap-5" role="tablist" aria-label="Study activities">{tabs.map((tab) => <button key={tab.id} id={`study-tab-${tab.id}`} type="button" role="tab" aria-selected={active === tab.id} aria-controls={`study-panel-${tab.id}`} tabIndex={active === tab.id ? 0 : -1} onClick={() => setActive(tab.id)} onKeyDown={(event) => {
        if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
          event.preventDefault();
          const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (tabs.findIndex((item) => item.id === active) + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
          setActive(tabs[nextIndex].id); document.getElementById(`study-tab-${tabs[nextIndex].id}`)?.focus();
        }
      }} className={`min-h-12 shrink-0 border-b-2 px-2 py-3 text-sm! font-medium! transition-colors sm:text-base! ${active === tab.id ? "border-blue-500 text-blue-400!" : "border-transparent text-white/65! hover:text-white!"}`}>{tab.label}</button>)}</div>
      <div className="mt-5">
        <section id="study-panel-map" role="tabpanel" aria-labelledby="study-tab-map" hidden={active !== "map"}><MapGame progress={progress} onAttempt={onAttempt} /></section>
        <section id="study-panel-recall" role="tabpanel" aria-labelledby="study-tab-recall" hidden={active !== "recall"}><RecallQuiz progress={progress} onAttempt={onAttempt} /></section>
        <section id="study-panel-guide" role="tabpanel" aria-labelledby="study-tab-guide" hidden={active !== "guide"}><StudyGuide /></section>
      </div>
      <div className={`${panelClass} mt-4 flex flex-wrap items-center gap-x-7 gap-y-3 px-5 py-5 text-sm`}>
        <h2 className="font-semibold">Your practice</h2><span data-testid="study-correct" className="text-white/75">{correct} correct</span><span className="text-white/75">{missed} missed</span><span className="text-white/75">{assisted} hinted</span><span className="text-white/75">{attempts ? Math.round(correct / attempts * 100) : 0}% accuracy</span><span className="text-xs text-white/45">{storageProblem ? "Progress lasts for this visit; browser storage is unavailable." : "Progress saved on this device."}</span>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-white/40">Accuracy counts answers without hints. Use the study guide to review every item on the quiz checklist.</p>
    </div>
  </div>;
}
