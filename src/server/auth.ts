import { type GetServerSidePropsContext } from "next";
import { prisma } from "@/server/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export async function validateUser(req: GetServerSidePropsContext["req"], res: GetServerSidePropsContext["res"]) {
    
}

