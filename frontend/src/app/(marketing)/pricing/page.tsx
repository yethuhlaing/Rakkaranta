import { getUserSubscriptionPlan } from "@/lib/subscription";
import { constructMetadata } from "@/lib/utils";
import { ComparePlans } from "@/components/pricing/compare-plans";
import { PricingCards } from "@/components/pricing/pricing-cards";
import { PricingFaq } from "@/components/pricing/pricing-faq";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const metadata = constructMetadata({
    title: "Pricing – SenseIQ",
    description: "Explore our subscription plans.",
});

export default async function PricingPage() {

    const { getUser } = getKindeServerSession()
    const user = await getUser()

    let subscriptionPlan;
    if (user && user.id) {
        subscriptionPlan = await getUserSubscriptionPlan(user.id);
    }

    return (
        <div className="flex w-full flex-col gap-16 py-8 md:py-8">
            <PricingCards
                userId={user?.id}
                subscriptionPlan={subscriptionPlan}
            />
            <hr className="container" />
            <ComparePlans />
            <PricingFaq />
        </div>
    );
}
