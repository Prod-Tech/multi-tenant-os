import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const organizationRouter = createTRPCRouter({
  getAllOrganizations: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.organization.findMany();
  }),

  getUserOrganizations: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.organizationMember.findMany({
      where: {
        userId: ctx.auth.userId,
      },
      include: {
        organization: true,
      },
    });
  }),

  createOrganization: protectedProcedure
  .input(z.object({
    name: z.string(),
    ownerUserId: z.string(),
  }))
  .mutation(async ({ctx, input}) => {
    const organization = await ctx.prisma.organization.create({
      data: {
        name: input.name,
        ownerUserId: input.ownerUserId 
      }
    });
    const _ = await ctx.prisma.organizationMember.create({
      data: {
        userId: input.ownerUserId,
        organizationId: organization.id,
      }
    });
  }),

  joinOrganization: protectedProcedure
  .input(z.object({
    organizationId: z.string(),
    userId: z.string(),
  }))
  .mutation(async ({ctx, input}) => {
    const _ = await ctx.prisma.organizationMember.create({
      data: {
        userId: input.userId,
        organizationId: input.organizationId,
      }
    });
  })

})

