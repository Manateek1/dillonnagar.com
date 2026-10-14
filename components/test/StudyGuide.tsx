"use client";

import { useState } from "react";
import { spanishPlaces, studyPlaces, studySources } from "@/data/spanish-study";
import { normalizeAnswer, panelClass } from "./study-utils";

export default function StudyGuide() {
  const [query, setQuery] = useState("");
  const filtered = studyPlaces.filter((place) => normalizeAnswer([place.spanish, place.english, place.group, place.nationality?.[0] ?? ""].join(" ")).includes(normalizeAnswer(query)));
  const groups = [...new Set(filtered.map((place) => place.group))];

  return <div className="space-y-6">
    <div className={`${panelClass} flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center sm:p-6`}>
      <div><h2 className="text-2xl font-semibold tracking-tight">Your quiz checklist.</h2><p className="mt-2 text-sm leading-relaxed text-white/60">21 Spanish-speaking places · 11 nearby places, including the U.S. and Miami · 5 bodies of water</p></div>
      <label className="shrink-0 text-xs text-white/60">Find a name or nationality<input type="search" aria-label="Search study guide" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try Perú or costarricense" className="mt-2 block min-h-11 w-full rounded-lg border border-white/15 bg-white/5 px-3 text-sm text-white placeholder:text-white/35 sm:w-64" /></label>
    </div>
    {!query && <div className="grid gap-5 border-y border-white/10 py-6 md:grid-cols-3">
      <div><h3 className="font-semibold">Central America, in order</h3><p className="mt-2 text-sm leading-relaxed text-white/65" lang="es">Guatemala → El Salvador / Honduras → Nicaragua → Costa Rica → Panamá.</p><p className="mt-2 text-xs leading-relaxed text-white/45">Belice sits east of Guatemala; it belongs to the neighbors list.</p></div>
      <div><h3 className="font-semibold">Caribbean, west to east</h3><p className="mt-2 text-sm leading-relaxed text-white/65" lang="es">Cuba → República Dominicana → Puerto Rico.</p><p className="mt-2 text-xs leading-relaxed text-white/45">Jamaica is below Cuba. Haití is the western part of Hispaniola.</p></div>
      <div><h3 className="font-semibold">The easy mix-ups</h3><p className="mt-2 text-sm leading-relaxed text-white/65" lang="es">Guatemala ≠ Guyana ≠ Guayana Francesa. Uruguay ≠ Paraguay.</p><p className="mt-2 text-xs leading-relaxed text-white/45">Paraguay is landlocked; Uruguay has an Atlantic coast. Guinea Ecuatorial is in Africa.</p></div>
    </div>}
    {groups.map((group) => <section key={group} className={`${panelClass} overflow-hidden`}>
      <h3 className="border-b border-white/10 px-5 py-4 text-lg font-semibold">{group}</h3>
      <div className="divide-y divide-white/10">{filtered.filter((place) => place.group === group).map((place) => <div key={place.id} className="grid gap-2 px-5 py-5 sm:grid-cols-[minmax(150px,0.7fr)_minmax(150px,0.8fr)_minmax(0,1.7fr)] sm:gap-5">
        <div><p className="font-medium" lang="es">{place.spanish}</p><p className="mt-1 text-xs text-white/50">{place.english}</p></div>
        <div>{place.nationality ? <><p className="text-xs text-white/40">MASCULINE NATIONALITY</p><p className="mt-1 text-sm text-blue-200" lang="es">{place.nationality[0]}</p></> : <p className="text-xs text-white/45">{place.topic === "water" ? "Know the Spanish name and location." : "Locate this place on the map."}</p>}</div>
        <div><p className="text-sm leading-relaxed text-white/65">{place.clue}</p>{place.note && <p className="mt-2 text-xs leading-relaxed text-white/45">{place.note}</p>}</div>
      </div>)}</div>
    </section>)}
    {!filtered.length && <p className="py-6 text-white/60">No matches. Try a country name in English or Spanish.</p>}
    <div className="text-xs leading-relaxed text-white/45"><p>Scope follows your screenshot. Puerto Rico is a territory; Guayana Francesa is part of France. Both are included where the checklist calls for them.</p><p className="mt-2">Nationalities shown for all {spanishPlaces.length} Spanish-speaking places. Sources:</p><div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">{studySources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="underline decoration-white/20 underline-offset-4 hover:text-white">{source.label}</a>)}</div></div>
  </div>;
}
