import { getPortfolioByCategorySlug } from "@/lib/graphql/queries/getPortfolioByCategorySlug";
import { notFound } from "next/navigation"
import PortfolioMasonry from  "@/components/portfolio/PortfolioMasonry";

export default async function PortfolioSlugPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const page = await getPortfolioByCategorySlug('portfolio/' + slug)

    if (!page) return notFound()

    return (
        <main>
            <h1 className="sr-only">Portfolio</h1>
            <PortfolioMasonry items={page?.portfolio?.nodes} />
        </main>
    )
}