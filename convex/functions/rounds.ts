import { v } from "convex/values";
import { ROUND_DURATION_MS } from "../../src/constants/index";
import { mutation, query } from "../_generated/server";

export const getOrCreateGameWithActiveRound = mutation(async ({ db }) => {
  let game = await db.query("games").first();

  if (!game) {
    const gameId = await db.insert("games", {
      currentRoundId: undefined,
    });
    game = (await db.get(gameId))!;
  }

  const now = Date.now();
  const currentRound = game.currentRoundId
    ? await db.get(game.currentRoundId)
    : null;

  if (currentRound && now < currentRound.endsAt) {
    return game._id;
  }

  // Czyszczenie starych danych z DB
  const rounds = await db.query("rounds").collect();
  for (const round of rounds) await db.delete(round._id);

  const participants = await db.query("roundParticipants").collect();
  for (const participant of participants) await db.delete(participant._id);

  // Nowa runda
  const sentences = await db.query("sentences").collect();
  if (sentences.length === 0) throw new Error("No sentences seeded");

  // Losowanie zdania
  const sentence = sentences[Math.floor(Math.random() * sentences.length)];
  const roundId = await db.insert("rounds", {
    gameId: game._id,
    sentenceId: sentence._id,
    startsAt: now,
    endsAt: now + ROUND_DURATION_MS,
  });

  await db.patch(game._id, { currentRoundId: roundId });

  return game._id;
});

export const getCurrentRound = query({
  args: { gameId: v.id("games") },
  handler: async ({ db }, { gameId }) => {
    const game = await db.get(gameId);
    if (!game?.currentRoundId) return null;

    const round = await db.get(game.currentRoundId);
    if (!round) return null;

    const sentence = await db.get(round.sentenceId);
    if (!sentence) return null;

    return {
      roundId: round._id,
      sentence: sentence.text,
      startsAt: round.startsAt,
      endsAt: round.endsAt,
    };
  },
});
