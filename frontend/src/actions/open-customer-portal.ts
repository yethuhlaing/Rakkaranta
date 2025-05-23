"use server";

import { redirect } from "next/navigation";

import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export type responseAction = {
    status: "success" | "error";
    stripeUrl?: string;
};

const billingUrl = absoluteUrl("/dashboard/billing");

export async function openCustomerPortal(
    userStripeId: string,
): Promise<responseAction> {
    let redirectUrl: string = "";

    try {
        const { getUser, isAuthenticated } = getKindeServerSession()

        if (!isAuthenticated) {
            throw new Error("Unauthorized");
        }

        if (userStripeId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userStripeId,
                return_url: billingUrl,
            });

            redirectUrl = stripeSession.url as string;
        }
    } catch (error) {
        throw new Error("Failed to generate user stripe session", error);
    }

    redirect(redirectUrl);
}
