import HeroLayout from "@/components/service-components/HeroLayout"
import ExitLayout from "@/components/service-components/ExitLayout"
import ServiceAccordion from "@/components/service-components/ServiceAccordion"
import WhyWorkWithUs from "@/components/service-components/WhyWorkWithUs"
import PortfolioLayout from "@/components/service-components/PortfolioLayout"
import FaqLayout from "@/components/service-components/FaqLayout"
import SocialMediaPlatforms from "@/components/service-components/SocialMediaPlatforms"
import SocialMediaPackages from "@/components/service-components/SocialMediaPackages"
import HostingPackages from "@/components/service-components/HostingPackages"
import TextHeadingBlock from "@/components/service-components/TextHeadingBlock"
import RightImageSectionVideo from "@/components/service-components/RightImageSectionVideo"
import GoogleReviewBoosterLayout from "@/components/service-components/GoogleReviewBoosterLayout"
import ServiceCarouselLayout from "@/components/service-components/ServiceCarouselLayout"
import HostingHeroLayout from "./service-components/HostingHeroLayout"
import TwoColumnImageLeftLayout from "./service-components/TwoColumnImageLeftLayout"
import TwoColumnImageRightLayout from "./service-components/TwoColumnImageRightLayout"
import LogoSliderLayout from "./shared/LogoSliderLayout"
import ServicesSlider from "./service-components/ServicesSlider"
import CTABlock from "./service-components/CTABlock"
import ServicesSliderPhoto from "./service-components/ServicesSliderPhoto"

export default async function ServiceRenderer({ pageBuilder }: any) {
    if (!pageBuilder) return null

    return (
        <>
            {pageBuilder.map((block: any, index: number) => {
                switch (block.__typename) {

                    case "ServicePageFieldsServicePageBuilderHeroLayout":
                        return <HeroLayout key={index} {...block} />
                    case "ServicePageFieldsServicePageBuilderExitSectionLayout":
                        return <ExitLayout key={index} {...block} />
                    case "ServicePageFieldsServicePageBuilderServiceCarouselLayout":
                        return <ServiceAccordion key={index} {...block} />
                    case "ServicePageFieldsServicePageBuilderWhyWordWithUsSectionLayout":
                        return <WhyWorkWithUs key={index} {...block} />
                    case "ServicePageFieldsServicePageBuilderPortfolioSectionLayout":
                        return <PortfolioLayout key={index} {...block} />
                    case "ServicePageFieldsServicePageBuilderFaqSectionLayout":
                        return <FaqLayout key={index} {...block} />
                    case "ServicePageFieldsServicePageBuilderSocialMediaPlatformsLayout":
                        return <SocialMediaPlatforms key={index} {...block} />
                    case "ServicePageFieldsServicePageBuilderSocialMediaPackagedLayout":
                        return <SocialMediaPackages key={index} {...block} />
                    case "ServicePageFieldsServicePageBuilderHostingPackagesLayout":
                        return <HostingPackages key={index} {...block} />
                    case "ServicePageFieldsServicePageBuilderTextHeadingBlockLayout":
                        return <TextHeadingBlock key={index} {...block} />
                    case "ServicePageFieldsServicePageBuilderRightImageSectionWTextVideoLayout":
                        return <RightImageSectionVideo key={index} {...block} />
                    case "ServicePageFieldsServicePageBuilderGoogleReviewBoosterLayout":
                        return <GoogleReviewBoosterLayout key={index} {...block} />
                    case "ServicePageFieldsServicePageBuilderServiceGalleryLayout":
                        return <ServiceCarouselLayout key={index} {...block} />
                    case "ServicePageFieldsServicePageBuilderHostingPageHeroLayout":
                        return <HostingHeroLayout key={index} {...block} />
                    case "ServicePageFieldsServicePageBuilderTwoColumnImageLeftLayout":
                        return <TwoColumnImageLeftLayout key={index} {...block} />
                    case "ServicePageFieldsServicePageBuilderTwoColumnImageRightLayout":
                        return <TwoColumnImageRightLayout key={index} {...block} />
                    case "ServicePageFieldsServicePageBuilderLogoSliderLayout":
                        return <LogoSliderLayout key={index} {...block} />
                    case "ServicePageFieldsServicePageBuilderServicesSliderLayout":
                        return <ServicesSlider key={index} {...block} />
                    case "ServicePageFieldsServicePageBuilderCtaBlockLayout":
                        return <CTABlock key={index} {...block} />
                    case "ServicePageFieldsServicePageBuilderPhotoSliderLayout":
                        return <ServicesSliderPhoto key={index} {...block} />
                    default:
                        return null
                }
            })}
        </>
    )
}