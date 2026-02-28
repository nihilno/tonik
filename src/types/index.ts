import { Id } from "../../convex/_generated/dataModel";

export type User = {
  userId: Id<"users">;
  name: string;
};

export type Round = {
  roundId: Id<"rounds">;
  sentence: string;
  endsAt: number;
  startsAt: number;
};
