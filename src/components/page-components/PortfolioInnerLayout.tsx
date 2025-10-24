import { getPortfolioItems } from "@/lib/graphql/queries/getPortfolioItems";
import PortfolioMasonry from "@/components/portfolio/PortfolioMasonry";
import { getPortfolioByCategorySlug } from "@/lib/data/portfolio"

export default async function PortfolioInnerLayout({ perCategory, backgroundImage, categories, slug }: any) {

    const bgUrl = backgroundImage?.node?.mediaItemUrl ?? null;

    let portfolioItems: any[] = [];
    if(slug == null) {
        portfolioItems = await getPortfolioItems(perCategory);
    } else {
        let data = await getPortfolioByCategorySlug(slug);
        portfolioItems = data?.portfolioCategory?.portfolio?.nodes;
    } 

    const items = portfolioItems;

    return (
        <div
            id="main"
            className="relative py-24 bg-cover bg-center"
            style={{
                backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
            }}
        >
            <div className="max-w-[1600px] mx-auto text-center">
                <div className="flex flex-wrap justify-center gap-4 mb-24">
                {categories.map((category: any) => {
                    const isActive = slug === '/portfolio/category/' + category.slug;
                    return (
                        <a
                        key={category.databaseId}
                        href={`/portfolio/${category.slug}#main`}
                        className={`inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-white gradient-border ${
                            isActive
                                ? "active"
                                : ""
                            }`}
                        >
                        {category.name}
                        </a>
                    );
                })}
                </div>

                <PortfolioMasonry items={items} />
            </div>
        </div>
    );
}
