import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const locationRouter = createTRPCRouter({
  hello: publicProcedure.input(z.object({ text: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.text}`,
    };
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .input(z.object({ streetNumber: z.string().min(1) }))
    .input(z.object({ streetName: z.string().min(1) }))
    .input(z.object({ unitSuite: z.string().optional() }))
    .input(z.object({ floorLevel: z.string().optional() }))
    .input(z.object({ suffix: z.string().optional() }))
    .input(z.object({ city: z.string().min(1) }))
    .input(z.object({ province: z.string().optional() }))
    .input(z.object({ state: z.string().optional() }))
    .input(z.object({ country: z.string() }))
    .input(
      z.object({
        postalCode: z.preprocess(
          (val) => (val === "" ? undefined : val),
          z.string().min(6).optional(),
        ),
      }),
    )
    .input(
      z.object({
        zip: z.preprocess((val) => (val === "" ? undefined : val), z.string().min(5).optional()),
      }),
    )
    .input(z.object({ description: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.orm.public.Location.create({
        name: input.name,
        streetNumber: input.streetNumber,
        streetName: input.streetName,
        unitSuite: input.unitSuite,
        floorLevel: input.floorLevel,
        suffix: input.suffix,
        city: input.city,
        province: input.province,
        state: input.state,
        country: input.country,
        postalCode: input.postalCode,
        zip: input.zip,
        description: input.description,
        createdBy: ctx.session.user.id,
      });
    }),

  update: protectedProcedure
    .input(z.object({ id: z.coerce.number().min(1) }))
    .input(z.object({ name: z.string().min(1) }))
    .input(z.object({ streetNumber: z.string().min(1) }))
    .input(z.object({ streetName: z.string().min(1) }))
    .input(z.object({ unitSuite: z.string().optional() }))
    .input(z.object({ floorLevel: z.string().optional() }))
    .input(z.object({ suffix: z.string().optional() }))
    .input(z.object({ city: z.string().min(1) }))
    .input(z.object({ province: z.string().optional() }))
    .input(z.object({ state: z.string().optional() }))
    .input(z.object({ country: z.string() }))
    .input(
      z.object({
        postalCode: z.preprocess(
          (val) => (val === "" ? undefined : val),
          z.string().min(6).optional(),
        ),
      }),
    )
    .input(
      z.object({
        zip: z.preprocess((val) => (val === "" ? undefined : val), z.string().min(5).optional()),
      }),
    )
    .input(z.object({ description: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      return ctx.db.orm.public.Location.where({ id }).update({
        name: input.name,
        streetNumber: input.streetNumber,
        streetName: input.streetName,
        unitSuite: input.unitSuite,
        floorLevel: input.floorLevel,
        suffix: input.suffix,
        city: input.city,
        province: input.province,
        state: input.state,
        country: input.country,
        postalCode: input.postalCode,
        zip: input.zip,
        description: input.description,
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const location = await ctx.db.orm.public.Location
      // .orderBy({ name: 'asc' })
      .where({ isDeleted: false, createdBy: ctx.session.user.id })
      .all();

    return location ?? null;
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;

      return ctx.db.orm.public.Location.where({ id }).update({ isDeleted: true });
    }),
});
