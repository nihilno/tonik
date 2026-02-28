import { v } from "convex/values";
import {
  computeAccuracy,
  computeMistakes,
  levenshtein,
} from "../../src/lib/utils";
import { mutation } from "../_generated/server";
import { getParticipant } from "./roundParticipants";

// te funkcje są podobne, aczkolwiek updateProgress będzie wywoływane na bieżąco podczas pisania, a submitResult tylko raz, po zakończeniu rundy, więc zostały rodzielone.

export const updateProgress = mutation({
  args: {
    roundId: v.id("rounds"),
    userId: v.id("users"),
    typedText: v.string(),
  },
  handler: async ({ db }, { roundId, userId, typedText }) => {
    const round = await db.get(roundId);
    if (!round) return;

    const sentence = await db.get(round.sentenceId);
    if (!sentence) return;

    const now = Date.now();
    const minutes = Math.max((now - round.startsAt) / 60000, 0.001);
    const wpm = typedText.length / 5 / minutes;

    const existing = await getParticipant(db, roundId, userId);

    if (!existing) {
      const mistakes = levenshtein(
        typedText,
        sentence.text.slice(0, typedText.length),
      );
      const totalTyped = typedText.length;
      const totalMistakes = mistakes;
      const accuracy = computeAccuracy(totalTyped, totalMistakes);

      await db.insert("roundParticipants", {
        roundId,
        userId,
        typedText,
        wpm,
        accuracy,
        totalTyped,
        totalMistakes,
        finishedAt: undefined,
      });
      return;
    }

    const mistakesThisUpdate = computeMistakes(
      existing.typedText,
      typedText,
      sentence.text,
    );

    const deltaTyped = Math.max(
      0,
      typedText.length - existing.typedText.length,
    );

    const totalTyped = existing.totalTyped + deltaTyped;
    const totalMistakes = existing.totalMistakes + mistakesThisUpdate;
    const accuracy = computeAccuracy(totalTyped, totalMistakes);

    await db.patch(existing._id, {
      typedText,
      wpm,
      accuracy,
      totalTyped,
      totalMistakes,
    });
  },
});

export const submitResult = mutation({
  args: {
    roundId: v.id("rounds"),
    userId: v.id("users"),
    typedText: v.string(),
    finishedAt: v.number(),
  },
  handler: async ({ db }, { roundId, userId, typedText, finishedAt }) => {
    const round = await db.get(roundId);
    if (!round) return;

    const sentence = await db.get(round.sentenceId);
    if (!sentence) return;

    const minutes = (finishedAt - round.startsAt) / 60000;
    const wpm = sentence.text.length / 5 / minutes;

    const existing = await getParticipant(db, roundId, userId);

    if (!existing) {
      const mistakes = levenshtein(
        typedText,
        sentence.text.slice(0, typedText.length),
      );
      const totalTyped = typedText.length;
      const totalMistakes = mistakes;
      const accuracy = computeAccuracy(totalTyped, totalMistakes);

      await db.insert("roundParticipants", {
        roundId,
        userId,
        typedText,
        finishedAt,
        wpm,
        accuracy,
        totalTyped,
        totalMistakes,
      });
      return;
    }

    const mistakesThisUpdate = computeMistakes(
      existing.typedText,
      typedText,
      sentence.text,
    );

    const deltaTyped = Math.max(
      0,
      typedText.length - existing.typedText.length,
    );

    const totalTyped = existing.totalTyped + deltaTyped;
    const totalMistakes = existing.totalMistakes + mistakesThisUpdate;
    const accuracy = computeAccuracy(totalTyped, totalMistakes);

    await db.patch(existing._id, {
      typedText,
      finishedAt,
      wpm,
      accuracy,
      totalTyped,
      totalMistakes,
    });
  },
});
