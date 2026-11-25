"use client";

import { useEffect, useRef, useState } from "react";
import { satVocabulary } from "@/data/sat-vocabulary";

export default function VocabularyDeck() {
  const [remaining, setRemaining] = useState(satVocabulary);
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const answerField = useRef<HTMLTextAreaElement>(null);
  const definitionPanel = useRef<HTMLDivElement>(null);
  const completionHeading = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);
  const card = remaining[0];
  const learned = satVocabulary.length - remaining.length;

  useEffect(() => {
    if (revealed) {
      definitionPanel.current?.focus();
    } else if (started.current) {
      if (card) answerField.current?.focus();
      else completionHeading.current?.focus();
    }
  }, [card, revealed]);

  function rateCard(studyAgain: boolean) {
    if (!card) return;
    const nextCards = remaining.slice(1);
    if (studyAgain) nextCards.splice(5, 0, card);
    setRemaining(nextCards);
    setAnswer("");
    setRevealed(false);
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
            <h2 id="vocabulary-word" className="break-words font-[Georgia,serif] text-4xl sm:text-5xl">
              {card[0]}
            </h2>
            <label htmlFor="vocabulary-answer" className="mt-6 block text-sm font-medium">
              Your definition
            </label>
            <textarea
              ref={answerField}
              id="vocabulary-answer"
              aria-describedby="vocabulary-word"
              className="mt-2 w-full resize-y rounded-sm border border-[var(--line)] bg-white p-3 text-base leading-relaxed"
              rows={3}
              value={answer}
              readOnly={revealed}
              onChange={(event) => setAnswer(event.target.value)}
            />
            {revealed ? (
              <>
                <div
                  ref={definitionPanel}
                  tabIndex={-1}
                  className="mt-4 border-l-2 border-[var(--olive)] bg-[var(--background)] px-4 py-3"
                >
                  <h3 className="text-sm font-medium text-[var(--olive-dark)]">Definition</h3>
                  <p className="mt-1 leading-relaxed">{card[1]}</p>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="button-primary cursor-pointer" type="button" onClick={() => rateCard(false)}>
                    Got it
                  </button>
                  <button
                    className="cursor-pointer border border-[var(--line)] px-4 py-2 text-sm font-medium hover:bg-[var(--background)]"
                    type="button"
                    onClick={() => rateCard(true)}
                  >
                    Study again
                  </button>
                </div>
              </>
            ) : (
              <button
                className="button-primary mt-5 cursor-pointer"
                type="button"
                onClick={() => {
                  started.current = true;
                  setRevealed(true);
                }}
              >
                Show definition
              </button>
            )}
          </>
        ) : (
          <>
            <h2 id="vocabulary-word" ref={completionHeading} tabIndex={-1} className="font-[Georgia,serif] text-4xl">
              Deck complete
            </h2>
            <button className="button-primary mt-5 cursor-pointer" type="button" onClick={() => setRemaining(satVocabulary)}>
              Start over
            </button>
          </>
        )}
      </section>
    </div>
  );
}
