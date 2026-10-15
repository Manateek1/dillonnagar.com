"use client";

import { useEffect, useRef, useState } from "react";
import { spanishPlaces, studyPlaces, type StudyPlace } from "@/data/spanish-study";
import { buttonClass, normalizeAnswer, panelClass, primaryButtonClass, shuffled } from "./study-utils";
import type { AttemptStatus, StudyProgress } from "./useStudyProgress";

type Category = "names" | "nationalities" | "water" | "mixed";
type Question = { key: string; place: StudyPlace; kind: "name" | "nationality" };
type Feedback = { status: AttemptStatus; accentReminder: boolean };
type Props = { progress: StudyProgress; onAttempt: (key: string, status: AttemptStatus) => void };

function questionsFor(category: Category): Question[] {
  const questions: Question[] = [];
  if (category === "names" || category === "mixed") {
    for (const place of studyPlaces.filter((item) => item.topic !== "water")) questions.push({ key: `name:${place.id}`, place, kind: "name" });
  }
  if (category === "water" || category === "mixed") {
    for (const place of studyPlaces.filter((item) => item.topic === "water")) questions.push({ key: `name:${place.id}`, place, kind: "name" });
  }
  if (category === "nationalities" || category === "mixed") {
    for (const place of spanishPlaces) {
      questions.push({ key: `nationality:m:${place.id}`, place, kind: "nationality" });
    }
  }
  return questions;
}

function expectedAnswer(question: Question): string {
  return question.kind === "name" ? question.place.spanish : question.place.nationality?.[0] ?? "";
}

function hash(value: string): number { return [...value].reduce((n, letter) => (n * 31 + letter.charCodeAt(0)) >>> 0, 7); }

function choicesFor(question: Question): string[] {
  const expected = expectedAnswer(question);
  const pool = question.kind === "nationality" ? spanishPlaces.map((place) => place.nationality?.[0] ?? "") : studyPlaces.filter((place) => question.place.topic === "water" ? place.topic === "water" : place.topic !== "water").map((place) => place.spanish);
  const others = [...new Set(pool)].filter((answer) => answer && answer !== expected).sort((a, b) => hash(question.key + a) - hash(question.key + b)).slice(0, 3);
  return [expected, ...others].sort((a, b) => hash(a + question.key) - hash(b + question.key));
}

