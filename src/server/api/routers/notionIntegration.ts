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

  createNotionIntegration: protectedProcedure
  .input(z.object({
    organizationId: z.string(),
    notionIntegrationToken: z.string(),
    notionPostsTableId: z.string(),
  }))
  .mutation(async ({ctx, input}) => {
    const notionIntegration = await ctx.prisma.organizationNotionIntegration.upsert({
      where: {
        organizationId: input.organizationId
      },
      update: {
        notionIntegrationToken: input.notionIntegrationToken,
        notionPostsTableId: input.notionPostsTableId,
      },
      create: {
        organizationId: input.organizationId,
        notionIntegrationToken: input.notionIntegrationToken,
        notionPostsTableId: input.notionPostsTableId,
      }
    });
    return notionIntegration;
  })
});
