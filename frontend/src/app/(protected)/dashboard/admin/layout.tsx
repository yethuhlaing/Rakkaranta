import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}

export default async function Dashboard({ children }: ProtectedLayoutProps) {
    const user = await getCurrentUser();
    if (!user) redirect("/login");

    return <>{children}</>;
}
