"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { Menu, X } from "lucide-react";

import { docsConfig } from "@/config/docs";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { DocsSidebarNav } from "@/components/docs/sidebar-nav";
import { Icons } from "@/components/shared/icons";

import { ModeToggle } from "./mode-toggle";
import { LoginLink, RegisterLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export function NavMobile() {
    const { getUser } = useKindeBrowserClient()
    const user = getUser()
    
    const [open, setOpen] = useState(false);
    const selectedLayout = useSelectedLayoutSegment();
    const documentation = selectedLayout === "docs";

    const configMap = {
        docs: docsConfig.mainNav,
    };

    const links =
        (selectedLayout && configMap[selectedLayout]) ||
        marketingConfig.mainNav;

    // prevent body scroll when modal is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [open]);

    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                className={cn(
                    "fixed right-2 top-2.5 z-50 rounded-full p-2 transition-colors duration-200 hover:bg-muted focus:outline-none active:bg-muted md:hidden",
                    open && "hover:bg-muted active:bg-muted",
                )}
            >
                {open ? (
                    <X className="size-5 text-muted-foreground" />
                ) : (
                    <Menu className="size-5 text-muted-foreground" />
                )}
            </button>

            <nav
                className={cn(
                    "fixed inset-0 z-20 hidden w-full overflow-auto bg-background px-5 py-16 lg:hidden",
                    open && "block",
                )}
            >
                <ul className="grid divide-y divide-muted">
                    {links &&
                        links.length > 0 &&
                        links.map(({ title, href }) => (
                            <li key={href} className="py-3">
                                <Link
                                    href={href}
                                    onClick={() => setOpen(false)}
                                    className="flex w-full font-medium capitalize"
                                >
                                    {title}
                                </Link>
                            </li>
                        ))}

                    {user ? (
                        <>
                            <li className="py-3">
                                <Link
                                    href="/dashboard"
                                    className="flex w-full font-medium capitalize"
                                >
                                    Dashboard
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                        
                            <li className="py-3 flex w-full font-medium capitalize">
                                <LoginLink postLoginRedirectURL={process.env.KINDE_POST_LOGIN_REDIRECT_URL}> 
                                    Login in
                                </LoginLink>
                            </li>

                            <li className="py-3 flex w-full font-medium capitalize">
                                <RegisterLink>
                                    Sign up
                                </RegisterLink>
                            </li>
                        </>
                    )}
                </ul>

                {documentation ? (
                    <div className="mt-8 block md:hidden">
                        <DocsSidebarNav setOpen={setOpen} />
                    </div>
                ) : null}

                <div className="mt-5 flex items-center justify-end space-x-4">
                    <Link
                        href={siteConfig.links.github}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Icons.gitHub className="size-6" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <ModeToggle />
                </div>
            </nav>
        </>
    );
}
