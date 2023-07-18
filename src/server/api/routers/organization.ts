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
});
