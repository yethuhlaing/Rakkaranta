import { env } from "@/env.mjs";
import { PlansRow, SubscriptionPlan } from "@/types";

export const pricingData: SubscriptionPlan[] = [
    {
        title: "Starter",
        description: "Perfect for First-Time Visitors",
        benefits: [
            "3-night stay in standard cabin",
            "Daily sauna access (1 hour)",
            "Complimentary firewood",
            "Welcome drink on arrival",
            "Access to hiking trails"
        ],
        limitations: [
            "No hot tub access",
            "Standard check-in/out times",
            "Restaurant reservations subject to availability",
            "Limited activity scheduling"
        ],
        prices: {
            monthly: 0,
            yearly: 0,
        },
        stripeIds: {
            monthly: null,
            yearly: null,
        },
    },
    {
        title: "Pro",
        description: "Our Most Popular Package",
        benefits: [
            "5-night stay in premium cabin",
            "Unlimited sauna access",
            "Private hot tub session (2 hours daily)",
            "Northern Lights viewing tour",
            "Daily breakfast buffet",
            "One traditional Finnish dinner",
            "Complimentary snowshoe rental"
        ],
        limitations: [
            "Spa treatments at additional cost",
            "Premium activities require reservation"
        ],
        prices: {
            monthly: 699,
            yearly: 6000,
        },
        stripeIds: {
            monthly: env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
            yearly: env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
        },
    },
    {
        title: "Business",
        description: "Ultimate Finnish Experience",
        benefits: [
            "7-night stay in lakeside villa",
            "Private sauna and hot tub",
            "Full board dining (all meals included)",
            "Dedicated resort host",
            "Daily activity of choice (fishing, hiking, snowmobiling)",
            "Exclusive Finnish cooking class",
            "Airport transfers included",
            "Late checkout guaranteed"
        ],
        limitations: [],
        prices: {
            monthly: 1599,
            yearly: 12000,
        },
        stripeIds: {
            monthly: env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PLAN_ID,
            yearly: env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PLAN_ID,
        },
    },
];

export const plansColumns = [
    "starter",
    "pro",
    "business",
    "enterprise",
] as const;

export const comparePlans: PlansRow[] = [
    {
        feature: "Access to Analytics",
        starter: true,
        pro: true,
        business: true,
        enterprise: "Custom",
        tooltip: "All plans include basic analytics for tracking performance.",
    },
    {
        feature: "Custom Branding",
        starter: null,
        pro: "500/mo",
        business: "1,500/mo",
        enterprise: "Unlimited",
        tooltip: "Custom branding is available from the Pro plan onwards.",
    },
    {
        feature: "Priority Support",
        starter: null,
        pro: "Email",
        business: "Email & Chat",
        enterprise: "24/7 Support",
    },
    {
        feature: "Advanced Reporting",
        starter: null,
        pro: null,
        business: true,
        enterprise: "Custom",
        tooltip:
            "Advanced reporting is available in Business and Enterprise plans.",
    },
    {
        feature: "Dedicated Manager",
        starter: null,
        pro: null,
        business: null,
        enterprise: true,
        tooltip: "Enterprise plan includes a dedicated account manager.",
    },
    {
        feature: "API Access",
        starter: "Limited",
        pro: "Standard",
        business: "Enhanced",
        enterprise: "Full",
    },
    {
        feature: "Monthly Webinars",
        starter: false,
        pro: true,
        business: true,
        enterprise: "Custom",
        tooltip: "Pro and higher plans include access to monthly webinars.",
    },
    {
        feature: "Custom Integrations",
        starter: false,
        pro: false,
        business: "Available",
        enterprise: "Available",
        tooltip:
            "Custom integrations are available in Business and Enterprise plans.",
    },
    {
        feature: "Roles and Permissions",
        starter: null,
        pro: "Basic",
        business: "Advanced",
        enterprise: "Advanced",
        tooltip:
            "User roles and permissions management improves with higher plans.",
    },
    {
        feature: "Onboarding Assistance",
        starter: false,
        pro: "Self-service",
        business: "Assisted",
        enterprise: "Full Service",
        tooltip:
            "Higher plans include more comprehensive onboarding assistance.",
    },
    // Add more rows as needed
];
