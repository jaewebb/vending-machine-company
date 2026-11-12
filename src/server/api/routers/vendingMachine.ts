import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const vendingMachineRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .input(z.object({ manufacturer: z.string().optional() }))
    .input(z.object({ model: z.string().optional() }))
    .input(z.object({ serialNumber: z.string().optional() }))
    .input(z.object({ hasTapReader: z.boolean().optional() }))
    .input(z.object({ acceptsCash: z.boolean().optional() }))
    .input(z.object({ installationDate: z.date().optional() }))
    .input(z.object({ lastServicedAt: z.date().optional() }))
    .input(z.object({ notes: z.string().optional() }))
    .input(z.object({ statusId: z.coerce.number().min(1) }))
    .input(z.object({ locationId: z.coerce.number().min(1) }))
    .input(z.object({ typeId: z.coerce.number().min(1) }))
    .input(z.object({ ownershipId: z.coerce.number().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.orm.public.VendingMachine.create({
        name: input.name,
        manufacturer: input.manufacturer,
        model: input.model,
        serialNumber: input.serialNumber,
        hasTapReader: input.hasTapReader,
        acceptsCash: input.acceptsCash,
        installationDate: input.installationDate,
        lastServicedAt: input.lastServicedAt,
        notes: input.notes,
        statusId: input.statusId,
        locationId: input.locationId,
        typeId: input.typeId,
        ownershipId: input.ownershipId,
      });
    }),

  update: publicProcedure
    .input(z.object({ id: z.coerce.number().min(1) }))
    .input(z.object({ name: z.string().min(1) }))
    .input(z.object({ manufacturer: z.string().min(1) }))
    .input(z.object({ model: z.string().min(1) }))
    .input(z.object({ serialNumber: z.string().min(1) }))
    .input(z.object({ hasTapReader: z.boolean().optional() }))
    .input(z.object({ acceptsCash: z.boolean().optional() }))
    .input(z.object({ installationDate: z.date().optional() }))
    .input(z.object({ lastServicedAt: z.date().optional() }))
    .input(z.object({ notes: z.string().optional() }))
    .input(z.object({ statusId: z.coerce.number().min(1) }))
    .input(z.object({ locationId: z.coerce.number().min(1) }))
    .input(z.object({ typeId: z.coerce.number().min(1) }))
    .input(z.object({ ownershipId: z.coerce.number().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      return ctx.db.orm.public.VendingMachine.where({ id }).update({
        name: input.name,
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const vendingMachine = await ctx.db.orm.public.VendingMachine.where({ isDeleted: false }).all();

    return vendingMachine ?? null;
  }),

  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(async ({ ctx, input }) => {
    const { id } = input;

    return ctx.db.orm.public.VendingMachine.where({ id }).update({ isDeleted: true });
  }),
});
