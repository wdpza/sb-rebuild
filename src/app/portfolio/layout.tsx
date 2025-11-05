import { getAllPortfolioItems } from "@/lib/graphql/queries/getAllPortfolioItems";
import { notFound } from "next/navigation";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioCategories from "@/components/portfolio/PortfolioCategories";
import PortfolioExit from "@/components/portfolio/PortfolioExit";
import ScrollToTopOnEnter from "@/components/shared/ScrollToTopOnEnter";

export default async function ArticleLayout({ children }: { children: React.ReactNode }) {
    const portfolioOptions = await getAllPortfolioItems();

    if (!getAllPortfolioItems) return notFound();

    return (
        <div className="article-layout flex flex-col w-full">
            <ScrollToTopOnEnter />
            <PortfolioHero portfolioOptions={portfolioOptions} />

            <div className="grid w-full max-w-[1600px] mx-auto px-12 py-16">
                <PortfolioCategories portfolioOptions={portfolioOptions} />
                {children}
            </div>

            <PortfolioExit portfolioOptions={portfolioOptions} />
        </div>
    );
}
