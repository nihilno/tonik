import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const getOrCreateUser = mutation({
  args: { name: v.string() },
  handler: async ({ db }, { name }) => {
    const exsists = await db
      .query("users")
      .withIndex("by_name", (q) => q.eq("name", name))
      .first();

    if (exsists) return exsists._id;
    return db.insert("users", { name });
  },
});
