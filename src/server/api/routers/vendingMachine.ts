import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const vendingMachineRouter = createTRPCRouter({
  create: protectedProcedure
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
        createdBy: ctx.session.user.id,
      });
    }),

  update: protectedProcedure
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

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const vendingMachine = await ctx.db.orm.public.VendingMachine.orderBy((l) => l.name.asc())
      .where({
        isDeleted: false,
        createdBy: ctx.session.user.id,
      })
      .all();

    return vendingMachine ?? null;
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.coerce.number().min(1) }))
    .query(async ({ ctx, input }) => {
      const vendingMachine = await ctx.db.orm.public.VendingMachine.where({
        id: input.id,
        isDeleted: false,
        createdBy: ctx.session.user.id,
      }).first();

      return vendingMachine ?? null;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.orm.public.VendingMachine.where({ id: input.id }).update({ isDeleted: true });
    }),
});
