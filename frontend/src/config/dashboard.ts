import { SidebarNavItem } from "@/types";
import { UserRole } from "@prisma/client";


export const sidebarLinks: SidebarNavItem[] = [
    {
        title: "MENU",
        items: [
            { href: "/dashboard", icon: "dashboard", title: "Dashboard" },
            { href: "/dashboard/charts", icon: "lineChart", title: "Charts" },
            { href: "/dashboard/manage", icon: "SlidersHorizontal", title: "Manage" },
            {
                href: "/dashboard/admin",
                icon: "laptop",
                title: "Admin",
                authorizeOnly: UserRole.USER,
            },
            {
                href: "/dashboard/billing",
                icon: "billing",
                title: "Billing",
                authorizeOnly: UserRole.USER,
            },

        ],
    },
    {
        title: "OPTIONS",
        items: [
            {
                href: "/dashboard/settings",
                icon: "settings",
                title: "Settings",
            },
            { href: "/", icon: "home", title: "Homepage" },
            {
                href: "/dashboard/support",
                icon: "messages",
                title: "Support",
                authorizeOnly: UserRole.USER,
                disabled: false,
            },
        ],
    },
];
