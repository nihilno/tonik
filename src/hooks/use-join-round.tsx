import { Round, User } from "@/types";
import { useMutation } from "convex/react";
import { useEffect, useRef } from "react";
import { api } from "../../convex/_generated/api";

export function useJoinRound(round: Round | null, user: User | null) {
  const joinRound = useMutation(api.functions.rounds.joinRound);
  const lastJoined = useRef<string | null>(null);

  useEffect(() => {
    if (!round || !user) return;
    if (lastJoined.current === round.roundId) return;

    lastJoined.current = round.roundId;

    joinRound({
      roundId: round.roundId,
      userId: user.userId,
    });
  }, [round, user, joinRound]);
}
