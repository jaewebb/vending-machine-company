import { locationRouter } from "~/server/api/routers/location";
import { ownershipRouter } from "~/server/api/routers/ownership";
import { statusRouter } from "~/server/api/routers/status";
import { vendingMachineRouter } from "~/server/api/routers/vendingMachine";
import { vendingMachineTypeRouter } from "~/server/api/routers/vendingMachineType";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  location: locationRouter,
  ownership: ownershipRouter,
  status: statusRouter,
  vendingMachine: vendingMachineRouter,
  vendingMachineType: vendingMachineTypeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
