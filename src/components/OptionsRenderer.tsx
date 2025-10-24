import HeroLayout from "@/components/page-components/HeroLayout"
import LogoSliderLayout from "./page-components/LogoSliderLayout"
import ExitLayout from "./page-components/ExitLayout"
import PortfolioInnerLayout from "./page-components/PortfolioInnerLayout"
import BlogTabsLayout from "./page-components/BlogTabsLayout"

export default function OptionsRenderer({ pageBuilder, categories = null, slug = null }: any) {
    if (!pageBuilder) return null

    return (
        <>
            {pageBuilder.map((block: any, index: number) => {
                switch (block.__typename) {
                    case "PageFieldGroupPageBuilderHeroLayout":
                        return <HeroLayout key={index} {...block} />
                    case "PageFieldGroupPageBuilderLogoSliderLayout":
                        return <LogoSliderLayout key={index} {...block} />
                    case "PageFieldGroupPageBuilderExitSectionLayout":
                        return <ExitLayout key={index} {...block} />
                    case "PageFieldGroupPageBuilderPortfolioLayoutLayout":
                        return <PortfolioInnerLayout
                            key={index}
                            {...block}
                            categories={categories}
                            slug={slug}
                        />
                    case "PageFieldGroupPageBuilderBlogTabsLayout":
                        return <BlogTabsLayout key={index} {...block} />
                    default:
                        return null
                }
            })}
        </>
    )
}