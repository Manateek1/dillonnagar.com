"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { satVocabulary } from "@/data/sat-vocabulary";

const initialDeck = { remaining: satVocabulary, index: 0, revealed: false };
const secondaryButton =
  "cursor-pointer border border-[var(--line)] px-4 py-2 text-sm font-medium hover:bg-[var(--background)] disabled:cursor-default disabled:opacity-40";

export default function VocabularyDeck() {
  const [deck, setDeck] = useState(initialDeck);
  const flipButton = useRef<HTMLButtonElement>(null);
  const restartButton = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);
  const { remaining, index, revealed } = deck;
  const card = remaining[index];
  const learned = satVocabulary.length - remaining.length;

  const moveCard = useCallback((direction: -1 | 1) => {
    setDeck((current) => {
      const nextIndex = current.index + direction;
      if (nextIndex < 0 || nextIndex >= current.remaining.length) return current;
      return { ...current, index: nextIndex, revealed: false };
    });
  }, []);

  const flipCard = useCallback(() => {
    setDeck((current) => {
      if (!current.remaining.length) return current;
      return { ...current, revealed: !current.revealed };
    });
  }, []);

  useEffect(() => {
    if (!card) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target;
      if (target instanceof HTMLElement) {
        if (target.isContentEditable || target.closest("input, textarea, select")) return;
        if (event.key === " " && target.closest("button, a, [role=button], summary")) return;
      }

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          moveCard(-1);
          break;
        case "ArrowRight":
          event.preventDefault();
          moveCard(1);
          break;
        case " ":
          event.preventDefault();
          if (!event.repeat) flipCard();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [card, flipCard, moveCard]);

  useEffect(() => {
    if (!restoreFocus.current) return;
    restoreFocus.current = false;
    (card ? flipButton.current : restartButton.current)?.focus();
  }, [card, deck]);

  function navigateFromButton(direction: -1 | 1) {
    moveCard(direction);
    flipButton.current?.focus();
  }

  function rateCard(studyAgain: boolean) {
    restoreFocus.current = true;
    setDeck((current) => {
      const currentCard = current.remaining[current.index];
      if (!currentCard) return current;
      const nextCards = current.remaining.slice();
      nextCards.splice(current.index, 1);
      if (studyAgain) nextCards.splice(current.index + 5, 0, currentCard);
      const nextIndex = current.index < nextCards.length ? current.index : 0;
      return { remaining: nextCards, index: nextIndex, revealed: false };
    });
  }

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center gap-4">
        <p id="vocabulary-progress" className="shrink-0 text-sm tabular-nums text-[var(--muted)]">
          {learned} of {satVocabulary.length} learned
        </p>
        <progress
          className="h-1.5 w-full accent-[var(--olive-dark)]"
          aria-labelledby="vocabulary-progress"
          value={learned}
          max={satVocabulary.length}
        />
      </div>
      <section
        aria-labelledby="vocabulary-word"
        className="border border-[var(--line)] border-t-2 border-t-[var(--navy)] bg-[var(--surface)] p-5 sm:p-8"
      >
        {card ? (
          <>
            <div aria-live="polite" aria-atomic="true">
              <h2 id="vocabulary-word" className="break-words font-[Georgia,serif] text-4xl sm:text-5xl">
                {card[0]}
              </h2>
              <div id="vocabulary-definition" hidden={!revealed}>
                <div className="mt-4 border-l-2 border-[var(--olive)] bg-[var(--background)] px-4 py-3">
                  <h3 className="text-sm font-medium text-[var(--olive-dark)]">Definition</h3>
                  <p className="mt-1 leading-relaxed">{card[1]}</p>
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                ref={flipButton}
                className="button-primary cursor-pointer"
                type="button"
                aria-controls="vocabulary-definition"
                aria-expanded={revealed}
                aria-keyshortcuts="Space"
                onClick={flipCard}
              >
                {revealed ? "Hide definition" : "Show definition"}
              </button>
              {revealed && (
                <>
                  <button className={secondaryButton} type="button" onClick={() => rateCard(false)}>
                    Got it
                  </button>
                  <button className={secondaryButton} type="button" onClick={() => rateCard(true)}>
                    Study again
                  </button>
                </>
              )}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--line)] pt-4">
              <button
                className={secondaryButton}
                type="button"
                aria-keyshortcuts="ArrowLeft"
                disabled={index === 0}
                onClick={() => navigateFromButton(-1)}
              >
                Previous
              </button>
              <span className="text-sm tabular-nums text-[var(--muted)]">
                Card {index + 1} of {remaining.length}
              </span>
              <button
                className={secondaryButton}
                type="button"
                aria-keyshortcuts="ArrowRight"
                disabled={index === remaining.length - 1}
                onClick={() => navigateFromButton(1)}
              >
                Next
              </button>
            </div>
            <p className="mt-3 text-sm text-[var(--muted)]">
              <kbd>←</kbd> / <kbd>→</kbd> to move, <kbd>Space</kbd> to flip
            </p>
          </>
        ) : (
          <>
            <h2 id="vocabulary-word" className="font-[Georgia,serif] text-4xl">
              Deck complete
            </h2>
            <button
              ref={restartButton}
              className="button-primary mt-5 cursor-pointer"
              type="button"
              onClick={() => {
                restoreFocus.current = true;
                setDeck(initialDeck);
              }}
            >
              Start over
            </button>
          </>
        )}
      </section>
    </div>
  );
}
