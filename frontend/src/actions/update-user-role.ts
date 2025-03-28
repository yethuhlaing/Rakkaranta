"use server";

import { revalidatePath } from "next/cache";
import { UserRole } from "@prisma/client";

import prisma from "@/lib/prisma";
import { userRoleSchema } from "@/lib/zod";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export type FormData = {
    role: UserRole;
};

export async function updateUserRole(userId: string, data: FormData) {
    try {

        const { getUser } = getKindeServerSession()
        const user = await getUser();

        if (!user || user.id !== userId) {
            throw new Error("Unauthorized");
        }

        const { role } = userRoleSchema.parse(data);

        // Update the user role.
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                role: role,
            },
        });

        revalidatePath("/dashboard/settings");
        return { status: "success" };
    } catch (error) {
        // console.log(error)
        return { status: error };
    }
}
