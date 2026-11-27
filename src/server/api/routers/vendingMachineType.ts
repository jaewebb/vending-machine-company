import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const vendingMachineTypeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const type = await ctx.db.orm.public.VendingMachineType.where({ isDeleted: false }).all();

    return type ?? null;
  }),
});
