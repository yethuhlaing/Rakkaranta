import { SidebarNavItem, SiteConfig } from "@/types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
    name: "Rakkaranta",
    description:
        "Get your project off to an explosive start with Rakkaranta! Harness the power of Next.js 14, Prisma, Neon, Auth.js v5, Resend, React Email, Shadcn/ui and Stripe to build your next big thing.",
    url: site_url,
    ogImage: `${site_url}/_static/og.jpg`,
    links: {
        twitter: "https://twitter.com/yethuhlaing",
        github: "https://github.com/",
    },
    mailSupport: "support@rakkaranta.com",
};

export const footerLinks: SidebarNavItem[] = [
    {
        title: "Resort",
        items: [
            { title: "About", href: "#" },
            { title: "Accommodations", href: "#" },
            { title: "Terms", href: "/terms" },
            { title: "Privacy", href: "/privacy" },
        ],
    },
    {
        title: "Experience",
        items: [
            { title: "Sauna", href: "#" },
            { title: "Activities", href: "#" },
            { title: "Dining", href: "#" },
            { title: "Seasons", href: "#" },
        ],
    },
    {
        title: "Information",
        items: [
            { title: "Location", href: "#" },
            { title: "FAQ", href: "#" },
            { title: "Contact", href: "#" },
            { title: "Booking", href: "#" },
        ],
    },
];
