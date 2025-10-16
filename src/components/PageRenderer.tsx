import HeroLayout from "@/components/blocks/HeroLayout"
import ServicesAccordionLayout from "@/components/blocks/ServicesAccordionLayout"
import LogoSliderLayout from "./blocks/LogoSliderLayout"
import PortfolioSliderLayout from "./blocks/PortfolioSliderLayout"
import BusinessSolutionsLayout from "./blocks/BusinessSolutionsLayout"
import ExitLayout from "./blocks/ExitLayout"
import StatsLayout from "./blocks/StatsLayout"

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
					default:
						return null
				}
			})}
		</>
	)
}