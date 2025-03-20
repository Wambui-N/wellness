import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Fetch all tags
export const getTags = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tags").collect();
  },
});

// Add a new tag (if it doesn't already exist)
export const addTag = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    // Check if tag already exists
    const existingTag = await ctx.db
      .query("tags")
      .filter((q) => q.eq(q.field("name"), args.name.toLowerCase()))
      .first();

    if (!existingTag) {
      await ctx.db.insert("tags", { name: args.name.toLowerCase() });
    }
  },
});
