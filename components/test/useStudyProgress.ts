"use client";

import { useMemo, useSyncExternalStore } from "react";

export type AttemptStatus = "correct" | "missed" | "assisted";
export type AttemptRecord = { correct: number; missed: number; assisted: number; last: AttemptStatus };
export type StudyProgress = Record<string, AttemptRecord>;

const storageKey = "dn-spanish-study-v1";
const changeEvent = "dn:spanish-study";
let fallbackSnapshot = "";
let storageFailed = false;

function getSnapshot(): string {
  try { return storageFailed ? fallbackSnapshot : window.localStorage.getItem(storageKey) ?? fallbackSnapshot; }
  catch { return fallbackSnapshot; }
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  window.addEventListener(changeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(changeEvent, onChange);
  };
}

function parseProgress(snapshot: string): StudyProgress {
  if (!snapshot) return {};
  try {
    const value: unknown = JSON.parse(snapshot);
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    const result: StudyProgress = {};
    for (const [key, item] of Object.entries(value)) {
      if (!item || typeof item !== "object") continue;
      const row = item as Record<string, unknown>;
      if ([row.correct, row.missed, row.assisted].every((n) => typeof n === "number" && Number.isSafeInteger(n) && n >= 0) && ["correct", "missed", "assisted"].includes(String(row.last))) {
        result[key] = { correct: row.correct as number, missed: row.missed as number, assisted: row.assisted as number, last: row.last as AttemptStatus };
      }
    }
    return result;
  } catch { return {}; }
}

export function useStudyProgress() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "");
  const progress = useMemo(() => parseProgress(snapshot), [snapshot]);

  function recordAttempt(key: string, status: AttemptStatus): boolean {
    const latest = parseProgress(getSnapshot());
    const previous = latest[key] ?? { correct: 0, missed: 0, assisted: 0, last: status };
    latest[key] = { ...previous, [status]: previous[status] + 1, last: status };
    fallbackSnapshot = JSON.stringify(latest);
    try { window.localStorage.setItem(storageKey, fallbackSnapshot); storageFailed = false; }
    catch { storageFailed = true; }
    window.dispatchEvent(new Event(changeEvent));
    return !storageFailed;
  }

  return { progress, recordAttempt };
}
