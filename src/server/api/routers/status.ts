import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const statusRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const status = await ctx.db.orm.public.Status.where({ isDeleted: false }).all();

    return status ?? null;
  }),
});
