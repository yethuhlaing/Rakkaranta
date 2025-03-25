"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { userNameSchema } from "@/lib/zod";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export type FormData = {
    name: string;
};

export async function updateUserName(userId: string, data: FormData) {
    try {
        const { isAuthenticated } = getKindeServerSession()

        if (!isAuthenticated) {
            throw new Error("Unauthorized");
        }

        const { name } = userNameSchema.parse(data);

        // Update the user name.
        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name: name,
            },
        });

        revalidatePath("/dashboard/settings");
        return { status: "success" };
    } catch (error) {
        // console.log(error)
        return { status: error };
    }
}
