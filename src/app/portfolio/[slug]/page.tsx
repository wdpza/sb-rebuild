import OptionsRenderer from "@/components/OptionsRenderer"
import { getPortfolioOptions } from "@/lib/data/portfolio"
import { notFound } from "next/navigation"

export const revalidate = 60;

export default async function PortfolioPage({ params }: { params: Promise<{ slug: string }>}) {

    const { slug } = await params;

    const page = await getPortfolioOptions()

    if (!page) return notFound()

    return (
        <main>
            <h1 className="sr-only">Portfolio</h1>
            <OptionsRenderer
                pageBuilder={page.portfolioOptions?.pageFieldGroup?.pageBuilder}
                categories={page.portfolioCategories?.nodes}
                slug={'/portfolio/category/' + slug}
            />
        </main>
    )
}