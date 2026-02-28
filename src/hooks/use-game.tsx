"use client";

import { User } from "@/types";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export function useGame(user: User | null) {
  const [gameId, setGameId] = useState<Id<"games"> | null>(null);

  const getOrCreateGameWithActiveRound = useMutation(
    api.functions.rounds.getOrCreateGameWithActiveRound,
  );

  useEffect(() => {
    if (!user) return;

    (async () => {
      const id = await getOrCreateGameWithActiveRound();
      setGameId(id);
    })();
  }, [user, getOrCreateGameWithActiveRound]);

  return { gameId, getOrCreateGameWithActiveRound };
}
