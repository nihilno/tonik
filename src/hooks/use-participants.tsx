import { Participant } from "@/types";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export function useParticipants(roundId: Id<"rounds"> | null) {
  const participants = useQuery(
    api.functions.roundParticipants.getParticipants,
    roundId ? { roundId } : "skip",
  ) as Participant[] | undefined;

  return [...(participants ?? [])].sort((a, b) => (b.wpm ?? 0) - (a.wpm ?? 0));
}
