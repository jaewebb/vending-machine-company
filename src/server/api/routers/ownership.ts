import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const ownershipRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const ownership = await ctx.db.orm.public.Ownership.where({ isDeleted: false }).all();

    return ownership ?? null;
  }),
});
