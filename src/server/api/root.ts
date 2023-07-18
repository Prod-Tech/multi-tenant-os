import { createTRPCRouter } from "@/server/api/trpc";
import { organizationRouter } from "@/server/api/routers/organization";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  organization: organizationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
