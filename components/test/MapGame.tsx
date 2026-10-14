"use client";

import { useState } from "react";
import { mapViews, placeById, studyPlaces, topicLabels, type MapView, type StudyPlace, type Topic } from "@/data/spanish-study";
import GeographyMap from "./GeographyMap";
import { buttonClass, panelClass, primaryButtonClass, shuffled } from "./study-utils";
import type { AttemptStatus, StudyProgress } from "./useStudyProgress";

type Feedback = { status: AttemptStatus; chosen?: string; chosenName?: string };
type Props = { progress: StudyProgress; onAttempt: (key: string, status: AttemptStatus) => void };

export default function MapGame({ progress, onAttempt }: Props) {
  const [explore, setExplore] = useState(false);
  const [view, setView] = useState<MapView>("americas");
  const [topics, setTopics] = useState<Topic[]>(["spanish", "neighbors", "water"]);
  const [deck, setDeck] = useState<readonly StudyPlace[]>(studyPlaces);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [hint, setHint] = useState(false);
  const [misses, setMisses] = useState<StudyPlace[]>([]);
  const [scores, setScores] = useState({ correct: 0, missed: 0, assisted: 0 });
  const [selected, setSelected] = useState<StudyPlace>(studyPlaces[0]);
  const current = deck[index];
  const complete = !current;
  const savedMisses = studyPlaces.filter((place) => topics.includes(place.topic) && progress[`map:${place.id}`] && progress[`map:${place.id}`].last !== "correct");

  function start(items: readonly StudyPlace[]) {
    if (!items.length) return;
    const next = shuffled(items);
    setDeck(next); setIndex(0); setFeedback(null); setHint(false); setMisses([]);
    setScores({ correct: 0, missed: 0, assisted: 0 });
    setView(next[0].region); setExplore(false);
  }

  function changeTopic(topic: Topic) {
    const next = topics.includes(topic) ? topics.filter((item) => item !== topic) : [...topics, topic];
    if (!next.length) return;
    setTopics(next);
    start(studyPlaces.filter((place) => next.includes(place.topic)));
  }

  function answer(id?: string) {
    if (explore) {
      const place = id ? placeById.get(id) : undefined;
      if (place) setSelected(place);
      return;
    }
    if (!current || feedback) return;
    const status: AttemptStatus = id === current.id ? hint ? "assisted" : "correct" : "missed";
    const chosenName = id ? placeById.get(id)?.spanish ?? "a different country" : undefined;
    setFeedback({ status, chosen: id, chosenName });
    setScores((previous) => ({ ...previous, [status]: previous[status] + 1 }));
    if (status !== "correct") setMisses((previous) => [...previous, current]);
    onAttempt(`map:${current.id}`, status);
  }

  function nextQuestion() {
    const next = deck[index + 1];
    setIndex((previous) => previous + 1); setFeedback(null); setHint(false);
    if (next) setView(next.region);
  }

  function beginPractice() {
    setExplore(false);
    if (current) setView(current.region);
  }

  function beginExplore() {
    setExplore(true);
    setView(selected.region);
  }

  const shown = explore ? selected : current;

  return <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_365px]">
    {!explore && current && <div className={`${panelClass} p-4 lg:hidden`}>
      <p className="text-xs text-white/50">FIND ON THE MAP · {index + 1} / {deck.length}</p>
      <div className="mt-2 flex items-center justify-between gap-3"><h2 className="text-2xl font-semibold" lang="es">{current.spanish}</h2>{feedback ? <button type="button" onClick={nextQuestion} className={primaryButtonClass}>{index === deck.length - 1 ? "Results" : "Next place"}</button> : <div className="flex shrink-0 gap-1"><button type="button" aria-label="Show hint" disabled={hint} onClick={() => setHint(true)} className={`${buttonClass} px-3`}>Hint</button><button type="button" onClick={() => answer()} className={`${buttonClass} border-transparent px-2`}>Skip</button></div>}</div>
      {hint && !feedback && <p className="mt-3 text-sm leading-relaxed text-blue-200">{current.clue}</p>}
      {feedback && <p role="status" aria-live="polite" className="mt-3 text-sm text-green-200">{feedback.status === "correct" ? "Correct." : feedback.status === "assisted" ? "Correct with a hint." : `Answer: ${current.spanish}. Highlighted in green.`}</p>}
      {feedback && <p className="mt-2 text-xs leading-relaxed text-white/65">{current.clue}</p>}
      {!feedback && current.topic === "water" && <p className="mt-2 text-xs text-white/55">Click a numbered water marker.</p>}
    </div>}
    <div className={`${panelClass} min-w-0 overflow-hidden`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-4">
        <label className="flex items-center gap-2 text-sm text-white/60">View
          <select aria-label="Map view" value={view} onChange={(event) => setView(event.target.value as MapView)} className="min-h-11 max-w-[220px] rounded-lg border border-white/15 bg-[#161616] px-3 text-sm text-white focus-visible:outline-blue-400">
            {mapViews.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </label>
        <div className="inline-flex rounded-lg border border-white/10 p-1" role="group" aria-label="Map mode">
          <button type="button" aria-pressed={explore} onClick={beginExplore} className={`${buttonClass} border-transparent px-3 ${explore ? "bg-blue-500 text-white! hover:bg-blue-600" : "text-white/60!"}`}>Explore</button>
          <button type="button" aria-pressed={!explore} onClick={beginPractice} className={`${buttonClass} border-transparent px-3 ${!explore ? "bg-blue-500 text-white! hover:bg-blue-600" : "text-white/60!"}`}>Practice</button>
        </div>
      </div>
      <div className="px-3 pt-3 sm:px-5">
        <GeographyMap view={view} explore={explore} selected={explore ? selected.id : undefined} correct={feedback && current ? current.id : undefined} wrong={feedback?.status === "missed" ? feedback.chosen : undefined} disabled={!explore && (complete || !!feedback)} onPick={answer} />
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 px-5 py-4 text-xs text-white/60">
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-[#2264c4]" />Spanish-speaking places</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-sm border border-white/30 bg-[#272a30]" />Neighbors</span>
        <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full border border-dashed border-cyan-300" />Water markers</span>
        <span className="w-full pt-1 text-white/45">Use closer views for small countries. Click an outline or its numbered marker.</span>
      </div>
    </div>
    <aside className={`${panelClass} p-5 sm:p-6`} aria-label="Map practice question">
      <div className={!explore && current ? "hidden lg:block" : undefined}>
      {explore && shown ? <>
        <p className="text-xs font-medium tracking-wider text-white/60">EXPLORE THE MAP</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight" lang="es">{shown.spanish}</h2>
        <p className="mt-2 text-sm text-white/55">{shown.english} · {shown.group}</p>
        <p className="mt-5 text-sm leading-relaxed text-white/75">{shown.clue}</p>
        {shown.nationality && <div className="mt-5 border-t border-white/10 pt-4"><p className="text-xs text-white/50">NATIONALITY · MASCULINE</p><p className="mt-2 text-lg" lang="es">{shown.nationality[0]}</p></div>}
        {shown.note && <p className="mt-4 text-sm leading-relaxed text-blue-300">{shown.note}</p>}
        <label className="mt-6 block text-xs text-white/55">Jump to a place
          <select aria-label="Explore a place" value={selected.id} onChange={(event) => { const place = placeById.get(event.target.value); if (place) { setSelected(place); setView(place.region); } }} className="mt-2 min-h-11 w-full rounded-lg border border-white/15 bg-[#161616] px-3 text-sm text-white">
            {studyPlaces.map((place) => <option key={place.id} value={place.id}>{place.spanish}</option>)}
          </select>
        </label>
        <button type="button" onClick={beginPractice} className={`${primaryButtonClass} mt-5 w-full`}>Back to practice</button>
      </> : complete ? <div aria-live="polite">
        <p className="text-xs tracking-wider text-white/60">ROUND COMPLETE</p>
        <h2 className="mt-3 text-3xl font-semibold">{scores.correct} / {deck.length}</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/70">Correct without a hint. {scores.assisted} with a hint, {scores.missed} missed or skipped.</p>
        <button type="button" disabled={!misses.length} onClick={() => start(misses)} className={`${primaryButtonClass} mt-6 w-full`}>Retry missed & hinted ({misses.length})</button>
        <button type="button" onClick={() => start(studyPlaces.filter((place) => topics.includes(place.topic)))} className={`${buttonClass} mt-3 w-full`}>New round</button>
      </div> : <>
        <p className="text-xs font-medium tracking-wider text-white/60">FIND ON THE MAP</p>
        <h2 data-testid="map-prompt" className="mt-3 text-3xl font-semibold leading-tight tracking-tight" lang="es">{current.spanish}</h2>
        <p className="mt-2 text-sm text-white/55">{current.english}</p>
        <p className="mt-4 text-sm leading-relaxed text-white/65">{current.topic === "water" ? "Click the numbered water marker in the right body of water." : current.id === "MIA" ? "Click the city marker on Florida's coast." : "Click the country. Labels stay hidden in practice."}</p>
        {hint && !feedback && <p className="mt-4 rounded-lg border border-blue-400/25 bg-blue-500/10 p-3 text-sm leading-relaxed text-blue-200">{current.clue}</p>}
        {feedback ? <div className="mt-5" role="status" aria-live="polite">
          <p className={`font-medium ${feedback.status === "correct" ? "text-green-300" : feedback.status === "assisted" ? "text-blue-300" : "text-amber-300"}`}>{feedback.status === "correct" ? "Correct." : feedback.status === "assisted" ? "Correct with a hint." : feedback.chosen ? `You chose ${feedback.chosenName}.` : "Skipped. Added to your review."}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">{feedback.status !== "correct" && <><span lang="es">{current.spanish}</span> is highlighted in green. </>}{current.clue}</p>
          {current.nationality && <p className="mt-3 text-sm text-white/60" lang="es">{current.nationality[0]}</p>}
          <button type="button" onClick={nextQuestion} className={`${primaryButtonClass} mt-5 w-full`}>{index === deck.length - 1 ? "See results" : "Next place"}</button>
        </div> : <div className="mt-6 flex gap-3">
          <button type="button" disabled={hint} onClick={() => setHint(true)} className={primaryButtonClass}>Show hint</button>
          <button type="button" onClick={() => answer()} className={`${buttonClass} border-transparent text-white/70`}>Skip</button>
        </div>}
        <div className="mt-7"><p className="text-sm text-white/70">{index + 1} of {deck.length}</p><progress aria-label="Map round progress" value={index + (feedback ? 1 : 0)} max={deck.length} className="mt-3 h-1.5 w-full overflow-hidden rounded-full [&::-webkit-progress-bar]:bg-white/10 [&::-webkit-progress-value]:bg-blue-500 [&::-moz-progress-bar]:bg-blue-500" /></div>
      </>}
      </div>
      <fieldset className="mt-7 border-t border-white/10 pt-5">
        <legend className="sr-only">Include in this session</legend>
        <p className="text-sm font-semibold">Include in this session</p>
        <p className="mt-1 text-xs leading-relaxed text-white/50">Changing topics starts a fresh round.</p>
        <div className="mt-4 space-y-2">{(Object.keys(topicLabels) as Topic[]).map((topic) => <label key={topic} className="flex min-h-9 cursor-pointer items-center gap-3 text-sm"><input type="checkbox" checked={topics.includes(topic)} disabled={topics.includes(topic) && topics.length === 1} onChange={() => changeTopic(topic)} className="h-4 w-4 accent-blue-500" />{topicLabels[topic]}</label>)}</div>
      </fieldset>
      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" onClick={() => start(studyPlaces.filter((place) => topics.includes(place.topic)))} className={`${buttonClass} flex-1 px-3 text-xs`}>Shuffle round</button>
        <button type="button" disabled={!savedMisses.length} onClick={() => start(savedMisses)} className={`${buttonClass} flex-1 px-3`}>Review missed ({savedMisses.length})</button>
      </div>
    </aside>
  </div>;
}
