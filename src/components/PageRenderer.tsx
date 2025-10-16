import HeroLayout from "@/components/blocks/HeroLayout"
import ServicesAccordionLayout from "@/components/blocks/ServicesAccordionLayout"
import LogoSliderLayout from "./blocks/LogoSliderLayout"
import PortfolioSliderLayout from "./blocks/PortfolioSliderLayout"
import BusinessSolutionsLayout from "./blocks/BusinessSolutionsLayout"
import ExitLayout from "./blocks/ExitLayout"
import StatsLayout from "./blocks/StatsLayout"
import EmployeeCarouselLayout from "./blocks/EmployeeCarouselLayout"
import TeamsSectionLayout from "./blocks/TeamsSectionLayout"
import CertificationSectionLayout from "./blocks/CertificationSectionLayout"
import PortfolioTabsLayout from "./blocks/PortfolioTabsLayout"
import LeftGallerySectionLayout from "./blocks/LeftGallerySectionLayout"
import RightImageSectionLayout from "./blocks/RightImageSectionLayout"
import BlogTabsLayout from "./blocks/BlogTabsLayout"

export default function PageRenderer({ pageBuilder }: any) {
	if (!pageBuilder) return null

	return (
		<>
			{pageBuilder.map((block: any, index: number) => {
				switch (block.__typename) {
					case "PageFieldGroupPageBuilderHeroLayout":
						return <HeroLayout key={index} {...block} />
					case "PageFieldGroupPageBuilderServicesAccordionLayout":
						return <ServicesAccordionLayout key={index} {...block} />
					case "PageFieldGroupPageBuilderLogoSliderLayout":
						return <LogoSliderLayout key={index} {...block} />
					case "PageFieldGroupPageBuilderPortfolioSectionLayout":
						return <PortfolioSliderLayout key={index} {...block} />
					case "PageFieldGroupPageBuilderBusinessSolutionsLayout":
						return <BusinessSolutionsLayout key={index} {...block} />
					case "PageFieldGroupPageBuilderStatsSectionLayout":
						return <StatsLayout key={index} {...block} />
					case "PageFieldGroupPageBuilderExitSectionLayout":
						console.log
						return <ExitLayout key={index} {...block} />
					case "PageFieldGroupPageBuilderEmployeeCarouselLayout":
						return <EmployeeCarouselLayout key={index} {...block} />
					case "PageFieldGroupPageBuilderTeamsSectionLayout":
						return <TeamsSectionLayout key={index} {...block} />
					case "PageFieldGroupPageBuilderCertificationSectionLayout":
						return <CertificationSectionLayout key={index} {...block} />
					case "PageFieldGroupPageBuilderPortfolioTabsLayout":
						return <PortfolioTabsLayout key={index} {...block} />
					case "PageFieldGroupPageBuilderLeftGallerySectionLayout":
						return <LeftGallerySectionLayout key={index} {...block} />
					case "PageFieldGroupPageBuilderRightImageSectionLayout":
						return <RightImageSectionLayout key={index} {...block} />
					case "PageFieldGroupPageBuilderBlogTabsLayout":
						return <BlogTabsLayout key={index} {...block} />
					default:
						return null
				}
			})}
		</>
	)
}