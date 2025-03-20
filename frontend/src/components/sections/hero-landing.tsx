import Link from "next/link";

import { env } from "@/env.mjs";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/shared/icons";

export default async function HeroLanding() {

    return (
        <section className="space-y-6 py-12 sm:py-20 lg:py-20">
            <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
                <Link
                    href="https://twitter.com/miickasmt/status/1810465801649938857"
                    className={cn(
                        buttonVariants({
                            variant: "outline",
                            size: "sm",
                            rounded: "full",
                        }),
                        "px-4",
                    )}
                    target="_blank"
                >
                    <span className="mr-3">🏔️</span>
                    <span className="hidden md:flex">
                        Introducing&nbsp;
                    </span>{" "}
                    Rakkaranta Nordic Resort IoT{" "}
                </Link>

                <h1 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
                    Enhance your Nordic resort experience with{" "}
                <span className="text-gradient_indigo-purple font-extrabold">
                    Rakkaranta
                </span>
                </h1>

                <p
                className="max-w-4xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
                style={{
                    animationDelay: "0.35s",
                    animationFillMode: "forwards",
                }}
                >
                    Our innovative IoT monitoring platform provides real-time sauna analytics, wood storage management, and water system monitoring, ensuring perfect comfort for your guests while optimizing energy efficiency.
                </p>

                <div
                    className="flex justify-center space-x-2 md:space-x-4"
                    style={{
                        animationDelay: "0.4s",
                        animationFillMode: "forwards",
                    }}
                >
                    <Link
                        href="/pricing"
                        prefetch={true}
                        className={cn(
                            buttonVariants({ size: "lg", rounded: "full" }),
                            "gap-2",
                        )}
                    >
                        <span>Go Pricing</span>
                        <Icons.arrowRight className="size-4" />
                    </Link>
                    <Link
                        href='/login'
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                            buttonVariants({
                                variant: "outline",
                                size: "lg",
                                rounded: "full",
                            }),
                            "px-5",
                        )}
                    >
                        <p>
                            Get Started{" "}
                        </p>
                    </Link>
                </div>
            </div>
        </section>
    );
}
