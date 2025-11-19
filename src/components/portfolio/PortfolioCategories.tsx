import Link from "next/link";

export default function PortfolioCategories(portfolioOptions : any) {

    if (!portfolioOptions) {
        return null; // Return null safely if there's no data
    }

    const portfolioCategories = portfolioOptions.portfolioOptions.portfolioCategories;

    return (
        <section className="w-full flex justify-center mb-12">
            <div className="flex flex-wrap justify-center items-center gap-4">
                {portfolioCategories.nodes.map((category : any) => (
                    <Link
                        key={category.databaseId}
                        href={`/portfolio/${category.slug}`}
                        className="inline-flex items-center justify-center rounded-md px-8 py-3 font-semibold text-neutral-softest gradient-border"
                    >
                        {category.name}
                    </Link>
                ))}
            </div>
        </section>
    );
}
