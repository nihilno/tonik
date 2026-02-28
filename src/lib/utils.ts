import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0),
  );

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }

  return dp[a.length][b.length];
}

export function computeMistakes(
  prevText: string,
  newText: string,
  sentence: string,
) {
  const prevExpected = sentence.slice(0, prevText.length);
  const currentExpected = sentence.slice(0, newText.length);

  const prevMistakes = levenshtein(prevText, prevExpected);
  const currentMistakes = levenshtein(newText, currentExpected);

  return Math.max(0, currentMistakes - prevMistakes);
}

export function computeAccuracy(totalTyped: number, totalMistakes: number) {
  return totalTyped === 0 ? 1 : 1 - totalMistakes / totalTyped;
}
