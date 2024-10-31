"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { UserRole } from "@prisma/client";

import { userRoleSchema } from "@/validations/user";
import prisma from "@/lib/prisma";

export type FormData = {
    role: UserRole;
};

export async function updateUserRole(userId: string, data: FormData) {
    try {
        const session = await auth();

        if (!session?.user || session?.user.id !== userId) {
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
        return { status: "error" };
    }
}
