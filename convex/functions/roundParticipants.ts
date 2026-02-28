import { v } from "convex/values";
import { Id } from "../_generated/dataModel";
import { DatabaseReader, DatabaseWriter, query } from "../_generated/server";

export async function getParticipant(
  db: DatabaseReader | DatabaseWriter,
  roundId: Id<"rounds">,
  userId: Id<"users">,
) {
  return await db
    .query("roundParticipants")
    .withIndex("by_round_user", (q) =>
      q.eq("roundId", roundId).eq("userId", userId),
    )
    .first();
}

export const getParticipants = query({
  args: { roundId: v.id("rounds") },
  handler: async ({ db }, { roundId }) => {
    const rows = await db
      .query("roundParticipants")
      .withIndex("by_round_user", (q) => q.eq("roundId", roundId))
      .collect();

    const userIds = rows.map((r) => r.userId);

    // Pobierz wszystkich userów jednym zapytaniem
    const users = await Promise.all(userIds.map((id) => db.get(id)));

    return rows.map((row, i) => ({
      name: users[i]?.name ?? "Unknown",
      typedText: row.typedText,
      wpm: row.wpm,
      accuracy: row.accuracy,
    }));
  },
});
