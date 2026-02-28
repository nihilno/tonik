import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
  }).index("by_name", ["name"]),

  rounds: defineTable({
    gameId: v.id("games"),
    sentenceId: v.id("sentences"),
    startsAt: v.number(),
    endsAt: v.number(),
  }),

  games: defineTable({
    currentRoundId: v.optional(v.id("rounds")),
  }),

  sentences: defineTable({
    text: v.string(),
  }),

  roundParticipants: defineTable({
    roundId: v.id("rounds"),
    userId: v.id("users"),
    finishedAt: v.optional(v.number()),
    typedText: v.string(),
    wpm: v.number(),
    accuracy: v.number(),

    totalTyped: v.number(), // dla lepszego obliczenia accuracy
    totalMistakes: v.number(), // dla lepszego obliczenia accuracy
  }),
});
