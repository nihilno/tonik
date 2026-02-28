"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export function useRound(gameId: Id<"games"> | null) {
  const round = useQuery(
    api.functions.rounds.getCurrentRound,
    gameId ? { gameId } : "skip",
  );

  return { round: round ?? null };
}
