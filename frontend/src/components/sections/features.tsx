import feature_light from "../../../public/_static/illustrations/featuer-white.png"
import feature_dark from "../../../public/_static/illustrations/feature-black.png"
import feature_upper from "../../../public/_static/illustrations/feature-upper.jpg"
import Link from "next/link";

import { features } from "@/config/landing";
import { Button } from "@/components/ui/button";
import { HeaderSection } from "@/components/shared/header-section";
import { Icons } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import Image from 'next/image'

export default function FeaturesSection() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl space-y-12 px-6">
                <div className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12">
                    {/* <h2 className="text-4xl font-semibold"></h2>
                    <p className="max-w-sm sm:ml-auto"></p> */}
                    <h2 className="font-heading text-2xl text-foreground md:text-4xl lg:text-[40px]">
                        The Rakkaranta brings together with Nordic comfort and technology
                    </h2>
                    <p className="max-w-sm sm:ml-auto text-base text-muted-foreground">
                        Enhance your stay with personalized experiences, whether you seek the authentic Finnish sauna tradition or modern resort amenities.
                    </p>
                </div>
                <div className="relative rounded-3xl p-3 md:-mx-8 lg:col-span-3">
                    <div className="aspect-88/36 relative">
                        <div className="bg-linear-to-t z-1 from-background absolute inset-0 to-transparent"></div>
                        {/* <Image src={feature_upper} className="absolute inset-0 z-10" alt="payments illustration dark" width={2797} height={1137} /> */}
                        <Image src={feature_dark} className="hidden dark:block" alt="payments illustration dark" width={2797} height={1137} />
                        <Image src={feature_light} className="dark:hidden" alt="payments illustration light" width={2797} height={1137} />
                    </div>
                </div>
                    <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = Icons[feature.icon || "nextjs"];
                            return (
                                <div
                                    className="group relative overflow-hidden rounded-2xl border bg-background p-5 md:p-8"
                                    key={feature.title}
                                >
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-0 aspect-video -translate-y-1/2 rounded-full border bg-gradient-to-b from-blue-500/80 to-white opacity-25 blur-2xl dark:from-white dark:to-white dark:opacity-5 dark:group-hover:opacity-10 duration-300 group-hover:-translate-y-1/4"
                                    />
                                    <div className="relative">
                                        <div className="relative flex size-12 rounded-2xl border border-border shadow-sm *:relative *:m-auto *:size-6">
                                            <Icon />
                                        </div>

                                        <p className="mt-6 pb-6 text-muted-foreground">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
            </div>
        </section>
    )
}



// export default function Features() {
//     return (
//         <section>
//             <div className="pb-6 pt-28">
//                 <MaxWidthWrapper>
//                     <HeaderSection
//                         label="Features"
//                         title="Discover all features."
//                         subtitle="Elevate your warehouse operations with our cutting-edge safety platform. Combining real-time sensor data, 3D visualization, and AI-driven analytics, we provide unparalleled safety management and operational efficiency. Stay ahead of potential risks, optimize your workflow, and ensure a secure environment for your team and assets."
//                     />

//                     <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
//                         {features.map((feature) => {
//                             const Icon = Icons[feature.icon || "nextjs"];
//                             return (
//                                 <div
//                                     className="group relative overflow-hidden rounded-2xl border bg-background p-5 md:p-8"
//                                     key={feature.title}
//                                 >
//                                     <div
//                                         aria-hidden="true"
//                                         className="absolute inset-0 aspect-video -translate-y-1/2 rounded-full border bg-gradient-to-b from-blue-500/80 to-white opacity-25 blur-2xl dark:from-white dark:to-white dark:opacity-5 dark:group-hover:opacity-10 duration-300 group-hover:-translate-y-1/4"
//                                     />
//                                     <div className="relative">
//                                         <div className="relative flex size-12 rounded-2xl border border-border shadow-sm *:relative *:m-auto *:size-6">
//                                             <Icon />
//                                         </div>

//                                         <p className="mt-6 pb-6 text-muted-foreground">
//                                             {feature.description}
//                                         </p>

//                                         <div className="-mb-5 flex gap-3 border-t border-muted py-4 md:-mb-7">
//                                             <Button
//                                                 variant="secondary"
//                                                 size="sm"
//                                                 rounded="xl"
//                                                 className="px-4"
//                                             >
//                                                 <Link
//                                                     href="/"
//                                                     className="flex items-center gap-2"
//                                                 >
//                                                     <span>Visit the site</span>
//                                                     <Icons.arrowUpRight className="size-4" />
//                                                 </Link>
//                                             </Button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </MaxWidthWrapper>
//             </div>
//         </section>
//     );
// }
