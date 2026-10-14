// The portfolio's unlayered button reset inherits font/color. Important utility
// modifiers keep this route's controls consistent without editing that reset.
export const buttonClass = "inline-flex min-h-11 items-center justify-center rounded-lg border border-white/15 px-4 py-2 text-sm! font-medium! transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 disabled:cursor-not-allowed disabled:opacity-40";
export const primaryButtonClass = `${buttonClass} border-blue-500 bg-blue-500 text-white! hover:bg-blue-600`;
export const panelClass = "rounded-xl border border-white/10 bg-[#0a0a0a]";

export function shuffled<T>(items: readonly T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Fold vowel accents for practice, but preserve ñ as a distinct Spanish letter.
export function normalizeAnswer(value: string, strict = false): string {
  const text = value.trim().toLocaleLowerCase("es").replace(/\s+/g, " ").normalize("NFC");
  return strict ? text : text.replace(/[áéíóúü]/g, (letter) => ({ á: "a", é: "e", í: "i", ó: "o", ú: "u", ü: "u" })[letter] ?? letter);
}
