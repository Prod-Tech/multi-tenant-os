import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const notionIntegrationRouter = createTRPCRouter({
  getNotionIntegration: protectedProcedure
  .input(z.object({ organizationId: z.string() }))
  .query(({ ctx, input }) => {
    return ctx.prisma.organizationNotionIntegration.findFirst({
      where: {
        organizationId: input.organizationId
      }
    });
  }),
});
