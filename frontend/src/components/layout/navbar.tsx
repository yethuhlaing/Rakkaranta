"use client";

import { useContext } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { docsConfig } from "@/config/docs";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DocsSearch } from "@/components/docs/search";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import LogoImage from "../shared/logo-image";
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface NavBarProps {
    scroll?: boolean;
    large?: boolean;
}

export function NavBar({ scroll = false }: NavBarProps) {
    const scrolled = useScroll(50);

    const { getUser, isAuthenticated } = useKindeBrowserClient()
    const user = getUser()

    const selectedLayout = useSelectedLayoutSegment();
    const documentation = selectedLayout === "docs";

    const configMap = {
        docs: docsConfig.mainNav,
    };

    const links =
        (selectedLayout && configMap[selectedLayout]) ||
        marketingConfig.mainNav;

    return (
        <header
            className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
                scroll ? (scrolled ? "border-b" : "bg-transparent") : "border-b"
            }`}
        >
            <MaxWidthWrapper
                className="flex h-14 items-center justify-between py-4"
                large={documentation}
            >
                <div className="flex gap-6 md:gap-10">
                    <Link href="/" className="flex items-center space-x-1.5">
                        <LogoImage />

                        <span className="font-urban text-xl font-bold">
                            {siteConfig.name}
                        </span>
                    </Link>

                    {links && links.length > 0 ? (
                        <nav className="hidden gap-6 md:flex">
                            {links.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.disabled ? "#" : item.href}
                                    prefetch={true}
                                    className={cn(
                                        "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                                        item.href.startsWith(
                                            `/${selectedLayout}`,
                                        )
                                            ? "text-foreground"
                                            : "text-foreground/60",
                                        item.disabled &&
                                            "cursor-not-allowed opacity-80",
                                    )}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    ) : null}
                </div>

                <div className="flex items-center space-x-3">
                    {/* right header for docs */}
                    {documentation ? (
                        <div className="hidden flex-1 items-center space-x-4 sm:justify-end lg:flex">
                            <div className="hidden lg:flex lg:grow-0">
                                <DocsSearch />
                            </div>
                            <div className="flex lg:hidden">
                                <Icons.search className="size-6 text-muted-foreground" />
                            </div>
                            <div className="flex space-x-4">
                                <Link
                                    href={siteConfig.links.github}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Icons.gitHub className="size-7" />
                                    <span className="sr-only">GitHub</span>
                                </Link>
                            </div>
                        </div>
                    ) : null}

                    {user ? (
                        <Link
                            href={"/dashboard"}
                            className="hidden md:block"
                        >
                            <Button
                                className="gap-2 px-5"
                                variant="default"
                                size="sm"
                                rounded="full"
                            >
                                <span>Dashboard</span>
                            </Button>
                        </Link>
                    ) : !isAuthenticated ? (
                        <Button
                            className="hidden gap-2 px-5 md:flex"
                            variant="default"
                            size="sm"
                            rounded="full"
                        >
                            <LoginLink postLoginRedirectURL={process.env.KINDE_POST_LOGIN_REDIRECT_URL}>
                                Sign In
                            </LoginLink>
                            <Icons.arrowRight className="size-4" />
                        </Button>
                    ) : (
                        <Skeleton className="hidden h-9 w-28 rounded-full lg:flex" />
                    )}
                </div>
            </MaxWidthWrapper>
        </header>
    );
}