export default function RecallQuiz({ progress, onAttempt }: Props) {
  const [category, setCategory] = useState<Category>("nationalities");
  const [typed, setTyped] = useState(false);
  const [strict, setStrict] = useState(false);
  const [deck, setDeck] = useState<Question[]>(() => questionsFor("nationalities"));
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [hint, setHint] = useState(false);
  const [misses, setMisses] = useState<Question[]>([]);
  const [scores, setScores] = useState({ correct: 0, missed: 0, assisted: 0 });
  const inputRef = useRef<HTMLInputElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const current = deck[index];
  const savedMisses = questionsFor(category).filter((question) => progress[question.key] && progress[question.key].last !== "correct");

  useEffect(() => {
    if (feedback) nextButtonRef.current?.focus();
  }, [feedback]);

  function start(items: readonly Question[]) {
    if (!items.length) return;
    setDeck(shuffled(items)); setIndex(0); setAnswer(""); setFeedback(null); setHint(false); setMisses([]);
    setScores({ correct: 0, missed: 0, assisted: 0 });
  }

  function check(value: string, skipped = false) {
    if (!current || feedback || (!value.trim() && !skipped)) return;
    const expected = expectedAnswer(current);
    const aliases = current.kind === "name" ? current.place.aliases ?? [] : current.place.nationalityAliases?.[0] ?? [];
    const accepted = [expected, ...aliases];
    const matched = !skipped && accepted.some((item) => normalizeAnswer(item, strict) === normalizeAnswer(value, strict));
    const status: AttemptStatus = matched ? hint ? "assisted" : "correct" : "missed";
    const accentReminder = matched && !accepted.some((item) => normalizeAnswer(item, true) === normalizeAnswer(value, true));
    setAnswer(value); setFeedback({ status, accentReminder });
    setScores((previous) => ({ ...previous, [status]: previous[status] + 1 }));
    if (status !== "correct") setMisses((previous) => [...previous, current]);
    onAttempt(current.key, status);
  }

  function nextQuestion() {
    setIndex((previous) => previous + 1); setAnswer(""); setFeedback(null); setHint(false);
    inputRef.current?.focus();
  }

  return <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_365px]">
    <div className={`${panelClass} p-5 sm:p-8`}>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
        <label className="text-sm text-white/60">Practice
          <select aria-label="Recall topic" value={category} onChange={(event) => { const next = event.target.value as Category; setCategory(next); start(questionsFor(next)); }} className="ml-3 min-h-11 rounded-lg border border-white/15 bg-[#161616] px-3 text-sm text-white">
            <option value="nationalities">Nationalities</option><option value="names">Country & place names</option><option value="water">Seas & oceans</option><option value="mixed">Mixed review</option>
          </select>
        </label>
        <div className="inline-flex rounded-lg border border-white/10 p-1" role="group" aria-label="Answer mode">
          <button type="button" aria-pressed={!typed} onClick={() => { setTyped(false); setAnswer(""); }} className={`${buttonClass} border-transparent px-3 ${!typed ? "bg-blue-500 text-white hover:bg-blue-600" : "text-white/60"}`}>Choose</button>
          <button type="button" aria-pressed={typed} onClick={() => { setTyped(true); setAnswer(""); }} className={`${buttonClass} border-transparent px-3 ${typed ? "bg-blue-500 text-white hover:bg-blue-600" : "text-white/60"}`}>Type it</button>
        </div>
      </div>
      {current ? <div className="py-7 sm:py-10">
        <p className="text-xs font-medium tracking-wider text-white/55">{current.kind === "name" ? "WRITE THE SPANISH NAME" : "NATIONALITY · MASCULINE"}</p>
        <h2 data-testid="recall-prompt" lang={current.kind === "nationality" ? "es" : "en"} className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{current.kind === "name" ? current.place.english : `Un hombre de ${current.place.spanish} es…`}</h2>
        <p className="mt-4 text-sm text-white/60">{current.kind === "nationality" ? "Use the singular masculine nationality." : "Answer in Spanish. Country names start with a capital letter."}</p>
        {hint && !feedback && <p className="mt-5 rounded-lg border border-blue-400/25 bg-blue-500/10 p-3 text-sm leading-relaxed text-blue-200">{current.kind === "name" ? `Starts with “${current.place.spanish[0]}”. ${current.place.clue}` : "Many masculine forms end in -o. Remember the -ense forms and español."}</p>}
        {typed ? <form className="mt-7 max-w-xl" onSubmit={(event) => { event.preventDefault(); if (feedback) nextQuestion(); else check(answer); }}>
          <label htmlFor="spanish-answer" className="text-sm text-white/70">Your answer</label>
          <input ref={inputRef} id="spanish-answer" lang="es" autoComplete="off" autoCapitalize="none" spellCheck={false} readOnly={!!feedback} value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="Escribe en español…" className="mt-2 min-h-14 w-full rounded-lg border border-white/20 bg-white/5 px-4 text-lg! placeholder:text-white/35 focus:border-blue-400 focus:outline-none" />
          <div className="mt-3 flex flex-wrap items-center gap-1.5" role="group" aria-label="Spanish characters">{["á", "é", "í", "ó", "ú", "ü", "ñ"].map((letter) => <button key={letter} type="button" disabled={!!feedback} aria-label={`Insert ${letter}`} onClick={() => { const input = inputRef.current; const start = input?.selectionStart ?? answer.length; const end = input?.selectionEnd ?? answer.length; setAnswer(answer.slice(0, start) + letter + answer.slice(end)); input?.focus(); requestAnimationFrame(() => input?.setSelectionRange(start + 1, start + 1)); }} className={`${buttonClass} min-w-10 px-2`} lang="es">{letter}</button>)}</div>
          {!feedback && <button type="submit" disabled={!answer.trim()} className={`${primaryButtonClass} mt-5`}>Check answer</button>}
          <label className="mt-4 flex min-h-9 items-center gap-2 text-xs text-white/60"><input type="checkbox" checked={strict} onChange={(event) => setStrict(event.target.checked)} className="h-4 w-4 accent-blue-500" />Require accents and ü (ñ is always required)</label>
        </form> : <div className="mt-7 grid max-w-xl gap-3 sm:grid-cols-2">{choicesFor(current).map((choice) => <button type="button" key={choice} disabled={!!feedback} onClick={() => check(choice)} className={`${buttonClass} min-h-16 justify-start px-5 disabled:opacity-100 ${feedback && choice === expectedAnswer(current) ? "border-green-400/60 bg-green-500/15 text-green-200!" : feedback && choice === answer ? "border-red-400/60 bg-red-500/10 text-red-200!" : "bg-white/5"}`} lang="es">{choice}</button>)}</div>}
        {feedback ? <div className="mt-7 max-w-xl" role="status" aria-live="polite">
          <p className={`text-lg font-medium ${feedback.status === "correct" ? "text-green-300" : feedback.status === "assisted" ? "text-blue-300" : "text-amber-300"}`}>{feedback.status === "correct" ? "Correct." : feedback.status === "assisted" ? "Correct with a hint." : "Keep this one in your review."}</p>
          <p className="mt-2 text-sm text-white/75">Answer: <strong lang="es">{expectedAnswer(current)}</strong>{feedback.accentReminder && " · Remember the accent marks / ü on paper."}</p>
          {current.place.note && <p className="mt-2 text-sm text-white/55">{current.place.note}</p>}
          {current.kind === "name" && <p className="mt-2 text-sm leading-relaxed text-white/55">{current.place.clue}</p>}
          <button ref={nextButtonRef} type="button" onClick={nextQuestion} className={`${primaryButtonClass} mt-5`}>{index === deck.length - 1 ? "See quiz results" : "Next question"}</button>
        </div> : <div className="mt-5 flex gap-3"><button type="button" disabled={hint} onClick={() => setHint(true)} className={`${buttonClass} text-white/70`}>Hint</button><button type="button" onClick={() => check("", true)} className={`${buttonClass} border-transparent text-white/60`}>Skip question</button></div>}
      </div> : <div className="py-10" aria-live="polite"><h2 className="text-3xl font-semibold">Round complete.</h2><p className="mt-3 text-white/70">{scores.correct} / {deck.length} correct without help. {scores.assisted} hinted, {scores.missed} missed or skipped.</p><div className="mt-6 flex flex-wrap gap-3"><button type="button" disabled={!misses.length} onClick={() => start(misses)} className={primaryButtonClass}>Retry missed & hinted ({misses.length})</button><button type="button" onClick={() => start(questionsFor(category))} className={buttonClass}>Start another round</button></div></div>}
      <div className="border-t border-white/10 pt-4"><p className="text-sm text-white/60">{current ? index + 1 : deck.length} of {deck.length}</p><progress aria-label="Recall round progress" value={index + (feedback ? 1 : 0)} max={deck.length} className="mt-3 h-1.5 w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:bg-white/10 [&::-webkit-progress-value]:bg-blue-500 [&::-moz-progress-bar]:bg-blue-500" /></div>
    </div>
    <aside className={`${panelClass} p-6`}>
      <h3 className="text-lg font-semibold">Make it stick.</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/65">Start with choices, then switch to typing. Your quiz is on paper, so practice spelling the names from memory.</p>
      <p className="mt-6 text-sm leading-relaxed text-white/65">Your quiz uses masculine nationalities only.</p>
      <div className="mt-6 space-y-4 border-t border-white/10 pt-5 text-sm leading-relaxed text-white/65">
        <p><span className="text-white">Country names:</span> capital letter. <span lang="es">México, España, Perú.</span></p>
        <p><span className="text-white">Nationalities:</span> lowercase. <span lang="es">mexicano, español, peruano.</span></p>
        <p><span className="text-white">Remember the -ense forms:</span> <span lang="es">costarricense, nicaragüense.</span></p>
      </div>
      <button type="button" disabled={!savedMisses.length} onClick={() => start(savedMisses)} className={`${primaryButtonClass} mt-6 w-full`}>Review missed ({savedMisses.length})</button>
      <button type="button" onClick={() => start(questionsFor(category))} className={`${buttonClass} mt-3 w-full`}>Shuffle quiz</button>
    </aside>
  </div>;
}
