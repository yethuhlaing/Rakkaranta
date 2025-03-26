import Image from "next/image";

import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import whiteThumbnail from "../../../public/_static/illustrations/landing-light.png"
import darkThumbnail from "../../../public/_static/illustrations/landing-black.png"
import { HeroVideoDialog } from "../ui/hero-video-dialog";

export default function PreviewLanding() {
    return (
        <div className="pb-6 sm:pb-16">
            <MaxWidthWrapper>
                <div className="relative">
                    <HeroVideoDialog
                        className="block dark:hidden"
                        animationStyle="from-center"
                        videoSrc={process.env.PRODUCT_DEMO_LINK || "https://www.youtube.com/embed/o8TD4SVxuME"}
                        thumbnailSrc={whiteThumbnail}
                        thumbnailAlt="Hero Video"
                    />
                    <HeroVideoDialog
                        className="hidden dark:block"
                        animationStyle="from-center"
                        videoSrc={process.env.PRODUCT_DEMO_LINK || "https://www.youtube.com/embed/o8TD4SVxuME"}
                        thumbnailSrc={darkThumbnail}
                        thumbnailAlt="Hero Video"
                    />
                </div>
            </MaxWidthWrapper>
        </div>
    );
}
