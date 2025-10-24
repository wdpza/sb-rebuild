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

export default function ServiceRenderer({ pageBuilder }: any) {
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
                        console.log(block);
                        return <SocialMediaPlatforms key={index} {...block} />
                    case "ServicePageFieldsServicePageBuilderSocialMediaPackagedLayout":
                        return <SocialMediaPackages key={index} {...block} />
                    case "ServicePageFieldsServicePageBuilderHostingPackagesLayout":
                        return <HostingPackages key={index} {...block} />
                    case "ServicePageFieldsServicePageBuilderTextHeadingBlockLayout":
                        return <TextHeadingBlock key={index} {...block} />
                    default:
                        return null
                }
            })}
        </>
    )
}