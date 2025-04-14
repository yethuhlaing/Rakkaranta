import { redirect } from "next/navigation";

import { getUserSubscriptionPlan } from "@/lib/subscription";
import { constructMetadata } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard/header";
import { BillingInfo } from "@/components/pricing/billing-info";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const metadata = constructMetadata({
    title: "Billing – Rakkaranta",
    description: "Manage billing and your subscription plan.",
});

export default async function BillingPage() {
    let userSubscriptionPlan;

    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (user && user.id) {
        userSubscriptionPlan = await getUserSubscriptionPlan(user.id);
    } else {
        redirect("/api/auth/login");
    }

    return (
        <>
            <DashboardHeader
                heading="Billing"
                text="Manage billing and your subscription plan."
            />
            <div className="grid gap-8">
                <BillingInfo userSubscriptionPlan={userSubscriptionPlan} />
            </div>
        </>
    );
}
