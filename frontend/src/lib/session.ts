import "server-only";

import { cache } from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getCurrentUser = cache(async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()
    if (!user) {
        return undefined;
    }
    return user;
});
