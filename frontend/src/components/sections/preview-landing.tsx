import Image from "next/image";

import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import whiteThumbnail from "@/assets/images/landing-light.png"
import darkThumbnail from "@/assets/images/landing-black.png"
import { HeroVideoDialog } from "../ui/hero-video-dialog";

export default function PreviewLanding() {
    return (
        <div className="pb-6 sm:pb-16">
            <MaxWidthWrapper>
                <div className="relative">
                    <HeroVideoDialog
                        className="block dark:hidden"
                        animationStyle="from-center"
                        videoSrc={process.env.PRODUCT_DEMO_LINK || "https://www.youtube.com/embed/uqiTF6tvMRA"}
                        thumbnailSrc={whiteThumbnail}
                        thumbnailAlt="Hero Video"
                    />
                    <HeroVideoDialog
                        className="hidden dark:block"
                        animationStyle="from-center"
                        videoSrc={process.env.PRODUCT_DEMO_LINK || "https://www.youtube.com/embed/uqiTF6tvMRA"}
                        thumbnailSrc={darkThumbnail}
                        thumbnailAlt="Hero Video"
                    />
                </div>
            </MaxWidthWrapper>
        </div>
    );
}
