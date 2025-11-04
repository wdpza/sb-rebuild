import { getAllPortfolioItems } from "@/lib/graphql/queries/getAllPortfolioItems";
import { notFound } from "next/navigation"
import PortfolioMasonry from  "@/components/portfolio/PortfolioMasonry";

export default async function PortfolioPage() {

    const page = await getAllPortfolioItems()

    if (!page) return notFound()

    return (
        <main>
            <h1 className="sr-only">Portfolio</h1>
            <PortfolioMasonry items={page.portfolio.nodes} />
        </main>
    )
}