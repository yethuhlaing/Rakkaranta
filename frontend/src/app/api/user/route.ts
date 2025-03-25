

import prisma from "@/lib/prisma";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export const DELETE = async (req: any) => {
    const { isAuthenticated, getUser }= useKindeBrowserClient()
    const user = getUser()

    if (!isAuthenticated) {
        return new Response("Not authenticated", { status: 401 });
    }

    if (!user) {
        return new Response("Invalid user", { status: 401 });
    }

    try {
        await prisma.user.delete({
            where: {
                id: user.id,
            },
        });
    } catch (error) {
        console.log(error)
        return new Response("Internal server error", { status: 500 });
    }

    return new Response("User deleted successfully!", { status: 200 });
}
