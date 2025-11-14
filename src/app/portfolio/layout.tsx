import { getAllPortfolioItems } from "@/lib/graphql/queries/getAllPortfolioItems";
import { notFound } from "next/navigation";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioCategories from "@/components/portfolio/PortfolioCategories";
import PortfolioLogoSlider from "@/components/portfolio/PortfolioLogoSlider";
import PortfolioExit from "@/components/portfolio/PortfolioExit";
import ScrollToTopOnEnter from "@/components/shared/ScrollToTopOnEnter";

export default async function ArticleLayout({ children }: { children: React.ReactNode }) {
    const portfolioOptions = await getAllPortfolioItems();

    if (!getAllPortfolioItems) return notFound();

    const bgUrl = portfolioOptions.portfolioOptions.portfolioOptionsFields.portfolioBackgroundImage.node.mediaItemUrl

    return (
        <div className="article-layout flex flex-col w-full">
            <ScrollToTopOnEnter />
            <PortfolioHero portfolioOptions={portfolioOptions} />
            <PortfolioLogoSlider logo={portfolioOptions.portfolioOptions.portfolioOptionsFields.portfolioLogoSlider} />
            <div
                className="bg-cover bg-center"
                style={{
                    backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
                }}
            >
                <div className="grid w-full max-w-[1600px] mx-auto px-12 py-16 bg-cover bg-center">
                    <PortfolioCategories portfolioOptions={portfolioOptions} />
                    {children}
                </div>
            </div>
            <PortfolioExit portfolioOptions={portfolioOptions} />
        </div>
    );
}
